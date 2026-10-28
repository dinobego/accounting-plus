export type Locale = 'me' | 'en' | 'tr';

export type Localized<T = string> = Record<Locale, T>;

export type BlogCategory = 'educational' | 'practical' | 'tips' | 'seo';

export type BlogPost = {
  id: string;
  published: boolean;
  date: string;
  readTime: number;
  image: string;
  category: BlogCategory;
  slugs: Localized;
  titles: Localized;
  excerpts: Localized;
  authors: Localized;
  contents: Localized;
};

export type ServiceItem = {
  id: string;
  slug: string;
  icon: string;
  order: number;
  published: boolean;
  titles: Localized;
  shortDescriptions: Localized;
  descriptions: Localized;
  contents: Localized;
};

export type SiteSettings = {
  contact: {
    email: string;
    phone: string;
    address: string;
    instagram: string;
    mapsUrl: string;
    hoursWeekdays: Localized;
    hoursWeekend: Localized;
  };
  hero: {
    titles: Localized;
    subtitles: Localized;
  };
  about: {
    titles: Localized;
    descriptions: Localized;
    stats: {
      partners: string;
      clients: string;
      experts: string;
      satisfaction: string;
      support: string;
    };
  };
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
  read: boolean;
};

export type CmsStore = {
  posts: BlogPost[];
  services: ServiceItem[];
  settings: SiteSettings;
  messages: ContactMessage[];
};

export const LOCALES: Locale[] = ['me', 'en', 'tr'];

export const emptyLocalized = (value = ''): Localized => ({
  me: value,
  en: value,
  tr: value,
});

export function pickLocalized<T>(values: Record<Locale, T>, locale: string): T {
  if (locale === 'me' || locale === 'en' || locale === 'tr') {
    return values[locale];
  }
  return values.en;
}
