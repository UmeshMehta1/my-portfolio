'use client';

import { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import GamificationPanel from '@/components/Gamification';
import SkillsRadar from '@/components/SkillsRadar';
import TechStackTimeline from '@/components/TechStackTimeline';
import APIPlayground from '@/components/APIPlayground';
import AIChatbot from '@/components/AIChatbot';
import { useScrollTracking } from '@/hooks/useScrollTracking';
import { useScrollAnimations } from '@/components/ScrollAnimations';

export default function Home() {
  useScrollTracking();
  useScrollAnimations();

  // Handle hash navigation when coming from other pages
  useEffect(() => {
    const handleHashNavigation = () => {
      const hash = window.location.hash;
      if (hash) {
        // Wait for page to load, then scroll to section
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    };

    // Run on mount and when hash changes
    handleHashNavigation();
    window.addEventListener('hashchange', handleHashNavigation);
    
    return () => {
      window.removeEventListener('hashchange', handleHashNavigation);
    };
  }, []);

  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Skills />
      <SkillsRadar />
      <TechStackTimeline />
      <Projects />
      <APIPlayground />
      <Contact />
      <Footer />
      <GamificationPanel />
      <AIChatbot />
    </main>
  );
}
