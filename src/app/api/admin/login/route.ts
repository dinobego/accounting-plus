import { NextResponse } from 'next/server';
import { applyAdminSession, verifyPassword } from '@/lib/cms/auth';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  let password = '';
  try {
    const body = await request.json();
    password = String(body?.password || '');
  } catch {
    return NextResponse.json({ error: 'Neispravan zahtjev' }, { status: 400 });
  }
  if (!password || !verifyPassword(password)) {
    return NextResponse.json({ error: 'Pogrešna lozinka' }, { status: 401 });
  }

  return applyAdminSession(NextResponse.json({ ok: true }));
}
