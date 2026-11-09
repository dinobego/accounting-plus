import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/') {
    return NextResponse.redirect(new URL('/me', request.url), 308);
  }

  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    return NextResponse.redirect(new URL(`/me${pathname}`, request.url), 308);
  }

  const firstSegment = pathname.split('/').filter(Boolean)[0];
  const publicRoots = new Set(['about', 'contact', 'services', 'blog']);
  if (firstSegment && publicRoots.has(firstSegment)) {
    return NextResponse.redirect(new URL(`/me${pathname}`, request.url), 308);
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', pathname);
  return intlMiddleware(new NextRequest(request, { headers: requestHeaders }));
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
