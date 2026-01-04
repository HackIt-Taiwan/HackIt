export interface PodcastEpisode {
  id: string;
  title: string;
  description: string;
  audioUrl: string;
  duration: number; // Duration in seconds.
  releaseDate: string; // ISO date string.
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

// In-memory cache for podcasts data.
let podcastsCache: PodcastEvent[] | null = null;

// Clear cache (useful for development/testing).
export function clearPodcastsCache(): void {
  podcastsCache = null;
}

// Load podcasts from the API.
async function loadPodcastsData(): Promise<PodcastEvent[]> {
  if (podcastsCache) {
    return podcastsCache;
  }

  try {
    // Use absolute URLs on the server and relative URLs on the client.
    if (typeof window === 'undefined') {
      const response = await fetch(`http://localhost:3000/api/data/podcasts`);
      if (response.ok) {
        podcastsCache = await response.json();
        return podcastsCache || [];
      }
    } else {
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

// Get available podcast event IDs.
async function getAvailablePodcastEvents(): Promise<string[]> {
  const events = await loadPodcastsData();
  return events.map(event => event.eventId);
}

// Format release date.
export function formatReleaseDate(releaseDate: string): string {
  const date = new Date(releaseDate);
  return date.toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Format duration (display uses localized strings).
export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  
  if (hours > 0) {
    const remainingMinutes = minutes % 60;
    return `${hours}時${remainingMinutes > 0 ? remainingMinutes + '分' : ''}`;
  }
  
  return `${minutes}分鐘`;
}

// Get all episodes across events.
export async function getAllPodcasts(): Promise<PodcastEpisode[]> {
  const podcastsData = await loadPodcastsData();
  
  // Flatten episodes and attach event metadata.
  return podcastsData.flatMap((event: PodcastEvent) => 
    event.episodes.map(episode => ({
      ...episode,
      eventId: event.eventId,
      eventName: event.eventName,
      coverImage: event.coverImage
    }))
  ).sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
}

// Get all podcast events.
export async function getAllPodcastEvents(): Promise<PodcastEvent[]> {
  return await loadPodcastsData();
}

// Get a podcast event by event ID.
export async function getPodcastByEventId(eventId: string): Promise<PodcastEvent | null> {
  const podcastsData = await loadPodcastsData();
  const podcast = podcastsData.find((event: PodcastEvent) => event.eventId === eventId);
  return podcast || null;
}

// Get the latest episodes.
export async function getLatestEpisodes(count: number): Promise<PodcastEpisode[]> {
  const allEpisodes = await getAllPodcasts();
  return allEpisodes.slice(0, count);
}

// Get all episodes for an event.
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

// Get a single episode by event ID + episode ID.
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

// Get the next episode in a sorted list.
export async function getNextEpisode(eventId: string, currentEpisodeId: string): Promise<PodcastEpisode | null> {
  const event = await getPodcastByEventId(eventId);
  if (!event) return null;
  
  // Sort by date (newest first).
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

// Global lookup by episode ID (no event binding).
export async function getEpisodeByIdGlobal(episodeId: string): Promise<PodcastEpisode | null> {
  const allEpisodes = await getAllPodcasts();
  return allEpisodes.find(episode => episode.id === episodeId) || null;
}

// Search episodes by query.
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
