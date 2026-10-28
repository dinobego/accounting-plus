import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/cms/auth';
import { getMessages } from '@/lib/cms/store';

export async function GET() {
  try {
    await requireAdmin();
    return NextResponse.json(getMessages());
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
