import BlogEditor from '@/components/admin/BlogEditor';

export default async function NewBlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <BlogEditor locale={locale} />;
}
