"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const CTASection = () => {
  return (
    <section className="relative py-24 bg-gradient-to-r from-indigo-800 to-purple-900 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
      </div>
      
      <div className="relative container mx-auto px-4">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Ready to Join Our Tech Community?
          </motion.h2>
          
          <motion.p 
            className="text-lg text-purple-100 mb-10 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Be part of a growing network of tech enthusiasts, developers, and innovators. 
            Get access to exclusive events, resources, and connect with like-minded professionals.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 w-full justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link href="/signup" className="flex-1 sm:flex-initial">
              <button className="w-full sm:w-auto bg-white hover:bg-purple-50 text-purple-900 font-bold py-3 px-8 rounded-lg transition duration-300 shadow-lg">
                Sign Up Now
              </button>
            </Link>
            <Link href="/contact" className="flex-1 sm:flex-initial">
              <button className="w-full sm:w-auto bg-transparent hover:bg-purple-800 text-white font-bold py-3 px-8 rounded-lg border-2 border-white transition duration-300">
                Contact Us
              </button>
            </Link>
          </motion.div>
          
          <motion.p 
            className="text-sm text-purple-200 mt-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            No commitment required. Join our community today!
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default CTASection; 