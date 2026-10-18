'use client';

import React, { useEffect, useState } from 'react';
import { Search, LayoutGrid, Disc, SlidersHorizontal, RefreshCw } from 'lucide-react';
import { RepoProject } from '@/types/portfolio';
import { ProjectsRingView } from '@/components/projects/ProjectsRingView';
import { RepoCard } from '@/components/projects/RepoCard';
import { ProfessionalProjectCard } from '@/components/projects/ProfessionalProjectCard';
import { CommandPalette } from '@/components/projects/CommandPalette';
import { KanjiStamp } from '@/components/effects/KanjiStamp';
import { InteractiveProjectExplainer } from '@/components/projects/InteractiveProjectExplainer';
import { usePortfolioStore } from '@/lib/store';
import fallbackRepos from '@/data/repos.generated.json';
import { playAnimeSound } from '@/lib/audio';

export function ProjectsSection() {
  const [repos, setRepos] = useState<RepoProject[]>(fallbackRepos as unknown as RepoProject[]);
  const [explainerRepo, setExplainerRepo] = useState('disaster-alert-system');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);
  const { viewMode, setViewMode, setIsCommandPaletteOpen, selectedLanguage, setSelectedLanguage } =
    usePortfolioStore();

  const handleSyncGithub = async () => {
    setIsSyncing(true);
    setSyncStatus('SYNCING GITHUB...');
    playAnimeSound('blip');
    try {
      const res = await fetch('/api/repos?refresh=true');
      const data = await res.json();
      if (data.success && data.data && data.data.length > 0) {
        setRepos(data.data);
        setSyncStatus(`SYNCED (${data.data.length} REPOS)`);
        playAnimeSound('levelup');
      } else {
        setSyncStatus('SYNC COMPLETE');
      }
    } catch (e) {
      setSyncStatus('OFFLINE CACHE');
    } finally {
      setTimeout(() => {
        setIsSyncing(false);
        setSyncStatus(null);
      }, 3000);
    }
  };

  useEffect(() => {
    fetch('/api/repos')
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data && res.data.length > 0) {
          setRepos(res.data);
        }
      })
      .catch((err) => {
        console.warn('API /api/repos offline fallback active:', err);
      });
  }, []);

  // Filter languages
  const allLanguages = Array.from(new Set(repos.map((r) => r.primaryLanguage))).filter(Boolean);

  const filteredRepos = selectedLanguage
    ? repos.filter((r) => r.primaryLanguage.toLowerCase() === selectedLanguage.toLowerCase())
    : repos;

  return (
    <section
      id="projects"
      className="relative px-6 sm:px-12 lg:px-24 py-24 border-b border-navy-900/10 dark:border-electric-cyan/20 bg-white/70 dark:bg-black/30 backdrop-blur-sm"
    >
      <CommandPalette repos={repos} />

      {/* Section Header with Kanji Stamp */}
      <div className="flex flex-wrap items-baseline justify-between gap-4 mb-10 pb-4 border-b border-navy-900/10 dark:border-electric-cyan/20">
        <div>
          <div className="flex items-center gap-3 mb-2 font-mono text-xs">
            <span className="font-extrabold text-electric-blue dark:text-electric-cyan">
              01 PROJECTS
            </span>
            <span className="text-slate-400">// REPOSITORY CATALOG</span>
            <KanjiStamp kanji="作品" romaji="SAKUHIN" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-navy-900 dark:text-white tracking-tight">
            Systems & Infrastructure Codebase
          </h2>
        </div>

        {/* View Switcher & Search Action */}
        <div className="flex items-center gap-3">
          {/* Sync from GitHub Trigger */}
          <button
            onClick={handleSyncGithub}
            disabled={isSyncing}
            title="Automatically pull newly uploaded GitHub repositories"
            className="flex items-center gap-1.5 px-3 py-2 border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 rounded font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 transition-colors shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">{syncStatus || 'SYNC GITHUB'}</span>
          </button>

          {/* Cmd+K trigger */}
          <button
            onClick={() => {
              playAnimeSound('blip');
              setIsCommandPaletteOpen(true);
            }}
            className="flex items-center gap-2 px-3 py-2 border border-navy-900/20 dark:border-electric-cyan/40 bg-white dark:bg-navy-900 rounded font-mono text-xs text-slate-600 dark:text-slate-300 hover:border-electric-blue transition-colors shadow-sm"
          >
            <Search className="w-3.5 h-3.5 text-electric-blue dark:text-electric-cyan" />
            <span className="hidden sm:inline">Search Repos</span>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-navy-800 text-[10px] text-slate-500">
              ⌘K
            </kbd>
          </button>

          {/* Grid / Ring Toggle */}
          <div className="flex items-center border border-navy-900/20 dark:border-electric-cyan/40 rounded p-0.5 bg-navy-50 dark:bg-navy-950">
            <button
              onClick={() => {
                playAnimeSound('click');
                setViewMode('ring');
              }}
              title="3D Ring Carousel View"
              className={`p-1.5 rounded transition-colors ${
                viewMode === 'ring'
                  ? 'bg-electric-blue text-white shadow-sm'
                  : 'text-slate-500 hover:text-navy-900 dark:hover:text-white'
              }`}
            >
              <Disc className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                playAnimeSound('click');
                setViewMode('grid');
              }}
              title="Catalog Grid View"
              className={`p-1.5 rounded transition-colors ${
                viewMode === 'grid'
                  ? 'bg-electric-blue text-white shadow-sm'
                  : 'text-slate-500 hover:text-navy-900 dark:hover:text-white'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Language Filter Chips */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        <span className="font-mono text-[11px] text-slate-400 mr-2 flex items-center gap-1">
          <SlidersHorizontal className="w-3 h-3" />
          <span>FILTER:</span>
        </span>

        <button
          onClick={() => {
            playAnimeSound('blip');
            setSelectedLanguage(null);
          }}
          className={`px-3 py-1 rounded-full font-mono text-xs transition-colors ${
            selectedLanguage === null
              ? 'bg-navy-900 dark:bg-electric-cyan text-white dark:text-black font-bold'
              : 'border border-navy-900/10 dark:border-electric-cyan/30 text-slate-600 dark:text-slate-400 hover:bg-navy-50 dark:hover:bg-navy-900'
          }`}
        >
          ALL ({repos.length})
        </button>

        {allLanguages.map((lang) => (
          <button
            key={lang}
            onClick={() => {
              playAnimeSound('blip');
              setSelectedLanguage(selectedLanguage === lang ? null : lang);
            }}
            className={`px-3 py-1 rounded-full font-mono text-xs transition-colors ${
              selectedLanguage === lang
                ? 'bg-electric-blue text-white font-bold'
                : 'border border-navy-900/10 dark:border-electric-cyan/30 text-slate-600 dark:text-slate-400 hover:bg-navy-50 dark:hover:bg-navy-900'
            }`}
          >
            {lang} ({repos.filter((r) => r.primaryLanguage === lang).length})
          </button>
        ))}
      </div>

      {/* Render 3D Ring View OR Grid View */}
      {viewMode === 'ring' ? (
        <ProjectsRingView repos={filteredRepos} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRepos.map((repo) => (
            <ProfessionalProjectCard
              key={repo.id}
              repo={repo}
              onClick={() => {
                usePortfolioStore.getState().setSelectedRepo(repo);
              }}
            />
          ))}
        </div>
      )}

      {/* Interactive Project Animated Walkthrough Showcase */}
      <div className="mt-16 pt-12 border-t-2 border-navy-900/10 dark:border-electric-cyan/20">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-electric-blue dark:text-electric-cyan font-bold">
              <span>✦ ANIME MENTOR WALKTHROUGH</span>
              <span className="text-slate-400">// DEMON SLAYER &amp; NARUTO CHAKRA SYSTEMS</span>
            </div>
            <h3 className="text-2xl font-black text-navy-900 dark:text-white font-mono mt-1">
              Live Systems Simulator
            </h3>
          </div>

          {/* Quick project switcher pills */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            {['disaster-alert-system', 'MINION-S', 'trialsetu', 'ZenNews-', 'smt'].map((name) => (
              <button
                key={name}
                onClick={() => {
                  playAnimeSound('blip');
                  setExplainerRepo(name);
                }}
                className={`px-3 py-1.5 rounded border font-bold transition-all ${
                  explainerRepo === name
                    ? 'border-electric-blue dark:border-electric-cyan bg-electric-blue text-white shadow-electric'
                    : 'border-navy-900/15 dark:border-electric-cyan/30 bg-white dark:bg-navy-900 text-slate-600 dark:text-slate-300 hover:border-electric-blue'
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        <InteractiveProjectExplainer repoName={explainerRepo} />
      </div>
    </section>
  );
}
