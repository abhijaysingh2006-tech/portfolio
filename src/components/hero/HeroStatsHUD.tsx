'use client';

import React, { useEffect, useState } from 'react';
import { UserStats } from '@/types/portfolio';
import { DEFAULT_STATS } from '@/data/default-profile';

export function HeroStatsHUD() {
  const [stats, setStats] = useState<UserStats>(DEFAULT_STATS);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    fetch('/api/stats')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setStats(data.data);
          setIsLive(true);
        }
      })
      .catch((err) => {
        console.warn('Using offline HUD stats:', err);
      });
  }, []);

  return (
    <div className="relative border-2 border-navy-900 dark:border-electric-cyan bg-white/95 dark:bg-navy-950/90 p-5 rounded-md shadow-manga dark:shadow-manga-dark backdrop-blur-md">
      {/* Top HUD Monospace Status Bar */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-navy-900/15 dark:border-electric-cyan/20 font-mono text-[11px]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="font-bold text-navy-900 dark:text-white">
            GITHUB TELEMETRY // HUD-01
          </span>
        </div>
        <div className="text-electric-blue dark:text-electric-cyan uppercase tracking-wider">
          {isLive ? '[ONLINE: SYNCED]' : '[CACHED: 6H]'}
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="flex flex-col">
          <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400 uppercase">
            PUBLIC REPOS
          </span>
          <span className="font-mono text-2xl font-black text-navy-900 dark:text-white">
            {stats.totalRepos}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400 uppercase">
            TOTAL STARS
          </span>
          <span className="font-mono text-2xl font-black text-electric-blue dark:text-electric-cyan">
            ★ {stats.totalStars}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400 uppercase">
            COMMITS (YR)
          </span>
          <span className="font-mono text-2xl font-black text-navy-900 dark:text-white">
            {stats.commitsThisYear}+
          </span>
        </div>
      </div>

      {/* Top Languages Distribution */}
      <div>
        <div className="flex justify-between items-center mb-1.5 font-mono text-[10px] text-slate-500 dark:text-slate-400">
          <span>CORE SYSTEMS STACK</span>
          <span>DISTRIBUTION</span>
        </div>
        <div className="flex h-2 w-full rounded-sm overflow-hidden bg-slate-200 dark:bg-navy-900 mb-2.5">
          {stats.topLanguages.map((lang, idx) => (
            <div
              key={idx}
              style={{
                width: `${Math.max(15, (lang.count / Math.max(1, stats.totalRepos)) * 100)}%`,
                backgroundColor: lang.color,
              }}
              className="h-full"
              title={`${lang.name}: ${lang.count} repos`}
            />
          ))}
        </div>

        {/* Language Badges */}
        <div className="flex flex-wrap gap-2">
          {stats.topLanguages.map((lang, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono border border-navy-900/10 dark:border-electric-cyan/30 bg-navy-50 dark:bg-navy-900 text-navy-900 dark:text-slate-200"
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: lang.color }}
              />
              {lang.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
