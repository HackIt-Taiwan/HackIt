"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { FaArrowLeft, FaShare } from 'react-icons/fa';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PodcastPlayer from '@/components/podcast/PodcastPlayer';
import EpisodesList from '@/components/podcast/EpisodesList';
import { getPodcastByEventId, getEpisodeById, getNextEpisode, PodcastEpisode, PodcastEvent } from '@/utils/podcasts';
import { useI18n } from '@/i18n';

export default function PodcastEpisodePage() {
  const { t } = useI18n();
  const params = useParams();
  const router = useRouter();
  const eventId = params.eventId as string;
  const episodeId = params.episodeId as string;
  
  const [podcast, setPodcast] = useState<PodcastEvent | null>(null);
  const [episode, setEpisode] = useState<PodcastEpisode | null>(null);
  const [nextEpisode, setNextEpisode] = useState<PodcastEpisode | null>(null);
  const [autoplay, setAutoplay] = useState(true);
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
  
  // Handle episode end.
  const handleEpisodeEnd = () => {
    if (nextEpisode) {
      router.push(`/podcast/${eventId}/episodes/${nextEpisode.id}`);
    }
  };
  
  // Share the episode.
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: episode?.title || 'HackCast Episode',
        text: episode?.description || 'Listen to this HackCast episode',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(t('podcastPage.shareEpisode') + ': ' + window.location.href);
    }
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

  if (!podcast || !episode) {
    return null; // Wait for redirect or data.
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
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
            {/* Left: player */}
            <div className="lg:w-3/5">
              <PodcastPlayer
                episode={episode}
                nextEpisode={nextEpisode}
                onEpisodeEnd={handleEpisodeEnd}
                autoplay={autoplay}
              />
            </div>
            
            {/* Right: other episodes */}
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
      
      <Footer />
    </main>
  );
} 
