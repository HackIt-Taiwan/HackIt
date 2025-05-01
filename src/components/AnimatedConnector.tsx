"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AnimatedConnectorProps {
  variant?: 'default' | 'eventsToCta';
}

const AnimatedConnector: React.FC<AnimatedConnectorProps> = ({ variant = 'default' }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (variant === 'eventsToCta') {
    return (
      <div className="relative h-80 overflow-hidden">
        {/* Background gradient effect */}
        <motion.div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at center, rgba(238, 238, 238, 0.4) 0%, rgba(250, 250, 250, 0) 70%)',
            filter: 'blur(5px)'
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            repeat: Infinity,
            duration: 8,
            ease: "easeInOut",
          }}
        />

        {/* Grid pattern background */}
        <div className="absolute inset-0 z-0">
          <svg className="w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg" version="1.1">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0, 0, 0, 0.3)" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Dot pattern overlay */}
        <div className="absolute inset-0 z-0 opacity-30">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" version="1.1">
            <defs>
              <pattern id="dotPattern" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="1" fill="rgba(236, 55, 80, 0.5)" />
              </pattern>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#dotPattern)" />
          </svg>
        </div>
        
        {/* Animated flowing paths */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 320" preserveAspectRatio="none">
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(236, 55, 80, 0.7)" />
              <stop offset="100%" stopColor="rgba(255, 140, 55, 0.7)" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(51, 214, 166, 0.7)" />
              <stop offset="100%" stopColor="rgba(236, 55, 80, 0.7)" />
            </linearGradient>
            
            <filter id="glow">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            
            <filter id="distort">
              <feTurbulence 
                type="turbulence" 
                baseFrequency="0.01"
                numOctaves="3" 
                result="turbulence" 
                seed="3"
              >
                <animate 
                  attributeName="baseFrequency" 
                  dur="60s" 
                  values="0.01;0.02;0.01" 
                  repeatCount="indefinite" 
                />
              </feTurbulence>
              <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="20" />
            </filter>
          </defs>
          
          <motion.path
            d="M0,160 C250,220 400,80 500,160 C600,240 750,100 1000,160"
            stroke="url(#gradient1)"
            strokeWidth="3"
            fill="none"
            filter="url(#glow)"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          
          <motion.path
            d="M0,160 C150,100 350,240 500,160 C650,80 850,200 1000,160"
            stroke="url(#gradient2)"
            strokeWidth="3"
            fill="none"
            filter="url(#glow)"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }}
          />
        </svg>
        
        {/* Liquid blobs */}
        <motion.div
          className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 opacity-10 rounded-full"
          style={{ 
            background: 'radial-gradient(circle, rgba(236, 55, 80, 0.8) 0%, rgba(236, 55, 80, 0) 70%)',
            filter: 'blur(20px)'
          }}
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 8,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute top-1/3 right-1/3 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 opacity-10 rounded-full"
          style={{ 
            background: 'radial-gradient(circle, rgba(51, 214, 166, 0.8) 0%, rgba(51, 214, 166, 0) 70%)',
            filter: 'blur(20px)'
          }}
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, -30, 0],
            y: [0, 15, 0],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 10,
            ease: "easeInOut"
          }}
        />
        
        {/* Animated particles */}
        {isClient && (
          <div className="absolute inset-0">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-5 h-5 rounded-full"
                style={{
                  background: i % 2 === 0 
                    ? 'radial-gradient(circle, rgba(236, 55, 80, 1) 0%, rgba(236, 55, 80, 0.3) 70%)' 
                    : 'radial-gradient(circle, rgba(51, 214, 166, 1) 0%, rgba(51, 214, 166, 0.3) 70%)',
                  boxShadow: i % 2 === 0 
                    ? '0 0 15px rgba(236, 55, 80, 0.6)' 
                    : '0 0 15px rgba(51, 214, 166, 0.6)',
                  top: '45%',
                  left: `${5 + (i * 11)}%`,
                }}
                animate={{
                  top: [
                    '45%',
                    `${35 + Math.sin((i * 0.7) + 1) * 15}%`,
                    '45%',
                    `${55 + Math.sin((i * 0.7) + 1) * 15}%`,
                    '45%'
                  ],
                  left: [`${5 + (i * 11)}%`, `${18 + (i * 9)}%`, `${50}%`, `${75 - (i * 6)}%`, `${95}%`],
                  scale: [0.8, 1.2, 1.5, 0.9, 0],
                  opacity: [0, 0.8, 1, 0.6, 0],
                  filter: [
                    'blur(2px)',
                    'blur(0px)',
                    'blur(0px)',
                    'blur(1px)',
                    'blur(3px)'
                  ]
                }}
                transition={{
                  duration: 5,
                  ease: "easeInOut",
                  delay: i * 0.2,
                  repeat: Infinity,
                  repeatDelay: Math.random() * 0.5
                }}
              />
            ))}
          </div>
        )}
        
        {/* Interactive floating text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="font-mono text-sm bg-dark/95 text-white px-4 py-2 rounded-lg border border-primary/30"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8, type: "spring", stiffness: 100, damping: 10 }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 0 20px rgba(236, 55, 80, 0.4)',
              transition: { duration: 0.2 } 
            }}
          >
            <span className="text-accent font-medium">function</span> <span className="text-secondary font-medium">unleashCreativity</span>() {'{ /* 你的創意在這裡 */ }'}
          </motion.div>
        </div>
        
        {/* Floating elements with mouse interaction */}
        {isClient && (
          <>
            <motion.div
              className="absolute w-16 h-16 opacity-60 pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(236, 55, 80, 0.8) 0%, rgba(236, 55, 80, 0) 80%)',
                filter: 'blur(8px)',
                x: mousePosition.x * 0.02,
                y: mousePosition.y * 0.02
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ repeat: Infinity, duration: 3 }}
            />
            
            <motion.div
              className="absolute top-1/4 left-1/4 w-10 h-10 border-2 border-primary/40 rounded-md opacity-80"
              style={{
                x: mousePosition.x * -0.01,
                y: mousePosition.y * -0.01
              }}
              animate={{
                rotate: [0, 45, 0, -45, 0],
                scale: [1, 1.1, 1],
                opacity: [0.6, 0.8, 0.6]
              }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            />
            
            <motion.div
              className="absolute bottom-1/3 right-1/3 w-16 h-16 border-2 border-secondary/30 rounded-full opacity-70"
              style={{
                x: mousePosition.x * 0.015,
                y: mousePosition.y * 0.015
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.6, 0.4]
              }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            />
          </>
        )}
        
        {/* Orbiting elements */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40">
          <motion.div
            className="absolute w-6 h-6 flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            style={{ transformOrigin: 'center center' }}
          >
            <motion.div
              className="w-2 h-2 bg-accent rounded-full"
              style={{ 
                boxShadow: '0 0 10px rgba(255, 140, 55, 0.8)',
                left: 90, 
                top: 0 
              }}
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </motion.div>
          
          <motion.div
            className="absolute w-6 h-6 flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 15, ease: "linear", direction: "reverse" }}
            style={{ transformOrigin: 'center center' }}
          >
            <motion.div
              className="w-3 h-3 bg-primary rounded-full"
              style={{ 
                boxShadow: '0 0 10px rgba(236, 55, 80, 0.8)',
                left: 110, 
                top: 0 
              }}
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          </motion.div>
          
          <motion.div
            className="absolute w-6 h-6 flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            style={{ transformOrigin: 'center center' }}
          >
            <motion.div
              className="w-2.5 h-2.5 bg-secondary rounded-full"
              style={{ 
                boxShadow: '0 0 12px rgba(51, 214, 166, 0.8)',
                left: 130, 
                top: 0 
              }}
              animate={{ scale: [1, 1.6, 1] }}
              transition={{ repeat: Infinity, duration: 3 }}
            />
          </motion.div>
        </div>
      </div>
    );
  }
  
  // Default connector with enhanced animations
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