'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { apiUrl } from '@/lib/api';
import Header from './Header';
import Footer from './Footer';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  category: string;
  tags: string[];
  imageUrl?: string;
  readTime: number;
  publishedAt: string;
  views: number;
}

export default function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchPosts();
  }, [selectedCategory]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const url = selectedCategory === 'All'
        ? `${apiUrl}/api/blog?limit=20`
        : `${apiUrl}/api/blog?category=${selectedCategory}&limit=20`;
      
      const response = await fetch(url);
      const data = await response.json() as { posts?: BlogPost[]; total?: number; totalPages?: number; currentPage?: number };
      
      const posts: BlogPost[] = Array.isArray(data.posts) ? data.posts : [];
      setPosts(posts);
      
      // Extract unique categories
      const postCategories: string[] = posts
        .map((p: BlogPost) => p.category)
        .filter((cat: string | undefined): cat is string => typeof cat === 'string' && cat.length > 0);
      const uniqueCategories: string[] = ['All', ...new Set<string>(postCategories)];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <>
      <Header />
      <section className="py-20 bg-white dark:bg-gray-800 min-h-screen">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-7xl mx-auto"
          >
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Blog
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Articles about web development, MERN stack, Next.js, React, and software engineering
              </p>
            </div>

            {/* Category Filter */}
            {categories.length > 1 && (
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
            )}

            {/* Blog Posts Grid */}
            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-400">Loading posts...</p>
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-600 dark:text-gray-400">No blog posts found.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post, index) => (
                  <motion.article
                    key={post._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden hover:shadow-xl transition-all transform hover:scale-105"
                  >
                    <Link href={`/blog/${post.slug}`}>
                      {post.imageUrl && (
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={post.imageUrl}
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <div className="flex items-center gap-4 mb-3 text-sm text-gray-500 dark:text-gray-400">
                          <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 rounded-full text-xs font-medium">
                            {post.category}
                          </span>
                          <span>{post.readTime} min read</span>
                          <span>{post.views} views</span>
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                          {post.title}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(post.publishedAt)} • {post.author}
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>
      <Footer />
    </>
  );
}

