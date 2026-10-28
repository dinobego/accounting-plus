'use client';

import { useState } from 'react';
import LocaleTabs from './LocaleTabs';
import type { Locale, SiteSettings } from '@/lib/cms/types';

export default function SettingsForm({ initial }: { initial: SiteSettings }) {
  const [tab, setTab] = useState<Locale>('me');
  const [settings, setSettings] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const res = await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    });
    setSaving(false);
    if (res.ok) setSaved(true);
  }

  return (
    <form onSubmit={onSave} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Podaci sajta</h1>
          <p className="mt-1 text-slate-500">Kontakt, početna i brojke o agenciji.</p>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white disabled:opacity-60"
        >
          {saving ? 'Čuvam...' : saved ? 'Sačuvano' : 'Sačuvaj'}
        </button>
      </div>

      <section className="space-y-4 rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Kontakt</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm font-medium">
            Email
            <input
              value={settings.contact.email}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  contact: { ...settings.contact, email: e.target.value },
                })
              }
              className="w-full rounded-xl border border-slate-200 px-3 py-2"
            />
          </label>
          <label className="space-y-2 text-sm font-medium">
            Telefon
            <input
              value={settings.contact.phone}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  contact: { ...settings.contact, phone: e.target.value },
                })
              }
              className="w-full rounded-xl border border-slate-200 px-3 py-2"
            />
          </label>
          <label className="space-y-2 text-sm font-medium md:col-span-2">
            Adresa
            <input
              value={settings.contact.address}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  contact: { ...settings.contact, address: e.target.value },
                })
              }
              className="w-full rounded-xl border border-slate-200 px-3 py-2"
            />
          </label>
          <label className="space-y-2 text-sm font-medium">
            Instagram
            <input
              value={settings.contact.instagram}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  contact: { ...settings.contact, instagram: e.target.value },
                })
              }
              className="w-full rounded-xl border border-slate-200 px-3 py-2"
            />
          </label>
          <label className="space-y-2 text-sm font-medium">
            Google Maps link
            <input
              value={settings.contact.mapsUrl}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  contact: { ...settings.contact, mapsUrl: e.target.value },
                })
              }
              className="w-full rounded-xl border border-slate-200 px-3 py-2"
            />
          </label>
        </div>
        <LocaleTabs value={tab} onChange={setTab} />
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm font-medium">
            Radno vrijeme (radni dani)
            <input
              value={settings.contact.hoursWeekdays[tab]}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  contact: {
                    ...settings.contact,
                    hoursWeekdays: {
                      ...settings.contact.hoursWeekdays,
                      [tab]: e.target.value,
                    },
                  },
                })
              }
              className="w-full rounded-xl border border-slate-200 px-3 py-2"
            />
          </label>
          <label className="space-y-2 text-sm font-medium">
            Radno vrijeme (vikend)
            <input
              value={settings.contact.hoursWeekend[tab]}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  contact: {
                    ...settings.contact,
                    hoursWeekend: {
                      ...settings.contact.hoursWeekend,
                      [tab]: e.target.value,
                    },
                  },
                })
              }
              className="w-full rounded-xl border border-slate-200 px-3 py-2"
            />
          </label>
        </div>
      </section>

      <section className="space-y-4 rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Početna i O nama</h2>
        <LocaleTabs value={tab} onChange={setTab} />
        <label className="block space-y-2 text-sm font-medium">
          Hero naslov
          <input
            value={settings.hero.titles[tab]}
            onChange={(e) =>
              setSettings({
                ...settings,
                hero: {
                  ...settings.hero,
                  titles: { ...settings.hero.titles, [tab]: e.target.value },
                },
              })
            }
            className="w-full rounded-xl border border-slate-200 px-3 py-2"
          />
        </label>
        <label className="block space-y-2 text-sm font-medium">
          Hero podnaslov
          <textarea
            value={settings.hero.subtitles[tab]}
            onChange={(e) =>
              setSettings({
                ...settings,
                hero: {
                  ...settings.hero,
                  subtitles: { ...settings.hero.subtitles, [tab]: e.target.value },
                },
              })
            }
            className="min-h-24 w-full rounded-xl border border-slate-200 px-3 py-2"
          />
        </label>
        <label className="block space-y-2 text-sm font-medium">
          Naslov O nama
          <input
            value={settings.about.titles[tab]}
            onChange={(e) =>
              setSettings({
                ...settings,
                about: {
                  ...settings.about,
                  titles: { ...settings.about.titles, [tab]: e.target.value },
                },
              })
            }
            className="w-full rounded-xl border border-slate-200 px-3 py-2"
          />
        </label>
        <label className="block space-y-2 text-sm font-medium">
          Tekst O nama
          <textarea
            value={settings.about.descriptions[tab]}
            onChange={(e) =>
              setSettings({
                ...settings,
                about: {
                  ...settings.about,
                  descriptions: { ...settings.about.descriptions, [tab]: e.target.value },
                },
              })
            }
            className="min-h-28 w-full rounded-xl border border-slate-200 px-3 py-2"
          />
        </label>
        <div className="grid gap-4 md:grid-cols-5">
          {(
            [
              ['partners', 'Partneri'],
              ['clients', 'Klijenti'],
              ['experts', 'Stručnjaci'],
              ['satisfaction', 'Zadovoljstvo'],
              ['support', 'Podrška'],
            ] as const
          ).map(([key, label]) => (
            <label key={key} className="space-y-2 text-sm font-medium">
              {label}
              <input
                value={settings.about.stats[key]}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    about: {
                      ...settings.about,
                      stats: { ...settings.about.stats, [key]: e.target.value },
                    },
                  })
                }
                className="w-full rounded-xl border border-slate-200 px-3 py-2"
              />
            </label>
          ))}
        </div>
      </section>
    </form>
  );
}
