import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import JsonLd from '@/components/JsonLd';
import { loadPublicSettings } from '@/lib/cms/publicContent';
import { SITE_URL, buildPageMetadata, isAppLocale, localizedPath } from '@/lib/seo';
import { breadcrumbSchema, organizationId } from '@/lib/seoSchema';
import ContactView from './ContactView';

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
    title: t('contactTitle'),
    description: t('contactDescription'),
    pathForLocale: (item) => localizedPath(item, '/contact'),
  });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const [tNav, tContact, settings] = await Promise.all([
    getTranslations({ locale, namespace: 'nav' }),
    getTranslations({ locale, namespace: 'contact' }),
    loadPublicSettings(),
  ]);

  const localBusiness = settings.contact.address
    ? {
        '@context': 'https://schema.org',
        '@type': 'AccountingService',
        '@id': `${SITE_URL}/#local`,
        name: 'Accounting Plus',
        url: `${SITE_URL}${localizedPath(locale, '/contact')}`,
        email: settings.contact.email,
        telephone: settings.contact.phone,
        address: {
          '@type': 'PostalAddress',
          streetAddress: settings.contact.address,
          addressCountry: 'ME',
        },
        parentOrganization: { '@id': organizationId() },
      }
    : null;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: tNav('home'), path: localizedPath(locale) },
            { name: tContact('title'), path: localizedPath(locale, '/contact') },
          ]),
          ...(localBusiness ? [localBusiness] : []),
        ]}
      />
      <ContactView />
    </>
  );
}
