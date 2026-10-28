'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const params = useParams();
  const router = useRouter();
  const locale = String(params.locale || 'en');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (!res.ok) {
      setError('Pogrešna lozinka.');
      return;
    }
    router.push(`/${locale}/admin`);
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl"
      >
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
          Accounting plus
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Admin prijava</h1>
        <p className="mt-2 text-slate-500">
          Unesite lozinku da uredite blog, usluge i podatke sajta.
        </p>
        <label className="mt-8 block text-sm font-medium text-slate-700">
          Lozinka
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
            required
          />
        </label>
        {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? 'Prijava...' : 'Prijavi se'}
        </button>
      </form>
    </div>
  );
}
