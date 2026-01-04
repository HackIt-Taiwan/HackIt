"use client";

import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { FaCheck, FaTimes, FaAngleDown } from "react-icons/fa";

// FAQ data.
const faqItems = [
  {
    question: "HackIt 的課程難度如何？適合初學者嗎？",
    answer:
      "我們提供不同難度的課程，從完全零基礎的入門班到進階專題開發。無論您是完全沒有程式基礎的初學者，還是想要精進特定領域技能的開發者，都能找到適合的課程。",
  },
  {
    question: "購買方案後，可以隨時取消嗎？",
    answer:
      "是的，您可以隨時取消訂閱。月付方案將在當前計費週期結束後停止續費；年付方案取消後可使用至期限結束，但不予退款。",
  },
  {
    question: "可以先試用再決定是否購買嗎？",
    answer:
      "當然可以！我們提供 7 天的免費試用期，您可以在這段時間內體驗所有功能，之後再決定是否繼續訂閱。",
  },
  {
    question: "企業方案包含哪些客製化內容？",
    answer:
      "企業方案可依據您的需求量身定制，包括專屬內部培訓、企業專屬線上課程、專案實作指導、技術顧問服務等。我們會安排專人與您討論，制定最適合貴公司的方案。",
  },
];

const PricingSection: React.FC = () => {
  const [billingType, setBillingType] = useState<"monthly" | "annual">(
    "monthly"
  );
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  // Toggle FAQ visibility.
  const toggleFaq = (index: number) => {
    setExpandedFaqIndex(expandedFaqIndex === index ? null : index);
  };

  // Motion variants.
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  // Pricing plan data.
  const pricingPlans = [
    {
      name: "基本版",
      monthly: 300,
      annual: 3000,
      description: "適合初學者和個人學習",
      features: [
        "完整線上課程庫",
        "3個專案範例",
        "社群論壇基本訪問權限",
        "每月2次線上Q&A課",
        "電子證書",
      ],
      notIncluded: [
        "專屬導師輔導",
        "實作專案評審",
        "就業媒合服務",
        "企業參訪活動",
      ],
      cta: "開始免費試用",
      popular: false,
    },
    {
      name: "高級版",
      monthly: 800,
      annual: 8000,
      description: "適合需要更深入學習的學生",
      features: [
        "完整線上課程庫",
        "10個專案範例",
        "社群論壇完整訪問權限",
        "無限制線上Q&A課",
        "電子證書",
        "專屬導師輔導（每月2小時）",
        "實作專案評審",
        "作品集建立指導",
      ],
      notIncluded: ["就業媒合服務", "企業參訪活動"],
      cta: "選擇高級版",
      popular: true,
    },
    {
      name: "專業版",
      monthly: 1500,
      annual: 15000,
      description: "適合有職涯規劃需求的學習者",
      features: [
        "完整線上課程庫",
        "無限制專案範例",
        "社群論壇VIP訪問權限",
        "無限制線上Q&A課",
        "紙本和電子證書",
        "專屬導師輔導（每月5小時）",
        "實作專案評審",
        "作品集建立指導",
        "就業媒合服務",
        "企業參訪活動",
      ],
      notIncluded: [],
      cta: "選擇專業版",
      popular: false,
    },
  ];

  return (
    <section id="價格方案" className="py-20 md:py-28 lg:py-32 bg-white">
      <motion.div
        ref={ref}
        className="container mx-auto px-4 md:px-6"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <motion.span
            className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6"
            variants={itemVariants}
          >
            價格方案
          </motion.span>
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            variants={itemVariants}
          >
            選擇適合你的<span className="text-primary">學習方案</span>
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-gray-600"
            variants={itemVariants}
          >
            彈性的定價選項，滿足不同學習需求和預算
          </motion.p>
        </div>

        {/* Toggle buttons */}
        <motion.div
          className="flex justify-center mb-12 md:mb-16"
          variants={itemVariants}
        >
          <div className="bg-gray-100 p-1 rounded-full inline-flex">
            <button
              className={`px-6 py-2 rounded-full text-sm md:text-base font-medium transition ${
                billingType === "monthly"
                  ? "bg-white text-primary shadow-md"
                  : "text-gray-600 hover:text-gray-800"
              }`}
              onClick={() => setBillingType("monthly")}
            >
              月付方案
            </button>
            <button
              className={`px-6 py-2 rounded-full text-sm md:text-base font-medium transition ${
                billingType === "annual"
                  ? "bg-white text-primary shadow-md"
                  : "text-gray-600 hover:text-gray-800"
              }`}
              onClick={() => setBillingType("annual")}
            >
              年付方案
              <span className="ml-1 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                省20%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`rounded-2xl overflow-hidden bg-white border ${
                plan.popular
                  ? "border-primary shadow-xl relative md:scale-105 md:-mt-4 md:mb-4"
                  : "border-gray-200 shadow-md"
              }`}
              variants={itemVariants}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-primary text-white text-center py-1 text-sm font-medium">
                  最受歡迎方案
                </div>
              )}
              <div
                className={`p-6 md:p-8 ${
                  plan.popular ? "pt-9" : "pt-6 md:pt-8"
                }`}
              >
                <h3 className="text-xl md:text-2xl font-bold">{plan.name}</h3>
                <p className="text-gray-600 mt-2 h-12 md:h-14">
                  {plan.description}
                </p>
                <div className="mt-4 md:mt-6">
                  <span className="text-4xl md:text-5xl font-bold">
                    NT${billingType === "monthly" ? plan.monthly : plan.annual}
                  </span>
                  <span className="text-gray-600 ml-1">
                    /{billingType === "monthly" ? "月" : "年"}
                  </span>
                </div>

                <Link
                  href="/signup"
                  className={`mt-6 md:mt-8 block w-full py-3 rounded-lg text-center transition-colors ${
                    plan.popular
                      ? "bg-primary hover:bg-primary-dark text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>

              <div className="bg-gray-50 p-6 md:p-8">
                <h4 className="font-medium mb-4 text-gray-800">包含功能：</h4>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start text-sm md:text-base"
                    >
                      <FaCheck className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.notIncluded.length > 0 && (
                  <>
                    <h4 className="font-medium mb-4 text-gray-800">
                      不包含：
                    </h4>
                    <ul className="space-y-3 text-gray-500">
                      {plan.notIncluded.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start text-sm md:text-base"
                        >
                          <FaTimes className="h-5 w-5 text-red-400 mr-3 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enterprise plan */}
        <motion.div
          className="mt-16 md:mt-20 bg-gray-50 rounded-2xl p-6 md:p-10 max-w-5xl mx-auto"
          variants={itemVariants}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">企業方案</h3>
              <p className="text-gray-600 md:text-lg">
                為您的團隊提供客製化的學習體驗
              </p>
            </div>
            <Link
              href="/contact"
              className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg transition-colors inline-block text-center"
            >
              聯絡我們
            </Link>
          </div>
        </motion.div>

        {/* FAQ section */}
        <motion.div
          className="mt-20 md:mt-28 max-w-3xl mx-auto"
          variants={itemVariants}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center">
            常見問題
          </h3>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden"
                variants={itemVariants}
              >
                <button
                  className="w-full text-left p-5 flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="font-medium">{item.question}</span>
                  <FaAngleDown
                    className={`transform transition-transform ${
                      expandedFaqIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {expandedFaqIndex === index && (
                  <div className="p-5 pt-0 text-gray-600 border-t border-gray-100">
                    {item.answer}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-20 md:mt-28 text-center"
          variants={itemVariants}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            準備好開始您的程式學習之旅了嗎？
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            立即註冊 HackIt，開啟您的程式設計潛能！
          </p>
          <Link
            href="/signup"
            className="inline-block bg-primary hover:bg-primary-dark text-white font-medium py-3 px-8 rounded-full text-base md:text-lg transition-colors shadow-md hover:shadow-lg"
          >
            免費試用 7 天
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default PricingSection; 
