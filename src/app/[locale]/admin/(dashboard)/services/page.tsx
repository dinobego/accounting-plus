import Link from 'next/link';
import { getServices } from '@/lib/cms/store';

export default async function AdminServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const services = getServices();
  const base = `/${locale}/admin/services`;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Usluge</h1>
          <p className="mt-1 text-slate-500">Mijenjajte nazive, opise i redoslijed.</p>
        </div>
        <Link
          href={`${base}/new`}
          className="rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
        >
          Nova usluga
        </Link>
      </div>
      <div className="space-y-3">
        {services.map((service) => (
          <Link
            key={service.id}
            href={`${base}/${service.id}`}
            className="flex items-center justify-between rounded-2xl bg-white px-5 py-4 shadow-sm hover:shadow-md"
          >
            <div>
              <p className="font-semibold">{service.titles.me || service.titles.en}</p>
              <p className="text-sm text-slate-500">{service.slug}</p>
            </div>
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                service.published ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
              }`}
            >
              {service.published ? 'Vidljivo' : 'Sakriveno'}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
