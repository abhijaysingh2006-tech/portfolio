'use client';

import React, { useEffect, useState } from 'react';

interface Petal {
  id: number;
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
}

export function SakuraPetals() {
  const [petals, setPetals] = useState<Petal[]>([]);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check user preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setPrefersReducedMotion(true);
      return;
    }

    const count = 18;
    const initial: Petal[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * -100,
      size: 10 + Math.random() * 14,
      speedY: 0.4 + Math.random() * 0.8,
      speedX: -0.2 + Math.random() * 0.4,
      rotation: Math.random() * 360,
      rotationSpeed: -1 + Math.random() * 2,
      opacity: 0.35 + Math.random() * 0.4,
    }));
    setPetals(initial);

    let animationFrameId: number;
    const update = () => {
      setPetals((prev) =>
        prev.map((p) => {
          let nextY = p.y + p.speedY;
          let nextX = p.x + p.speedX;
          let nextRot = p.rotation + p.rotationSpeed;

          if (nextY > 105) {
            nextY = -5;
            nextX = Math.random() * 100;
          }
          if (nextX > 105) nextX = -5;
          if (nextX < -5) nextX = 105;

          return {
            ...p,
            y: nextY,
            x: nextX,
            rotation: nextRot,
          };
        })
      );
      animationFrameId = requestAnimationFrame(update);
    };

    animationFrameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  if (prefersReducedMotion || petals.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden select-none">
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}vw`,
            top: `${p.y}vh`,
            width: `${p.size}px`,
            height: `${p.size * 0.8}px`,
            transform: `rotate(${p.rotation}deg)`,
            opacity: p.opacity,
            transition: 'transform 0.05s linear',
          }}
        >
          <svg viewBox="0 0 30 24" fill="none" className="w-full h-full">
            <path
              d="M15 0 C22 4, 30 12, 28 20 C24 24, 18 22, 15 16 C12 22, 6 24, 2 20 C0 12, 8 4, 15 0 Z"
              fill="#FF8FB8"
              fillOpacity="0.8"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
