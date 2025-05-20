"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaQuestionCircle, FaGithub, FaClock, FaPlane, FaHome, FaPassport } from 'react-icons/fa';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

interface FAQItemProps {
  question: string;
  answer: React.ReactNode;
  isOpen: boolean;
  toggleOpen: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, toggleOpen }) => {
  return (
    <motion.div 
      className="border-b border-gray-200 dark:border-gray-700 last:border-b-0"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <button
        onClick={toggleOpen}
        className="flex justify-between items-center w-full py-4 text-left font-medium text-gray-800 dark:text-gray-100 hover:text-primary focus:outline-none"
      >
        <span>{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaChevronDown className="text-primary" />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-4 pr-4 text-gray-600 dark:text-gray-300 prose prose-sm max-w-none">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

interface FAQCategoryProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const FAQCategory: React.FC<FAQCategoryProps> = ({ title, icon, children }) => {
  return (
    <motion.div 
      className="mb-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4">
          {icon}
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{title}</h2>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        {children}
      </div>
    </motion.div>
  );
};

export default function FAQPage() {
  // State to track which FAQ items are open
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const sectionRefs: Record<string, React.RefObject<HTMLDivElement>> = {
    projects: useRef(null),
    hours: useRef(null),
    logistics: useRef(null),
    visa: useRef(null)
  };
  
  // Toggle function for FAQ items
  const toggleItem = (categoryKey: string, index: number) => {
    setOpenItems(prev => {
      const key = `${categoryKey}-${index}`;
      return { ...prev, [key]: !prev[key] };
    });
  };
  
  // Function to check if an item is open
  const isItemOpen = (categoryKey: string, index: number) => {
    const key = `${categoryKey}-${index}`;
    return openItems[key] || false;
  };
  
  // FAQ Data organized by categories
  const faqData = {
    projects: [
      {
        question: "What projects qualify?",
        answer: (
          <>
            <p>Your project should be something you're genuinely passionate about. It needs to be a new project, not a continuation of existing work.</p>
          </>
        )
      },
      {
        question: "Can one project be spread across multiple GitHub repos?",
        answer: (
          <>
            <p>Yes, if it logically makes sense to do so!</p>
          </>
        )
      },
      {
        question: "Do private repos work?",
        answer: (
          <>
            <p>No, all projects must be open source.</p>
          </>
        )
      },
      {
        question: "Does it have to be one project or can it be multiple over 100 hours?",
        answer: (
          <>
            <p>One project before you come, but you do not need to continue that same project when you move to San Francisco (although you are welcome to).</p>
          </>
        )
      },
      {
        question: "Can we continue to work on an existing project as long as we spend an additional 100 hours on it?",
        answer: (
          <>
            <p>No, it must be a new project.</p>
          </>
        )
      },
      {
        question: "For those 100 hours, can we work on other Hack Club events?",
        answer: (
          <>
            <p>No, they must be for Neighborhood specifically. You cannot double-count your hours. However, you're welcome to do both events if you do the sum of the hours in total (e.g., Neighborhood + Shipwrecked for 160h total).</p>
          </>
        )
      },
      {
        question: "If we had a passion project assignment for computer science class, could we work on that as our app?",
        answer: (
          <>
            <p>Yes, as long as you're genuinely passionate about your project!</p>
          </>
        )
      },
      {
        question: "Can you work in a team?",
        answer: (
          <>
            <p>You're welcome to work in team! Each individual person must hit 100 hours for them to go to SF.</p>
          </>
        )
      },
      {
        question: "Can I start working on my project before the kick-off call?",
        answer: (
          <>
            <p>Yes, you can start now!</p>
          </>
        )
      },
      {
        question: "How do I log my time?",
        answer: (
          <>
            <p>Add it to the canvas at <a href="https://hackatime.hackclub.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://hackatime.hackclub.com</a> and log it into the Neighborhood app! It only logs time when you're actively coding or using Figma.</p>
          </>
        )
      },
      {
        question: "Is there any web based time tracker for neighborhood?",
        answer: (
          <>
            <p>There's Hackatime and Stopwatch. Right now only Hackatime is open for use, we'll release Stopwatch soon for limited use (20hr cap out of the 100hours). Stopwatch will be used for cases where Hackatime isn't suitable like some design work for the project in a tool like Figma.</p>
          </>
        )
      }
    ],
    hours: [
      {
        question: "Is the 40hrs/wk strict?",
        answer: (
          <>
            <p>Yes, it's a strict requirement but you can do weekends too. It's also not set timing, like 9am-5pm daily. You just need to code on your personal projects for at least 40 hours each week.</p>
          </>
        )
      },
      {
        question: "Can I do less hours if I don't need a flight stipend?",
        answer: (
          <>
            <p>No, it's 100 hours in order to come regardless of if flight stipend is needed.</p>
          </>
        )
      },
      {
        question: "Do the 100 hours have to be done by the end of May?",
        answer: (
          <>
            <p>100 hours are before you arrive in San Francisco, so for folks starting in early June, they'd need to have 100 hours in by end of May. For those looking to come later in June, they'd have some more time.</p>
          </>
        )
      },
      {
        question: "Would there be any alternate prizes for the people who can't go?",
        answer: (
          <>
            <p>There are no prize alternatives, but we would love to have you build along side everyone else!</p>
          </>
        )
      },
      {
        question: "Do I have to stay all 3 months?",
        answer: (
          <>
            <p>No you don't! It is not required that you stay for the entire 3 months.</p>
          </>
        )
      },
      {
        question: "What if you go to San Francisco and decide not to work 40 hours as expected?",
        answer: (
          <>
            <p>Then you go home.</p>
          </>
        )
      }
    ],
    logistics: [
      {
        question: "What is the dollar value for the stipend for living expenses, and will insurance/transport be covered?",
        answer: (
          <>
            <p>Coming to Neighborhood includes housing with Hack Clubber housemates, food (groceries - you need to cook), in-city transit, and a flight stipend. Transit is free for age 18 and under in SF (bus and trains).</p>
          </>
        )
      },
      {
        question: "Will there be anyone from HQ staying with us?",
        answer: (
          <>
            <p>No - they'll have their own separate housing.</p>
          </>
        )
      },
      {
        question: "Do you have to specify how long you stay when you go there, or can you return anytime?",
        answer: (
          <>
            <p>You will be able to commit to some period of time (perhaps two weeks) and decide every two weeks rather you are going to stay or book your return flight.</p>
          </>
        )
      },
      {
        question: "Could I come and go twice over the summer?",
        answer: (
          <>
            <p>Travel stipend is only for 1 round-trip SF. You can come and leave at your own cost, but you will need to maintain 40 hrs/week coding.</p>
          </>
        )
      },
      {
        question: "How do I join the Kickoff call?",
        answer: (
          <>
            <p>You can signup on the site and a link should also be posted in this channel on May 9th!</p>
          </>
        )
      },
      {
        question: "Do we cook our own food?",
        answer: (
          <>
            <p>Yes, you have weekly groceries - anything beyond that is paid for by you!</p>
          </>
        )
      },
      {
        question: "Is transporting my desktop for dev covered?",
        answer: (
          <>
            <p>It would probably be your responsibility unless your flight stipend is under the amount. Amount is going to announced May 9th at the Kickoff call.</p>
          </>
        )
      }
    ],
    visa: [
      {
        question: "What do I need to know about visa support?",
        answer: (
          <>
            <p>To be eligible to receive an official invitation letter that can support your visa application, you must first complete at least 50 hours of coding/project work. Reaching this milestone significantly increases your chances of visa approval and helps expedite the application process.</p>
          </>
        )
      },
      {
        question: "Can we get an educational visa for this?",
        answer: (
          <>
            <p>Unfortunately this program is not suitable for educational visas such as J1 etc. You need to get a B1/B2 Visa.</p>
          </>
        )
      },
      {
        question: "Can we leave SF to go to Shipwrecked and come back?",
        answer: (
          <>
            <p>Yes! However you need to measure the hours of these two programmes separately aka 100 hours for Neighborhood + minimum of 60 hours for Shipwrecked.</p>
          </>
        )
      },
      {
        question: "Will we get money back on the visa? It's expensive.",
        answer: (
          <>
            <p>If the visa cost falls within the participant's allocated stipend amount, the program may be able to reimburse it. However, obtaining the visa remains the participant's own responsibility.</p>
          </>
        )
      }
    ]
  };

  // Scroll to section function
  const scrollToSection = (sectionKey: string) => {
    sectionRefs[sectionKey].current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="relative">
      <Navbar />
      
      {/* Hero Section */}
      <motion.section 
        className="pt-32 pb-16 bg-gradient-to-b from-indigo-50 to-white dark:from-gray-800 dark:to-gray-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 dark:text-gray-100"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              常見問題 <span className="text-primary">FAQ</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-300 mb-12"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              關於 Neighborhood 活動的常見問題與解答
            </motion.p>
            
            {/* Category quick links */}
            <motion.div 
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.button 
                className="px-6 py-3 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('projects')}
              >
                <FaGithub className="text-primary" />
                <span>專案相關</span>
              </motion.button>
              <motion.button 
                className="px-6 py-3 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('hours')}
              >
                <FaClock className="text-primary" />
                <span>小時數和補助</span>
              </motion.button>
              <motion.button 
                className="px-6 py-3 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('logistics')}
              >
                <FaHome className="text-primary" />
                <span>住宿物流</span>
              </motion.button>
              <motion.button 
                className="px-6 py-3 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('visa')}
              >
                <FaPassport className="text-primary" />
                <span>簽證與護照</span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
      
      {/* FAQ Content Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Note about replies */}
          <motion.div 
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-600 dark:text-gray-300">
              <strong>注意：</strong> 如果回覆沒有標記來源 (Source)，則表示組織者已直接回覆該問題！
            </p>
          </motion.div>
          
          {/* Projects Questions */}
          <div ref={sectionRefs.projects}>
            <FAQCategory title="專案相關" icon={<FaGithub size={24} />}>
              {faqData.projects.map((item, index) => (
                <FAQItem 
                  key={`projects-${index}`}
                  question={item.question}
                  answer={item.answer}
                  isOpen={isItemOpen('projects', index)}
                  toggleOpen={() => toggleItem('projects', index)}
                />
              ))}
            </FAQCategory>
          </div>
          
          {/* Hours and Stipends */}
          <div ref={sectionRefs.hours}>
            <FAQCategory title="小時數和補助" icon={<FaClock size={24} />}>
              {faqData.hours.map((item, index) => (
                <FAQItem 
                  key={`hours-${index}`}
                  question={item.question}
                  answer={item.answer}
                  isOpen={isItemOpen('hours', index)}
                  toggleOpen={() => toggleItem('hours', index)}
                />
              ))}
            </FAQCategory>
          </div>
          
          {/* Logistics */}
          <div ref={sectionRefs.logistics}>
            <FAQCategory title="住宿物流" icon={<FaHome size={24} />}>
              {faqData.logistics.map((item, index) => (
                <FAQItem 
                  key={`logistics-${index}`}
                  question={item.question}
                  answer={item.answer}
                  isOpen={isItemOpen('logistics', index)}
                  toggleOpen={() => toggleItem('logistics', index)}
                />
              ))}
            </FAQCategory>
          </div>
          
          {/* Visa & Passport */}
          <div ref={sectionRefs.visa}>
            <FAQCategory title="簽證與護照" icon={<FaPassport size={24} />}>
              {faqData.visa.map((item, index) => (
                <FAQItem 
                  key={`visa-${index}`}
                  question={item.question}
                  answer={item.answer}
                  isOpen={isItemOpen('visa', index)}
                  toggleOpen={() => toggleItem('visa', index)}
                />
              ))}
            </FAQCategory>
          </div>
          
          {/* Contact for more questions */}
          <motion.div 
            className="bg-primary/10 p-8 rounded-xl mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">還有其他問題嗎？</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">如果您有其他問題，歡迎聯繫我們</p>
            <Link href="/contact">
              <motion.button 
                className="bg-primary text-white px-8 py-3 rounded-lg font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                聯絡我們
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 