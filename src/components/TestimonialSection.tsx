"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { FaQuoteLeft, FaArrowLeft, FaArrowRight, FaStar } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    content: "這個社群徹底改變了我對程式設計的看法！工作坊老師非常有耐心，即使是完全沒有基礎的我，也能輕鬆跟上。",
    name: "蔡小明",
    title: "高中生",
    avatar: "/images/testimonials/avatar-1.jpg",
    stars: 5,
  },
  {
    id: 2,
    content: "從參加第一個駭客松活動開始，我的技術水平得到了突飛猛進的提升。而且我還交到了許多志同道合的朋友！",
    name: "林雨彤",
    title: "大學生",
    avatar: "/images/testimonials/avatar-2.jpg",
    stars: 5,
  },
  {
    id: 3,
    content: "社群裡的導師都非常專業，給了我很多實用的建議。我在這裡學到的知識，直接幫助我在實習面試中脫穎而出。",
    name: "王大為",
    title: "資訊系學生",
    avatar: "/images/testimonials/avatar-3.jpg",
    stars: 4,
  },
  {
    id: 4,
    content: "之前對程式總是望而生畏，但加入社群後，我發現原來寫程式也可以這麼有趣！現在我已經建立了自己的個人網站。",
    name: "張小美",
    title: "設計系學生",
    avatar: "/images/testimonials/avatar-4.jpg",
    stars: 5,
  },
  {
    id: 5,
    content: "參加社群活動不僅讓我學到了新技術，還拓展了我的視野。現在我更確定自己未來的職業方向了。",
    name: "李偉誠",
    title: "高三學生",
    avatar: "/images/testimonials/avatar-5.jpg",
    stars: 5,
  },
];

const TestimonialSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [isMobileView, setIsMobileView] = useState(false);

  // 動畫變體
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  // 處理導航
  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // 創建星星評分
  const renderStars = (count: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <FaStar
          key={i}
          className={`h-4 w-4 ${i < count ? "text-yellow-400" : "text-gray-300"}`}
        />
      ));
  };

  // 判斷是否為移動設備視圖
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    
    // 初始設置
    handleResize();
    
    // 監聽視窗大小變化
    window.addEventListener("resize", handleResize);
    
    // 清理監聽器
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 顯示卡片
  const visibleTestimonials = isMobileView 
    ? [testimonials[activeIndex]] 
    : [
        testimonials[activeIndex],
        testimonials[(activeIndex + 1) % testimonials.length],
        testimonials[(activeIndex + 2) % testimonials.length],
      ];

  return (
    <section id="見證分享" className="py-20 bg-gray-50 overflow-hidden">
      <motion.div
        ref={ref}
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6"
            variants={itemVariants}
          >
            見證分享
          </motion.span>
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6"
            variants={itemVariants}
          >
            聽聽<span className="text-primary">大家</span>怎麼說
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600"
            variants={itemVariants}
          >
            來自不同背景的學員們分享他們的學習心得和成長故事
          </motion.p>
        </div>

        {/* 見證卡片 */}
        <div className="relative max-w-6xl mx-auto px-4">
          <div className="flex justify-between mb-8">
            <motion.button
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-primary hover:text-white transition-all"
              variants={itemVariants}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaArrowLeft className="h-4 w-4" />
            </motion.button>
            <motion.button
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-primary hover:text-white transition-all"
              variants={itemVariants}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaArrowRight className="h-4 w-4" />
            </motion.button>
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-stretch">
            {visibleTestimonials.map((testimonial, index) => (
              <motion.div
                key={`visible-${testimonial.id}`}
                className={`bg-white rounded-2xl shadow-lg p-8 flex-1 relative ${
                  index === 0 ? "md:shadow-xl" : "md:shadow-lg"
                }`}
                variants={itemVariants}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4 }}
              >
                <div className="absolute -top-4 left-8 bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center">
                  <FaQuoteLeft className="text-primary h-4 w-4" />
                </div>
                <div className="mb-6 pt-4">
                  <div className="flex mb-2">{renderStars(testimonial.stars)}</div>
                  <p className="text-gray-700 italic mb-6">{testimonial.content}</p>
                </div>
                <div className="flex items-center">
                  <div className="relative w-12 h-12 mr-4 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      fill
                      sizes="48px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 導航點 */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-3 h-3 rounded-full transition-all ${
                  idx === activeIndex ? "bg-primary scale-125" : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA 區域 */}
        <motion.div
          className="mt-24 text-center max-w-3xl mx-auto"
          variants={itemVariants}
        >
          <h3 className="text-2xl font-bold mb-6">
            想要成為下一個成功案例嗎？
          </h3>
          <p className="text-gray-600 mb-8">
            立即加入我們的社群，開始你的程式學習之旅
          </p>
          <motion.button
            className="btn-primary py-3 px-8 rounded-full text-base font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            立即加入
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default TestimonialSection; 