import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import About from '@/components/About';
import Contact from '@/components/Contact';
import JsonLd from '@/components/JsonLd';
import { mapServiceForLocale } from '@/lib/cms/public';
import { loadPublishedServices, loadPublicSettings } from '@/lib/cms/publicContent';
import { isAppLocale, localizedPath, stripLeadingEmoji, buildPageMetadata } from '@/lib/seo';
import { accountingServiceSchema, breadcrumbSchema } from '@/lib/seoSchema';

export const revalidate = 60;

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
    title: t('homeTitle'),
    description: t('homeDescription'),
    pathForLocale: (item) => localizedPath(item),
  });
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const [rawServices, settings, tNav] = await Promise.all([
    loadPublishedServices(),
    loadPublicSettings(),
    getTranslations({ locale, namespace: 'nav' }),
  ]);
  const services = rawServices.map((service) => mapServiceForLocale(service, locale));

  return (
    <main className="min-h-screen">
      <JsonLd
        data={[
          breadcrumbSchema([{ name: tNav('home'), path: localizedPath(locale) }]),
          accountingServiceSchema({
            name: 'Accounting Plus',
            description: isAppLocale(locale)
              ? settings.about.descriptions[locale]
              : settings.about.descriptions.me,
            url: `https://accounting-plus.me${localizedPath(locale)}`,
            settings,
          }),
        ]}
      />
      <Hero />
      <Services
        initialServices={services.map((service) => ({
          slug: service.slug,
          icon: service.icon,
          title: stripLeadingEmoji(service.title),
          shortDescription: service.shortDescription,
        }))}
      />
      <About />
      <Contact />
    </main>
  );
}
