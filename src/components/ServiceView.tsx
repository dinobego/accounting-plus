'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { stripLeadingEmoji } from '@/lib/seo';

export default function ServiceView({
  locale,
  title,
  description,
  content,
}: {
  locale: string;
  title: string;
  description: string;
  content: string;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-5xl font-bold text-gray-900 mb-6">
            {stripLeadingEmoji(title)}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {description}
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
          <div className="service-content" dangerouslySetInnerHTML={{ __html: content }} />
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
