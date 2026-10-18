'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Terminal, Award, ChevronRight, BookOpen, Clock } from 'lucide-react';
import { KanjiStamp } from '@/components/effects/KanjiStamp';
import { AnimatedLanguageMatrix } from '@/components/skills/AnimatedLanguageMatrix';
import { usePortfolioStore } from '@/lib/store';
import fallbackRepos from '@/data/repos.generated.json';
import { playAnimeSound } from '@/lib/audio';

interface SkillNode {
  id: string;
  name: string;
  category: string;
  tier: 'NOVICE' | 'ADEPT' | 'EXPERT' | 'MASTER';
  xp: number;
  repoId: string;
  repoName: string;
  description: string;
}

const RPG_SKILLS: SkillNode[] = [
  {
    id: 'SKILL-01',
    name: 'Real-Time NLP & Crisis Intelligence',
    category: 'ROBOTICS & AI',
    tier: 'MASTER',
    xp: 94,
    repoId: 'REPO-001',
    repoName: 'disaster-alert-system',
    description: 'NLP transformer models filtering raw social media streams for high-urgency emergency dispatch.',
  },
  {
    id: 'SKILL-02',
    name: 'Multi-Agent Robotics Coordination',
    category: 'ROBOTICS & AI',
    tier: 'MASTER',
    xp: 96,
    repoId: 'REPO-003',
    repoName: 'MINION-S',
    description: 'Autonomous state machine orchestration and telemetry feedback loops across distributed agents.',
  },
  {
    id: 'SKILL-03',
    name: 'Strict Invariant Type Safety',
    category: 'FULL-STACK SYSTEMS',
    tier: 'EXPERT',
    xp: 92,
    repoId: 'REPO-002',
    repoName: 'trialsetu',
    description: 'TypeScript algebraic data types, Zod schemas, and deterministic eligibility rules.',
  },
  {
    id: 'SKILL-04',
    name: 'Low-Latency Event Broadcasting',
    category: 'DISTRIBUTED ARCHITECTURE',
    tier: 'EXPERT',
    xp: 88,
    repoId: 'REPO-001',
    repoName: 'disaster-alert-system',
    description: 'Sub-second WebSocket fan-out and geospatial bounding-box indexing for crisis alerts.',
  },
  {
    id: 'SKILL-05',
    name: 'Stream Ingestion & Deduplication',
    category: 'DATA PIPELINES',
    tier: 'EXPERT',
    xp: 90,
    repoId: 'REPO-004',
    repoName: 'ZenNews-',
    description: 'Aggregating, clustering, and sanitizing live wire feeds into a calm, dual-column reading interface.',
  },
  {
    id: 'SKILL-06',
    name: 'Zero-Dependency Native DOM & Hardware Control',
    category: 'SYSTEMS PERFORMANCE',
    tier: 'ADEPT',
    xp: 86,
    repoId: 'REPO-005',
    repoName: 'smt',
    description: 'Native browser APIs, micro-controllers, and lightweight heartbeat health diagnostics.',
  },
];

const TIMELINE_LOGS = [
  {
    date: 'OCTOBER 2026',
    milestone: 'MINION-S MULTI-AGENT ORCHESTRATOR',
    note: 'Shipped autonomous state machine coordination for distributed robotics & AI tasks.',
  },
  {
    date: 'OCTOBER 2026',
    milestone: 'TRIALSETU HEALTHCARE SYSTEM',
    note: 'Architected deterministic clinical trial patient eligibility verification in TypeScript.',
  },
  {
    date: 'OCTOBER 2026',
    milestone: 'DISASTER ALERT NLP SYSTEM',
    note: 'Deployed AI-powered real-time crisis intelligence pipeline with geospatial indexing.',
  },
  {
    date: 'JANUARY 2026',
    milestone: 'ZENNEWS AD-FREE HEADLINE ENGINE',
    note: 'Engineered clean dual-column real-time news aggregator with country & language filters.',
  },
];

export function SkillsSection() {
  const setSelectedRepo = usePortfolioStore((state) => state.setSelectedRepo);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(RPG_SKILLS.map((s) => s.category)));

  const handleOpenRepo = (repoName: string) => {
    playAnimeSound('open');
    const match = (fallbackRepos as any[]).find(
      (r) => r.name.toLowerCase() === repoName.toLowerCase()
    );
    if (match) setSelectedRepo(match);
  };

  return (
    <section
      id="skills"
      className="relative px-6 sm:px-12 lg:px-24 py-24 border-b border-navy-900/10 dark:border-electric-cyan/20"
    >
      {/* Section Header */}
      <div className="flex flex-wrap items-baseline justify-between gap-4 mb-12 pb-4 border-b border-navy-900/10 dark:border-electric-cyan/20">
        <div>
          <div className="flex items-center gap-3 mb-2 font-mono text-xs">
            <span className="font-extrabold text-electric-blue dark:text-electric-cyan">
              03 SKILLS & LEARNINGS
            </span>
            <span className="text-slate-400">// RPG SKILL TREE & TIMELINE</span>
            <KanjiStamp kanji="学び" romaji="MANABI" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-navy-900 dark:text-white tracking-tight">
            Robotics, AI & Systems Tree
          </h2>
        </div>

        <div className="font-mono text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-navy-900 px-3 py-1.5 rounded border border-navy-900/15 dark:border-electric-cyan/30">
          FIG. 03 // LEVEL-UP MATRIX & GITHUB REPO ANCHORS
        </div>
      </div>

      {/* Animated Language Proficiency & Usage Frequency Matrix */}
      <div className="mb-14">
        <AnimatedLanguageMatrix />
      </div>

      {/* Main Grid: Skill Tree (8 cols) + Timeline Log (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Interactive RPG Skill Tree */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex flex-wrap items-center gap-2 mb-4 font-mono text-xs">
            <span className="text-slate-400 mr-2">BRANCH:</span>
            <button
              onClick={() => {
                playAnimeSound('blip');
                setSelectedCategory(null);
              }}
              className={`px-3 py-1 rounded font-bold transition-colors ${
                selectedCategory === null
                  ? 'bg-electric-blue text-white'
                  : 'bg-navy-50 dark:bg-navy-900 text-slate-600 dark:text-slate-300'
              }`}
            >
              ALL NODES
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  playAnimeSound('blip');
                  setSelectedCategory(selectedCategory === cat ? null : cat);
                }}
                className={`px-3 py-1 rounded font-bold transition-colors ${
                  selectedCategory === cat
                    ? 'bg-electric-blue text-white'
                    : 'bg-navy-50 dark:bg-navy-900 text-slate-600 dark:text-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {RPG_SKILLS.filter(
              (s) => !selectedCategory || s.category === selectedCategory
            ).map((skill, idx) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="p-5 border-2 border-navy-900 dark:border-electric-cyan bg-white dark:bg-navy-950 rounded-md shadow-manga dark:shadow-manga-dark flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-navy-900/10 dark:border-electric-cyan/20 font-mono text-[10px]">
                    <span className="text-slate-400">{skill.category}</span>
                    <span className="px-2 py-0.5 rounded font-extrabold bg-electric-blue/15 text-electric-blue dark:text-electric-cyan border border-electric-blue/30">
                      TIER: {skill.tier}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-navy-900 dark:text-white mb-1.5 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-electric-blue dark:text-electric-cyan group-hover:rotate-12 transition-transform" />
                    <span>{skill.name}</span>
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed font-sans">
                    {skill.description}
                  </p>
                </div>

                <div>
                  {/* XP Bar */}
                  <div className="flex justify-between font-mono text-[10px] text-slate-500 mb-1">
                    <span>PROFICIENCY</span>
                    <span className="font-bold text-electric-blue dark:text-electric-cyan">
                      {skill.xp}% MASTERY
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 dark:bg-navy-900 rounded-full overflow-hidden mb-3">
                    <div
                      className="h-full bg-gradient-to-r from-electric-blue to-electric-cyan"
                      style={{ width: `${skill.xp}%` }}
                    />
                  </div>

                  {/* Link to Anchor Repository */}
                  <button
                    onClick={() => handleOpenRepo(skill.repoName)}
                    className="w-full flex items-center justify-between px-3 py-1.5 bg-navy-50 dark:bg-navy-900/80 hover:bg-electric-blue hover:text-white dark:hover:bg-electric-cyan dark:hover:text-black rounded border border-navy-900/10 dark:border-electric-cyan/20 font-mono text-[11px] transition-colors"
                  >
                    <span>SOURCE: {skill.repoName}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: Learning Log Timeline */}
        <div className="lg:col-span-4 border-2 border-navy-900 dark:border-electric-cyan bg-white dark:bg-navy-950 p-6 rounded-md shadow-manga dark:shadow-manga-dark flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-4 mb-6 border-b border-navy-900/10 dark:border-electric-cyan/20 font-mono text-xs font-bold text-navy-900 dark:text-white">
              <Clock className="w-4 h-4 text-electric-blue dark:text-electric-cyan" />
              <span>LEARNING LOG & RELEASE MILESTONES</span>
            </div>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-electric-blue/30 dark:before:bg-electric-cyan/30">
              {TIMELINE_LOGS.map((log, idx) => (
                <div key={idx} className="relative">
                  {/* Timeline dot */}
                  <div className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-white dark:bg-navy-950 border-2 border-electric-blue dark:border-electric-cyan" />

                  <span className="font-mono text-[10px] text-electric-blue dark:text-electric-cyan font-bold block mb-0.5">
                    {log.date}
                  </span>
                  <h4 className="font-bold text-sm text-navy-900 dark:text-white font-mono mb-1">
                    {log.milestone}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
                    {log.note}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-navy-900/10 dark:border-electric-cyan/20 font-mono text-[11px] text-slate-500">
            AUTO-ANCHORED TO GITHUB @ABHIJAYSINGH2006-TECH
          </div>
        </div>
      </div>
    </section>
  );
}
