"use client";

import React from 'react';
import { motion } from 'framer-motion';

type AnimationType = 'fadeIn' | 'slideUp' | 'scale' | 'creative' | 'staggered' | 'excitingEvents' | 'getReady' | 'bouncy' | 'elastic' | 'playful';

interface AnimatedSectionProps {
  children: React.ReactNode;
  animation?: AnimationType;
  className?: string;
}

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ 
  children, 
  animation = 'fadeIn',
  className = '' 
}) => {
  const getAnimationProps = () => {
    switch (animation) {
      case 'slideUp':
        return {
          initial: { opacity: 0, y: 50 },
          whileInView: { opacity: 1, y: 0 },
          transition: { 
            type: "spring", 
            stiffness: 80, 
            damping: 15
          }
        };
      case 'scale':
        return {
          initial: { opacity: 0, scale: 0.92 },
          whileInView: { opacity: 1, scale: 1 },
          transition: { 
            type: "spring", 
            stiffness: 100, 
            damping: 15, 
            mass: 1.2
          }
        };
      case 'excitingEvents':
        return {
          initial: { 
            opacity: 0, 
            x: -80, 
            filter: 'blur(10px)',
            skewX: '10deg'
          },
          whileInView: { 
            opacity: 1, 
            x: 0, 
            filter: 'blur(0px)',
            skewX: '0deg',
            transition: {
              type: 'spring',
              stiffness: 80,
              damping: 11,
              mass: 1.2,
              velocity: 2
            }
          }
        };
      case 'getReady':
        return {
          initial: { 
            opacity: 0, 
            scale: 0.85,
            rotateY: 35,
            transformPerspective: 1000,
            transformOrigin: "center"
          },
          whileInView: { 
            opacity: 1, 
            scale: 1,
            rotateY: 0,
            transition: {
              type: 'spring',
              stiffness: 70,
              damping: 8, 
              mass: 1.3,
              when: "beforeChildren",
              staggerChildren: 0.1
            }
          },
          viewport: { once: true, margin: "-20%" }
        };
      case 'bouncy':
        return {
          initial: { 
            y: 100,
            opacity: 0,
            scale: 0.5,
            rotateZ: -5
          },
          whileInView: { 
            y: 0,
            opacity: 1,
            scale: 1,
            rotateZ: 0,
            transition: {
              type: "spring",
              bounce: 0.6,
              duration: 1.2,
              when: "beforeChildren",
              staggerChildren: 0.1
            }
          }
        };
      case 'elastic':
        return {
          initial: { 
            scaleX: 0.7, 
            scaleY: 1.3, 
            opacity: 0,
            y: 50
          },
          whileInView: { 
            scaleX: 1, 
            scaleY: 1, 
            opacity: 1,
            y: 0,
            transition: {
              scaleX: { 
                type: "spring", 
                stiffness: 150, 
                damping: 15, 
                duration: 0.8,
                ease: [0.34, 1.56, 0.64, 1]
              },
              scaleY: { 
                type: "spring", 
                stiffness: 140, 
                damping: 12, 
                duration: 0.8,
                ease: [0.34, 1.56, 0.64, 1]
              },
              opacity: { duration: 0.6 },
              y: { 
                type: "spring", 
                stiffness: 100, 
                damping: 15 
              }
            }
          }
        };
      case 'playful':
        return {
          initial: { 
            opacity: 0,
            y: 30,
            scale: 0.9,
            rotate: -2,
            filter: 'blur(5px)'
          },
          whileInView: { 
            opacity: 1, 
            y: 0,
            scale: 1,
            rotate: 0,
            filter: 'blur(0px)',
            transition: { 
              y: {
                type: "spring",
                stiffness: 400,
                damping: 25,
                mass: 1.5
              },
              opacity: { duration: 0.6, ease: "easeOut" },
              rotate: {
                type: "spring",
                stiffness: 300,
                damping: 20
              },
              filter: { duration: 0.6 }
            }
          },
          whileHover: {
            y: -5,
            transition: { duration: 0.3, ease: "easeOut" }
          }
        };
      case 'creative':
        return {
          initial: { 
            opacity: 0,
            scale: 0.9,
            y: 30,
            rotateZ: -3,
            filter: 'saturate(0%)'
          },
          whileInView: { 
            opacity: 1, 
            scale: 1,
            y: 0,
            rotateZ: 0,
            filter: 'saturate(100%)',
            transition: { 
              duration: 0.8,
              ease: [0.21, 1.03, 0.32, 1],
              when: "beforeChildren",
              staggerChildren: 0.05
            }
          }
        };
      case 'staggered':
        return {
          initial: { opacity: 0 },
          whileInView: { 
            opacity: 1,
            transition: { 
              staggerChildren: 0.08,
              delayChildren: 0.1,
              duration: 0.5
            }
          },
          viewport: { once: true, margin: "-15%" }
        };
      case 'fadeIn':
      default:
        return {
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
          transition: { 
            duration: 0.8,
            ease: "easeOut"
          }
        };
    }
  };

  if (animation === 'staggered') {
    return (
      <motion.div
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {React.Children.map(children, (child, index) => (
          <motion.div key={index} variants={childVariants}>
            {child}
          </motion.div>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      {...getAnimationProps()}
      viewport={{ once: true, margin: "-100px" }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection; 