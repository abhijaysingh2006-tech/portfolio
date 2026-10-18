'use client';

import React from 'react';

interface MarqueeStripProps {
  text?: string[];
  direction?: 'left' | 'right';
  className?: string;
}

const DEFAULT_ITEMS = [
  'DISTRIBUTED ARCHITECTURE',
  '低遅延システム // ZERO-COPY MEMORY',
  'RAFT STATE REPLICATION',
  'eBPF KERNEL TELEMETRY',
  'WEBGL // SHADER MATRIX',
  'EVENT-DRIVEN STREAMING',
  'FAULT-TOLERANT QUORUM',
  'CLICKHOUSE // ARROW IPC',
];

export function MarqueeStrip({
  text = DEFAULT_ITEMS,
  className = '',
}: MarqueeStripProps) {
  const repeated = [...text, ...text, ...text];

  return (
    <div className={`w-full overflow-hidden whitespace-nowrap border-y border-navy-900/10 dark:border-electric-cyan/20 bg-navy-50/60 dark:bg-navy-950/40 py-2.5 font-mono text-xs tracking-widest text-navy-900/80 dark:text-electric-cyan/80 select-none ${className}`}>
      <div className="inline-flex animate-[marquee_28s_linear_infinite] gap-8">
        {repeated.map((item, idx) => (
          <div key={idx} className="inline-flex items-center gap-4">
            <span className="text-electric-blue dark:text-electric-cyan">✦</span>
            <span>{item}</span>
            <span className="text-sakura-pink/70">/</span>
          </div>
        ))}
      </div>
    </div>
  );
}
