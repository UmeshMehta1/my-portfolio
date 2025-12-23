'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initialize with 'system' to match server render
  const [theme, setTheme] = useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  // Only run on client after mount to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
    
    // Read from localStorage only on client
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme') as Theme | null;
      if (stored) {
        setTheme(stored);
      }
    }
  }, []);

  // Apply theme changes only after mount
  useEffect(() => {
    if (typeof window === 'undefined' || !mounted) return;

    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    let resolved: 'light' | 'dark';
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      resolved = mediaQuery.matches ? 'dark' : 'light';
      
      // Listen for system theme changes
      const handleChange = (e: MediaQueryListEvent) => {
        const newResolved = e.matches ? 'dark' : 'light';
        setResolvedTheme(newResolved);
        const rootEl = document.documentElement;
        rootEl.classList.remove('light', 'dark');
        rootEl.classList.add(newResolved);
      };
      
      mediaQuery.addEventListener('change', handleChange);
      
      setResolvedTheme(resolved);
      root.classList.add(resolved);
      
      return () => {
        mediaQuery.removeEventListener('change', handleChange);
      };
    } else {
      resolved = theme;
      setResolvedTheme(resolved);
      root.classList.add(resolved);
    }
    
    // Save to localStorage only on client
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
    }
  }, [theme, mounted]);

  // Always provide context with consistent initial values
  const contextValue = {
    theme,
    setTheme,
    resolvedTheme: mounted ? resolvedTheme : 'light', // Default to light before mount
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

