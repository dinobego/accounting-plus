import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/cms/auth';
import { getServices, saveService } from '@/lib/cms/store';
import type { ServiceItem } from '@/lib/cms/types';

export async function GET() {
  try {
    await requireAdmin();
    return NextResponse.json(getServices());
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const service = (await request.json()) as ServiceItem;
    if (!service.id) service.id = service.slug || crypto.randomUUID();
    return NextResponse.json(await saveService(service));
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
