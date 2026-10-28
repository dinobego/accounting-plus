import { NextResponse } from 'next/server';
import { destroyAdminSession } from '@/lib/cms/auth';

export async function POST() {
  await destroyAdminSession();
  return NextResponse.json({ ok: true });
}
