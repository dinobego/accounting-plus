'use client';

import { useEffect, useState } from 'react';
import type { SiteSettings } from './types';

export function usePublicSettings() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    fetch('/api/content/settings')
      .then((res) => (res.ok ? res.json() : null))
      .then(setSettings)
      .catch(() => setSettings(null));
  }, []);

  return settings;
}

export function usePublicServices<T = any>(locale: string) {
  const [services, setServices] = useState<T[]>([]);

  useEffect(() => {
    fetch(`/api/content/services?locale=${locale}`)
      .then((res) => (res.ok ? res.json() : []))
      .then(setServices)
      .catch(() => setServices([]));
  }, [locale]);

  return services;
}

export function usePublicPosts<T = any>(locale: string) {
  const [posts, setPosts] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/content/posts?locale=${locale}`)
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setPosts(data || []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, [locale]);

  return { posts, loading };
}
