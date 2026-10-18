'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ExternalLink,
  Github,
  CheckCircle2,
  AlertTriangle,
  Award,
  Layers,
  Code2,
  FileText,
  Calendar,
  Sparkles,
  GitCommit,
} from 'lucide-react';
import { usePortfolioStore } from '@/lib/store';
import { AnimatedArchDiagram } from '@/components/architecture/AnimatedArchDiagram';
import { InteractiveProjectExplainer } from '@/components/projects/InteractiveProjectExplainer';
import { playAnimeSound } from '@/lib/audio';

type TabKey = 'simulation' | 'overview' | 'learnings' | 'architecture' | 'stack' | 'code';

export function RepoCaseFileModal() {
  const { selectedRepo, setSelectedRepo } = usePortfolioStore();
  const [activeTab, setActiveTab] = useState<TabKey>('simulation');

  if (!selectedRepo) return null;

  const handleClose = () => {
    playAnimeSound('close');
    setSelectedRepo(null);
  };

  const handleTabChange = (tab: TabKey) => {
    playAnimeSound('click');
    setActiveTab(tab);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 overflow-y-auto bg-navy-950/80 backdrop-blur-md select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 280 }}
          className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-lg border-2 border-navy-900 dark:border-electric-cyan bg-white dark:bg-[#070B14] shadow-2xl overflow-hidden"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b-2 border-navy-900 dark:border-electric-cyan bg-navy-50/80 dark:bg-navy-950">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded bg-electric-blue text-white font-mono font-extrabold text-xs shadow-sm">
                {selectedRepo.id}
              </span>
              <div>
                <h2 className="text-xl font-black text-navy-900 dark:text-white font-mono flex items-center gap-2">
                  <span>{selectedRepo.name}</span>
                  <span className="text-sm font-normal text-slate-500">// CASE FILE</span>
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={selectedRepo.url}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-navy-900/20 dark:border-electric-cyan/40 font-mono text-xs text-navy-900 dark:text-electric-cyan hover:bg-electric-blue hover:text-white transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GITHUB REPO</span>
              </a>

              {selectedRepo.homepage && (
                <a
                  href={selectedRepo.homepage}
                  target="_blank"
                  rel="noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-electric-blue text-white font-mono text-xs hover:bg-blue-600 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>LIVE DEMO</span>
                </a>
              )}

              <button
                onClick={handleClose}
                aria-label="Close Case File"
                className="p-1.5 rounded border border-navy-900 dark:border-electric-cyan text-navy-900 dark:text-electric-cyan hover:bg-rose-500 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs Bar */}
          <div className="flex overflow-x-auto border-b border-navy-900/10 dark:border-electric-cyan/20 bg-white dark:bg-navy-900/50 px-6 font-mono text-xs scrollbar-none">
            {[
              { key: 'simulation', label: '00 ANIMATED WALKTHROUGH', icon: Sparkles },
              { key: 'overview', label: '01 OVERVIEW', icon: FileText },
              { key: 'learnings', label: '02 WHAT I LEARNED', icon: Award },
              { key: 'architecture', label: '03 ARCHITECTURE', icon: Layers },
              { key: 'stack', label: '04 TECH STACK & TIMELINE', icon: Calendar },
              { key: 'code', label: '05 CODE HIGHLIGHTS', icon: Code2 },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => handleTabChange(key as TabKey)}
                className={`flex items-center gap-2 py-3 px-4 border-b-2 font-bold whitespace-nowrap transition-colors ${
                  activeTab === key
                    ? 'border-electric-blue dark:border-electric-cyan text-electric-blue dark:text-electric-cyan bg-electric-blue/5'
                    : 'border-transparent text-slate-500 hover:text-navy-900 dark:hover:text-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>

          {/* Modal Content Body */}
          <div className="p-6 sm:p-8 overflow-y-auto max-h-[calc(92vh-130px)] space-y-6">
            {/* TAB 0: ANIMATED WALKTHROUGH */}
            {activeTab === 'simulation' && (
              <InteractiveProjectExplainer repoName={selectedRepo.name} />
            )}
            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-mono text-xs text-electric-blue dark:text-electric-cyan font-bold tracking-widest uppercase mb-2">
                    // MISSION & PURPOSE
                  </h3>
                  <p className="text-base text-slate-800 dark:text-slate-200 leading-relaxed font-sans">
                    {selectedRepo.whatItDoes}
                  </p>
                </div>

                {/* Challenges Section */}
                <div className="border border-navy-900/15 dark:border-electric-cyan/30 rounded-md p-5 bg-navy-50/40 dark:bg-navy-950/40">
                  <h4 className="font-mono text-xs font-bold text-navy-900 dark:text-white flex items-center gap-2 mb-3">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    <span>ENGINEERING CHALLENGES & RESOLUTIONS</span>
                  </h4>
                  <ul className="space-y-2.5">
                    {selectedRepo.challenges.map((c, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                        <span className="text-electric-blue dark:text-electric-cyan font-mono font-bold mt-0.5">
                          [#{i + 1}]
                        </span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* TAB 2: WHAT I LEARNED WITH XP BARS */}
            {activeTab === 'learnings' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-2 border-b border-navy-900/10 dark:border-electric-cyan/20">
                  <span className="font-mono text-xs text-electric-blue dark:text-electric-cyan font-bold">
                    SYSTEMS SKILL EXP GAINED // MASTERY RECORD
                  </span>
                  <span className="font-mono text-xs text-slate-400">RPG LEVEL-UP LOG</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedRepo.whatILearned.map((skill, idx) => (
                    <div
                      key={idx}
                      className="p-5 border-2 border-navy-900 dark:border-electric-cyan/40 bg-white dark:bg-navy-900/60 rounded shadow-sm flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-sm text-navy-900 dark:text-white flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-electric-blue dark:text-electric-cyan" />
                            {skill.name}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-electric-blue/15 text-electric-blue dark:text-electric-cyan border border-electric-blue/30">
                            {skill.level}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                          {skill.description}
                        </p>
                      </div>

                      {/* XP Progress Bar */}
                      <div>
                        <div className="flex justify-between font-mono text-[10px] text-slate-500 mb-1">
                          <span>XP MASTERY</span>
                          <span className="font-bold text-electric-blue dark:text-electric-cyan">{skill.xp} / 100 XP</span>
                        </div>
                        <div className="w-full h-2 bg-slate-200 dark:bg-navy-950 rounded-full overflow-hidden border border-navy-900/20 dark:border-electric-cyan/30">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.xp}%` }}
                            transition={{ duration: 0.8, delay: idx * 0.1 }}
                            className="h-full bg-gradient-to-r from-electric-blue to-electric-cyan"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: ARCHITECTURE */}
            {activeTab === 'architecture' && (
              <div>
                <AnimatedArchDiagram
                  graph={selectedRepo.architectureGraph}
                  projectName={selectedRepo.name}
                />
              </div>
            )}

            {/* TAB 4: TECH STACK & TIMELINE */}
            {activeTab === 'stack' && (
              <div className="space-y-6">
                <div>
                  <h4 className="font-mono text-xs font-bold text-slate-500 uppercase mb-3">
                    DEPLOYED STACK & PROTOCOLS
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedRepo.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded border border-navy-900 dark:border-electric-cyan bg-white dark:bg-navy-900 font-mono text-xs text-navy-900 dark:text-white font-bold shadow-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border border-navy-900/10 dark:border-electric-cyan/20 p-5 rounded bg-navy-50/50 dark:bg-navy-950/50 font-mono text-xs space-y-3">
                  <div className="flex items-center gap-2 font-bold text-navy-900 dark:text-white">
                    <GitCommit className="w-4 h-4 text-electric-blue dark:text-electric-cyan" />
                    <span>GIT METRICS & REPOSITORY ANCHOR</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-slate-600 dark:text-slate-300">
                    <div>
                      <span className="text-[10px] text-slate-400 block">INITIALIZED</span>
                      <strong>{new Date(selectedRepo.createdAt).toLocaleDateString()}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">LAST COMMIT</span>
                      <strong>{new Date(selectedRepo.lastPushed).toLocaleDateString()}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">STARS</span>
                      <strong>★ {selectedRepo.stars}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">FORKS</span>
                      <strong>⑂ {selectedRepo.forks}</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: CODE HIGHLIGHTS */}
            {activeTab === 'code' && (
              <div className="space-y-6">
                {selectedRepo.codeHighlights.map((snippet, idx) => (
                  <div
                    key={idx}
                    className="border-2 border-navy-900 dark:border-electric-cyan rounded-md overflow-hidden bg-navy-950 text-slate-200"
                  >
                    <div className="flex items-center justify-between px-4 py-2 bg-navy-900 border-b border-navy-800 font-mono text-xs text-electric-cyan">
                      <span>{snippet.filename}</span>
                      <span className="uppercase text-[10px] text-slate-400">{snippet.language}</span>
                    </div>
                    <pre className="p-4 overflow-x-auto text-xs font-mono leading-relaxed bg-[#060A12] text-slate-100">
                      <code>{snippet.code}</code>
                    </pre>
                    <div className="p-3 bg-navy-900/90 text-xs font-mono text-slate-300 border-t border-navy-800 flex items-center gap-2">
                      <span className="text-electric-cyan">✦ RATIONALE:</span>
                      <span>{snippet.explanation}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
