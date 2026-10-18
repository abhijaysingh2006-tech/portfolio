'use client';

import React from 'react';
import { Star, GitFork, ExternalLink, Cpu } from 'lucide-react';
import { RepoProject } from '@/types/portfolio';
import { usePortfolioStore } from '@/lib/store';
import { playAnimeSound } from '@/lib/audio';

interface RepoCardProps {
  repo: RepoProject;
  onClick?: () => void;
}

export function RepoCard({ repo, onClick }: RepoCardProps) {
  const setSelectedRepo = usePortfolioStore((state) => state.setSelectedRepo);

  const handleClick = () => {
    playAnimeSound('open');
    if (onClick) {
      onClick();
    } else {
      setSelectedRepo(repo);
    }
  };

  const primaryLang = repo.primaryLanguage || 'TypeScript';

  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      className="group relative flex flex-col justify-between h-[360px] w-full rounded-md border-2 border-navy-900 dark:border-electric-cyan bg-white dark:bg-navy-950 p-5 shadow-manga dark:shadow-manga-dark transition-all duration-200 hover:-translate-y-1.5 hover:shadow-electric cursor-pointer text-left select-none overflow-hidden"
    >
      {/* Halftone corner micro-pattern */}
      <div className="absolute top-0 right-0 w-24 h-24 opacity-10 dark:opacity-20 pointer-events-none bg-[radial-gradient(#1E6BFF_1px,transparent_1px)] [background-size:6px_6px]" />

      {/* Top Header: ID + Kanji Tag + Status */}
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-navy-900/15 dark:border-electric-cyan/20 font-mono text-[11px]">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-electric-blue dark:text-electric-cyan tracking-wider">
              {repo.id}
            </span>
            <span className="text-slate-400">/</span>
            <span className="px-1.5 py-0.5 rounded bg-navy-100 dark:bg-navy-900 text-navy-900 dark:text-slate-200 font-bold">
              {repo.kanjiTag}
            </span>
          </div>

          <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-300">
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
              <span>{repo.stars}</span>
            </span>
            {repo.forks > 0 && (
              <span className="flex items-center gap-1">
                <GitFork className="w-3 h-3" />
                <span>{repo.forks}</span>
              </span>
            )}
          </div>
        </div>

        {/* Project Title */}
        <div className="mt-3.5">
          <h3 className="text-xl font-black text-navy-900 dark:text-white group-hover:text-electric-blue dark:group-hover:text-electric-cyan transition-colors tracking-tight line-clamp-1">
            {repo.name}
          </h3>
          <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
            {repo.description}
          </p>
        </div>
      </div>

      {/* Manga Panel Thumbnail / System Architecture Indicator */}
      <div className="my-3 py-2 px-3 rounded bg-navy-50/70 dark:bg-navy-900/70 border border-navy-900/10 dark:border-electric-cyan/20 font-mono text-[10px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Cpu className="w-3.5 h-3.5 text-electric-blue dark:text-electric-cyan" />
          <span>NODES: {repo.architectureGraph.nodes.length}</span>
        </div>
        <span className="text-electric-blue dark:text-electric-cyan font-bold">
          [INSPECT CASE FILE →]
        </span>
      </div>

      {/* Bottom Footer: Tech Stack Badges & Language Color Bar */}
      <div>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {repo.topics.slice(0, 3).map((topic, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded text-[10px] font-mono bg-navy-100/60 dark:bg-navy-900/80 text-navy-800 dark:text-slate-300 border border-navy-900/10 dark:border-electric-cyan/20"
            >
              #{topic}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2.5 border-t border-navy-900/10 dark:border-electric-cyan/20 font-mono text-[11px]">
          <div className="flex items-center gap-1.5 text-navy-900 dark:text-white font-semibold">
            <span
              className="w-2.5 h-2.5 rounded-full inline-block"
              style={{
                backgroundColor:
                  repo.languages[0]?.color || (primaryLang === 'Rust' ? '#DEA584' : '#1E6BFF'),
              }}
            />
            <span>{primaryLang}</span>
          </div>

          <span className="text-slate-400 dark:text-slate-500 text-[10px]">
            {new Date(repo.lastPushed).toLocaleDateString(undefined, {
              month: 'short',
              year: 'numeric',
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
