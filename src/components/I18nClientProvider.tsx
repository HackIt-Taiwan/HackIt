'use client';

import React, { ReactNode } from 'react';
import { I18nProvider, Locale } from '@/i18n';

interface I18nClientProviderProps {
  children: ReactNode;
  locale: Locale;
}

// 這是一個客戶端組件包裝器，專門用來包裝 I18nProvider
const I18nClientProvider: React.FC<I18nClientProviderProps> = ({ 
  children, 
  locale 
}) => {
  return (
    <I18nProvider initialLocale={locale}>
      {children}
    </I18nProvider>
  );
};

export default I18nClientProvider; 