import { NextResponse } from 'next/server';
import { getSettings } from '@/lib/cms/store';

export async function GET() {
  return NextResponse.json(await getSettings());
}
