'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const stats = [
  { label: 'Students Mentored', value: '150+' },
  { label: 'Major Projects', value: '5+' },
  { label: 'Years Experience', value: '2+' },
  { label: 'Technologies', value: '15+' },
];

const experience = [
  {
    role: 'Full Stack Developer',
    company: 'Digital Pathshala',
    period: 'Present',
    description: 'Building scalable web applications and leading development teams',
  },
  {
    role: 'Project Manager',
    company: 'Digital Pathshala',
    period: 'Previous',
    description: 'Managed projects, supervised teams, and collaborated with international clients',
  },
  {
    role: 'Supervise Intern',
    company: 'Digital Pathshala',
    period: 'Previous',
    description: 'Led and mentored intern teams, ensuring quality deliverables',
  },
];

const keyProjects = [
  {
    name: 'Tax & Beyond - USA CRM',
    description: 'Tax, accounting, and insurance services platform for USA clients',
  },
  {
    name: 'Hamrotask Australia',
    description: 'Task marketplace connecting Nepali service providers in Australia',
  },
  {
    name: 'SaaS-based POS System',
    description: 'Point of Sale system built as Software-as-a-Service',
  },
  {
    name: 'UpayaX Home Service',
    description: 'Home service platform connecting customers with service providers',
  },
  {
    name: 'Share Bazar Insights',
    description: 'Real-time stock market insights platform with live data and technical charts',
  },
];

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref3, inView3] = useInView({ triggerOnce: true, threshold: 0.1 });

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
              Full Stack Developer, Project Manager, and Tech Mentor passionate about building impactful solutions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                My Journey
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                I'm Umesh Mehta, currently pursuing BCA 6th semester at Itahari Nauna College while working as a Full Stack Developer at Digital Pathshala. My journey in technology started with curiosity and has evolved into a career focused on building scalable applications and leading teams.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Starting as an intern, I progressed through roles as Supervisor and Project Manager, where I gained experience leading teams and collaborating with international clients. This experience taught me the importance of clear communication, strategic planning, and delivering quality solutions.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Beyond my professional work, I'm actively involved with Code for Change NGO, serving as CR for Koshi Province (2024-2025) and currently as Admin Lead (2025-2026). I'm passionate about giving back to the community through mentorship, having guided over 150+ students in MERN stack development.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                I believe in continuous learning, sharing knowledge, and building solutions that make a real impact. When I'm not coding, you'll find me mentoring students, contributing to open-source projects, or exploring new technologies.
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
                  'Full Stack Web Development (MERN Stack)',
                  'Project Management & Team Leadership',
                  'International Client Management',
                  'SaaS Application Development',
                  'CRM System Development',
                  'Mentorship & Training (150+ Students)',
                ].map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center gap-3 text-gray-700 dark:text-gray-300"
                  >
                    <span className="w-2 h-2 bg-emerald-600 rounded-full flex-shrink-0" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Education
                </h4>
                <div className="text-gray-600 dark:text-gray-300">
                  <p className="font-medium">BCA (Bachelor of Computer Applications)</p>
                  <p className="text-sm">6th Semester</p>
                  <p className="text-sm">Itahari Nauna College</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Experience Timeline */}
          <motion.div
            ref={ref2}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Professional Experience
            </h3>
            <div className="space-y-8">
              {experience.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border-l-4 border-emerald-600"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {exp.role}
                    </h4>
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-2 font-medium">
                    {exp.company}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    {exp.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Key Projects */}
          <motion.div
            ref={ref3}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Key Projects
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {keyProjects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {project.name}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    {project.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Mentorship Impact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 bg-gradient-to-r from-emerald-600 to-green-600 rounded-lg p-8 text-white"
          >
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-4">Mentorship Impact</h3>
              <p className="text-lg mb-6 text-emerald-100">
                I've had the privilege of mentoring over 150+ students in MERN stack development, 
                helping them build their careers in web development. Through Code for Change NGO, 
                I continue to contribute to the tech community and empower the next generation of developers.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="bg-white/20 rounded-lg px-6 py-3">
                  <div className="text-3xl font-bold">150+</div>
                  <div className="text-sm">Students Mentored</div>
                </div>
                <div className="bg-white/20 rounded-lg px-6 py-3">
                  <div className="text-3xl font-bold">MERN</div>
                  <div className="text-sm">Stack Focus</div>
                </div>
                <div className="bg-white/20 rounded-lg px-6 py-3">
                  <div className="text-3xl font-bold">NGO</div>
                  <div className="text-sm">Code for Change</div>
                </div>
              </div>
            </div>
          </motion.div>

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
                <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
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
