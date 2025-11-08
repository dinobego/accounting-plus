"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Send, Mail, Phone, User, MessageSquare } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const t = useTranslations("contact");
  const [focused, setFocused] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Form submitted!");
  };

  return (
    <section
      id="contact"
      className="py-24 px-4 bg-gradient-to-b from-white via-blue-50 to-indigo-100 relative overflow-hidden"
    >
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
              className="w-full flex items-center justify-center px-8 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 group shadow-xl hover:shadow-2xl cursor-pointer"
            >
              <span>{t("submit")}</span>
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
              >
                <Mail className="mx-auto mb-2 text-blue-600" size={24} />
                <p className="text-sm font-semibold text-gray-700">
                  {t("info.email")}
                </p>
                <p className="text-sm text-gray-600">info@accpro.com</p>
              </motion.div>
              <motion.div
                whileHover={{ y: -5 }}
                className="p-4 rounded-xl bg-indigo-50 cursor-pointer"
              >
                <Phone className="mx-auto mb-2 text-indigo-600" size={24} />
                <p className="text-sm font-semibold text-gray-700">
                  {t("info.phone")}
                </p>
                <p className="text-sm text-gray-600">+382 123 456 789</p>
              </motion.div>
              <motion.div
                whileHover={{ y: -5 }}
                className="p-4 rounded-xl bg-purple-50 cursor-pointer"
              >
                <MessageSquare
                  className="mx-auto mb-2 text-purple-600"
                  size={24}
                />
                <p className="text-sm font-semibold text-gray-700">
                  {t("info.location")}
                </p>
                <p className="text-sm text-gray-600">Podgorica, Montenegro</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
