'use client';

import React, { useEffect } from 'react';
import { Clock, MousePointer2, ArrowDownCircle, ShieldCheck, Trash2, Eye } from 'lucide-react';
import { KanjiStamp } from '@/components/effects/KanjiStamp';
import { usePortfolioStore } from '@/lib/store';
import { playAnimeSound } from '@/lib/audio';

export function SessionSection() {
  const { sessionMetrics, updateSessionMetrics, resetSessionMetrics } = usePortfolioStore();

  useEffect(() => {
    // Timer for time on page
    const timer = setInterval(() => {
      const current = usePortfolioStore.getState().sessionMetrics.timeOnPageSeconds;
      const nextTime = current + 1;

      // Classify visitor dynamically based on behavior
      let classification = 'Curious Explorer';
      if (nextTime > 90) classification = 'Senior Systems Evaluator';
      else if (nextTime > 40) classification = 'Technical Architect';
      else if (nextTime > 15) classification = 'Talent Scout / Recruiter';

      updateSessionMetrics({
        timeOnPageSeconds: nextTime,
        visitorClassification: classification,
      });
    }, 1000);

    // Scroll tracker
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPct = docHeight > 0 ? Math.round((scrollY / docHeight) * 100) : 0;

      const currentDeepest = usePortfolioStore.getState().sessionMetrics.deepestScrollPct;
      if (scrollPct > currentDeepest) {
        updateSessionMetrics({ deepestScrollPct: scrollPct });
      }

      // Check which section is in view
      const sections = ['hero', 'projects', 'architecture', 'skills', 'about', 'session', 'contact'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            updateSessionMetrics({ mostAttendedSection: id.toUpperCase() });
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [updateSessionMetrics]);

  const handleReset = () => {
    playAnimeSound('blip');
    resetSessionMetrics();
  };

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remaining = sec % 60;
    return `${mins}m ${remaining}s`;
  };

  return (
    <section
      id="session"
      className="relative px-6 sm:px-12 lg:px-24 py-24 border-b border-navy-900/10 dark:border-electric-cyan/20 bg-slate-50/50 dark:bg-black/20"
    >
      {/* Section Header */}
      <div className="flex flex-wrap items-baseline justify-between gap-4 mb-12 pb-4 border-b border-navy-900/10 dark:border-electric-cyan/20">
        <div>
          <div className="flex items-center gap-3 mb-2 font-mono text-xs">
            <span className="font-extrabold text-electric-blue dark:text-electric-cyan">
              05 YOUR SESSION
            </span>
            <span className="text-slate-400">// LOCAL CLIENT TELEMETRY</span>
            <KanjiStamp kanji="記録" romaji="KIROKU" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-navy-900 dark:text-white tracking-tight">
            Client Telemetry & Insights
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded border border-emerald-500/20">
          <ShieldCheck className="w-4 h-4" />
          <span>100% IN-BROWSER ONLY // ZERO COOKIES STORED</span>
        </div>
      </div>

      {/* Telemetry Dashboard Grid */}
      <div className="border-2 border-navy-900 dark:border-electric-cyan bg-white dark:bg-navy-950 rounded-md p-6 sm:p-8 shadow-manga dark:shadow-manga-dark">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Time on Page */}
          <div className="p-4 rounded border border-navy-900/10 dark:border-electric-cyan/20 bg-navy-50/40 dark:bg-navy-900/40">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-2">
              <Clock className="w-3.5 h-3.5 text-electric-blue dark:text-electric-cyan" />
              <span>TIME ON PAGE</span>
            </div>
            <div className="text-2xl font-black font-mono text-navy-900 dark:text-white">
              {formatSeconds(sessionMetrics.timeOnPageSeconds)}
            </div>
          </div>

          {/* Cursor Travel */}
          <div className="p-4 rounded border border-navy-900/10 dark:border-electric-cyan/20 bg-navy-50/40 dark:bg-navy-900/40">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-2">
              <MousePointer2 className="w-3.5 h-3.5 text-electric-cyan" />
              <span>CURSOR DISTANCE</span>
            </div>
            <div className="text-2xl font-black font-mono text-navy-900 dark:text-white">
              {sessionMetrics.cursorDistancePx.toLocaleString()} px
            </div>
          </div>

          {/* Deepest Scroll */}
          <div className="p-4 rounded border border-navy-900/10 dark:border-electric-cyan/20 bg-navy-50/40 dark:bg-navy-900/40">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-2">
              <ArrowDownCircle className="w-3.5 h-3.5 text-sakura-pink" />
              <span>DEEPEST SCROLL</span>
            </div>
            <div className="text-2xl font-black font-mono text-navy-900 dark:text-white">
              {sessionMetrics.deepestScrollPct}%
            </div>
          </div>

          {/* Active Classification */}
          <div className="p-4 rounded border border-navy-900/10 dark:border-electric-cyan/20 bg-navy-50/40 dark:bg-navy-900/40">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-2">
              <Eye className="w-3.5 h-3.5 text-purple-400" />
              <span>CLASSIFIED AS</span>
            </div>
            <div className="text-lg font-bold font-mono text-electric-blue dark:text-electric-cyan truncate">
              {sessionMetrics.visitorClassification}
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-navy-900/10 dark:border-electric-cyan/20 font-mono text-xs">
          <div className="text-slate-500">
            CURRENT ZONE: <strong className="text-navy-900 dark:text-white font-bold">{sessionMetrics.mostAttendedSection}</strong>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 border border-rose-500/30 text-rose-600 dark:text-rose-400 hover:bg-rose-500 hover:text-white rounded transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>FORGET THIS SESSION</span>
          </button>
        </div>
      </div>
    </section>
  );
}
