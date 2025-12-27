'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { apiUrl } from '@/lib/api';

interface APIEndpoint {
  method: string;
  path: string;
  description: string;
  example: string;
  response: string;
}

const getApiEndpoints = (baseUrl: string): APIEndpoint[] => [
  {
    method: 'GET',
    path: '/api/stats',
    description: 'Get visitor statistics',
    example: `fetch("${baseUrl}/api/stats")`,
    response: JSON.stringify({
      todayVisitors: 42,
      totalVisitors: 1234,
      uniqueToday: 38,
      onlineUsers: 5,
    }, null, 2),
  },
  {
    method: 'GET',
    path: '/api/projects',
    description: 'Get all projects',
    example: `fetch("${baseUrl}/api/projects?category=Full Stack")`,
    response: JSON.stringify([
      {
        id: 1,
        title: 'E-Commerce Platform',
        description: 'Full-stack e-commerce solution',
        technologies: ['Next.js', 'Node.js', 'MongoDB'],
      },
    ], null, 2),
  },
  {
    method: 'POST',
    path: '/api/contact',
    description: 'Submit contact form',
    example: `fetch("${baseUrl}/api/contact", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "John Doe",
    email: "john@example.com",
    subject: "Hello",
    message: "Your message here"
  })
})`,
    response: JSON.stringify({
      message: 'Message sent successfully!',
      id: '507f1f77bcf86cd799439011',
    }, null, 2),
  },
];

export default function APIPlayground() {
  const apiEndpoints = getApiEndpoints(apiUrl);
  const [selectedEndpoint, setSelectedEndpoint] = useState(apiEndpoints[0]);
  const [response, setResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const testEndpoint = async () => {
    setIsLoading(true);
    setError('');
    setResponse('');

    try {
      const url = `${apiUrl}${selectedEndpoint.path}`;
      const options: RequestInit = {
        method: selectedEndpoint.method,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if (selectedEndpoint.method === 'POST') {
        options.body = JSON.stringify({
          name: 'Test User',
          email: 'test@example.com',
          subject: 'Test Subject',
          message: 'This is a test message from the API playground',
        });
      }

      const res = await fetch(url, options);
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-center text-gray-900 dark:text-white mb-3 sm:mb-4">
            API Playground
          </h2>
          <p className="text-center text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-8 sm:mb-12 px-4">
            Test my backend API endpoints directly from the browser
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Endpoint Selector */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">Available Endpoints</h3>
              <div className="space-y-2 sm:space-y-3">
                {apiEndpoints.map((endpoint) => (
                  <button
                    key={endpoint.path}
                    onClick={() => {
                      setSelectedEndpoint(endpoint);
                      setResponse('');
                      setError('');
                    }}
                    className={`w-full text-left p-3 sm:p-4 rounded-lg border-2 transition-all ${
                      selectedEndpoint.path === endpoint.path
                        ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
                      <span className={`px-2 py-1 rounded text-xs font-semibold whitespace-nowrap ${
                        endpoint.method === 'GET' 
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                          : 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                      }`}>
                        {endpoint.method}
                      </span>
                      <code className="text-xs sm:text-sm font-mono text-gray-700 dark:text-gray-300 break-all">
                        {endpoint.path}
                      </code>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      {endpoint.description}
                    </p>
                  </button>
                ))}
              </div>

              <button
                onClick={testEndpoint}
                disabled={isLoading}
                className="w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-emerald-600 text-white rounded-lg text-sm sm:text-base font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Testing...' : 'Test Endpoint'}
              </button>
            </div>

            {/* Code & Response */}
            <div className="space-y-3 sm:space-y-4">
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">Example Code</h3>
                <pre className="bg-gray-900 text-gray-100 p-3 sm:p-4 rounded-lg overflow-x-auto text-xs sm:text-sm">
                  <code className="break-words whitespace-pre-wrap">{selectedEndpoint.example}</code>
                </pre>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">Response</h3>
                {error ? (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-3 sm:p-4 rounded-lg">
                    <p className="text-xs sm:text-sm text-red-800 dark:text-red-300 break-words">{error}</p>
                  </div>
                ) : response ? (
                  <pre className="bg-gray-900 text-gray-100 p-3 sm:p-4 rounded-lg overflow-x-auto text-xs sm:text-sm">
                    <code className="break-words whitespace-pre-wrap">{response}</code>
                  </pre>
                ) : (
                  <pre className="bg-gray-900 text-gray-100 p-3 sm:p-4 rounded-lg overflow-x-auto text-xs sm:text-sm">
                    <code className="break-words whitespace-pre-wrap">{selectedEndpoint.response}</code>
                  </pre>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-xs sm:text-sm text-blue-800 dark:text-blue-300 break-words">
              <strong>Note:</strong> API calls are made to: <code className="bg-gray-200 dark:bg-gray-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs sm:text-sm break-all">{apiUrl}</code>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

