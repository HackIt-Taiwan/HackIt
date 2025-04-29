"use client";

import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { FaCheck, FaTimes, FaChevronDown, FaChevronUp } from "react-icons/fa";

type PlanFeature = {
  title: string;
  included: boolean;
};

type PricingPlan = {
  id: string;
  name: string;
  description: string;
  price: number;
  period: string;
  isPopular?: boolean;
  features: PlanFeature[];
  buttonText: string;
  buttonLink: string;
};

const pricingPlans: PricingPlan[] = [
  {
    id: "free",
    name: "免費體驗",
    description: "適合初學者了解程式設計的基礎",
    price: 0,
    period: "永久",
    features: [
      { title: "基礎課程內容", included: true },
      { title: "社區論壇訪問", included: true },
      { title: "線上練習題", included: true },
      { title: "個人學習計劃", included: false },
      { title: "專家指導", included: false },
      { title: "認證證書", included: false },
      { title: "實際專案實踐", included: false },
      { title: "求職輔導", included: false },
    ],
    buttonText: "立即開始",
    buttonLink: "/signup",
  },
  {
    id: "standard",
    name: "標準方案",
    description: "適合積極學習者深入探索程式設計",
    price: 299,
    period: "每月",
    isPopular: true,
    features: [
      { title: "所有免費功能", included: true },
      { title: "進階課程內容", included: true },
      { title: "個人學習計劃", included: true },
      { title: "每週直播課程", included: true },
      { title: "1對1專家指導 (每月2次)", included: true },
      { title: "專業技能認證", included: true },
      { title: "實際專案實踐", included: false },
      { title: "求職輔導", included: false },
    ],
    buttonText: "選擇方案",
    buttonLink: "/signup?plan=standard",
  },
  {
    id: "premium",
    name: "專業方案",
    description: "適合未來程式設計師的完整培訓",
    price: 599,
    period: "每月",
    features: [
      { title: "所有標準功能", included: true },
      { title: "獨家高級課程", included: true },
      { title: "1對1專家指導 (無限制)", included: true },
      { title: "專屬學習顧問", included: true },
      { title: "實際專案實踐", included: true },
      { title: "求職面試準備", included: true },
      { title: "企業合作機會", included: true },
      { title: "終身學習支持", included: true },
    ],
    buttonText: "選擇方案",
    buttonLink: "/signup?plan=premium",
  },
];

type FAQ = {
  question: string;
  answer: string;
};

const faqs: FAQ[] = [
  {
    question: "課程適合沒有編程基礎的人嗎？",
    answer: "完全適合！我們的課程設計從零基礎開始，循序漸進地引導您進入程式設計的世界。免費方案就包含了豐富的入門課程，讓您輕鬆開始學習之旅。",
  },
  {
    question: "我可以隨時更改或取消我的方案嗎？",
    answer: "是的，您可以隨時在帳戶設置中升級、降級或取消您的方案。如果您在月底前取消，您將繼續擁有當月的訪問權限，不會產生額外費用。",
  },
  {
    question: "專家指導是如何進行的？",
    answer: "根據您的方案，您可以透過我們的平台與專業講師預約1對1視訊會議。標準方案每月可預約2次，專業方案則無次數限制。在會議中，您可以針對學習中遇到的困難獲得個人化指導。",
  },
  {
    question: "課程內容多久更新一次？",
    answer: "我們的課程內容根據行業最新發展持續更新。每月至少新增2-3個課程模組，確保學習內容與技術發展同步。",
  },
  {
    question: "如何獲得課程認證？",
    answer: "標準和專業方案的會員完成課程模組並通過相應的評估測試後，即可獲得認證證書。這些證書在您的個人資料中展示，並可分享到LinkedIn等專業社交平台。",
  },
];

const PricingSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState("monthly");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

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

  const getAnnualPrice = (monthlyPrice: number) => {
    const annualPrice = monthlyPrice * 12 * 0.8; // 20% discount
    return annualPrice;
  };

  return (
    <section id="價格方案" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          ref={sectionRef}
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            價格方案
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            選擇適合您的<span className="text-primary">學習方案</span>
          </h2>
          <p className="text-lg text-gray-600">
            我們提供多種靈活的價格方案，滿足不同階段學習者的需求
          </p>

          <div className="mt-8 bg-white rounded-full p-1 inline-flex shadow-sm">
            <button
              onClick={() => setActiveTab("monthly")}
              className={`px-6 py-2 text-sm font-medium rounded-full transition-all ${
                activeTab === "monthly"
                  ? "bg-primary text-white shadow-sm"
                  : "text-gray-600 hover:text-primary"
              }`}
            >
              月繳方案
            </button>
            <button
              onClick={() => setActiveTab("annual")}
              className={`px-6 py-2 text-sm font-medium rounded-full transition-all ${
                activeTab === "annual"
                  ? "bg-primary text-white shadow-sm"
                  : "text-gray-600 hover:text-primary"
              }`}
            >
              年繳方案 (節省20%)
            </button>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {pricingPlans.map((plan) => (
            <motion.div
              key={plan.id}
              className={`relative bg-white rounded-2xl overflow-hidden shadow-lg ${
                plan.isPopular ? "ring-2 ring-primary" : ""
              }`}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              {plan.isPopular && (
                <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  最受歡迎
                </div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-800">{plan.name}</h3>
                <p className="text-gray-600 mt-2 h-12">{plan.description}</p>
                <div className="mt-6 mb-6">
                  <span className="text-4xl font-bold">
                    NT${activeTab === "annual" && plan.price > 0 
                      ? Math.round(getAnnualPrice(plan.price) / 12) 
                      : plan.price}
                  </span>
                  <span className="text-gray-500">
                    /{activeTab === "annual" && plan.price > 0 ? "月 (年繳)" : plan.period}
                  </span>
                  {activeTab === "annual" && plan.price > 0 && (
                    <div className="mt-2 text-sm text-primary font-medium">
                      節省NT${Math.round(plan.price * 12 * 0.2)}（每年）
                    </div>
                  )}
                </div>

                <Link
                  href={plan.buttonLink}
                  className={`block w-full text-center py-3 px-4 rounded-lg font-medium transition-colors ${
                    plan.isPopular
                      ? "bg-primary text-white hover:bg-primary-dark"
                      : "bg-gray-100 text-primary hover:bg-gray-200"
                  }`}
                >
                  {plan.buttonText}
                </Link>
              </div>

              <div className="border-t border-gray-100 bg-gray-50 p-8">
                <h4 className="font-medium text-gray-800 mb-4">包含功能：</h4>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start text-sm text-gray-600"
                    >
                      {feature.included ? (
                        <FaCheck className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      ) : (
                        <FaTimes className="text-gray-300 mt-0.5 mr-2 flex-shrink-0" />
                      )}
                      <span
                        className={
                          feature.included ? "text-gray-700" : "text-gray-400"
                        }
                      >
                        {feature.title}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <motion.h3
            className="text-2xl font-bold text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            常見問題
          </motion.h3>
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="flex justify-between items-center w-full p-4 text-left font-medium text-gray-800 hover:text-primary focus:outline-none"
                >
                  <span>{faq.question}</span>
                  {expandedFaq === index ? (
                    <FaChevronUp className="text-primary" />
                  ) : (
                    <FaChevronDown className="text-gray-400" />
                  )}
                </button>
                <div
                  className={`px-4 pb-4 text-gray-600 transition-all duration-300 ${
                    expandedFaq === index ? "block" : "hidden"
                  }`}
                >
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-gray-600 mb-6">
            還有其他問題？我們很樂意為您解答
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white hover:bg-gray-50 text-primary font-medium py-3 px-6 rounded-lg shadow-sm transition-colors"
          >
            聯絡我們
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection; 