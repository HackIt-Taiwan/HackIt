import matter from 'gray-matter';

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

// 硬編碼活動數據
const eventsData: Event[] = [
  {
    slug: "scrapyard-taiwan",
    frontmatter: {
      id: 1,
      title: "Scrapyard Taiwan",
      date: "2025-03-15",
      endDate: "2025-03-16",
      time: "",
      location: "新北市立三民高級中學",
      image: "/images/scrapyard_taiwan_all.jpg",
      url: "https://scrapyard.hackit.tw/",
      category: "黑客松",
      tags: ["hack club", "hackathon"],
      spots: 0,
      spotsLeft: 0,
      isCompleted: true,
      description: "由 Hack Club 在全球各地發起的 Scrapyard 黑客松活動，在台灣由 HackIt 於 2025 年 3/15、3/16 在三民高中舉辦兩天一夜的跨夜黑客松，主題是'Build Stupid Thing, Get Stupid Thing'."
    },
    content: ``
  },
  {
    slug: "hack_club_neighborhood",
    frontmatter: {
      id: 3,
      title: "Hack Club | Neighborhood",
      date: "2025-06-01",
      endDate: "2025-08-31",
      time: "",
      location: "美國舊金山",
      image: "/images/hack-club_neighborhood.png",
      url: "https://neighborhood.hackclub.com/",
      category: "Hack Club",
      tags: ["Neighborhood", "Hack club", "舊金山", "美國"],
      spots: 0,
      spotsLeft: 0,
      isCompleted: false,
      isFeatured: true,
      color: "indigo",
      emoji: "🔥",
      description: "免費送你到舊金山住三個月！想像一下 30 天後你在舊金山自己的兩房公寓裡醒來。您有 7 位來自世界各地的黑客俱樂部室友... （了解更多歡迎到 HackIt Discord！）"
    },
    content: ``
  },
  {
    slug: "5th_hsh_special_issues",
    frontmatter: {
      id: 2,
      title: "第五屆中學生黑客松子賽事",
      date: "2025-07-18",
      endDate: "2025-07-19",
      time: "",
      location: "高雄市立高雄女子高級中學",
      image: "/images/sddefault.webp",
      url: "https://sites.google.com/k12moocs.edu.tw/hsh",
      category: "黑客松",
      tags: ["子賽事", "hackathon", "高雄女中", "7/18", "7/19"],
      spots: 0,
      spotsLeft: 0,
      isCompleted: false,
      isFeatured: true,
      color: "indigo",
      emoji: "🚀",
      description: "與國教署、高雄市教育局、高雄女中、台灣微課程發展協會、台灣微軟共同舉辦的第五屆中學生黑客松子賽事，於 2025 年 7/18、7/19 在高雄女中舉辦兩天一夜的跨夜黑客松。"
    },
    content: ``
  }
];

// 獲取所有活動檔案路徑
export function getEventFiles(): string[] {
  return eventsData.map(event => event.slug);
}

// 解析單個活動檔案
export function parseEventFile(filename: string): Event | null {
  const event = eventsData.find(e => e.slug === filename.replace(/\.md$/, ''));
  return event || null;
}

// 獲取所有活動資料
export function getAllEvents(): Event[] {
  return [...eventsData].sort((a, b) => {
    const dateA = new Date(a.frontmatter.date).getTime();
    const dateB = new Date(b.frontmatter.date).getTime();
    return dateB - dateA; // 最新的排在前面
  });
}

// 獲取即將到來的活動 (日期 >= 今天)
export function getUpcomingEvents(): Event[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // 設置為今天的開始時間
  
  return eventsData.filter(event => {
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
export function getPastEvents(): Event[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return eventsData.filter(event => {
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
export function getFeaturedEvents(): Event[] {
  return eventsData.filter(event => event.frontmatter.isFeatured);
}

// 根據 slug 獲取單個活動
export function getEventBySlug(slug: string): Event | null {
  return eventsData.find(event => event.slug === slug) || null;
}

// 按分類獲取活動
export function getEventsByCategory(category: string): Event[] {
  return eventsData.filter(event => event.frontmatter.category === category);
}

// 按標籤獲取活動
export function getEventsByTag(tag: string): Event[] {
  return eventsData.filter(event => event.frontmatter.tags.includes(tag));
} 