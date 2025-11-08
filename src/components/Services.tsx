'use client';

import { useTranslations } from 'next-intl';
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
  ArrowRight 
} from 'lucide-react';

const services = [
  { 
    key: 'companyFormation', 
    icon: Building2, 
    href: '/services/company-formation'
  },
  { 
    key: 'permits', 
    icon: FileText, 
    href: '/services/residence-work-permits'
  },
  { 
    key: 'bookkeeping', 
    icon: BookOpen, 
    href: '/services/bookkeeping'
  },
  { 
    key: 'taxConsulting', 
    icon: Calculator, 
    href: '/services/tax-consulting'
  },
  { 
    key: 'finalReports', 
    icon: PieChart, 
    href: '/services/final-reports'
  },
  { 
    key: 'businessAnalysis', 
    icon: TrendingUp, 
    href: '/services/business-analysis'
  },
  { 
    key: 'electronicDocuments', 
    icon: FileCheck, 
    href: '/services/electronic-documents'
  },
  { 
    key: 'realEstate', 
    icon: Home, 
    href: '/services/real-estate'
  },
  { 
    key: 'employmentAgency', 
    icon: Users, 
    href: '/services/employment-agency-services'
  },
  { 
    key: 'visa', 
    icon: Globe, 
    href: '/services/visa'
  }
];

export default function Services() {
  const t = useTranslations('servicesSection');

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
            const Icon = service.icon;
            return (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={service.href}
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
                      {t(`${service.key}.title`)}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 flex-grow">
                      {t(`${service.key}.description`)}
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
