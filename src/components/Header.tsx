'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import LanguageSwitcher from './LanguageSwitcher';
import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const t = useTranslations('nav');
  const tServices = useTranslations('services');
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const services = [
    { key: 'company-formation', href: '/services/company-formation' },
    { key: 'residence-work-permits', href: '/services/residence-work-permits' },
    { key: 'bookkeeping', href: '/services/bookkeeping' },
    { key: 'tax-consulting', href: '/services/tax-consulting' },
    { key: 'final-reports', href: '/services/final-reports' },
    { key: 'business-analysis', href: '/services/business-analysis' },
    { key: 'electronic-documents', href: '/services/electronic-documents' },
    { key: 'real-estate', href: '/services/real-estate' },
    { key: 'employment-agency-services', href: '/services/employment-agency-services' },
    { key: 'visa', href: '/services/visa' }
  ];

  return (
    <header className="fixed top-0 w-full bg-gradient-to-r from-white via-blue-50 to-white backdrop-blur-lg z-50 shadow-lg border-b border-blue-100">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="hover:opacity-80 transition-opacity cursor-pointer"
            prefetch
          >
            <img 
              src="/images/logoBlue.png" 
              alt="AccPro" 
              className="h-24 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink href="/" label={t('home')} />

            {/* Services Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button className="flex items-center px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-300 cursor-pointer hover:bg-blue-50 rounded-lg group-hover:bg-blue-100">
                {t('services')}
                <ChevronDown className="ml-1 group-hover:rotate-180 transition-transform duration-300" size={16} />
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 py-3 backdrop-blur-xl"
                  >
                    {services.map((service) => (
                      <Link
                        key={service.key}
                        href={service.href}
                        className="block px-6 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 hover:translate-x-1 cursor-pointer group/item"
                        prefetch
                      >
                        <span className="text-blue-600 font-bold mr-2">•</span>
                        <span className="group-hover/item:font-semibold">{tServices(service.key)}</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavLink href="/about" label={t('about')} />
            <NavLink href="/blog" label="Blog" isBlog />
            <NavLink href="/contact" label={t('contact')} />

            <div className="ml-4 pl-4 border-l border-gray-200">
              <LanguageSwitcher />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <LanguageSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer p-2 hover:bg-blue-50 rounded-lg"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 bg-gradient-to-b from-blue-50 to-white rounded-2xl p-4 max-h-[70vh] overflow-y-auto border border-blue-100"
            >
              <MobileNavLink href="/" label={t('home')} onClick={() => setIsOpen(false)} />

              {/* Mobile Services Dropdown */}
              <div className="border-t border-blue-100 mt-2 pt-2">
                <button
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className="flex items-center justify-between w-full py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all cursor-pointer font-semibold"
                >
                  {t('services')}
                  <ChevronDown
                    className={`transform transition-transform duration-300 ${
                      servicesOpen ? 'rotate-180' : ''
                    }`}
                    size={16}
                  />
                </button>

                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4 space-y-1 mt-2"
                    >
                      {services.map((service) => (
                        <Link
                          key={service.key}
                          href={service.href}
                          className="block py-2.5 px-4 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all cursor-pointer hover:translate-x-1"
                          onClick={() => setIsOpen(false)}
                          prefetch
                        >
                          <span className="text-blue-600 font-bold mr-2">•</span>
                          {tServices(service.key)}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <MobileNavLink href="/about" label={t('about')} onClick={() => setIsOpen(false)} />
              <MobileNavLink href="/blog" label="Blog" onClick={() => setIsOpen(false)} isBlog />
              <MobileNavLink href="/contact" label={t('contact')} onClick={() => setIsOpen(false)} />
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

// Desktop Navigation Link Component
function NavLink({ href, label, isBlog = false }: { href: string; label: string; isBlog?: boolean }) {
  return (
    <Link
      href={href}
      className={`px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer hover:bg-blue-50 ${
        isBlog 
          ? 'text-blue-600 font-semibold hover:text-blue-700' 
          : 'text-gray-700 hover:text-blue-600'
      }`}
      prefetch
    >
      {label}
    </Link>
  );
}

// Mobile Navigation Link Component
function MobileNavLink({ 
  href, 
  label, 
  onClick, 
  isBlog = false 
}: { 
  href: string; 
  label: string; 
  onClick: () => void;
  isBlog?: boolean;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`block py-3 px-4 rounded-lg transition-all duration-200 cursor-pointer ${
        isBlog
          ? 'text-blue-600 font-semibold hover:bg-blue-100'
          : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
      }`}
      prefetch
    >
      {label}
    </Link>
  );
}
