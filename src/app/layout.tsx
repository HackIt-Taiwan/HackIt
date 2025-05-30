import '../styles/globals.css';
import type { Metadata } from 'next';
import ClientThemeProvider from '@/components/ClientThemeProvider';
import I18nClientProvider from '@/components/I18nClientProvider';
import { Locale } from '@/i18n';

export const metadata: Metadata = {
  title: 'HackIt - 青少年駭客社群',
  description: '由台灣青少年為青少年打造的程式社群，一起創造、學習、分享程式的樂趣！',
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params?: { locale?: string };
}) {
  // 獲取當前語言
  const locale = (params?.locale || 'zh-TW') as Locale;
  
  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-light dark:bg-dark min-h-screen antialiased">
        <I18nClientProvider locale={locale}>
        <ClientThemeProvider>
          <div className="absolute w-full h-40 top-0 left-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 dark:from-primary/20 dark:via-secondary/20 dark:to-accent/20"></div>
          <div className="min-h-screen relative z-10">
            {children}
          </div>
        </ClientThemeProvider>
        </I18nClientProvider>
      </body>
    </html>
  );
} 