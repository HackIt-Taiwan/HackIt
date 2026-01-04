"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FaPlayCircle, FaCalendar, FaClock, FaPlay } from 'react-icons/fa';
import { PodcastEpisode, formatDuration, formatReleaseDate } from '@/utils/podcasts';
import { useI18n } from '@/i18n';

interface EpisodesListProps {
  episodes: PodcastEpisode[];
  eventId: string;
  onSelectEpisode?: (episodeId: string) => void;
  selectedEpisodeId?: string;
}

export default function EpisodesList({ 
  episodes, 
  eventId, 
  onSelectEpisode,
  selectedEpisodeId
}: EpisodesListProps) {
  const { t } = useI18n();

  const handleEpisodeClick = (episodeId: string) => {
    if (onSelectEpisode) {
      onSelectEpisode(episodeId);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          {t('podcastPage.episodes')}
        </h2>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {episodes.length} {episodes.length === 1 ? '集' : '集'}
        </div>
      </div>
      
      {episodes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center bg-gray-50 dark:bg-gray-800/50 rounded-xl">
          <svg className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
          <p className="text-gray-500 dark:text-gray-400 mb-2 font-medium">{t('podcastPage.noEpisodes')}</p>
          <p className="text-gray-400 dark:text-gray-500 text-sm max-w-xs">尚未發布任何集數，請稍後再回來查看。</p>
        </div>
      ) : (
        <div className="space-y-4">
          {episodes.map((episode, index) => (
            <motion.div
              key={episode.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className={`rounded-xl overflow-hidden relative ${
                selectedEpisodeId === episode.id 
                  ? 'ring-2 ring-primary ring-offset-2 dark:ring-offset-gray-900' 
                  : 'hover:bg-gray-50 dark:hover:bg-gray-800/70'
              } bg-white dark:bg-gray-800 shadow-sm transition-all duration-200`}
              onClick={() => handleEpisodeClick(episode.id)}
              whileHover={{ y: -2, boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)' }}
            >
              <div className="flex p-4 cursor-pointer">
                {/* Play button */}
                <div className="flex-shrink-0">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`rounded-full flex items-center justify-center ${
                      selectedEpisodeId === episode.id 
                        ? 'bg-primary text-white' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white'
                    } h-10 w-10`}
                  >
                    {selectedEpisodeId === episode.id 
                      ? <FaPlay /> 
                      : <FaPlayCircle />}
                  </motion.div>
                </div>
                
                {/* Episode content */}
                <div className="ml-4 flex-grow min-w-0">
                  <div className="flex items-center text-xs text-primary dark:text-primary/90 font-medium mb-1">
                    <span className="bg-primary/10 dark:bg-primary/20 px-2 py-0.5 rounded-full">
                      {t('podcastPage.episode')} {index + 1}
                    </span>
                  </div>
                  
                  <h3 className={`font-bold mb-1 line-clamp-1 ${
                    selectedEpisodeId === episode.id 
                      ? 'text-primary' 
                      : 'text-gray-800 dark:text-white'
                  }`}>
                    {episode.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-2">
                    {episode.description}
                  </p>
                  
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 space-x-3">
                    <span className="flex items-center">
                      <FaClock className="mr-1" /> {formatDuration(episode.duration)}
                    </span>
                    <span className="flex items-center">
                      <FaCalendar className="mr-1" /> {formatReleaseDate(episode.releaseDate)}
                    </span>
                  </div>
                </div>
                
                {/* Selected indicator */}
                {selectedEpisodeId === episode.id && (
                  <div className="absolute top-3 right-3 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
} 
