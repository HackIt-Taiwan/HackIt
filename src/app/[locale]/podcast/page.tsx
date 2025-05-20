import React from 'react';
import PodcastLocalePageContent from '@/components/podcast/PodcastLocalePageContent';

// 添加generateStaticParams函數以支援靜態匯出
export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'zh-TW' }
  ];
}

export default function PodcastPage() {
  return <PodcastLocalePageContent />;
} 