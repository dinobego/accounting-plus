"use client";

import { useParams } from "next/navigation";
import { useRouter, usePathname } from "@/i18n/routing";
import { Globe } from "lucide-react";
import Image from "next/image";

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
    alt="Montenegro flag"
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

  const handleLanguageChange = (locale: string) => {
    router.push(pathname, { locale });
  };

  const currentLanguage = languages.find((lang) => lang.code === currentLocale);

  return (
    <div className="relative group">
      <button className="cursor-pointer flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
        <Globe size={18} className="text-blue-600" />
        {currentLanguage && <currentLanguage.Flag />}
        <span className="text-sm font-medium">
          {currentLanguage?.code.toUpperCase()}
        </span>
      </button>

      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
        {languages.map((language) => (
          <button
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={`cursor-pointer w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors ${
              currentLocale === language.code ? "bg-blue-50" : ""
            }`}
          >
            <language.Flag />
            <span className="text-sm font-medium">{language.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
