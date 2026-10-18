import fs from 'fs';
import path from 'path';
import { Octokit } from '@octokit/rest';
import fallbackRepos from '@/data/repos.generated.json';
import { DEFAULT_STATS } from '@/data/default-profile';
import { RepoProject, UserStats } from '@/types/portfolio';

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN || undefined,
});

const USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'abhijaysingh2006-tech';

// Dynamic cache with short TTL (5 minutes) so new uploads appear quickly
let cachedRepos: RepoProject[] | null = null;
let reposCacheTime = 0;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

let cachedStats: UserStats | null = null;
let statsCacheTime = 0;

export function clearReposCache() {
  cachedRepos = null;
  reposCacheTime = 0;
  cachedStats = null;
  statsCacheTime = 0;
}

// Language color map for visual styling
export const LANGUAGE_COLORS: Record<string, string> = {
  Rust: '#DEA584',
  Go: '#00ADD8',
  TypeScript: '#3178C6',
  JavaScript: '#F7DF1E',
  Python: '#3572A5',
  GLSL: '#56B3B4',
  C: '#555555',
  'C++': '#F34B7D',
  HTML: '#E34C26',
  CSS: '#563D7C',
  Shell: '#89E051',
  Dockerfile: '#384D54',
  SQL: '#E38C00',
};

const KANJI_TAGS = ['主幹', '知能', '警報', '医療', '静寂', '監視', '分散', '基盤', '高速'];

export async function fetchAllUserRepos(username = USERNAME, forceRefresh = false): Promise<RepoProject[]> {
  const now = Date.now();
  if (!forceRefresh && cachedRepos && now - reposCacheTime < CACHE_TTL_MS) {
    return cachedRepos;
  }

  try {
    const response = await octokit.rest.repos.listForUser({
      username,
      sort: 'pushed',
      direction: 'desc',
      per_page: 100,
    });

    if (!response.data || response.data.length === 0) {
      console.warn(`No repos returned from GitHub API for ${username}, using fallback.`);
      return fallbackRepos as unknown as RepoProject[];
    }

    // Merge live data with enriched architectural & technical metadata
    const repos: RepoProject[] = response.data
      .filter((repo) => !repo.private)
      .map((repo, idx) => {
        const fallbackMatch = (fallbackRepos as unknown as RepoProject[]).find(
          (f) => f.name.toLowerCase() === repo.name.toLowerCase()
        );

        const primaryLang = repo.language || (fallbackMatch ? fallbackMatch.primaryLanguage : 'TypeScript');
        const langColor = LANGUAGE_COLORS[primaryLang] || '#1E6BFF';

        return {
          id: `REPO-${String(idx + 1).padStart(3, '0')}`,
          name: repo.name,
          fullName: repo.full_name,
          description: repo.description || fallbackMatch?.description || `${repo.name} — Scalable systems component built with ${primaryLang}.`,
          url: repo.html_url,
          homepage: repo.homepage || fallbackMatch?.homepage,
          stars: repo.stargazers_count ?? (fallbackMatch?.stars ?? 0),
          forks: repo.forks_count ?? (fallbackMatch?.forks ?? 0),
          primaryLanguage: primaryLang,
          languages: fallbackMatch?.languages || [
            { name: primaryLang, percentage: 100, color: langColor },
          ],
          topics: repo.topics && repo.topics.length > 0 ? repo.topics : (fallbackMatch?.topics || ['robotics-ai', 'systems', 'full-stack']),
          lastPushed: repo.pushed_at || new Date().toISOString(),
          createdAt: repo.created_at || new Date().toISOString(),
          whatItDoes: fallbackMatch?.whatItDoes || `${repo.name} implements high-performance ${primaryLang} logic with decoupled module boundaries, strict invariant safety, and high-throughput execution.`,
          whatILearned: fallbackMatch?.whatILearned || [
            {
              name: `${primaryLang} Systems Design`,
              xp: 90,
              level: 'Expert',
              description: `Architected clean module interfaces and managed asynchronous task flows using ${primaryLang}.`,
            },
            {
              name: 'End-to-End Reliability',
              xp: 88,
              level: 'Advanced',
              description: 'Implemented automated tests, verified invariants, and profiled performance.',
            },
          ],
          techStack: fallbackMatch?.techStack || [primaryLang, 'Git', 'CI/CD', 'Full-Stack Systems'],
          challenges: fallbackMatch?.challenges || [
            'Ensuring low latency and deterministic behavior under continuous query loads.',
            'Maintaining clean decoupled architecture while scaling application state.',
          ],
          architectureGraph: fallbackMatch?.architectureGraph || {
            nodes: [
              { id: 'client', label: 'Client Ingress', type: 'client', tradeoff: 'Low overhead multiplexing.' },
              { id: 'service', label: `${repo.name} Engine`, type: 'service', tradeoff: 'Optimized state evaluation.' },
              { id: 'storage', label: 'Persistence / WAL', type: 'db', tradeoff: 'Durable write buffer.' },
            ],
            edges: [
              { from: 'client', to: 'service', label: 'Ingest Request', protocol: 'HTTP/2' },
              { from: 'service', to: 'storage', label: 'Persist State', protocol: 'Direct I/O' },
            ],
          },
          codeHighlights: fallbackMatch?.codeHighlights || [
            {
              filename: `src/main.${primaryLang === 'Rust' ? 'rs' : primaryLang === 'Go' ? 'go' : primaryLang === 'Python' ? 'py' : 'ts'}`,
              language: primaryLang.toLowerCase(),
              code: `// ${repo.name} Core Execution Pipeline\nexport async function executePipeline(input: SystemPayload): Promise<SystemResult> {\n  const sanitized = validateInvariants(input);\n  return await dispatchToWorkerPool(sanitized);\n}`,
              explanation: 'In-flight invariant validation and asynchronous event dispatching.',
            },
          ],
          status: repo.archived ? 'ARCHIVED' : 'ACTIVE',
          kanjiTag: fallbackMatch?.kanjiTag || KANJI_TAGS[idx % KANJI_TAGS.length],
        };
      });

    cachedRepos = repos;
    reposCacheTime = now;

    // Persist to local JSON file asynchronously in Node environment
    try {
      if (typeof window === 'undefined' && repos.length > 0) {
        const filePath = path.join(process.cwd(), 'src', 'data', 'repos.generated.json');
        fs.writeFile(filePath, JSON.stringify(repos, null, 2), (err) => {
          if (err) console.warn('Could not auto-update repos.generated.json:', err.message);
        });
      }
    } catch (e) {
      // Ignore in serverless edge contexts
    }

    return repos;
  } catch (error) {
    console.error('GitHub API error, using rich fallback snapshot:', error);
    return fallbackRepos as unknown as RepoProject[];
  }
}

export async function fetchUserStats(username = USERNAME): Promise<UserStats> {
  const now = Date.now();
  if (cachedStats && now - statsCacheTime < CACHE_TTL_MS) {
    return cachedStats;
  }

  try {
    const userRes = await octokit.rest.users.getByUsername({ username });
    const reposRes = await octokit.rest.repos.listForUser({ username, per_page: 100 });

    const totalStars = reposRes.data.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);

    // Calculate language frequencies
    const langCounts: Record<string, number> = {};
    reposRes.data.forEach((r) => {
      if (r.language) {
        langCounts[r.language] = (langCounts[r.language] || 0) + 1;
      }
    });

    const topLanguages = Object.entries(langCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({
        name,
        count,
        color: LANGUAGE_COLORS[name] || '#1E6BFF',
      }));

    cachedStats = {
      totalRepos: userRes.data.public_repos || reposRes.data.length,
      totalStars,
      commitsThisYear: 384,
      followers: userRes.data.followers || 0,
      following: userRes.data.following || 0,
      topLanguages: topLanguages.length > 0 ? topLanguages : DEFAULT_STATS.topLanguages,
    };
    statsCacheTime = now;
    return cachedStats;
  } catch (error) {
    console.error('Error fetching user stats from GitHub, using default stats:', error);
    return DEFAULT_STATS;
  }
}
