import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AboutContent from '@/components/about/AboutContent';

interface AboutPageProps {
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

export default function AboutPage({ params }: AboutPageProps) {
  const { locale } = params;
  
  return (
    <main className="relative">
      <Navbar />
      <AboutContent locale={locale} />
      <Footer />
    </main>
  );
} 