import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { BlindBox } from './components/BlindBox';
import { PrizeReveal } from './components/PrizeReveal';
import { Gallery } from './components/Gallery';
import { UserCenter } from './components/UserCenter';
import { ProductDetail } from './components/ProductDetail';
import { PRIZES } from './constants';
import { generateTeaFortune } from './services/geminiService';
import { Prize, FortuneResult, HistoryItem } from './types';
import { Wind, MapPin, Instagram, User, Menu } from 'lucide-react';

const App: React.FC = () => {
  const [isOpening, setIsOpening] = useState(false);
  const [revealedPrize, setRevealedPrize] = useState<Prize | null>(null);
  const [fortune, setFortune] = useState<FortuneResult | null>(null);
  
  // User History State
  const [userHistory, setUserHistory] = useState<HistoryItem[]>([]);
  const [isUserCenterOpen, setIsUserCenterOpen] = useState(false);

  // Product Detail State
  const [viewingProduct, setViewingProduct] = useState<Prize | null>(null);

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('puer_cafe_history');
    if (savedHistory) {
      try {
        setUserHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  const handleOpenBox = async () => {
    if (isOpening) return;
    setIsOpening(true);
    
    // 1. Randomly select a prize
    const randomIndex = Math.floor(Math.random() * PRIZES.length);
    const selectedPrize = PRIZES[randomIndex];

    // 2. Start generating fortune in background while animation plays
    const fortunePromise = generateTeaFortune(selectedPrize);

    // 3. Wait for animation "drama" (e.g., 2.5 seconds)
    await new Promise(resolve => setTimeout(resolve, 2500));

    // 4. Wait for fortune if it hasn't finished yet
    const generatedFortune = await fortunePromise;

    setRevealedPrize(selectedPrize);
    setFortune(generatedFortune);
    
    // 5. Save to History
    const newHistoryItem: HistoryItem = {
        id: Date.now().toString(),
        prizeId: selectedPrize.id,
        prizeName: selectedPrize.name,
        prizeImage: selectedPrize.imageUrl,
        fortune: generatedFortune.fortune,
        luckyElement: generatedFortune.luckyElement,
        timestamp: Date.now()
    };

    const updatedHistory = [...userHistory, newHistoryItem];
    setUserHistory(updatedHistory);
    localStorage.setItem('puer_cafe_history', JSON.stringify(updatedHistory));

    setIsOpening(false);
  };

  const handleCloseModal = () => {
    setRevealedPrize(null);
    setFortune(null);
  };

  return (
    <div className="min-h-screen bg-paper-texture text-stone-800 overflow-x-hidden flex flex-col">
      {/* Header */}
      <header className="w-full py-6 px-4 md:px-8 flex justify-between items-center border-b border-stone-200/50 bg-[#fdfbf7]/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <div className="w-10 h-10 bg-[#8b3a3a] rounded-lg flex items-center justify-center text-white font-serif font-bold text-xl shadow-md">
            普
          </div>
          <h1 className="text-xl font-serif tracking-widest font-bold text-[#2c2c2c]">普洱茶咖</h1>
        </div>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-serif uppercase tracking-widest text-stone-500">
          <a href="#" className="hover:text-[#8b3a3a] transition-colors">溯源</a>
          <a href="#" className="hover:text-[#8b3a3a] transition-colors">菜单</a>
          <a href="#" className="hover:text-[#8b3a3a] transition-colors font-bold text-[#8b3a3a]">盲盒</a>
          <button 
            onClick={() => setIsUserCenterOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#2c2c2c] text-[#fdfbf7] rounded-full hover:bg-[#8b3a3a] transition-all"
          >
            <User size={16} />
            <span>我的茶室</span>
          </button>
        </nav>

        {/* Mobile Nav Toggle / User Icon */}
        <div className="md:hidden flex items-center gap-4">
            <button 
                onClick={() => setIsUserCenterOpen(true)}
                className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center hover:bg-stone-100 text-[#8b3a3a]"
            >
                <User size={20} />
            </button>
        </div>
      </header>

      {/* User Center Drawer */}
      <UserCenter 
        isOpen={isUserCenterOpen} 
        onClose={() => setIsUserCenterOpen(false)} 
        history={userHistory}
      />

      {/* Product Detail Page (Overlay) */}
      <AnimatePresence>
        {viewingProduct && (
          <ProductDetail 
            prize={viewingProduct} 
            onBack={() => setViewingProduct(null)} 
          />
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center relative">
        
        {/* Background Elements */}
        <div className="absolute top-20 left-10 opacity-10 pointer-events-none hidden md:block">
            <div className="writing-vertical-rl text-8xl font-['Zhi_Mang_Xing'] text-[#2c2c2c]">
                茶韵悠长
            </div>
        </div>
        <div className="absolute bottom-40 right-10 opacity-10 pointer-events-none hidden md:block">
             <div className="writing-vertical-rl text-8xl font-['Zhi_Mang_Xing'] text-[#8b3a3a]">
                一期一会
            </div>
        </div>

        {/* Main Content */}
        <div className="w-full max-w-4xl mx-auto mt-12 md:mt-24 px-4 flex flex-col items-center z-10">
          <div className="text-center mb-12">
            <span className="text-[#8b3a3a] font-bold tracking-[0.3em] text-sm uppercase mb-4 block">数字 · 限定版</span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-[#2c2c2c] mb-6">
              灵感 · <span className="text-[#8b3a3a]">萃取</span>
            </h1>
            <p className="text-lg md:text-xl text-stone-600 font-serif max-w-xl mx-auto leading-relaxed">
              古树普洱与现代浓缩的跨时空相遇。<br/>
              饮下一口数字气运，开启今日签文。
            </p>
          </div>

          {/* The Blind Box */}
          <div className="w-full flex justify-center mb-24">
            <BlindBox onOpen={handleOpenBox} isOpening={isOpening} />
          </div>
        </div>

        {/* Gallery Section */}
        <div className="w-full bg-stone-50/50 border-t border-stone-200">
          <Gallery onProductSelect={setViewingProduct} />
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-[#2c2c2c] text-stone-400 py-12 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
                <h3 className="text-white font-serif text-lg mb-2">普洱茶咖</h3>
                <p className="text-sm">Modern Teahouse & Coffee Lab</p>
            </div>
            <div className="flex gap-6">
                <Instagram size={20} className="hover:text-white cursor-pointer transition-colors"/>
                <MapPin size={20} className="hover:text-white cursor-pointer transition-colors"/>
                <Wind size={20} className="hover:text-white cursor-pointer transition-colors"/>
            </div>
            <p className="text-xs text-stone-600">
                © 2025 Pu'er Cafe Digital Experience.
            </p>
        </div>
      </footer>

      {/* Modal */}
      {revealedPrize && (
        <PrizeReveal 
          prize={revealedPrize} 
          fortune={fortune}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default App;