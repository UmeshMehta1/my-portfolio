'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function useScrollAnimations() {
  useEffect(() => {
    // Animate elements on scroll
    gsap.utils.toArray<HTMLElement>('[data-animate]').forEach((element) => {
      gsap.from(element, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      });
    });

    // Parallax effect for hero section
    const hero = document.querySelector('[data-parallax]');
    if (hero) {
      gsap.to(hero, {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    // Magnetic buttons
    const magneticButtons = document.querySelectorAll('[data-magnetic]');
    magneticButtons.forEach((button) => {
      button.addEventListener('mousemove', (e) => {
        const rect = (button as HTMLElement).getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(button, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.5,
          ease: 'power2.out',
        });
      });

      button.addEventListener('mouseleave', () => {
        gsap.to(button, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
        });
      });
    });

    // 3D tilt effect
    const tiltElements = document.querySelectorAll('[data-tilt]');
    tiltElements.forEach((element) => {
      element.addEventListener('mousemove', (e) => {
        const rect = (element as HTMLElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        gsap.to(element, {
          rotateX,
          rotateY,
          transformPerspective: 1000,
          duration: 0.3,
        });
      });

      element.addEventListener('mouseleave', () => {
        gsap.to(element, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.5,
        });
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
}

