import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import BlogListing from '@/components/BlogListing';
import JsonLd from '@/components/JsonLd';
import { mapPostForLocale } from '@/lib/cms/public';
import { loadPublishedPosts } from '@/lib/cms/publicContent';
import { buildPageMetadata, isAppLocale, localizedPath } from '@/lib/seo';
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
    title: t('blogTitle'),
    description: t('blogDescription'),
    pathForLocale: (item) => localizedPath(item, '/blog'),
  });
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const [posts, tNav, tBlog] = await Promise.all([
    loadPublishedPosts(),
    getTranslations({ locale, namespace: 'nav' }),
    getTranslations({ locale, namespace: 'blog' }),
  ]);

  const mapped = posts
    .filter((post) => post.published)
    .map((post) => mapPostForLocale(post, locale))
    .filter((post) => post.slug && post.title);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: tNav('home'), path: localizedPath(locale) },
          { name: tBlog('title'), path: localizedPath(locale, '/blog') },
        ])}
      />
      <BlogListing posts={mapped} />
    </>
  );
}
