import ServiceEditor from '@/components/admin/ServiceEditor';

export default async function NewServicePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <ServiceEditor locale={locale} />;
}
