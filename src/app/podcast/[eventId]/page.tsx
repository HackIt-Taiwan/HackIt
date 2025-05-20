"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { FaMicrophone, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EpisodesList from '@/components/podcast/EpisodesList';
import PodcastPlayer from '@/components/podcast/PodcastPlayer';
import { getPodcastByEventId, getEpisodeById, getNextEpisode, PodcastEpisode } from '@/utils/podcasts';
import { useI18n } from '@/i18n';

export default function PodcastEventPage() {
  const { t } = useI18n();
  const params = useParams();
  const router = useRouter();
  const eventId = params.eventId as string;
  
  const [podcast, setPodcast] = useState(() => getPodcastByEventId(eventId));
  const [selectedEpisodeId, setSelectedEpisodeId] = useState<string | undefined>(undefined);
  const [currentEpisode, setCurrentEpisode] = useState<PodcastEpisode | null>(null);
  const [nextEpisode, setNextEpisode] = useState<PodcastEpisode | null>(null);
  const [autoplay, setAutoplay] = useState(false);
  
  // 如果找不到活動，重定向到主頁
  useEffect(() => {
    if (!podcast) {
      router.push('/podcast');
    } else if (podcast.episodes.length > 0 && !selectedEpisodeId) {
      // 默認選中第一集
      handleSelectEpisode(podcast.episodes[0].id);
    }
  }, [podcast, router, selectedEpisodeId]);
  
  // 更新當前播放的集數和下一集
  useEffect(() => {
    if (selectedEpisodeId && podcast) {
      const episode = getEpisodeById(eventId, selectedEpisodeId);
      const next = getNextEpisode(eventId, selectedEpisodeId);
      setCurrentEpisode(episode || null);
      setNextEpisode(next || null);
    }
  }, [selectedEpisodeId, eventId, podcast]);
  
  // 選擇集數
  const handleSelectEpisode = (episodeId: string) => {
    setSelectedEpisodeId(episodeId);
  };
  
  // 處理集數結束
  const handleEpisodeEnd = () => {
    if (nextEpisode) {
      setSelectedEpisodeId(nextEpisode.id);
      setAutoplay(true);
    }
  };
  
  // 切換自動播放
  const toggleAutoplay = () => {
    setAutoplay(!autoplay);
  };
  
  if (!podcast) {
    return null; // 等待重定向
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      {/* 頂部區域 */}
      <section className="pt-28 md:pt-32 pb-12 md:pb-16 bg-gradient-to-b from-primary/5 to-indigo-50/50 dark:from-primary/10 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <Link href="/podcast" className="flex items-center text-gray-600 dark:text-gray-300 mb-6 group">
            <FaArrowLeft className="mr-2 group-hover:text-primary transition-colors" />
            <span className="group-hover:text-primary transition-colors">{t('podcastPage.allEvents')}</span>
          </Link>
          
          <div className="flex flex-col md:flex-row gap-8">
            <motion.div 
              className="md:w-1/3" 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative w-full aspect-square rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={podcast.coverImage}
                  alt={podcast.eventName}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <div className="flex items-center mb-2">
                    <FaMicrophone className="mr-2 text-primary" />
                    <span className="font-medium">HackCast</span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold">{podcast.eventName}</h1>
                  <p className="mt-2 text-gray-200">{t('podcastPage.episodes')}: {podcast.episodes.length}</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="md:w-2/3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4">
                {podcast.eventName}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {podcast.description}
              </p>
              
              {/* 控制與資訊 */}
              <div className="flex flex-wrap gap-4 items-center mb-6">
                <button
                  onClick={toggleAutoplay}
                  className={`flex items-center px-4 py-2 rounded-lg border ${
                    autoplay 
                      ? 'border-primary bg-primary/10 text-primary' 
                      : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  {autoplay && <FaCheckCircle className="mr-2" />}
                  {t('podcastPage.autoplay')}
                </button>
              </div>
              
              {currentEpisode && (
                <div className="p-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-gray-700">
                  <h2 className="font-medium text-gray-800 dark:text-white">
                    {t('podcastPage.nowPlaying')}
                  </h2>
                  <p className="text-primary font-bold">{currentEpisode.title}</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
      
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* 左側：集數列表 */}
            <div className="lg:w-2/5">
              <EpisodesList
                episodes={podcast.episodes}
                eventId={eventId}
                onSelectEpisode={handleSelectEpisode}
                selectedEpisodeId={selectedEpisodeId}
              />
            </div>
            
            {/* 右側：播放器 */}
            <div className="lg:w-3/5">
              {currentEpisode && (
                <PodcastPlayer
                  episode={currentEpisode}
                  nextEpisode={nextEpisode}
                  onEpisodeEnd={handleEpisodeEnd}
                  autoplay={autoplay}
                />
              )}
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 