import type { MetadataRoute } from 'next';
import { loadPublishedPosts, loadPublishedServices } from '@/lib/cms/publicContent';
import { LOCALES, type Locale } from '@/lib/cms/types';
import { SITE_URL, localizedPath } from '@/lib/seo';

export const revalidate = 60;

const STATIC_PATHS = ['', '/about', '/contact', '/services', '/blog'];

function languageMap(getPath: (locale: Locale) => string, locales: Locale[] = LOCALES) {
  const languages: Record<string, string> = {};
  if (locales.includes('me')) languages['sr-ME'] = `${SITE_URL}${getPath('me')}`;
  if (locales.includes('en')) languages.en = `${SITE_URL}${getPath('en')}`;
  if (locales.includes('tr')) languages.tr = `${SITE_URL}${getPath('tr')}`;
  const defaultLocale = locales.includes('me') ? 'me' : locales[0];
  languages['x-default'] = `${SITE_URL}${getPath(defaultLocale)}`;
  return languages;
}

function entry(pathForLocale: (locale: Locale) => string, locale: Locale, lastModified?: string) {
  const url = `${SITE_URL}${pathForLocale(locale)}`;
  return {
    url,
    ...(lastModified ? { lastModified: new Date(lastModified) } : {}),
    alternates: {
      languages: languageMap(pathForLocale, LOCALES),
    },
  } satisfies MetadataRoute.Sitemap[number];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  for (const path of STATIC_PATHS) {
    for (const locale of LOCALES) {
      entries.push(entry((item) => localizedPath(item, path), locale));
    }
  }

  try {
    const services = await loadPublishedServices();
    for (const service of services) {
      for (const locale of LOCALES) {
        entries.push(entry((item) => localizedPath(item, `/services/${service.slug}`), locale));
      }
    }
  } catch {
    // Static routes remain; unpublished CMS URLs are omitted.
  }

  try {
    const posts = await loadPublishedPosts();
    for (const post of posts) {
      if (!post.published) continue;
      const lastModified = post.date || undefined;
      const postLocales = LOCALES.filter((item) => Boolean(post.slugs[item]));
      if (!postLocales.length) continue;
      for (const locale of postLocales) {
        entries.push({
          url: `${SITE_URL}${localizedPath(locale, `/blog/${post.slugs[locale]}`)}`,
          ...(lastModified ? { lastModified: new Date(lastModified) } : {}),
          alternates: {
            languages: languageMap(
              (item) => localizedPath(item, `/blog/${post.slugs[item]}`),
              postLocales
            ),
          },
        });
      }
    }
  } catch {
    // Blog URLs omitted when CMS data is unavailable.
  }

  return entries;
}
