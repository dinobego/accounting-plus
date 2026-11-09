import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { redirect } from '@/i18n/routing';
import BlogPostView from '@/components/BlogPostView';
import JsonLd from '@/components/JsonLd';
import { mapPostForLocale } from '@/lib/cms/public';
import { loadPublishedPostBySlug } from '@/lib/cms/publicContent';
import {
  buildPageMetadata,
  isAppLocale,
  localizedPath,
  plainText,
} from '@/lib/seo';
import { articleSchema, breadcrumbSchema } from '@/lib/seoSchema';

export const revalidate = 60;
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isAppLocale(locale)) return {};
  const post = await loadPublishedPostBySlug(slug);
  if (!post || !post.published) return {};
  const mapped = mapPostForLocale(post, locale);
  const description = plainText(mapped.excerpt || mapped.content);
  const locales = (['me', 'en', 'tr'] as const).filter((item) => Boolean(post.slugs[item]));
  return buildPageMetadata({
    locale,
    title: `${mapped.title} | Accounting Plus`,
    description,
    pathForLocale: (item) => localizedPath(item, `/blog/${post.slugs[item]}`),
    locales,
    ogType: 'article',
    publishedTime: post.date,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isAppLocale(locale)) notFound();

  const post = await loadPublishedPostBySlug(slug);
  if (!post || !post.published) notFound();

  const mapped = mapPostForLocale(post, locale);
  if (mapped.slug && mapped.slug !== slug) {
    redirect({ href: `/blog/${mapped.slug}`, locale });
  }

  const [tNav, tBlog] = await Promise.all([
    getTranslations({ locale, namespace: 'nav' }),
    getTranslations({ locale, namespace: 'blog' }),
  ]);
  const url = `https://accounting-plus.me${localizedPath(locale, `/blog/${mapped.slug}`)}`;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: tNav('home'), path: localizedPath(locale) },
            { name: tBlog('title'), path: localizedPath(locale, '/blog') },
            { name: mapped.title, path: localizedPath(locale, `/blog/${mapped.slug}`) },
          ]),
          articleSchema({
            title: mapped.title,
            description: plainText(mapped.excerpt || mapped.content),
            url,
            image: mapped.image,
            datePublished: mapped.date,
            author: mapped.author,
          }),
        ]}
      />
      <BlogPostView post={mapped} />
    </>
  );
}
