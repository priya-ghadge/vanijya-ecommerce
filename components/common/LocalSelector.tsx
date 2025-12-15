// src/components/common/LocaleSelector.tsx

"use client";

import React from 'react';
import { useLocale } from '@/context/LocaleContext';

const LocaleSelector: React.FC = () => {
  const { locale, setLocale, availableLocales } = useLocale();
  const foregroundColor = `rgb(var(--color-foreground))`;

  return (
    <div className="flex items-center space-x-2">
      <label 
        htmlFor="locale-select" 
        className="text-sm font-medium"
        style={{ color: foregroundColor }}
      >
        Language:
      </label>
      
      <select
        id="locale-select"
        value={locale}
        onChange={(e) => setLocale(e.target.value as 'en' | 'hi' | 'mr')}
        // 💡 FIXED: Using Tailwind classes for all styling, including focus effects
        className="
          p-2 border border-gray-300 rounded-md shadow-sm bg-white 
          text-gray-900 
          focus:outline-none 
          focus:ring-2 
          focus:ring-primary-500  /* Standard Tailwind way to set ring color, assumes primary color defined */
          focus:border-primary-500
          transition duration-150
        "
        // 💡 REMOVED: All problematic inline styles were here.
        // We can keep color for consistency if needed, but it's best to use Tailwind classes.
      >
        {availableLocales.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocaleSelector;