import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'hi'],
 
  // Used when no locale matches
  defaultLocale: 'en'
});

// Lightweight wrappers around Next.js navigation APIs
// that will automatically add the locale prefix (e.g. /en/signup)
export const {Link, redirect, usePathname, useRouter} = createNavigation(routing);