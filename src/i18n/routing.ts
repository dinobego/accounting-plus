import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['me', 'en', 'tr'],
  defaultLocale: 'me',
  localePrefix: 'always',
  localeDetection: false,
  alternateLinks: false,
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
