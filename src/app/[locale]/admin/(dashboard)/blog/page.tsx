import Link from 'next/link';
import { getPosts } from '@/lib/cms/store';

export default async function AdminBlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const posts = await getPosts();
  const base = `/${locale}/admin/blog`;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Blog</h1>
          <p className="mt-1 text-slate-500">Dodajte, uredite ili sakrijte članke.</p>
        </div>
        <Link
          href={`${base}/new`}
          className="rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
        >
          Novi članak
        </Link>
      </div>
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-sm text-slate-500">
            <tr>
              <th className="px-4 py-3">Naslov</th>
              <th className="px-4 py-3">Datum</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-t border-slate-100">
                <td className="px-4 py-3">
                  <Link href={`${base}/${post.id}`} className="font-medium hover:text-blue-600">
                    {post.titles.me || post.titles.en || post.id}
                  </Link>
                </td>
                <td className="px-4 py-3 text-slate-500">{post.date}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      post.published ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {post.published ? 'Objavljeno' : 'Skica'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
