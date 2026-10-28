import { notFound } from 'next/navigation';
import BlogEditor from '@/components/admin/BlogEditor';
import { getPostById } from '@/lib/cms/store';

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const post = getPostById(id);
  if (!post) notFound();
  return <BlogEditor locale={locale} initial={post} />;
}
