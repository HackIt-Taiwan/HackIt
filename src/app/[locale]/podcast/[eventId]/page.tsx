"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { FaMicrophone, FaArrowLeft, FaCheckCircle, FaCalendarAlt, FaPlay, FaChevronRight, FaHeadphones } from 'react-icons/fa';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EpisodesList from '@/components/podcast/EpisodesList';
import PodcastPlayer from '@/components/podcast/PodcastPlayer';
import { getPodcastByEventId, getEpisodeById, getNextEpisode, PodcastEpisode, PodcastEvent } from '@/utils/podcasts';
import { useI18n } from '@/i18n';

export default function PodcastEventPage() {
  const { t, locale } = useI18n();
  const params = useParams();
  const router = useRouter();
  const eventId = params.eventId as string;
  
  const [podcast, setPodcast] = useState<PodcastEvent | null>(null);
  const [selectedEpisodeId, setSelectedEpisodeId] = useState<string | undefined>(undefined);
  const [currentEpisode, setCurrentEpisode] = useState<PodcastEpisode | null>(null);
  const [nextEpisode, setNextEpisode] = useState<PodcastEpisode | null>(null);
  const [autoplay, setAutoplay] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load podcast data
  useEffect(() => {
    const loadPodcast = async () => {
      setIsLoading(true);
      try {
        const podcastData = await getPodcastByEventId(eventId);
        if (!podcastData) {
          router.push(`/${locale}/podcast`);
          return;
        }
        setPodcast(podcastData);
        
        // 默認選中第一集
        if (podcastData.episodes.length > 0 && !selectedEpisodeId) {
          setSelectedEpisodeId(podcastData.episodes[0].id);
        }
      } catch (error) {
        console.error('Error loading podcast:', error);
        router.push(`/${locale}/podcast`);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadPodcast();
  }, [eventId, router, locale]);
  
  // 更新當前播放的集數和下一集
  useEffect(() => {
    const loadEpisodeData = async () => {
      if (selectedEpisodeId && podcast) {
        try {
          const episode = await getEpisodeById(eventId, selectedEpisodeId);
          const next = await getNextEpisode(eventId, selectedEpisodeId);
          setCurrentEpisode(episode || null);
          setNextEpisode(next || null);
        } catch (error) {
          console.error('Error loading episode data:', error);
        }
      }
    };
    
    loadEpisodeData();
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
  
  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">{t('common.loading')}</p>
        </div>
      </main>
    );
  }

  if (!podcast) {
    return null; // 等待重定向
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      {/* 頂部區域 - 播客信息 */}
      <section className="relative pt-24 md:pt-32 pb-16 md:pb-20">
        {/* 背景 */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-gray-50 dark:from-primary/10 dark:to-gray-900 z-0"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <Link 
            href={`/${locale}/podcast`} 
            className="inline-flex items-center text-gray-600 dark:text-gray-300 mb-8 hover:text-primary dark:hover:text-primary transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            <span>{t('podcastPage.allEvents')}</span>
          </Link>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* 封面圖片區 */}
            <motion.div 
              className="md:col-span-5 lg:col-span-4" 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={podcast.coverImage}
                  alt={podcast.eventName}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                
                {/* 集數計數器徽章 */}
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-white px-3 py-1 rounded-md text-sm font-medium flex items-center">
                  <FaHeadphones className="mr-1.5" size={14} />
                  <span>{podcast.episodes.length} {t('podcastPage.episodes')}</span>
                </div>
                
                {/* 播客資訊 */}
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <div className="inline-flex items-center bg-primary/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium mb-2">
                    <FaMicrophone className="mr-1.5" size={12} />
                    <span>HackCast</span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold">{podcast.eventName}</h1>
                </div>
              </div>
              
              {/* 額外資訊 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 mt-5">
                <h2 className="font-bold text-gray-800 dark:text-white text-lg mb-3">關於此系列</h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{podcast.description}</p>
                
                {/* 共享與訂閱按鈕 */}
                <div className="flex flex-wrap gap-3">
                  <button className="flex-1 flex items-center justify-center bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-lg">
                    <FaPlay className="mr-2" size={12} />
                    從頭開始播放
                  </button>
                  <button className="flex-1 flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 py-2 px-4 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                    </svg>
                    更多選項
                  </button>
                </div>
              </div>
              
              {/* 自動播放選項 */}
              <div className="mt-5">
                <button
                  onClick={toggleAutoplay}
                  className={`flex items-center w-full px-4 py-3 rounded-lg border ${
                    autoplay 
                      ? 'bg-primary/10 border-primary text-primary dark:bg-primary/20' 
                      : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                  } transition-colors`}
                >
                  {autoplay ? (
                    <FaCheckCircle className="mr-2 text-primary" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-600 mr-2" />
                  )}
                  <span className="font-medium">{t('podcastPage.autoplay')}</span>
                </button>
              </div>
            </motion.div>
            
            {/* 右側內容區 */}
            <motion.div 
              className="md:col-span-7 lg:col-span-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* 當前播放提示 */}
              {currentEpisode && (
                <div className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md mb-5">
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">{t('podcastPage.nowPlaying')}</div>
                    <h3 className="font-bold text-gray-800 dark:text-white">{currentEpisode.title}</h3>
                  </div>
                  <div className="flex items-center text-primary">
                    <FaPlay className="mr-2" />
                    <span className="font-medium">正在播放</span>
                  </div>
                </div>
              )}
              
              {/* 集數列表與播放器 */}
              <div>
                {/* 播放器 */}
                {currentEpisode && (
                  <div className="mb-8">
                    <PodcastPlayer
                      episode={currentEpisode}
                      nextEpisode={nextEpisode}
                      onEpisodeEnd={handleEpisodeEnd}
                      autoplay={autoplay}
                    />
                  </div>
                )}
                
                {/* 集數列表 */}
                <div>
                  <EpisodesList
                    episodes={podcast.episodes}
                    eventId={eventId}
                    onSelectEpisode={handleSelectEpisode}
                    selectedEpisodeId={selectedEpisodeId}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 