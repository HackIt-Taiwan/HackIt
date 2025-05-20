import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PodcastEpisodeContent from '@/components/podcast/PodcastEpisodeContent';
import { getPodcastByEventId, getAllEventIds, getEpisodeById, getAllEpisodeIds } from '@/utils/podcasts';

interface PodcastEpisodePageProps {
  params: {
    eventId: string;
    episodeId: string;
  };
}

// 添加generateStaticParams函數以支援靜態匯出
export async function generateStaticParams() {
  const paths = [];
  const eventIds = getAllEventIds();
  
  for (const eventId of eventIds) {
    const podcast = getPodcastByEventId(eventId);
    if (podcast) {
      for (const episode of podcast.episodes) {
        paths.push({
          eventId,
          episodeId: episode.id
        });
      }
    }
  }
  
  return paths;
}

export default function PodcastEpisodePage({ params }: PodcastEpisodePageProps) {
  const { eventId, episodeId } = params;
  const podcast = getPodcastByEventId(eventId);
  const episode = getEpisodeById(eventId, episodeId);
  
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <PodcastEpisodeContent 
        podcast={podcast}
        episode={episode}
        eventId={eventId}
        episodeId={episodeId}
      />
      <Footer />
    </main>
  );
} 