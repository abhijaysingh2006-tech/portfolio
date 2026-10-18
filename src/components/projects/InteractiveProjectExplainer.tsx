'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  RotateCcw,
  Sparkles,
  Zap,
  Radio,
  Cpu,
  ShieldCheck,
  Activity,
  Layers,
  ArrowRight,
  Flame,
  CheckCircle2,
} from 'lucide-react';
import { AnimeCharacter, AnimeCharacterType } from '@/components/anime/AnimeCharacters';
import { playAnimeSound } from '@/lib/audio';

interface Step {
  title: string;
  desc: string;
  metric: string;
  animeChakra: string;
}

interface ProjectSimulationConfig {
  repoName: string;
  character: AnimeCharacterType;
  mentorQuote: string;
  steps: Step[];
  renderVisual: (activeStep: number) => React.ReactNode;
}

export function InteractiveProjectExplainer({ repoName }: { repoName: string }) {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Define tailored animation & walkthrough per project
  const getSimulationConfig = (): ProjectSimulationConfig => {
    if (repoName.toLowerCase().includes('disaster')) {
      return {
        repoName: 'disaster-alert-system',
        character: 'tanjiro',
        mentorQuote:
          '“Total Concentration: Water Breathing! The NLP model parses distress signals in under 15ms and warns communities before disaster strikes!”',
        steps: [
          {
            title: '01. CRISIS TELEMETRY INGRESS',
            desc: 'Ingests raw multi-channel social streams and sensor alerts during earthquakes, floods, or storms.',
            metric: 'INGESTION: 12,500 signals/min',
            animeChakra: 'Water Surface Slice',
          },
          {
            title: '02. NLP URGENCY & SENTIMENT AI',
            desc: 'Transformer inference evaluates distress sentiment, validates sincerity (>0.85 score), and extracts geo-entities.',
            metric: 'INFERENCE: 12ms latency',
            animeChakra: 'Hinokami Flame Detection',
          },
          {
            title: '03. GEOSPATIAL RADAR PINPOINT',
            desc: 'PostGIS spatial bounding boxes correlate hazards with nearby population clusters within meters.',
            metric: 'GEO ACCURACY: ±2.4 meters',
            animeChakra: 'Radial Shockwave Field',
          },
          {
            title: '04. EMERGENCY WEBSOCKET BROADCAST',
            desc: 'Sub-second real-time push to first responders and citizens via persistent WebSocket pipelines.',
            metric: 'FAN-OUT: 99.98% delivery rate',
            animeChakra: 'Clear Blue Sky Flash',
          },
        ],
        renderVisual: (step) => (
          <div className="relative w-full h-56 rounded-md bg-navy-950 border border-electric-cyan/40 p-4 flex flex-col justify-between overflow-hidden">
            {/* Live radar background rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
              <motion.div
                animate={{ scale: [0.8, 1.4, 0.8], opacity: [0.8, 0.2, 0.8] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
                className="w-48 h-48 rounded-full border-2 border-electric-cyan"
              />
              <motion.div
                animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0.1, 0.6] }}
                transition={{ repeat: Infinity, duration: 2.5, delay: 0.4 }}
                className="w-48 h-48 rounded-full border border-rose-500"
              />
            </div>

            {/* Step animation elements */}
            <div className="flex items-center justify-between text-xs font-mono text-electric-cyan z-10">
              <span className="flex items-center gap-1.5 font-bold">
                <Radio className="w-4 h-4 text-rose-500 animate-ping" />
                <span>EPICENTER MONITOR // BANGALORE HUB</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/40">
                DEFCON 1 ACTIVE
              </span>
            </div>

            {/* Dynamic Stage Graphics */}
            <div className="relative z-10 flex items-center justify-around my-2">
              <motion.div
                animate={step >= 0 ? { scale: [1, 1.08, 1] } : {}}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className={`p-3 rounded border text-center font-mono text-[11px] ${
                  step === 0
                    ? 'border-electric-cyan bg-electric-cyan/20 text-white shadow-electric'
                    : 'border-slate-800 bg-navy-900/60 text-slate-400'
                }`}
              >
                <div className="text-sm font-black">TWITTER/SENSORS</div>
                <div className="text-[10px] text-electric-cyan mt-1">&quot;Bridge flooded! SOS&quot;</div>
              </motion.div>

              <ArrowRight className="w-5 h-5 text-electric-cyan" />

              <motion.div
                animate={step >= 1 ? { scale: [1, 1.1, 1] } : {}}
                transition={{ repeat: Infinity, duration: 1.2 }}
                className={`p-3 rounded border text-center font-mono text-[11px] ${
                  step === 1
                    ? 'border-amber-400 bg-amber-400/20 text-white shadow-lg'
                    : 'border-slate-800 bg-navy-900/60 text-slate-400'
                }`}
              >
                <div className="text-sm font-black text-amber-400">NLP MODEL</div>
                <div className="text-[10px] text-slate-300 mt-1">CONFIDENCE: 94.2%</div>
              </motion.div>

              <ArrowRight className="w-5 h-5 text-electric-cyan" />

              <motion.div
                animate={step >= 3 ? { scale: [1, 1.12, 1] } : {}}
                transition={{ repeat: Infinity, duration: 0.9 }}
                className={`p-3 rounded border text-center font-mono text-[11px] ${
                  step === 3
                    ? 'border-emerald-400 bg-emerald-400/20 text-white shadow-lg'
                    : 'border-slate-800 bg-navy-900/60 text-slate-400'
                }`}
              >
                <div className="text-sm font-black text-emerald-400">DISPATCH ALERTS</div>
                <div className="text-[10px] text-emerald-300 mt-1">10,000+ Sockets Notified</div>
              </motion.div>
            </div>

            <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 z-10 border-t border-slate-800/80 pt-2">
              <span>LATENCY: 14.8ms</span>
              <span className="text-electric-cyan">GEOJSON: [12.9716° N, 77.5946° E]</span>
            </div>
          </div>
        ),
      };
    }

    if (repoName.toLowerCase().includes('minion')) {
      return {
        repoName: 'MINION-S',
        character: 'naruto',
        mentorQuote:
          '“Kage Bunshin no Jutsu! All autonomous robot clones coordinate their state machines without a single collision or dead-lock!”',
        steps: [
          {
            title: '01. MULTI-AGENT CLONE SWARM',
            desc: 'Autonomous agent nodes initialize with decoupled roles: Scout, Compute, and Actuator.',
            metric: 'SWARM: 8 synchronized agents',
            animeChakra: 'Shadow Clone Jutsu Formation',
          },
          {
            title: '02. SENSOR FEEDBACK TELEMETRY',
            desc: 'IMU, LiDAR distance rays, and camera packets stream into a shared lock-free memory ring.',
            metric: 'TELEMETRY: 250 packets/sec',
            animeChakra: 'Byakugan Sensory Field',
          },
          {
            title: '03. KINEMATIC STATE MACHINE GUARD',
            desc: 'Verifies motion constraints and battery reserves to prevent physical robot collisions.',
            metric: 'SAFETY INVARIANTS: 100% verified',
            animeChakra: 'Sage Mode Invariant Barrier',
          },
          {
            title: '04. PHYSICAL ACTUATOR TORQUE DRIVE',
            desc: 'Dispatches pulse-width modulation (PWM) motor commands with microsecond precision.',
            metric: 'MOTOR JITTER: < 0.2ms',
            animeChakra: 'Rasengan Rotary Drive',
          },
        ],
        renderVisual: (step) => (
          <div className="relative w-full h-56 rounded-md bg-navy-950 border border-electric-cyan/40 p-4 flex flex-col justify-between overflow-hidden">
            {/* Autonomous Grid Field */}
            <div className="flex items-center justify-between text-xs font-mono text-electric-cyan z-10">
              <span className="flex items-center gap-1.5 font-bold">
                <Cpu className="w-4 h-4 text-amber-400" />
                <span>ROBOTICS FLEET COORDINATOR</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/40">
                ACTIVE SWARM
              </span>
            </div>

            {/* Dynamic Swarm Nodes */}
            <div className="grid grid-cols-3 gap-3 my-2 z-10">
              {[
                { name: 'AGENT-01 (SCOUT)', role: 'LIDAR Scanning', color: '#38D6FF' },
                { name: 'AGENT-02 (PLANNER)', role: 'A* Pathfinding', color: '#FACC15' },
                { name: 'AGENT-03 (ACTUATOR)', role: 'Servo Motors', color: '#10B981' },
              ].map((agent, i) => (
                <motion.div
                  key={agent.name}
                  animate={step >= i ? { scale: [1, 1.05, 1], y: [0, -3, 0] } : {}}
                  transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
                  className={`p-3 rounded border text-left font-mono text-xs ${
                    step >= i
                      ? 'border-electric-cyan bg-electric-cyan/15 text-white shadow-electric'
                      : 'border-slate-800 bg-navy-900/60 text-slate-400'
                  }`}
                >
                  <div className="text-[11px] font-bold" style={{ color: agent.color }}>
                    {agent.name}
                  </div>
                  <div className="text-[10px] text-slate-300 mt-1">{agent.role}</div>
                  <div className="text-[9px] text-emerald-400 mt-1">● STATE: NOMINAL</div>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 z-10 border-t border-slate-800/80 pt-2">
              <span>MQTT QoS 1 / Micro-ROS</span>
              <span className="text-amber-400">KINEMATICS: 6-DOF ARM CALIBRATED</span>
            </div>
          </div>
        ),
      };
    }

    if (repoName.toLowerCase().includes('trialsetu')) {
      return {
        repoName: 'trialsetu',
        character: 'sasuke',
        mentorQuote:
          '“With the Sharingan, every medical inclusion and exclusion invariant is perceived and strictly checked without human error.”',
        steps: [
          {
            title: '01. PARTICIPANT INTAKE GATEWAY',
            desc: 'Securely collects candidate health profile and bio-markers via encrypted Next.js API.',
            metric: 'DATA PRIVACY: Zero health data leaks',
            animeChakra: 'Curse Seal Encryption Layer',
          },
          {
            title: '02. ALGEBRAIC CRITERIA EVALUATION',
            desc: 'TypeScript rule engines test complex inclusion conditions against strict exclusion rules.',
            metric: 'CHECK TIME: 1.8ms per trial',
            animeChakra: 'Sharingan Predictive Analysis',
          },
          {
            title: '03. IMMUTABLE CONSENT AUDIT LOG',
            desc: 'Generates non-repudiable audit logs guaranteeing regulatory compliance.',
            metric: 'AUDIT: 100% compliant',
            animeChakra: 'Chibaku Tensei Immutable Seal',
          },
          {
            title: '04. CLINICAL TRIAL MATCH COMMIT',
            desc: 'Pairs approved candidate with hospital trial lead and establishes secure communications.',
            metric: 'ENROLLMENT: Seamless hand-off',
            animeChakra: 'Susanoo Protective Shield',
          },
        ],
        renderVisual: (step) => (
          <div className="relative w-full h-56 rounded-md bg-navy-950 border border-purple-500/40 p-4 flex flex-col justify-between overflow-hidden">
            <div className="flex items-center justify-between text-xs font-mono text-purple-300 z-10">
              <span className="flex items-center gap-1.5 font-bold">
                <ShieldCheck className="w-4 h-4 text-purple-400" />
                <span>CLINICAL TRIAL INVARIANT ENGINE</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40">
                AUDIT VERIFIED
              </span>
            </div>

            <div className="relative z-10 flex items-center justify-around my-2">
              <div
                className={`p-3 rounded border font-mono text-xs ${
                  step >= 0 ? 'border-purple-400 bg-purple-900/30 text-white' : 'border-slate-800'
                }`}
              >
                <div className="font-bold">PATIENT VITALS</div>
                <div className="text-[10px] text-slate-300 mt-1">Age, Blood, History</div>
              </div>

              <div className="font-mono text-xs text-purple-400 font-bold">
                {step >= 1 ? '✓ INVARIANTS PASS' : '...SCANNING...'}
              </div>

              <div
                className={`p-3 rounded border font-mono text-xs ${
                  step >= 3
                    ? 'border-emerald-400 bg-emerald-950/40 text-emerald-300 shadow-lg'
                    : 'border-slate-800 text-slate-500'
                }`}
              >
                <div className="font-bold">TRIAL ALLOCATION</div>
                <div className="text-[10px] mt-1">MATCH CONFIRMED</div>
              </div>
            </div>

            <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 z-10 border-t border-slate-800/80 pt-2">
              <span>TYPESCRIPT ZOD STRICT VALIDATOR</span>
              <span className="text-purple-300">RBAC ACCESS: DOCTORS ONLY</span>
            </div>
          </div>
        ),
      };
    }

    if (repoName.toLowerCase().includes('zennews')) {
      return {
        repoName: 'ZenNews-',
        character: 'zenitsu',
        mentorQuote:
          '“Thunder Breathing First Form: Thunderclap and Flash! Slicing through clickbait and noisy ads in a single lightning strike!”',
        steps: [
          {
            title: '01. GLOBAL WIRE FEED INGESTION',
            desc: 'Polls worldwide syndication streams (Reuters, AP, BBC) simultaneously.',
            metric: 'FEEDS: 40+ global sources',
            animeChakra: 'Gathering Static Energy',
          },
          {
            title: '02. THUNDER BREATHING AD SLICE',
            desc: 'Heuristic text filters eliminate ads, intrusive tracking scripts, and sensationalist clickbait.',
            metric: 'CLEANSE: 100% ad-free text',
            animeChakra: 'Thunderclap & Flash Slash',
          },
          {
            title: '03. DUAL-COLUMN REORGANIZATION',
            desc: 'Separates major geopolitical headlines into the World column and local updates into Regional.',
            metric: 'LAYOUT: Zero distraction UI',
            animeChakra: 'Twin Lightning Current',
          },
          {
            title: '04. ZEN CALM READING EXPERIENCE',
            desc: 'Renders instantly with offline caching and serene editorial typography.',
            metric: 'LOAD SPEED: 0.2s instant paint',
            animeChakra: 'Quiet Thunder Peace',
          },
        ],
        renderVisual: (step) => (
          <div className="relative w-full h-56 rounded-md bg-navy-950 border border-yellow-400/40 p-4 flex flex-col justify-between overflow-hidden">
            <div className="flex items-center justify-between text-xs font-mono text-yellow-300 z-10">
              <span className="flex items-center gap-1.5 font-bold">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span>ZEN FILTER PIPELINE</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-yellow-400/20 text-yellow-300 border border-yellow-400/40">
                ADS ELIMINATED: 100%
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 my-2 z-10 font-mono text-xs">
              <div className="p-3 rounded border border-yellow-400/30 bg-yellow-400/10 text-white">
                <div className="text-[11px] font-bold text-yellow-300 mb-1">WORLD COLUMN</div>
                <div className="text-[10px] text-slate-300">Verified Global Wire Events</div>
              </div>
              <div className="p-3 rounded border border-cyan-400/30 bg-cyan-400/10 text-white">
                <div className="text-[11px] font-bold text-cyan-300 mb-1">REGIONAL COLUMN</div>
                <div className="text-[10px] text-slate-300">Local Verified Headlines</div>
              </div>
            </div>

            <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 z-10 border-t border-slate-800/80 pt-2">
              <span>ZERO INTRUSIVE TRACKERS</span>
              <span className="text-yellow-300">OFFLINE READY: INDEXEDDB</span>
            </div>
          </div>
        ),
      };
    }

    // Default: smt / Smart Monitoring
    return {
      repoName: 'smt',
      character: 'naruto',
      mentorQuote:
        '“Like Sage Mode feeling the natural chakra of all surroundings, this dashboard monitors every system pulse with zero bloat!”',
      steps: [
        {
          title: '01. HEARTBEAT INGRESS',
          desc: 'Lightweight periodic pulse checking server and client operational vital signs.',
          metric: 'INTERVAL: 500ms heartbeat',
          animeChakra: 'Natural Chakra Pulse',
        },
        {
          title: '02. ZERO-DEPENDENCY EVALUATION',
          desc: 'Native browser APIs compute event loop latency without heavy framework runtime overhead.',
          metric: 'BUNDLE: 0kb extra weight',
          animeChakra: 'Pure Taijutsu Direct Flow',
        },
        {
          title: '03. OSCILLOSCOPE GAUGE TELEMETRY',
          desc: 'Renders smooth 60fps canvas diagnostics of system status.',
          metric: 'FPS: Solid 60-120fps',
          animeChakra: 'Rasenshuriken High Frequency',
        },
        {
          title: '04. ANOMALY QUARANTINE',
          desc: 'Instantly alerts operators when error rates exceed safe thresholds.',
          metric: 'RESPONSE: Sub-millisecond notice',
          animeChakra: 'Nine-Tails Sensor Reflex',
        },
      ],
      renderVisual: (step) => (
        <div className="relative w-full h-56 rounded-md bg-navy-950 border border-electric-cyan/40 p-4 flex flex-col justify-between overflow-hidden">
          <div className="flex items-center justify-between text-xs font-mono text-electric-cyan z-10">
            <span className="flex items-center gap-1.5 font-bold">
              <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>SMT ZERO-DEPENDENCY TELEMETRY</span>
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-400/20 text-emerald-300 border border-emerald-400/40">
              HEALTH: 100%
            </span>
          </div>

          <div className="flex items-center justify-center my-4 z-10">
            <div className="w-48 h-12 flex items-center gap-1">
              {[40, 60, 30, 80, 50, 90, 70, 45, 85, 95, 60].map((h, i) => (
                <motion.div
                  key={i}
                  animate={{ height: [`${h * 0.3}%`, `${h}%`, `${h * 0.5}%`] }}
                  transition={{ repeat: Infinity, duration: 1, delay: i * 0.08 }}
                  className="w-3 rounded-t bg-gradient-to-t from-electric-blue to-electric-cyan"
                />
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 z-10 border-t border-slate-800/80 pt-2">
            <span>ZERO EXTERNAL DEPENDENCIES</span>
            <span className="text-emerald-400">STATUS: ALL CORES RUNNING</span>
          </div>
        </div>
      ),
    };
  };

  const config = getSimulationConfig();

  // Play step-by-step automatic walkthrough
  const playWalkthrough = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    setActiveStep(0);
    playAnimeSound('blip');

    const total = config.steps.length;
    let curr = 0;

    const interval = setInterval(() => {
      curr += 1;
      if (curr >= total) {
        clearInterval(interval);
        setTimeout(() => {
          setIsPlaying(false);
          playAnimeSound('levelup');
        }, 1200);
      } else {
        setActiveStep(curr);
        playAnimeSound('blip');
      }
    }, 1800);
  };

  return (
    <div className="relative w-full border-2 border-navy-900 dark:border-electric-cyan bg-white dark:bg-[#070D18] p-6 rounded-lg shadow-manga dark:shadow-manga-dark overflow-hidden select-none">
      {/* Header with Anime Character Mentor */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 mb-6 border-b border-navy-900/10 dark:border-electric-cyan/20">
        <div className="flex items-center gap-4">
          <AnimeCharacter character={config.character} size={70} />
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] text-electric-blue dark:text-electric-cyan font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ANIMATED SYSTEM EXPLAINER // ARCHITECTURE WALKTHROUGH</span>
            </div>
            <h3 className="text-xl font-black text-navy-900 dark:text-white font-mono mt-0.5">
              How {repoName} Operates Under the Hood
            </h3>
          </div>
        </div>

        <button
          onClick={playWalkthrough}
          disabled={isPlaying}
          className={`flex items-center gap-2 px-4 py-2 rounded-md font-mono text-xs font-bold transition-all shadow-sm ${
            isPlaying
              ? 'bg-amber-500 text-black'
              : 'bg-electric-blue hover:bg-blue-600 text-white'
          }`}
        >
          {isPlaying ? (
            <>
              <RotateCcw className="w-4 h-4 animate-spin" />
              <span>WALKTHROUGH STEP 0{activeStep + 1}/04...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              <span>PLAY ANIMATED EXPLAINER →</span>
            </>
          )}
        </button>
      </div>

      {/* Anime Mentor Quote Banner */}
      <div className="mb-6 p-3 rounded bg-navy-50 dark:bg-navy-900/60 border border-electric-blue/20 dark:border-electric-cyan/30 font-mono text-xs text-slate-700 dark:text-slate-300 italic flex items-center gap-2">
        <span className="text-electric-blue dark:text-electric-cyan font-bold not-italic">
          [MENTOR]:
        </span>
        <span>{config.mentorQuote}</span>
      </div>

      {/* Main Simulation Viewport */}
      {config.renderVisual(activeStep)}

      {/* Interactive Step Switcher Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mt-6">
        {config.steps.map((st, idx) => (
          <button
            key={st.title}
            onClick={() => {
              playAnimeSound('blip');
              setActiveStep(idx);
            }}
            className={`p-3 rounded-md border text-left transition-all duration-200 ${
              activeStep === idx
                ? 'border-electric-blue dark:border-electric-cyan bg-electric-blue/10 dark:bg-electric-cyan/15 shadow-sm scale-102'
                : 'border-navy-900/10 dark:border-navy-800 bg-navy-50/50 dark:bg-navy-900/40 opacity-70 hover:opacity-100'
            }`}
          >
            <div className="flex items-center justify-between font-mono text-[10px] mb-1">
              <span className="font-extrabold text-electric-blue dark:text-electric-cyan">
                STEP 0{idx + 1}
              </span>
              <span className="text-slate-400 font-bold">{st.animeChakra}</span>
            </div>
            <div className="font-bold text-xs text-navy-900 dark:text-white line-clamp-1 mb-1">
              {st.title}
            </div>
            <div className="text-[11px] text-slate-600 dark:text-slate-400 font-sans line-clamp-2">
              {st.desc}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
