import { redirect } from 'next/navigation';
import AdminShell from '@/components/admin/AdminShell';
import { isAdminAuthenticated } from '@/lib/cms/auth';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!(await isAdminAuthenticated())) {
    redirect(`/${locale}/admin/login`);
  }

  return <AdminShell locale={locale}>{children}</AdminShell>;
}
