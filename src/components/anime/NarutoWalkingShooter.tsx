'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface NarutoWalkingShooterProps {
  actionState: 'walking' | 'idle' | 'charging' | 'throwing';
  className?: string;
}

export function NarutoWalkingShooter({ actionState, className = '' }: NarutoWalkingShooterProps) {
  const isWalking = actionState === 'walking';
  const isCharging = actionState === 'charging';
  const isThrowing = actionState === 'throwing';

  return (
    <div className={`relative select-none flex items-center justify-center ${className}`}>
      {/* Golden Sage Chakra Glow */}
      <motion.div
        animate={{
          scale: isCharging || isThrowing ? [1, 1.3, 1] : [1, 1.1, 1],
          opacity: isCharging || isThrowing ? [0.7, 1, 0.7] : [0.3, 0.6, 0.3],
        }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute -inset-8 rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-300 blur-2xl pointer-events-none"
      />

      <motion.svg
        width={220}
        height={260}
        viewBox="0 0 220 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={
          isWalking
            ? { y: [0, -10, 0] }
            : isCharging
            ? { y: [0, 4, 0], scale: 1.05 }
            : isThrowing
            ? { scale: [1, 1.25, 1.4], y: -8, x: 20 }
            : { y: [0, -4, 0] }
        }
        transition={{
          repeat: isWalking || isCharging ? Infinity : 0,
          duration: isWalking ? 0.45 : 1.2,
          ease: 'easeInOut',
        }}
        className="relative z-10 drop-shadow-2xl overflow-visible"
      >
        <defs>
          <linearGradient id="narutoOrangeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFA100" />
            <stop offset="100%" stopColor="#D95000" />
          </linearGradient>
          <linearGradient id="rasenganCore" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="35%" stopColor="#38D6FF" />
            <stop offset="100%" stopColor="#1E6BFF" />
          </linearGradient>
          <filter id="rasenganGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Headband Tail Cloth blowing in wind */}
        <motion.path
          d="M60 52 Q35 60 15 50 Q30 75 55 60"
          fill="#1E293B"
          stroke="#0A1630"
          strokeWidth="2"
          animate={{
            d: [
              'M60 52 Q35 60 15 50 Q30 75 55 60',
              'M60 52 Q30 45 10 65 Q35 80 55 60',
              'M60 52 Q35 60 15 50 Q30 75 55 60',
            ],
          }}
          transition={{ repeat: Infinity, duration: 0.5 }}
        />

        {/* Back Leg (Animated when walking) */}
        <motion.g
          animate={
            isWalking
              ? { rotate: [25, -25, 25] }
              : isThrowing
              ? { rotate: -35 }
              : { rotate: 0 }
          }
          style={{ originX: '95px', originY: '170px' }}
        >
          {/* Leg */}
          <path d="M95 170 L85 220 L75 245" stroke="#FFA100" strokeWidth="18" strokeLinecap="round" />
          {/* White Bandage Wrap */}
          <rect x="75" y="215" width="20" height="14" fill="#FFFFFF" rx="2" stroke="#0A1630" strokeWidth="1" />
          {/* Ninja Sandal */}
          <path d="M72 245 L95 245 L98 250 L68 250 Z" fill="#1E293B" stroke="#0A1630" strokeWidth="2" />
        </motion.g>

        {/* Front Leg (Opposite stride) */}
        <motion.g
          animate={
            isWalking
              ? { rotate: [-25, 25, -25] }
              : isThrowing
              ? { rotate: 30 }
              : { rotate: 0 }
          }
          style={{ originX: '125px', originY: '170px' }}
        >
          {/* Leg */}
          <path d="M125 170 L135 220 L145 245" stroke="#D95000" strokeWidth="18" strokeLinecap="round" />
          {/* Ninja Sandal */}
          <path d="M138 245 L162 245 L165 250 L134 250 Z" fill="#1E293B" stroke="#0A1630" strokeWidth="2" />
        </motion.g>

        {/* Torso / Orange Track Jacket */}
        <path
          d="M75 110 C75 90, 90 85, 110 85 C130 85, 145 90, 145 110 L150 175 C150 180, 140 185, 110 185 C80 185, 70 180, 70 175 Z"
          fill="url(#narutoOrangeGrad)"
          stroke="#0A1630"
          strokeWidth="3.5"
        />

        {/* Dark Blue Shoulder Mantle / Collar */}
        <path d="M85 86 L110 120 L135 86 Z" fill="#1E293B" stroke="#0A1630" strokeWidth="2.5" />
        {/* Red Uzumaki Clan Spiral on Back/Chest */}
        <circle cx="110" cy="145" r="14" stroke="#DC2626" strokeWidth="3" fill="none" />
        <path d="M110 137 C115 137, 118 141, 117 145 C116 149, 112 150, 108 147" stroke="#DC2626" strokeWidth="2.5" fill="none" />

        {/* Left Arm (Balancing Arm) */}
        <motion.path
          d={
            isThrowing
              ? 'M78 115 L50 135 L30 145'
              : isWalking
              ? 'M78 115 L60 140 L50 160'
              : 'M78 115 L65 145 L70 165'
          }
          stroke="#FFA100"
          strokeWidth="14"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={isWalking ? { rotate: [-20, 20, -20] } : {}}
          style={{ originX: '78px', originY: '115px' }}
        />

        {/* Head / Skin */}
        <circle cx="110" cy="55" r="32" fill="#FEE3C6" stroke="#0A1630" strokeWidth="3.5" />

        {/* Spiky Blonde Hair */}
        <path
          d="M72 45 L62 25 L80 25 L84 8 L98 16 L110 2 L122 16 L136 8 L140 25 L158 25 L148 45"
          fill="#FACC15"
          stroke="#0A1630"
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* Black Ninja Headband */}
        <rect x="78" y="36" width="64" height="14" rx="2" fill="#1E293B" stroke="#0A1630" strokeWidth="2.5" />
        {/* Metal Plate with Konoha Leaf Emblem */}
        <rect x="92" y="38" width="36" height="10" rx="1.5" fill="#E2E8F0" stroke="#0A1630" strokeWidth="1.5" />
        <circle cx="106" cy="43" r="1.5" fill="#0A1630" />
        <path d="M107 41 Q112 43 110 46" stroke="#0A1630" strokeWidth="1.5" fill="none" />

        {/* Sage Mode Orange Eyeshadow */}
        <ellipse cx="98" cy="56" rx="9" ry="6" fill="#FB923C" opacity="0.85" />
        <ellipse cx="122" cy="56" rx="9" ry="6" fill="#FB923C" opacity="0.85" />

        {/* Sage Mode Toad Eyes (Horizontal Pupils) */}
        <ellipse cx="98" cy="56" rx="5" ry="5" fill="#F59E0B" />
        <rect x="94" y="55" width="8" height="2" fill="#0A1630" rx="0.5" />

        <ellipse cx="122" cy="56" rx="5" ry="5" fill="#F59E0B" />
        <rect x="118" y="55" width="8" height="2" fill="#0A1630" rx="0.5" />

        {/* Whiskers Marks */}
        <line x1="86" y1="60" x2="93" y2="59" stroke="#78350F" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="85" y1="63" x2="93" y2="63" stroke="#78350F" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="86" y1="66" x2="93" y2="67" stroke="#78350F" strokeWidth="1.8" strokeLinecap="round" />

        <line x1="127" y1="59" x2="134" y2="60" stroke="#78350F" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="127" y1="63" x2="135" y2="63" stroke="#78350F" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="127" y1="67" x2="134" y2="66" stroke="#78350F" strokeWidth="1.8" strokeLinecap="round" />

        {/* Mouth */}
        {isCharging || isThrowing ? (
          // Determined Battle Cry
          <path d="M102 70 Q110 80 118 70 Z" fill="#DC2626" stroke="#0A1630" strokeWidth="2" />
        ) : (
          // Confident Smirk
          <path d="M104 68 Q110 74 116 68" stroke="#0A1630" strokeWidth="2.5" strokeLinecap="round" />
        )}

        {/* Right Arm: Thrusting Palm & Spinning Rasengan */}
        <g>
          {isThrowing ? (
            // Arm Thrust Straight Forward towards User
            <path d="M142 115 L175 110 L195 105" stroke="#FFA100" strokeWidth="16" strokeLinecap="round" />
          ) : isCharging ? (
            // Arm Back Holding Rasengan
            <path d="M142 115 L165 130 L185 125" stroke="#FFA100" strokeWidth="16" strokeLinecap="round" />
          ) : isWalking ? (
            // Arm Swings while Walking
            <motion.path
              d="M142 115 L155 140 L165 160"
              stroke="#FFA100"
              strokeWidth="14"
              strokeLinecap="round"
              animate={{ rotate: [20, -20, 20] }}
              style={{ originX: '142px', originY: '115px' }}
            />
          ) : (
            // Ready Stance
            <path d="M142 115 L160 135 L175 130" stroke="#FFA100" strokeWidth="14" strokeLinecap="round" />
          )}

          {/* THE RASENGAN SPHERE (Only appears when Charging or Throwing) */}
          {(isCharging || isThrowing) && (
            <motion.g
              transform={isThrowing ? 'translate(195, 105)' : 'translate(185, 125)'}
              animate={{ rotate: 720 }}
              transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
            >
              {/* Outer Chakra Swirl Rings */}
              <circle cx="0" cy="0" r="32" stroke="#38D6FF" strokeWidth="3" strokeDasharray="14 6" opacity="0.9" />
              <circle cx="0" cy="0" r="26" stroke="#FFFFFF" strokeWidth="2.5" strokeDasharray="10 8" />
              {/* Core Spinning Vortex */}
              <circle cx="0" cy="0" r="20" fill="url(#rasenganCore)" filter="url(#rasenganGlow)" />
              {/* Swirling Wind Particles */}
              <path d="M-12 -6 Q0 -18 12 -6 Q18 8 0 14 Q-14 8 -12 -6 Z" stroke="#FFFFFF" strokeWidth="2" fill="none" />
            </motion.g>
          )}
        </g>
      </motion.svg>
    </div>
  );
}
