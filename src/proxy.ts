import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    return NextResponse.redirect(new URL(`/${routing.defaultLocale}${pathname}`, request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/admin', '/admin/:path*', '/(me|en|tr)/:path*']
};
