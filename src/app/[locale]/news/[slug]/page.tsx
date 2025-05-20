import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getNewsBySlug, NewsItem, getLatestNews, getNewsFiles } from '@/utils/news';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NewsDetailContent from '@/components/news/NewsDetailContent';

interface NewsDetailPageProps {
  params: {
    slug: string;
    locale: string;
  };
}

// 添加generateStaticParams函數以支援靜態匯出
export async function generateStaticParams() {
  const newsFiles = getNewsFiles();
  const locales = ['en', 'zh-TW']; // 支援的語言列表
  
  const params = [];
  
  for (const locale of locales) {
    for (const slug of newsFiles) {
      params.push({
        locale,
        slug
      });
    }
  }
  
  return params;
}

export default function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug, locale } = params;
  
  // 直接獲取新聞內容和相關新聞
  const news = getNewsBySlug(slug);
  if (!news) {
    notFound();
  }
  
  // 獲取相關新聞（簡單取最新的 3 則，排除當前文章）
  const relatedNews = getLatestNews(4).filter(item => item.slug !== slug).slice(0, 3);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <NewsDetailContent 
        news={news}
        slug={slug}
      />
      <Footer />
    </main>
  );
} 