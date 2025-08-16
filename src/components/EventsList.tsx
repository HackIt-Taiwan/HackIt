"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaCalendar, FaMapMarkerAlt, FaUsers, FaClock, FaFilter, FaSearch, FaChevronDown } from 'react-icons/fa';
import { Event } from '@/utils/events';
import { useI18n } from '@/i18n';

interface EventsListProps {
  upcomingEvents: Event[];
  pastEvents: Event[];
  categories: string[];
}

const EventsList: React.FC<EventsListProps> = ({ upcomingEvents, pastEvents, categories }) => {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState("upcoming"); // 'upcoming' 或 'past'
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(t("common.all"));
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // 處理搜索和過濾
  const filteredUpcomingEvents = upcomingEvents.filter(event => {
    const matchesSearch = event.frontmatter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.frontmatter.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === t("common.all") || event.frontmatter.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredPastEvents = pastEvents.filter(event => {
    const matchesSearch = event.frontmatter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        event.frontmatter.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === t("common.all") || event.frontmatter.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
    <>
      {/* 搜索欄 */}
      <div className="bg-white dark:bg-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto relative">
            <div className="flex">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder={t("eventsList.searchPlaceholder") as string}
                  className="w-full px-4 py-3 pl-10 rounded-l-lg border-2 border-gray-200 dark:border-gray-700 focus:outline-none focus:border-primary dark:bg-gray-800 dark:text-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <button 
                className="bg-gray-200 dark:bg-gray-700 px-4 rounded-r-lg flex items-center gap-2 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <FaFilter className="text-gray-600 dark:text-gray-300" />
                <span className="hidden sm:inline text-gray-600 dark:text-gray-300">{t("eventsList.filterButton")}</span>
                <FaChevronDown className={`text-gray-600 dark:text-gray-300 transform transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>
            
            {/* 篩選選項 */}
            {isFilterOpen && (
              <motion.div 
                className="absolute z-10 mt-2 w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="font-medium text-gray-800 dark:text-white mb-2">{t("eventsList.categoryTitle")}</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className={`px-3 py-1 rounded-full text-sm ${
                        selectedCategory === category
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* 活動標籤頁 */}
      <section className="py-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="flex space-x-4 md:space-x-8">
              <button
                className={`px-4 py-2 font-medium text-lg relative ${
                  activeTab === 'upcoming' 
                    ? 'text-primary' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('upcoming')}
              >
                {t("eventsList.upcomingTab")}
                {activeTab === 'upcoming' && (
                  <motion.div
                    className="absolute left-0 right-0 bottom-0 h-0.5 bg-primary"
                    layoutId="tabIndicator"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </button>
              <button
                className={`px-4 py-2 font-medium text-lg relative ${
                  activeTab === 'past' 
                    ? 'text-primary' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('past')}
              >
                {t("eventsList.pastTab")}
                {activeTab === 'past' && (
                  <motion.div
                    className="absolute left-0 right-0 bottom-0 h-0.5 bg-primary"
                    layoutId="tabIndicator"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* 活動列表 */}
      <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          {activeTab === 'upcoming' ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredUpcomingEvents.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {filteredUpcomingEvents.map((event) => (
                    <motion.div 
                      key={event.slug}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                      variants={itemVariants}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <div className="relative h-48 overflow-hidden">
                        <Image 
                          src={event.frontmatter.image} 
                          alt={event.frontmatter.title} 
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                      <div className="p-5">
                        <div className="flex items-center mb-3 text-xs text-gray-500 dark:text-gray-400">
                          <FaCalendar className="mr-1" /> {new Date(event.frontmatter.date).toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric' })}
                          <span className="mx-2">•</span>
                          <FaClock className="mr-1" /> {event.frontmatter.time}
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 line-clamp-1">{event.frontmatter.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm line-clamp-2">{event.frontmatter.description}</p>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <FaMapMarkerAlt className="mr-1" />
                            <span className="truncate max-w-[150px]">{event.frontmatter.location}</span>
                          </div>
                          <div className="flex items-center text-xs">
                            <FaUsers className="mr-1 text-primary" />
                            <span className="font-medium text-primary">{event.frontmatter.spotsLeft}/{event.frontmatter.spots} {t("eventsList.spotsLabel")}</span>
                          </div>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {event.frontmatter.tags.map((tag, idx) => (
                            <span 
                              key={idx} 
                              className="text-xs px-2 py-1 bg-primary/10 dark:bg-primary/20 text-primary rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <Link 
                          href={`/events/${event.slug}`}
                          className="block mt-4 text-center bg-primary hover:bg-primary/90 text-white font-medium py-2 rounded-lg transition-colors"
                        >
                          {t("eventsList.detailsButton")}
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-gray-600 dark:text-gray-300 text-lg">{t("eventsList.noEventsFound")}</p>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredPastEvents.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {filteredPastEvents.map((event) => (
                    <motion.div 
                      key={event.slug}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative"
                      variants={itemVariants}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <div className="relative h-48 overflow-hidden">
                        
                        <Image 
                          src={event.frontmatter.image} 
                          alt={event.frontmatter.title} 
                          fill
                          style={{ objectFit: 'cover' }}
                          className="filter grayscale"
                        />
                      </div>
                      <div className="p-5">
                        <div className="flex items-center mb-3 text-xs text-gray-500 dark:text-gray-400">
                          <FaCalendar className="mr-1" /> {new Date(event.frontmatter.date).toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 line-clamp-1">{event.frontmatter.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm line-clamp-2">{event.frontmatter.description}</p>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <FaMapMarkerAlt className="mr-1" />
                            <span className="truncate max-w-[150px]">{event.frontmatter.location}</span>
                          </div>
                          <div className="flex items-center text-xs">
                            <FaUsers className="mr-1 text-gray-500 dark:text-gray-400" />
                            <span className="font-medium text-gray-500 dark:text-gray-400">{event.frontmatter.spots} {t("eventsList.spotsLabel")}</span>
                          </div>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {event.frontmatter.tags.map((tag, idx) => (
                            <span 
                              key={idx} 
                              className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <Link 
                          href={`/events/${event.slug}`}
                          className="block mt-4 text-center bg-gray-400 dark:bg-gray-600 text-white font-medium py-2 rounded-lg cursor-not-allowed"
                        >
                          {t("eventsList.detailsButton")}
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-gray-600 dark:text-gray-300 text-lg">{t("eventsList.noEventsFound")}</p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
};

export default EventsList; 