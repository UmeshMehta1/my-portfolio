'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { format } from 'date-fns';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  readTime: number;
  image?: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Getting Started with Next.js 14',
    excerpt: 'Learn the fundamentals of Next.js 14 and build modern web applications with the latest features.',
    content: 'Full article content here...',
    author: 'Your Name',
    date: '2024-01-15',
    category: 'Tutorial',
    readTime: 5,
  },
  {
    id: 2,
    title: 'Mastering TypeScript for React',
    excerpt: 'Deep dive into TypeScript patterns and best practices for React development.',
    content: 'Full article content here...',
    author: 'Your Name',
    date: '2024-01-10',
    category: 'Development',
    readTime: 8,
  },
  {
    id: 3,
    title: 'Building Scalable APIs with Node.js',
    excerpt: 'Best practices for designing and implementing RESTful APIs that scale.',
    content: 'Full article content here...',
    author: 'Your Name',
    date: '2024-01-05',
    category: 'Backend',
    readTime: 6,
  },
];

export default function Blog() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

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

          <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer"
              >
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {post.readTime} min read
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>{format(new Date(post.date), 'MMM dd, yyyy')}</span>
                    <a
                      href={`/blog/${post.id}`}
                      className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                    >
                      Read More →
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <a
              href="/blog"
              className="px-8 py-3 border-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors inline-block"
            >
              View All Posts
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

