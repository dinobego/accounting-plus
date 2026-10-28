import { NextResponse } from 'next/server';
import { mapServiceForLocale } from '@/lib/cms/public';
import { getPublishedServices, getServiceBySlug } from '@/lib/cms/store';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || 'en';
  const slug = searchParams.get('slug');

  if (slug) {
    const service = await getServiceBySlug(slug);
    if (!service) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(mapServiceForLocale(service, locale));
  }

  const services = await getPublishedServices();
  return NextResponse.json(
    services.map((service) => mapServiceForLocale(service, locale))
  );
}
