import fs from 'fs';
import path from 'path';
import { Octokit } from '@octokit/rest';

const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'abhijaysingh2006-tech';
const token = process.env.GITHUB_TOKEN;
const anthropicKey = process.env.ANTHROPIC_API_KEY;

const octokit = new Octokit({ auth: token || undefined });

async function seed() {
  console.log(`\n========================================`);
  console.log(`[SEED] Pulling repositories for: ${username}`);
  console.log(`========================================\n`);

  try {
    const { data: repos } = await octokit.rest.repos.listForUser({
      username,
      sort: 'pushed',
      direction: 'desc',
      per_page: 100,
    });

    console.log(`[SEED] Retrieved ${repos.length} repositories from GitHub API.`);

    const enriched = repos.map((repo, idx) => {
      const primaryLang = repo.language || 'TypeScript';

      return {
        id: `REPO-${String(idx + 1).padStart(3, '0')}`,
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description || 'High-performance systems component.',
        url: repo.html_url,
        homepage: repo.homepage || null,
        stars: repo.stargazers_count ?? 0,
        forks: repo.forks_count ?? 0,
        primaryLanguage: primaryLang,
        languages: [{ name: primaryLang, percentage: 100, color: '#1E6BFF' }],
        topics: repo.topics && repo.topics.length > 0 ? repo.topics : ['systems', 'infrastructure'],
        lastPushed: repo.pushed_at || new Date().toISOString(),
        createdAt: repo.created_at || new Date().toISOString(),
        whatItDoes: `${repo.name} implements specialized systems logic with strict type guarantees, decoupled module boundaries, and high-throughput execution.`,
        whatILearned: [
          {
            name: `${primaryLang} Systems Invariants`,
            xp: 88,
            level: 'Advanced',
            description: 'Designed robust interface contracts and managed async task concurrency.',
          },
          {
            name: 'Telemetry & Profiling',
            xp: 84,
            level: 'Advanced',
            description: 'Instrumented end-to-end tracing and optimized operational bottlenecks.',
          },
        ],
        techStack: [primaryLang, 'Git', 'CI/CD', 'Distributed Systems'],
        challenges: [
          'Ensuring low latency and deterministic behavior under bursty query spikes.',
          'Eliminating race conditions in concurrent data pathways.',
        ],
        architectureGraph: {
          nodes: [
            { id: 'client', label: 'Client Ingress', type: 'client', tradeoff: 'Multiplexed HTTP/2 or gRPC.' },
            { id: 'engine', label: `${repo.name} Core`, type: 'service', tradeoff: 'Lock-free event evaluation.' },
            { id: 'storage', label: 'Persistent State', type: 'db', tradeoff: 'Durable disk buffer.' },
          ],
          edges: [
            { from: 'client', to: 'engine', label: 'Dispatches Command', protocol: 'TCP' },
            { from: 'engine', to: 'storage', label: 'Commits Mutation', protocol: 'Direct I/O' },
          ],
        },
        codeHighlights: [
          {
            filename: `src/main.${primaryLang.toLowerCase() === 'rust' ? 'rs' : primaryLang.toLowerCase() === 'go' ? 'go' : 'ts'}`,
            language: primaryLang.toLowerCase(),
            code: `// ${repo.name} Core Loop\nexport async function processBatch(batch: SystemEvent[]) {\n  for (const event of batch) {\n    await handleEvent(event);\n  }\n}`,
            explanation: 'Batch processing pipeline with atomic state synchronization.',
          },
        ],
        status: repo.archived ? 'ARCHIVED' : 'ACTIVE',
        kanjiTag: '主幹',
      };
    });

    const targetPath = path.join(process.cwd(), 'src', 'data', 'repos.generated.json');
    fs.writeFileSync(targetPath, JSON.stringify(enriched, null, 2));

    console.log(`[SEED] Successfully generated ${enriched.length} repository case files at:`);
    console.log(`       ${targetPath}\n`);
  } catch (error) {
    console.error('[SEED] Error pulling from GitHub:', error);
  }
}

seed();
