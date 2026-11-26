'use client';

import { LOCALES, type Locale } from '@/lib/cms/types';

const LABELS: Record<Locale, string> = {
  me: 'Crnogorski',
  en: 'English',
  tr: 'Türkçe',
  sq: 'Shqip',
};

export default function LocaleTabs({
  value,
  onChange,
}: {
  value: Locale;
  onChange: (locale: Locale) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {LOCALES.map((locale) => (
        <button
          key={locale}
          type="button"
          onClick={() => onChange(locale)}
          className={`rounded-full px-4 py-2 text-sm font-semibold ${
            value === locale
              ? 'bg-blue-600 text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-blue-50'
          }`}
        >
          {LABELS[locale]}
        </button>
      ))}
    </div>
  );
}
