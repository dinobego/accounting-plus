"use client";

import { useParams } from "next/navigation";
import { useRouter, usePathname } from "@/i18n/routing";
import { Globe } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const FlagEN = () => (
  <svg className="w-6 h-4" viewBox="0 0 60 40">
    <rect width="60" height="40" fill="#012169" />
    <path d="M0,0 L60,40 M60,0 L0,40" stroke="#fff" strokeWidth="8" />
    <path d="M0,0 L60,40 M60,0 L0,40" stroke="#C8102E" strokeWidth="5" />
    <path d="M30,0 L30,40 M0,20 L60,20" stroke="#fff" strokeWidth="13" />
    <path d="M30,0 L30,40 M0,20 L60,20" stroke="#C8102E" strokeWidth="8" />
  </svg>
);

const FlagTR = () => (
  <Image
    src="/flags/tr.png"
    alt="Turkey flag"
    width={24}
    height={16}
    className="w-6 h-4 object-cover"
  />
);

const FlagME = () => (
  <Image
    src="/flags/me.svg"
    alt="Montenegro flag"
    width={24}
    height={16}
    className="w-6 h-4 object-cover"
  />
);

const languages = [
  { code: "en", name: "English", Flag: FlagEN },
  { code: "tr", name: "Türkçe", Flag: FlagTR },
  { code: "me", name: "Crnogorski", Flag: FlagME },
];

export default function LanguageSwitcher() {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = params.locale as string;
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (locale: string) => {
    router.push(pathname, { locale });
    setIsOpen(false);
  };

  const currentLanguage = languages.find((lang) => lang.code === currentLocale);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors touch-action-auto pointer-events-auto z-[9999] relative"
      >
        <Globe size={18} className="text-blue-600" />
        {currentLanguage && <currentLanguage.Flag />}
        <span className="text-sm font-medium text-gray-700">
          {currentLanguage?.code.toUpperCase()}
        </span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-2xl z-[10000] border border-gray-100">
          {languages.map((language) => (
            <button
              key={language.code}
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

      {/* Close dropdown kad se klikne van */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[9998]"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
