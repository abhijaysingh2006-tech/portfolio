'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface LanguageStat {
  name: string;
  category: 'Primary Language' | 'Core Engineering' | 'Systems & ML';
  level: string;
  usagePct: number;
  freqLabel: 'Very High (Daily)' | 'High' | 'Active';
  projects: string[];
  color: string;
}

const LANGUAGES_DATA: LanguageStat[] = [
  {
    name: 'Python',
    category: 'Systems & ML',
    level: 'Advanced',
    usagePct: 92,
    freqLabel: 'Very High (Daily)',
    projects: ['Robotics control pipelines', 'Earth observation AI', 'Computer Vision & ROS'],
    color: '#3572A5',
  },
  {
    name: 'TypeScript',
    category: 'Primary Language',
    level: 'Advanced',
    usagePct: 88,
    freqLabel: 'Very High (Daily)',
    projects: ['trialsetu', 'MINION-S', 'Next.js Systems Architecture'],
    color: '#3178C6',
  },
  {
    name: 'C / C++',
    category: 'Core Engineering',
    level: 'Proficient',
    usagePct: 80,
    freqLabel: 'High',
    projects: ['Embedded firmware', 'Arduino robotics prototypes', 'Hardware timing'],
    color: '#F34B7D',
  },
  {
    name: 'JavaScript',
    category: 'Primary Language',
    level: 'Advanced',
    usagePct: 85,
    freqLabel: 'Very High (Daily)',
    projects: ['disaster-alert-system', 'ZenNews-', 'Real-time telemetry apps'],
    color: '#F7DF1E',
  },
];

export function AnimatedLanguageMatrix() {
  return (
    <div className="w-full bg-[#0d0f14] border border-[#27272a] rounded-xl p-6 text-white shadow-2xl">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#27272a] mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h3 className="font-mono text-sm tracking-wider uppercase text-zinc-300 font-semibold">
              LANGUAGE PROFICIENCY & USAGE FREQUENCY MATRIX
            </h3>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Core programming languages leveraged across active robotics, AI, and production codebases.
          </p>
        </div>

        <span className="font-mono text-xs px-2.5 py-1 rounded bg-[#18181b] border border-[#27272a] text-zinc-300">
          REAL-TIME TELEMETRY
        </span>
      </div>

      {/* Grid of 4 animated language cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {LANGUAGES_DATA.map((lang, index) => (
          <motion.div
            key={lang.name}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group relative bg-[#13151b] hover:bg-[#181a22] border border-[#27272a] hover:border-zinc-500 rounded-lg p-5 transition-all duration-200 flex flex-col justify-between"
          >
            {/* Top row */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono uppercase text-zinc-400">
                  {lang.category}
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#27272a]/60 text-emerald-400 border border-[#27272a]">
                  {lang.freqLabel}
                </span>
              </div>

              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xl font-bold font-mono tracking-tight text-white flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full inline-block"
                    style={{ backgroundColor: lang.color }}
                  />
                  {lang.name}
                </h4>
                <span className="font-mono text-sm font-semibold text-zinc-300">
                  {lang.usagePct}%
                </span>
              </div>

              {/* Animated Progress bar */}
              <div className="w-full bg-[#27272a] h-2 rounded-full overflow-hidden mb-4">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${lang.usagePct}%` }}
                  transition={{ duration: 1.2, ease: 'easeOut', delay: index * 0.15 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: lang.color }}
                />
              </div>

              {/* Applied in projects list */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block">
                  Frequently Used In:
                </span>
                <ul className="space-y-1">
                  {lang.projects.map((proj, pIdx) => (
                    <li
                      key={pIdx}
                      className="text-xs text-zinc-300 flex items-start gap-1.5"
                    >
                      <span className="text-zinc-500">▹</span>
                      <span>{proj}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Footer level */}
            <div className="pt-4 mt-4 border-t border-[#27272a]/60 flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <span>Proficiency:</span>
              <strong className="text-zinc-200">{lang.level}</strong>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
