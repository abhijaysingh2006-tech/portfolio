import { NextResponse } from 'next/server';
import { fetchAllUserRepos } from '@/lib/github';

export const runtime = 'nodejs';

export async function GET(
  request: Request,
  { params }: { params: { name: string } }
) {
  try {
    const repos = await fetchAllUserRepos();
    const repo = repos.find(
      (r) => r.name.toLowerCase() === params.name.toLowerCase() || r.id.toLowerCase() === params.name.toLowerCase()
    );

    if (!repo) {
      return NextResponse.json(
        { success: false, error: `Repository '${params.name}' not found` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: repo,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
