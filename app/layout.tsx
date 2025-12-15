// src/app/layout.tsx

// import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext'; 
import { LocaleProvider } from '@/context/LocaleContext';

// ... metadata definition ...

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* 💡 Check for correct structure here */}
        <AuthProvider>
          <LocaleProvider>
            {children}
          </LocaleProvider>
        </AuthProvider>
      </body>
    </html>
  );
}