'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface TechYear {
  year: number;
  technologies: string[];
  description: string;
  color: string;
}

const techTimeline: TechYear[] = [
  {
    year: 2020,
    technologies: ['HTML', 'CSS', 'JavaScript'],
    description: 'Started with web fundamentals',
    color: 'bg-blue-500',
  },
  {
    year: 2021,
    technologies: ['React', 'Node.js', 'Express'],
    description: 'Dived into modern frameworks',
    color: 'bg-green-500',
  },
  {
    year: 2022,
    technologies: ['TypeScript', 'Next.js', 'MongoDB'],
    description: 'Full-stack development',
    color: 'bg-purple-500',
  },
  {
    year: 2023,
    technologies: ['Docker', 'AWS', 'GraphQL'],
    description: 'DevOps and cloud technologies',
    color: 'bg-orange-500',
  },
  {
    year: 2024,
    technologies: ['AI/ML', 'Three.js', 'Web3'],
    description: 'Exploring cutting-edge tech',
    color: 'bg-pink-500',
  },
];

export default function TechStackTimeline() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Tech Journey Timeline
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            My evolution as a developer through the years
          </p>

          <div ref={ref} className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500" />

            {/* Timeline Items */}
            <div className="space-y-12">
              {techTimeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -50 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative pl-24"
                >
                  {/* Timeline Dot */}
                  <div className={`absolute left-6 top-2 w-4 h-4 ${item.color} rounded-full border-4 border-white dark:border-gray-900 shadow-lg`} />

                  {/* Content Card */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-center gap-4 mb-4">
                      <span className={`${item.color} text-white px-4 py-2 rounded-full font-bold text-lg`}>
                        {item.year}
                      </span>
                      <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {item.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

