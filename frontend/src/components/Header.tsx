'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from './ThemeProvider';
import { useSocket } from './SocketProvider';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from './SearchBar';
import VisitorGraph from './VisitorGraph';
import Tooltip from './Tooltip';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { visitorCount, onlineUsers } = useSocket();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle smooth scroll navigation without hash in URL
  const handleNavClick = (href: string) => {
    // Handle section navigation (smooth scroll without hash)
    if (href.startsWith('#')) {
      const sectionId = href.substring(1);
      
      // If not on home page, navigate to home first
      if (pathname !== '/') {
        router.push('/');
        // Wait for navigation, then scroll
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            const headerOffset = 80; // Account for fixed header
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }, 300);
      } else {
        // Already on home page, just scroll
        const element = document.getElementById(sectionId);
        if (element) {
          const headerOffset = 80; // Account for fixed header
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    }
    // Close mobile menu on click
    setIsMenuOpen(false);
  };

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '/blog', label: 'Blog' },
    { href: '#contact', label: 'Contact' },
  ];

  const toggleTheme = () => {
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    // Immediately update the class to prevent delay
    if (typeof window !== 'undefined') {
      const root = document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(newTheme);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg'
          : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm'
      } border-b border-gray-200 dark:border-gray-800`}
    >
      <nav className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Portfolio Logo - Hidden on mobile */}
          <Link
            href="/"
            className="hidden md:block text-2xl font-display bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent tracking-tight"
          >
            Portfolio
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              // For hash links, use onClick handler for smooth scroll
              // For regular links like /blog, use normal Link
              if (link.href.startsWith('#')) {
                return (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium relative group bg-transparent border-none cursor-pointer"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-600 dark:bg-emerald-400 group-hover:w-full transition-all duration-300" />
                  </button>
                );
              }
              
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-600 dark:bg-emerald-400 group-hover:w-full transition-all duration-300" />
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 lg:gap-4">
            {/* Visitor Graph - Visible on all screens including mobile */}
            <div className="block">
              <VisitorGraph />
            </div>

            {/* Search Bar - Visible on all screens */}
            <div className="flex-shrink-0">
              <SearchBar />
            </div>

            {/* Real-time Stats - Desktop and Tablet */}
            <div className="hidden lg:flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              {visitorCount > 0 && (
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span>{visitorCount} visitors</span>
                </div>
              )}
              {onlineUsers > 0 && (
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                  <span>{onlineUsers} online</span>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <Tooltip content={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode (Ctrl/Cmd + D)`}>
              <button
                onClick={toggleTheme}
                className="p-1.5 sm:p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex-shrink-0"
                aria-label="Toggle theme"
              >
              {resolvedTheme === 'dark' ? (
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
              </button>
            </Tooltip>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-700 dark:text-gray-300 p-1.5 sm:p-2 flex-shrink-0"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-3 sm:mt-4 space-y-3 sm:space-y-4 pb-3 sm:pb-4"
            >
              {/* Mobile Visitor Stats */}
              <div className="flex flex-col items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex flex-wrap items-center gap-3 w-full">
                  {visitorCount > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500 dark:text-gray-400">Today</span>
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{visitorCount} visitors</span>
                      </div>
                    </div>
                  )}
                  {onlineUsers > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500 dark:text-gray-400">Online</span>
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{onlineUsers} users</span>
                      </div>
                    </div>
                  )}
                </div>
                {/* 7-day visitor graph in mobile menu - visible on all mobile sizes */}
                <div className="w-full">
                  <VisitorGraph />
                </div>
              </div>

              {navLinks.map((link) => {
                // For hash links, use button for smooth scroll
                // For regular links like /blog, use normal Link
                if (link.href.startsWith('#')) {
                  return (
                    <button
                      key={link.href}
                      onClick={() => {
                        handleNavClick(link.href);
                      }}
                      className="block w-full text-left text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium bg-transparent border-none cursor-pointer py-2"
                    >
                      {link.label}
                    </button>
                  );
                }
                
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium py-2"
                  >
                    {link.label}
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
