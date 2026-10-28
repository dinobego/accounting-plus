import { NextResponse } from 'next/server';
import { mapPostForLocale } from '@/lib/cms/public';
import { getPublishedPosts } from '@/lib/cms/store';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || 'en';
  return NextResponse.json(getPublishedPosts().map((post) => mapPostForLocale(post, locale)));
}
