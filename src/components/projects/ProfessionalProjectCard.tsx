'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Star, GitBranch, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { RepoProject } from '@/types/portfolio';

interface QuickCardProps {
  repo: RepoProject;
  onClick?: () => void;
}

export function ProfessionalProjectCard({ repo, onClick }: QuickCardProps) {
  // Extract high-clarity essentials
  const primaryLang = repo.primaryLanguage || 'JavaScript';
  const repoName = repo.name;
  const description =
    repo.description || 'Intelligent software system and robotics codebase.';

  // One-line "What it does" distillation
  const purposeSummary =
    repo.whatItDoes ||
    (repoName === 'disaster-alert-system'
      ? 'Processes real-time emergency signals & social media data using NLP to dispatch instant catastrophe alerts.'
      : repoName === 'ZenNews-'
      ? 'Aggregates multi-source verified global news into a calm, noise-free, and ad-free reading experience.'
      : repoName === 'trialsetu'
      ? 'Connects patients directly to verified clinical trials with automated criteria validation and secure matching.'
      : repoName === 'MINION-S'
      ? 'Autonomous robotic software architecture implementing sensor feedback and motion planning.'
      : 'Core software tool and data management pipeline.');

  // Key architecture features
  const techPills =
    repo.techStack && repo.techStack.length > 0
      ? repo.techStack.slice(0, 4)
      : [primaryLang, 'Full-Stack', 'APIs', 'Git'];

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className="group relative flex flex-col justify-between bg-[#0e1017] hover:bg-[#131620] border border-[#27272a] hover:border-zinc-400 rounded-xl p-6 text-white cursor-pointer shadow-lg transition-all"
    >
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#27272a] text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-zinc-400 font-semibold uppercase">{primaryLang}</span>
          </div>

          <div className="flex items-center gap-3 text-zinc-400">
            {repo.stars > 0 && (
              <span className="flex items-center gap-1 text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{repo.stars}</span>
              </span>
            )}
            <span className="px-2 py-0.5 rounded bg-[#181a20] border border-[#27272a] text-zinc-300 text-[11px]">
              PUBLIC REPO
            </span>
          </div>
        </div>

        {/* Title */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-xl font-bold font-mono text-white tracking-tight group-hover:text-emerald-400 transition-colors">
            {repoName}
          </h3>
          <ArrowUpRight className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors flex-shrink-0" />
        </div>

        {/* 1-second Instant Comprehension Summary */}
        <div className="bg-[#161822] border border-[#27272a] rounded-lg p-3 my-3">
          <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-semibold block mb-1">
            ⚡ What This Project Does (In a Nutshell):
          </span>
          <p className="text-xs text-zinc-200 leading-relaxed font-sans">
            {purposeSummary}
          </p>
        </div>

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-1.5 my-3">
          {techPills.map((tech, i) => (
            <span
              key={i}
              className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#181a22] border border-[#27272a] text-zinc-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer */}
      <div className="pt-3 mt-3 border-t border-[#27272a] flex items-center justify-between text-xs font-mono text-zinc-400">
        <span className="group-hover:text-zinc-200 transition-colors">Click for full architecture ➔</span>
        <a
          href={repo.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors"
        >
          <span>Source</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </motion.div>
  );
}
