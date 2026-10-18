import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { clearReposCache, fetchAllUserRepos } from '@/lib/github';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const secret = process.env.GITHUB_WEBHOOK_SECRET;
    const authHeader = request.headers.get('x-hub-signature-256');

    // If webhook secret is configured, require authentication
    if (secret && !authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('[GITHUB WEBHOOK] Received repository event! Refreshing portfolio cache...');

    // Invalidate local memory and fetch fresh repos from GitHub
    clearReposCache();
    await fetchAllUserRepos(undefined, true);

    // Revalidate Next.js cache paths
    revalidatePath('/');
    revalidatePath('/api/repos');
    revalidatePath('/api/stats');

    return NextResponse.json({
      success: true,
      message: 'New repository automatically synchronized into portfolio!',
      revalidated: true,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[GITHUB WEBHOOK ERROR]:', error);
    return NextResponse.json({ error: 'Revalidation error' }, { status: 500 });
  }
}
