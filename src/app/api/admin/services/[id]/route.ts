import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/cms/auth';
import { revalidatePublicContent } from '@/lib/cms/revalidatePublic';
import { deleteService, getServiceById, saveService } from '@/lib/cms/store';
import type { ServiceItem } from '@/lib/cms/types';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    const service = await getServiceById(id);
    if (!service) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(service);
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
    const service = (await request.json()) as ServiceItem;
    const saved = await saveService({ ...service, id });
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
    await deleteService(id);
    revalidatePublicContent();
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
