'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { ContactMessage } from '@/lib/cms/types';

export default function MessagesPanel({ initial }: { initial: ContactMessage[] }) {
  const router = useRouter();
  const [messages, setMessages] = useState(initial);

  async function markRead(id: string, read: boolean) {
    await fetch(`/api/admin/messages/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ read }),
    });
    setMessages((current) =>
      current.map((item) => (item.id === id ? { ...item, read } : item))
    );
    router.refresh();
  }

  async function remove(id: string) {
    if (!confirm('Obrisati poruku?')) return;
    await fetch(`/api/admin/messages/${id}`, { method: 'DELETE' });
    setMessages((current) => current.filter((item) => item.id !== id));
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Poruke</h1>
        <p className="mt-1 text-slate-500">Upiti sa kontakt forme.</p>
      </div>
      <div className="space-y-3">
        {messages.map((message) => (
          <article
            key={message.id}
            className={`rounded-2xl bg-white p-5 shadow-sm ${
              message.read ? 'opacity-80' : 'ring-2 ring-blue-100'
            }`}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="font-semibold">{message.name}</h2>
                <p className="text-sm text-slate-500">
                  {message.email} {message.phone ? `· ${message.phone}` : ''}
                </p>
                <p className="text-xs text-slate-400">
                  {new Date(message.createdAt).toLocaleString('sr-ME')}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => markRead(message.id, !message.read)}
                  className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm"
                >
                  {message.read ? 'Nepročitano' : 'Pročitano'}
                </button>
                <button
                  onClick={() => remove(message.id)}
                  className="rounded-lg bg-red-50 px-3 py-1.5 text-sm text-red-600"
                >
                  Obriši
                </button>
              </div>
            </div>
            <p className="mt-4 whitespace-pre-wrap text-slate-700">{message.message}</p>
          </article>
        ))}
        {messages.length === 0 ? (
          <p className="rounded-2xl bg-white p-6 text-slate-500">Nema poruka.</p>
        ) : null}
      </div>
    </div>
  );
}
