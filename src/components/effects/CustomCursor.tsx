'use client';

import React, { useEffect, useState } from 'react';
import { usePortfolioStore } from '@/lib/store';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const updateSessionMetrics = usePortfolioStore((state) => state.updateSessionMetrics);

  useEffect(() => {
    // Only enable on fine pointer devices (desktops/laptops)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let prevX = 0;
    let prevY = 0;
    let accumulatedDistance = 0;

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      if (prevX !== 0 && prevY !== 0) {
        const dx = e.clientX - prevX;
        const dy = e.clientY - prevY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        accumulatedDistance += dist;
        if (accumulatedDistance > 50) {
          const currentTotal = usePortfolioStore.getState().sessionMetrics.cursorDistancePx;
          updateSessionMetrics({ cursorDistancePx: Math.round(currentTotal + accumulatedDistance) });
          accumulatedDistance = 0;
        }
      }
      prevX = e.clientX;
      prevY = e.clientY;

      // Check if target is clickable
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.closest('button') ||
          target.closest('a') ||
          target.getAttribute('role') === 'button' ||
          target.classList.contains('clickable'))
      ) {
        setIsPointer(true);
      } else {
        setIsPointer(false);
      }
    };

    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [updateSessionMetrics]);

  if (!isVisible) return null;

  return (
    <div
      className="pointer-events-none fixed z-50 transition-transform duration-75 ease-out select-none"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Outer crosshair ring */}
      <div
        className={`relative flex items-center justify-center transition-all duration-200 ${
          isPointer
            ? 'w-10 h-10 border-2 border-electric-cyan bg-electric-cyan/15 rounded-full scale-125'
            : 'w-7 h-7 border border-electric-blue/70 dark:border-electric-cyan/70 rounded-none'
        }`}
      >
        {/* Center dot */}
        <div className="w-1.5 h-1.5 bg-electric-blue dark:bg-electric-cyan rounded-full" />

        {/* Tactical Crosshair Marks */}
        {!isPointer && (
          <>
            <div className="absolute top-0 -translate-y-1 w-[1px] h-1.5 bg-navy-900 dark:bg-white" />
            <div className="absolute bottom-0 translate-y-1 w-[1px] h-1.5 bg-navy-900 dark:bg-white" />
            <div className="absolute left-0 -translate-x-1 w-1.5 h-[1px] bg-navy-900 dark:bg-white" />
            <div className="absolute right-0 translate-x-1 w-1.5 h-[1px] bg-navy-900 dark:bg-white" />
          </>
        )}
      </div>

      {/* Coordinate HUD readout */}
      <div className="absolute top-5 left-5 bg-navy-900/90 dark:bg-black/90 text-electric-cyan px-1.5 py-0.5 rounded text-[9px] font-mono tracking-tighter whitespace-nowrap border border-electric-cyan/40 backdrop-blur-sm">
        X:{Math.round(position.x)} Y:{Math.round(position.y)}
      </div>
    </div>
  );
}
