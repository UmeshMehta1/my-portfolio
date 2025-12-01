'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CaseStudyStep {
  id: number;
  title: string;
  description: string;
  content: string;
  icon: string;
}

interface CaseStudy {
  id: string;
  title: string;
  description: string;
  steps: CaseStudyStep[];
}

const caseStudies: CaseStudy[] = [
  {
    id: 'ecommerce',
    title: 'E-Commerce Platform',
    description: 'A complete e-commerce solution with real-time inventory',
    steps: [
      {
        id: 1,
        title: 'Problem',
        description: 'Client needed a scalable e-commerce platform',
        content: 'The client was struggling with their existing platform that couldn\'t handle high traffic during sales events. They needed a solution that could scale automatically and provide real-time inventory updates.',
        icon: '❓',
      },
      {
        id: 2,
        title: 'Solution',
        description: 'Built with Next.js and microservices architecture',
        content: 'Developed a modern e-commerce platform using Next.js for the frontend, Node.js microservices for the backend, and MongoDB for data storage. Implemented Redis caching for improved performance and Stripe for secure payment processing.',
        icon: '💡',
      },
      {
        id: 3,
        title: 'Tech Stack',
        description: 'Modern technologies for optimal performance',
        content: 'Frontend: Next.js, TypeScript, Tailwind CSS\nBackend: Node.js, Express, MongoDB\nServices: Redis, Stripe API, AWS S3\nDevOps: Docker, AWS ECS, GitHub Actions',
        icon: '🛠️',
      },
      {
        id: 4,
        title: 'Challenges',
        description: 'Overcame scalability and performance issues',
        content: 'Main challenges included handling concurrent users during flash sales, ensuring data consistency across microservices, and optimizing database queries for large product catalogs. Solved through caching strategies, database indexing, and load balancing.',
        icon: '⚡',
      },
      {
        id: 5,
        title: 'Impact',
        description: 'Significant improvements in performance and sales',
        content: 'Resulted in 300% increase in page load speed, 50% reduction in server costs through efficient caching, and 200% increase in sales during peak events. The platform now handles 10x more concurrent users without performance degradation.',
        icon: '📈',
      },
    ],
  },
  {
    id: 'taskmanager',
    title: 'Task Management App',
    description: 'Real-time collaborative task management system',
    steps: [
      {
        id: 1,
        title: 'Problem',
        description: 'Teams needed better collaboration tools',
        content: 'Remote teams were struggling with task coordination and real-time updates. Existing tools were either too complex or lacked real-time features.',
        icon: '❓',
      },
      {
        id: 2,
        title: 'Solution',
        description: 'Built real-time collaboration with Socket.io',
        content: 'Created a task management app with real-time updates using Socket.io, drag-and-drop interface, and team management features. Implemented conflict resolution for simultaneous edits.',
        icon: '💡',
      },
      {
        id: 3,
        title: 'Tech Stack',
        description: 'Real-time technologies',
        content: 'React, Socket.io, Node.js, PostgreSQL, Redis for pub/sub',
        icon: '🛠️',
      },
      {
        id: 4,
        title: 'Challenges',
        description: 'Real-time synchronization',
        content: 'Ensuring data consistency across multiple clients and handling offline scenarios were the main challenges. Implemented operational transformation for conflict resolution.',
        icon: '⚡',
      },
      {
        id: 5,
        title: 'Impact',
        description: 'Improved team productivity',
        content: 'Reduced task completion time by 40% and improved team collaboration scores by 60%.',
        icon: '📈',
      },
    ],
  },
];

export default function CaseStudies() {
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const handleCaseSelect = (caseStudy: CaseStudy) => {
    setSelectedCase(caseStudy);
    setCurrentStep(0);
  };

  const nextStep = () => {
    if (selectedCase && currentStep < selectedCase.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-4">
            Interactive Case Studies
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            Explore detailed stories behind each project
          </p>

          {!selectedCase ? (
            <div className="grid md:grid-cols-2 gap-8">
              {caseStudies.map((caseStudy) => (
                <motion.div
                  key={caseStudy.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handleCaseSelect(caseStudy)}
                  className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg hover:shadow-xl transition-all cursor-pointer"
                >
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {caseStudy.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {caseStudy.description}
                  </p>
                  <div className="flex items-center text-blue-600 dark:text-blue-400 font-semibold">
                    Explore Case Study →
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-xl"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {selectedCase.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {selectedCase.description}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedCase(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Step {currentStep + 1} of {selectedCase.steps.length}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {Math.round(((currentStep + 1) / selectedCase.steps.length) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentStep + 1) / selectedCase.steps.length) * 100}%` }}
                    className="h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                  />
                </div>
              </div>

              {/* Step Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="mb-8"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-5xl">{selectedCase.steps[currentStep].icon}</span>
                    <div>
                      <h4 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {selectedCase.steps[currentStep].title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        {selectedCase.steps[currentStep].description}
                      </p>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                      {selectedCase.steps[currentStep].content}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex justify-between items-center">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    currentStep === 0
                      ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  ← Previous
                </button>

                <div className="flex gap-2">
                  {selectedCase.steps.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentStep(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentStep
                          ? 'bg-blue-600 w-8'
                          : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextStep}
                  disabled={currentStep === selectedCase.steps.length - 1}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    currentStep === selectedCase.steps.length - 1
                      ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Next →
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

