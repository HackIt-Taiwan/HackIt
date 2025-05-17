"use client";

import dynamic from 'next/dynamic';
import React from 'react';

// 動態載入 TechAnimation，並禁用 SSR
const TechAnimation = dynamic(() => import('@/components/TechAnimation'), {
  ssr: false,
  loading: () => <div className="w-full h-full min-h-[300px] bg-gray-200 dark:bg-gray-700 animate-pulse" />
});

const DynamicTechAnimation = () => {
  return <TechAnimation />;
};

export default DynamicTechAnimation; 