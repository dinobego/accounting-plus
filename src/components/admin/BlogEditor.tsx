'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ImageField from './ImageField';
import LocaleTabs from './LocaleTabs';
import { slugify } from '@/lib/cms/slugify';
import { emptyLocalized, type BlogCategory, type BlogPost, type Locale } from '@/lib/cms/types';

const CATEGORIES: { id: BlogCategory; label: string }[] = [
  { id: 'educational', label: 'Edukativni' },
  { id: 'practical', label: 'Praktični' },
  { id: 'tips', label: 'Savjeti' },
  { id: 'seo', label: 'SEO' },
];

export default function BlogEditor({
  locale,
  initial,
}: {
  locale: string;
  initial?: BlogPost;
}) {
  const router = useRouter();
  const [tab, setTab] = useState<Locale>('me');
  const [saving, setSaving] = useState(false);
  const [post, setPost] = useState<BlogPost>(
    initial || {
      id: crypto.randomUUID(),
      published: true,
      date: new Date().toISOString().slice(0, 10),
      readTime: 2,
      image: '/images/1.jpg',
      category: 'educational',
      slugs: emptyLocalized(),
      titles: emptyLocalized(),
      excerpts: emptyLocalized(),
      authors: emptyLocalized('Accounting plus tim'),
      contents: emptyLocalized(),
    }
  );

  function updateLocalized(
    field: 'slugs' | 'titles' | 'excerpts' | 'authors' | 'contents',
    value: string
  ) {
    setPost((current) => ({
      ...current,
      [field]: { ...current[field], [tab]: value },
    }));
  }

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...post,
      slugs: {
        me: post.slugs.me || slugify(post.titles.me),
        en: post.slugs.en || slugify(post.titles.en),
        tr: post.slugs.tr || slugify(post.titles.tr),
      },
    };
    const res = await fetch(
      initial ? `/api/admin/posts/${post.id}` : '/api/admin/posts',
      {
        method: initial ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );
    setSaving(false);
    if (res.ok) {
      router.push(`/${locale}/admin/blog`);
      router.refresh();
    }
  }

  async function onDelete() {
    if (!initial || !confirm('Obrisati ovaj članak?')) return;
    await fetch(`/api/admin/posts/${post.id}`, { method: 'DELETE' });
    router.push(`/${locale}/admin/blog`);
    router.refresh();
  }

  return (
    <form onSubmit={onSave} className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-bold">{initial ? 'Uredi članak' : 'Novi članak'}</h1>
        <div className="flex gap-2">
          {initial ? (
            <button
              type="button"
              onClick={onDelete}
              className="rounded-xl bg-red-50 px-4 py-2 font-semibold text-red-600"
            >
              Obriši
            </button>
          ) : null}
          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white disabled:opacity-60"
          >
            {saving ? 'Čuvam...' : 'Sačuvaj'}
          </button>
        </div>
      </div>

      <div className="grid gap-4 rounded-2xl bg-white p-6 shadow-sm md:grid-cols-2">
        <label className="space-y-2 text-sm font-medium">
          Datum
          <input
            type="date"
            value={post.date}
            onChange={(e) => setPost({ ...post, date: e.target.value })}
            className="w-full rounded-xl border border-slate-200 px-3 py-2"
          />
        </label>
        <label className="space-y-2 text-sm font-medium">
          Vrijeme čitanja (min)
          <input
            type="number"
            min={1}
            value={post.readTime}
            onChange={(e) => setPost({ ...post, readTime: Number(e.target.value) })}
            className="w-full rounded-xl border border-slate-200 px-3 py-2"
          />
        </label>
        <label className="space-y-2 text-sm font-medium">
          Kategorija
          <select
            value={post.category}
            onChange={(e) => setPost({ ...post, category: e.target.value as BlogCategory })}
            className="w-full rounded-xl border border-slate-200 px-3 py-2"
          >
            {CATEGORIES.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm font-medium">
          <input
            type="checkbox"
            checked={post.published}
            onChange={(e) => setPost({ ...post, published: e.target.checked })}
          />
          Objavljeno
        </label>
        <div className="md:col-span-2">
          <ImageField
            label="Slika"
            value={post.image}
            onChange={(image) => setPost({ ...post, image })}
          />
        </div>
      </div>

      <div className="space-y-4 rounded-2xl bg-white p-6 shadow-sm">
        <LocaleTabs value={tab} onChange={setTab} />
        <label className="block space-y-2 text-sm font-medium">
          Naslov
          <input
            value={post.titles[tab]}
            onChange={(e) => updateLocalized('titles', e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-3 py-2"
            required={tab === 'me'}
          />
        </label>
        <label className="block space-y-2 text-sm font-medium">
          Slug
          <input
            value={post.slugs[tab]}
            onChange={(e) => updateLocalized('slugs', e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-3 py-2"
            placeholder={slugify(post.titles[tab])}
          />
        </label>
        <label className="block space-y-2 text-sm font-medium">
          Autor
          <input
            value={post.authors[tab]}
            onChange={(e) => updateLocalized('authors', e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-3 py-2"
          />
        </label>
        <label className="block space-y-2 text-sm font-medium">
          Kratak opis
          <textarea
            value={post.excerpts[tab]}
            onChange={(e) => updateLocalized('excerpts', e.target.value)}
            className="min-h-24 w-full rounded-xl border border-slate-200 px-3 py-2"
          />
        </label>
        <label className="block space-y-2 text-sm font-medium">
          Sadržaj (HTML)
          <textarea
            value={post.contents[tab]}
            onChange={(e) => updateLocalized('contents', e.target.value)}
            className="min-h-72 w-full rounded-xl border border-slate-200 px-3 py-2 font-mono text-sm"
          />
        </label>
      </div>
    </form>
  );
}
