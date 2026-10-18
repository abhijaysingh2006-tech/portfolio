'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimeCharacter, AnimeCharacterType } from './AnimeCharacters';
import { Sparkles, X, Volume2 } from 'lucide-react';
import { playAnimeSound } from '@/lib/audio';

const COMPANIONS: {
  id: AnimeCharacterType;
  name: string;
  series: 'Demon Slayer' | 'Naruto';
  technique: string;
  quote: string;
  color: string;
}[] = [
  {
    id: 'tanjiro',
    name: 'Tanjiro Kamado',
    series: 'Demon Slayer',
    technique: 'Total Concentration: Hinokami Kagura & Water Breathing',
    quote: '“No matter how many systems crash, I’ll never give up! Keep your invariants strong!”',
    color: '#06B6D4',
  },
  {
    id: 'naruto',
    name: 'Naruto Uzumaki',
    series: 'Naruto',
    technique: 'Sage Mode & Rasengan Chakra Coordination',
    quote: '“Believe it! Every distributed agent in MINION-S works together like my shadow clones!”',
    color: '#F97316',
  },
  {
    id: 'zenitsu',
    name: 'Zenitsu Agatsuma',
    series: 'Demon Slayer',
    technique: 'Thunder Breathing: Thunderclap and Flash',
    quote: '“EEK! But when it comes to ZenNews, I slice through all the ads at the speed of lightning!”',
    color: '#EAB308',
  },
  {
    id: 'sasuke',
    name: 'Sasuke Uchiha',
    series: 'Naruto',
    technique: 'Mangekyou Sharingan & Chidori Flow',
    quote: '“Hmph. Strict type safety in TrialSetu leaves zero room for errors. Absolute precision.”',
    color: '#8B5CF6',
  },
];

export function AnimeCompanionWidget() {
  const [selectedCompanion, setSelectedCompanion] = useState<AnimeCharacterType>('tanjiro');
  const [isOpen, setIsOpen] = useState(false);
  const [showQuote, setShowQuote] = useState(true);

  const current = COMPANIONS.find((c) => c.id === selectedCompanion) || COMPANIONS[0];

  const handleSelect = (comp: AnimeCharacterType) => {
    playAnimeSound('levelup');
    setSelectedCompanion(comp);
    setShowQuote(true);
  };

  return (
    <aside
      aria-label="Anime Companion Widget"
      className="fixed bottom-6 right-6 z-40 flex flex-col items-end select-none"
    >
      {/* Interactive Speech Bubble */}
      <AnimatePresence>
        {showQuote && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="mb-3 max-w-xs p-3.5 rounded-lg border-2 border-navy-900 dark:border-electric-cyan bg-white/95 dark:bg-[#070E1C]/95 backdrop-blur-md shadow-manga dark:shadow-manga-dark text-xs font-mono relative"
          >
            <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-navy-900/10 dark:border-electric-cyan/20">
              <span className="font-extrabold text-[10px]" style={{ color: current.color }}>
                {current.name.toUpperCase()} // {current.series.toUpperCase()}
              </span>
              <button
                onClick={() => setShowQuote(false)}
                className="text-slate-400 hover:text-navy-900 dark:hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-slate-700 dark:text-slate-200 italic font-sans leading-relaxed">
              {current.quote}
            </p>
            <div className="mt-2 text-[9px] font-mono text-slate-400">
              TECHNIQUE: {current.technique}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Avatar Trigger Button */}
      <div className="flex items-center gap-2">
        {/* Companion Picker Dock */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex items-center gap-1.5 p-1.5 rounded-full border-2 border-navy-900 dark:border-electric-cyan bg-white dark:bg-navy-950 shadow-manga mr-2"
            >
              {COMPANIONS.map((comp) => (
                <button
                  key={comp.id}
                  onClick={() => handleSelect(comp.id)}
                  title={`${comp.name} (${comp.series})`}
                  className={`p-1.5 rounded-full transition-transform ${
                    selectedCompanion === comp.id
                      ? 'scale-110 ring-2 ring-electric-blue dark:ring-electric-cyan bg-electric-blue/10'
                      : 'opacity-70 hover:opacity-100 hover:scale-105'
                  }`}
                >
                  <AnimeCharacter character={comp.id} size={36} showAura={false} />
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Primary Clickable Character Badge */}
        <button
          onClick={() => {
            playAnimeSound('blip');
            setIsOpen(!isOpen);
            setShowQuote(true);
          }}
          className="relative group p-1 rounded-full border-2 border-navy-900 dark:border-electric-cyan bg-white dark:bg-navy-950 shadow-manga dark:shadow-manga-dark hover:scale-105 active:scale-95 transition-transform"
          title="Click to Switch Anime Mentor"
        >
          <AnimeCharacter character={selectedCompanion} size={64} />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-electric-blue dark:bg-electric-cyan text-white text-[9px] font-bold flex items-center justify-center animate-bounce">
            ★
          </span>
        </button>
      </div>
    </aside>
  );
}
