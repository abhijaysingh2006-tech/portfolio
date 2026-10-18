'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, FolderGit2, Terminal, ArrowRight } from 'lucide-react';
import { usePortfolioStore } from '@/lib/store';
import { RepoProject } from '@/types/portfolio';
import { playAnimeSound } from '@/lib/audio';

interface CommandPaletteProps {
  repos: RepoProject[];
}

export function CommandPalette({ repos }: CommandPaletteProps) {
  const { isCommandPaletteOpen, setIsCommandPaletteOpen, setSelectedRepo } = usePortfolioStore();
  const [query, setQuery] = useState('');

  // Keyboard shortcut listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        playAnimeSound('blip');
        setIsCommandPaletteOpen(!isCommandPaletteOpen);
      }
      if (e.key === 'Escape' && isCommandPaletteOpen) {
        setIsCommandPaletteOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, setIsCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const filtered = repos.filter((r) => {
    const q = query.toLowerCase();
    return (
      r.name.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      r.primaryLanguage.toLowerCase().includes(q) ||
      r.topics.some((t) => t.toLowerCase().includes(q))
    );
  });

  const selectItem = (repo: RepoProject) => {
    playAnimeSound('open');
    setSelectedRepo(repo);
    setIsCommandPaletteOpen(false);
    setQuery('');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-navy-950/70 backdrop-blur-sm select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          className="relative w-full max-w-2xl rounded-lg border-2 border-navy-900 dark:border-electric-cyan bg-white dark:bg-[#070B14] shadow-2xl overflow-hidden font-mono"
        >
          {/* Search Input Bar */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-navy-900/15 dark:border-electric-cyan/30">
            <Search className="w-5 h-5 text-electric-blue dark:text-electric-cyan" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Fuzzy search systems, protocols, algorithms, tags..."
              className="w-full bg-transparent text-sm text-navy-900 dark:text-white placeholder-slate-400 focus:outline-none"
            />
            <button
              onClick={() => setIsCommandPaletteOpen(false)}
              className="p-1 rounded text-slate-400 hover:text-navy-900 dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Results List */}
          <div className="max-h-80 overflow-y-auto p-3 space-y-1">
            {filtered.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400">
                NO REPOSITORY MATCHING &quot;{query}&quot;
              </div>
            ) : (
              filtered.map((repo) => (
                <div
                  key={repo.id}
                  onClick={() => selectItem(repo)}
                  className="flex items-center justify-between p-3 rounded hover:bg-electric-blue/10 dark:hover:bg-electric-cyan/15 cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-electric-blue dark:text-electric-cyan">
                      {repo.id}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-navy-900 dark:text-white group-hover:text-electric-blue dark:group-hover:text-electric-cyan">
                        {repo.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 line-clamp-1">
                        {repo.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span>{repo.primaryLanguage}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-electric-blue opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Shortcuts */}
          <div className="flex items-center justify-between px-5 py-2.5 bg-navy-50 dark:bg-navy-950/80 border-t border-navy-900/10 dark:border-electric-cyan/20 text-[10px] text-slate-500">
            <span>[ESC] TO CLOSE</span>
            <span>PRESS [ENTER] TO OPEN CASE FILE</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
