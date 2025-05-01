import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FaLightbulb, FaUsers, FaRocket, FaChalkboardTeacher } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

// 定義 metadata 用於 SEO
export const metadata = {
  title: '關於我們 | HackIt - 青少年程式創意社群',
  description: 'HackIt是一個致力於透過編程教育賦能青少年，啟發他們成為未來科技創新者的社群平台。了解我們的使命、願景和創辦故事。',
};

export default function AboutPage() {
  return (
    <main className="relative">
      <Navbar />
      
      {/* 頁面標題區塊 */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-indigo-50 to-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-64 bg-indigo-100 blur-3xl opacity-70 transform rotate-12"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-64 bg-purple-100 blur-3xl opacity-70 transform -rotate-12"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-800">
              關於<span className="text-primary">我們</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              用<span className="text-primary font-semibold">創新思維</span>啟發未來科技人才
            </p>
            <div className="h-1 w-20 bg-primary mx-auto mb-8"></div>
            <p className="text-lg text-gray-600">
              HackIt是一個致力於透過編程教育賦能青少年，啟發他們成為未來科技創新者的社群平台
            </p>
          </div>
        </div>
      </section>
      
      {/* 創辦故事 */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <div className="aspect-w-16 aspect-h-12 relative h-[400px]">
                  <Image
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2940&auto=format&fit=crop"
                    alt="HackIt創辦人團隊"
                    fill
                    style={{ objectFit: "cover" }}
                    className="transition-transform duration-500 hover:scale-105"
                  />
                </div>
                
                {/* 裝飾元素 */}
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-primary/10 rounded-xl -z-10"></div>
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/10 rounded-xl -z-10"></div>
              </div>
              
              {/* 統計數字 */}
              <div className="flex justify-center mt-10 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">25,000+</div>
                  <div className="text-gray-600 mt-1">學生</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">50+</div>
                  <div className="text-gray-600 mt-1">活動</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">3</div>
                  <div className="text-gray-600 mt-1">年歷史</div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <div className="inline-block px-4 py-1 rounded-full text-primary bg-primary/10 text-sm font-medium mb-6">
                我們的起源
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">
                HackIt<span className="text-primary">創辦故事</span>
              </h2>
              
              <div className="prose prose-lg max-w-none text-gray-600">
                <p className="mb-6">
                  HackIt創立於2020年，由一群熱愛科技教育的資深軟體工程師和教育工作者共同發起。在疫情帶來的遠距教學挑戰中，我們看見了數位教育的新機會，也發現傳統教育體系難以滿足現代科技人才的培育需求。
                </p>
                <p className="mb-6">
                  作為第一線的科技從業人員，我們深知實作經驗和創新思維對於未來工作者的重要性。因此，我們決定打造一個結合線上學習、實體工作坊和黑客松競賽的綜合平台，讓青少年能在寓教於樂的環境中接觸真實的科技專案開發。
                </p>
                <p>
                  三年來，HackIt已經服務超過25,000名學生，舉辦了50多場線上及實體活動，並協助多位學員實現了自己的創新項目，甚至獲得國際級競賽的肯定。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* 使命與願景 */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-primary/5 rounded-full transform -translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-indigo-100/50 rounded-full transform translate-x-1/4 translate-y-1/4"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              我們的<span className="text-primary">使命</span>與<span className="text-primary">願景</span>
            </h2>
            <p className="text-lg text-gray-600">
              驅動我們前進的核心理念和遠大目標
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* 使命 */}
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1 duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xl font-bold mr-4">
                  M
                </div>
                <h3 className="text-2xl font-bold text-gray-800">我們的使命</h3>
              </div>
              
              <div className="prose prose-lg text-gray-600">
                <p className="mb-6">
                  我們致力於透過實用且創新的編程教育，啟發年輕人的技術潛能和創造力，培養他們成為未來的數位創新者和問題解決者。
                </p>
                <p>
                  我們相信每個年輕人都應該有機會接觸編程技能，不論其背景或先前經驗。透過我們的平台，我們希望消除科技教育的障礙，讓更多人能夠參與數位未來的建設。
                </p>
              </div>
            </div>
            
            {/* 願景 */}
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1 duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xl font-bold mr-4">
                  V
                </div>
                <h3 className="text-2xl font-bold text-gray-800">我們的願景</h3>
              </div>
              
              <div className="prose prose-lg text-gray-600">
                <p className="mb-6">
                  我們期望打造一個蓬勃發展的科技學習生態系統，在此生態系統中，創新思考被鼓勵，技術技能被賦能，社群合作被重視。
                </p>
                <p>
                  我們希望成為台灣青少年科技教育的領導品牌，透過我們培育的人才，為社會創造正面影響，並協助台灣在全球數位經濟中保持競爭力。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* 核心價值 */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              我們的<span className="text-primary">核心價值</span>
            </h2>
            <p className="text-lg text-gray-600">
              引導我們所有行動和決策的基本原則
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* 創新思維 */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <FaLightbulb className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-center mb-4">創新思維</h3>
              <p className="text-gray-600 text-center">
                鼓勵突破傳統框架，培養解決問題的創造力，讓學習者用不同角度思考問題。
              </p>
            </div>
            
            {/* 社群合作 */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <FaUsers className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-center mb-4">社群合作</h3>
              <p className="text-gray-600 text-center">
                建立互助學習環境，強調團隊協作的重要性，共同成長比單打獨鬥更能取得成功。
              </p>
            </div>
            
            {/* 實踐導向 */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <FaRocket className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-center mb-4">實踐導向</h3>
              <p className="text-gray-600 text-center">
                理論與實作並重，透過真實項目應用所學，打造可展示的作品集加速職涯發展。
              </p>
            </div>
            
            {/* 終身學習 */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <FaChalkboardTeacher className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-center mb-4">終身學習</h3>
              <p className="text-gray-600 text-center">
                培養持續學習的習慣，在科技快速變遷的時代，保持好奇心與學習熱情是最大的競爭力。
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* 團隊成員 */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              認識我們的<span className="text-primary">團隊</span>
            </h2>
            <p className="text-lg text-gray-600">
              一群充滿熱情與專業的教育者和科技人
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 這裡可以加入團隊成員卡片 */}
            {/* 範例 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-64 relative">
                <Image 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop" 
                  alt="團隊成員" 
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">林小明</h3>
                <p className="text-primary mb-3">共同創辦人 / 技術總監</p>
                <p className="text-gray-600 mb-4">資深全端工程師，熱衷於教育科技和培養下一代人才。</p>
                <div className="flex space-x-3">
                  {/* 社群媒體連結 */}
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-64 relative">
                <Image 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop" 
                  alt="團隊成員" 
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">王美玲</h3>
                <p className="text-primary mb-3">共同創辦人 / 教育長</p>
                <p className="text-gray-600 mb-4">前高中資訊教師，擁有10年以上程式教學經驗，專注於教育方法創新。</p>
                <div className="flex space-x-3">
                  {/* 社群媒體連結 */}
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-64 relative">
                <Image 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop" 
                  alt="團隊成員" 
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">張文彥</h3>
                <p className="text-primary mb-3">營運總監</p>
                <p className="text-gray-600 mb-4">具有豐富的社群經營和活動策劃經驗，專注於打造優質學習體驗。</p>
                <div className="flex space-x-3">
                  {/* 社群媒體連結 */}
                </div>
              </div>
            </div>
          </div>
          
          {/* 加入我們CTA */}
          <div className="mt-16 text-center">
            <p className="text-lg text-gray-600 mb-6">
              我們正在尋找志同道合的夥伴一起成長
            </p>
            <Link
              href="/join-team"
              className="inline-block bg-primary hover:bg-primary/90 text-white font-medium py-3 px-8 rounded-lg transition-colors"
            >
              加入我們的團隊
            </Link>
          </div>
        </div>
      </section>
      
      {/* 聯絡我們 */}
      <section className="py-24 bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              讓我們一起創造未來
            </h2>
            <p className="text-xl mb-10 opacity-90">
              有任何問題或合作提案，歡迎隨時與我們聯繫
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-primary hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors"
            >
              聯絡我們
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 