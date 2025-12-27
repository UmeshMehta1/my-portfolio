'use client';

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import SkillsRadar from '@/components/SkillsRadar';
import TechStackTimeline from '@/components/TechStackTimeline';
import APIPlayground from '@/components/APIPlayground';
import ScrollProgress from '@/components/ScrollProgress';
import BackToTop from '@/components/BackToTop';
import { useScrollAnimations } from '@/components/ScrollAnimations';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

export default function Home() {
  useScrollAnimations();
  useKeyboardShortcuts();

  return (
    <main className="min-h-screen">
      <ScrollProgress />
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
      <BackToTop />
    </main>
  );
}
