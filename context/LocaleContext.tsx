// src/context/LocaleContext.tsx

"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';

type Locale = 'en' | 'hi' | 'mr';

interface LocaleContextType {
  locale: Locale;
  setLocale: (newLocale: Locale) => void;
  availableLocales: { code: Locale, name: string }[];
}
const availableLocales: { code: Locale, name: string }[] = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिन्दी (Hindi)' },
  { code: 'mr', name: 'मराठी (Marathi)' },
]

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);


interface LocaleProviderProps {
  children: ReactNode;
}

export const LocaleProvider: React.FC<LocaleProviderProps> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>('en'); // Default to English

  return (
    <LocaleContext.Provider value={{ locale, setLocale, availableLocales }}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
};