import { pickLocalized, type BlogPost, type ServiceItem } from './types';

export function mapPostForLocale(post: BlogPost, locale: string) {
  return {
    id: post.id,
    slug: pickLocalized(post.slugs, locale),
    title: pickLocalized(post.titles, locale),
    excerpt: pickLocalized(post.excerpts, locale),
    content: pickLocalized(post.contents, locale),
    author: pickLocalized(post.authors, locale),
    category: post.category,
    date: post.date,
    readTime: post.readTime,
    image: post.image,
    published: post.published,
  };
}

export function mapServiceForLocale(service: ServiceItem, locale: string) {
  return {
    id: service.id,
    slug: service.slug,
    icon: service.icon,
    order: service.order,
    title: pickLocalized(service.titles, locale),
    shortDescription: pickLocalized(service.shortDescriptions, locale),
    description: pickLocalized(service.descriptions, locale),
    content: pickLocalized(service.contents, locale),
  };
}
