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
import CaseStudies from '@/components/CaseStudy';
import SkillsRadar from '@/components/SkillsRadar';
import TechStackTimeline from '@/components/TechStackTimeline';
import APIPlayground from '@/components/APIPlayground';
import AIChatbot from '@/components/AIChatbot';
import BlogWithSummaries from '@/components/BlogSummary';
import { useScrollTracking } from '@/hooks/useScrollTracking';
import { useScrollAnimations } from '@/components/ScrollAnimations';

export default function Home() {
  useScrollTracking();
  useScrollAnimations();

  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Skills />
      <SkillsRadar />
      <TechStackTimeline />
      <Projects />
      <CaseStudies />
      <BlogWithSummaries />
      <APIPlayground />
      <Contact />
      <Footer />
      <GamificationPanel />
      <AIChatbot />
    </main>
  );
}
