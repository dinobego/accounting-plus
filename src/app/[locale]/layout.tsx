import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import { routing } from '@/i18n/routing';
import { ReactNode } from 'react';
import type { Metadata } from 'next';
import ClientWrapper from './client-wrapper';
import JsonLd from '@/components/JsonLd';
import { loadPublicSettings } from '@/lib/cms/publicContent';
import type { Locale } from '@/lib/cms/types';
import { HTML_LANG, SITE_URL, isAppLocale } from '@/lib/seo';
import { organizationSchema } from '@/lib/seoSchema';
import './globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: '/images/icon.png',
  },
  verification: {
    google: 'dxZZXjwpnjWhCYwk94DWOYmkw_gz15w53TZ0SlM2K1E',
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isAppLocale(locale) || !routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();
  const pathname = (await headers()).get('x-pathname') || '';
  const isAdmin = pathname.split('/').includes('admin');
  const settings = isAdmin ? null : await loadPublicSettings();

  return (
      <html lang={HTML_LANG[locale as Locale]} suppressHydrationWarning>
      <body>
        {settings ? <JsonLd data={organizationSchema(settings)} /> : null}
        <ClientWrapper messages={messages} locale={locale}>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
