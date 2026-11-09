import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/cms/auth';
import { revalidatePublicContent } from '@/lib/cms/revalidatePublic';
import { deletePost, getPostById, savePost } from '@/lib/cms/store';
import type { BlogPost } from '@/lib/cms/types';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    const post = await getPostById(id);
    if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(post);
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    const post = (await request.json()) as BlogPost;
    const saved = await savePost({ ...post, id });
    revalidatePublicContent();
    return NextResponse.json(saved);
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    await deletePost(id);
    revalidatePublicContent();
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
