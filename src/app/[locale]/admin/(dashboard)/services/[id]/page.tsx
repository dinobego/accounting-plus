import { notFound } from 'next/navigation';
import ServiceEditor from '@/components/admin/ServiceEditor';
import { getServiceById } from '@/lib/cms/store';

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const service = getServiceById(id);
  if (!service) notFound();
  return <ServiceEditor locale={locale} initial={service} />;
}
