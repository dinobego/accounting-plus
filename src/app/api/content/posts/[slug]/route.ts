import { NextResponse } from 'next/server';
import { mapPostForLocale } from '@/lib/cms/public';
import { getPostBySlug } from '@/lib/cms/store';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const locale = new URL(request.url).searchParams.get('locale') || 'en';
  const post = getPostBySlug(slug);
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(mapPostForLocale(post, locale));
}
