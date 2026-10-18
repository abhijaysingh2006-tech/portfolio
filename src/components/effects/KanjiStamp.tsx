'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface KanjiStampProps {
  kanji: string;
  romaji?: string;
  className?: string;
}

export function KanjiStamp({ kanji, romaji, className = '' }: KanjiStampProps) {
  return (
    <motion.div
      initial={{ scale: 1.4, opacity: 0, rotate: -8 }}
      whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ type: 'spring', damping: 15, stiffness: 200 }}
      className={`inline-flex items-center gap-2 select-none ${className}`}
    >
      {/* Traditional red/electric seal stamp */}
      <div className="relative border-2 border-electric-blue dark:border-electric-cyan px-1.5 py-0.5 rounded-sm bg-electric-blue/10 dark:bg-electric-cyan/15 text-electric-blue dark:text-electric-cyan font-bold tracking-tighter">
        <span className="font-serif text-sm leading-none">{kanji}</span>
        {/* Corner notches */}
        <span className="absolute -top-1 -left-1 w-1 h-1 bg-white dark:bg-black" />
        <span className="absolute -bottom-1 -right-1 w-1 h-1 bg-white dark:bg-black" />
      </div>

      {romaji && (
        <span className="font-mono text-[10px] tracking-widest uppercase text-navy-800/60 dark:text-slate-400">
          // {romaji}
        </span>
      )}
    </motion.div>
  );
}
