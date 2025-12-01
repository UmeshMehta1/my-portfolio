'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Fuse from 'fuse.js';

interface SearchItem {
  id: string;
  title: string;
  description: string;
  type: 'project' | 'skill' | 'blog' | 'section';
  url: string;
  keywords: string[];
}

const searchData: SearchItem[] = [
  // Projects
  { id: '1', title: 'E-Commerce Platform', description: 'Full-stack e-commerce solution', type: 'project', url: '#projects', keywords: ['ecommerce', 'shopping', 'store', 'payment'] },
  { id: '2', title: 'Task Management App', description: 'Collaborative task management', type: 'project', url: '#projects', keywords: ['task', 'todo', 'collaboration', 'productivity'] },
  { id: '3', title: 'Analytics Dashboard', description: 'Data visualization dashboard', type: 'project', url: '#projects', keywords: ['analytics', 'dashboard', 'data', 'charts'] },
  
  // Skills
  { id: '4', title: 'React', description: 'Frontend framework', type: 'skill', url: '#skills', keywords: ['react', 'frontend', 'javascript', 'ui'] },
  { id: '5', title: 'Node.js', description: 'Backend runtime', type: 'skill', url: '#skills', keywords: ['node', 'backend', 'server', 'javascript'] },
  { id: '6', title: 'TypeScript', description: 'Typed JavaScript', type: 'skill', url: '#skills', keywords: ['typescript', 'types', 'javascript'] },
  { id: '7', title: 'MongoDB', description: 'NoSQL database', type: 'skill', url: '#skills', keywords: ['mongodb', 'database', 'nosql', 'data'] },
  
  // Sections
  { id: '8', title: 'About Me', description: 'Learn about my background', type: 'section', url: '#about', keywords: ['about', 'bio', 'background', 'story'] },
  { id: '9', title: 'Projects', description: 'View my projects', type: 'section', url: '#projects', keywords: ['projects', 'work', 'portfolio', 'apps'] },
  { id: '10', title: 'Skills', description: 'My technical skills', type: 'section', url: '#skills', keywords: ['skills', 'technologies', 'expertise'] },
  { id: '11', title: 'Blog', description: 'Read my blog posts', type: 'section', url: '#blog', keywords: ['blog', 'articles', 'posts', 'writing'] },
  { id: '12', title: 'Contact', description: 'Get in touch', type: 'section', url: '#contact', keywords: ['contact', 'email', 'reach', 'connect'] },
];

const fuse = new Fuse(searchData, {
  keys: ['title', 'description', 'keywords'],
  threshold: 0.3,
  includeScore: true,
});

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (query.trim()) {
      const searchResults = fuse.search(query);
      setResults(searchResults.map(result => result.item));
    } else {
      setResults([]);
    }
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        setQuery('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSelect = (item: SearchItem) => {
    window.location.href = item.url;
    setIsOpen(false);
    setQuery('');
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'project': return '🚀';
      case 'skill': return '💻';
      case 'blog': return '📝';
      case 'section': return '📍';
      default: return '🔍';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'project': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300';
      case 'skill': return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
      case 'blog': return 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300';
      case 'section': return 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300';
      default: return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300';
    }
  };

  return (
    <>
      {/* Search Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span className="text-sm">Search</span>
        <kbd className="hidden lg:inline-block px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded">
          ⌘K
        </kbd>
      </button>

      {/* Search Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="fixed top-20 left-1/2 transform -translate-x-1/2 w-full max-w-2xl z-50"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
                {/* Search Input */}
                <div className="flex items-center gap-4 p-4 border-b border-gray-200 dark:border-gray-700">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search projects, skills, blog posts..."
                    className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 outline-none"
                  />
                  <kbd className="hidden sm:inline-block px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded">
                    ESC
                  </kbd>
                </div>

                {/* Results */}
                <div className="max-h-96 overflow-y-auto">
                  {query.trim() && results.length > 0 ? (
                    <div className="p-2">
                      {results.map((item) => (
                        <motion.button
                          key={item.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          onClick={() => handleSelect(item)}
                          className="w-full flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
                        >
                          <span className="text-2xl">{getTypeIcon(item.type)}</span>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-gray-900 dark:text-white">{item.title}</h4>
                              <span className={`px-2 py-0.5 text-xs rounded-full ${getTypeColor(item.type)}`}>
                                {item.type}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                          </div>
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </motion.button>
                      ))}
                    </div>
                  ) : query.trim() ? (
                    <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                      <p>No results found for "{query}"</p>
                    </div>
                  ) : (
                    <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                      <p>Start typing to search...</p>
                      <div className="mt-4 flex flex-wrap gap-2 justify-center">
                        {['React', 'Node.js', 'Projects', 'Blog'].map((tag) => (
                          <button
                            key={tag}
                            onClick={() => setQuery(tag)}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-600"
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

