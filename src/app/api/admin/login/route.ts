import { NextResponse } from 'next/server';
import { createAdminSession, verifyPassword } from '@/lib/cms/auth';

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

  await createAdminSession();
  return NextResponse.json({ ok: true });
}
