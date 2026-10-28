'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  BookOpen,
  Briefcase,
  Inbox,
  LayoutDashboard,
  LogOut,
  Settings,
} from 'lucide-react';

const links = [
  { href: '', label: 'Pregled', icon: LayoutDashboard },
  { href: '/blog', label: 'Blog', icon: BookOpen },
  { href: '/services', label: 'Usluge', icon: Briefcase },
  { href: '/settings', label: 'Podaci sajta', icon: Settings },
  { href: '/messages', label: 'Poruke', icon: Inbox },
];

export default function AdminShell({
  locale,
  children,
}: {
  locale: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const base = `/${locale}/admin`;

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push(`${base}/login`);
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-slate-200 bg-white px-4 py-6 md:block">
        <Link href={base} className="mb-8 block px-3">
          <p className="text-xs uppercase tracking-widest text-blue-600">Admin</p>
          <p className="text-lg font-bold">Accounting plus</p>
        </Link>
        <nav className="space-y-1">
          {links.map((link) => {
            const href = `${base}${link.href}`;
            const active =
              href === base ? pathname === base : pathname.startsWith(href);
            const Icon = link.icon;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  active
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-600 hover:bg-blue-50 hover:text-blue-700'
                }`}
              >
                <Icon size={18} />
                {link.label}
              </Link>
            );
          })}
        </nav>
        <button
          onClick={logout}
          className="mt-8 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600"
        >
          <LogOut size={18} />
          Odjava
        </button>
      </aside>

      <div className="md:pl-64">
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur md:hidden">
          <div className="flex gap-2 overflow-x-auto">
            {links.map((link) => (
              <Link
                key={link.href}
                href={`${base}${link.href}`}
                className="whitespace-nowrap rounded-full bg-slate-100 px-3 py-1.5 text-sm"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
      </div>
    </div>
  );
}
