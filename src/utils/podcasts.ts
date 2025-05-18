import podcastsData from '@/data/podcasts/podcasts.json';

export interface PodcastEpisode {
  id: string;
  title: string;
  description: string;
  audioUrl: string;
  duration: number; // 秒數
  releaseDate: string; // ISO 格式日期字符串
  hosts: string[];
  eventId?: string;
  eventName?: string;
  coverImage?: string;
}

export interface PodcastEvent {
  eventId: string;
  eventName: string;
  coverImage: string;
  description: string;
  episodes: PodcastEpisode[];
}

// 格式化發布日期
export function formatReleaseDate(releaseDate: string): string {
  const date = new Date(releaseDate);
  return date.toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// 格式化播放時長
export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  
  if (hours > 0) {
    const remainingMinutes = minutes % 60;
    return `${hours}時${remainingMinutes > 0 ? remainingMinutes + '分' : ''}`;
  }
  
  return `${minutes}分鐘`;
}

// 獲取所有播客集數
export function getAllPodcasts(): PodcastEpisode[] {
  // 確保 podcastsData 是數組
  if (!Array.isArray(podcastsData)) {
    console.error('播客數據格式錯誤:', podcastsData);
    return [];
  }

  // 將所有事件的集數整合到一個數組，並附加事件資訊
  return podcastsData.flatMap((event: PodcastEvent) => 
    event.episodes.map(episode => ({
      ...episode,
      eventId: event.eventId,
      eventName: event.eventName,
      coverImage: event.coverImage
    }))
  ).sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
}

// 獲取所有播客事件
export function getAllPodcastEvents(): PodcastEvent[] {
  if (!Array.isArray(podcastsData)) {
    console.error('播客數據格式錯誤:', podcastsData);
    return [];
  }
  return podcastsData;
}

// 根據事件 ID 獲取整個播客事件
export function getPodcastByEventId(eventId: string): PodcastEvent | null {
  if (!Array.isArray(podcastsData)) {
    console.error('播客數據格式錯誤:', podcastsData);
    return null;
  }

  const podcast = podcastsData.find((event: PodcastEvent) => event.eventId === eventId);
  return podcast || null;
}

// 獲取最新的幾集播客
export function getLatestEpisodes(count: number): PodcastEpisode[] {
  const allEpisodes = getAllPodcasts();
  return allEpisodes.slice(0, count);
}

// 根據事件 ID 獲取該事件的所有集數
export function getEpisodesByEventId(eventId: string): PodcastEpisode[] {
  const event = podcastsData.find((event: PodcastEvent) => event.eventId === eventId);
  if (!event) return [];
  
  return event.episodes.map(episode => ({
    ...episode,
    eventId: event.eventId,
    eventName: event.eventName,
    coverImage: event.coverImage
  })).sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
}

// 根據事件 ID 和集數 ID 獲取特定集數
export function getEpisodeById(eventId: string, episodeId: string): PodcastEpisode | null {
  const event = getPodcastByEventId(eventId);
  if (!event) return null;
  
  const episode = event.episodes.find(ep => ep.id === episodeId);
  if (!episode) return null;
  
  return {
    ...episode,
    eventId: event.eventId,
    eventName: event.eventName,
    coverImage: event.coverImage
  };
}

// 獲取下一集
export function getNextEpisode(eventId: string, currentEpisodeId: string): PodcastEpisode | null {
  const event = getPodcastByEventId(eventId);
  if (!event) return null;
  
  // 按照日期順序排序集數 (從新到舊)
  const sortedEpisodes = [...event.episodes].sort(
    (a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
  );
  
  const currentIndex = sortedEpisodes.findIndex(ep => ep.id === currentEpisodeId);
  if (currentIndex === -1 || currentIndex === sortedEpisodes.length - 1) return null;
  
  const nextEpisode = sortedEpisodes[currentIndex + 1];
  return {
    ...nextEpisode,
    eventId: event.eventId,
    eventName: event.eventName,
    coverImage: event.coverImage
  };
}

// 原始函數 - 不綁定特定事件
// 根據 ID 獲取特定集數
export function getEpisodeByIdGlobal(episodeId: string): PodcastEpisode | null {
  const allEpisodes = getAllPodcasts();
  return allEpisodes.find(episode => episode.id === episodeId) || null;
}

// 搜索播客集數
export function searchEpisodes(query: string): PodcastEpisode[] {
  if (!query) return getAllPodcasts();
  
  const lowerQuery = query.toLowerCase();
  return getAllPodcasts().filter(episode => 
    episode.title.toLowerCase().includes(lowerQuery) || 
    episode.description.toLowerCase().includes(lowerQuery) ||
    episode.eventName?.toLowerCase().includes(lowerQuery)
  );
} 