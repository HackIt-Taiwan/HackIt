"use client";

import React from 'react';
import { motion } from 'framer-motion';

const AnimatedConnector: React.FC = () => {
  return (
    <div className="relative h-40 overflow-hidden">
      <motion.div 
        className="absolute inset-x-0 h-40"
        initial={{ backgroundPositionX: '0%' }}
        animate={{ backgroundPositionX: '100%' }}
        transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
        style={{
          backgroundImage: 'linear-gradient(45deg, rgba(236, 55, 80, 0.1) 25%, transparent 25%, transparent 50%, rgba(236, 55, 80, 0.1) 50%, rgba(236, 55, 80, 0.1) 75%, transparent 75%, transparent)',
          backgroundSize: '40px 40px',
        }}
      />
      
      <motion.div 
        className="absolute left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center"
        animate={{ 
          y: [0, -10, 0],
          scale: [1, 1.05, 1],
          boxShadow: [
            '0 0 0 rgba(255, 140, 55, 0.4)',
            '0 0 20px rgba(255, 140, 55, 0.6)',
            '0 0 0 rgba(255, 140, 55, 0.4)'
          ]
        }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      >
        <div className="w-10 h-10 rounded-full bg-accent/30 flex items-center justify-center">
          <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center" />
        </div>
      </motion.div>
      
      {/* Add some floating elements for more visual interest */}
      <motion.div
        className="absolute w-4 h-4 rounded-full bg-primary/20"
        style={{ left: '20%', top: '30%' }}
        animate={{ 
          y: [0, -15, 0],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      />
      
      <motion.div
        className="absolute w-6 h-6 rounded-full bg-secondary/20"
        style={{ right: '25%', bottom: '25%' }}
        animate={{ 
          y: [0, -10, 0],
          opacity: [0.6, 0.9, 0.6]
        }}
        transition={{ repeat: Infinity, duration: 3, delay: 1, ease: "easeInOut" }}
      />
      
      <motion.div
        className="absolute w-3 h-3 rounded-full bg-accent/30"
        style={{ right: '35%', top: '40%' }}
        animate={{ 
          y: [0, -8, 0],
          opacity: [0.4, 0.7, 0.4]
        }}
        transition={{ repeat: Infinity, duration: 2.5, delay: 0.5, ease: "easeInOut" }}
      />
    </div>
  );
};

export default AnimatedConnector; 