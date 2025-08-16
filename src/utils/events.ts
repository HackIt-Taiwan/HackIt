export type EventFrontmatter = {
  id: number;
  title: string;
  date: string;
  endDate?: string;
  time: string;
  location: string;
  image: string;
  category: string;
  tags: string[];
  spots: number;
  spotsLeft: number;
  isCompleted: boolean;
  isFeatured?: boolean;
  color?: string;
  emoji?: string;
  description: string;
  url?: string;
};

export type Event = {
  slug: string;
  frontmatter: EventFrontmatter;
  content: string;
};

// Cache for loaded events data
let eventsCache: Event[] | null = null;

// Clear cache for development/testing
export function clearEventsCache(): void {
  eventsCache = null;
}

// Load events from JSON files
async function loadEventsData(): Promise<Event[]> {
  if (eventsCache) {
    return eventsCache;
  }

  try {
    // Check if we're running on the server or client
    if (typeof window === 'undefined') {
      // Server-side: use API route
      const response = await fetch(`http://localhost:3000/api/data/events`);
      if (response.ok) {
        eventsCache = await response.json();
        return eventsCache || [];
      }
    } else {
      // Client-side: use API route
      const response = await fetch(`/api/data/events`);
      if (response.ok) {
        eventsCache = await response.json();
        return eventsCache || [];
      }
    }
  } catch (error) {
    console.error('Failed to load events data:', error);
  }

  eventsCache = [];
  return [];
}

// Get available event files dynamically
async function getAvailableEventFiles(): Promise<string[]> {
  const events = await loadEventsData();
  return events.map(event => event.slug);
}

// 獲取所有活動檔案路徑
export async function getEventFiles(): Promise<string[]> {
  return await getAvailableEventFiles();
}

// 解析單個活動檔案
export async function parseEventFile(filename: string): Promise<Event | null> {
  const events = await loadEventsData();
  const event = events.find(e => e.slug === filename.replace(/\.md$/, ''));
  return event || null;
}

// 獲取所有活動資料
export async function getAllEvents(): Promise<Event[]> {
  const events = await loadEventsData();
  return [...events].sort((a, b) => {
    const dateA = new Date(a.frontmatter.date).getTime();
    const dateB = new Date(b.frontmatter.date).getTime();
    return dateB - dateA; // 最新的排在前面
  });
}

// 獲取即將到來的活動 (日期 >= 今天)
export async function getUpcomingEvents(): Promise<Event[]> {
  const events = await loadEventsData();
  const today = new Date();
  today.setHours(0, 0, 0, 0); // 設置為今天的開始時間
  
  return events.filter(event => {
    if (event.frontmatter.isCompleted) return false;
    
    const eventDate = new Date(event.frontmatter.date);
    return eventDate >= today;
  }).sort((a, b) => {
    const dateA = new Date(a.frontmatter.date).getTime();
    const dateB = new Date(b.frontmatter.date).getTime();
    return dateA - dateB; // 日期較早的排在前面
  });
}

// 獲取過去活動 (日期 < 今天 或 已標記為已完成)
export async function getPastEvents(): Promise<Event[]> {
  const events = await loadEventsData();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return events.filter(event => {
    if (event.frontmatter.isCompleted) return true;
    
    const eventDate = new Date(event.frontmatter.date);
    return eventDate < today;
  }).sort((a, b) => {
    const dateA = new Date(a.frontmatter.date).getTime();
    const dateB = new Date(b.frontmatter.date).getTime();
    return dateB - dateA; // 日期較晚的排在前面 (最近的過去活動優先)
  });
}

// 獲取特色活動 (標記為 isFeatured)
export async function getFeaturedEvents(): Promise<Event[]> {
  const events = await loadEventsData();
  return events.filter(event => event.frontmatter.isFeatured);
}

// 根據 slug 獲取單個活動
export async function getEventBySlug(slug: string): Promise<Event | null> {
  const events = await loadEventsData();
  return events.find(event => event.slug === slug) || null;
}

// 按分類獲取活動
export async function getEventsByCategory(category: string): Promise<Event[]> {
  const events = await loadEventsData();
  return events.filter(event => event.frontmatter.category === category);
}

// 按標籤獲取活動
export async function getEventsByTag(tag: string): Promise<Event[]> {
  const events = await loadEventsData();
  return events.filter(event => event.frontmatter.tags.includes(tag));
} 