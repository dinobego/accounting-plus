import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/cms/auth';
import { revalidatePublicContent } from '@/lib/cms/revalidatePublic';
import { getServices, saveService } from '@/lib/cms/store';
import type { ServiceItem } from '@/lib/cms/types';

export async function GET() {
  try {
    await requireAdmin();
    return NextResponse.json(await getServices());
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const service = (await request.json()) as ServiceItem;
    if (!service.id) service.id = service.slug || crypto.randomUUID();
    const saved = await saveService(service);
    revalidatePublicContent();
    return NextResponse.json(saved);
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
