'use client';

import { useRouter, usePathname } from 'next/navigation';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import zhTW from './translations/zh-TW.json';
import en from './translations/en.json';

// Supported locales.
export const LANGUAGES = {
  'zh-TW': '繁體中文',
  'en': 'English',
};

// Translation map per locale.
const translations = {
  'zh-TW': zhTW,
  'en': en,
};

export type Locale = 'zh-TW' | 'en';

// i18n Context
interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, values?: Record<string, ReactNode | ((children: ReactNode) => ReactNode) | string | number>) => ReactNode;
}

const defaultContext: I18nContextType = {
  locale: 'zh-TW',
  setLocale: () => {},
  t: (key: string) => key,
};

// Create context.
export const I18nContext = createContext<I18nContextType>(defaultContext);

// i18n provider.
interface I18nProviderProps {
  children: ReactNode;
  initialLocale?: Locale;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ 
  children, 
  initialLocale = 'zh-TW' 
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  useEffect(() => {
    // Detect locale from the URL path.
    const pathLocale = pathname.split('/')[1] as Locale;
    if (pathLocale && Object.keys(LANGUAGES).includes(pathLocale)) {
      setLocaleState(pathLocale);
    }
  }, [pathname]);

  // Update URL when changing locale.
  const setLocale = (newLocale: Locale) => {
    if (newLocale === locale) return;

    try {
      // Persist locale in cookie for middleware/SSR
      document.cookie = `locale=${newLocale}; Path=/; Max-Age=31536000; SameSite=Lax`;
    } catch {}

    setLocaleState(newLocale);

    // Update the locale segment in the URL.
    const newPathname = pathname.split('/').slice(2).join('/');
    router.push(`/${newLocale}/${newPathname}`);
  };

  // Translation helper.
  const t = (key: string, values?: Record<string, ReactNode | ((children: ReactNode) => ReactNode) | string | number>): ReactNode => {
    // Resolve a dotted key path (e.g., 'common.home').
    const keys = key.split('.');
    let value = translations[locale] as any;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }
    
    if (typeof value === 'string') {
      if (values) {
        // Basic rich text support: replace <tag>{content}</tag> or <tag/>
        const parts: ReactNode[] = [];
        let lastIndex = 0;
        const regex = /<([a-zA-Z0-9_]+)>([\s\S]*?)<\/\1>|<([a-zA-Z0-9_]+)\/>/g;
        let match;

        while ((match = regex.exec(value)) !== null) {
          if (match.index > lastIndex) {
            parts.push(value.substring(lastIndex, match.index));
          }
          
          const tagName = match[1] || match[3];
          const tagContent = match[2];
          const replacement = values[tagName];

          if (replacement) {
            if (typeof replacement === 'function') {
              parts.push(React.createElement(React.Fragment, { key: match.index }, replacement(tagContent || '')));
            } else {
              parts.push(React.createElement(React.Fragment, { key: match.index }, replacement));
            }
          } else {
            // Keep the original tag if no replacement is found
            parts.push(match[0]);
          }
          lastIndex = regex.lastIndex;
        }

        if (lastIndex < value.length) {
          parts.push(value.substring(lastIndex));
        }
        return parts.length > 0 ? React.createElement(React.Fragment, null, ...parts) : value;
      }
      return value;
    }
    
    // If the value is an array or object, return it directly.
    if (value !== null && typeof value === 'object') {
      return value;
    }
    
    return key;
  };
  
  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
};

// Hook to access the i18n context.
export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
} 
