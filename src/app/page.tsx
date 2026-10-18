'use client';

import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { Header } from '@/components/navigation/Header';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { ArchitectureSection } from '@/components/sections/ArchitectureSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { SessionSection } from '@/components/sections/SessionSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/sections/Footer';
import { RepoCaseFileModal } from '@/components/projects/RepoCaseFileModal';

export default function HomePage() {
  useEffect(() => {
    // Initialize smooth Lenis scroll
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="relative flex flex-col min-h-screen bg-white dark:bg-[#09090b] text-[#09090b] dark:text-[#f4f4f5]">
      {/* Top Header Navigation */}
      <Header />

      {/* 1. HERO (Live signal field & overview) */}
      <HeroSection />

      {/* 2. 01 PROJECTS: ALL GITHUB REPOS */}
      <ProjectsSection />

      {/* 3. 02 ARCHITECTURE: ANIMATED SYSTEM DIAGRAMS & 4-STAGE PIPELINE */}
      <ArchitectureSection />

      {/* 4. 03 SKILLS / LEARNINGS: RPG SKILL TREE */}
      <SkillsSection />

      {/* 5. 04 ABOUT: MANGA PAGE & STATS SHEET */}
      <AboutSection />

      {/* 6. 05 YOUR SESSION: LOCAL CLIENT TELEMETRY */}
      <SessionSection />

      {/* 7. 06 CONTACT: DISPATCH PACKET */}
      <ContactSection />

      {/* 8. FOOTER WITH ROCKET TO TOP */}
      <Footer />

      {/* Full-screen Case File Modal */}
      <RepoCaseFileModal />
    </main>
  );
}
