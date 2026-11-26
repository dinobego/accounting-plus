import { createSeedStore, seedPosts, seedServices, seedSettings } from './seed';
import { getCmsSecret, getSupabase } from './supabase';
import type { BlogPost, CmsStore, ContactMessage, Localized, ServiceItem, SiteSettings } from './types';

let seedPromise: Promise<void> | null = null;
let seededPosts: BlogPost[] | null = null;
let seededServices: ServiceItem[] | null = null;

function seedPostList() {
  seededPosts ??= seedPosts();
  return seededPosts;
}

function seedServiceList() {
  seededServices ??= seedServices();
  return seededServices;
}

function mergeLocalized(current: Partial<Localized> | null | undefined, fallback?: Partial<Localized>): Localized {
  const source = current || {};
  const sq = typeof source.sq === 'string' && source.sq.trim() ? source.sq : fallback?.sq || '';
  return {
    me: source.me ?? fallback?.me ?? '',
    en: source.en ?? fallback?.en ?? '',
    tr: source.tr ?? fallback?.tr ?? '',
    sq,
  };
}

function withAlbanianPost(post: BlogPost): BlogPost {
  const slugs = post.slugs || ({} as BlogPost['slugs']);
  const seeded = seedPostList().find(
    (item) =>
      item.id === post.id ||
      item.slugs.me === slugs.me ||
      Object.values(slugs).filter(Boolean).some((slug) => Object.values(item.slugs).includes(slug))
  );
  return {
    ...post,
    slugs: mergeLocalized(slugs, seeded?.slugs),
    titles: mergeLocalized(post.titles, seeded?.titles),
    excerpts: mergeLocalized(post.excerpts, seeded?.excerpts),
    authors: mergeLocalized(post.authors, seeded?.authors),
    contents: mergeLocalized(post.contents, seeded?.contents),
  };
}

function withAlbanianService(service: ServiceItem): ServiceItem {
  const seeded = seedServiceList().find((item) => item.slug === service.slug || item.id === service.id);
  return {
    ...service,
    titles: mergeLocalized(service.titles, seeded?.titles),
    shortDescriptions: mergeLocalized(service.shortDescriptions, seeded?.shortDescriptions),
    descriptions: mergeLocalized(service.descriptions, seeded?.descriptions),
    contents: mergeLocalized(service.contents, seeded?.contents),
  };
}

function withAlbanianSettings(settings: SiteSettings): SiteSettings {
  const seeded = seedSettings();
  return {
    ...settings,
    contact: {
      ...settings.contact,
      hoursWeekdays: mergeLocalized(settings.contact?.hoursWeekdays, seeded.contact.hoursWeekdays),
      hoursWeekend: mergeLocalized(settings.contact?.hoursWeekend, seeded.contact.hoursWeekend),
    },
    hero: {
      titles: mergeLocalized(settings.hero?.titles, seeded.hero.titles),
      subtitles: mergeLocalized(settings.hero?.subtitles, seeded.hero.subtitles),
    },
    about: {
      ...settings.about,
      titles: mergeLocalized(settings.about?.titles, seeded.about.titles),
      descriptions: mergeLocalized(settings.about?.descriptions, seeded.about.descriptions),
      stats: settings.about?.stats || seeded.about.stats,
    },
  };
}

function emptyStore(): CmsStore {
  return {
    posts: [],
    services: [],
    settings: createSeedStore().settings,
    messages: [],
  };
}

function asStore(data: unknown): CmsStore {
  const value = (data || {}) as Partial<CmsStore>;
  const settings = value.settings || emptyStore().settings;
  return {
    posts: (value.posts || []).map(withAlbanianPost),
    services: (value.services || []).map(withAlbanianService),
    settings: withAlbanianSettings(settings),
    messages: value.messages || [],
  };
}

async function loadAdminStore(): Promise<CmsStore> {
  const supabase = getSupabase();
  const { data, error } = await supabase.rpc('cms_load_admin', {
    secret: getCmsSecret(),
  });
  if (error) throw error;
  return asStore(data);
}

async function saveAdminStore(store: CmsStore) {
  const supabase = getSupabase();
  const { data, error } = await supabase.rpc('cms_save_admin', {
    secret: getCmsSecret(),
    payload: store,
  });
  if (error) throw error;
  return asStore(data);
}

async function ensureSeeded() {
  if (seedPromise) return seedPromise;
  seedPromise = (async () => {
    const supabase = getSupabase();
    const [postsResult, servicesResult] = await Promise.all([
      supabase.from('posts').select('id', { count: 'exact', head: true }),
      supabase.from('services').select('id', { count: 'exact', head: true }),
    ]);
    if (postsResult.error) throw postsResult.error;
    if (servicesResult.error) throw servicesResult.error;
    // Do not re-seed when any CMS rows remain (unpublished/deleted leftovers included).
    if ((postsResult.count || 0) > 0 || (servicesResult.count || 0) > 0) return;
    await saveAdminStore(createSeedStore());
  })().catch((error) => {
    seedPromise = null;
    throw error;
  });
  return seedPromise;
}

export async function readStore(): Promise<CmsStore> {
  await ensureSeeded();
  return loadAdminStore();
}

export async function writeStore(store: CmsStore) {
  return saveAdminStore(store);
}

export async function getPosts() {
  const store = await readStore();
  return store.posts.sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPublishedPosts() {
  await ensureSeeded();
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('posts')
    .select('id, published, date, read_time, image, category, slugs, titles, excerpts, authors, contents')
    .eq('published', true)
    .order('date', { ascending: false });
  if (error) throw error;
  const posts = (data || []).map((row) => ({
    id: row.id,
    published: row.published,
    date: row.date,
    readTime: row.read_time,
    image: row.image,
    category: row.category,
    slugs: row.slugs,
    titles: row.titles,
    excerpts: row.excerpts,
    authors: row.authors,
    contents: row.contents,
  })) as BlogPost[];
  return posts.map(withAlbanianPost);
}

export async function getPostById(id: string) {
  const posts = await getPosts();
  return posts.find((post) => post.id === id) || null;
}

export async function getPostBySlug(slug: string) {
  const posts = await getPublishedPosts();
  return posts.find((post) => Object.values(post.slugs).includes(slug)) || null;
}

export async function savePost(post: BlogPost) {
  const store = await readStore();
  const index = store.posts.findIndex((item) => item.id === post.id);
  if (index >= 0) store.posts[index] = post;
  else store.posts.unshift(post);
  await writeStore(store);
  return post;
}

export async function deletePost(id: string) {
  const store = await readStore();
  store.posts = store.posts.filter((post) => post.id !== id);
  await writeStore(store);
}

export async function getServices() {
  const store = await readStore();
  return store.services.sort((a, b) => a.order - b.order);
}

export async function getPublishedServices() {
  await ensureSeeded();
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('services')
    .select('id, slug, icon, sort_order, published, titles, short_descriptions, descriptions, contents')
    .eq('published', true)
    .order('sort_order', { ascending: true });
  if (error) throw error;
  const services = (data || []).map((row) => ({
    id: row.id,
    slug: row.slug,
    icon: row.icon,
    order: row.sort_order,
    published: row.published,
    titles: row.titles,
    shortDescriptions: row.short_descriptions,
    descriptions: row.descriptions,
    contents: row.contents,
  })) as ServiceItem[];
  return services.map(withAlbanianService);
}

export async function getServiceById(id: string) {
  const services = await getServices();
  return services.find((service) => service.id === id) || null;
}

export async function getServiceBySlug(slug: string) {
  const services = await getPublishedServices();
  return services.find((service) => service.slug === slug) || null;
}

export async function saveService(service: ServiceItem) {
  const store = await readStore();
  const index = store.services.findIndex((item) => item.id === service.id);
  if (index >= 0) store.services[index] = service;
  else store.services.push(service);
  await writeStore(store);
  return service;
}

export async function deleteService(id: string) {
  const store = await readStore();
  store.services = store.services.filter((service) => service.id !== id);
  await writeStore(store);
}

export async function getSettings(): Promise<SiteSettings> {
  await ensureSeeded();
  const supabase = getSupabase();
  const { data, error } = await supabase.from('site_settings').select('data').eq('id', 1).maybeSingle();
  if (error) throw error;
  return withAlbanianSettings((data?.data || emptyStore().settings) as SiteSettings);
}

export async function saveSettings(settings: SiteSettings) {
  const store = await readStore();
  store.settings = settings;
  await writeStore(store);
  return settings;
}

export async function getMessages() {
  const store = await readStore();
  return store.messages.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function addMessage(input: Omit<ContactMessage, 'id' | 'createdAt' | 'read'>) {
  const supabase = getSupabase();
  const message: ContactMessage = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    read: false,
    ...input,
  };
  const { error } = await supabase.from('contact_messages').insert({
    id: message.id,
    name: message.name,
    email: message.email,
    phone: message.phone,
    message: message.message,
    read: false,
    created_at: message.createdAt,
  });
  if (error) throw error;
  return message;
}

export async function updateMessage(id: string, patch: Partial<ContactMessage>) {
  const store = await readStore();
  const index = store.messages.findIndex((item) => item.id === id);
  if (index < 0) return null;
  store.messages[index] = { ...store.messages[index], ...patch, id };
  await writeStore(store);
  return store.messages[index];
}

export async function deleteMessage(id: string) {
  const store = await readStore();
  store.messages = store.messages.filter((message) => message.id !== id);
  await writeStore(store);
}
