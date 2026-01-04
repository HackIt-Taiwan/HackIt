"use client";

import React, { useEffect, useState, useRef, useMemo } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { FaRocket, FaCode, FaLaptopCode } from 'react-icons/fa';
import { useI18n } from '@/i18n';

const CTASection = () => {
  const [isMounted, setIsMounted] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const { t } = useI18n();
  
  // Use useMemo to keep deterministic values between renders.
  const floatingElements = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      width: 20 + (i * 5) % 40,
      height: 20 + (i * 5) % 40,
      top: 10 + (i * 10) % 80,
      left: 10 + (i * 10) % 80,
      xOffset: ((i * 7) % 20) - 10,
      yOffset: ((i * 11) % 20) - 10
    }));
  }, []);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <motion.section 
      ref={sectionRef}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1.2 }}
      className="relative py-24 overflow-hidden bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-500"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating code snippets */}
        {isMounted && isInView && [...Array(15)].map((_, i) => {
          // Use deterministic positions based on index
          const leftPos = ((i * 7) % 100).toFixed(0);
          const topPos = ((i * 11) % 100).toFixed(0);
          const fontSize = (8 + (i % 7)).toFixed(0);
          const duration = 20 + (i % 12); // Increased from 15 for slower animation
          const delay = i % 7; // Changed from 5 to 7 for more variability
          
          return (
            <motion.div
              key={i}
              className="absolute text-white text-opacity-10 font-mono whitespace-nowrap"
              style={{
                left: `${leftPos}%`,
                top: `${topPos}%`,
                fontSize: `${fontSize}px`,
              }}
              initial={{ opacity: 0.1, y: 0 }}
              animate={{ 
                opacity: [0.1, 0.2, 0.1],
                y: [0, -30, 0],
              }}
              transition={{ 
                repeat: Infinity, 
                duration: duration,
                delay: delay,
                repeatType: "loop"
              }}
            >
              {t(i % 2 === 0 ? "ctaSection.bgText1" : 
                i % 3 === 0 ? "ctaSection.bgText2" : 
                "ctaSection.bgText3")}
            </motion.div>
          );
        })}

        {/* Colorful shapes - only animate when in view */}
        <motion.div 
          className="absolute top-0 left-0 w-64 h-64 bg-yellow-300 rounded-full opacity-20 -translate-x-1/2 -translate-y-1/2"
          animate={isInView ? { 
            scale: [1, 1.2, 1],
            x: ['-50%', '-30%', '-50%']
          } : {}}
          transition={{ 
            duration: 22, // Slowed down from 15
            repeat: Infinity,
            repeatType: "loop" 
          }}
        />
        <motion.div 
          className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500 rounded-full opacity-20 translate-x-1/2 translate-y-1/2"
          animate={isInView ? { 
            scale: [1, 1.3, 1],
            y: ['50%', '30%', '50%']
          } : {}}
          transition={{ 
            duration: 25, // Slowed down from 18
            repeat: Infinity,
            repeatType: "loop" 
          }}
        />
      </div>
      
      <div className="relative container mx-auto px-4">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-8"
          >
            <motion.div 
              className="inline-block"
              animate={isInView ? { rotate: [-2, 2, -2] } : {}}
              transition={{ duration: 6, repeat: Infinity, repeatType: "loop" }} // Slowed down from 4
            >
              <FaRocket className="inline-block text-5xl text-yellow-300 mr-2" />
            </motion.div>
          </motion.div>

          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-white mb-3"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {t("ctaSection.readyTitle")}
          </motion.h2>
          
          <motion.div
            className="relative mb-6 p-3 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Code-style typing animation (dark background) */}
            <div className="font-mono flex items-center text-2xl md:text-3xl relative">
              <motion.span
                className="absolute -left-5 top-1/2 -translate-y-1/2 w-3 h-6 bg-yellow-300"
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
                className="text-green-400 mr-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.2 }}
              >
                &gt;
              </motion.span>
              
              <motion.div className="flex">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "auto" } : { width: 0 }}
                  transition={{ 
                    duration: 0.8,
                    delay: isInView ? 1.0 : 0, 
                    ease: "easeInOut",
                  }}
                  className="overflow-hidden flex"
                >
                  <motion.span
                    className="text-yellow-300 font-bold whitespace-nowrap"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { 
                      opacity: 1,
                      y: [0, -2, 0, 2, 0]
                    } : { opacity: 0 }}
                    transition={{ 
                      opacity: { delay: isInView ? 1.0 : 0, duration: 0.5 }, 
                      y: { 
                        delay: isInView ? 3.0 : 0, 
                        duration: 8, 
                        repeat: Infinity, 
                        repeatType: "loop",
                        ease: "easeInOut"
                      }
                    }}
                    style={{
                      filter: "drop-shadow(0 0 5px rgba(253, 224, 71, 0.5))",
                      textShadow: "0 0 3px rgba(253, 224, 71, 0.5)"
                    }}
                  >
                    Hack
                  </motion.span>
                </motion.div>
                
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={isInView ? { width: "auto", opacity: 1 } : { width: 0, opacity: 0 }}
                  transition={{ 
                    width: { duration: 0.8, delay: isInView ? 2.5 : 0, ease: "easeInOut" },
                    opacity: { duration: 0.6, delay: isInView ? 2.5 : 0 }
                  }}
                  className="overflow-hidden flex mx-1 relative"
                >
                  <motion.div
                    className="absolute top-0 left-0 w-full h-full opacity-30 -z-10"
                    style={{
                      background: "radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)"
                    }}
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1.2 } : { scale: 0 }}
                    transition={{ delay: isInView ? 2.7 : 0, duration: 1.0 }}
                  />
                  <motion.span
                    className="text-white opacity-90 font-medium whitespace-nowrap"
                    initial={{ 
                      opacity: 0,
                      y: -20,
                      scaleY: 0.8,
                      transformOrigin: "top",
                      filter: "blur(3px)"
                    }}
                    animate={isInView ? { 
                      opacity: 1,
                      y: 0,
                      scaleY: 1,
                      filter: "blur(0px)"
                    } : {
                      opacity: 0,
                      y: -20,
                      scaleY: 0.8,
                      filter: "blur(3px)"
                    }}
                    transition={{ 
                      opacity: { delay: isInView ? 2.5 : 0, duration: 0.6 },
                      y: { 
                        delay: isInView ? 2.5 : 0,
                        duration: 0.8,
                        type: "spring",
                        stiffness: 50,
                        damping: 10
                      },
                      scaleY: { delay: isInView ? 2.5 : 0, duration: 0.8 },
                      filter: { delay: isInView ? 2.7 : 0, duration: 0.5 }
                    }}
                    style={{
                      filter: "drop-shadow(0 0 3px rgba(255,255,255,0.5))",
                      textShadow: "0 0 8px rgba(255,255,255,0.5)"
                    }}
                  >
                    into
                  </motion.span>
                  
                  {/* Add fabric-like texture */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute bg-white/5 h-[1px]"
                      style={{
                        width: '100%',
                        top: `${20 + i * 15}%`,
                        left: 0
                      }}
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={isInView ? { 
                        scaleX: 1, 
                        opacity: [0, 0.3, 0.1],
                        y: [0, 1, -1, 0]
                      } : {
                        scaleX: 0, 
                        opacity: 0
                      }}
                      transition={{
                        delay: isInView ? (2.7 + i * 0.08) : 0,
                        duration: 2.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </motion.div>
                
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "auto" } : { width: 0 }}
                  transition={{ 
                    duration: 0.8,
                    delay: isInView ? 1.5 : 0,
                    ease: "easeInOut",
                  }}
                  className="overflow-hidden flex"
                >
                  <motion.span
                    className="text-yellow-300 font-bold whitespace-nowrap"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { 
                      opacity: 1,
                      y: [0, 2, 0, -2, 0]
                    } : { opacity: 0 }}
                    transition={{ 
                      opacity: { delay: isInView ? 1.5 : 0, duration: 0.5 },
                      y: { 
                        delay: isInView ? 3.0 : 0,
                        duration: 8,
                        repeat: Infinity, 
                        repeatType: "loop",
                        ease: "easeInOut",
                        repeatDelay: 1.0
                      }
                    }}
                    style={{
                      filter: "drop-shadow(0 0 5px rgba(253, 224, 71, 0.5))",
                      textShadow: "0 0 3px rgba(253, 224, 71, 0.5)"
                    }}
                  >
                    It
                  </motion.span>
                </motion.div>
                
                <motion.span
                  className="text-cyan-300 font-bold"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { 
                    opacity: 1,
                    y: [0, -3, 0]
                  } : { opacity: 0 }}
                  transition={{ 
                    opacity: { delay: isInView ? 2.5 : 0, duration: 0.5 },
                    y: {
                      delay: isInView ? 3.0 : 0,
                      duration: 2.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut"
                    },
                    scale: { 
                      duration: 0.6,
                      repeat: Infinity,
                      repeatDelay: 4,
                      repeatType: "loop",
                    }
                  }}
                  style={{
                    textShadow: "0 0 8px rgba(34, 211, 238, 0.7)"
                  }}
                >
                  !
                </motion.span>
              </motion.div>
            </div>
            
            {/* Fabric-style animated overlay */}
            <motion.div
              className="absolute top-0 left-0 w-full h-full -z-5 pointer-events-none overflow-hidden"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 0.3 } : { opacity: 0 }}
              transition={{ delay: isInView ? 2.5 : 0, duration: 1.2 }}
            >
              {/* Background texture */}
              <svg width="100%" height="100%" className="absolute opacity-10">
                <defs>
                  <pattern id="fabric" patternUnits="userSpaceOnUse" width="40" height="40">
                    <path d="M0,20 Q10,17 20,20 T40,20" stroke="white" fill="none" strokeWidth="0.5" />
                    <path d="M0,10 Q10,7 20,10 T40,10" stroke="white" fill="none" strokeWidth="0.5" />
                    <path d="M0,30 Q10,27 20,30 T40,30" stroke="white" fill="none" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <motion.rect
                  width="100%" 
                  height="100%" 
                  fill="url(#fabric)"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { 
                    opacity: 0.5,
                    scale: [1, 1.05, 1]
                  } : { opacity: 0 }}
                  transition={{
                    opacity: { delay: isInView ? 2.5 : 0, duration: 1.5 },
                    scale: { 
                      delay: isInView ? 3.0 : 0,
                      duration: 12,
                      repeat: Infinity, 
                      repeatType: "reverse" 
                    }
                  }}
                />
              </svg>
              
              {/* Floating elements with precomputed values */}
              {floatingElements.map((element, i) => (
                <motion.div
                  key={i}
                  className="absolute bg-indigo-200/10 rounded-full blur-md"
                  style={{
                    width: `${element.width}px`,
                    height: `${element.height}px`,
                    top: `${element.top}%`,
                    left: `${element.left}%`,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { 
                    scale: [0, 1.5, 1],
                    opacity: [0, 0.6, 0.3],
                    x: [0, element.xOffset, 0],
                    y: [0, element.yOffset, 0]
                  } : { scale: 0, opacity: 0 }}
                  transition={{
                    delay: isInView ? (2.5 + i * 0.15) : 0,
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                />
              ))}
              
              {/* Wave effect */}
              <svg className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="none">
                <motion.path
                  d="M0,50 C20,40 40,60 60,50 C80,40 100,60 120,50"
                  stroke="white"
                  strokeWidth="1"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={isInView ? {
                    pathLength: 1,
                    opacity: 0.5,
                    pathOffset: [0, 0.5, 1]
                  } : { pathLength: 0, opacity: 0 }}
                  transition={{
                    pathLength: { delay: isInView ? 2.7 : 0, duration: 1.5 },
                    opacity: { delay: isInView ? 2.7 : 0, duration: 0.8 },
                    pathOffset: { 
                      delay: isInView ? 3.5 : 0,
                      duration: 15,
                      repeat: Infinity, 
                      ease: "linear"
                    }
                  }}
                  style={{
                    strokeDasharray: "5 3",
                    vectorEffect: "non-scaling-stroke"
                  }}
                />
              </svg>
            </motion.div>

            {/* Post-typing blink effect */}
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 bg-green-400"
              initial={{ width: "0%" }}
              animate={isInView ? { 
                width: ["0%", "100%", "0%"],
              } : { width: "0%" }}
              transition={{ 
                duration: 2.5,
                times: [0, 0.7, 1],
                repeat: Infinity,
                repeatDelay: 8,
                repeatType: "loop"
              }}
            />
            
            {/* Code-styled background elements */}
            <motion.div
              className="absolute inset-0 -z-10 bg-indigo-900/30 rounded-md border border-indigo-700"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: isInView ? 0.5 : 0, duration: 0.8 }}
            />
            
            {/* Floating code symbols with fixed values */}
            {isMounted && isInView && [...Array(8)].map((_, i) => {
              const symbols = ["{", "}", "<", ">", "/", "*", "#", "="];
              const char = symbols[i % symbols.length];
              const topPos = (i * 12.5).toFixed(0);
              const leftPos = (i * 12.5).toFixed(0);
              
              return (
                <motion.span
                  key={i}
                  className="absolute text-white text-opacity-20 font-mono pointer-events-none"
                  style={{
                    top: `${topPos}%`,
                    left: `${leftPos}%`,
                    fontSize: `${10 + i}px`,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: [0, 0.7, 0],
                    y: [0, -20],
                    rotate: i * 5 - 20
                  }}
                  transition={{ 
                    opacity: { delay: 3.0 + i * 0.3, duration: 0.4 }, // Slowed down from 2.5
                    y: { 
                      delay: 3.0 + i * 0.3, // Slowed down from 2.5
                      duration: 5, // Slowed down from 3
                      repeat: Infinity,
                      repeatDelay: i * 1.5, // Increased for slower animation
                      repeatType: "loop"
                    },
                    rotate: { 
                      delay: 3.0 + i * 0.3, // Slowed down from 2.5
                      duration: 5, // Slowed down from 3
                      repeat: Infinity,
                      repeatDelay: i * 1.5, // Increased for slower animation
                      repeatType: "loop"
                    }
                  }}
                  viewport={{ once: true }}
                >
                  {char}
                </motion.span>
              );
            })}
          </motion.div>
          
          <motion.p 
            className="text-lg text-white mb-10 max-w-2xl"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {t("ctaSection.description")}
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-5 w-full justify-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Link href={t("ctaSection.joinButtonUrl") as string} className="flex-1 sm:flex-initial">
              <motion.button 
                className="w-full sm:w-auto bg-white text-purple-700 font-bold py-4 px-8 rounded-xl transition duration-300 shadow-lg flex items-center justify-center gap-2"
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: "#FEFEFE",
                  boxShadow: "0 0 20px rgba(255, 255, 255, 0.5)" 
                }}
                whileTap={{ scale: 0.98 }}
              >
                <FaCode className="text-xl" />
                <span>{t("ctaSection.joinButton")}</span>
              </motion.button>
            </Link>
            <Link href={t("ctaSection.contactButtonUrl") as string} className="flex-1 sm:flex-initial">
              <motion.button 
                className="w-full sm:w-auto bg-transparent text-white font-bold py-4 px-8 rounded-xl border-2 border-white transition duration-300 flex items-center justify-center gap-2"
                whileHover={{ 
                  scale: 1.05, 
                  borderColor: "#FEFEFE",
                  boxShadow: "0 0 20px rgba(255, 255, 255, 0.2)" 
                }}
                whileTap={{ scale: 0.98 }}
              >
                <FaLaptopCode className="text-xl" />
                <span>{t("ctaSection.contactButton")}</span>
              </motion.button>
            </Link>
          </motion.div>
          
          <motion.p 
            className="text-white opacity-80 mt-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.8 } : { opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            {t("ctaSection.noCommitment")}
          </motion.p>
        </div>
      </div>
    </motion.section>
  );
};

export default CTASection; 
