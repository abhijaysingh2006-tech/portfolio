import { NextResponse } from 'next/server';
import { fetchUserStats } from '@/lib/github';

export const runtime = 'nodejs';
export const revalidate = 21600;

export async function GET() {
  try {
    const stats = await fetchUserStats();
    return NextResponse.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve stats' },
      { status: 500 }
    );
  }
}
