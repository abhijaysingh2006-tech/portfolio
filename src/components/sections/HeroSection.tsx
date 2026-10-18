'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, Terminal, Sparkles } from 'lucide-react';
import { SignalField3D } from '@/components/hero/SignalField3D';
import { HeroStatsHUD } from '@/components/hero/HeroStatsHUD';
import { OriginalCoderMascot } from '@/components/mascot/OriginalCoderMascot';
import { DEFAULT_PROFILE } from '@/data/default-profile';
import { playAnimeSound } from '@/lib/audio';

export function HeroSection() {
  const [coords, setCoords] = useState({ x: 512, y: 384 });
  const [eventCount, setEventCount] = useState(142);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setCoords({ x: e.clientX, y: e.clientY });
      setEventCount((prev) => prev + 1);
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  const scrollToProjects = () => {
    playAnimeSound('click');
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-6 sm:px-12 lg:px-24 pt-28 pb-16 overflow-hidden border-b border-navy-900/10 dark:border-electric-cyan/20"
    >
      {/* 3D Reactive Particle Field */}
      <SignalField3D />

      {/* Top Monospace Editorial Figure Header */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 mb-8 font-mono text-xs">
        <div className="flex items-center gap-3">
          <span className="px-2 py-0.5 border border-navy-900 dark:border-electric-cyan bg-white dark:bg-navy-900 font-bold text-navy-900 dark:text-electric-cyan shadow-sm">
            FIG. 01
          </span>
          <span className="text-slate-600 dark:text-slate-400">
            SIGNAL FIELD // LIVE TOPOLOGY
          </span>
        </div>

        {/* Live Coordinate & Event Readout */}
        <div className="hidden sm:flex items-center gap-4 text-[11px] text-slate-500 dark:text-slate-400 bg-white/80 dark:bg-navy-950/80 px-3 py-1 rounded border border-navy-900/10 dark:border-electric-cyan/20 backdrop-blur-sm">
          <span>X: <strong className="text-navy-900 dark:text-white font-mono">{coords.x}</strong></span>
          <span>Y: <strong className="text-navy-900 dark:text-white font-mono">{coords.y}</strong></span>
          <span>EVT: <strong className="text-electric-blue dark:text-electric-cyan font-mono">{eventCount}</strong></span>
          <span className="text-emerald-500 font-bold">● ACTIVE</span>
        </div>
      </div>

      {/* Main Grid: Headline + Mascot on Left, HUD on Right */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Editorial Content (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Category Pill */}
          <div className="flex flex-wrap items-center gap-2 self-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/5 dark:bg-white/10 border border-black/15 dark:border-white/20 rounded-full text-xs font-mono font-medium text-black dark:text-white">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>{DEFAULT_PROFILE.role}</span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-black dark:text-white leading-[1.08]">
            I build the <em className="italic font-serif underline decoration-zinc-400 dark:decoration-zinc-600 decoration-1">systems</em> behind the screen.
          </h1>

          {/* Bio / Description */}
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl font-normal leading-relaxed">
            {DEFAULT_PROFILE.bio}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={scrollToProjects}
              className="group relative inline-flex items-center gap-3 px-6 py-3.5 bg-black dark:bg-white text-white dark:text-black font-mono font-bold text-sm rounded-md shadow-sm transition-all duration-150 hover:opacity-90 active:scale-[0.98]"
            >
              <span>View projects</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <a
              href="https://github.com/abhijaysingh2006-tech"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-transparent border border-black/20 dark:border-white/20 text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/5 font-mono font-bold text-sm rounded-md transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span>GitHub Profile</span>
            </a>
          </div>

          {/* Monospace System Footnote */}
          <div className="flex items-center gap-2 pt-4 font-mono text-xs text-zinc-500 dark:text-zinc-400">
            <Terminal className="w-3.5 h-3.5" />
            <span>ROBOTICS · AI · AUTOMATED REPO SYNC · SCALABLE ARCHITECTURES</span>
          </div>
        </div>

        {/* Right HUD Column (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <HeroStatsHUD />
        </div>
      </div>
    </section>
  );
}
