'use client';

import { useEffect, useRef } from 'react';
import { useGamification } from '@/components/Gamification';

export function useScrollTracking() {
  const { unlockAchievement } = useGamification();
  const hasUnlockedScroll = useRef(false);
  const hasUnlockedSections = useRef<Set<string>>(new Set());
  const startTime = useRef<number>(Date.now());

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      
      // Unlock scroll achievement
      if (scrollPercent >= 100 && !hasUnlockedScroll.current) {
        unlockAchievement('scroll-100');
        hasUnlockedScroll.current = true;
      }

      // Track section views
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
          
          if (isVisible && !hasUnlockedSections.current.has(section)) {
            unlockAchievement(`view-${section}`);
            hasUnlockedSections.current.add(section);
          }
        }
      });
    };

    // Track time spent
    const timeCheckInterval = setInterval(() => {
      const timeSpent = (Date.now() - startTime.current) / 1000;
      
      if (timeSpent >= 30 && !hasUnlockedSections.current.has('stay-30s')) {
        unlockAchievement('stay-30s');
        hasUnlockedSections.current.add('stay-30s');
      }
      
      if (timeSpent >= 120 && !hasUnlockedSections.current.has('stay-2min')) {
        unlockAchievement('stay-2min');
        hasUnlockedSections.current.add('stay-2min');
      }
    }, 1000);

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timeCheckInterval);
    };
  }, [unlockAchievement]);
}

