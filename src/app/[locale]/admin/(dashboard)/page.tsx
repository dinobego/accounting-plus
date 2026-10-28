import Link from 'next/link';
import { getMessages, getPosts, getServices } from '@/lib/cms/store';

export default async function AdminDashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const posts = getPosts();
  const services = getServices();
  const messages = getMessages();
  const unread = messages.filter((item) => !item.read).length;
  const base = `/${locale}/admin`;

  const cards = [
    { label: 'Blog članci', value: posts.length, href: `${base}/blog` },
    { label: 'Usluge', value: services.length, href: `${base}/services` },
    { label: 'Nove poruke', value: unread, href: `${base}/messages` },
    { label: 'Ukupno poruka', value: messages.length, href: `${base}/messages` },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Pregled</h1>
        <p className="mt-2 text-slate-500">
          Uredite sadržaj sajta bez diranja koda.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <p className="text-sm text-slate-500">{card.label}</p>
            <p className="mt-2 text-3xl font-bold text-blue-700">{card.value}</p>
          </Link>
        ))}
      </div>
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Posljednje poruke</h2>
        <div className="mt-4 space-y-3">
          {messages.slice(0, 5).map((message) => (
            <div key={message.id} className="rounded-xl bg-slate-50 p-4">
              <p className="font-semibold">{message.name}</p>
              <p className="text-sm text-slate-500">{message.email}</p>
              <p className="mt-2 line-clamp-2 text-slate-700">{message.message}</p>
            </div>
          ))}
          {messages.length === 0 ? (
            <p className="text-slate-500">Još nema poruka sa kontakt forme.</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
