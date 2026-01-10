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

function parseDateOnly(value: string | undefined): Date | null {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;

  const datePart = trimmed.split('T')[0];
  const match = datePart.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (match) {
    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);
    const date = new Date(year, month - 1, day);
    if (Number.isNaN(date.getTime())) return null;
    date.setHours(0, 0, 0, 0);
    return date;
  }

  const fallback = new Date(trimmed);
  if (Number.isNaN(fallback.getTime())) return null;
  fallback.setHours(0, 0, 0, 0);
  return fallback;
}

function getEventEndDate(event: Event): Date | null {
  return parseDateOnly(event.frontmatter.endDate || event.frontmatter.date);
}

// In-memory cache for events data.
let eventsCache: Event[] | null = null;
let eventsPromise: Promise<Event[]> | null = null;

// Clear cache (useful for development/testing).
export function clearEventsCache(): void {
  eventsCache = null;
  eventsPromise = null;
}

// Load events from the API.
async function loadEventsData(): Promise<Event[]> {
  if (eventsCache) {
    return eventsCache;
  }

  if (eventsPromise) {
    return eventsPromise;
  }

  eventsPromise = (async () => {
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
  })();

  try {
    return await eventsPromise;
  } finally {
    eventsPromise = null;
  }
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
    const eventEndDate = getEventEndDate(event);
    if (!eventEndDate) return false;
    return eventEndDate >= today;
  }).sort((a, b) => {
    const dateA = parseDateOnly(a.frontmatter.date)?.getTime() ?? 0;
    const dateB = parseDateOnly(b.frontmatter.date)?.getTime() ?? 0;
    return dateA - dateB;
  });
}

// Get past events (date < today or marked completed).
export async function getPastEvents(): Promise<Event[]> {
  const events = await loadEventsData();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return events.filter(event => {
    const eventEndDate = getEventEndDate(event);
    if (!eventEndDate) return false;
    return eventEndDate < today;
  }).sort((a, b) => {
    const dateA = parseDateOnly(a.frontmatter.date)?.getTime() ?? 0;
    const dateB = parseDateOnly(b.frontmatter.date)?.getTime() ?? 0;
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
