"use client";

import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { FaCheck, FaTimes, FaAngleDown, FaUsers, FaGraduationCap, FaHandsHelping } from "react-icons/fa";

// FAQ 問題和答案
const faqItems = [
  {
    question: "HackIt 的活動難度如何？適合初學者嗎？",
    answer:
      "我們提供不同難度的活動和課程，從完全零基礎的入門活動到進階專題開發。無論您是完全沒有程式基礎的初學者，還是想要精進特定領域技能的開發者，都能找到適合的學習路徑。",
  },
  {
    question: "我如何加入社群？需要付費嗎？",
    answer:
      "加入我們的社群是免費的！您可以透過我們的Discord、GitHub或實體聚會來參與。基礎課程和社群活動大多是免費的，只有少數特別工作坊或專業課程會收取成本費用。",
  },
  {
    question: "可以先參與活動再決定是否深入參與嗎？",
    answer:
      "當然可以！我們鼓勵您先參加我們的開放活動或線上聚會，認識社群成員並了解我們的文化。沒有任何參與義務，您可以按照自己的步調和興趣逐漸融入社群。",
  },
  {
    question: "我可以如何為社群做出貢獻？",
    answer:
      "貢獻方式非常多元！您可以分享知識、協助籌辦活動、擔任志工講師、參與我們的開源專案，或是將您的專業技能用於幫助其他成員。每個人都能以自己的方式為社群增添價值。",
  },
];

const ParticipationSection: React.FC = () => {
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  // 切換FAQ顯示
  const toggleFaq = (index: number) => {
    setExpandedFaqIndex(expandedFaqIndex === index ? null : index);
  };

  // 動畫變體
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

  // 參與方式資料
  const participationOptions = [
    {
      name: "開放學習",
      icon: <FaUsers className="text-4xl text-primary mb-4" />,
      description: "適合所有對編程感興趣的朋友",
      features: [
        "免費線上學習資源庫",
        "社群論壇和Discord頻道",
        "每月開放社群聚會",
        "開源專案參與機會",
        "線上讀書會和分享會",
      ],
      cta: "立即加入社群",
      ctaLink: "/join",
      popular: false,
    },
    {
      name: "主題工作坊",
      icon: <FaGraduationCap className="text-4xl text-primary mb-4" />,
      description: "適合想深入學習特定技術的夥伴",
      features: [
        "專題實作工作坊",
        "小組協作專案",
        "導師指導與回饋",
        "作品集建立指導",
        "結業證書",
        "優先參與黑客松機會",
      ],
      cta: "查看近期工作坊",
      ctaLink: "/workshops",
      popular: true,
    },
    {
      name: "志工貢獻",
      icon: <FaHandsHelping className="text-4xl text-primary mb-4" />,
      description: "適合想回饋社群的有經驗夥伴",
      features: [
        "活動籌辦經驗",
        "分享與教學機會",
        "志工培訓課程",
        "導師計畫參與",
        "社群領導力培養",
        "與業界連結機會",
      ],
      cta: "成為志工",
      ctaLink: "/volunteer",
      popular: false,
    },
  ];

  return (
    <section id="參與方式" className="py-20 md:py-28 lg:py-32 bg-white">
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
            參與方式
          </motion.span>
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            variants={itemVariants}
          >
            加入我們的<span className="text-primary">學習社群</span>
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-gray-600"
            variants={itemVariants}
          >
            我們相信知識應該自由流動，每個人都有機會參與和貢獻
          </motion.p>
        </div>

        {/* 參與方式卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8 max-w-6xl mx-auto">
          {participationOptions.map((option, index) => (
            <motion.div
              key={option.name}
              className={`rounded-2xl overflow-hidden bg-white border ${
                option.popular
                  ? "border-primary shadow-xl relative md:scale-105 md:-mt-4 md:mb-4"
                  : "border-gray-200 shadow-md"
              }`}
              variants={itemVariants}
            >
              {option.popular && (
                <div className="absolute top-0 left-0 right-0 bg-primary text-white text-center py-1 text-sm font-medium">
                  最受歡迎方式
                </div>
              )}
              <div
                className={`p-6 md:p-8 text-center ${
                  option.popular ? "pt-9" : "pt-6 md:pt-8"
                }`}
              >
                {option.icon}
                <h3 className="text-xl md:text-2xl font-bold">{option.name}</h3>
                <p className="text-gray-600 mt-2 mb-6">
                  {option.description}
                </p>

                <Link
                  href={option.ctaLink}
                  className={`mt-6 md:mt-8 block w-full py-3 rounded-lg text-center transition-colors ${
                    option.popular
                      ? "bg-primary hover:bg-primary-dark text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                  }`}
                >
                  {option.cta}
                </Link>
              </div>

              <div className="bg-gray-50 p-6 md:p-8">
                <h4 className="font-medium mb-4 text-gray-800">包含活動：</h4>
                <ul className="space-y-3 mb-6">
                  {option.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start text-sm md:text-base"
                    >
                      <FaCheck className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ 部分 */}
        <motion.div
          className="mt-24 max-w-3xl mx-auto"
          variants={itemVariants}
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">常見問題</h3>
            <p className="text-gray-600">
              對參與有疑問？以下是社群新成員最常問的問題
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <button
                  className="flex justify-between items-center w-full p-4 md:p-6 text-left bg-white hover:bg-gray-50 transition-colors"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="font-medium">{item.question}</span>
                  <motion.div
                    animate={{
                      rotate: expandedFaqIndex === index ? 180 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaAngleDown className="text-gray-500" />
                  </motion.div>
                </button>
                {expandedFaqIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 md:p-6 pt-0 md:pt-0 text-gray-600 border-t border-gray-100"
                  >
                    {item.answer}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 社群理念 */}
        <motion.div
          className="mt-24 bg-gray-50 rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto"
          variants={itemVariants}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            我們相信<span className="text-primary">開放</span>和<span className="text-primary">分享</span>
          </h3>
          <p className="text-gray-600 mb-8">
            HackIt 是一個由熱愛編程和創新的夥伴組成的開放社群。我們沒有嚴格的等級制度，只有共同學習和成長的夥伴關係。無論您的程度如何，都能在這裡找到歸屬感和成長機會。
          </p>
          <Link
            href="/about"
            className="inline-flex items-center text-primary font-medium"
          >
            了解更多我們的理念
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              ></path>
            </svg>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ParticipationSection; 