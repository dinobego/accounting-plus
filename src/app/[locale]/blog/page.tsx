'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { BookOpen, Lightbulb, Brain, ArrowRight, Search } from 'lucide-react';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Članci sa slug-ovima po jezicima
const blogPostsByLocale: { [locale: string]: any[] } = {
  me: [
    {
      id: 1,
      slug: 'sta-je-bilans-stanja',
      category: 'edukativni',
      title: 'Šta je bilans stanja i zašto je važan za vaše poslovanje?',
      excerpt: 'Saznajte šta je bilans stanja i kako ga koristi vaše poslovanje.',
      image: 'https://images.unsplash.com/photo-1554224311-beee415c15c7?q=80&w=1000&auto=format&fit=crop',
      date: '2025-11-04',
      readTime: 5
    },
    {
      id: 2,
      slug: 'kako-otvoriti-preduzece',
      category: 'edukativni',
      title: 'Kako otvoriti preduzeće u Crnoj Gori – korak po korak vodič',
      excerpt: 'Kompletan vodič za otvaranje novog preduzeća sa svim potrebnim informacijama.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop',
      date: '2025-11-02',
      readTime: 8
    },
    {
      id: 3,
      slug: 'porez-na-dobit',
      category: 'edukativni',
      title: 'Porez na dobit: sve što vlasnici firmi treba da znaju',
      excerpt: 'Sve relevantne informacije o porezu na dobit za vlasnike preduzeća.',
      image: 'https://images.unsplash.com/photo-1611632736579-6b16e2b50449?q=80&w=1000&auto=format&fit=crop',
      date: '2025-10-30',
      readTime: 6
    },
    {
      id: 4,
      slug: 'pdv-obaveze-2025',
      category: 'edukativni',
      title: 'PDV obaveze i rokovi u 2025. godini',
      excerpt: 'Ažurirane informacije o PDV obavezama i važnim rokovima za 2025. godinu.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop',
      date: '2025-10-28',
      readTime: 7
    },
    {
      id: 5,
      slug: 'vodenje-knjiga-greske',
      category: 'edukativni',
      title: 'Vođenje knjiga za preduzetnike – najčešće greške',
      excerpt: 'Upoznajte se sa najčešćim greškama pri vođenju poslovnih knjiga.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
      date: '2025-10-26',
      readTime: 5
    },
    {
      id: 6,
      slug: 'checklista-kraju-godine',
      category: 'praktichni',
      title: 'Checklista za kraj poslovne godine – šta sve morate predati računovođi',
      excerpt: 'Praktična checklista sa svim dokumentima i informacijama potrebnih na kraju godine.',
      image: 'https://images.unsplash.com/photo-1507842217343-583f20270319?q=80&w=1000&auto=format&fit=crop',
      date: '2025-10-25',
      readTime: 4
    },
    {
      id: 7,
      slug: 'obracun-poreza-na-zarade',
      category: 'praktichni',
      title: 'Kako pravilno obračunati i prijaviti porez na zarade',
      excerpt: 'Detaljno uputstvo za obračun i prijavu poreza na zarade.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
      date: '2025-10-20',
      readTime: 6
    },
    {
      id: 8,
      slug: '10-saveta-saradnja-racunovedjom',
      category: 'praktichni',
      title: '10 saveta za lakšu saradnju sa računovođom',
      excerpt: '10 praktičnih saveta koji će unaprediti vašu saradnju sa računovođom.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop',
      date: '2025-10-18',
      readTime: 5
    },
    {
      id: 9,
      slug: 'tumacenje-finansijskih-izvestaaja',
      category: 'saveti',
      title: 'Kako tumačiti finansijske izveštaje svoje firme',
      excerpt: 'Naučite kako čitati i razumeti finansijske izveštaje vašeg preduzeća.',
      image: 'https://images.unsplash.com/photo-1611632736579-6b16e2b50449?q=80&w=1000&auto=format&fit=crop',
      date: '2025-10-15',
      readTime: 7
    },
    {
      id: 10,
      slug: 'planiranje-budzeta',
      category: 'saveti',
      title: 'Planiranje budžeta za mikro i mala preduzeća',
      excerpt: 'Kako efikasno planirati budžet za vašu malu firmu.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop',
      date: '2025-10-12',
      readTime: 8
    },
    {
      id: 11,
      slug: 'kada-je-potreban-profesionalni-racunovoda',
      category: 'saveti',
      title: 'Kako prepoznati da vam je potreban profesionalni računovođa',
      excerpt: 'Znakovi koji pokazuju da je vrijeme da angažujete profesionalnog računovođu.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop',
      date: '2025-10-10',
      readTime: 5
    },
    {
      id: 12,
      slug: 'razlika-knjigovodstva-racunovodstva',
      category: 'seo',
      title: 'Razlika između knjigovodstva i računovodstva',
      excerpt: 'Saznajte razliku između ova dva važna profesionalna polja.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop',
      date: '2025-10-05',
      readTime: 4
    },
    {
      id: 13,
      slug: 'kako-izabrati-racunovodjeu',
      category: 'seo',
      title: 'Kako izabrati najboljeg računovođu za vašu firmu',
      excerpt: 'Vodič sa savjetima kako odabrati pravi tim za vaše računovodstvene potrebe.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop',
      date: '2025-10-01',
      readTime: 6
    },
    {
      id: 14,
      slug: 'cuvanje-dokumenata',
      category: 'seo',
      title: 'Koje dokumente morate čuvati i koliko dugo?',
      excerpt: 'Kompletan pregled obavezne čuvanja i arhiviranja poslovnih dokumenata.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop',
      date: '2025-09-28',
      readTime: 5
    }
  ],
  en: [
    {
      id: 1,
      slug: 'what-is-balance-sheet',
      category: 'educational',
      title: 'What is a Balance Sheet and Why is it Important for Your Business?',
      excerpt: 'Learn what a balance sheet is and how it benefits your business.',
      image: 'https://images.unsplash.com/photo-1554224311-beee415c15c7?q=80&w=1000&auto=format&fit=crop',
      date: '2025-11-04',
      readTime: 5
    },
    {
      id: 2,
      slug: 'how-to-open-business',
      category: 'educational',
      title: 'How to Open a Business in Montenegro – Step by Step Guide',
      excerpt: 'Complete guide for opening a new business with all necessary information.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop',
      date: '2025-11-02',
      readTime: 8
    },
    {
      id: 3,
      slug: 'corporate-income-tax',
      category: 'educational',
      title: 'Corporate Income Tax: Everything Business Owners Need to Know',
      excerpt: 'All relevant information about corporate income tax for business owners.',
      image: 'https://images.unsplash.com/photo-1611632736579-6b16e2b50449?q=80&w=1000&auto=format&fit=crop',
      date: '2025-10-30',
      readTime: 6
    },
    {
      id: 4,
      slug: 'vat-obligations-2025',
      category: 'educational',
      title: 'VAT Obligations and Deadlines in 2025',
      excerpt: 'Updated information on VAT obligations and important deadlines for 2025.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop',
      date: '2025-10-28',
      readTime: 7
    },
    {
      id: 5,
      slug: 'bookkeeping-common-mistakes',
      category: 'educational',
      title: 'Bookkeeping for Entrepreneurs – Common Mistakes',
      excerpt: 'Learn about the most common mistakes when keeping business records.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
      date: '2025-10-26',
      readTime: 5
    },
    {
      id: 6,
      slug: 'year-end-checklist',
      category: 'practical',
      title: 'Year-End Checklist – What to Submit to Your Accountant',
      excerpt: 'Practical checklist with all documents and information needed at year-end.',
      image: 'https://images.unsplash.com/photo-1507842217343-583f20270319?q=80&w=1000&auto=format&fit=crop',
      date: '2025-10-25',
      readTime: 4
    },
    {
      id: 7,
      slug: 'payroll-tax-calculation',
      category: 'practical',
      title: 'How to Properly Calculate and Report Payroll Tax',
      excerpt: 'Detailed instructions for calculating and reporting payroll tax.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
      date: '2025-10-20',
      readTime: 6
    },
    {
      id: 8,
      slug: 'tips-working-accountant',
      category: 'practical',
      title: '10 Tips for Easier Cooperation with Your Accountant',
      excerpt: '10 practical tips that will improve your cooperation with your accountant.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop',
      date: '2025-10-18',
      readTime: 5
    },
    {
      id: 9,
      slug: 'interpreting-financial-statements',
      category: 'tips',
      title: 'How to Interpret Your Company\'s Financial Statements',
      excerpt: 'Learn how to read and understand your company\'s financial statements.',
      image: 'https://images.unsplash.com/photo-1611632736579-6b16e2b50449?q=80&w=1000&auto=format&fit=crop',
      date: '2025-10-15',
      readTime: 7
    },
    {
      id: 10,
      slug: 'budget-planning-small-business',
      category: 'tips',
      title: 'Budget Planning for Micro and Small Businesses',
      excerpt: 'How to effectively plan a budget for your small business.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop',
      date: '2025-10-12',
      readTime: 8
    },
    {
      id: 11,
      slug: 'when-need-accountant',
      category: 'tips',
      title: 'How to Recognize When You Need a Professional Accountant',
      excerpt: 'Signs that show it\'s time to hire a professional accountant.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop',
      date: '2025-10-10',
      readTime: 5
    },
    {
      id: 12,
      slug: 'bookkeeping-vs-accounting',
      category: 'seo',
      title: 'The Difference Between Bookkeeping and Accounting',
      excerpt: 'Learn the difference between these two important professional fields.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop',
      date: '2025-10-05',
      readTime: 4
    },
    {
      id: 13,
      slug: 'how-to-choose-accountant',
      category: 'seo',
      title: 'How to Choose the Best Accountant for Your Company',
      excerpt: 'Guide with tips on how to select the right team for your accounting needs.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop',
      date: '2025-10-01',
      readTime: 6
    },
    {
      id: 14,
      slug: 'document-retention',
      category: 'seo',
      title: 'Which Documents Must You Keep and For How Long?',
      excerpt: 'Complete overview of mandatory storage and archiving of business documents.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop',
      date: '2025-09-28',
      readTime: 5
    }
  ],
  tr: [
    {
      id: 1,
      slug: 'bilanco-nedir',
      category: 'educational',
      title: 'Bilanço Nedir ve İşletmeniz İçin Neden Önemlidir?',
      excerpt: 'Bilanço nedir ve işletmenize nasıl fayda sağlar öğrenin.',
      image: 'https://images.unsplash.com/photo-1554224311-beee415c15c7?q=80&w=1000&auto=format&fit=crop',
      date: '2025-11-04',
      readTime: 5
    },
    {
      id: 2,
      slug: 'karadag-sirket-acma',
      category: 'educational',
      title: 'Karadağ\'da Şirket Açma – Adım Adım Rehber',
      excerpt: 'Yeni bir işletme açmak için gerekli tüm bilgileri içeren eksiksiz rehber.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop',
      date: '2025-11-02',
      readTime: 8
    },
    {
      id: 3,
      slug: 'kurumlar-vergisi',
      category: 'educational',
      title: 'Kurumlar Vergisi: İşletme Sahipleri Bilmesi Gerekenler',
      excerpt: 'İşletme sahipleri için kurumlar vergisi hakkında tüm ilgili bilgiler.',
      image: 'https://images.unsplash.com/photo-1611632736579-6b16e2b50449?q=80&w=1000&auto=format&fit=crop',
      date: '2025-10-30',
      readTime: 6
    },
    {
      id: 4,
      slug: 'kdv-yukumlulekleri-2025',
      category: 'educational',
      title: 'KDV Yükümlülükleri ve 2025 Son Tarihleri',
      excerpt: '2025 için KDV yükümlülükleri ve önemli son tarihler hakkında güncellenmiş bilgiler.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop',
      date: '2025-10-28',
      readTime: 7
    },
    {
      id: 5,
      slug: 'defteri-kebir-hatalari',
      category: 'educational',
      title: 'Girişimciler İçin Defter Tutma – Yaygın Hatalar',
      excerpt: 'İş kayıtlarını tutarken yapılan en yaygın hatalar hakkında bilgi edinin.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
      date: '2025-10-26',
      readTime: 5
    },
    {
      id: 6,
      slug: 'yil-sonu-kontrol-listesi',
      category: 'practical',
      title: 'Yıl Sonu Kontrol Listesi – Muhasebeciye Sunulması Gereken Belgeler',
      excerpt: 'Yıl sonunda gereken tüm belgeleri ve bilgileri içeren pratik kontrol listesi.',
      image: 'https://images.unsplash.com/photo-1507842217343-583f20270319?q=80&w=1000&auto=format&fit=crop',
      date: '2025-10-25',
      readTime: 4
    },
    {
      id: 7,
      slug: 'bordro-vergi-hesaplamasi',
      category: 'practical',
      title: 'Bordro Vergisini Nasıl Doğru Hesaplayıp Raporlayacaksınız?',
      excerpt: 'Bordro vergisini hesaplama ve raporlama için ayrıntılı talimatlar.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
      date: '2025-10-20',
      readTime: 6
    },
    {
      id: 8,
      slug: 'muhasebeci-ipuclari',
      category: 'practical',
      title: 'Muhasebecimizle Daha Kolay İşbirliği İçin 10 İpucu',
      excerpt: 'Muhasebeci ile işbirliğinizi geliştirecek 10 pratik ipucu.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop',
      date: '2025-10-18',
      readTime: 5
    },
    {
      id: 9,
      slug: 'mali-tablolar-yorumlama',
      category: 'tips',
      title: 'Şirketinizin Mali Tablolarını Nasıl Yorumlayacaksınız',
      excerpt: 'Şirketinizin mali tablolarını nasıl okuyup anlayacağınızı öğrenin.',
      image: 'https://images.unsplash.com/photo-1611632736579-6b16e2b50449?q=80&w=1000&auto=format&fit=crop',
      date: '2025-10-15',
      readTime: 7
    },
    {
      id: 10,
      slug: 'kucuk-isletme-butce',
      category: 'tips',
      title: 'Mikro ve Küçük İşletmeler İçin Bütçe Planlama',
      excerpt: 'Küçük işletmeniz için bütçeyi nasıl etkili bir şekilde planlayacaksınız.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop',
      date: '2025-10-12',
      readTime: 8
    },
    {
      id: 11,
      slug: 'muhasebeci-gerekli',
      category: 'tips',
      title: 'Profesyonel Muhasebeciye İhtiyacınız Olduğunu Nasıl Anlarsınız?',
      excerpt: 'Profesyonel muhasebeci işe almanın zamanının geldiğini gösteren işaretler.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop',
      date: '2025-10-10',
      readTime: 5
    },
    {
      id: 12,
      slug: 'defter-tutma-muhasebe',
      category: 'seo',
      title: 'Defter Tutma ve Muhasebe Arasındaki Fark',
      excerpt: 'Bu iki önemli profesyonel alan arasındaki farkı öğrenin.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop',
      date: '2025-10-05',
      readTime: 4
    },
    {
      id: 13,
      slug: 'muhasebeci-secme',
      category: 'seo',
      title: 'Şirketiniz İçin En İyi Muhasebecisi Nasıl Seçersiniz',
      excerpt: 'Muhasebe ihtiyaçlarınız için doğru ekibi nasıl seçeceğiniz konusunda ipuçları içeren rehber.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop',
      date: '2025-10-01',
      readTime: 6
    },
    {
      id: 14,
      slug: 'belge-saklama',
      category: 'seo',
      title: 'Hangi Belgeleri Saklamalısınız ve Ne Kadar Süre?',
      excerpt: 'İş belgelerinin zorunlu saklama ve arşivleme ile ilgili tam genel bakış.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop',
      date: '2025-09-28',
      readTime: 5
    }
  ]
};

const categoriesByLocale: { [locale: string]: any[] } = {
  me: [
    { id: 'all', label: 'Svi postovi', icon: BookOpen },
    { id: 'edukativni', label: 'Edukativni članci', icon: BookOpen },
    { id: 'praktichni', label: 'Praktični vodiči', icon: Lightbulb },
    { id: 'saveti', label: 'Saveti', icon: Brain },
    { id: 'seo', label: 'SEO/Autoritet', icon: Brain }
  ],
  en: [
    { id: 'all', label: 'All Posts', icon: BookOpen },
    { id: 'educational', label: 'Educational Articles', icon: BookOpen },
    { id: 'practical', label: 'Practical Guides', icon: Lightbulb },
    { id: 'tips', label: 'Tips', icon: Brain },
    { id: 'seo', label: 'SEO/Authority', icon: Brain }
  ],
  tr: [
    { id: 'all', label: 'Tüm Yazılar', icon: BookOpen },
    { id: 'educational', label: 'Eğitici Makaleler', icon: BookOpen },
    { id: 'practical', label: 'Pratik Rehberler', icon: Lightbulb },
    { id: 'tips', label: 'İpuçları', icon: Brain },
    { id: 'seo', label: 'SEO/Otorite', icon: Brain }
  ]
};

export default function BlogPage() {
  const t = useTranslations('blog');
  const locale = useLocale();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const blogPosts = blogPostsByLocale[locale] || blogPostsByLocale['me'];
  const categories = categoriesByLocale[locale] || categoriesByLocale['me'];

  const filteredPosts = blogPosts.filter(post => {
    const categoryMatch = selectedCategory === 'all' || post.category === selectedCategory;
    const searchMatch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && searchMatch;
  });

  return (
    <>
      <Header />
      
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">{t('title')}</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </motion.div>

          {/* Search Bar */}
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

          {/* Categories */}
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

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>{new Date(post.date).toLocaleDateString(locale === 'me' ? 'sr-RS' : locale)}</span>
                    <span>{post.readTime} {t('readTime')}</span>
                  </div>

                  {/* Read More Link */}
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

          {/* No Results */}
          {filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-xl text-gray-600">{t('notFound')}</p>
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
