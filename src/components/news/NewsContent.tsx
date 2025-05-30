"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FaNewspaper, FaArrowLeft, FaExternalLinkAlt } from 'react-icons/fa';
import Link from 'next/link';
import { useI18n } from '@/i18n';

interface NewsContentProps {
  locale: string;
}

export default function NewsContent({ locale }: NewsContentProps) {
  const { t } = useI18n();

  return (
    <section className="pt-32 md:pt-36 lg:pt-40 pb-20 md:pb-28 lg:pb-36 flex items-center">
      <div className="container mx-auto px-4 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <div className="mx-auto w-24 h-24 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mb-8">
            <FaNewspaper className="text-primary text-4xl" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 dark:text-white">
            {t('common.news')}<span className="text-primary">{t('newsPage.temporaryClosed')}</span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            {t('newsPage.temporaryClosedMessage')}
          </p>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
            <div className="flex items-center justify-center mb-4">
              <FaNewspaper className="text-primary text-xl mr-2" />
              <span className="text-gray-600 dark:text-gray-300 font-medium">
                {t('newsPage.checkNotion')}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {t('newsPage.thanksForUnderstanding')}
            </p>
            <a 
              href="https://hackittw.notion.site/1f459188ed5280499052d8d3b813770c" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              <FaExternalLinkAlt className="mr-2" /> {t('newsPage.goToNotion')}
            </a>
          </div>
          
          <Link 
            href={`/${locale}`}
            className="inline-flex items-center bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            <FaArrowLeft className="mr-2" /> {t('newsPage.backToHome')}
          </Link>
        </motion.div>
      </div>
    </section>
  );
} 