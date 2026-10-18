'use client';

import React from 'react';
import { KanjiStamp } from '@/components/effects/KanjiStamp';
import { DEFAULT_PROFILE } from '@/data/default-profile';
import { Shield, Zap, Flame, Brain, Compass, Award } from 'lucide-react';

const STATS_SHEET = [
  { stat: 'STR', label: 'BACKEND ARCHITECTURE', value: 96, icon: Flame, color: '#1E6BFF' },
  { stat: 'AGI', label: 'LOW-LATENCY CONCURRENCY', value: 92, icon: Zap, color: '#38D6FF' },
  { stat: 'INT', label: 'DISTRIBUTED ALGORITHMS', value: 94, icon: Brain, color: '#8B5CF6' },
  { stat: 'VIT', label: 'FAULT-TOLERANCE & CHAOS', value: 90, icon: Shield, color: '#10B981' },
  { stat: 'DEX', label: 'REACTIVE 3D & SHADERS', value: 88, icon: Compass, color: '#FF8FB8' },
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative px-6 sm:px-12 lg:px-24 py-24 border-b border-navy-900/10 dark:border-electric-cyan/20"
    >
      {/* Section Header */}
      <div className="flex flex-wrap items-baseline justify-between gap-4 mb-12 pb-4 border-b border-navy-900/10 dark:border-electric-cyan/20">
        <div>
          <div className="flex items-center gap-3 mb-2 font-mono text-xs">
            <span className="font-extrabold text-electric-blue dark:text-electric-cyan">
              04 ABOUT
            </span>
            <span className="text-slate-400">// CHARACTER SHEET & PHILOSOPHY</span>
            <KanjiStamp kanji="人物" romaji="JINBUTSU" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-navy-900 dark:text-white tracking-tight">
            Systems Engineering Philosophy
          </h2>
        </div>

        <div className="font-mono text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-navy-900 px-3 py-1.5 rounded border border-navy-900/15 dark:border-electric-cyan/30">
          FIG. 04 // ANIME CHARACTER STAT SHEET
        </div>
      </div>

      {/* Manga Page Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Manga Story Panel (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6 border-2 border-navy-900 dark:border-electric-cyan bg-white dark:bg-navy-950 p-6 sm:p-8 rounded-md shadow-manga dark:shadow-manga-dark">
          <div className="flex items-center justify-between pb-3 border-b border-navy-900/10 dark:border-electric-cyan/20 font-mono text-xs">
            <span className="font-bold text-navy-900 dark:text-white">OPERATIONAL PROFILE</span>
            <span className="text-electric-blue dark:text-electric-cyan font-bold">LVL. 99 ARCHITECT</span>
          </div>

          <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 font-sans text-sm sm:text-base leading-relaxed space-y-4">
            <p>
              I am a student pursuing my <strong>B.Tech in Robotics &amp; AI</strong> based in Bangalore, India. As a full-stack developer, I build scalable systems end to end—from responsive, high-performance interfaces to fault-tolerant distributed architectures.
            </p>
            <p>
              I learn by shipping. Every project on my GitHub is a lesson turned into working software—whether building AI-powered disaster alert intelligence pipelines, coordinating multi-agent robotics routines in MINION-S, or architecting strict healthcare compliance engines in TrialSetu.
            </p>
          </div>

          {/* Core Values Strip */}
          <div className="pt-4 border-t border-navy-900/10 dark:border-electric-cyan/20 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-3 bg-navy-50 dark:bg-navy-900 rounded font-mono text-xs">
              <span className="text-electric-blue dark:text-electric-cyan font-bold block mb-1">01. LEARN BY SHIPPING</span>
              <span className="text-slate-600 dark:text-slate-400 text-[11px]">Real working software over mockups and theoretical specs.</span>
            </div>
            <div className="p-3 bg-navy-50 dark:bg-navy-900 rounded font-mono text-xs">
              <span className="text-electric-blue dark:text-electric-cyan font-bold block mb-1">02. ROBOTICS &amp; AI</span>
              <span className="text-slate-600 dark:text-slate-400 text-[11px]">Autonomous state machines &amp; NLP crisis intelligence.</span>
            </div>
            <div className="p-3 bg-navy-50 dark:bg-navy-900 rounded font-mono text-xs">
              <span className="text-electric-blue dark:text-electric-cyan font-bold block mb-1">03. END-TO-END SYSTEMS</span>
              <span className="text-slate-600 dark:text-slate-400 text-[11px]">Bridging client interfaces with robust data architectures.</span>
            </div>
          </div>
        </div>

        {/* Right Anime Character Stats Card (5 cols) */}
        <div className="lg:col-span-5 border-2 border-navy-900 dark:border-electric-cyan bg-white dark:bg-navy-950 p-6 rounded-md shadow-manga dark:shadow-manga-dark flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-3 mb-6 border-b border-navy-900/10 dark:border-electric-cyan/20 font-mono text-xs">
              <span className="font-extrabold text-navy-900 dark:text-white">
                SYSTEMS ATTRIBUTE MATRIX
              </span>
              <span className="text-sakura-pink font-bold">STATUS: OVERCLOCKED</span>
            </div>

            {/* Stat Bars */}
            <div className="space-y-4">
              {STATS_SHEET.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.stat} className="space-y-1.5">
                    <div className="flex items-center justify-between font-mono text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-navy-900 dark:text-white px-1.5 py-0.5 rounded bg-slate-100 dark:bg-navy-800 text-[11px]">
                          {item.stat}
                        </span>
                        <span className="text-slate-600 dark:text-slate-300 text-[11px]">
                          {item.label}
                        </span>
                      </div>
                      <span className="font-bold text-electric-blue dark:text-electric-cyan">
                        {item.value} / 100
                      </span>
                    </div>

                    <div className="w-full h-2.5 bg-slate-100 dark:bg-navy-900 rounded-sm overflow-hidden border border-navy-900/10 dark:border-electric-cyan/20">
                      <div
                        className="h-full rounded-sm transition-all duration-1000"
                        style={{
                          width: `${item.value}%`,
                          backgroundColor: item.color,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <div className="mt-6 pt-4 border-t border-navy-900/10 dark:border-electric-cyan/20 flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-slate-500">
              <span>OPERATOR: {DEFAULT_PROFILE.name.toUpperCase()}</span>
              <span className="text-electric-blue dark:text-electric-cyan font-bold">
                RANK: S-TIER (HASHIRA / JONIN CLASS)
              </span>
            </div>

            {/* Anime Mentors Row */}
            <div className="mt-4 pt-3 border-t border-navy-900/10 dark:border-electric-cyan/20 flex items-center justify-between">
              <span className="font-mono text-[10px] text-slate-400">
                ACTIVE INSPIRATION MENTORS:
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/15 text-amber-500 border border-amber-500/30">
                  NARUTO (SAGE)
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-500 border border-cyan-500/30">
                  TANJIRO (SUN)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
