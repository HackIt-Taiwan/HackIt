"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaCalendar, FaTag, FaNewspaper, FaBullhorn, FaTrophy, FaChevronRight, FaSearch, FaUser } from 'react-icons/fa';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getAllNews, NewsItem } from '@/utils/news';

// Page component.
export default function NewsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("全部");
  
  // Fetch news data from utils/news.ts.
  const newsData = getAllNews();
  
  // Filter news.
  const filteredNews = newsData.filter(news => {
    const matchesSearch = news.frontmatter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          news.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          news.frontmatter.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "全部" || news.frontmatter.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  // Collect categories.
  const categories = ["全部", ...Array.from(new Set(newsData.map(news => news.frontmatter.category)))];
  
  // Map categories to icons.
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "活動公告":
      case "活動預告":
        return <FaCalendar className="mr-1" />;
      case "合作消息":
        return <FaUser className="mr-1" />;
      case "媒體報導":
        return <FaNewspaper className="mr-1" />;
      default:
        return <FaBullhorn className="mr-1" />;
    }
  };
  
  // Motion variants.
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-28 md:pt-32 lg:pt-36 pb-16 md:pb-20 bg-gradient-to-b from-primary/5 to-indigo-50 dark:from-primary/10 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-800 dark:text-white">
              最新<span className="text-primary">消息</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
              了解 HackIt 的最新動態、活動資訊和媒體報導
            </p>
            
            {/* Search bar */}
            <div className="max-w-2xl mx-auto mt-8 relative">
              <div className="relative">
                <input
                  type="text"
                  placeholder="搜尋新聞..."
                  className="w-full px-4 py-3 pl-10 rounded-lg border-2 border-gray-200 dark:border-gray-700 focus:outline-none focus:border-primary dark:bg-gray-800 dark:text-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Category tags */}
      <section className="py-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-center flex-wrap gap-2">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category === "全部" ? "全部" : (
                  <span className="flex items-center">
                    {getCategoryIcon(category)} {category}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>
      
      {/* News list */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          {filteredNews.length > 0 ? (
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredNews.map((news) => (
                <motion.article 
                  key={news.slug}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <Link href={`/news/${news.slug}`} className="block">
                    <div className="relative h-48 overflow-hidden">
                      <Image 
                        src={news.frontmatter.image} 
                        alt={news.frontmatter.title} 
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                          {getCategoryIcon(news.frontmatter.category)}
                          {news.frontmatter.category}
                        </span>
                      </div>
                    </div>
                  </Link>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3 text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <FaCalendar className="mr-1" /> 
                        <span>{new Date(news.frontmatter.date).toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center">
                        <FaUser className="mr-1" />
                        <span>{news.frontmatter.author}</span>
                      </div>
                    </div>
                    <Link href={`/news/${news.slug}`} className="block">
                      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3 leading-tight hover:text-primary dark:hover:text-primary transition-colors">
                        {news.frontmatter.title}
                      </h2>
                    </Link>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {/* Use the first paragraph as a summary */}
                      {news.content.split('\n\n')[1]}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {news.frontmatter.tags.map((tag, i) => (
                        <span 
                          key={i} 
                          className="inline-flex items-center px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs"
                        >
                          <FaTag className="mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link 
                      href={`/news/${news.slug}`} 
                      className="inline-flex items-center text-primary hover:text-primary-dark dark:hover:text-primary-light font-medium"
                    >
                      閱讀更多 <FaChevronRight className="ml-1 text-xs" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold text-gray-500 dark:text-gray-400 mb-4">沒有找到相關新聞</h3>
              <p className="text-gray-500 dark:text-gray-400">請嘗試其他搜尋關鍵詞或分類</p>
              <button 
                className="mt-6 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("全部");
                }}
              >
                清除篩選
              </button>
            </div>
          )}
        </div>
      </section>
      
      {/* Subscribe section */}
      <section className="py-16 md:py-20 bg-primary/5 dark:bg-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-white">
                訂閱最新消息
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                不錯過任何重要更新，直接收到 HackIt 的最新動態和活動資訊
              </p>
              <form className="max-w-lg mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input 
                    type="email" 
                    placeholder="您的電子郵件" 
                    className="flex-grow px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 focus:outline-none focus:border-primary dark:bg-gray-800 dark:text-white"
                    required
                  />
                  <button 
                    type="submit"
                    className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                  >
                    訂閱
                  </button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                  我們尊重您的隱私，您可以隨時取消訂閱。
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 
