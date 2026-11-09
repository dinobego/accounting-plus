import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import JsonLd from '@/components/JsonLd';
import ServiceView from '@/components/ServiceView';
import { mapServiceForLocale } from '@/lib/cms/public';
import { loadPublishedServiceBySlug, loadPublicSettings } from '@/lib/cms/publicContent';
import {
  buildPageMetadata,
  isAppLocale,
  localizedPath,
  plainText,
  stripLeadingEmoji,
} from '@/lib/seo';
import { accountingServiceSchema, breadcrumbSchema } from '@/lib/seoSchema';

export const revalidate = 60;
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isAppLocale(locale)) return {};
  const service = await loadPublishedServiceBySlug(slug);
  if (!service) return {};
  const mapped = mapServiceForLocale(service, locale);
  const t = await getTranslations({ locale, namespace: 'seo' });
  const title = `${stripLeadingEmoji(mapped.title)}${t('serviceTitleSuffix')}`;
  const description = plainText(mapped.description || mapped.shortDescription || mapped.content);
  return buildPageMetadata({
    locale,
    title,
    description,
    pathForLocale: (item) => localizedPath(item, `/services/${slug}`),
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const service = await loadPublishedServiceBySlug(slug);
  if (!service || !isAppLocale(locale)) notFound();

  const mapped = mapServiceForLocale(service, locale);
  if (!mapped.title) notFound();

  const [tNav, tServices, settings] = await Promise.all([
    getTranslations({ locale, namespace: 'nav' }),
    getTranslations({ locale, namespace: 'servicesSection' }),
    loadPublicSettings(),
  ]);
  const url = `https://accounting-plus.me${localizedPath(locale, `/services/${slug}`)}`;
  const title = stripLeadingEmoji(mapped.title);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: tNav('home'), path: localizedPath(locale) },
            { name: tServices('title'), path: localizedPath(locale, '/services') },
            { name: title, path: localizedPath(locale, `/services/${slug}`) },
          ]),
          accountingServiceSchema({
            name: title,
            description: mapped.description,
            url,
            settings,
          }),
        ]}
      />
      <ServiceView
        locale={locale}
        title={mapped.title}
        description={mapped.description}
        content={mapped.content}
      />
    </>
  );
}
