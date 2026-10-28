'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { BookOpen, Lightbulb, Brain, ArrowRight, Search } from 'lucide-react';
import { useState } from 'react';
import { usePublicPosts } from '@/lib/cms/usePublicCms';

const CATEGORY_LABELS: Record<string, Record<string, string>> = {
  me: {
    all: 'Svi postovi',
    educational: 'Edukativni članci',
    practical: 'Praktični vodiči',
    tips: 'Savjeti',
    seo: 'SEO/Autoritet',
  },
  en: {
    all: 'All Posts',
    educational: 'Educational Articles',
    practical: 'Practical Guides',
    tips: 'Tips',
    seo: 'SEO/Authority',
  },
  tr: {
    all: 'Tüm Yazılar',
    educational: 'Eğitici Makaleler',
    practical: 'Pratik Rehberler',
    tips: 'İpuçları',
    seo: 'SEO/Otorite',
  },
};

export default function BlogPage() {
  const t = useTranslations('blog');
  const locale = useLocale();
  const { posts } = usePublicPosts<{
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    image: string;
    date: string;
    readTime: number;
    category: string;
  }>(locale);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const labels = CATEGORY_LABELS[locale] || CATEGORY_LABELS.me;
  const categories = [
    { id: 'all', label: labels.all, icon: BookOpen },
    { id: 'educational', label: labels.educational, icon: BookOpen },
    { id: 'practical', label: labels.practical, icon: Lightbulb },
    { id: 'tips', label: labels.tips, icon: Brain },
    { id: 'seo', label: labels.seo, icon: Brain },
  ];

  const filteredPosts = posts.filter((post) => {
    const categoryMatch = selectedCategory === 'all' || post.category === selectedCategory;
    const searchMatch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && searchMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">{t('title')}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t('subtitle')}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder={t('search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all outline-none text-gray-800"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-3 justify-center mb-16"
        >
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-600'
                }`}
              >
                <Icon size={18} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-full">
                    {labels[post.category] || post.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{new Date(post.date).toLocaleDateString(locale === 'me' ? 'sr-RS' : locale)}</span>
                  <span>{post.readTime} {t('readTime')}</span>
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 group/link cursor-pointer"
                >
                  {t('readMore')}
                  <ArrowRight size={16} className="ml-2 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <p className="text-xl text-gray-600">{t('notFound')}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
