'use client';

import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import emailjs from '@emailjs/browser';

emailjs.init('HaHtjF1LCb7T8TNCx');

export default function ContactPage() {
  const t = useTranslations('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await emailjs.send(
        'service_k184mtc',
        'template_4b114ae',
        {
          to_email: 'racunovodstvo2020@hotmail.com',
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          message: formData.message
        },
        'HaHtjF1LCb7T8TNCx'
      );

      if (response.status === 200) {
        setToastType('success');
        setShowToast(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => setShowToast(false), 5000);
      } else {
        setToastType('error');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 5000);
      }
    } catch (error: any) {
      setToastType('error');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
      console.error('EmailJS Error:', error.text || error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: t('emailTitle'),
      details: ['racunovodstvo2020@hotmail.com', '']
    },
    {
      icon: Phone,
      title: t('phoneTitle'),
      details: ['+382 69 842 843', '']
    },
    {
      icon: MapPin,
      title: t('addressTitle'),
      details: ["88 Hercegovačka, Podgorica"]
    },
    {
      icon: Clock,
      title: t('hoursTitle'),
      details: [t('contactInfo.hours.weekdays'), t('contactInfo.hours.weekend')]
    }
  ];

  return (
    <>
      <Header />
      
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-24 right-8 z-[9999] max-w-md"
          >
            <div
              className={`rounded-2xl shadow-2xl p-6 flex items-center space-x-4 ${
                toastType === 'success'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600'
                  : 'bg-gradient-to-r from-red-500 to-rose-600'
              }`}
            >
              {toastType === 'success' ? (
                <CheckCircle className="text-white" size={32} />
              ) : (
                <XCircle className="text-white" size={32} />
              )}
              <div className="flex-1">
                <h4 className="text-white font-bold text-lg">
                  {toastType === 'success'
                    ? t('form.successMessage')
                    : 'Greška pri slanju poruke'}
                </h4>
                <p className="text-white/90 text-sm">
                  {toastType === 'success'
                    ? ''
                    : 'Pokušajte ponovo'}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              {t('title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="bg-white rounded-3xl shadow-xl p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  {t('form.title')}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t('form.name')}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all outline-none text-gray-900 bg-white"
                      placeholder={t('form.namePlaceholder')}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t('form.email')}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all outline-none text-gray-900 bg-white"
                      placeholder={t('form.emailPlaceholder')}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t('form.phone')}
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all outline-none text-gray-900 bg-white"
                      placeholder={t('form.phonePlaceholder')}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t('form.message')}
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all outline-none resize-none text-gray-900 bg-white"
                      placeholder={t('form.messagePlaceholder')}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    <span>{isSubmitting ? t('form.sending') : t('form.submit')}</span>
                    <Send size={20} />
                  </button>
                </form>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-blue-100 rounded-xl">
                        <Icon className="text-blue-600" size={28} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {info.title}
                        </h3>
                        {info.details.map((detail, idx) => (
                          detail && (
                            <p key={idx} className="text-gray-600 mb-1">
                              {detail}
                            </p>
                          )
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                onClick={() => {
                  window.open('https://share.google/IhwQ6CbMcNtTGVqKN', '_blank');
                }}
                className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-8 text-center h-64 flex items-center justify-center cursor-pointer hover:shadow-lg transition-all hover:scale-105"
              >
                <div>
                  <MapPin size={48} className="text-blue-600 mx-auto mb-4" />
                  <p className="text-gray-700 font-semibold hover:text-blue-600 transition">
                    {t('map.title')}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
