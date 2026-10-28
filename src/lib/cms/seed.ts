import { blogPostsData } from '@/lib/blogData';
import { slugTranslations } from '@/lib/blogTranslations';
import me from '@/messages/me.json';
import en from '@/messages/en.json';
import tr from '@/messages/tr.json';
import { servicesContent } from './legacyServices';
import type { BlogCategory, BlogPost, CmsStore, ServiceItem, SiteSettings } from './types';

const SERVICE_META: { slug: string; icon: string; sectionKey: keyof typeof me.servicesSection }[] = [
  { slug: 'company-formation', icon: 'Building2', sectionKey: 'companyFormation' },
  { slug: 'residence-work-permits', icon: 'FileText', sectionKey: 'permits' },
  { slug: 'bookkeeping', icon: 'BookOpen', sectionKey: 'bookkeeping' },
  { slug: 'tax-consulting', icon: 'Calculator', sectionKey: 'taxConsulting' },
  { slug: 'final-reports', icon: 'PieChart', sectionKey: 'finalReports' },
  { slug: 'business-analysis', icon: 'TrendingUp', sectionKey: 'businessAnalysis' },
  { slug: 'electronic-documents', icon: 'FileCheck', sectionKey: 'electronicDocuments' },
  { slug: 'real-estate', icon: 'Home', sectionKey: 'realEstate' },
  { slug: 'employment-agency-services', icon: 'Users', sectionKey: 'employmentAgency' },
  { slug: 'visa', icon: 'Globe', sectionKey: 'visa' },
];

function excerptFromHtml(html = '') {
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  if (text.length <= 160) return text;
  return `${text.slice(0, 157).trim()}...`;
}

function categoryFromLabel(label = ''): BlogCategory {
  const value = label.toLowerCase();
  if (value.includes('prakti') || value.includes('practical')) return 'practical';
  if (value.includes('savet') || value.includes('tip') || value.includes('ipucu')) return 'tips';
  if (value.includes('seo')) return 'seo';
  return 'educational';
}

function localizedFromPosts(slugs: Record<string, string>, field: 'title' | 'author' | 'content') {
  return {
    me: String(blogPostsData[slugs.me]?.[field] || ''),
    en: String(blogPostsData[slugs.en]?.[field] || ''),
    tr: String(blogPostsData[slugs.tr]?.[field] || ''),
  };
}

export function seedPosts(): BlogPost[] {
  return Object.entries(slugTranslations).map(([id, slugs]) => {
    const mePost = blogPostsData[slugs.me] || {};
    return {
      id,
      published: true,
      date: mePost.date || new Date().toISOString().slice(0, 10),
      readTime: Number(mePost.readTime || 1),
      image: mePost.image || '/images/1.jpg',
      category: categoryFromLabel(mePost.category),
      slugs: {
        me: slugs.me,
        en: slugs.en,
        tr: slugs.tr,
      },
      titles: localizedFromPosts(slugs, 'title'),
      excerpts: {
        me: excerptFromHtml(blogPostsData[slugs.me]?.content),
        en: excerptFromHtml(blogPostsData[slugs.en]?.content),
        tr: excerptFromHtml(blogPostsData[slugs.tr]?.content),
      },
      authors: localizedFromPosts(slugs, 'author'),
      contents: localizedFromPosts(slugs, 'content'),
    };
  });
}

function sectionCopy(localeMessages: typeof me, key: keyof typeof me.servicesSection) {
  const block = localeMessages.servicesSection[key] as { title?: string; description?: string };
  return {
    title: block?.title || '',
    description: block?.description || '',
  };
}

export function seedServices(): ServiceItem[] {
  return SERVICE_META.map((meta, index) => {
    const detail = servicesContent[meta.slug] || {};
    const shortMe = sectionCopy(me, meta.sectionKey);
    const shortEn = sectionCopy(en, meta.sectionKey);
    const shortTr = sectionCopy(tr, meta.sectionKey);
    return {
      id: meta.slug,
      slug: meta.slug,
      icon: meta.icon,
      order: index + 1,
      published: true,
      titles: {
        me: detail.titleMe || (me.services as Record<string, string>)[meta.slug] || shortMe.title,
        en: detail.titleEn || (en.services as Record<string, string>)[meta.slug] || shortEn.title,
        tr: detail.titleTr || (tr.services as Record<string, string>)[meta.slug] || shortTr.title,
      },
      shortDescriptions: {
        me: shortMe.description,
        en: shortEn.description,
        tr: shortTr.description,
      },
      descriptions: {
        me: detail.descriptionMe || shortMe.description,
        en: detail.descriptionEn || shortEn.description,
        tr: detail.descriptionTr || shortTr.description,
      },
      contents: {
        me: detail.contentMe || '',
        en: detail.contentEn || '',
        tr: detail.contentTr || '',
      },
    };
  });
}

export function seedSettings(): SiteSettings {
  return {
    contact: {
      email: 'racunovodstvo2020@hotmail.com',
      phone: '+382 69 842 843',
      address: '88 Hercegovačka, Podgorica',
      instagram: 'https://instagram.com/accounting_plus_mne',
      mapsUrl: 'https://maps.app.goo.gl/NsofWhWD3LGVeWNT9?g_st=ipc',
      hoursWeekdays: {
        me: me.contact.contactInfo.hours.weekdays,
        en: en.contact.contactInfo.hours.weekdays,
        tr: tr.contact.contactInfo.hours.weekdays,
      },
      hoursWeekend: {
        me: me.contact.contactInfo.hours.weekend,
        en: en.contact.contactInfo.hours.weekend,
        tr: tr.contact.contactInfo.hours.weekend,
      },
    },
    hero: {
      titles: {
        me: me.hero.title,
        en: en.hero.title,
        tr: tr.hero.title,
      },
      subtitles: {
        me: me.hero.subtitle,
        en: en.hero.subtitle,
        tr: tr.hero.subtitle,
      },
    },
    about: {
      titles: {
        me: me.about.title,
        en: en.about.title,
        tr: tr.about.title,
      },
      descriptions: {
        me: me.about.description,
        en: en.about.description,
        tr: tr.about.description,
      },
      stats: {
        partners: '30+',
        clients: '500+',
        experts: '10+',
        satisfaction: '98%',
        support: '24/7',
      },
    },
  };
}

export function createSeedStore(): CmsStore {
  return {
    posts: seedPosts(),
    services: seedServices(),
    settings: seedSettings(),
    messages: [],
  };
}
