export interface ArchNode {
  id: string;
  label: string;
  type: 'client' | 'gateway' | 'service' | 'db' | 'cache' | 'queue' | 'thirdparty' | 'cicd';
  tradeoff?: string;
  x?: number;
  y?: number;
}

export interface ArchEdge {
  from: string;
  to: string;
  label?: string;
  protocol?: string;
}

export interface ArchitectureGraph {
  nodes: ArchNode[];
  edges: ArchEdge[];
}

export interface CodeHighlight {
  filename: string;
  language: string;
  code: string;
  explanation: string;
}

export interface LearnedSkill {
  name: string;
  xp: number; // 0-100
  level: string;
  description: string;
}

export interface RepoProject {
  id: string; // e.g., "REPO-001"
  name: string;
  fullName: string;
  description: string;
  url: string;
  homepage?: string | null;
  stars: number;
  forks: number;
  primaryLanguage: string;
  languages: { name: string; percentage: number; color?: string }[];
  topics: string[];
  lastPushed: string;
  createdAt: string;
  whatItDoes: string;
  whatILearned: LearnedSkill[];
  techStack: string[];
  challenges: string[];
  architectureGraph: ArchitectureGraph;
  codeHighlights: CodeHighlight[];
  status: 'ACTIVE' | 'ARCHIVED' | 'EXPERIMENTAL';
  kanjiTag: string; // e.g. "主幹", "分散", "基盤"
}

export interface UserStats {
  totalRepos: number;
  totalStars: number;
  commitsThisYear: number;
  topLanguages: { name: string; count: number; color: string }[];
  followers: number;
  following: number;
}

export interface UserProfile {
  username: string;
  name: string;
  tagline: string;
  bio: string;
  email: string;
  linkedin: string;
  twitter?: string;
  location: string;
  avatarUrl: string;
  role: string;
}

export interface SessionMetrics {
  timeOnPageSeconds: number;
  cursorDistancePx: number;
  deepestScrollPct: number;
  mostAttendedSection: string;
  visitorClassification: string;
  deviceType: string;
}
