import { SITE_NAME, SITE_URL, absoluteUrl } from '@/lib/seo';
import type { SiteSettings } from '@/lib/cms/types';

export function organizationId() {
  return `${SITE_URL}/#organization`;
}

export function organizationSchema(settings?: SiteSettings | null) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': organizationId(),
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/images/logoBlue.png`,
    },
  };

  if (settings?.contact.email) schema.email = settings.contact.email;
  if (settings?.contact.phone) schema.telephone = settings.contact.phone;
  if (settings?.contact.instagram) schema.sameAs = [settings.contact.instagram];
  if (settings?.contact.address) {
    schema.address = {
      '@type': 'PostalAddress',
      streetAddress: settings.contact.address,
      addressCountry: 'ME',
    };
  }

  return schema;
}

export function accountingServiceSchema(input: {
  name: string;
  description: string;
  url: string;
  settings?: SiteSettings | null;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AccountingService',
    name: input.name,
    description: input.description,
    url: input.url,
    provider: { '@id': organizationId() },
    ...(input.settings?.contact.address?.toLowerCase().includes('podgorica')
      ? { areaServed: { '@type': 'City', name: 'Podgorica' } }
      : {}),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function articleSchema(input: {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished?: string;
  author?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.title,
    description: input.description,
    mainEntityOfPage: input.url,
    url: input.url,
    ...(input.datePublished ? { datePublished: input.datePublished } : {}),
    ...(input.image
      ? {
          image: input.image.startsWith('http') ? input.image : `${SITE_URL}${input.image}`,
        }
      : {}),
    ...(input.author
      ? { author: { '@type': 'Organization', name: input.author, '@id': organizationId() } }
      : { author: { '@id': organizationId() } }),
    publisher: { '@id': organizationId() },
  };
}
