"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useRouter, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Globe } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const FlagEN = () => (
  <svg className="w-6 h-4" viewBox="0 0 60 40" aria-hidden="true">
    <rect width="60" height="40" fill="#012169" />
    <path d="M0,0 L60,40 M60,0 L0,40" stroke="#fff" strokeWidth="8" />
    <path d="M0,0 L60,40 M60,0 L0,40" stroke="#C8102E" strokeWidth="5" />
    <path d="M30,0 L30,40 M0,20 L60,20" stroke="#fff" strokeWidth="13" />
    <path d="M30,0 L30,40 M0,20 L60,20" stroke="#C8102E" strokeWidth="8" />
  </svg>
);

const FlagTR = () => (
  <Image src="/flags/tr.png" alt="" width={24} height={16} className="w-6 h-4 object-cover" />
);

const FlagME = () => (
  <Image src="/flags/me.svg" alt="" width={24} height={16} className="w-6 h-4 object-cover" />
);

const FlagSQ = () => (
  <Image src="/flags/sq.svg" alt="" width={24} height={16} className="w-6 h-4 object-cover" />
);

const languages = [
  { code: "me", name: "Crnogorski", Flag: FlagME },
  { code: "en", name: "English", Flag: FlagEN },
  { code: "tr", name: "Türkçe", Flag: FlagTR },
  { code: "sq", name: "Shqip", Flag: FlagSQ },
];

export default function LanguageSwitcher() {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations("nav");
  const currentLocale = params.locale as string;
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (locale: string) => {
    const query = searchParams.toString();
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    router.push(`${pathname}${query ? `?${query}` : ""}${hash}`, { locale });
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const currentLanguage = languages.find((lang) => lang.code === currentLocale);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={t("language")}
        className="cursor-pointer flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors touch-action-auto pointer-events-auto z-[9999] relative"
      >
        <Globe size={18} className="text-blue-600" />
        {currentLanguage && <currentLanguage.Flag />}
        <span className="text-sm font-medium text-gray-700">
          {currentLanguage?.code.toUpperCase()}
        </span>
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label={t("language")}
          className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-2xl z-[10000] border border-gray-100"
        >
          {languages.map((language) => (
            <button
              key={language.code}
              type="button"
              role="option"
              aria-selected={currentLocale === language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`cursor-pointer w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 first:rounded-t-lg last:rounded-b-lg transition-colors pointer-events-auto touch-action-auto ${
                currentLocale === language.code ? "bg-blue-50 text-blue-600" : ""
              }`}
            >
              <language.Flag />
              <span className="text-sm font-medium">{language.name}</span>
            </button>
          ))}
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-[9998]"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
