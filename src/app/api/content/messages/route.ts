import { NextResponse } from 'next/server';
import { addMessage } from '@/lib/cms/store';

export async function POST(request: Request) {
  const body = await request.json();
  const name = String(body.name || '').trim();
  const email = String(body.email || '').trim();
  const phone = String(body.phone || '').trim();
  const message = String(body.message || '').trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Nedostaju obavezna polja' }, { status: 400 });
  }

  const saved = await addMessage({ name, email, phone, message });
  return NextResponse.json(saved);
}
