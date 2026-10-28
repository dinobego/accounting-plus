import { NextResponse } from 'next/server';
import { clearAdminSession } from '@/lib/cms/auth';

export const dynamic = 'force-dynamic';

export async function POST() {
  return clearAdminSession(NextResponse.json({ ok: true }));
}
