'use client';

import React, { useState } from 'react';
import { Rocket, Moon, Sun, Volume2, VolumeX, ArrowUp } from 'lucide-react';
import { usePortfolioStore } from '@/lib/store';
import { DEFAULT_PROFILE } from '@/data/default-profile';
import { playAnimeSound } from '@/lib/audio';

export function Footer() {
  const { isDarkMode, toggleDarkMode, soundEnabled, toggleSound } = usePortfolioStore();
  const [isLaunching, setIsLaunching] = useState(false);

  const scrollToTop = () => {
    setIsLaunching(true);
    playAnimeSound('levelup');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setIsLaunching(false), 1200);
  };

  return (
    <footer className="relative px-6 sm:px-12 lg:px-24 py-12 bg-white dark:bg-[#04060A] text-navy-900 dark:text-slate-300 border-t border-navy-900/15 dark:border-electric-cyan/20 select-none">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-navy-900/10 dark:border-electric-cyan/15 font-mono text-xs">
        <div>
          <span className="font-bold text-navy-900 dark:text-white">
            {DEFAULT_PROFILE.name} — SYSTEMS PORTFOLIO
          </span>
          <p className="text-[11px] text-slate-500 mt-0.5">
            REACTIVE 3D // DISTRIBUTED ENGINES // KERNEL TELEMETRY
          </p>
        </div>

        {/* Global Controls: Dark Mode + Sound + Rocket Back to Top */}
        <div className="flex items-center gap-3">
          {/* Sound FX Toggle */}
          <button
            onClick={() => {
              toggleSound();
              if (!soundEnabled) playAnimeSound('click');
            }}
            title={soundEnabled ? 'Disable Anime Sound FX' : 'Enable Anime Sound FX'}
            className="p-2 rounded border border-navy-900/20 dark:border-electric-cyan/30 bg-navy-50 dark:bg-navy-900 hover:border-electric-blue transition-colors"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-electric-blue" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => {
              playAnimeSound('click');
              toggleDarkMode();
            }}
            title="Toggle Visual Theme"
            className="p-2 rounded border border-navy-900/20 dark:border-electric-cyan/30 bg-navy-50 dark:bg-navy-900 hover:border-electric-blue transition-colors"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-navy-900" />}
          </button>

          {/* Rocket Back-to-Top Animation */}
          <button
            onClick={scrollToTop}
            title="Launch Back to Top"
            className={`flex items-center gap-2 px-4 py-2 border-2 border-navy-900 dark:border-electric-cyan rounded-md font-mono text-xs font-bold transition-all ${
              isLaunching
                ? 'bg-electric-cyan text-black -translate-y-2 shadow-electric-cyan'
                : 'bg-electric-blue text-white hover:bg-blue-600'
            }`}
          >
            <Rocket className={`w-4 h-4 transition-transform ${isLaunching ? '-rotate-45 scale-125' : ''}`} />
            <span>TOP</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 font-mono text-[11px] text-slate-500">
        <div>
          DESIGN LANGUAGE: EDITORIAL TECH × WHITE &amp; ELECTRIC BLUE ANIME
        </div>
        <div>
          STATUS: ALL 64 SYSTEMS NOMINAL
        </div>
      </div>
    </footer>
  );
}
