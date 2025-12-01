'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { callAIEndpoint } from '@/lib/api';

interface BlogPost {
  id: number;
  title: string;
  content: string;
}

interface BlogPostWithSummary extends BlogPost {
  summary?: string;
  isSummarizing?: boolean;
  error?: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Getting Started with Next.js 14',
    content: `Next.js 14 introduces several exciting features that make building React applications even more powerful. The new App Router provides a more intuitive way to structure your application, with support for layouts, loading states, and error boundaries built right in.

One of the standout features is Server Components, which allow you to render components on the server, reducing the amount of JavaScript sent to the client. This results in faster page loads and better SEO.

The new Image component has been optimized for performance, automatically handling image optimization, lazy loading, and responsive images. Combined with the improved caching strategies, your Next.js applications will be faster than ever.

TypeScript support has also been enhanced, with better type inference and improved developer experience. The new Turbopack bundler provides lightning-fast development builds, making your development workflow smoother.

Overall, Next.js 14 represents a significant step forward in React framework development, offering better performance, developer experience, and production-ready features out of the box.`,
  },
  {
    id: 2,
    title: 'Mastering TypeScript for React',
    content: `TypeScript brings type safety to React development, helping catch errors before they reach production. Understanding how to properly type React components, props, and hooks is essential for building robust applications.

One key concept is using generic types for reusable components. This allows you to create flexible components that work with different data types while maintaining type safety.

The use of discriminated unions is particularly powerful for managing component state. By using type guards and narrowing, you can ensure that your state transitions are type-safe.

Advanced patterns like higher-order components and render props can be challenging to type correctly, but TypeScript's conditional types and mapped types provide the tools needed to create type-safe abstractions.

Best practices include avoiding the use of 'any', leveraging strict mode, and using utility types like Partial, Pick, and Omit to create new types from existing ones.`,
  },
  {
    id: 3,
    title: 'Building Scalable APIs with Node.js',
    content: `Building scalable APIs requires careful consideration of architecture, performance, and maintainability. Node.js provides an excellent foundation for building high-performance APIs.

One important aspect is proper error handling. Implementing a centralized error handling middleware ensures consistent error responses and makes debugging easier. Using async/await with proper try-catch blocks helps prevent unhandled promise rejections.

Database optimization is crucial for scalability. Using connection pooling, implementing proper indexing, and considering read replicas for read-heavy workloads can significantly improve performance.

Caching strategies, such as Redis for frequently accessed data, can reduce database load and improve response times. Implementing rate limiting prevents abuse and ensures fair resource usage.

Security should never be an afterthought. Implementing proper authentication and authorization, validating and sanitizing inputs, and using HTTPS are essential practices for production APIs.`,
  },
];

export default function BlogWithSummaries() {
  const [posts, setPosts] = useState<BlogPostWithSummary[]>(blogPosts);

  const generateSummary = async (postId: number) => {
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    // Update post to show loading
    setPosts(prev => prev.map(p => 
      p.id === postId ? { ...p, isSummarizing: true, error: undefined } : p
    ));

    try {
      const data = await callAIEndpoint('summarize-blog', { blogContent: post.content });

      if (data.summary) {
        setPosts(prev => prev.map(p => 
          p.id === postId ? { ...p, summary: data.summary, isSummarizing: false, error: undefined } : p
        ));
      } else {
        throw new Error('Invalid response from server: No summary in response');
      }
    } catch (error) {
      console.error('Error generating summary:', error);
      
      let errorMessage = 'Failed to generate summary.';
      
      if (error instanceof Error) {
        // Check if it's an API not enabled error
        if (error.message.includes('Generative Language API') || error.message.includes('not enabled')) {
          errorMessage = 'AI service is not available. The Generative Language API needs to be enabled in Google Cloud Console.';
        } else if (error.message.includes('Cannot connect')) {
          errorMessage = 'Cannot connect to backend server. Please make sure the backend is running on port 5000.';
        } else {
          errorMessage = error.message;
        }
      }
      
      setPosts(prev => prev.map(p => 
        p.id === postId ? { 
          ...p, 
          isSummarizing: false, 
          error: errorMessage,
          summary: undefined 
        } : p
      ));
    }
  };

  return (
    <section id="blog" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-4">
            Latest Blog Posts
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            Insights, tutorials, and thoughts on web development and technology
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden hover:shadow-xl transition-all"
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {post.content.substring(0, 150)}...
                  </p>

                  {post.summary && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
                    >
                      <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2 flex items-center gap-2">
                        <span>🤖</span> AI Summary
                      </h4>
                      <p className="text-sm text-blue-800 dark:text-blue-200 whitespace-pre-wrap">
                        {post.summary}
                      </p>
                    </motion.div>
                  )}

                  {post.error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800"
                    >
                      <h4 className="text-sm font-semibold text-red-900 dark:text-red-300 mb-2 flex items-center gap-2">
                        <span>⚠️</span> Error
                      </h4>
                      <p className="text-sm text-red-800 dark:text-red-200">
                        {post.error}
                      </p>
                      <button
                        onClick={() => generateSummary(post.id)}
                        className="mt-2 text-xs text-red-700 dark:text-red-300 hover:underline"
                      >
                        Try again
                      </button>
                    </motion.div>
                  )}

                  <div className="flex items-center justify-between">
                    <a
                      href={`/blog/${post.id}`}
                      className="text-blue-600 dark:text-blue-400 hover:underline font-medium text-sm"
                    >
                      Read More →
                    </a>
                    <button
                      onClick={() => generateSummary(post.id)}
                      disabled={post.isSummarizing || !!post.summary}
                      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {post.isSummarizing ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Summarizing...
                        </span>
                      ) : post.summary ? (
                        '✓ Summarized'
                      ) : (
                        '🤖 AI Summary'
                      )}
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

