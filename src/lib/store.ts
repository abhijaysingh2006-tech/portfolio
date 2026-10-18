import { create } from 'zustand';
import { RepoProject, SessionMetrics } from '@/types/portfolio';

interface PortfolioState {
  // Modal & Selection
  selectedRepo: RepoProject | null;
  setSelectedRepo: (repo: RepoProject | null) => void;

  // View state
  viewMode: 'ring' | 'grid';
  setViewMode: (mode: 'ring' | 'grid') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedLanguage: string | null;
  setSelectedLanguage: (lang: string | null) => void;
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;

  // Theme & FX
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;

  // Visitor Session Metrics
  sessionMetrics: SessionMetrics;
  updateSessionMetrics: (updates: Partial<SessionMetrics>) => void;
  resetSessionMetrics: () => void;

  // Preloader
  isBootComplete: boolean;
  setBootComplete: (complete: boolean) => void;
}

const initialSession: SessionMetrics = {
  timeOnPageSeconds: 0,
  cursorDistancePx: 0,
  deepestScrollPct: 0,
  mostAttendedSection: 'HERO (Signal Field)',
  visitorClassification: 'System Infiltrator',
  deviceType: typeof window !== 'undefined' ? (window.innerWidth < 768 ? 'Mobile Terminal' : 'Desktop Station') : 'Desktop Station',
};

export const usePortfolioStore = create<PortfolioState>((set) => ({
  selectedRepo: null,
  setSelectedRepo: (repo) => set({ selectedRepo: repo }),

  viewMode: 'ring',
  setViewMode: (viewMode) => set({ viewMode }),
  searchQuery: '',
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  selectedLanguage: null,
  setSelectedLanguage: (selectedLanguage) => set({ selectedLanguage }),
  isCommandPaletteOpen: false,
  setIsCommandPaletteOpen: (isCommandPaletteOpen) => set({ isCommandPaletteOpen }),

  isDarkMode: false,
  toggleDarkMode: () =>
    set((state) => {
      const next = !state.isDarkMode;
      if (typeof document !== 'undefined') {
        if (next) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
      return { isDarkMode: next };
    }),

  soundEnabled: true,
  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),

  sessionMetrics: initialSession,
  updateSessionMetrics: (updates) =>
    set((state) => ({
      sessionMetrics: { ...state.sessionMetrics, ...updates },
    })),
  resetSessionMetrics: () => set({ sessionMetrics: initialSession }),

  isBootComplete: false,
  setBootComplete: (isBootComplete) => set({ isBootComplete }),
}));
