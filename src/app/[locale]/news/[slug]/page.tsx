"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaCalendar, FaUser, FaTag, FaChevronLeft, FaShare } from 'react-icons/fa';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { getNewsBySlug, NewsItem, getLatestNews } from '@/utils/news';
import { notFound } from 'next/navigation';
import { useI18n } from '@/i18n';

interface NewsDetailPageProps {
  params: {
    slug: string;
    locale: string;
  };
}

export default function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug, locale } = params;
  const { t } = useI18n();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [relatedNews, setRelatedNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the news content.
    const currentNews = getNewsBySlug(slug);
    if (!currentNews) {
      notFound();
    }
    setNews(currentNews);

    // Fetch related news (latest 3 excluding the current item).
    const latestNews = getLatestNews(4).filter(item => item.slug !== slug).slice(0, 3);
    setRelatedNews(latestNews);
    
    setLoading(false);
  }, [slug]);

  // Category translation map.
  const getCategoryTranslation = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      "活動公告": "eventAnnouncement",
      "活動預告": "eventPreview",
      "合作消息": "partnerNews",
      "媒體報導": "mediaReport"
    };
    
    const key = categoryMap[category];
    if (!key) return category;
    return t(`newsPage.categories.${key}`) as string;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">{t("newsPage.detail.loading") as string}</p>
        </div>
      </div>
    );
  }

  if (!news) {
    return notFound();
  }

  // Split Markdown into headings and content sections.
  const contentWithoutTitle = news.content.split('\n').slice(2).join('\n');
  const contentSections = contentWithoutTitle.split('\n\n').filter(Boolean);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      {/* Article header */}
      <section className="pt-28 md:pt-32 lg:pt-36 pb-8 bg-gradient-to-b from-primary/5 to-white dark:from-primary/10 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link 
                href={`/${locale}/news`}
                className="inline-flex items-center text-primary hover:text-primary-dark dark:hover:text-primary-light mb-6"
              >
                <FaChevronLeft className="mr-2" /> {t("newsPage.detail.backToNews") as string}
              </Link>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-800 dark:text-white leading-tight">
                {news.frontmatter.title}
              </h1>
              
              <div className="flex flex-wrap gap-4 mb-8 text-gray-600 dark:text-gray-300">
                <div className="flex items-center">
                  <FaCalendar className="mr-2" />
                  <span>{new Date(news.frontmatter.date).toLocaleDateString(locale === 'en' ? 'en-US' : 'zh-TW', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                <div className="flex items-center">
                  <FaUser className="mr-2" />
                  <span>{news.frontmatter.author}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {news.frontmatter.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="inline-flex items-center px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
                  >
                    <FaTag className="mr-2" />
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Article body */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Hero image */}
              <div className="relative w-full h-80 md:h-96">
                <Image 
                  src={news.frontmatter.image} 
                  alt={news.frontmatter.title} 
                  fill
                  priority
                  style={{ objectFit: 'cover' }}
                  className="w-full h-full"
                />
              </div>
              
              {/* Article content */}
              <div className="p-6 md:p-10">
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  {contentSections.map((section, index) => {
                    // Check for heading.
                    if (section.startsWith('##')) {
                      return (
                        <h2 key={index} className="text-2xl font-bold mt-8 mb-4 text-gray-800 dark:text-white">
                          {section.replace(/^##\s/, '')}
                        </h2>
                      );
                    }
                    
                    // Check for list.
                    if (section.includes('- ')) {
                      const listItems = section.split('\n').filter(Boolean);
                      return (
                        <ul key={index} className="list-disc list-outside ml-5 my-4">
                          {listItems.map((item, i) => (
                            <li key={i} className="text-gray-700 dark:text-gray-300 mb-2">
                              {item.replace(/^-\s/, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    
                    // Check for ordered list.
                    if (section.match(/^\d\.\s/)) {
                      const listItems = section.split('\n').filter(Boolean);
                      return (
                        <ol key={index} className="list-decimal list-outside ml-5 my-4">
                          {listItems.map((item, i) => (
                            <li key={i} className="text-gray-700 dark:text-gray-300 mb-2">
                              {item.replace(/^\d\.\s/, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}
                            </li>
                          ))}
                        </ol>
                      );
                    }
                    
                    // Regular paragraph.
                    return (
                      <p 
                        key={index} 
                        className="text-gray-700 dark:text-gray-300 my-4 leading-relaxed"
                        dangerouslySetInnerHTML={{ 
                          __html: section
                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                            .replace(/\*(.*?)\*/g, '<em>$1</em>')
                        }}
                      />
                    );
                  })}
                </div>
                
                {/* Share section */}
                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="text-gray-600 dark:text-gray-400">
                      {t("newsPage.detail.category") as string}: <span className="text-primary">{getCategoryTranslation(news.frontmatter.category)}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-gray-600 dark:text-gray-400">{t("newsPage.detail.share") as string}:</span>
                      <button className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors">
                        <FaShare />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Related news */}
            {relatedNews.length > 0 && (
              <div className="mt-16">
                <h2 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white">{t("newsPage.detail.relatedNews") as string}</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedNews.map((relatedItem) => (
                    <motion.div 
                      key={relatedItem.slug}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <Link href={`/${locale}/news/${relatedItem.slug}`} className="block">
                        <div className="relative h-40 overflow-hidden">
                          <Image 
                            src={relatedItem.frontmatter.image} 
                            alt={relatedItem.frontmatter.title} 
                            fill
                            style={{ objectFit: 'cover' }}
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2">
                            {relatedItem.frontmatter.title}
                          </h3>
                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <FaCalendar className="mr-1" />
                            <span>{new Date(relatedItem.frontmatter.date).toLocaleDateString(locale === 'en' ? 'en-US' : 'zh-TW', { 
                              year: 'numeric', 
                              month: 'numeric', 
                              day: 'numeric' 
                            })}</span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 
