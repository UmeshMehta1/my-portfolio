'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useToast } from '@/components/Toast';

export function useKeyboardShortcuts() {
  const router = useRouter();
  const pathname = usePathname();
  const { showToast } = useToast();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in inputs
      if (
        (e.target as HTMLElement).tagName === 'INPUT' ||
        (e.target as HTMLElement).tagName === 'TEXTAREA' ||
        (e.target as HTMLElement).isContentEditable
      ) {
        return;
      }

      // Ctrl/Cmd + K for search (already handled by SearchBar)
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        return; // Let SearchBar handle it
      }

      // Navigation shortcuts
      if (e.key === 'h' || e.key === 'H') {
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          if (pathname !== '/') {
            router.push('/');
            showToast('Navigated to Home', 'info', 2000);
          } else {
            const homeSection = document.getElementById('home');
            if (homeSection) {
              homeSection.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }
      }

      // Scroll to top
      if (e.key === 't' || e.key === 'T') {
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
          showToast('Scrolled to top', 'info', 2000);
        }
      }

      // Scroll to bottom
      if (e.key === 'b' || e.key === 'B') {
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
          showToast('Scrolled to bottom', 'info', 2000);
        }
      }

      // Toggle dark mode
      if (e.key === 'd' || e.key === 'D') {
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          const themeToggle = document.querySelector('[aria-label="Toggle theme"]') as HTMLButtonElement;
          if (themeToggle) {
            themeToggle.click();
            showToast('Theme toggled', 'info', 2000);
          }
        }
      }

      // Number keys for section navigation (when on home page)
      if (pathname === '/' && !e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey) {
        const sections: { [key: string]: string } = {
          '1': 'home',
          '2': 'about',
          '3': 'skills',
          '4': 'projects',
          '5': 'contact',
        };

        if (sections[e.key]) {
          e.preventDefault();
          const section = document.getElementById(sections[e.key]);
          if (section) {
            const headerOffset = 80;
            const elementPosition = section.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth',
            });
            showToast(`Navigated to ${sections[e.key]}`, 'info', 2000);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router, pathname, showToast]);
}

