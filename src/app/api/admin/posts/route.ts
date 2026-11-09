import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/cms/auth';
import { revalidatePublicContent } from '@/lib/cms/revalidatePublic';
import { getPosts, savePost } from '@/lib/cms/store';
import type { BlogPost } from '@/lib/cms/types';

export async function GET() {
  try {
    await requireAdmin();
    return NextResponse.json(await getPosts());
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const post = (await request.json()) as BlogPost;
    if (!post.id) {
      post.id = crypto.randomUUID();
    }
    const saved = await savePost(post);
    revalidatePublicContent();
    return NextResponse.json(saved);
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
