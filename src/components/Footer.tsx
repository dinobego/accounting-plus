"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Linkedin,
  Instagram,
  ArrowUp,
} from "lucide-react";

export default function Footer() {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Dekorativni elementi */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-blue-600 opacity-5 filter blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-indigo-600 opacity-5 filter blur-3xl"></div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* O Nama */}
          <div className="md:col-span-2">
          <Link href="/" className="hover:opacity-80 transition-opacity cursor-pointer">
  <img 
    src="/images/logoWhite.png" 
    alt="AccPro" 
    className="h-24 w-auto"
  />
</Link>

            <p className="text-gray-400 mb-6 leading-relaxed">
              {t("description")}
            </p>

            {/* Social Media */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all duration-300 hover:scale-110 cursor-pointer"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all duration-300 hover:scale-110 cursor-pointer"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all duration-300 hover:scale-110 cursor-pointer"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Brzi Linkovi */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#home"
                  className="text-gray-400 hover:text-blue-400 transition-colors flex items-center group cursor-pointer"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  {t("links.home")}
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-gray-400 hover:text-blue-400 transition-colors flex items-center group cursor-pointer"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  {t("links.services")}
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-gray-400 hover:text-blue-400 transition-colors flex items-center group cursor-pointer"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  {t("links.about")}
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-400 hover:text-blue-400 transition-colors flex items-center group cursor-pointer"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  {t("links.contact")}
                </a>
              </li>
            </ul>
          </div>

          {/* Kontakt Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">
              {t("contact")}
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 text-gray-400 hover:text-blue-400 transition-colors cursor-pointer">
                <Mail size={20} className="mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm">info@accpro.com</p>
                  <p className="text-sm">support@accpro.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-gray-400 hover:text-blue-400 transition-colors cursor-pointer">
                <Phone size={20} className="mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm">+382 123 456 789</p>
                  <p className="text-sm">+382 987 654 321</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-gray-400 hover:text-blue-400 transition-colors cursor-pointer">
                <MapPin size={20} className="mt-1 flex-shrink-0" />
                <p className="text-sm">
                  Podgorica
                  <br />
                  Montenegro
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} AccPro. {t("rights")}.
            </p>

            {/* Scroll to Top Button */}
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-blue-600 rounded-full transition-all duration-300 hover:scale-105 cursor-pointer group"
            >
              <span className="text-sm">{t("backToTop")}</span>
              <ArrowUp
                size={16}
                className="group-hover:-translate-y-1 transition-transform"
              />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
