'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Award, Shield, Heart, TrendingUp, Users } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
  const t = useTranslations('about');

  const values = [
    {
      icon: Award,
      title: t('values.expertise.title'),
      description: t('values.expertise.description')
    },
    {
      icon: Shield,
      title: t('values.trust.title'),
      description: t('values.trust.description')
    },
    {
      icon: Heart,
      title: t('values.dedication.title'),
      description: t('values.dedication.description')
    },
    {
      icon: TrendingUp,
      title: t('values.growth.title'),
      description: t('values.growth.description')
    }
  ];

  const stats = [
    { number: '500+', label: t('stats.clients') },
    { number: '15+', label: t('stats.years') },
    { number: '98%', label: t('stats.satisfaction') },
    { number: '24/7', label: t('stats.support') }
  ];

  return (
    <>
      <Header />
      
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              {t('title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('subtitle')}
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all"
              >
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-white"
          >
            <h2 className="text-3xl font-bold text-center mb-6">
              {t('missionTitle')}
            </h2>
            <p className="text-lg text-center max-w-3xl mx-auto opacity-90">
              {t('missionDescription')}
            </p>
          </motion.div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-20"
          >
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
              {t('valuesTitle')}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2"
                  >
                    <div className="p-3 bg-blue-100 rounded-xl group-hover:bg-blue-600 transition-colors w-fit mb-4">
                      <Icon className="text-blue-600 group-hover:text-white transition-colors" size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Team */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-6">
              <Users size={48} className="text-blue-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {t('team.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('team.description')}
            </p>
          </motion.div>
        </div>
      </div>


    </>
  );
}
