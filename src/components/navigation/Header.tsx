'use client';

import React from 'react';
import { DEFAULT_PROFILE } from '@/data/default-profile';
import { playAnimeSound } from '@/lib/audio';

const NAV_ITEMS = [
  { label: '01 PROJECTS', href: '#projects' },
  { label: '02 ARCH', href: '#architecture' },
  { label: '03 SKILLS', href: '#skills' },
  { label: '04 ABOUT', href: '#about' },
  { label: '05 TELEMETRY', href: '#session' },
  { label: '06 CONTACT', href: '#contact' },
];

export function Header() {
  const handleNav = (href: string) => {
    playAnimeSound('click');
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Skip to Content for A11y */}
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-electric-blue text-white font-mono text-xs font-bold rounded shadow-lg"
      >
        Skip to main content
      </a>

      <header className="fixed top-0 left-0 right-0 z-40 px-6 sm:px-12 lg:px-24 py-4 bg-white/85 dark:bg-[#05070B]/85 backdrop-blur-md border-b border-navy-900/10 dark:border-electric-cyan/20 select-none">
        <div className="flex items-center justify-between">
          {/* Operator Branding */}
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-electric-blue dark:bg-electric-cyan rounded-full animate-ping" />
            <a
              href="#hero"
              onClick={() => playAnimeSound('click')}
              className="font-mono text-xs font-black tracking-wider text-navy-900 dark:text-white uppercase hover:text-electric-blue transition-colors"
            >
              {DEFAULT_PROFILE.name} <span className="text-slate-400 font-normal">// SYS</span>
            </a>
          </div>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-6 font-mono text-xs text-slate-600 dark:text-slate-300">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNav(item.href)}
                className="hover:text-electric-blue dark:hover:text-electric-cyan transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Status Badge */}
          <div className="flex items-center gap-2 font-mono text-[11px] text-slate-500">
            <span className="hidden sm:inline">SIGNAL:</span>
            <span className="text-emerald-500 font-bold">100% ONLINE</span>
          </div>
        </div>
      </header>
    </>
  );
}
