'use client';

import React, { useState, useRef } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight, RotateCw } from 'lucide-react';
import { RepoProject } from '@/types/portfolio';
import { RepoCard } from './RepoCard';
import { playAnimeSound } from '@/lib/audio';

interface ProjectsRingViewProps {
  repos: RepoProject[];
}

export function ProjectsRingView({ repos }: ProjectsRingViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = repos.length;

  const nextCard = () => {
    playAnimeSound('blip');
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const prevCard = () => {
    playAnimeSound('blip');
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.x < -40) {
      nextCard();
    } else if (info.offset.x > 40) {
      prevCard();
    }
  };

  if (total === 0) return null;

  return (
    <div className="relative w-full py-10 flex flex-col items-center justify-center select-none overflow-hidden">
      {/* Interactive 3D Stage Container */}
      <div className="relative w-full max-w-4xl h-[440px] flex items-center justify-center [perspective:1200px]">
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          className="relative w-[340px] sm:w-[380px] h-[360px] cursor-grab active:cursor-grabbing"
        >
          {repos.map((repo, idx) => {
            // Calculate relative offset from currentIndex
            let offset = idx - currentIndex;
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            const isCenter = offset === 0;
            const isVisible = Math.abs(offset) <= 2;

            if (!isVisible) return null;

            const rotateY = offset * 28;
            const translateX = offset * 220;
            const translateZ = -Math.abs(offset) * 140;
            const scale = isCenter ? 1 : 0.88 - Math.abs(offset) * 0.08;
            const opacity = isCenter ? 1 : Math.max(0.4, 0.85 - Math.abs(offset) * 0.25);
            const zIndex = 20 - Math.abs(offset);

            return (
              <motion.div
                key={repo.id}
                animate={{
                  x: translateX,
                  z: translateZ,
                  rotateY: rotateY,
                  scale: scale,
                  opacity: opacity,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 24,
                }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  zIndex,
                  transformStyle: 'preserve-3d',
                }}
                className={isCenter ? 'pointer-events-auto' : 'pointer-events-none sm:pointer-events-auto'}
                onClick={() => {
                  if (!isCenter) {
                    playAnimeSound('blip');
                    setCurrentIndex(idx);
                  }
                }}
              >
                <RepoCard repo={repo} />
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Ring Controls & Indicator */}
      <div className="flex items-center gap-6 mt-6 z-10">
        <button
          onClick={prevCard}
          aria-label="Previous Project"
          className="p-3 border-2 border-navy-900 dark:border-electric-cyan bg-white dark:bg-navy-900 rounded-md shadow-manga dark:shadow-manga-dark hover:bg-navy-50 dark:hover:bg-navy-800 transition-transform active:translate-y-0.5"
        >
          <ChevronLeft className="w-5 h-5 text-navy-900 dark:text-electric-cyan" />
        </button>

        <div className="flex items-center gap-2 font-mono text-xs text-navy-900 dark:text-electric-cyan font-bold bg-white/90 dark:bg-navy-950/90 px-4 py-2 border border-navy-900/20 dark:border-electric-cyan/30 rounded">
          <RotateCw className="w-3.5 h-3.5 text-electric-blue animate-spin" style={{ animationDuration: '8s' }} />
          <span>CYLINDER POS:</span>
          <span className="text-electric-blue dark:text-electric-cyan">{String(currentIndex + 1).padStart(2, '0')}</span>
          <span className="text-slate-400">/</span>
          <span>{String(total).padStart(2, '0')}</span>
        </div>

        <button
          onClick={nextCard}
          aria-label="Next Project"
          className="p-3 border-2 border-navy-900 dark:border-electric-cyan bg-white dark:bg-navy-900 rounded-md shadow-manga dark:shadow-manga-dark hover:bg-navy-50 dark:hover:bg-navy-800 transition-transform active:translate-y-0.5"
        >
          <ChevronRight className="w-5 h-5 text-navy-900 dark:text-electric-cyan" />
        </button>
      </div>
      <p className="mt-3 font-mono text-[11px] text-slate-500 dark:text-slate-400">
        DRAG HORIZONTALLY OR CLICK SIDE CARDS TO ROTATE RING
      </p>
    </div>
  );
}
