import { NextResponse } from 'next/server';
import { fetchAllUserRepos, clearReposCache } from '@/lib/github';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0; // Dynamic route handler for instant updates

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username') || undefined;
    const includeForks = searchParams.get('forks') === 'true';
    const forceRefresh = searchParams.get('refresh') === 'true';

    if (forceRefresh) {
      clearReposCache();
    }

    let repos = await fetchAllUserRepos(username, forceRefresh);

    if (!includeForks) {
      repos = repos.filter((r) => r.forks === 0 || !r.fullName.includes('/fork'));
    }

    return NextResponse.json({
      success: true,
      count: repos.length,
      timestamp: new Date().toISOString(),
      data: repos,
    });
  } catch (error) {
    console.error('API /api/repos error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve repository portfolio' },
      { status: 500 }
    );
  }
}
