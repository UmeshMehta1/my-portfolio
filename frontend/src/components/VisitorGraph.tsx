'use client';

import { useState, useEffect } from 'react';

interface DayData {
  date: string;
  dayName: string;
  count: number;
}

export default function VisitorGraph() {
  const [data, setData] = useState<DayData[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  // Use configured API URL or fall back to deployed backend (never localhost in production)
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    'https://my-portfolio-72dq.onrender.com';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/stats/last7days`);
        if (response.ok) {
          const result = await response.json();
          setData(result.data || []);
          const sum = (result.data || []).reduce((acc: number, day: DayData) => acc + day.count, 0);
          setTotal(sum);
        }
      } catch (error) {
        console.error('Error fetching visitor data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // Refresh every 5 minutes
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [apiUrl]);

  const maxCount = Math.max(...data.map(d => d.count), 1);

  return (
    <div className="flex items-center gap-3 text-xs md:text-sm">
      {/* Compact label + total */}
      <div className="flex flex-col justify-center">
        <span className="text-[10px] uppercase tracking-wide text-gray-500 dark:text-gray-400">
          Visitors (7d)
        </span>
        <span className="font-semibold text-emerald-700 dark:text-emerald-300">
          {total.toLocaleString()}
        </span>
      </div>

      {/* Inline mini line chart */}
      <div className="relative h-8 w-24 md:w-32">
        <svg viewBox="0 0 100 30" className="w-full h-full">
          {/* Background */}
          <rect
            x="0"
            y="0"
            width="100"
            height="30"
            rx="6"
            className="fill-emerald-50 dark:fill-emerald-900/20"
          />

          {!loading && data.length > 0 && (
            <>
              {/* Area under line */}
              <path
                d={`M 0 30 ${data
                  .map((day, index) => {
                    const x = (index / Math.max(data.length - 1, 1)) * 100;
                    const y =
                      30 -
                      (maxCount > 0 ? (day.count / maxCount) * 24 + 2 : 2);
                    return `L ${x.toFixed(2)} ${y.toFixed(2)}`;
                  })
                  .join(' ')} L 100 30 Z`}
                className="fill-emerald-200/70 dark:fill-emerald-700/40"
              />

              {/* Line */}
              <polyline
                points={data
                  .map((day, index) => {
                    const x = (index / Math.max(data.length - 1, 1)) * 100;
                    const y =
                      30 -
                      (maxCount > 0 ? (day.count / maxCount) * 24 + 2 : 2);
                    return `${x.toFixed(2)},${y.toFixed(2)}`;
                  })
                  .join(' ')}
                className="fill-none stroke-emerald-600 dark:stroke-emerald-400"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Last point dot */}
              {(() => {
                const last = data[data.length - 1];
                const idx = data.length - 1;
                const x = (idx / Math.max(data.length - 1, 1)) * 100;
                const y =
                  30 -
                  (maxCount > 0 ? (last.count / maxCount) * 24 + 2 : 2);
                return (
                  <circle
                    cx={x}
                    cy={y}
                    r="2"
                    className="fill-white dark:fill-gray-900 stroke-emerald-600 dark:stroke-emerald-300"
                    strokeWidth="1"
                  />
                );
              })()}
            </>
          )}
        </svg>
      </div>
    </div>
  );
}

