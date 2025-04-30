"use client";

import React from 'react';
import { motion } from 'framer-motion';

type AnimationType = 'fadeIn' | 'slideUp' | 'scale';

interface AnimatedSectionProps {
  children: React.ReactNode;
  animation?: AnimationType;
  className?: string;
}

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
          transition: { duration: 0.8 }
        };
      case 'scale':
        return {
          initial: { opacity: 0, scale: 0.95 },
          whileInView: { opacity: 1, scale: 1 },
          transition: { duration: 0.8 }
        };
      case 'fadeIn':
      default:
        return {
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
          transition: { duration: 0.8 }
        };
    }
  };

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