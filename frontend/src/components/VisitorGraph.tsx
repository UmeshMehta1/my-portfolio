'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface DayData {
  date: string;
  dayName: string;
  count: number;
}

export default function VisitorGraph() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<DayData[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

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
    <div className="relative">
      {/* Graph Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2 md:px-3 py-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors text-sm font-medium"
        title="View visitor statistics"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <span className="hidden lg:inline">Visitors</span>
      </button>

      {/* Graph Modal */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-20 right-2 md:right-6 z-50 w-[calc(100vw-1rem)] md:w-96 max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-green-600 p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold">Visitor Statistics</h3>
                  <p className="text-sm text-emerald-100">Last 7 Days</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-emerald-100 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="mt-2 text-2xl font-bold">
                {total.toLocaleString()} <span className="text-sm font-normal text-emerald-100">Total Visits</span>
              </div>
            </div>

            {/* Graph Content */}
            <div className="p-6">
              {loading ? (
                <div className="flex items-center justify-center h-48">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                </div>
              ) : data.length === 0 ? (
                <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                  <p>No visitor data available</p>
                </div>
              ) : (
                <>
                  {/* Bar Chart */}
                  <div className="flex items-end justify-between gap-2 h-48 mb-4">
                    {data.map((day, index) => {
                      const height = maxCount > 0 ? (day.count / maxCount) * 100 : 0;
                      return (
                        <div key={day.date} className="flex-1 flex flex-col items-center gap-2">
                          <div className="relative w-full h-full flex items-end">
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: `${height}%` }}
                              transition={{ duration: 0.5, delay: index * 0.1 }}
                              className="w-full bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-lg hover:from-emerald-700 hover:to-emerald-500 transition-all cursor-pointer relative group"
                              title={`${day.count} visitors on ${day.dayName}`}
                            >
                              {day.count > 0 && (
                                <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-gray-700 dark:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                  {day.count}
                                </span>
                              )}
                            </motion.div>
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                            {day.dayName}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-500">
                            {new Date(day.date).getDate()}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Summary Stats */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                        {data[data.length - 1]?.count || 0}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Today</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {Math.round(data.reduce((acc, day) => acc + day.count, 0) / data.length) || 0}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Avg/Day</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                        {Math.max(...data.map(d => d.count), 0)}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Peak</div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}

