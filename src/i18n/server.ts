import zhTW from './translations/zh-TW.json';
import en from './translations/en.json';
import { Locale } from './index';

// 翻譯字典
const translations = {
  'zh-TW': zhTW,
  'en': en,
};

export async function getTranslations(locale: string = 'zh-TW') {
  // 確保 locale 是支持的，否則返回默認值
  const normalizedLocale = (locale === 'zh-TW' || locale === 'en') ? locale : 'zh-TW';
  
  // 簡單的翻譯函數
  return function t(key: string, values?: Record<string, any>) {
    // 解析鍵路徑，例如 'common.home'
    const keys = key.split('.');
    let value = translations[normalizedLocale as Locale] as any;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`[Server] Translation key not found: ${key}`);
        return key;
      }
    }
    
    if (typeof value === 'string') {
      if (values) {
        // 簡單的變數替換，不支持複雜的 HTML 處理
        return Object.entries(values).reduce((result, [key, value]) => {
          // 簡單替換 {key} 模式的變數
          return result.replace(new RegExp(`{${key}}`, 'g'), String(value));
        }, value);
      }
      return value;
    }
    
    // 如果值是陣列或物件，直接返回
    if (value !== null && typeof value === 'object') {
      return value;
    }
    
    return key;
  };
} 