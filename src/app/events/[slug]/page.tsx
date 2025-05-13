import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FaCalendar, FaClock, FaMapMarkerAlt, FaUsers, FaTags, FaArrowLeft } from 'react-icons/fa';
import { getEventBySlug } from '@/utils/events';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MDXRemote } from 'next-mdx-remote/rsc';

interface EventPageProps {
  params: {
    slug: string;
  };
}

export default function EventPage({ params }: EventPageProps) {
  const event = getEventBySlug(params.slug);
  
  // 如果活動不存在，返回 404
  if (!event) {
    notFound();
  }
  
  const { frontmatter, content } = event;
  const eventDate = new Date(frontmatter.date);
  const formattedDate = eventDate.toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      {/* 活動頭部 */}
      <section className="pt-28 md:pt-32 pb-8 md:pb-12 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Link 
              href="/events" 
              className="inline-flex items-center text-primary hover:text-primary-dark dark:text-primary-light transition-colors"
            >
              <FaArrowLeft className="mr-2" /> 返回活動列表
            </Link>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* 左側圖片 */}
            <div className="lg:w-1/2">
              <div className="relative rounded-xl overflow-hidden aspect-video shadow-lg">
                <Image 
                  src={frontmatter.image} 
                  alt={frontmatter.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                  className="transition-transform duration-500 hover:scale-105"
                />
                
                {frontmatter.isCompleted && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="bg-black/70 text-white px-6 py-3 rounded-full text-lg font-bold transform -rotate-6">
                      活動已結束
                    </div>
                  </div>
                )}
                
                <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold text-primary z-10">
                  {frontmatter.category}
                </div>
                
                {frontmatter.emoji && (
                  <div className="absolute bottom-4 right-4 text-5xl">
                    {frontmatter.emoji}
                  </div>
                )}
              </div>
            </div>
            
            {/* 右側資訊 */}
            <div className="lg:w-1/2">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">
                {frontmatter.title}
              </h1>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                {frontmatter.description}
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <FaCalendar className="text-primary" />
                  </div>
                  <div>
                    <span className="font-medium">日期：</span>{formattedDate}
                    {frontmatter.endDate && (
                      <span> 至 {new Date(frontmatter.endDate).toLocaleDateString('zh-TW', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <FaClock className="text-primary" />
                  </div>
                  <div>
                    <span className="font-medium">時間：</span>{frontmatter.time}
                  </div>
                </div>
                
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <FaMapMarkerAlt className="text-primary" />
                  </div>
                  <div>
                    <span className="font-medium">地點：</span>{frontmatter.location}
                  </div>
                </div>
                
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <FaUsers className="text-primary" />
                  </div>
                  <div>
                    <span className="font-medium">名額：</span>
                    {frontmatter.isCompleted 
                      ? `${frontmatter.spots} 人`
                      : `${frontmatter.spotsLeft}/${frontmatter.spots} 人（尚餘 ${frontmatter.spotsLeft} 名額）`
                    }
                  </div>
                </div>
                
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <FaTags className="text-primary" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {frontmatter.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* 報名按鈕 */}
              {!frontmatter.isCompleted && (
                <button 
                  className="w-full py-3 px-6 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg transition-colors shadow-md hover:shadow-lg"
                >
                  立即報名
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* 活動內容 */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:p-8 lg:p-10 prose dark:prose-invert prose-lg max-w-none">
            <MDXRemote source={content} />
          </div>
        </div>
      </section>
      
      {/* 相關活動推薦 */}
      <section className="py-12 md:py-16 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">
            你可能也會喜歡
          </h2>
          
          <div className="text-center">
            <Link 
              href="/events" 
              className="inline-block px-6 py-3 bg-primary/10 hover:bg-primary/20 text-primary font-medium rounded-lg transition-colors"
            >
              查看更多活動
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 