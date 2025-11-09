'use client';

import { NextIntlClientProvider } from 'next-intl';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ReactNode } from 'react';
import { useLocale } from 'next-intl';

export default function ClientWrapper({
  children,
  messages,
  locale,
}: {
  children: ReactNode;
  messages: any;
  locale: string;  // ← DODAJ OVO
}) {
  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <Header />
      {children}
      <Footer />
    </NextIntlClientProvider>
  );
}
