import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import JsonLd from '@/components/JsonLd';
import { isAppLocale, localizedPath, buildPageMetadata } from '@/lib/seo';
import { breadcrumbSchema } from '@/lib/seoSchema';
import AboutView from './AboutView';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isAppLocale(locale)) return {};
  const t = await getTranslations({ locale, namespace: 'seo' });
  return buildPageMetadata({
    locale,
    title: t('aboutTitle'),
    description: t('aboutDescription'),
    pathForLocale: (item) => localizedPath(item, '/about'),
  });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const [tNav, tAbout] = await Promise.all([
    getTranslations({ locale, namespace: 'nav' }),
    getTranslations({ locale, namespace: 'about' }),
  ]);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: tNav('home'), path: localizedPath(locale) },
          { name: tAbout('title'), path: localizedPath(locale, '/about') },
        ])}
      />
      <AboutView />
    </>
  );
}
