"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Award, Users, TrendingUp } from "lucide-react";
import { pickLocalized } from "@/lib/cms/types";
import { usePublicSettings } from "@/lib/cms/usePublicCms";

export default function About() {
  const t = useTranslations("about");
  const locale = useLocale();
  const settings = usePublicSettings();
  const title = settings ? pickLocalized(settings.about.titles, locale) : t("title");
  const description = settings ? pickLocalized(settings.about.descriptions, locale) : t("description");

  const stats = [
    {
      icon: Award,
      value: settings?.about.stats.partners || "30+",
      label: t("experience"),
    },
    {
      icon: Users,
      value: settings?.about.stats.clients || "500+",
      label: t("clients"),
    },
    {
      icon: TrendingUp,
      value: settings?.about.stats.experts || "10+",
      label: t("experts"),
    },
  ];

  return (
    <section
      id="about"
      className="py-24 md:py-32 px-4 bg-gradient-to-b from-blue-50 via-white to-gray-100 relative overflow-hidden"
    >
      {/* Dekorativni background */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-blue-200 opacity-30 filter blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-indigo-200 opacity-20 filter blur-3xl -z-10"></div>

      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-lg md:text-xl text-gray-700 mb-2 leading-relaxed"
          >
            {description}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className="cursor-pointer rounded-3xl bg-white shadow-xl px-8 py-10 text-center relative border border-gray-200 hover:border-blue-400 hover:-translate-y-2 transition-all duration-300"
              >
                <span className="absolute top-5 left-5 text-blue-100 text-7xl font-extrabold opacity-10 select-none pointer-events-none">
                  {stat.value}
                </span>
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Icon className="text-white" size={36} />
                </div>
                <div className="text-3xl font-extrabold text-blue-700 mb-2 tracking-wide">
                  {stat.value}
                </div>
                <div className="text-gray-900 font-semibold mb-1">
                  {stat.label}
                </div>
  <div className="text-gray-500 text-sm">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
