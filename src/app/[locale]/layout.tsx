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
  title: 'Accounting plus - Profesionalne računovodstvene usluge',
  description: 'Stručna finansijska rješenja za rast Vašeg poslovanja. Usluge: Osnivanje preduzeća, Poresko savjetovanje, Analiza poslovanja i više.',
  icons: {
    icon: '/images/icon.jpg'  
  },
  openGraph: {
    title: 'Accounting plus - Profesionalne računovodstvene usluge',
    description: 'Stručna finansijska rješenja za rast Vašeg poslovanja. Osnivanje preduzeća, Poresko savjetovanje, Analiza poslovanja, Knjigovodstvo.',
    url: 'https://accounting-plus.me',
    siteName: 'Accounting plus',
    images: [
      {
        url: 'https://accounting-plus.me/images/logoBlue.png',
        width: 1200,
        height: 630,
        alt: 'Accounting plus'
      }
    ],
    locale: 'sr_RS',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Accounting plus',
    description: 'Stručna finansijska rješenja za rast Vašeg poslovanja',
    images: ['https://accounting-plus.me/images/logoBlue.png']
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
        <meta property="og:title" content="Accounting plus - Profesionalne računovodstvene usluge" />
        <meta property="og:description" content="Stručna finansijska rješenja za rast Vašeg poslovanja. Osnivanje preduzeća, Poresko savjetovanje, Analiza poslovanja, Knjigovodstvo." />
        <meta property="og:url" content="https://accounting-plus.me" />
        <meta property="og:image" content="https://accounting-plus.me/images/logoBlue.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Accounting plus" />
        <meta name="twitter:description" content="Stručna finansijska rješenja za rast Vašeg poslovanja" />
        <meta name="twitter:image" content="https://accounting-plus.me/images/logoBlue.png" />
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
