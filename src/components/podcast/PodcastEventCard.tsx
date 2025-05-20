"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { PodcastEvent } from '@/utils/podcasts';
import { FaMicrophone, FaHeadphones, FaPlayCircle } from 'react-icons/fa';
import { useI18n } from '@/i18n';

interface PodcastEventCardProps {
  podcast: PodcastEvent;
  index: number;
}

export default function PodcastEventCard({ podcast, index }: PodcastEventCardProps) {
  const { t, locale } = useI18n();
  
  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Link href={`/${locale}/podcast/${podcast.eventId}`} className="block h-full">
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md h-full transform transition-all duration-300"
          whileHover={{ 
            scale: 1.03, 
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
            y: -5 
          }}
        >
          <div className="relative h-52 w-full overflow-hidden">
            <Image
              src={podcast.coverImage}
              alt={podcast.eventName}
              fill
              unoptimized
              className="object-cover transition-transform duration-700"
              style={{
                objectPosition: 'center'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            
            {/* 播客徽章 */}
            <div className="absolute top-4 left-4 bg-primary/90 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
              <FaMicrophone className="mr-1.5" size={12} />
              <span>HackCast</span>
            </div>
            
            {/* 集數指示器 */}
            <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-white px-3 py-1 rounded-full text-sm font-medium">
              <span>{podcast.episodes.length} {t('podcastPage.episodes') as string}</span>
            </div>
            
            {/* 播放按鈕疊加層 */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <motion.div 
                className="bg-white dark:bg-primary rounded-full p-3 shadow-xl"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaPlayCircle className="text-primary dark:text-white" size={30} />
              </motion.div>
            </div>
            
            {/* 標題在圖片上 */}
            <div className="absolute bottom-0 left-0 p-4 text-white">
              <h3 className="text-xl font-bold line-clamp-2">{podcast.eventName}</h3>
            </div>
          </div>
          
          <div className="p-4">
            <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-4">
              {podcast.description}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                <FaHeadphones className="mr-1.5" size={14} />
                <span>
                  {podcast.episodes.length > 0 
                    ? `${podcast.episodes[0].releaseDate.substring(0, 4)} - 現在` 
                    : '無集數'}
                </span>
              </div>
              <motion.div
                className="text-sm bg-primary/10 text-primary dark:bg-primary/20 px-3 py-1 rounded-full font-medium"
                whileHover={{ scale: 1.05 }}
              >
                {t('podcastPage.play') as string}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
} 