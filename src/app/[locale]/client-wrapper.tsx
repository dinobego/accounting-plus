'use client';

import { NextIntlClientProvider } from 'next-intl';
import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ReactNode } from 'react';

export default function ClientWrapper({
  children,
  messages,
  locale,
}: {
  children: ReactNode;
  messages: any;
  locale: string;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.includes('/admin');

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      {!isAdmin && <Header />}
      {children}
      {!isAdmin && <Footer />}
    </NextIntlClientProvider>
  );
}
