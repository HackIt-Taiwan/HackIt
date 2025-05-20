import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NewsContent from '@/components/news/NewsContent';

interface NewsPageProps {
  params: {
    locale: string;
  };
}

// 添加generateStaticParams函數以支援靜態匯出
export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'zh-TW' }
  ];
}

export default function NewsPage({ params }: NewsPageProps) {
  const { locale } = params;
  
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <NewsContent locale={locale} />
      <Footer />
    </main>
  );
} 