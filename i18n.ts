import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

const messageMap: Record<string, () => Promise<any>> = {
  en: () => import('./messages/en.json'),
  hi: () => import('./messages/hi.json'),
};

export default getRequestConfig(async (params) => {
  // Validate that the incoming locale is supported
  // if (!routing.locales.includes(locale as any)) {
  //    locale = routing.defaultLocale;
  // }
  console.log("params.locale", params.locale)
  const locale = params.locale || 'hi'
  console.log(`Attempting to load: ./messages/${locale}.json`);
//   const loadMessages = messageMap[locale as string] || messageMap.en;
//   const messages = (await loadMessages()).default;

  return {
    locale: locale as string,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});