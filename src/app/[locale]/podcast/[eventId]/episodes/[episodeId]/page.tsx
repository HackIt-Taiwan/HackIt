"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { FaArrowLeft, FaShare, FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaStepForward } from 'react-icons/fa';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PodcastPlayer from '@/components/podcast/PodcastPlayer';
import EpisodesList from '@/components/podcast/EpisodesList';
import { getPodcastByEventId, getEpisodeById, getNextEpisode, PodcastEpisode, PodcastEvent } from '@/utils/podcasts';
import { useI18n } from '@/i18n';

// Placeholder for a nicer loading state
function EpisodeLoadingSkeleton() {
  return (
    <div className="container mx-auto px-4 py-10 animate-pulse">
      <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
      <div className="rounded-lg bg-gray-300 dark:bg-gray-700 h-64 w-full md:w-1/3 mb-6"></div>
      <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
      <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-6"></div>
      <div className="space-y-4">
        <div className="h-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
      </div>
    </div>
  );
}

export default function PodcastEpisodePage() {
  const { t } = useI18n();
  const params = useParams();
  const router = useRouter();
  const eventId = params.eventId as string;
  const episodeId = params.episodeId as string;
  
  const [podcast, setPodcast] = useState<PodcastEvent | null>(null);
  const [episode, setEpisode] = useState<PodcastEpisode | null>(null);
  const [nextEpisode, setNextEpisode] = useState<PodcastEpisode | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      
      try {
        // Load podcast data first
        const podcastData = await getPodcastByEventId(eventId);
        if (!podcastData) {
          router.push('/podcast');
          return;
        }
        setPodcast(podcastData);
        
        // Load episode data
        const foundEpisode = await getEpisodeById(eventId, episodeId);
        if (!foundEpisode) {
          router.push(`/podcast/${eventId}`);
          return;
        }
        setEpisode(foundEpisode);
        
        // Load next episode
        const next = await getNextEpisode(eventId, episodeId);
        setNextEpisode(next || null);
      } catch (error) {
        console.error('Error loading podcast data:', error);
        router.push('/podcast');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [eventId, episodeId, router]);
  
  const handleEpisodeEnd = () => {
    if (nextEpisode) {
      router.push(`/podcast/${eventId}/episodes/${nextEpisode.id}`);
    }
  };
  
  const handleShare = () => {
    if (navigator.share && episode) {
      navigator.share({
        title: episode.title,
        text: episode.description?.substring(0, 100) + '...' || 'Listen to this HackCast episode',
        url: window.location.href,
      }).catch(error => console.log('Error sharing:', error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(t('podcastPage.shareAlert') + ': ' + window.location.href);
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-100 dark:bg-black flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <EpisodeLoadingSkeleton />
        </div>
        <Footer />
      </main>
    );
  }

  if (!podcast || !episode) {
    // This case should ideally be handled by the loading state or redirect
    return null; 
  }

  const episodeIndex = podcast.episodes.findIndex(ep => ep.id === episodeId) + 1;
  const coverImage = episode.coverImage || podcast.coverImage || '/images/podcasts/default-cover.png'; // Fallback cover

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } },
    exit: { opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } }
  };

  const contentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2, ease: "easeOut" } }
  };
  
  const playerVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.4, ease: "easeOut" } }
  };

  return (
    <motion.main 
      key={episodeId} // Ensure re-animation on episode change
      className="min-h-screen bg-gray-100 dark:bg-black text-gray-800 dark:text-gray-200 flex flex-col"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Navbar />
      
      <div className="flex-grow pt-24 md:pt-32 pb-12 md:pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back and Share Buttons */}
          <motion.div 
            className="flex justify-between items-center mb-6 md:mb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } }}
          >
            <Link 
              href={`/podcast/${eventId}`} 
              className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-dark transition-colors group"
            >
              <FaArrowLeft className="mr-2 text-base" />
              <span className="truncate max-w-[150px] sm:max-w-xs">{podcast.eventName}</span>
            </Link>
            
            <button 
              onClick={handleShare}
              aria-label={t('podcastPage.shareEpisode') as string}
              className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-dark transition-colors p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800"
            >
              <FaShare className="mr-0 sm:mr-2 text-base" />
              <span className="hidden sm:inline">{t('podcastPage.shareEpisode')}</span>
            </button>
          </motion.div>

          {/* Main Content: Cover, Info, Player */}
          <motion.div 
            className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start"
            variants={contentVariants}
          >
            {/* Left/Top: Cover Image */}
            <motion.div 
              className="w-full md:w-2/5 lg:w-1/3 flex-shrink-0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.7, delay: 0.3, ease: [0.6, -0.05, 0.01, 0.99] } }} // Spring-like
            >
              <div className="aspect-square rounded-xl shadow-2xl overflow-hidden bg-gray-200 dark:bg-gray-800">
                <Image
                  src={coverImage}
                  alt={episode.title}
                  width={800}
                  height={800}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
            </motion.div>

            {/* Right/Bottom: Info & Player */}
            <motion.div 
              className="w-full md:w-3/5 lg:w-2/3"
              variants={contentVariants} // Stagger children if needed or use separate variants
            >
              <p className="text-sm text-primary dark:text-primary-dark font-medium mb-1">
                {`${podcast.eventName} • ${t('podcastPage.episode')} ${episodeIndex}`}
              </p>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
                {episode.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-3 md:line-clamp-4">
                {episode.description || t('podcastPage.noDescription')}
              </p>
              
              {/* Podcast Player */}
              <motion.div variants={playerVariants} className="mb-8">
                 {/* Assuming PodcastPlayer is adapted or takes episode & nextEpisode directly */}
                <PodcastPlayer
                  episode={episode} 
                  // Pass necessary props to PodcastPlayer. It might need access to audioUrl, etc.
                  // The existing PodcastPlayer might need refactoring to fit this new design.
                  // For now, assuming it handles its own state based on `episode`.
                  nextEpisode={nextEpisode}
                  onEpisodeEnd={handleEpisodeEnd}
                  // autoplay={true} // Autoplay can be managed within PodcastPlayer or passed as prop
                />
              </motion.div>
              
            </motion.div>
          </motion.div>

          {/* Episodes List */}
          {podcast.episodes && podcast.episodes.length > 1 && (
            <motion.div 
              className="mt-12 md:mt-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.6, ease: "easeOut" } }}
            >
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                {t('podcastPage.moreEpisodes')}
              </h2>
              <div className="bg-white dark:bg-gray-800/50 p-4 sm:p-6 rounded-xl shadow-lg">
                <EpisodesList
                  episodes={podcast.episodes}
                  eventId={eventId}
                  selectedEpisodeId={episodeId}
                  onSelectEpisode={(id) => {
                    setIsLoading(true); // Show loader while navigating
                    router.push(`/podcast/${eventId}/episodes/${id}`);
                  }}
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>
      
      <Footer />
    </motion.main>
  );
} 