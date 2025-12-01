'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const stats = [
  { label: 'Projects Completed', value: '50+' },
  { label: 'Happy Clients', value: '30+' },
  { label: 'Years Experience', value: '5+' },
  { label: 'Technologies', value: '20+' },
];

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              About Me
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Get to know more about my journey, passion, and expertise
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                My Story
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                I'm a passionate developer with a love for creating elegant solutions
                to complex problems. With expertise in modern web technologies, I
                bring ideas to life through clean, efficient code.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                My journey in software development started with curiosity and has
                evolved into a career focused on building scalable, user-centered
                applications. I believe in continuous learning and staying updated
                with the latest industry trends.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                When I'm not coding, you can find me exploring new technologies,
                contributing to open-source projects, or sharing knowledge with the
                developer community.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg"
            >
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                What I Do
              </h3>
              <ul className="space-y-4">
                {[
                  'Full Stack Web Development',
                  'UI/UX Design & Implementation',
                  'API Development & Integration',
                  'Database Design & Optimization',
                  'Cloud Deployment & DevOps',
                  'Code Review & Mentoring',
                ].map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center gap-3 text-gray-700 dark:text-gray-300"
                  >
                    <span className="w-2 h-2 bg-blue-600 rounded-full" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Stats */}
          <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
              >
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
