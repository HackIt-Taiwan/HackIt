import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PodcastEventContent from '@/components/podcast/PodcastEventContent';
import { getPodcastByEventId, getAllEventIds } from '@/utils/podcasts';

interface PodcastEventPageProps {
  params: {
    locale: string;
    eventId: string;
  };
}

// 添加generateStaticParams函數以支援靜態匯出
export async function generateStaticParams() {
  const eventIds = getAllEventIds();
  const locales = ['en', 'zh-TW']; // 支援的語言列表
  
  const paths = [];
  
  for (const locale of locales) {
    for (const eventId of eventIds) {
      paths.push({
        locale,
        eventId
      });
    }
  }
  
  return paths;
}

export default function PodcastEventPage({ params }: PodcastEventPageProps) {
  const { locale, eventId } = params;
  const podcast = getPodcastByEventId(eventId);
  
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <PodcastEventContent 
        podcast={podcast} 
        eventId={eventId} 
        locale={locale} 
      />
      <Footer />
    </main>
  );
} 