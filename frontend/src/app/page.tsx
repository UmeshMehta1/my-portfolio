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
import { useScrollAnimations } from '@/components/ScrollAnimations';

export default function Home() {
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
      <APIPlayground />
      <Contact />
      <Footer />
    </main>
  );
}
