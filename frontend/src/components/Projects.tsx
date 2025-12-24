'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  category: string;
  github?: string;
  live?: string;
  image?: string;
  featured: boolean;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Tax & Beyond - USA CRM System',
    description: 'Comprehensive tax, accounting, and insurance services platform for USA-based clients.',
    longDescription: 'A full-featured financial services platform designed for managing tax preparation, accounting, bookkeeping, and insurance services. Built with modern web technologies, featuring client management, document handling, payment processing, and secure multi-user access. Includes tax filing services, ITIN applications, QuickBooks integration, payroll management, insurance services, and comprehensive reporting tools. Successfully deployed and serving clients across the United States, with special focus on the Nepali community.',
    technologies: ['Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Stripe', 'Express', 'JWT', 'Chart.js'],
    category: 'Full Stack',
    github: 'https://github.com/UmeshMehta1',
    live: 'https://mytaxbeyond.com',
    featured: true,
  },
  {
    id: 2,
    title: 'Hamrotask - Task Marketplace Platform',
    description: 'On-demand task marketplace connecting Nepali service providers with customers across Australia.',
    longDescription: 'A comprehensive marketplace platform connecting skilled Nepali service providers with customers across Australia. Features include task posting, service provider matching, secure payment processing via Stripe, real-time messaging, rating and review system, and comprehensive service categories (home cleaning, handyman, moving & delivery, gardening, pet care). Built with Next.js and TypeScript for type safety, PostgreSQL for reliable data storage, and Stripe for secure payments. Successfully deployed and serving the Nepali community in Australia with 5,000+ completed tasks and 1,200+ trusted taskers.',
    technologies: ['Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Stripe', 'Socket.io', 'Express', 'JWT'],
    category: 'Full Stack',
    github: 'https://github.com/UmeshMehta1',
    live: 'https://hamrotask-dp.vercel.app',
    featured: true,
  },
  {
    id: 3,
    title: 'SaaS-Based POS System',
    description: 'Cloud-based Point of Sale system with multi-tenant architecture and subscription management.',
    longDescription: 'A complete SaaS solution for retail businesses featuring multi-tenant architecture, subscription billing, inventory management, sales reporting, and customer management. Includes admin dashboard for business owners, staff management, sales analytics, and integration capabilities. Built with scalability in mind to handle multiple businesses on a single platform.',
    technologies: ['Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Stripe', 'Redis', 'Docker'],
    category: 'Full Stack',
    github: 'https://github.com/UmeshMehta1',
    featured: true,
  },
  {
    id: 4,
    title: 'UpayaX - Home Service Platform',
    description: 'On-demand home service marketplace connecting service providers with customers.',
    longDescription: 'A comprehensive marketplace platform for home services including booking, payment processing, service provider management, and customer reviews. Features real-time booking system, geolocation-based service provider matching, secure payment gateway integration, rating and review system, and admin panel for platform management. Built to handle high traffic and ensure smooth user experience.',
    technologies: ['Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Socket.io', 'Stripe', 'Google Maps API'],
    category: 'Full Stack',
    github: 'https://github.com/UmeshMehta1',
    featured: true,
  },
  {
    id: 5,
    title: 'Share Bazar Insights',
    description: 'Real-time stock market insights platform with live data, technical charts, and portfolio management.',
    longDescription: 'A comprehensive stock market analytics platform providing real-time market data, technical charts, portfolio tracking, and market insights. Built with Next.js and TypeScript for the frontend, Node.js backend with PostgreSQL database, and Socket.io for real-time data updates. Features include live market data streaming, interactive technical charts, portfolio management, market news, premium educational content, and advanced analytics. Successfully deployed and serving users with up-to-date financial market information.',
    technologies: ['Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Socket.io', 'Chart.js', 'Tailwind CSS'],
    category: 'Full Stack',
    github: 'https://github.com/UmeshMehta1',
    live: 'https://sharebazzar.vercel.app',
    featured: true,
  },
  {
    id: 6,
    title: 'Personal Portfolio Website',
    description: 'Modern portfolio website with real-time visitor tracking and AI-powered features.',
    longDescription: 'This very portfolio website! Built with Next.js 14+ App Router, featuring real-time visitor tracking using Socket.io, AI-powered chatbot using Google Gemini API, resume analyzer, blog summarization, and smooth animations. Includes SEO optimization, dark mode support, responsive design, and API playground for testing backend endpoints.',
    technologies: ['Next.js', 'TypeScript', 'Socket.io', 'Tailwind CSS', 'Framer Motion', 'Google Gemini AI'],
    category: 'Full Stack',
    github: 'https://github.com/UmeshMehta1/my-portfolio',
    live: 'https://umeshmehta.me',
    featured: false,
  },
];

const categories = ['All', 'Full Stack', 'Frontend', 'Backend'];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-center text-gray-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            A collection of my recent work showcasing my skills and expertise
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                {project.featured && (
                  <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-semibold">
                    Featured
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-2xl font-heading font-semibold text-gray-900 dark:text-white mb-3">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium"
                        onClick={(e) => e.stopPropagation()}
                      >
                        GitHub →
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Live Demo →
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-3xl font-heading font-bold text-gray-900 dark:text-white">
                {selectedProject.title}
              </h3>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {selectedProject.longDescription}
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedProject.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 rounded text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex gap-4">
              {selectedProject.github && (
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
                >
                  View on GitHub
                </a>
              )}
              {selectedProject.live && (
                <a
                  href={selectedProject.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Live Demo
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
