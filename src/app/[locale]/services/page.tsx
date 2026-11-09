import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Services from '@/components/Services';
import JsonLd from '@/components/JsonLd';
import { mapServiceForLocale } from '@/lib/cms/public';
import { loadPublishedServices } from '@/lib/cms/publicContent';
import { buildPageMetadata, isAppLocale, localizedPath, stripLeadingEmoji } from '@/lib/seo';
import { breadcrumbSchema } from '@/lib/seoSchema';

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
    title: t('servicesTitle'),
    description: t('servicesDescription'),
    pathForLocale: (item) => localizedPath(item, '/services'),
  });
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const [rawServices, tNav, tServices] = await Promise.all([
    loadPublishedServices(),
    getTranslations({ locale, namespace: 'nav' }),
    getTranslations({ locale, namespace: 'servicesSection' }),
  ]);
  const services = rawServices.map((service) => mapServiceForLocale(service, locale));

  return (
    <div className="pt-16">
      <JsonLd
        data={breadcrumbSchema([
          { name: tNav('home'), path: localizedPath(locale) },
          { name: tServices('title'), path: localizedPath(locale, '/services') },
        ])}
      />
      <Services
        heading="h1"
        initialServices={services.map((service) => ({
          slug: service.slug,
          icon: service.icon,
          title: stripLeadingEmoji(service.title),
          shortDescription: service.shortDescription,
        }))}
      />
    </div>
  );
}
