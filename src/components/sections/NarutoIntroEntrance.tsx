'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Volume2 } from 'lucide-react';
import { NarutoWalkingShooter } from '@/components/anime/NarutoWalkingShooter';
import {
  playRasenganCharge,
  playRasenganBlast,
  playAnimeTing,
  playNarutoVoice,
  playAnimeSound,
} from '@/lib/audio';
import { usePortfolioStore } from '@/lib/store';

type IntroStage = 'walking' | 'arrived' | 'charging' | 'shooting' | 'blast' | 'welcome' | 'done';

export function NarutoIntroEntrance() {
  const [stage, setStage] = useState<IntroStage>('walking');
  const { setBootComplete } = usePortfolioStore();

  // 1. Naruto walks in from the left side of the screen on initial mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setStage('arrived');
      playAnimeSound('blip');
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  // 2. User clicks Enter -> Naruto charges and shoots Rasengan directly at the camera
  const handleShootRasengan = () => {
    setStage('charging');
    playRasenganCharge();

    // Charge chakra for 1.3 seconds
    setTimeout(() => {
      setStage('shooting');

      // Rasengan flies into screen lens for 0.7s
      setTimeout(() => {
        setStage('blast');
        playRasenganBlast();

        // Blast clears, Naruto's voice speaks "Welcome to my portfolio!" and "TINGGGGG" chime plays
        setTimeout(() => {
          setStage('welcome');
          playNarutoVoice(() => {
            playAnimeTing();
          });
          setTimeout(() => playAnimeTing(), 800);

          // Auto-unlock portfolio after 4.2s
          setTimeout(() => {
            handleComplete();
          }, 4200);
        }, 450);
      }, 700);
    }, 1300);
  };

  const handleComplete = () => {
    playAnimeSound('levelup');
    setStage('done');
    setBootComplete(true);
  };

  if (stage === 'done') return null;

  return (
    <AnimatePresence>
      <motion.div
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#03060C] overflow-hidden select-none"
      >
        {/* Manga Speedline Canvas Overlay */}
        <div className="absolute inset-0 opacity-25 pointer-events-none">
          {Array.from({ length: 22 }).map((_, i) => (
            <div
              key={i}
              className="absolute h-[1px] bg-electric-cyan w-full"
              style={{
                top: `${i * 4.6}%`,
                animation: `speedline ${0.3 + (i % 3) * 0.12}s linear infinite`,
              }}
            />
          ))}
        </div>

        {/* Skip Button */}
        <div className="absolute top-6 right-6 z-40">
          <button
            onClick={handleComplete}
            className="px-3.5 py-1.5 rounded border border-white/20 bg-white/5 hover:bg-white/20 text-white font-mono text-xs transition-colors backdrop-blur-sm"
          >
            SKIP INTRO [ESC] →
          </button>
        </div>

        {/* STAGE A & B: NARUTO WALKING IN FROM LEFT & ARRIVING */}
        {(stage === 'walking' || stage === 'arrived') && (
          <div className="relative flex flex-col items-center justify-center z-20 w-full max-w-4xl px-4">
            {/* Naruto Walking container moving from off-screen left to center */}
            <motion.div
              initial={{ x: '-120vw' }}
              animate={{ x: stage === 'walking' ? '-10vw' : '0vw' }}
              transition={{ duration: 2.2, ease: 'easeOut' }}
              className="relative flex flex-col items-center"
            >
              {/* Manga Speech Bubble when he arrives */}
              {stage === 'arrived' && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.85 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="mb-4 px-4 py-2 rounded-lg bg-white text-navy-950 border-2 border-navy-900 shadow-manga font-mono text-xs font-bold flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                  <span>&quot;Ready to see the systems? Click enter and take this!&quot;</span>
                </motion.div>
              )}

              {/* Animated Naruto Character */}
              <NarutoWalkingShooter actionState={stage === 'walking' ? 'walking' : 'idle'} />

              {/* Ninja Dust Clouds under footsteps */}
              {stage === 'walking' && (
                <motion.div
                  animate={{ opacity: [0.2, 0.7, 0.2], scale: [0.8, 1.2, 0.8] }}
                  transition={{ repeat: Infinity, duration: 0.3 }}
                  className="absolute bottom-2 left-10 w-16 h-4 bg-slate-500/30 rounded-full blur-sm"
                />
              )}
            </motion.div>

            {/* Arrived: Action Button Prompt */}
            {stage === 'arrived' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6 flex flex-col items-center text-center"
              >
                <div className="font-mono text-xs text-electric-cyan font-bold tracking-widest uppercase mb-2">
                  // CHAKRA LOCKED: SAGE MODE ACTIVE
                </div>

                <h1 className="text-3xl sm:text-5xl font-black text-white font-mono tracking-tight mb-6 drop-shadow-[0_0_25px_rgba(255,161,0,0.5)]">
                  Enter Abhijay&apos;s Portfolio
                </h1>

                {/* Primary Enter Portfolio Button */}
                <button
                  onClick={handleShootRasengan}
                  className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 text-black font-mono font-black text-base rounded-md shadow-[0_0_35px_rgba(245,158,11,0.7)] hover:scale-105 active:scale-95 transition-all"
                >
                  <Volume2 className="w-5 h-5 text-black" />
                  <span>ENTER PORTFOLIO [SHOOT RASENGAN!] →</span>
                </button>
              </motion.div>
            )}
          </div>
        )}

        {/* STAGE C: CHARGING RASENGAN */}
        {stage === 'charging' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center z-20 text-center"
          >
            {/* Manga Eye Flash Panel */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
              className="mb-6 w-80 h-10 border-y-2 border-amber-400 bg-black/80 flex items-center justify-center font-mono text-xs text-amber-400 font-black tracking-widest"
            >
              ✦ SAGE MODE: FOCUSING CHAKRA
            </motion.div>

            <NarutoWalkingShooter actionState="charging" />

            <motion.div
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 0.15 }}
              className="mt-6 font-mono text-xl font-black text-electric-cyan tracking-widest uppercase drop-shadow-[0_0_20px_#38D6FF]"
            >
              CHARGING RASENGAN...
            </motion.div>
          </motion.div>
        )}

        {/* STAGE D: SHOOTING RASENGAN DIRECTLY AT USER'S SCREEN */}
        {stage === 'shooting' && (
          <div className="relative flex flex-col items-center justify-center z-30">
            {/* Naruto in throwing stance */}
            <div className="scale-75 opacity-70 mb-4">
              <NarutoWalkingShooter actionState="throwing" />
            </div>

            {/* Massive Rasengan Sphere Rocketing Straight Into The Camera */}
            <motion.div
              initial={{ scale: 0.5, z: 0 }}
              animate={{ scale: [0.5, 6, 32], opacity: [1, 1, 0.95] }}
              transition={{ duration: 0.7, ease: [0.5, 0, 0.75, 0] }}
              className="w-48 h-48 rounded-full bg-gradient-to-tr from-cyan-300 via-blue-600 to-white shadow-[0_0_140px_#38D6FF] flex items-center justify-center border-4 border-white"
            >
              <div className="w-36 h-36 rounded-full border-4 border-white animate-spin" />
              <div className="w-24 h-24 rounded-full border-2 border-cyan-200 animate-ping" />
            </motion.div>
          </div>
        )}

        {/* STAGE E: WHITE / CYAN CHAKRA FLASH BLAST */}
        {stage === 'blast' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [1, 0.9, 0] }}
            transition={{ duration: 0.55 }}
            className="absolute inset-0 bg-white z-40 flex items-center justify-center pointer-events-none"
          >
            <div className="w-full h-full bg-gradient-radial from-cyan-400 via-blue-500 to-transparent opacity-95" />
          </motion.div>
        )}

        {/* STAGE F: WELCOME TO MY PORTFOLIO WITH VOICE & CRYSTAL TING SOUND */}
        {stage === 'welcome' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 220 }}
            className="flex flex-col items-center text-center px-6 z-30 max-w-3xl"
          >
            {/* Sparkle Ring & Japanese Welcome Seal */}
            <div className="relative mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
                className="w-24 h-24 rounded-full border-2 border-dashed border-electric-cyan flex items-center justify-center"
              >
                <Sparkles className="w-10 h-10 text-electric-cyan" />
              </motion.div>

              <div className="absolute -bottom-2 -right-4 px-2.5 py-0.5 rounded bg-rose-500 text-white font-mono text-xs font-extrabold border border-white shadow-lg">
                ようこそ // WELCOME
              </div>
            </div>

            {/* Engineer Identity Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-electric-blue/20 border border-electric-cyan/40 text-electric-cyan font-mono text-xs font-bold mb-5">
              <span>✦ ABHIJAY SINGH // ROBOTICS &amp; AI SYSTEMS ENGINEER</span>
            </div>

            {/* The Signature Wording */}
            <motion.h1
              initial={{ letterSpacing: '6px' }}
              animate={{ letterSpacing: '0px' }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-black text-white font-mono tracking-tight leading-tight uppercase drop-shadow-[0_0_35px_rgba(56,214,255,0.7)] mb-4"
            >
              Welcome to my portfolio
            </motion.h1>

            <p className="text-base sm:text-lg text-slate-300 font-sans max-w-xl leading-relaxed mb-8">
              Full-stack developer building scalable systems end to end, from interface to architecture.
            </p>

            {/* Access Systems CTA */}
            <button
              onClick={handleComplete}
              className="inline-flex items-center gap-3 px-8 py-4 bg-electric-blue hover:bg-blue-600 text-white font-mono font-black text-sm rounded-md shadow-manga hover:shadow-electric transition-all hover:scale-105 active:scale-95"
            >
              <span>ACCESS SYSTEMS NOW</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
