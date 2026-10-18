'use client';

import React from 'react';
import { motion } from 'framer-motion';

export type MascotState = 'idle' | 'typing' | 'wave' | 'celebrate' | 'running';

interface MascotProps {
  state?: MascotState;
  size?: number;
  className?: string;
  showSpeechBubble?: boolean;
  speechText?: string;
}

export function OriginalCoderMascot({
  state = 'idle',
  size = 180,
  className = '',
  showSpeechBubble = false,
  speechText = 'SYSTEM READY //',
}: MascotProps) {
  // Original Anime Coder Mascot: "Kuro-01" (Cyber cat-eared systems coder with glowing laptop)
  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* Optional Manga Speech Bubble */}
      {showSpeechBubble && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="mb-2 px-3 py-1 bg-white dark:bg-navy-900 border-2 border-navy-900 dark:border-electric-cyan rounded-md shadow-manga dark:shadow-manga-dark text-xs font-mono font-bold text-navy-900 dark:text-electric-cyan z-20 flex items-center gap-1.5"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-electric-blue dark:bg-electric-cyan animate-ping" />
          <span>{speechText}</span>
        </motion.div>
      )}

      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={
          state === 'idle'
            ? { y: [0, -6, 0] }
            : state === 'running'
            ? { y: [0, -12, 0], x: [-3, 3, -3] }
            : state === 'celebrate'
            ? { y: [0, -18, 0], rotate: [0, -4, 4, 0] }
            : { y: [0, -3, 0] }
        }
        transition={{
          repeat: Infinity,
          duration: state === 'running' ? 0.35 : state === 'celebrate' ? 0.6 : 2.5,
          ease: 'easeInOut',
        }}
        className="drop-shadow-lg"
      >
        <defs>
          <linearGradient id="skinGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFF3E8" />
            <stop offset="100%" stopColor="#F5DDC4" />
          </linearGradient>
          <linearGradient id="hairGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1E6BFF" />
            <stop offset="100%" stopColor="#0A1630" />
          </linearGradient>
          <linearGradient id="hoodieGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0A1630" />
            <stop offset="100%" stopColor="#122550" />
          </linearGradient>
          <linearGradient id="laptopGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#38D6FF" />
            <stop offset="100%" stopColor="#1E6BFF" />
          </linearGradient>
          <filter id="glowCyan" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Mascot Body: Cyber Hoodie */}
        <path
          d="M60 145 C60 120, 75 110, 100 110 C125 110, 140 120, 140 145 L150 185 C150 190, 145 195, 140 195 L60 195 C55 195, 50 190, 50 185 Z"
          fill="url(#hoodieGrad)"
          stroke="#0A1630"
          strokeWidth="3.5"
        />

        {/* Neon Hoodie Accent Lines */}
        <path d="M96 115 L96 175" stroke="#38D6FF" strokeWidth="2" strokeDasharray="3 3" />
        <path d="M104 115 L104 175" stroke="#38D6FF" strokeWidth="2" strokeDasharray="3 3" />

        {/* Head / Face */}
        <circle cx="100" cy="85" r="42" fill="url(#skinGrad)" stroke="#0A1630" strokeWidth="3.5" />

        {/* Anime Hair (Original spiked cyber bangs with electric tint) */}
        <path
          d="M58 80 C58 52, 75 40, 100 40 C125 40, 142 52, 142 80 C142 65, 130 50, 100 50 C70 50, 58 65, 58 80 Z"
          fill="url(#hairGrad)"
        />
        {/* Hair Bang Spikes */}
        <path
          d="M60 75 Q75 95 82 82 Q90 102 100 78 Q110 100 118 80 Q126 95 140 75 C135 60 125 50 100 50 C75 50 65 60 60 75 Z"
          fill="url(#hairGrad)"
          stroke="#0A1630"
          strokeWidth="2.5"
        />

        {/* Cat-Ear Headset (Cyber audio antenna) */}
        <path
          d="M65 52 L50 25 L75 42 Z"
          fill="#1E6BFF"
          stroke="#0A1630"
          strokeWidth="3"
        />
        <path d="M56 38 L62 45" stroke="#38D6FF" strokeWidth="2" />
        <path
          d="M135 52 L150 25 L125 42 Z"
          fill="#1E6BFF"
          stroke="#0A1630"
          strokeWidth="3"
        />
        <path d="M144 38 L138 45" stroke="#38D6FF" strokeWidth="2" />

        {/* Anime Eyes */}
        {state === 'celebrate' ? (
          // Star Eyes for Celebrate State
          <>
            <text x="76" y="94" fontSize="16" fill="#38D6FF" fontWeight="bold">★</text>
            <text x="110" y="94" fontSize="16" fill="#38D6FF" fontWeight="bold">★</text>
          </>
        ) : (
          <>
            {/* Left Eye */}
            <g>
              <ellipse cx="82" cy="85" rx="7" ry="10" fill="#0A1630" />
              <ellipse cx="80" cy="82" rx="3" ry="5" fill="#38D6FF" />
              <circle cx="83" cy="81" r="2" fill="#FFFFFF" />
              <line x1="74" y1="72" x2="88" y2="72" stroke="#0A1630" strokeWidth="2.5" strokeLinecap="round" />
            </g>
            {/* Right Eye */}
            <g>
              <ellipse cx="118" cy="85" rx="7" ry="10" fill="#0A1630" />
              <ellipse cx="116" cy="82" rx="3" ry="5" fill="#38D6FF" />
              <circle cx="119" cy="81" r="2" fill="#FFFFFF" />
              <line x1="112" y1="72" x2="126" y2="72" stroke="#0A1630" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          </>
        )}

        {/* Anime Blush Marks */}
        <g opacity="0.7">
          <line x1="68" y1="92" x2="74" y2="92" stroke="#FF8FB8" strokeWidth="2" strokeLinecap="round" />
          <line x1="69" y1="95" x2="73" y2="95" stroke="#FF8FB8" strokeWidth="2" strokeLinecap="round" />
          <line x1="126" y1="92" x2="132" y2="92" stroke="#FF8FB8" strokeWidth="2" strokeLinecap="round" />
          <line x1="127" y1="95" x2="131" y2="95" stroke="#FF8FB8" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Small Mouth */}
        {state === 'celebrate' || state === 'wave' ? (
          <path d="M96 95 Q100 102 104 95 Z" fill="#FF8FB8" stroke="#0A1630" strokeWidth="1.5" />
        ) : (
          <path d="M97 96 Q100 98 103 96" stroke="#0A1630" strokeWidth="2" strokeLinecap="round" />
        )}

        {/* AR HUD Monocle Lens over Right Eye */}
        <circle cx="118" cy="85" r="14" stroke="#38D6FF" strokeWidth="1.5" fill="rgba(56, 214, 255, 0.15)" />
        <line x1="132" y1="85" x2="142" y2="75" stroke="#38D6FF" strokeWidth="1.5" />

        {/* Arms / Hands & Laptop */}
        {state === 'wave' ? (
          <>
            {/* Left resting */}
            <path d="M60 140 Q65 155 75 160" stroke="#0A1630" strokeWidth="8" strokeLinecap="round" />
            {/* Right Arm Waving */}
            <motion.g
              animate={{ rotate: [0, 20, -10, 20, 0] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
              style={{ originX: '135px', originY: '135px' }}
            >
              <path d="M135 135 L160 100 L168 90" stroke="#0A1630" strokeWidth="8" strokeLinecap="round" />
              <circle cx="168" cy="88" r="7" fill="url(#skinGrad)" stroke="#0A1630" strokeWidth="2" />
            </motion.g>
          </>
        ) : (
          <>
            {/* Arms resting on laptop keyboard */}
            <motion.path
              d="M62 140 Q75 160 88 155"
              stroke="#0A1630"
              strokeWidth="7"
              strokeLinecap="round"
              animate={state === 'typing' ? { y: [0, -2, 0] } : {}}
              transition={{ repeat: Infinity, duration: 0.15 }}
            />
            <motion.path
              d="M138 140 Q125 160 112 155"
              stroke="#0A1630"
              strokeWidth="7"
              strokeLinecap="round"
              animate={state === 'typing' ? { y: [0, -2, 0] } : {}}
              transition={{ repeat: Infinity, duration: 0.18 }}
            />

            {/* Glowing Cyber Laptop */}
            <g transform="translate(68, 142)">
              {/* Laptop Screen */}
              <polygon points="12,0 52,0 58,26 6,26" fill="#0A1630" stroke="#38D6FF" strokeWidth="2" />
              <polygon points="15,3 49,3 54,23 10,23" fill="url(#laptopGrad)" filter="url(#glowCyan)" opacity="0.85" />
              {/* Screen Code Lines */}
              <line x1="18" y1="8" x2="35" y2="8" stroke="#FFFFFF" strokeWidth="1.5" />
              <line x1="16" y1="13" x2="44" y2="13" stroke="#FFFFFF" strokeWidth="1.5" />
              <line x1="14" y1="18" x2="30" y2="18" stroke="#FFFFFF" strokeWidth="1.5" />
              {/* Laptop Keyboard Base */}
              <polygon points="0,27 64,27 60,38 4,38" fill="#0A1630" stroke="#0A1630" strokeWidth="2" />
              <line x1="8" y1="30" x2="56" y2="30" stroke="#38D6FF" strokeWidth="1.5" />
            </g>
          </>
        )}

        {/* Sparkles around mascot when celebrating */}
        {state === 'celebrate' && (
          <>
            <motion.text
              x="30"
              y="60"
              fontSize="20"
              fill="#38D6FF"
              animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
            >
              ✦
            </motion.text>
            <motion.text
              x="160"
              y="50"
              fontSize="18"
              fill="#FF8FB8"
              animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 0.9, delay: 0.2 }}
            >
              ✦
            </motion.text>
          </>
        )}
      </motion.svg>
    </div>
  );
}
