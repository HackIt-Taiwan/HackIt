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

// Cache for loaded podcasts data
let podcastsCache: PodcastEvent[] | null = null;

// Clear cache for development/testing
export function clearPodcastsCache(): void {
  podcastsCache = null;
}

// Load podcasts from JSON files
async function loadPodcastsData(): Promise<PodcastEvent[]> {
  if (podcastsCache) {
    return podcastsCache;
  }

  try {
    // Check if we're running on the server or client
    if (typeof window === 'undefined') {
      // Server-side: use API route
      const response = await fetch(`http://localhost:3000/api/data/podcasts`);
      if (response.ok) {
        podcastsCache = await response.json();
        return podcastsCache || [];
      }
    } else {
      // Client-side: use API route
      const response = await fetch(`/api/data/podcasts`);
      if (response.ok) {
        podcastsCache = await response.json();
        return podcastsCache || [];
      }
    }
  } catch (error) {
    console.error('Failed to load podcasts data:', error);
  }

  podcastsCache = [];
  return [];
}

// Get available podcast event files dynamically
async function getAvailablePodcastEvents(): Promise<string[]> {
  const events = await loadPodcastsData();
  return events.map(event => event.eventId);
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
export async function getAllPodcasts(): Promise<PodcastEpisode[]> {
  const podcastsData = await loadPodcastsData();
  
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
export async function getAllPodcastEvents(): Promise<PodcastEvent[]> {
  return await loadPodcastsData();
}

// 根據事件 ID 獲取整個播客事件
export async function getPodcastByEventId(eventId: string): Promise<PodcastEvent | null> {
  const podcastsData = await loadPodcastsData();
  const podcast = podcastsData.find((event: PodcastEvent) => event.eventId === eventId);
  return podcast || null;
}

// 獲取最新的幾集播客
export async function getLatestEpisodes(count: number): Promise<PodcastEpisode[]> {
  const allEpisodes = await getAllPodcasts();
  return allEpisodes.slice(0, count);
}

// 根據事件 ID 獲取該事件的所有集數
export async function getEpisodesByEventId(eventId: string): Promise<PodcastEpisode[]> {
  const event = await getPodcastByEventId(eventId);
  if (!event) return [];
  
  return event.episodes.map(episode => ({
    ...episode,
    eventId: event.eventId,
    eventName: event.eventName,
    coverImage: event.coverImage
  })).sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
}

// 根據事件 ID 和集數 ID 獲取特定集數
export async function getEpisodeById(eventId: string, episodeId: string): Promise<PodcastEpisode | null> {
  const event = await getPodcastByEventId(eventId);
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
export async function getNextEpisode(eventId: string, currentEpisodeId: string): Promise<PodcastEpisode | null> {
  const event = await getPodcastByEventId(eventId);
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
export async function getEpisodeByIdGlobal(episodeId: string): Promise<PodcastEpisode | null> {
  const allEpisodes = await getAllPodcasts();
  return allEpisodes.find(episode => episode.id === episodeId) || null;
}

// 搜索播客集數
export async function searchEpisodes(query: string): Promise<PodcastEpisode[]> {
  const allEpisodes = await getAllPodcasts();
  if (!query) return allEpisodes;
  
  const lowerQuery = query.toLowerCase();
  return allEpisodes.filter(episode => 
    episode.title.toLowerCase().includes(lowerQuery) || 
    episode.description.toLowerCase().includes(lowerQuery) ||
    episode.eventName?.toLowerCase().includes(lowerQuery)
  );
}