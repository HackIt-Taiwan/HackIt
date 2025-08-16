export interface NewsFrontmatter {
  id: number;
  title: string;
  date: string; // ISO date string
  author: string;
  category: string;
  image: string;
  isFeatured?: boolean;
  tags: string[];
}

export interface NewsItem {
  slug: string;
  frontmatter: NewsFrontmatter;
  content: string;
}

// Static JSON imports (compile-time) so that consumers can use sync utilities in client components
// If you add new news JSON files under `public/data/news`, also add them here.
// Note: JSON module resolution is enabled in tsconfig via `resolveJsonModule`.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - allow importing JSON as modules
import collab from '../../public/data/news/collaboration-announcement.json';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import newYear from '../../public/data/news/new-year-workshops.json';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import summerHackathon from '../../public/data/news/summer-hackathon.json';

const loadedNews: NewsItem[] = [
  collab as NewsItem,
  newYear as NewsItem,
  summerHackathon as NewsItem,
].sort((a: NewsItem, b: NewsItem) => {
  return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
});

export function getAllNews(): NewsItem[] {
  return loadedNews;
}

export function getLatestNews(count: number): NewsItem[] {
  if (!Number.isFinite(count) || count <= 0) return [];
  return loadedNews.slice(0, count);
}

export function getNewsBySlug(slug: string): NewsItem | null {
  return loadedNews.find(item => item.slug === slug) || null;
}

export function searchNews(query: string): NewsItem[] {
  if (!query) return loadedNews;
  const q = query.toLowerCase();
  return loadedNews.filter(item => {
    const titleMatch = item.frontmatter.title.toLowerCase().includes(q);
    const contentMatch = item.content.toLowerCase().includes(q);
    const tagMatch = item.frontmatter.tags.some(tag => tag.toLowerCase().includes(q));
    return titleMatch || contentMatch || tagMatch;
  });
}


