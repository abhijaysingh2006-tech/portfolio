'use client';

import React from 'react';
import { motion } from 'framer-motion';

export type AnimeCharacterType = 'tanjiro' | 'naruto' | 'zenitsu' | 'sasuke' | 'rengoku';

interface AnimeCharacterProps {
  character: AnimeCharacterType;
  size?: number;
  className?: string;
  showAura?: boolean;
}

export function AnimeCharacter({
  character,
  size = 140,
  className = '',
  showAura = true,
}: AnimeCharacterProps) {
  if (character === 'tanjiro') {
    // Tanjiro Kamado: Hanafuda earrings, Hinokami Kagura flame scar, checkered green-black haori, Water/Sun aura
    return (
      <div className={`relative flex items-center justify-center select-none ${className}`}>
        {showAura && (
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.4, 0.8, 0.4],
              rotate: [0, 180, 360],
            }}
            transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
            className="absolute -inset-4 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-amber-500 blur-xl opacity-60 pointer-events-none"
          />
        )}
        <motion.svg
          width={size}
          height={size}
          viewBox="0 0 160 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
          className="relative z-10 drop-shadow-xl"
        >
          <defs>
            <linearGradient id="tanjiroHair" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8A1C28" />
              <stop offset="100%" stopColor="#1A080A" />
            </linearGradient>
            <linearGradient id="waterAura" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#38D6FF" />
              <stop offset="100%" stopColor="#1E6BFF" />
            </linearGradient>
            <pattern id="checkeredPattern" width="16" height="16" patternUnits="userSpaceOnUse">
              <rect width="8" height="8" fill="#145A32" />
              <rect x="8" width="8" height="8" fill="#111827" />
              <rect y="8" width="8" height="8" fill="#111827" />
              <rect x="8" y="8" width="8" height="8" fill="#145A32" />
            </pattern>
          </defs>

          {/* Water Breathing Dragon Wave behind */}
          <path
            d="M20 130 Q40 80 80 100 T140 70"
            stroke="url(#waterAura)"
            strokeWidth="8"
            strokeLinecap="round"
            opacity="0.75"
          />
          <path
            d="M30 140 Q60 90 100 110 T150 85"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeDasharray="4 4"
            opacity="0.9"
          />

          {/* Haori (Checkered Demon Slayer Robe) */}
          <path
            d="M45 115 C45 95, 60 88, 80 88 C100 88, 115 95, 115 115 L125 155 L35 155 Z"
            fill="url(#checkeredPattern)"
            stroke="#0A1630"
            strokeWidth="3"
          />

          {/* Head / Skin */}
          <circle cx="80" cy="65" r="32" fill="#FDDCB5" stroke="#0A1630" strokeWidth="3" />

          {/* Hinokami Kagura Flame Scar on Forehead */}
          <path
            d="M66 45 Q70 38 73 42 Q76 36 78 43 Q73 48 66 45 Z"
            fill="#B91C1C"
            stroke="#991B1B"
            strokeWidth="1"
          />

          {/* Spiked Burgundy Hair */}
          <path
            d="M48 62 C46 38, 62 25, 80 25 C100 25, 114 38, 112 62 C108 48, 96 38, 80 38 C64 38, 52 48, 48 62 Z"
            fill="url(#tanjiroHair)"
          />
          <path
            d="M50 55 L58 40 L65 52 L75 32 L85 50 L95 35 L102 52 L110 44 L112 60"
            stroke="url(#tanjiroHair)"
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* Determined Eyes */}
          <g>
            <ellipse cx="68" cy="65" rx="5" ry="6" fill="#781D26" />
            <circle cx="67" cy="63" r="2" fill="#FFFFFF" />
            <path d="M62 56 L74 58" stroke="#0A1630" strokeWidth="2.5" strokeLinecap="round" />

            <ellipse cx="92" cy="65" rx="5" ry="6" fill="#781D26" />
            <circle cx="91" cy="63" r="2" fill="#FFFFFF" />
            <path d="M98 56 L86 58" stroke="#0A1630" strokeWidth="2.5" strokeLinecap="round" />
          </g>

          {/* Determined Grin */}
          <path d="M74 77 Q80 82 86 77" stroke="#0A1630" strokeWidth="2" strokeLinecap="round" />

          {/* Hanafuda Earrings (Right ear) */}
          <rect x="108" y="68" width="6" height="14" fill="#FFFFFF" stroke="#0A1630" strokeWidth="1" />
          <circle cx="111" cy="73" r="2" fill="#DC2626" />
          <line x1="108" y1="78" x2="114" y2="78" stroke="#0A1630" strokeWidth="1" />
        </motion.svg>
      </div>
    );
  }

  if (character === 'naruto') {
    // Naruto Uzumaki: Whisker marks, Orange headband with Konoha leaf swirl, Sage Mode orange eyeshadow & toad pupil
    return (
      <div className={`relative flex items-center justify-center select-none ${className}`}>
        {showAura && (
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.9, 0.5],
            }}
            transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
            className="absolute -inset-4 rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-300 blur-xl opacity-70 pointer-events-none"
          />
        )}
        <motion.svg
          width={size}
          height={size}
          viewBox="0 0 160 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="relative z-10 drop-shadow-xl"
        >
          <defs>
            <linearGradient id="rasenganSwirl" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#38D6FF" />
              <stop offset="50%" stopColor="#1E6BFF" />
              <stop offset="100%" stopColor="#FFFFFF" />
            </linearGradient>
            <linearGradient id="narutoOrange" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF7A00" />
              <stop offset="100%" stopColor="#CC5500" />
            </linearGradient>
          </defs>

          {/* Rasengan Chakra Orb (Floating beside) */}
          <motion.g
            animate={{ rotate: 360, scale: [0.95, 1.05, 0.95] }}
            transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
            style={{ originX: '130px', originY: '110px' }}
          >
            <circle cx="130" cy="110" r="18" fill="url(#rasenganSwirl)" opacity="0.9" />
            <circle cx="130" cy="110" r="22" stroke="#38D6FF" strokeWidth="2" strokeDasharray="6 3" />
            <path d="M120 110 Q130 98 140 110 T130 122" stroke="#FFFFFF" strokeWidth="2" />
          </motion.g>

          {/* Orange Track Jacket */}
          <path
            d="M45 115 C45 95, 60 90, 80 90 C100 90, 115 95, 115 115 L125 155 L35 155 Z"
            fill="url(#narutoOrange)"
            stroke="#0A1630"
            strokeWidth="3"
          />
          {/* Black Collar Accent */}
          <path d="M65 92 L80 110 L95 92" stroke="#111827" strokeWidth="4" strokeLinecap="round" />

          {/* Head / Skin */}
          <circle cx="80" cy="65" r="32" fill="#FDDCB5" stroke="#0A1630" strokeWidth="3" />

          {/* Spiky Blonde Hair */}
          <path
            d="M45 55 L35 40 L50 35 L52 20 L68 25 L75 10 L85 10 L92 25 L108 20 L110 35 L125 40 L115 55"
            fill="#FACC15"
            stroke="#0A1630"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {/* Black Headband (Hitai-ate) */}
          <rect x="50" y="44" width="60" height="14" rx="2" fill="#1E293B" stroke="#0A1630" strokeWidth="2.5" />
          {/* Metal Plate with Leaf Village Symbol */}
          <rect x="64" y="46" width="32" height="10" rx="1.5" fill="#E2E8F0" stroke="#0A1630" strokeWidth="1.5" />
          {/* Konoha Swirl */}
          <path
            d="M78 51 C80 49, 83 50, 83 52 C83 54, 80 54, 79 53"
            stroke="#0A1630"
            strokeWidth="1.5"
            fill="none"
          />
          <path d="M78 51 L75 53" stroke="#0A1630" strokeWidth="1.5" strokeLinecap="round" />

          {/* Sage Mode Orange Pigment around Eyes */}
          <ellipse cx="68" cy="66" rx="9" ry="6" fill="#FB923C" opacity="0.85" />
          <ellipse cx="92" cy="66" rx="9" ry="6" fill="#FB923C" opacity="0.85" />

          {/* Sage Mode Toad Horizontal Pupil */}
          <ellipse cx="68" cy="66" rx="5" ry="5" fill="#F59E0B" />
          <rect x="64" y="65" width="8" height="2" fill="#0A1630" rx="0.5" />

          <ellipse cx="92" cy="66" rx="5" ry="5" fill="#F59E0B" />
          <rect x="88" y="65" width="8" height="2" fill="#0A1630" rx="0.5" />

          {/* Whiskers Marks (3 on each cheek) */}
          <line x1="56" y1="70" x2="63" y2="69" stroke="#78350F" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="55" y1="73" x2="63" y2="73" stroke="#78350F" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="56" y1="76" x2="63" y2="77" stroke="#78350F" strokeWidth="1.8" strokeLinecap="round" />

          <line x1="97" y1="69" x2="104" y2="70" stroke="#78350F" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="97" y1="73" x2="105" y2="73" stroke="#78350F" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="97" y1="77" x2="104" y2="76" stroke="#78350F" strokeWidth="1.8" strokeLinecap="round" />

          {/* Big Confident Smile */}
          <path d="M72 82 Q80 89 88 82" stroke="#0A1630" strokeWidth="2.5" strokeLinecap="round" />
        </motion.svg>
      </div>
    );
  }

  if (character === 'zenitsu') {
    // Zenitsu Agatsuma: Yellow triangle haori, lightning sparks, Thunderclap & Flash eyes
    return (
      <div className={`relative flex items-center justify-center select-none ${className}`}>
        {showAura && (
          <motion.div
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.1, 1],
            }}
            transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
            className="absolute -inset-4 rounded-full bg-yellow-400 blur-xl opacity-60 pointer-events-none"
          />
        )}
        <motion.svg
          width={size}
          height={size}
          viewBox="0 0 160 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          animate={{ x: [-1, 1, -1] }}
          transition={{ repeat: Infinity, duration: 0.15 }}
          className="relative z-10 drop-shadow-xl"
        >
          {/* Lightning Bolts */}
          <path d="M25 80 L35 70 L30 65 L45 50" stroke="#FACC15" strokeWidth="3" strokeLinecap="round" />
          <path d="M135 75 L125 65 L130 60 L115 45" stroke="#FACC15" strokeWidth="3" strokeLinecap="round" />

          {/* Yellow Triangle Haori */}
          <path
            d="M45 115 C45 95, 60 88, 80 88 C100 88, 115 95, 115 115 L125 155 L35 155 Z"
            fill="#F59E0B"
            stroke="#0A1630"
            strokeWidth="3"
          />
          {/* White Triangles */}
          <polygon points="60,110 66,120 54,120" fill="#FFFFFF" />
          <polygon points="80,115 86,125 74,125" fill="#FFFFFF" />
          <polygon points="100,110 106,120 94,120" fill="#FFFFFF" />

          {/* Head / Skin */}
          <circle cx="80" cy="65" r="32" fill="#FDDCB5" stroke="#0A1630" strokeWidth="3" />

          {/* Square-cut Yellow to Orange Hair */}
          <path
            d="M48 60 C46 38, 62 25, 80 25 C100 25, 114 38, 112 60 C108 52, 96 42, 80 42 C64 42, 52 52, 48 60 Z"
            fill="#FACC15"
          />
          <path
            d="M50 55 L55 70 L65 72 L70 55 L80 72 L85 55 L95 72 L105 70 L110 55"
            stroke="#EAB308"
            strokeWidth="5"
            strokeLinecap="square"
          />

          {/* Thunder Breathing Focus: Closed Eyes with Sparks */}
          <line x1="62" y1="65" x2="74" y2="65" stroke="#0A1630" strokeWidth="3" strokeLinecap="round" />
          <line x1="86" y1="65" x2="98" y2="65" stroke="#0A1630" strokeWidth="3" strokeLinecap="round" />
          <path d="M76 77 L84 77" stroke="#0A1630" strokeWidth="2.5" strokeLinecap="round" />
        </motion.svg>
      </div>
    );
  }

  // Sasuke Uchiha (Rinnegan / Sharingan eye technique & Chidori electric discharge)
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {showAura && (
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.4, 0.85, 0.4],
          }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          className="absolute -inset-4 rounded-full bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-400 blur-xl opacity-60 pointer-events-none"
        />
      )}
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{ y: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
        className="relative z-10 drop-shadow-xl"
      >
        {/* Chidori Lightning Blade */}
        <motion.path
          d="M20 120 L35 110 L28 100 L45 85 L35 80 L55 65"
          stroke="#38D6FF"
          strokeWidth="3"
          strokeLinecap="round"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 0.3 }}
        />

        {/* High Collar Dark Robe */}
        <path
          d="M45 115 C45 95, 60 88, 80 88 C100 88, 115 95, 115 115 L125 155 L35 155 Z"
          fill="#0F172A"
          stroke="#0A1630"
          strokeWidth="3"
        />
        {/* High White Collar */}
        <path d="M60 92 L70 75 L80 88 L90 75 L100 92" stroke="#E2E8F0" strokeWidth="4" strokeLinejoin="round" />

        {/* Head / Skin */}
        <circle cx="80" cy="65" r="32" fill="#FEE2E2" stroke="#0A1630" strokeWidth="3" />

        {/* Spiked Jet Black Hair (Ducktail style) */}
        <path
          d="M44 65 L30 45 L48 40 L45 20 L65 26 L75 14 L85 14 L95 26 L115 20 L112 40 L130 45 L116 65"
          fill="#090D16"
          stroke="#0A1630"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        {/* Bangs parting */}
        <path d="M52 50 L68 70 L78 50 L88 70 L108 50" stroke="#090D16" strokeWidth="6" strokeLinecap="round" />

        {/* Right Eye: Mangekyou Sharingan (Red with 3-pointed pinwheel) */}
        <g>
          <circle cx="68" cy="66" r="6" fill="#DC2626" stroke="#0A1630" strokeWidth="1" />
          <circle cx="68" cy="66" r="2" fill="#0A1630" />
          {/* Tomoe Pinwheel lines */}
          <path d="M68 64 L71 67 L65 67 Z" fill="#0A1630" />
          <path d="M62 57 L74 59" stroke="#0A1630" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* Left Eye: Rinnegan (Purple concentric rings) */}
        <g>
          <circle cx="92" cy="66" r="6" fill="#A855F7" stroke="#0A1630" strokeWidth="1" />
          <circle cx="92" cy="66" r="4" stroke="#4C1D95" strokeWidth="1" fill="none" />
          <circle cx="92" cy="66" r="2" fill="#0A1630" />
          {/* Tomoe dots on rings */}
          <circle cx="92" cy="63" r="0.8" fill="#0A1630" />
          <circle cx="89" cy="68" r="0.8" fill="#0A1630" />
          <circle cx="95" cy="68" r="0.8" fill="#0A1630" />
          <path d="M98 57 L86 59" stroke="#0A1630" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* Calm smirk */}
        <path d="M75 79 L84 78" stroke="#0A1630" strokeWidth="2" strokeLinecap="round" />
      </motion.svg>
    </div>
  );
}
