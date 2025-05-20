'use client';

import React, { ReactNode } from 'react';
import { I18nProvider, Locale } from '@/i18n';

interface I18nClientProviderProps {
  children: ReactNode;
  locale: Locale;
}

// 客戶端 I18n 提供者
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