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
    title: 'E-Commerce Platform',
    description: 'A full-featured e-commerce platform with real-time inventory management.',
    longDescription: 'Built with Next.js and Node.js, featuring payment integration, admin dashboard, and real-time updates.',
    technologies: ['Next.js', 'TypeScript', 'Node.js', 'MongoDB', 'Stripe'],
    category: 'Full Stack',
    github: 'https://github.com',
    live: 'https://example.com',
    featured: true,
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'Collaborative task management with real-time synchronization.',
    longDescription: 'Real-time collaboration features using Socket.io, drag-and-drop interface, and team management.',
    technologies: ['React', 'Socket.io', 'Express', 'PostgreSQL'],
    category: 'Full Stack',
    github: 'https://github.com',
    live: 'https://example.com',
    featured: true,
  },
  {
    id: 3,
    title: 'Analytics Dashboard',
    description: 'Beautiful data visualization dashboard with real-time metrics.',
    longDescription: 'Interactive charts and graphs using Recharts, real-time data updates, and customizable widgets.',
    technologies: ['Next.js', 'Recharts', 'TypeScript', 'Tailwind CSS'],
    category: 'Frontend',
    github: 'https://github.com',
    live: 'https://example.com',
    featured: false,
  },
  {
    id: 4,
    title: 'REST API Service',
    description: 'Scalable REST API with authentication and rate limiting.',
    longDescription: 'Built with Express.js, JWT authentication, comprehensive documentation, and automated testing.',
    technologies: ['Node.js', 'Express', 'MongoDB', 'JWT'],
    category: 'Backend',
    github: 'https://github.com',
    live: 'https://example.com',
    featured: false,
  },
  {
    id: 5,
    title: 'Social Media Dashboard',
    description: 'Unified social media management platform.',
    longDescription: 'Manage multiple social accounts, schedule posts, and analyze engagement metrics all in one place.',
    technologies: ['React', 'Node.js', 'GraphQL', 'Redis'],
    category: 'Full Stack',
    github: 'https://github.com',
    live: 'https://example.com',
    featured: true,
  },
  {
    id: 6,
    title: 'Portfolio Website',
    description: 'Modern portfolio website with advanced features.',
    longDescription: 'This very portfolio! Built with Next.js, featuring real-time visitor tracking, SEO optimization, and smooth animations.',
    technologies: ['Next.js', 'TypeScript', 'Socket.io', 'Tailwind CSS'],
    category: 'Frontend',
    github: 'https://github.com',
    live: 'https://example.com',
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
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-4">
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
                    ? 'bg-blue-600 text-white shadow-lg'
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
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
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
                        className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
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
                        className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
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
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
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
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded text-sm font-medium"
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
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
