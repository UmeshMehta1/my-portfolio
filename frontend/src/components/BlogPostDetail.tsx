'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useMemo } from 'react';
import { marked } from 'marked';
import Header from './Header';
import Footer from './Footer';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  tags: string[];
  imageUrl?: string;
  readTime: number;
  publishedAt: string;
  views: number;
}

export default function BlogPostDetail({ post }: { post: BlogPost }) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Configure marked for better HTML output
  marked.setOptions({
    breaks: true,
    gfm: true,
  });

  // Convert markdown to HTML
  const htmlContent = useMemo((): string => {
    try {
      const parsed = marked.parse(post.content);
      // marked.parse can return string or Promise<string>
      // Ensure we always return a string
      if (typeof parsed === 'string') {
        return parsed;
      }
      // If it's a Promise (shouldn't happen with default config), return content as-is
      // In practice, marked.parse returns string synchronously
      return post.content;
    } catch (error) {
      console.error('Error parsing markdown:', error);
      return post.content; // Fallback to raw content
    }
  }, [post.content]);

  // Check if this is the Digital Pathshala blog post
  const isDigitalPathshalaPost = post.slug === 'digital-pathshala-nepal-leading-software-development-company';
  const backgroundImage = isDigitalPathshalaPost ? '/images/dpback.jpg' : undefined;

  return (
    <>
      <Header />
      <article 
        className={`py-8 sm:py-12 md:py-16 lg:py-20 min-h-screen relative transition-colors duration-300 ${backgroundImage ? 'blog-background-image' : 'bg-white dark:bg-gray-800'}`}
        style={backgroundImage ? {
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        } : {}}
      >
        {backgroundImage && (
          <div className="absolute inset-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm z-0 transition-colors duration-300" />
        )}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            {/* Back Button */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 hover:underline mb-4 sm:mb-6 md:mb-8 text-sm sm:text-base"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="hidden sm:inline">Back to Blog</span>
              <span className="sm:hidden">Back</span>
            </Link>

            {/* Header */}
            <header className="mb-6 sm:mb-8 md:mb-10 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-gray-800 dark:to-gray-900 rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 border border-emerald-100 dark:border-gray-700">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                <span className="px-3 sm:px-4 py-1 sm:py-1.5 bg-emerald-600 text-white rounded-full text-xs font-semibold shadow-sm">
                  {post.category}
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="hidden sm:inline">{post.readTime} min read</span>
                  <span className="sm:hidden">{post.readTime}m</span>
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span>{post.views} views</span>
                </span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-heading font-bold text-gray-900 dark:text-white mb-4 sm:mb-5 md:mb-6 leading-tight">
                {post.title}
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-4 sm:mb-5 md:mb-6 leading-relaxed font-medium">
                {post.excerpt}
              </p>

              <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400 pt-3 sm:pt-4 border-t border-emerald-200 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="font-medium">By {post.author}</span>
                </div>
                <span className="hidden sm:inline text-gray-400">•</span>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
              </div>
            </header>

            {/* Featured Image */}
            {post.imageUrl && (
              <div className="mb-6 sm:mb-8 md:mb-10 rounded-lg sm:rounded-xl overflow-hidden shadow-lg sm:shadow-xl border border-gray-200 dark:border-gray-700">
                <img
                  src={post.imageUrl}
                  alt={`${post.title} - Featured image for blog post about ${post.category}`}
                  title={post.title}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}

            {/* Content */}
            <div className="blog-content-wrapper mb-8 sm:mb-10 md:mb-12">
              <div
                className="blog-content prose prose-sm sm:prose-base md:prose-lg dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
            </div>

            {/* Tags and Share Section */}
            <div className="mt-8 sm:mt-10 md:mt-12 space-y-6 sm:space-y-8">
              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4 flex items-center gap-2">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 sm:px-4 py-1.5 sm:py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 rounded-md sm:rounded-lg text-xs sm:text-sm font-medium hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-colors cursor-default"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Share Section */}
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-gray-800 dark:to-gray-900 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-emerald-100 dark:border-gray-700">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4 flex items-center gap-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Share this article
                </h3>
                <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1a8cd8] transition-colors font-medium shadow-sm text-sm sm:text-base"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                    <span className="hidden sm:inline">Share on Twitter</span>
                    <span className="sm:hidden">Twitter</span>
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-[#0077b5] text-white rounded-lg hover:bg-[#006399] transition-colors font-medium shadow-sm text-sm sm:text-base"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    <span className="hidden sm:inline">Share on LinkedIn</span>
                    <span className="sm:hidden">LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </article>
      <Footer />
    </>
  );
}

