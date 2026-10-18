'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OriginalCoderMascot } from '@/components/mascot/OriginalCoderMascot';
import { usePortfolioStore } from '@/lib/store';

const BOOT_LOGS = [
  'INITIALIZING SIGNAL FIELD // 0x7FFE',
  'LOADING RAFT CONSENSUS TOPOLOGY...',
  'CALIBRATING THREE.JS PARTICLE MATRIX...',
  'SYNCING GITHUB REPOSITORIES & COMPILED SCHEMAS...',
  'ENGAGING CEL-SHADED NEURAL OVERLAY...',
  'SYSTEM READY: ALL CORES OPERATIONAL',
];

export function Preloader() {
  const { isBootComplete, setBootComplete } = usePortfolioStore();
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);

  useEffect(() => {
    // Check prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setBootComplete(true);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setBootComplete(true), 400);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 8) + 4;
        const bounded = Math.min(next, 100);
        // Advance logs based on progress bracket
        const targetLog = Math.min(
          Math.floor((bounded / 100) * BOOT_LOGS.length),
          BOOT_LOGS.length - 1
        );
        setLogIndex(targetLog);
        return bounded;
      });
    }, 70);

    return () => clearInterval(interval);
  }, [setBootComplete]);

  if (isBootComplete) return null;

  return (
    <AnimatePresence>
      <motion.div
        exit={{ opacity: 0, clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 100%)' }}
        transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-[#05070B] overflow-hidden select-none"
      >
        {/* Speed line background stripes */}
        <div className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none overflow-hidden">
          {Array.from({ length: 14 }).map((_, i) => (
            <div
              key={i}
              className="absolute h-[1px] bg-electric-blue dark:bg-electric-cyan w-full"
              style={{
                top: `${i * 7}%`,
                animation: `speedline ${0.3 + (i % 3) * 0.15}s linear infinite`,
              }}
            />
          ))}
        </div>

        {/* Technical Top Bar */}
        <div className="absolute top-8 left-8 right-8 flex justify-between items-center text-xs font-mono text-navy-800 dark:text-electric-cyan">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-electric-blue animate-ping" />
            <span>SYS_BOOT: KERNEL_INIT</span>
          </div>
          <button
            onClick={() => setBootComplete(true)}
            className="px-3 py-1 border border-navy-900/30 dark:border-electric-cyan/40 hover:bg-electric-blue hover:text-white dark:hover:bg-electric-cyan dark:hover:text-black transition-colors rounded text-[11px]"
          >
            [ESC] SKIP BOOT SEQUENCE →
          </button>
        </div>

        {/* Center Mascot & Animation */}
        <div className="relative flex flex-col items-center z-10">
          <div className="relative mb-6">
            <OriginalCoderMascot
              state="running"
              size={150}
              showSpeechBubble
              speechText={`CALIBRATING ${progress}%`}
            />
          </div>

          {/* Progress readout */}
          <div className="w-72 sm:w-96 flex flex-col gap-2">
            <div className="flex justify-between items-baseline font-mono text-sm">
              <span className="text-navy-900 dark:text-white font-bold tracking-wider">
                BOOT SEQUENCE
              </span>
              <span className="text-electric-blue dark:text-electric-cyan font-extrabold text-lg">
                {progress}%
              </span>
            </div>

            {/* Tactical progress bar */}
            <div className="w-full h-3 bg-navy-100 dark:bg-navy-950 border border-navy-900 dark:border-electric-cyan/50 p-0.5 rounded-sm">
              <motion.div
                className="h-full bg-gradient-to-r from-electric-blue via-electric-cyan to-sakura-pink"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Active terminal log message */}
            <p className="font-mono text-[11px] text-navy-800/80 dark:text-slate-400 truncate h-5 mt-1">
              &gt; {BOOT_LOGS[logIndex]}
            </p>
          </div>
        </div>

        {/* Bottom Technical Grid Footprint */}
        <div className="absolute bottom-6 font-mono text-[10px] text-slate-400 dark:text-slate-600 tracking-widest">
          PROJECT MATRIX // ARCHITECTURAL REPOSITORY v2.4
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
