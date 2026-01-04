"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaRedo, FaRegHeart, FaHeart } from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';
import { useI18n } from '@/i18n';
import { PodcastEpisode, formatReleaseDate, formatDuration } from '@/utils/podcasts';

interface PodcastPlayerProps {
  episode: PodcastEpisode;
  nextEpisode?: PodcastEpisode | null;
  onEpisodeEnd?: () => void;
  autoplay?: boolean;
}

export default function PodcastPlayer({ 
  episode, 
  nextEpisode, 
  onEpisodeEnd,
  autoplay = false 
}: PodcastPlayerProps) {
  const { t } = useI18n();
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [showControls, setShowControls] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play.
  useEffect(() => {
    if (autoplay && audioRef.current) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    }
  }, [autoplay, episode]);

  // Handle play/pause.
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle volume changes.
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setVolume(value);
    if (audioRef.current) {
      audioRef.current.volume = value;
    }
    if (value === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  // Handle mute toggling.
  const toggleMute = () => {
    if (audioRef.current) {
      const newMuteState = !isMuted;
      setIsMuted(newMuteState);
      audioRef.current.muted = newMuteState;
    }
  };

  // Handle playback speed.
  const changePlaybackRate = (rate: number) => {
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
      setPlaybackRate(rate);
    }
  };

  // Handle audio loaded metadata.
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration || 0);
    }
  };

  // Handle time updates.
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  // Format time display.
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Handle progress bar clicks.
  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressBarRef.current && audioRef.current) {
      const progressBar = progressBarRef.current;
      const rect = progressBar.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      const newTime = percent * (audioRef.current.duration || 0);
      audioRef.current.currentTime = newTime;
    }
  };

  // Handle skip forward/backward.
  const handleSeek = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, Math.min(audioRef.current.duration || 0, audioRef.current.currentTime + seconds));
    }
  };

  // Handle favorites.
  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  // Handle episode end.
  const handleEnded = () => {
    setIsPlaying(false);
    if (onEpisodeEnd) {
      onEpisodeEnd();
    }
  };

  // Show controls and set a hide timeout.
  const showControlsWithTimeout = () => {
    setShowControls(true);
    
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  // Track scrub interactions.
  useEffect(() => {
    const handleMouseMove = () => showControlsWithTimeout();
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  // Cleanup.
  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  // Calculate progress percentage.
  const progressPercentage = (currentTime / duration) * 100 || 0;

  return (
    <div 
      className="w-full max-w-2xl mx-auto" 
      onMouseEnter={() => setShowControls(true)} 
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={episode.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        preload="metadata"
      />

      <motion.div 
        className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Title and metadata */}
        <div className="px-6 pt-6 pb-4 md:px-8 md:pt-8 md:pb-5">
          <div className="flex items-start">
            <div className="flex-grow pr-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-1 tracking-tight line-clamp-2">
                {episode.title}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                {episode.eventName}
              </p>
              <div className="flex items-center space-x-3 mt-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {formatReleaseDate(episode.releaseDate)}
                </span>
                <span className="text-gray-300 dark:text-gray-600">•</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {formatDuration(episode.duration)}
                </span>
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleFavorite}
              className="p-2 rounded-full text-gray-400 dark:text-gray-500 hover:text-primary dark:hover:text-primary transition-colors"
              aria-label={isFavorited ? "取消收藏" : "收藏"}
            >
              {isFavorited ? <FaHeart className="text-primary" /> : <FaRegHeart />}
            </motion.button>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="px-6 md:px-8">
          <div 
            ref={progressBarRef}
            className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full cursor-pointer overflow-hidden"
            onClick={handleProgressBarClick}
          >
            <motion.div 
              className="h-full bg-primary rounded-full relative"
              style={{ width: `${progressPercentage}%` }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          
          {/* Time indicators */}
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1 px-0.5 mb-4">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
        
        {/* Controls */}
        <div className="px-6 pb-6 md:px-8 md:pb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Back 15 seconds */}
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() => handleSeek(-15)}
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                aria-label="後退15秒"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414 0l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293a1 1 0 000-1.414z" clipRule="evenodd" />
                </svg>
                <span className="sr-only">快退15秒</span>
              </motion.button>
              
              {/* Play/pause */}
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={togglePlay}
                className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center"
                aria-label={String(isPlaying ? t('podcastPage.pause') : t('podcastPage.play'))}
              >
                {isPlaying ? <FaPause /> : <FaPlay className="ml-1" />}
              </motion.button>
              
              {/* Forward 15 seconds */}
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() => handleSeek(15)}
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                aria-label="前進15秒"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                </svg>
                <span className="sr-only">快進15秒</span>
              </motion.button>
            </div>
            
            {/* Volume and speed */}
            <div className="flex items-center space-x-3">
              {/* Volume control */}
              <div className="hidden sm:flex items-center space-x-1">
                <button 
                  onClick={toggleMute}
                  className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                >
                  {isMuted || volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
                </button>
                <input 
                  type="range" 
                  min="0" 
                  max="1" 
                  step="0.01" 
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-16 md:w-20 h-1 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                />
              </div>
              
              {/* Playback speed */}
              <div className="relative">
                <button 
                  className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium"
                  onClick={() => {
                    const rates = [0.75, 1, 1.25, 1.5, 2];
                    const currentIndex = rates.indexOf(playbackRate);
                    const nextIndex = (currentIndex + 1) % rates.length;
                    changePlaybackRate(rates[nextIndex]);
                  }}
                >
                  {playbackRate}x
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Next episode prompt */}
        {nextEpisode && (
          <div className="px-6 pb-4 md:px-8 md:pb-5">
            <div className="border-t border-gray-100 dark:border-gray-800 pt-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t('podcastPage.upNext')}</p>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200 line-clamp-1">{nextEpisode.title}</p>
                </div>
                
                <IoIosArrowForward className="text-gray-400 dark:text-gray-500" />
              </div>
            </div>
          </div>
        )}
      </motion.div>
      
      {/* Episode description */}
      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">{t('podcastPage.description')}</h3>
        
        <div className="relative">
          <div className={`text-gray-600 dark:text-gray-300 text-sm leading-relaxed ${!showFullDescription && 'line-clamp-3'}`}>
            {episode.description}
          </div>
          
          {episode.description.length > 150 && (
            <button 
              className="text-primary text-sm font-medium mt-2"
              onClick={() => setShowFullDescription(!showFullDescription)}
            >
              {showFullDescription ? t('podcastPage.showLess') : t('podcastPage.showMore')}
            </button>
          )}
        </div>
      </div>

      {/* Host information */}
      {episode.hosts && episode.hosts.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">主持人</h3>
          <div className="flex flex-wrap gap-2">
            {episode.hosts.map((host, index) => (
              <span 
                key={index}
                className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm"
              >
                {host}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 
