import "../global.css"
import { NextIntlClientProvider } from 'next-intl';
import { AuthProvider } from '@/context/AuthContext'; 
import { getMessages } from 'next-intl/server';

export default async function RootLayout(props:{
  children: React.ReactNode;
  params: Promise<{ locale: string }>; 
}) {
  // CRITICAL: You MUST await params in Next.js 16
  const { locale } = await props.params;
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <AuthProvider>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {props.children}
        </NextIntlClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}