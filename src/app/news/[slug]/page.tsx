import React from 'react';
import { getNewsBySlug, getNewsFiles } from '@/utils/news';
import { notFound } from 'next/navigation';
import NewsDetailContent from '@/components/news/NewsDetailContent';

interface NewsDetailPageProps {
  params: {
    slug: string;
  };
}

// 添加generateStaticParams函數以支援靜態匯出
export async function generateStaticParams() {
  const slugs = getNewsFiles();
  
  return slugs.map(slug => ({
    slug
  }));
}

export default function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = params;
  
  // 獲取新聞內容
  const news = getNewsBySlug(slug);
  if (!news) {
    notFound();
  }
  
  return <NewsDetailContent news={news} slug={slug} />;
} 