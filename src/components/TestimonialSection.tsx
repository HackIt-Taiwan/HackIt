"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaQuoteLeft, FaArrowLeft, FaArrowRight, FaStar } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    content: "這個社群徹底改變了我對程式設計的看法！工作坊老師非常有耐心，即使是完全沒有基礎的我，也能輕鬆跟上。",
    name: "蔡小明",
    title: "高中生",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=2662&auto=format&fit=crop",
    stars: 5,
  },
  {
    id: 2,
    content: "從參加第一個駭客松活動開始，我的技術水平得到了突飛猛進的提升。而且我還交到了許多志同道合的朋友！",
    name: "林雨彤",
    title: "大學生",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2787&auto=format&fit=crop",
    stars: 5,
  },
  {
    id: 3,
    content: "社群裡的導師都非常專業，給了我很多實用的建議。我在這裡學到的知識，直接幫助我在實習面試中脫穎而出。",
    name: "王大為",
    title: "資訊系學生",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2787&auto=format&fit=crop",
    stars: 4,
  },
  {
    id: 4,
    content: "之前對程式總是望而生畏，但加入社群後，我發現原來寫程式也可以這麼有趣！現在我已經建立了自己的個人網站。",
    name: "張小美",
    title: "設計系學生",
    avatar: "https://images.unsplash.com/photo-1664575602554-2087b04935a5?q=80&w=2787&auto=format&fit=crop",
    stars: 5,
  },
  {
    id: 5,
    content: "參加社群活動不僅讓我學到了新技術，還拓展了我的視野。現在我更確定自己未來的職業方向了。",
    name: "李偉誠",
    title: "高三學生",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2787&auto=format&fit=crop",
    stars: 5,
  },
];

const TestimonialSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [displayCount, setDisplayCount] = useState(3);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setDisplayCount(1);
      } else if (window.innerWidth < 1024) {
        setDisplayCount(2);
      } else {
        setDisplayCount(3);
      }
    };

    // 初始設置
    handleResize();
    
    // 監聽視窗大小變化
    window.addEventListener("resize", handleResize);
    
    // 清理監聽器
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const cardHoverVariants = {
    rest: { 
      y: 0,
      rotate: 0,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: { duration: 0.3, ease: "easeOut" } 
    },
    hover: { 
      y: -8,
      rotate: [-0.5, 0.5, 0],
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 15px rgba(124, 58, 237, 0.3)",
      transition: { duration: 0.3, ease: "easeIn" } 
    }
  };

  const navButtonVariants = {
    rest: { 
      scale: 1,
      backgroundColor: "#FFFFFF",
      color: "#374151",
      transition: { duration: 0.2 } 
    },
    hover: { 
      scale: 1.1,
      backgroundColor: "#7C3AED",
      color: "#FFFFFF",
      boxShadow: "0 0 15px rgba(124, 58, 237, 0.5)",
      transition: { duration: 0.2 } 
    },
    tap: { 
      scale: 0.95,
      transition: { duration: 0.1 } 
    }
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

  // 顯示卡片
  const visibleTestimonials = () => {
    const result = [];
    for (let i = 0; i < displayCount; i++) {
      const index = (activeIndex + i) % testimonials.length;
      result.push(testimonials[index]);
    }
    return result;
  };

  // 自動切換見證
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <section id="見證分享" className="py-20 md:py-28 lg:py-32 bg-gray-50 overflow-hidden relative">
      {/* 背景裝飾 */}
      <motion.div 
        className="absolute top-[20%] right-[10%] w-[30vw] h-[30vw] max-w-[500px] max-h-[500px] bg-yellow-400/20 rounded-full blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 0.6,
          x: [0, 25, 0],
          y: [0, -20, 0],
          scale: [0.9, 1, 0.9]
        }}
        transition={{ 
          opacity: { duration: 1 },
          x: { repeat: Infinity, duration: 20, ease: "easeInOut", repeatType: "loop" },
          y: { repeat: Infinity, duration: 15, ease: "easeInOut", repeatType: "loop" },
          scale: { repeat: Infinity, duration: 12, ease: "easeInOut", repeatType: "loop" }
        }}
      />
      <motion.div 
        className="absolute bottom-[10%] left-[10%] w-[25vw] h-[25vw] max-w-[400px] max-h-[400px] bg-cyan-400/20 rounded-full blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 0.6,
          x: [0, -20, 0],
          y: [0, 15, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          opacity: { duration: 1 },
          x: { repeat: Infinity, duration: 18, ease: "easeInOut", repeatType: "loop" },
          y: { repeat: Infinity, duration: 22, ease: "easeInOut", repeatType: "loop" },
          scale: { repeat: Infinity, duration: 15, ease: "easeInOut", repeatType: "loop" }
        }}
      />

      {/* Playful elements */}
      <motion.div 
        className="absolute top-[10%] left-[20%] w-8 h-8 bg-primary/30 rounded-full"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 0.7,
          y: [-10, 10, -10],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          opacity: { duration: 1 },
          y: { repeat: Infinity, duration: 8, ease: "easeInOut" },
          scale: { repeat: Infinity, duration: 10, ease: "easeInOut" }
        }}
      />
      <motion.div 
        className="absolute top-[30%] left-[70%] w-5 h-5 bg-yellow-400/40 rotate-45"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 0.6,
          rotate: [45, 90, 45],
          y: [0, 15, 0]
        }}
        transition={{ 
          opacity: { duration: 1 },
          rotate: { repeat: Infinity, duration: 12, ease: "easeInOut" },
          y: { repeat: Infinity, duration: 10, ease: "easeInOut" }
        }}
      />
      <motion.div 
        className="absolute bottom-[20%] right-[15%] h-10 w-10 border-2 border-primary/30 rounded-full"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 0.8,
          scale: [1, 1.3, 1],
          x: [0, -10, 0]
        }}
        transition={{ 
          opacity: { duration: 1 },
          scale: { repeat: Infinity, duration: 8, ease: "easeInOut" },
          x: { repeat: Infinity, duration: 6, ease: "easeInOut" }
        }}
      />
      
      {/* Floating icons */}
      <motion.div
        className="absolute left-[5%] top-[40%] opacity-20 pointer-events-none"
        animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      >
        <FaStar className="text-yellow-500 text-4xl" />
      </motion.div>
      <motion.div
        className="absolute right-[5%] top-[60%] opacity-20 pointer-events-none"
        animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      >
        <FaQuoteLeft className="text-primary text-4xl" />
      </motion.div>

      <motion.div
        ref={ref}
        className="container mx-auto px-4 md:px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <motion.span
            className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6"
            variants={itemVariants}
          >
            見證分享
          </motion.span>
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            variants={itemVariants}
          >
            聽聽<motion.span 
              className="text-primary"
              initial={{ textShadow: "0 0 0 rgba(124, 58, 237, 0)" }}
              animate={{ textShadow: "0 0 10px rgba(124, 58, 237, 0.3)" }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            >大家</motion.span>怎麼說
          </motion.h2>
          
          {/* Add playful slogan */}
          <motion.div 
            className="relative mb-6 p-2 overflow-hidden"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {/* 程式碼風格的打字動畫 - 適合淺色背景 */}
            <div className="font-mono flex items-center text-xl md:text-2xl relative">
              <motion.span
                className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-5 bg-primary"
                animate={{
                  opacity: [1, 0, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1,
                  ease: "linear",
                  repeatType: "loop"
                }}
              />
              
              <motion.span 
                className="text-green-600 mr-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.2 }}
              >
                &gt;
              </motion.span>
              
              <motion.div className="flex">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "auto" }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.5,
                    ease: "easeInOut",
                  }}
                  className="overflow-hidden flex"
                >
                  <motion.span
                    className="text-primary font-bold whitespace-nowrap"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ 
                      x: 0, 
                      opacity: 1,
                    }}
                    transition={{ 
                      delay: 0.5, 
                      duration: 0.3 
                    }}
                  >
                    Hack
                  </motion.span>
                </motion.div>
                
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "auto" }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 1.3,
                    ease: "easeInOut",
                  }}
                  className="overflow-hidden flex"
                >
                  <motion.span
                    className="text-gray-600 font-medium whitespace-nowrap mx-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.3, duration: 0.3 }}
                  >
                    into
                  </motion.span>
                </motion.div>
                
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "auto" }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 1.8,
                    ease: "easeInOut",
                  }}
                  className="overflow-hidden flex"
                >
                  <motion.span
                    className="text-primary font-bold whitespace-nowrap"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8, duration: 0.3 }}
                  >
                    It
                  </motion.span>
                </motion.div>
                
                <motion.span
                  className="text-yellow-500 font-bold"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ 
                    opacity: 1, 
                    scale: [1, 1.3, 1],
                  }}
                  transition={{ 
                    opacity: { delay: 2.3, duration: 0.2 },
                    scale: { 
                      delay: 2.5,
                      duration: 0.4,
                      repeat: Infinity,
                      repeatDelay: 3,
                      repeatType: "reverse",
                    }
                  }}
                >
                  !
                </motion.span>
              </motion.div>
            </div>
            
            {/* 輸入後的閃爍效果 */}
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 bg-green-500"
              initial={{ width: "0%" }}
              animate={{ 
                width: ["0%", "100%", "0%"],
              }}
              transition={{ 
                delay: 2.5,
                duration: 1.5,
                times: [0, 0.7, 1],
                repeat: Infinity,
                repeatDelay: 5
              }}
            />
            
            {/* 程式碼風格的背景元素 */}
            <motion.div
              className="absolute inset-0 -z-10 bg-gray-100 rounded-md border border-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            />
            
            {/* Client-side only symbols with deterministic positions */}
            {isMounted && ["{", "}", "<", ">"].map((char, i) => (
              <motion.span
                key={i}
                className="absolute text-gray-300 text-opacity-40 font-mono pointer-events-none"
                style={{
                  top: `${(i * 30) % 100}%`,
                  left: `${(i * 30) % 100}%`,
                  fontSize: `${6 + i}px`,
                }}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0, 0.7, 0],
                  y: [0, -15],
                  rotate: i * 5 - 7.5
                }}
                transition={{ 
                  delay: 2.5 + i * 0.2,
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: i,
                  repeatType: "loop"
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.div>
          
          <motion.p
            className="text-lg md:text-xl text-gray-600"
            variants={itemVariants}
          >
            來自不同背景的學員們分享他們的學習心得和成長故事
          </motion.p>
        </div>

        {/* 見證卡片 */}
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div 
            className="flex justify-between mb-8 md:mb-12"
            variants={itemVariants}
          >
            <motion.button
              onClick={prevTestimonial}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-primary hover:text-white transition-all relative overflow-hidden group"
              variants={navButtonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              aria-label="上一個見證"
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-pink-400/20 opacity-0 group-hover:opacity-100"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              />
              <FaArrowLeft className="h-5 w-5 relative z-10" />
            </motion.button>
            <motion.button
              onClick={nextTestimonial}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-primary hover:text-white transition-all relative overflow-hidden group"
              variants={navButtonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              aria-label="下一個見證"
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-pink-400/20 opacity-0 group-hover:opacity-100"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              />
              <FaArrowRight className="h-5 w-5 relative z-10" />
            </motion.button>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-6 md:gap-8 items-stretch">
            <AnimatePresence mode="wait">
              {visibleTestimonials().map((testimonial, index) => (
                <motion.div
                  key={`visible-${testimonial.id}-${index}`}
                  className={`bg-white rounded-2xl shadow-lg p-6 md:p-8 flex-1 relative ${
                    index === 0 ? "md:shadow-xl" : "md:shadow-lg"
                  } border-2 border-transparent hover:border-primary/20`}
                  variants={cardHoverVariants}
                  initial="rest"
                  whileHover="hover"
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    scale: index === 0 ? 1.02 : 1,
                    rotate: index % 2 === 0 ? [-0.5, 0, -0.5] : [0.5, 0, 0.5],
                    transition: { 
                      type: "spring", 
                      stiffness: 100, 
                      damping: 12,
                      delay: index * 0.1,
                      rotate: {
                        repeat: Infinity,
                        duration: 6,
                        ease: "easeInOut",
                        repeatType: "reverse"
                      }
                    }
                  }}
                  exit={{ 
                    opacity: 0, 
                    y: -30,
                    rotate: index % 2 === 0 ? -2 : 2,
                    transition: { duration: 0.3 }
                  }}
                >
                  <motion.div 
                    className="absolute -top-4 left-8 bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center"
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ 
                      scale: 1, 
                      rotate: 0,
                      y: [0, -5, 0]
                    }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 15,
                      delay: 0.2 + index * 0.1,
                      y: {
                        repeat: Infinity,
                        duration: 2,
                        ease: "easeInOut",
                        repeatType: "reverse",
                        delay: index * 0.5
                      }
                    }}
                  >
                    <FaQuoteLeft className="text-primary h-4 w-4" />
                  </motion.div>
                  <div className="mb-6 pt-4">
                    <motion.div 
                      className="flex mb-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    >
                      {renderStars(testimonial.stars)}
                    </motion.div>
                    <motion.p 
                      className="text-gray-700 italic mb-6"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                    >
                      {testimonial.content}
                    </motion.p>
                  </div>
                  <div className="flex items-center">
                    <motion.div 
                      className="relative w-12 h-12 mr-4 rounded-full overflow-hidden"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                    >
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        fill
                        sizes="48px"
                        style={{ objectFit: "cover" }}
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                    >
                      <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.title}</p>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* 導航點 */}
          <div className="flex justify-center mt-8 md:mt-12 space-x-2">
            {testimonials.map((_, idx) => (
              <motion.button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`transition-all duration-300 ease-in-out relative ${
                  idx === activeIndex ? "w-10 bg-primary" : "w-3 bg-gray-300 hover:bg-gray-400"
                } h-3 rounded-full overflow-hidden group`}
                animate={{ 
                  scale: idx === activeIndex ? 1.2 : 1,
                  backgroundColor: idx === activeIndex ? "#7C3AED" : "#D1D5DB"
                }}
                transition={{ duration: 0.3 }}
                aria-label={`前往見證 ${idx + 1}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {idx === activeIndex && (
                  <motion.div 
                    className="absolute inset-0 w-full h-full"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 2, 
                      ease: "easeInOut",
                      repeatDelay: 0.2
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-full h-full" />
                  </motion.div>
                )}
                <motion.div 
                  className="absolute inset-0 bg-yellow-400 opacity-0 group-hover:opacity-30"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.button>
            ))}
          </div>
        </div>

        {/* CTA 區域 */}
        <motion.div
          className="mt-20 md:mt-28 text-center max-w-3xl mx-auto"
          variants={itemVariants}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-6">
            想要成為下一個成功案例嗎？
          </h3>
          <p className="text-lg text-gray-600 mb-8">
            立即加入我們的社群，開始你的程式學習之旅
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/signup"
              className="inline-block bg-primary hover:bg-primary-dark text-white font-medium py-3 px-8 rounded-full text-base md:text-lg transition-colors shadow-md hover:shadow-lg"
            >
              立即加入
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default TestimonialSection; 