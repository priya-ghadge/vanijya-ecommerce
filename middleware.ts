import createMiddleware from 'next-intl/middleware';
import { routing } from './routing';

export default createMiddleware({
  ...routing,
  // This is the most important part:
  localeDetection: false, 
  localePrefix: 'always'
});

export const config = {
  // We need to make sure the middleware catches EVERY route
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};