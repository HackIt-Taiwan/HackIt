import React from 'react';
import { getAllEventIds } from '@/utils/podcasts';
import PodcastEventPage from '@/components/podcast/PodcastEventPage';

interface PodcastEventPageProps {
  params: {
    eventId: string;
  };
}

// 添加generateStaticParams函數以支援靜態匯出
export async function generateStaticParams() {
  const eventIds = getAllEventIds();
  
  return eventIds.map(eventId => ({
    eventId
  }));
}

export default function PodcastEvent({ params }: PodcastEventPageProps) {
  const { eventId } = params;
  
  return <PodcastEventPage eventId={eventId} />;
} 