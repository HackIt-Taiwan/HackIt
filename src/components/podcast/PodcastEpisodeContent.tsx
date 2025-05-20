"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaShare } from 'react-icons/fa';
import PodcastPlayer from '@/components/podcast/PodcastPlayer';
import EpisodesList from '@/components/podcast/EpisodesList';
import { PodcastEvent, PodcastEpisode, getNextEpisode } from '@/utils/podcasts';
import { useI18n } from '@/i18n';

interface PodcastEpisodeContentProps {
  podcast: PodcastEvent | null;
  episode: PodcastEpisode | null;
  eventId: string;
  episodeId: string;
}

export default function PodcastEpisodeContent({ 
  podcast, 
  episode, 
  eventId, 
  episodeId 
}: PodcastEpisodeContentProps) {
  const { t } = useI18n();
  const router = useRouter();
  
  const [nextEpisode, setNextEpisode] = useState<PodcastEpisode | null>(null);
  const [autoplay, setAutoplay] = useState(true);
  
  // 初始化下一集
  useEffect(() => {
    if (episode) {
      const next = getNextEpisode(eventId, episodeId);
      setNextEpisode(next || null);
    }
  }, [episode, eventId, episodeId]);
  
  // 處理重定向
  useEffect(() => {
    if (!podcast) {
      router.push('/podcast');
    } else if (!episode) {
      router.push(`/podcast/${eventId}`);
    }
  }, [podcast, episode, router, eventId]);
  
  // 處理集數結束
  const handleEpisodeEnd = () => {
    if (nextEpisode) {
      router.push(`/podcast/${eventId}/episodes/${nextEpisode.id}`);
    }
  };
  
  // 分享播客集數
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: episode?.title || 'HackCast Episode',
        text: episode?.description || 'Listen to this HackCast episode',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(t('podcastPage.shareAlert') as string);
    }
  };
  
  if (!podcast || !episode) {
    return null; // 等待重定向或數據載入
  }

  return (
    <>
      <section className="pt-28 md:pt-32 pb-12 md:pb-16 bg-gradient-to-b from-primary/5 to-indigo-50 dark:from-primary/10 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <Link href={`/podcast/${eventId}`} className="flex items-center text-gray-600 dark:text-gray-300 group">
              <FaArrowLeft className="mr-2 group-hover:text-primary transition-colors" />
              <span className="group-hover:text-primary transition-colors">{podcast.eventName}</span>
            </Link>
            
            <button 
              onClick={handleShare}
              className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
            >
              <FaShare className="mr-2" />
              <span>{t('podcastPage.shareEpisode')}</span>
            </button>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-2">
              {episode.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {`${podcast.eventName} • ${t('podcastPage.episode')} ${
                podcast.episodes.findIndex(ep => ep.id === episodeId) + 1
              }`}
            </p>
          </motion.div>
        </div>
      </section>
      
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* 左側：播放器 */}
            <div className="lg:w-3/5">
              <PodcastPlayer
                episode={episode}
                nextEpisode={nextEpisode}
                onEpisodeEnd={handleEpisodeEnd}
                autoplay={autoplay}
              />
            </div>
            
            {/* 右側：其他集數 */}
            <div className="lg:w-2/5">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                {t('podcastPage.episodes')}
              </h2>
              <EpisodesList
                episodes={podcast.episodes}
                eventId={eventId}
                selectedEpisodeId={episodeId}
                onSelectEpisode={(id) => router.push(`/podcast/${eventId}/episodes/${id}`)}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 