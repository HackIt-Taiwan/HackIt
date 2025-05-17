'use client';

import { useRouter, usePathname } from 'next/navigation';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import zhTW from './translations/zh-TW.json';
import en from './translations/en.json';

// 定義支持的語言
export const LANGUAGES = {
  'zh-TW': '繁體中文',
  'en': 'English',
};

// 翻譯字典
const translations = {
  'zh-TW': zhTW,
  'en': en,
};

export type Locale = 'zh-TW' | 'en';

// i18n Context
interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const defaultContext: I18nContextType = {
  locale: 'zh-TW',
  setLocale: () => {},
  t: (key: string) => key,
};

export const I18nContext = createContext<I18nContextType>(defaultContext);

// i18n Provider
interface I18nProviderProps {
  children: ReactNode;
  initialLocale?: Locale;
}

export function I18nProvider({ children, initialLocale = 'zh-TW' }: I18nProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  // 從 localStorage 獲取初始語言 (客戶端才執行)
  useEffect(() => {
    // 檢查是否在客戶端環境
    if (typeof window === 'undefined') return;
    
    const savedLocale = localStorage.getItem('locale') as Locale;
    if (savedLocale && Object.keys(translations).includes(savedLocale)) {
      setLocaleState(savedLocale);
    }
  }, []);

  // 設置語言並保存到 localStorage
  const setLocale = (newLocale: Locale) => {
    // 檢查是否在客戶端環境
    if (typeof window === 'undefined') return;
    
    localStorage.setItem('locale', newLocale);
    setLocaleState(newLocale);
    
    // 導航到相同頁面但使用新語言
    if (pathname) {
      let newPath = pathname;
      // 處理語言前綴
      const segments = pathname.split('/').filter(Boolean);
      if (segments[0] && Object.keys(translations).includes(segments[0])) {
        // 已有語言前綴，替換它
        segments[0] = newLocale;
        newPath = '/' + segments.join('/');
      } else {
        // 沒有語言前綴，添加它
        newPath = `/${newLocale}${pathname}`;
      }
      
      router.push(newPath);
    }
  };

  // 翻譯函數
  const t = (key: string): string => {
    // 解析鍵路徑，例如 'common.home'
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
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

// 使用 i18n 的 Hook
export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
} 