'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  RotateCcw,
  Server,
  Database,
  Layers,
  Cpu,
  Globe,
  Radio,
  CheckCircle,
  HelpCircle,
  Clock,
} from 'lucide-react';
import { ArchitectureGraph, ArchNode } from '@/types/portfolio';
import { playAnimeSound } from '@/lib/audio';

interface AnimatedArchDiagramProps {
  graph: ArchitectureGraph;
  projectName?: string;
}

const NODE_ICONS: Record<string, React.ReactNode> = {
  client: <Globe className="w-4 h-4 text-electric-cyan" />,
  gateway: <Layers className="w-4 h-4 text-electric-blue" />,
  service: <Cpu className="w-4 h-4 text-emerald-400" />,
  db: <Database className="w-4 h-4 text-amber-400" />,
  cache: <Radio className="w-4 h-4 text-sakura-pink" />,
  queue: <Server className="w-4 h-4 text-purple-400" />,
  thirdparty: <HelpCircle className="w-4 h-4 text-indigo-400" />,
  cicd: <Server className="w-4 h-4 text-cyan-400" />,
};

export function AnimatedArchDiagram({ graph, projectName = 'System' }: AnimatedArchDiagramProps) {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hoveredNode, setHoveredNode] = useState<ArchNode | null>(null);

  const nodes = graph.nodes;
  const edges = graph.edges;

  const playSimulation = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    setActiveStep(0);
    playAnimeSound('blip');

    const totalSteps = edges.length;
    let current = 0;

    const interval = setInterval(() => {
      current += 1;
      if (current >= totalSteps) {
        clearInterval(interval);
        setTimeout(() => {
          setIsPlaying(false);
          setActiveStep(null);
          playAnimeSound('levelup');
        }, 1200);
      } else {
        setActiveStep(current);
        playAnimeSound('blip');
      }
    }, 1100);
  };

  return (
    <div className="relative w-full border-2 border-navy-900 dark:border-electric-cyan bg-slate-50 dark:bg-navy-950 p-6 rounded-md shadow-manga dark:shadow-manga-dark overflow-hidden select-none">
      {/* Tactical diagram title and play trigger */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-navy-900/10 dark:border-electric-cyan/20 font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-electric-blue animate-ping" />
          <span className="font-bold text-navy-900 dark:text-white">
            TOPOLOGY: {projectName.toUpperCase()}
          </span>
          <span className="text-slate-400">// FIG. ARCH-01</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={playSimulation}
            disabled={isPlaying}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded font-bold font-mono text-xs transition-all ${
              isPlaying
                ? 'bg-amber-500 text-black'
                : 'bg-electric-blue hover:bg-blue-600 text-white shadow-sm'
            }`}
          >
            {isPlaying ? (
              <>
                <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                <span>SIMULATING PACKET ({activeStep! + 1}/{edges.length})...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>PLAY REQUEST TRACE →</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* SVG Canvas for System Graph */}
      <div className="relative w-full min-h-[300px] flex items-center justify-center p-4">
        {/* Nodes Grid */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-6 relative z-10">
          {nodes.map((node, index) => {
            const isTargetOfActiveEdge =
              activeStep !== null &&
              edges[activeStep] &&
              (edges[activeStep].to === node.id || edges[activeStep].from === node.id);

            return (
              <div
                key={node.id}
                onMouseEnter={() => setHoveredNode(node)}
                onMouseLeave={() => setHoveredNode(null)}
                className={`relative flex flex-col p-4 rounded border-2 transition-all duration-300 cursor-pointer ${
                  isTargetOfActiveEdge
                    ? 'border-electric-blue dark:border-electric-cyan bg-electric-blue/10 dark:bg-electric-cyan/20 scale-105 shadow-electric'
                    : 'border-navy-900 dark:border-navy-800 bg-white dark:bg-navy-900 hover:border-electric-blue'
                }`}
              >
                <div className="flex items-center justify-between mb-2 font-mono text-[10px]">
                  <span className="flex items-center gap-1.5 font-bold text-navy-900 dark:text-slate-200">
                    {NODE_ICONS[node.type] || <Cpu className="w-3.5 h-3.5" />}
                    <span className="uppercase">{node.type}</span>
                  </span>
                  <span className="text-slate-400">#{index + 1}</span>
                </div>

                <h4 className="font-bold text-sm text-navy-900 dark:text-white mb-1">
                  {node.label}
                </h4>

                <p className="font-mono text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                  {node.tradeoff || 'Optimized throughput module'}
                </p>

                {/* Packet ping indicator */}
                {isTargetOfActiveEdge && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-electric-cyan opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-electric-blue"></span>
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Dynamic Request Trace Step Readout */}
      <AnimatePresence mode="wait">
        {activeStep !== null && edges[activeStep] && (
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-6 p-4 rounded bg-white dark:bg-navy-900 border border-electric-blue/40 dark:border-electric-cyan/50 flex flex-wrap items-center justify-between gap-4 font-mono text-xs"
          >
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 rounded bg-electric-blue text-white font-bold text-[10px]">
                HOP 0{activeStep + 1}
              </span>
              <span className="text-navy-900 dark:text-white font-semibold">
                {edges[activeStep].from} → {edges[activeStep].to}
              </span>
              <span className="text-slate-500 dark:text-slate-400">
                ({edges[activeStep].label || 'Dispatched event'})
              </span>
            </div>

            <div className="flex items-center gap-4 text-electric-blue dark:text-electric-cyan font-bold text-[11px]">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>LATENCY: ~{(0.4 + activeStep * 0.3).toFixed(1)}ms</span>
              </span>
              <span className="px-1.5 py-0.5 rounded bg-navy-100 dark:bg-navy-800 text-[10px]">
                {edges[activeStep].protocol || 'TCP'}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hovered Node Trade-off Explanation Modal Bar */}
      {hoveredNode && (
        <div className="mt-4 p-3 bg-navy-900 text-white rounded font-mono text-xs flex items-center justify-between border-l-4 border-electric-cyan">
          <div>
            <span className="text-electric-cyan font-bold">TRADE-OFF ANALYSIS [{hoveredNode.label}]: </span>
            <span>{hoveredNode.tradeoff}</span>
          </div>
        </div>
      )}
    </div>
  );
}
