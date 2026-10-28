"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { pickLocalized } from "@/lib/cms/types";
import { usePublicSettings } from "@/lib/cms/usePublicCms";

export default function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const settings = usePublicSettings();
  const title = settings ? pickLocalized(settings.hero.titles, locale) : t("title");
  const subtitle = settings ? pickLocalized(settings.hero.subtitles, locale) : t("subtitle");

  return (
    <section
      id="home"
      className="relative pt-32 pb-20 px-4 min-h-[700px] md:min-h-[80vh] flex items-center"
    >
      {/* Background Image sa Overlay - FULL WIDTH */}
      <div className="absolute inset-0 z-0 -mx-4">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop)",
          }}
        />
        {/* SVIJETLIJI overlay - smanjen opacity sa /90 na /60 */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 via-blue-800/50 to-indigo-900/60" />
      </div>

      {/* Content */}
      <div className="container mx-auto relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg"
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-white mb-10 max-w-3xl mx-auto drop-shadow-md"
          >
            {subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#contact"
              className="cursor-pointer inline-flex items-center justify-center px-10 py-4 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 transition-colors duration-300 group shadow-lg"
            >
              {t("cta")}
              <ArrowRight
                className="cursor-pointer ml-2 group-hover:translate-x-1 transition-transform"
                size={22}
              />
            </a>
            <a
              href="#services"
              className="cursor-pointer inline-flex items-center justify-center px-10 py-4 bg-white text-blue-600 text-lg rounded-lg border-2 border-white hover:bg-gray-100 transition-colors duration-300 shadow-lg"
            >
              {t("ctaSecondary")}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
