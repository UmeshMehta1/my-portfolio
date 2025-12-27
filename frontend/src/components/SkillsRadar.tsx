'use client';

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from 'recharts';

interface SkillData {
  skill: string;
  level: number;
  fullMark: number;
}

const skillsData: SkillData[] = [
  { skill: 'JavaScript', level: 95, fullMark: 100 },
  { skill: 'TypeScript', level: 90, fullMark: 100 },
  { skill: 'React', level: 95, fullMark: 100 },
  { skill: 'Next.js', level: 90, fullMark: 100 },
  { skill: 'Node.js', level: 88, fullMark: 100 },
  { skill: 'MongoDB', level: 85, fullMark: 100 },
  { skill: 'Python', level: 80, fullMark: 100 },
  { skill: 'Docker', level: 75, fullMark: 100 },
];

export default function SkillsRadar() {
  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg p-6">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        Skills Radar Chart
      </h3>
      <div className="w-full" style={{ height: '384px', minHeight: '384px' }}>
        <ResponsiveContainer width="100%" height="100%" minHeight={384}>
          <RadarChart data={skillsData}>
            <PolarGrid stroke="#e5e7eb" />
            <PolarAngleAxis 
              dataKey="skill" 
              tick={{ fill: '#6b7280', fontSize: 12 }}
            />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 100]} 
              tick={{ fill: '#6b7280', fontSize: 10 }}
            />
            <Radar
              name="Skill Level"
              dataKey="level"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.6}
            />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

