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
};

export type Event = {
  slug: string;
  frontmatter: EventFrontmatter;
  content: string;
};

// 硬編碼活動數據
const eventsData: Event[] = [
  {
    slug: "python-workshop",
    frontmatter: {
      id: 1,
      title: "Python 初學者工作坊",
      date: "2024-06-15",
      time: "14:00 - 17:00",
      location: "線上直播",
      image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=2069&auto=format&fit=crop",
      category: "工作坊",
      tags: ["Python", "入門", "程式基礎"],
      spots: 30,
      spotsLeft: 15,
      isCompleted: false,
      description: "專為完全沒有程式基礎的新手設計的工作坊，從零開始學習Python編程基礎知識。"
    },
    content: `
# Python 初學者工作坊

歡迎參加我們的 Python 初學者工作坊！這個工作坊專為完全沒有程式基礎的新手設計，讓你從零開始學習 Python 編程基礎知識。

## 工作坊內容

- Python 環境安裝與設置
- 變數、數據類型與基本操作
- 邏輯控制流：條件判斷與循環
- 基本數據結構：列表、字典
- 函數的定義與使用
- 簡單的程式項目實作

## 適合對象

- 對程式設計感興趣的青少年
- 想進入資訊科學領域的學生
- 對 Python 有興趣但沒有基礎的新手

## 參加方式

本次工作坊將以線上形式進行，參加者將收到Zoom會議連結。我們建議參加者提前安裝好Python環境，講師將在課程前發送準備指南。

## 講師介紹

張明德，資深Python工程師，擁有8年Python開發經驗，曾在多家科技公司任職，目前致力於程式教育，幫助新手快速掌握程式技能。

## 報名方式

請點擊下方「立即報名」按鈕，填寫報名表單。名額有限，報名從速！`
  },
  {
    slug: "web-dev-course",
    frontmatter: {
      id: 2,
      title: "網頁開發入門課程",
      date: "2024-06-22",
      time: "09:00 - 12:00",
      location: "台北市信義區松高路",
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2064&auto=format&fit=crop",
      category: "課程",
      tags: ["前端", "HTML", "CSS", "JavaScript"],
      spots: 25,
      spotsLeft: 8,
      isCompleted: false,
      description: "從頭學習網頁開發的基礎知識，包括HTML、CSS和JavaScript的核心概念及應用。"
    },
    content: `
# 網頁開發入門課程

想要學習如何打造自己的網站嗎？本課程將帶你從零開始學習網頁開發的基礎知識，掌握現代網頁技術的核心概念。

## 課程內容

- HTML5 文檔結構和語義標籤
- CSS3 樣式設計與響應式佈局
- JavaScript 基礎與互動功能實現
- 網頁開發工具與開發環境設置
- 實用網頁組件開發練習
- 完整網頁項目從設計到發布

## 適合對象

- 對網頁設計和開發感興趣的青少年
- 想要學習前端技術的初學者
- 希望自己製作個人網站的學生

## 參加方式

課程將在台北市信義區松高路的教室進行，參加者需自備筆記型電腦。所有學習資料將在課程前一天通過電子郵件發送。

## 講師介紹

李婉如，資深前端工程師，擁有6年網頁開發經驗，現任某知名科技公司的UX設計師，致力於推廣網頁設計與開發教育。

## 課程特色

- 小班教學，確保每位學員都能得到充分指導
- 實例講解，理論與實踐相結合
- 提供後續學習資源與社群支持
- 結業後可獲得課程證書

## 報名方式

請點擊下方「立即報名」按鈕，填寫報名表單。課程名額有限，請盡早報名！`
  },
  {
    slug: "hackathon-2024",
    frontmatter: {
      id: 3,
      title: "HackIT 2024 年度黑客松",
      date: "2026-07-15",
      endDate: "2024-07-17",
      time: "全天",
      location: "台北創新實驗室",
      image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop",
      category: "黑客松",
      tags: ["創意競賽", "團隊合作", "創新專案", "技術展示"],
      spots: 100,
      spotsLeft: 65,
      isCompleted: false,
      isFeatured: true,
      color: "indigo",
      emoji: "🚀",
      description: "一年一度最大規模的青少年程式競賽，為期三天的密集開發挑戰，打造解決真實問題的創新專案。"
    },
    content: `
# HackIT 2024 年度黑客松

歡迎參加 HackIT 2024 年度黑客松！這是臺灣規模最大的青少年程式競賽，我們邀請各路技術愛好者在 48 小時內組隊合作，開發解決真實問題的創新專案。

## 活動主題

今年的主題是「永續科技」，我們鼓勵參賽者開發能夠促進環境保護、資源節約和永續發展的創新解決方案。

## 活動亮點

- **豐厚獎金**：總獎金池高達新台幣 30 萬元
- **業界導師**：來自頂尖科技公司的專業導師提供指導
- **創投對接**：優秀項目有機會獲得創投資金支持
- **全程餐飲**：提供三天全程餐飲及茶點
- **紀念禮品**：每位參賽者都將獲得精美紀念品

## 參賽資格

- 13-18 歲青少年
- 不限技術背景和經驗
- 可個人或組隊報名（每隊 2-5 人）

## 比賽流程

### 第一天（7/15）
- 09:00 - 10:00：開幕式及規則說明
- 10:00 - 12:00：團隊組建與創意發想
- 12:00 - 13:00：午餐
- 13:00 - 18:00：項目開發
- 18:00 - 19:00：晚餐
- 19:00 - 22:00：項目開發與導師諮詢

### 第二天（7/16）
- 09:00 - 12:00：項目開發
- 12:00 - 13:00：午餐
- 13:00 - 18:00：項目開發與中期檢查
- 18:00 - 19:00：晚餐
- 19:00 - 22:00：項目優化

### 第三天（7/17）
- 09:00 - 12:00：最終衝刺
- 12:00 - 13:00：午餐
- 13:00 - 16:00：項目提交與準備演示
- 16:00 - 18:00：項目展示與評審
- 18:00 - 20:00：頒獎晚宴與交流

## 評審標準

- 創新性（30%）
- 技術實現（25%）
- 實用價值（25%）
- 展示表現（10%）
- 團隊合作（10%）

## 參賽建議

- 提前組隊並討論創意
- 帶齊個人電腦與必要設備
- 準備基本生活用品（現場提供休息區）
- 保持開放心態，享受創造的過程

## 報名方式

請點擊下方「立即報名」按鈕，填寫完整的報名資料。報名截止日期為 2024 年 6 月 30 日。`
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