import type { Metadata } from 'next';
import type { Locale } from '@/lib/cms/types';
import { routing } from '@/i18n/routing';

export const SITE_URL = 'https://accounting-plus.me';
export const SITE_NAME = 'Accounting Plus';
export const OG_IMAGE = `${SITE_URL}/images/logoBlue.png`;

export const HREFLANG: Record<Locale, string> = {
  me: 'sr-ME',
  en: 'en',
  tr: 'tr',
};

export const HTML_LANG: Record<Locale, string> = {
  me: 'sr-ME',
  en: 'en',
  tr: 'tr',
};

export const OG_LOCALE: Record<Locale, string> = {
  me: 'sr_ME',
  en: 'en_US',
  tr: 'tr_TR',
};

export function isAppLocale(value: string): value is Locale {
  return routing.locales.includes(value as Locale);
}

export function absoluteUrl(path: string) {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

export function localizedPath(locale: string, path = '') {
  const suffix = path === '/' || path === '' ? '' : path.startsWith('/') ? path : `/${path}`;
  return `/${locale}${suffix}`;
}

export function languageAlternates(
  getPath: (locale: Locale) => string,
  currentLocale: Locale,
  locales: Locale[] = ['me', 'en', 'tr']
) {
  const available = locales.filter((item) => item === 'me' || item === 'en' || item === 'tr');
  const languages: Record<string, string> = {};
  if (available.includes('me')) languages['sr-ME'] = absoluteUrl(getPath('me'));
  if (available.includes('en')) languages.en = absoluteUrl(getPath('en'));
  if (available.includes('tr')) languages.tr = absoluteUrl(getPath('tr'));
  const defaultLocale = available.includes('me') ? 'me' : available[0] || currentLocale;
  languages['x-default'] = absoluteUrl(getPath(defaultLocale));

  return {
    canonical: absoluteUrl(getPath(currentLocale)),
    languages,
  };
}

export function stripLeadingEmoji(value: string) {
  return value.replace(/^[^\p{L}\p{N}]+/u, '').trim() || value.trim();
}

export function plainText(value: string, maxLength = 160) {
  const text = value
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 1).trim()}…`;
}

type PageMetaInput = {
  locale: Locale;
  title: string;
  description: string;
  pathForLocale: (locale: Locale) => string;
  locales?: Locale[];
  ogType?: 'website' | 'article';
  noIndex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
};

export function buildPageMetadata({
  locale,
  title,
  description,
  pathForLocale,
  locales,
  ogType = 'website',
  noIndex = false,
  publishedTime,
  modifiedTime,
}: PageMetaInput): Metadata {
  const alternates = languageAlternates(pathForLocale, locale, locales);
  const ogLocale = OG_LOCALE[locale];

  return {
    title,
    description,
    alternates,
    robots: noIndex
      ? { index: false, follow: false, googleBot: { index: false, follow: false } }
      : { index: true, follow: true },
    openGraph: {
      type: ogType,
      siteName: SITE_NAME,
      title,
      description,
      url: alternates.canonical,
      locale: ogLocale,
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}
