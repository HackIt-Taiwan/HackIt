import matter from 'gray-matter';

export type NewsFrontmatter = {
  id: number;
  title: string;
  date: string;
  author: string;
  category: string;
  image: string;
  isFeatured?: boolean;
  tags: string[];
};

export type NewsItem = {
  slug: string;
  frontmatter: NewsFrontmatter;
  content: string;
};

// 硬編碼新聞數據
const newsData: NewsItem[] = [
  {
    slug: "new-year-workshops",
    frontmatter: {
      id: 1,
      title: "2024 年度工作坊計劃正式啟動",
      date: "2024-01-15",
      author: "HackIT 團隊",
      category: "活動公告",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop",
      isFeatured: true,
      tags: ["工作坊", "課程", "學習資源"]
    },
    content: `
# 2024 年度工作坊計劃正式啟動

我們很高興地宣布，HackIT 2024 年度工作坊計劃正式啟動！今年，我們將提供更多樣化的技術學習機會，包括程式設計、網頁開發、人工智能和資料科學等多個領域的課程。

## 今年亮點

- **全新 Python 系列課程**：從基礎到進階，適合不同程度的學習者
- **網頁開發實戰營**：結合理論與實踐，完成真實專案
- **AI 應用工作坊**：了解最新人工智能技術及其應用
- **資料視覺化課程**：學習如何有效呈現和分析數據

## 報名方式

所有工作坊都將在課程開始前兩週開放報名，請密切關注我們的官網和社群媒體。HackIT 成員可享優先報名和會員價格。

## 志工招募

我們也在招募課程志工，如果你有相關技術背景並有興趣參與教學活動，請直接聯繫我們的團隊。

期待在工作坊中與大家相見！

---

HackIT 團隊敬上`
  },
  {
    slug: "collaboration-announcement",
    frontmatter: {
      id: 2,
      title: "HackIT 與多家科技公司建立合作夥伴關係",
      date: "2024-02-20",
      author: "張明德",
      category: "合作消息",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop",
      isFeatured: true,
      tags: ["產業合作", "實習機會", "贊助夥伴"]
    },
    content: `
# HackIT 與多家科技公司建立合作夥伴關係

我們很榮幸地宣布，HackIT 已與多家頂尖科技公司建立正式合作夥伴關係。這些合作將為我們的社群成員帶來更多實習機會、專業指導和專案資源。

## 合作夥伴

我們的新合作夥伴包括：

- **科技巨頭 A 公司**：將提供雲端資源和技術講座
- **軟體開發 B 公司**：開放實習崗位並提供技術導師
- **新創企業 C 公司**：為黑客松活動提供獎金和指導
- **教育機構 D 學院**：協助課程開發和認證

## 學生福利

透過這些合作關係，我們社群的學生成員將獲得：

1. 獨家實習面試機會
2. 專業人士一對一指導
3. 專案開發所需的免費雲端資源
4. 參與合作企業的內部講座和工作坊

## 未來計劃

接下來的幾個月，我們將陸續舉辦線上和實體的合作夥伴交流活動，讓社群成員有機會直接與這些企業互動。詳細活動安排將在官網和社群媒體上公布。

感謝我們的合作夥伴對青少年程式教育的支持！

---

張明德
HackIT 合作協調人`
  },
  {
    slug: "summer-hackathon",
    frontmatter: {
      id: 3,
      title: "2024 暑期青少年黑客松即將開放報名",
      date: "2024-03-05",
      author: "李婉茹",
      category: "活動預告",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop",
      isFeatured: true,
      tags: ["黑客松", "暑期活動", "競賽", "獎學金"]
    },
    content: `
# 2024 暑期青少年黑客松即將開放報名

今年夏天最盛大的科技活動來了！2024 年 HackIT 暑期青少年黑客松將於 7 月 15 日至 17 日舉行，報名將於下月初開放。

## 活動主題：永續科技

本次黑客松的主題為「永續科技」，我們鼓勵參賽者開發能夠促進環境保護、資源節約和永續發展的創新解決方案。

## 參賽資格

- 13-18 歲青少年
- 不限技術背景和經驗
- 可個人或組隊報名（每隊 2-5 人）

## 豐厚獎品

- **冠軍隊伍**：新台幣 10 萬元獎金和創投會面機會
- **亞軍隊伍**：新台幣 5 萬元獎金和企業參訪機會
- **季軍隊伍**：新台幣 3 萬元獎金和專業技術指導
- **最佳技術獎**：開發工具組和線上課程會員資格
- **最佳設計獎**：設計軟體授權和相關周邊設備

## 重要日期

- **報名開始**：2024 年 4 月 1 日
- **報名截止**：2024 年 6 月 30 日
- **線上說明會**：2024 年 5 月 15 日
- **黑客松日期**：2024 年 7 月 15-17 日

## 先修準備

想要提前準備的同學，可以參加我們的前導工作坊系列：
1. 專案管理與團隊協作（4 月份）
2. 原型設計與使用者體驗（5 月份）
3. 演示技巧與提案準備（6 月份）

敬請期待正式報名訊息，並關注我們的社群媒體獲取最新消息！

---

李婉茹
HackIT 活動總監`
  }
];

// 獲取所有新聞檔案路徑
export function getNewsFiles(): string[] {
  return newsData.map(news => news.slug);
}

// 解析單個新聞檔案
export function parseNewsFile(filename: string): NewsItem | null {
  const news = newsData.find(n => n.slug === filename.replace(/\.md$/, ''));
  return news || null;
}

// 獲取所有新聞資料
export function getAllNews(): NewsItem[] {
  return [...newsData].sort((a, b) => {
    const dateA = new Date(a.frontmatter.date).getTime();
    const dateB = new Date(b.frontmatter.date).getTime();
    return dateB - dateA; // 最新的排在前面
  });
}

// 獲取最新新聞 (取前N則)
export function getLatestNews(count: number = 5): NewsItem[] {
  return getAllNews().slice(0, count);
}

// 獲取特色新聞 (標記為 isFeatured)
export function getFeaturedNews(): NewsItem[] {
  return newsData.filter(news => news.frontmatter.isFeatured);
}

// 根據 slug 獲取單個新聞
export function getNewsBySlug(slug: string): NewsItem | null {
  return newsData.find(news => news.slug === slug) || null;
}

// 按分類獲取新聞
export function getNewsByCategory(category: string): NewsItem[] {
  return newsData.filter(news => news.frontmatter.category === category);
}

// 按標籤獲取新聞
export function getNewsByTag(tag: string): NewsItem[] {
  return newsData.filter(news => news.frontmatter.tags.includes(tag));
}

// 根據作者獲取新聞
export function getNewsByAuthor(author: string): NewsItem[] {
  return newsData.filter(news => news.frontmatter.author === author);
} 