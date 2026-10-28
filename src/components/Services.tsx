'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { motion } from 'framer-motion';
import { 
  Building2, 
  FileText, 
  BookOpen, 
  Calculator, 
  PieChart, 
  TrendingUp, 
  FileCheck,
  Home,
  Users,
  Globe,
  ArrowRight,
  type LucideIcon
} from 'lucide-react';
import { usePublicServices } from '@/lib/cms/usePublicCms';

const ICONS: Record<string, LucideIcon> = {
  Building2,
  FileText,
  BookOpen,
  Calculator,
  PieChart,
  TrendingUp,
  FileCheck,
  Home,
  Users,
  Globe,
};

const FALLBACK_SERVICES = [
  { slug: 'company-formation', icon: 'Building2', title: '', shortDescription: '', key: 'companyFormation' },
  { slug: 'residence-work-permits', icon: 'FileText', title: '', shortDescription: '', key: 'permits' },
  { slug: 'bookkeeping', icon: 'BookOpen', title: '', shortDescription: '', key: 'bookkeeping' },
  { slug: 'tax-consulting', icon: 'Calculator', title: '', shortDescription: '', key: 'taxConsulting' },
  { slug: 'final-reports', icon: 'PieChart', title: '', shortDescription: '', key: 'finalReports' },
  { slug: 'business-analysis', icon: 'TrendingUp', title: '', shortDescription: '', key: 'businessAnalysis' },
  { slug: 'electronic-documents', icon: 'FileCheck', title: '', shortDescription: '', key: 'electronicDocuments' },
  { slug: 'real-estate', icon: 'Home', title: '', shortDescription: '', key: 'realEstate' },
  { slug: 'employment-agency-services', icon: 'Users', title: '', shortDescription: '', key: 'employmentAgency' },
  { slug: 'visa', icon: 'Globe', title: '', shortDescription: '', key: 'visa' },
];

export default function Services() {
  const t = useTranslations('servicesSection');
  const locale = useLocale();
  const cmsServices = usePublicServices<{
    slug: string;
    icon: string;
    title: string;
    shortDescription: string;
  }>(locale);
  const services = cmsServices.length
    ? cmsServices
    : FALLBACK_SERVICES.map((service) => ({
        ...service,
        title: t(`${service.key}.title`),
        shortDescription: t(`${service.key}.description`),
      }));

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = ICONS[service.icon] || Building2;
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={`/services/${service.slug}`}
                  className="block group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer h-full overflow-hidden border border-gray-100"
                >
                  {/* Animated Corner Gradients */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-500 group-hover:scale-150" />
                  <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-tr from-indigo-500 to-purple-600 opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-500 group-hover:scale-150" />
                  
                  <div className="flex flex-col h-full relative z-10">
                    <div className="mb-4 p-3 bg-blue-100 rounded-xl w-fit group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-300">
                      <Icon className="text-blue-600 group-hover:text-white transition-colors duration-300" size={32} />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 flex-grow">
                      {service.shortDescription}
                    </p>
                    
                    <div className="flex items-center text-blue-600 font-semibold group-hover:gap-2 transition-all duration-300">
                      <span>{t('learnMore')}</span>
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
