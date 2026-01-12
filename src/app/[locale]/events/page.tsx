import { getFeaturedEvents, getPastEvents, getUpcomingEvents } from '@/utils/events';
import EventsPageClient from '@/app/events/EventsPageClient';

export const dynamic = 'force-dynamic';

export default async function EventsPage() {
  const [upcomingEvents, pastEvents, featuredEvents] = await Promise.all([
    getUpcomingEvents(),
    getPastEvents(),
    getFeaturedEvents(),
  ]);

  const categoryCounts = new Map<string, number>();
  for (const event of [...upcomingEvents, ...pastEvents]) {
    const category = event.frontmatter.category;
    if (!category) continue;
    categoryCounts.set(category, (categoryCounts.get(category) || 0) + 1);
  }

  const categories = Array.from(categoryCounts.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([category]) => category);

  const featuredSorted = [...featuredEvents].sort((a, b) => {
    return new Date(a.frontmatter.date).getTime() - new Date(b.frontmatter.date).getTime();
  });

  return (
    <EventsPageClient
      upcomingEvents={upcomingEvents}
      pastEvents={pastEvents}
      featuredEvents={featuredSorted}
      categories={categories}
    />
  );
}
