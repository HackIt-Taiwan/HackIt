"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FaMicrophone, FaSearch, FaHeadphones, FaPlay } from 'react-icons/fa';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PodcastEventCard from '@/components/podcast/PodcastEventCard';
import EpisodesList from '@/components/podcast/EpisodesList';
import PodcastPlayer from '@/components/podcast/PodcastPlayer';
import { getAllPodcasts, getLatestEpisodes, formatDuration, getAllPodcastEvents } from '@/utils/podcasts';
import { useI18n } from '@/i18n';

export default function PodcastPage() {
  const { t } = useI18n();
  const [podcastEpisodes, setPodcastEpisodes] = useState(getAllPodcasts());
  const [podcastEvents, setPodcastEvents] = useState(getAllPodcastEvents());
  const [latestEpisodes, setLatestEpisodes] = useState(getLatestEpisodes(4));
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredEpisode, setHoveredEpisode] = useState<string | null>(null);

  // 動畫變體
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      {/* 主視覺 */}
      <section className="pt-28 md:pt-36 pb-16 md:pb-20 bg-gradient-to-b from-primary/5 to-indigo-50 dark:from-primary/10 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center bg-primary/10 dark:bg-primary/20 text-primary px-4 py-2 rounded-full mb-4">
              <FaMicrophone className="mr-2" />
              HackCast
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-800 dark:text-white">
              <span dangerouslySetInnerHTML={{ __html: t('podcastPage.title') as string }}></span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
              {t('podcastPage.subtitle')}
            </p>
            
            {/* 搜尋欄 */}
            <div className="max-w-2xl mx-auto mt-8 relative">
              <div className="relative">
                <input
                  type="text"
                  placeholder={String(t('podcastPage.searchPlaceholder'))}
                  className="w-full px-4 py-3 pl-10 rounded-lg border-2 border-gray-200 dark:border-gray-700 focus:outline-none focus:border-primary dark:bg-gray-800 dark:text-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* 裝飾 */}
        <div className="hidden md:block absolute -bottom-10 left-0 transform rotate-180 opacity-10 dark:opacity-5">
          <svg width="300" height="300" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" className="text-primary"/>
            <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="2" className="text-primary"/>
            <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="2" className="text-primary"/>
          </svg>
        </div>
        <div className="hidden md:block absolute top-20 right-0 opacity-10 dark:opacity-5">
          <svg width="200" height="200" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 0 L100 50 L50 100 L0 50 Z" stroke="currentColor" strokeWidth="2" className="text-primary" fill="none"/>
            <path d="M25 25 L75 25 L75 75 L25 75 Z" stroke="currentColor" strokeWidth="2" className="text-primary" fill="none"/>
            <circle cx="50" cy="50" r="15" stroke="currentColor" strokeWidth="2" className="text-primary" fill="none"/>
          </svg>
        </div>
      </section>
      
      {/* 最新集數 */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 dark:text-white mb-4">
              {t('podcastPage.latestEpisodes')}
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              開始聆聽最新的播客集數，了解我們籌辦活動的幕後心路歷程與各種精彩故事
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestEpisodes.map((episode, index) => (
              <motion.div
                key={episode.id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
                className="relative h-full"
                onMouseEnter={() => setHoveredEpisode(episode.id)}
                onMouseLeave={() => setHoveredEpisode(null)}
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md h-full">
                  <div className="relative aspect-square">
                    <Image
                      src={episode.coverImage || ''}
                      alt={episode.title || ''}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ 
                          scale: hoveredEpisode === episode.id ? 1 : 0.8, 
                          opacity: hoveredEpisode === episode.id ? 1 : 0 
                        }}
                        whileHover={{ scale: 1.1 }}
                        className="bg-primary text-white p-4 rounded-full cursor-pointer"
                      >
                        <FaPlay className="text-xl" />
                      </motion.div>
                    </div>
                    <div className="absolute bottom-0 left-0 p-4 text-white">
                      <p className="font-bold text-lg line-clamp-2">{episode.title}</p>
                      <p className="text-sm opacity-90">{formatDuration(episode.duration)}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* 所有活動的播客 */}
      <section className="py-12 md:py-16 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 dark:text-white mb-4">
              聆聽各個活動的籌備歷程
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              選擇您感興趣的活動，深入了解每個活動背後的籌備過程、團隊合作與創意發想
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {podcastEvents.map((podcast, index) => (
              <PodcastEventCard 
                key={podcast.eventId} 
                podcast={podcast} 
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 