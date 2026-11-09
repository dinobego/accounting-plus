import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';

export default async function LocaleNotFound() {
  const t = await getTranslations('seo');

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-24">
      <div className="text-center max-w-lg">
        <p className="text-6xl font-bold text-blue-600 mb-4">404</p>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{t('notFoundTitle')}</h1>
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700"
        >
          Accounting Plus
        </Link>
      </div>
    </div>
  );
}
