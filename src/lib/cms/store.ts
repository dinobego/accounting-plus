import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { createSeedStore } from './seed';
import type { BlogPost, CmsStore, ContactMessage, ServiceItem, SiteSettings } from './types';

const FILE_CANDIDATES = [
  path.join(process.cwd(), 'data', 'cms.json'),
  path.join('/tmp', 'accounting-plus-cms.json'),
];

let memoryStore: CmsStore | null = null;
let writeQueue: Promise<void> = Promise.resolve();

function cloneStore(store: CmsStore): CmsStore {
  return structuredClone(store);
}

function loadFromDisk(): CmsStore | null {
  for (const file of FILE_CANDIDATES) {
    try {
      if (!existsSync(file)) continue;
      const parsed = JSON.parse(readFileSync(file, 'utf8')) as CmsStore;
      return {
        posts: parsed.posts || [],
        services: parsed.services || [],
        settings: parsed.settings || createSeedStore().settings,
        messages: parsed.messages || [],
      };
    } catch {
      // Read-only hosts and missing files should fall through to seed data.
    }
  }
  return null;
}

function saveToDisk(store: CmsStore) {
  const payload = JSON.stringify(store);
  for (const file of FILE_CANDIDATES) {
    try {
      mkdirSync(path.dirname(file), { recursive: true });
      writeFileSync(file, payload, 'utf8');
      return;
    } catch {
      // Vercel production filesystem is read-only except /tmp.
    }
  }
}

function ensureStore(): CmsStore {
  if (memoryStore) return memoryStore;
  memoryStore = loadFromDisk() || createSeedStore();
  saveToDisk(memoryStore);
  return memoryStore;
}

function persist(store: CmsStore) {
  memoryStore = store;
  writeQueue = writeQueue.then(() => {
    saveToDisk(store);
  });
  return writeQueue;
}

export function readStore(): CmsStore {
  try {
    return cloneStore(ensureStore());
  } catch {
    memoryStore = createSeedStore();
    return cloneStore(memoryStore);
  }
}

export async function writeStore(store: CmsStore) {
  await persist(store);
  return store;
}

export function getPosts() {
  return readStore().posts.sort((a, b) => b.date.localeCompare(a.date));
}

export function getPublishedPosts() {
  return getPosts().filter((post) => post.published);
}

export function getPostById(id: string) {
  return readStore().posts.find((post) => post.id === id) || null;
}

export function getPostBySlug(slug: string) {
  return (
    getPublishedPosts().find((post) =>
      Object.values(post.slugs).includes(slug)
    ) || null
  );
}

export async function savePost(post: BlogPost) {
  const store = readStore();
  const index = store.posts.findIndex((item) => item.id === post.id);
  if (index >= 0) {
    store.posts[index] = post;
  } else {
    store.posts.unshift(post);
  }
  await writeStore(store);
  return post;
}

export async function deletePost(id: string) {
  const store = readStore();
  store.posts = store.posts.filter((post) => post.id !== id);
  await writeStore(store);
}

export function getServices() {
  return readStore().services.sort((a, b) => a.order - b.order);
}

export function getPublishedServices() {
  return getServices().filter((service) => service.published);
}

export function getServiceById(id: string) {
  return readStore().services.find((service) => service.id === id) || null;
}

export function getServiceBySlug(slug: string) {
  return getPublishedServices().find((service) => service.slug === slug) || null;
}

export async function saveService(service: ServiceItem) {
  const store = readStore();
  const index = store.services.findIndex((item) => item.id === service.id);
  if (index >= 0) {
    store.services[index] = service;
  } else {
    store.services.push(service);
  }
  await writeStore(store);
  return service;
}

export async function deleteService(id: string) {
  const store = readStore();
  store.services = store.services.filter((service) => service.id !== id);
  await writeStore(store);
}

export function getSettings(): SiteSettings {
  return readStore().settings;
}

export async function saveSettings(settings: SiteSettings) {
  const store = readStore();
  store.settings = settings;
  await writeStore(store);
  return settings;
}

export function getMessages() {
  return readStore().messages.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function addMessage(input: Omit<ContactMessage, 'id' | 'createdAt' | 'read'>) {
  const store = readStore();
  const message: ContactMessage = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    read: false,
    ...input,
  };
  store.messages.unshift(message);
  await writeStore(store);
  return message;
}

export async function updateMessage(id: string, patch: Partial<ContactMessage>) {
  const store = readStore();
  const index = store.messages.findIndex((item) => item.id === id);
  if (index < 0) return null;
  store.messages[index] = { ...store.messages[index], ...patch, id };
  await writeStore(store);
  return store.messages[index];
}

export async function deleteMessage(id: string) {
  const store = readStore();
  store.messages = store.messages.filter((message) => message.id !== id);
  await writeStore(store);
}
