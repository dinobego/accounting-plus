import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { createHmac, randomBytes, timingSafeEqual } from 'crypto';

const COOKIE_NAME = 'admin_session';

function getSecret() {
  return process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || 'dev-only-change-me';
}

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || 'admin123';
}

export function verifyPassword(password: string) {
  const expected = Buffer.from(getAdminPassword());
  const received = Buffer.from(password);
  if (expected.length !== received.length) return false;
  return timingSafeEqual(expected, received);
}

function sessionCookieValue() {
  const token = randomBytes(32).toString('hex');
  const sig = createHmac('sha256', getSecret()).update(token).digest('hex');
  return `${token}.${sig}`;
}

function cookieOptions() {
  return {
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  };
}

export function applyAdminSession(response: NextResponse) {
  response.cookies.set(COOKIE_NAME, sessionCookieValue(), cookieOptions());
  return response;
}

export function clearAdminSession(response: NextResponse) {
  response.cookies.set(COOKIE_NAME, '', { ...cookieOptions(), maxAge: 0 });
  return response;
}

export async function isAdminAuthenticated() {
  const jar = await cookies();
  const value = jar.get(COOKIE_NAME)?.value;
  if (!value) return false;
  const [token, sig] = value.split('.');
  if (!token || !sig) return false;
  const expected = createHmac('sha256', getSecret()).update(token).digest('hex');
  if (sig.length !== expected.length) return false;
  try {
    return timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
  } catch {
    return false;
  }
}

export async function destroyAdminSession() {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
}

export async function requireAdmin() {
  if (!(await isAdminAuthenticated())) {
    const error = new Error('UNAUTHORIZED');
    error.name = 'UnauthorizedError';
    throw error;
  }
}
