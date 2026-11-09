import { seedSettings } from '@/lib/cms/seed';
import {
  getPostBySlug,
  getPublishedPosts,
  getPublishedServices,
  getServiceBySlug,
  getSettings,
} from '@/lib/cms/store';
import type { BlogPost, ServiceItem, SiteSettings } from '@/lib/cms/types';

export async function loadPublishedPosts(): Promise<BlogPost[]> {
  try {
    return (await getPublishedPosts()).filter((post) => post.published);
  } catch {
    return [];
  }
}

export async function loadPublishedServices(): Promise<ServiceItem[]> {
  try {
    return (await getPublishedServices()).filter((service) => service.published !== false);
  } catch {
    return [];
  }
}

export async function loadPublishedPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const post = await getPostBySlug(slug);
    return post?.published ? post : null;
  } catch {
    return null;
  }
}

export async function loadPublishedServiceBySlug(slug: string): Promise<ServiceItem | null> {
  try {
    const service = await getServiceBySlug(slug);
    return service && service.published !== false ? service : null;
  } catch {
    return null;
  }
}

export async function loadPublicSettings(): Promise<SiteSettings> {
  try {
    return await getSettings();
  } catch {
    return seedSettings();
  }
}
