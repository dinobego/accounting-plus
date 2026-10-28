'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useParams } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { servicesContent } from '@/lib/cms/legacyServices';

type PublicService = {
  title: string;
  description: string;
  content: string;
};

function legacyToPublic(slug: string, locale: string): PublicService | null {
  const content = servicesContent[slug];
  if (!content) return null;
  if (locale === 'me') {
    return { title: content.titleMe, description: content.descriptionMe, content: content.contentMe };
  }
  if (locale === 'tr') {
    return { title: content.titleTr, description: content.descriptionTr, content: content.contentTr };
  }
  return { title: content.titleEn, description: content.descriptionEn, content: content.contentEn };
}

export default function ServicePage() {
  const params = useParams();
  const locale = params.locale as string;
  const slug = params.slug as string;
  const [content, setContent] = useState<PublicService | null>(legacyToPublic(slug, locale));
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch(`/api/content/services?slug=${slug}&locale=${locale}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          setContent({
            title: data.title,
            description: data.description,
            content: data.content,
          });
        }
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, [slug, locale]);

  if (!content && loaded) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {locale === 'me' ? 'Usluga nije pronađena' : locale === 'tr' ? 'Hizmet bulunamadı' : 'Service not found'}
          </h1>
          <Link href="/" className="text-blue-600 hover:text-blue-700 font-semibold">
            {locale === 'me' ? 'Nazad' : locale === 'tr' ? 'Geri dön' : 'Back'}
          </Link>
        </div>
      </div>
    );
  }

  if (!content) {
    return <div className="min-h-screen pt-32 text-center text-gray-500">Učitavanje...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-5xl font-bold text-gray-900 mb-6">
            {content.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {content.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-16"
        >
          <style>{`
            .service-content h3 {
              font-size: 1.5rem;
              font-weight: bold;
              color: #111827;
              margin-top: 1.5rem;
              margin-bottom: 1rem;
              border-bottom: 3px solid #2563eb;
              padding-bottom: 0.75rem;
            }
            .service-content p {
              color: #4b5563;
              line-height: 1.8;
              margin-bottom: 1rem;
              font-size: 1.1rem;
            }
            .service-content ul {
              list-style: none;
              padding: 0;
              margin-bottom: 1.5rem;
            }
            .service-content li {
              color: #374151;
              margin-bottom: 0.75rem;
              padding-left: 2rem;
              position: relative;
              font-size: 1.05rem;
              line-height: 1.6;
            }
            .service-content li:before {
              content: "✓";
              position: absolute;
              left: 0;
              color: #2563eb;
              font-weight: bold;
              font-size: 1.3rem;
            }
          `}</style>
          <div className="service-content" dangerouslySetInnerHTML={{ __html: content.content }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-6">
            {locale === 'me' ? 'Spremni da počnete?' : locale === 'tr' ? 'Başlamaya Hazır Mısınız?' : 'Ready to Get Started?'}
          </h2>
          <p className="text-lg mb-8 opacity-90">
            {locale === 'me'
              ? 'Kontaktirajte nas i dogovorite se za konsultacije.'
              : locale === 'tr'
                ? 'Bize ulaşın ve danışmanlık için randevu alın.'
                : 'Contact us and schedule a consultation.'}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-all hover:scale-105"
          >
            <span>{locale === 'me' ? 'Kontaktiraj nas' : locale === 'tr' ? 'İletişime geç' : 'Contact Us'}</span>
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
