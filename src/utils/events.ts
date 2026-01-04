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

// In-memory cache for events data.
let eventsCache: Event[] | null = null;

// Clear cache (useful for development/testing).
export function clearEventsCache(): void {
  eventsCache = null;
}

// Load events from the API.
async function loadEventsData(): Promise<Event[]> {
  if (eventsCache) {
    return eventsCache;
  }

  try {
    // Use absolute URLs on the server and relative URLs on the client.
    if (typeof window === 'undefined') {
      const response = await fetch(`http://localhost:3000/api/data/events`);
      if (response.ok) {
        eventsCache = await response.json();
        return eventsCache || [];
      }
    } else {
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

// Get available event slugs.
async function getAvailableEventFiles(): Promise<string[]> {
  const events = await loadEventsData();
  return events.map(event => event.slug);
}

// Get all event file names.
export async function getEventFiles(): Promise<string[]> {
  return await getAvailableEventFiles();
}

// Resolve a single event by filename.
export async function parseEventFile(filename: string): Promise<Event | null> {
  const events = await loadEventsData();
  const event = events.find(e => e.slug === filename.replace(/\.md$/, ''));
  return event || null;
}

// Get all events sorted by date (newest first).
export async function getAllEvents(): Promise<Event[]> {
  const events = await loadEventsData();
  return [...events].sort((a, b) => {
    const dateA = new Date(a.frontmatter.date).getTime();
    const dateB = new Date(b.frontmatter.date).getTime();
    return dateB - dateA;
  });
}

// Get upcoming events (date >= today).
export async function getUpcomingEvents(): Promise<Event[]> {
  const events = await loadEventsData();
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Start of today.
  
  return events.filter(event => {
    if (event.frontmatter.isCompleted) return false;
    
    const eventDate = new Date(event.frontmatter.date);
    return eventDate >= today;
  }).sort((a, b) => {
    const dateA = new Date(a.frontmatter.date).getTime();
    const dateB = new Date(b.frontmatter.date).getTime();
    return dateA - dateB;
  });
}

// Get past events (date < today or marked completed).
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
    return dateB - dateA;
  });
}

// Get featured events (marked as isFeatured).
export async function getFeaturedEvents(): Promise<Event[]> {
  const events = await loadEventsData();
  return events.filter(event => event.frontmatter.isFeatured);
}

// Get a single event by slug.
export async function getEventBySlug(slug: string): Promise<Event | null> {
  const events = await loadEventsData();
  return events.find(event => event.slug === slug) || null;
}

// Get events by category.
export async function getEventsByCategory(category: string): Promise<Event[]> {
  const events = await loadEventsData();
  return events.filter(event => event.frontmatter.category === category);
}

// Get events by tag.
export async function getEventsByTag(tag: string): Promise<Event[]> {
  const events = await loadEventsData();
  return events.filter(event => event.frontmatter.tags.includes(tag));
}
