'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LocaleTabs from './LocaleTabs';
import { slugify } from '@/lib/cms/slugify';
import { emptyLocalized, type Locale, type ServiceItem } from '@/lib/cms/types';

const ICONS = [
  'Building2',
  'FileText',
  'BookOpen',
  'Calculator',
  'PieChart',
  'TrendingUp',
  'FileCheck',
  'Home',
  'Users',
  'Globe',
];

export default function ServiceEditor({
  locale,
  initial,
}: {
  locale: string;
  initial?: ServiceItem;
}) {
  const router = useRouter();
  const [tab, setTab] = useState<Locale>('me');
  const [saving, setSaving] = useState(false);
  const [service, setService] = useState<ServiceItem>(
    initial || {
      id: crypto.randomUUID(),
      slug: '',
      icon: 'Briefcase',
      order: 99,
      published: true,
      titles: emptyLocalized(),
      shortDescriptions: emptyLocalized(),
      descriptions: emptyLocalized(),
      contents: emptyLocalized(),
    }
  );

  function updateLocalized(
    field: 'titles' | 'shortDescriptions' | 'descriptions' | 'contents',
    value: string
  ) {
    setService((current) => ({
      ...current,
      [field]: { ...current[field], [tab]: value },
    }));
  }

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...service,
      slug: service.slug || slugify(service.titles.en || service.titles.me),
    };
    const res = await fetch(
      initial ? `/api/admin/services/${service.id}` : '/api/admin/services',
      {
        method: initial ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );
    setSaving(false);
    if (res.ok) {
      router.push(`/${locale}/admin/services`);
      router.refresh();
    }
  }

  async function onDelete() {
    if (!initial || !confirm('Obrisati ovu uslugu?')) return;
    await fetch(`/api/admin/services/${service.id}`, { method: 'DELETE' });
    router.push(`/${locale}/admin/services`);
    router.refresh();
  }

  return (
    <form onSubmit={onSave} className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-bold">{initial ? 'Uredi uslugu' : 'Nova usluga'}</h1>
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
          Slug
          <input
            value={service.slug}
            onChange={(e) => setService({ ...service, slug: e.target.value })}
            className="w-full rounded-xl border border-slate-200 px-3 py-2"
            placeholder="company-formation"
          />
        </label>
        <label className="space-y-2 text-sm font-medium">
          Ikona
          <select
            value={service.icon}
            onChange={(e) => setService({ ...service, icon: e.target.value })}
            className="w-full rounded-xl border border-slate-200 px-3 py-2"
          >
            {ICONS.map((icon) => (
              <option key={icon} value={icon}>
                {icon}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-2 text-sm font-medium">
          Redoslijed
          <input
            type="number"
            value={service.order}
            onChange={(e) => setService({ ...service, order: Number(e.target.value) })}
            className="w-full rounded-xl border border-slate-200 px-3 py-2"
          />
        </label>
        <label className="flex items-center gap-2 text-sm font-medium">
          <input
            type="checkbox"
            checked={service.published}
            onChange={(e) => setService({ ...service, published: e.target.checked })}
          />
          Vidljivo na sajtu
        </label>
      </div>

      <div className="space-y-4 rounded-2xl bg-white p-6 shadow-sm">
        <LocaleTabs value={tab} onChange={setTab} />
        <label className="block space-y-2 text-sm font-medium">
          Naslov
          <input
            value={service.titles[tab]}
            onChange={(e) => updateLocalized('titles', e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-3 py-2"
            required={tab === 'me'}
          />
        </label>
        <label className="block space-y-2 text-sm font-medium">
          Kratak opis (početna i meni)
          <textarea
            value={service.shortDescriptions[tab]}
            onChange={(e) => updateLocalized('shortDescriptions', e.target.value)}
            className="min-h-24 w-full rounded-xl border border-slate-200 px-3 py-2"
          />
        </label>
        <label className="block space-y-2 text-sm font-medium">
          Opis na stranici usluge
          <textarea
            value={service.descriptions[tab]}
            onChange={(e) => updateLocalized('descriptions', e.target.value)}
            className="min-h-24 w-full rounded-xl border border-slate-200 px-3 py-2"
          />
        </label>
        <label className="block space-y-2 text-sm font-medium">
          Detaljan sadržaj (HTML)
          <textarea
            value={service.contents[tab]}
            onChange={(e) => updateLocalized('contents', e.target.value)}
            className="min-h-72 w-full rounded-xl border border-slate-200 px-3 py-2 font-mono text-sm"
          />
        </label>
      </div>
    </form>
  );
}
