import React from 'react';
import { getPodcastByEventId, getEpisodeById, getAllEventIds, getAllEpisodeIds } from '@/utils/podcasts';
import PodcastEpisodeLocaleContent from '@/components/podcast/PodcastEpisodeLocaleContent';

interface PodcastEpisodePageProps {
  params: {
    locale: string;
    eventId: string;
    episodeId: string;
  };
}

// 添加generateStaticParams函數以支援靜態匯出
export async function generateStaticParams() {
  const eventIds = getAllEventIds();
  const locales = ['en', 'zh-TW']; // 支援的語言列表
  
  const params = [];
  
  for (const locale of locales) {
    for (const eventId of eventIds) {
      const podcast = getPodcastByEventId(eventId);
      if (podcast) {
        for (const episode of podcast.episodes) {
          params.push({
            locale,
            eventId,
            episodeId: episode.id
          });
        }
      }
    }
  }
  
  return params;
}

export default function PodcastEpisodePage({ params }: PodcastEpisodePageProps) {
  const { locale, eventId, episodeId } = params;
  
  return <PodcastEpisodeLocaleContent locale={locale} eventId={eventId} episodeId={episodeId} />;
} 