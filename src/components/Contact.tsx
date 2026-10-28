"use client";

import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mail, Phone, User, MessageSquare, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";
import emailjs from '@emailjs/browser';
import { usePublicSettings } from '@/lib/cms/usePublicCms';

emailjs.init('HaHtjF1LCb7T8TNCx');

export default function Contact() {
  const t = useTranslations("contact");
  const [focused, setFocused] = useState("");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const settings = usePublicSettings();
  const email = settings?.contact.email || 'racunovodstvo2020@hotmail.com';
  const phone = settings?.contact.phone || '+382 69 842 843';
  const mapsUrl = settings?.contact.mapsUrl || 'https://maps.app.goo.gl/NsofWhWD3LGVeWNT9?g_st=ipc';
  const address = settings?.contact.address || 'Podgorica, Montenegro';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await emailjs.send(
        'service_k184mtc',
        'template_4b114ae',
        {
          to_email: email,
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          message: formData.message
        },
        'HaHtjF1LCb7T8TNCx'
      );

      await fetch('/api/content/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

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

  return (
    <section
      id="contact"
      className="py-24 px-4 bg-gradient-to-b from-white via-blue-50 to-indigo-100 relative overflow-hidden"
    >
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

      {/* Dekorativni background krugovi */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-blue-300 opacity-20 filter blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-indigo-300 opacity-20 filter blur-3xl"></div>

      <div className="container mx-auto max-w-3xl relative z-10">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            {t("title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t("name")}
              </label>
              <div className="relative">
                <User
                  className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                    focused === "name" ? "text-blue-600" : "text-gray-400"
                  }`}
                  size={20}
                />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused("")}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all outline-none text-gray-800"
                  placeholder={t("placeholders.name")}
                  required
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t("email")}
              </label>
              <div className="relative">
                <Mail
                  className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                    focused === "email" ? "text-blue-600" : "text-gray-400"
                  }`}
                  size={20}
                />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused("")}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all outline-none text-gray-800"
                  placeholder={t("placeholders.email")}
                  required
                />
              </div>
            </div>

            {/* Phone Input */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t("phone")}
              </label>
              <div className="relative">
                <Phone
                  className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                    focused === "phone" ? "text-blue-600" : "text-gray-400"
                  }`}
                  size={20}
                />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  onFocus={() => setFocused("phone")}
                  onBlur={() => setFocused("")}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all outline-none text-gray-800"
                  placeholder={t("placeholders.phone")}
                />
              </div>
            </div>

            {/* Message Textarea */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t("message")}
              </label>
              <div className="relative">
                <MessageSquare
                  className={`absolute left-4 top-5 transition-colors ${
                    focused === "message" ? "text-blue-600" : "text-gray-400"
                  }`}
                  size={20}
                />
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused("")}
                  rows={5}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all outline-none resize-none text-gray-800"
                  placeholder={t("placeholders.message")}
                  required
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center px-8 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 group shadow-xl hover:shadow-2xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{isSubmitting ? 'Šalje se...' : t("submit")}</span>
              <Send
                className="ml-3 group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform duration-300"
                size={22}
              />
            </motion.button>
          </form>

          {/* Dodatne info kartice */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <motion.div
                whileHover={{ y: -5 }}
                className="p-4 rounded-xl bg-blue-50 cursor-pointer"
                onClick={() => {
                  window.location.href = `mailto:${email}`;
                }}
              >
                <Mail className="mx-auto mb-2 text-blue-600" size={24} />
                <p className="text-sm font-semibold text-gray-700">
                  {t("info.email")}
                </p>
                <p className="text-sm text-gray-600">Accounting plus</p>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="p-4 rounded-xl bg-indigo-50 cursor-pointer"
                onClick={() => {
                  window.location.href = `tel:${phone.replace(/\s/g, '')}`;
                }}
              >
                <Phone className="mx-auto mb-2 text-indigo-600" size={24} />
                <p className="text-sm font-semibold text-gray-700">
                  {t("info.phone")}
                </p>
                <p className="text-sm text-gray-600">{phone}</p>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="p-4 rounded-xl bg-purple-50 cursor-pointer"
                onClick={() => {
                  window.open(mapsUrl, "_blank");
                }}
              >
                <MessageSquare
                  className="mx-auto mb-2 text-purple-600"
                  size={24}
                />
                <p className="text-sm font-semibold text-gray-700">
                  {t("info.location")}
                </p>
                <p className="text-sm text-gray-600">{address}</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
