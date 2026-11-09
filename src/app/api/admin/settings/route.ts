import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/cms/auth';
import { revalidatePublicContent } from '@/lib/cms/revalidatePublic';
import { getSettings, saveSettings } from '@/lib/cms/store';
import type { SiteSettings } from '@/lib/cms/types';

export async function GET() {
  try {
    await requireAdmin();
    return NextResponse.json(await getSettings());
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function PUT(request: Request) {
  try {
    await requireAdmin();
    const settings = (await request.json()) as SiteSettings;
    const saved = await saveSettings(settings);
    revalidatePublicContent();
    return NextResponse.json(saved);
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
