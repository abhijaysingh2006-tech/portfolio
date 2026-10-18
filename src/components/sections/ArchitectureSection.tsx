'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Compass, Hammer, Rocket, Activity, ArrowRight, ShieldCheck } from 'lucide-react';
import { KanjiStamp } from '@/components/effects/KanjiStamp';
import { playAnimeSound } from '@/lib/audio';

const PIPELINE_STAGES = [
  {
    step: '01',
    title: 'PLAN & FORMAL VERIFY',
    kanji: '設計',
    icon: Compass,
    color: '#1E6BFF',
    summary: 'Specifying strict linearizable invariants and threat boundaries before code commits.',
    details: [
      'TLA+ / formal state validation for distributed state transitions',
      'Memory footprint modeling and zero-copy data flow layout',
      'Capacity planning for sustained 100k+ QPS workloads',
    ],
  },
  {
    step: '02',
    title: 'BUILD & PROVING LOOPS',
    kanji: '構築',
    icon: Hammer,
    color: '#38D6FF',
    summary: 'Lock-free algorithms, cache-conscious data alignment, and compiled correctness.',
    details: [
      'Atomic CAS primitives eliminating mutex lock contention',
      'SIMD vector instructions and io_uring kernel bypass',
      'Comprehensive fuzz testing with AFL++ and randomized chaos injectors',
    ],
  },
  {
    step: '03',
    title: 'SHIP & MICROVM CANARY',
    kanji: '展開',
    icon: Rocket,
    color: '#FF8FB8',
    summary: 'Instant sub-15ms Firecracker boots with declarative immutable images.',
    details: [
      'Distroless minimal kernel sandboxes (< 20MB ram footprint)',
      'eBPF TC egress filtering for zero-trust microsegmentation',
      'Automated canary analysis with automatic rollback on error spikes',
    ],
  },
  {
    step: '04',
    title: 'OBSERVE & ADAPTIVE CONTROL',
    kanji: '監視',
    icon: Activity,
    color: '#10B981',
    summary: 'Microsecond-resolution tracing, distributed eBPF probes, and dynamic self-healing.',
    details: [
      'BBR-style adaptive concurrency limiters guarding downstream services',
      'High-cardinality ClickHouse query pipelines for trace analytics',
      'Automated dead-letter quarantine and circuit-breaker mitigation',
    ],
  },
];

export function ArchitectureSection() {
  const [selectedStage, setSelectedStage] = useState(0);

  return (
    <section
      id="architecture"
      className="relative px-6 sm:px-12 lg:px-24 py-24 border-b border-navy-900/10 dark:border-electric-cyan/20"
    >
      {/* Section Header */}
      <div className="flex flex-wrap items-baseline justify-between gap-4 mb-12 pb-4 border-b border-navy-900/10 dark:border-electric-cyan/20">
        <div>
          <div className="flex items-center gap-3 mb-2 font-mono text-xs">
            <span className="font-extrabold text-electric-blue dark:text-electric-cyan">
              02 ARCHITECTURE
            </span>
            <span className="text-slate-400">// SYSTEMS PIPELINE</span>
            <KanjiStamp kanji="構造" romaji="KOUZOU" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-navy-900 dark:text-white tracking-tight">
            How I Build Distributed Systems
          </h2>
        </div>

        <div className="font-mono text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-navy-900 px-3 py-1.5 rounded border border-navy-900/15 dark:border-electric-cyan/30">
          FIG. 02 // 4-STAGE CONTINUOUS ENGINEERING ENGINE
        </div>
      </div>

      {/* 4-Stage Horizontal Pipeline Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {PIPELINE_STAGES.map((stage, idx) => {
          const Icon = stage.icon;
          const isSelected = selectedStage === idx;

          return (
            <div
              key={stage.step}
              onClick={() => {
                playAnimeSound('blip');
                setSelectedStage(idx);
              }}
              className={`relative flex flex-col justify-between p-6 rounded-md border-2 transition-all duration-200 cursor-pointer select-none ${
                isSelected
                  ? 'border-electric-blue dark:border-electric-cyan bg-white dark:bg-navy-900 shadow-electric -translate-y-1'
                  : 'border-navy-900 dark:border-navy-800 bg-white/70 dark:bg-navy-950/70 hover:border-slate-400'
              }`}
            >
              <div>
                {/* Step Header */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-navy-900/10 dark:border-electric-cyan/20 font-mono text-xs">
                  <span className="font-extrabold text-lg text-electric-blue dark:text-electric-cyan">
                    {stage.step}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 font-bold">{stage.kanji}</span>
                    <Icon className="w-4 h-4" style={{ color: stage.color }} />
                  </div>
                </div>

                <h3 className="font-black text-lg text-navy-900 dark:text-white mb-2">
                  {stage.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                  {stage.summary}
                </p>
              </div>

              {/* Stage Bullet Details */}
              <div className="space-y-2 pt-4 border-t border-navy-900/10 dark:border-electric-cyan/15 font-mono text-[11px] text-slate-700 dark:text-slate-300">
                {stage.details.map((detail, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-1.5">
                    <span className="text-electric-blue dark:text-electric-cyan">▸</span>
                    <span>{detail}</span>
                  </div>
                ))}
              </div>

              {/* Connecting Flow Arrow for large screens */}
              {idx < PIPELINE_STAGES.length - 1 && (
                <div className="hidden lg:block absolute -right-3.5 top-1/2 -translate-y-1/2 z-20">
                  <div className="w-7 h-7 rounded-full bg-white dark:bg-navy-900 border border-navy-900 dark:border-electric-cyan flex items-center justify-center text-electric-blue dark:text-electric-cyan shadow-sm">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
