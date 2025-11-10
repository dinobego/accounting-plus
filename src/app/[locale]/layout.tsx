import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { ReactNode } from 'react';
import ClientWrapper from './client-wrapper';
import './globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata = {
  title: 'Accounting plus',
  description: 'Stručna finansijska rješenja za rast Vašeg poslovanja.',

  icons: {
    icon: '/images/icon.png'  
  },
  verification: {
    google: "dxZZXjwpnjWhCYwk94DWOYmkw_gz15w53TZ0SlM2K1E",
  }
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/icon.jpg" type="image/jpeg" />
      </head>
      <body>
        <ClientWrapper messages={messages} locale={locale}>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
