import React from 'react';
import { motion } from 'framer-motion';
import { Prize } from '../types';
import { ArrowLeft, Thermometer, Droplets, Clock, MapPin, Leaf } from 'lucide-react';

interface ProductDetailProps {
  prize: Prize;
  onBack: () => void;
}

const rarityMap: Record<string, string> = {
  'Common': '日常款',
  'Rare': '珍藏款',
  'Legendary': '隐藏款'
};

export const ProductDetail: React.FC<ProductDetailProps> = ({ prize, onBack }) => {
  // Mock data for detail view visuals
  const brewingGuide = {
    temp: '92°C',
    ratio: '1:15',
    time: '2-3 min'
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '100%' }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-50 bg-[#fdfbf7] overflow-y-auto flex flex-col md:flex-row"
    >
      {/* Back Button (Mobile/Desktop) */}
      <button 
        onClick={onBack}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full shadow-sm hover:bg-white transition-all text-[#2c2c2c] font-serif"
      >
        <ArrowLeft size={20} />
        <span>返回图鉴</span>
      </button>

      {/* Left: Image Section */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-full relative shrink-0">
        <img 
          src={prize.imageUrl} 
          alt={prize.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-[#fdfbf7] md:to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#fdfbf7]"></div>
        
        {/* Rarity Badge */}
        <div className="absolute bottom-6 left-6 md:top-6 md:right-6 md:left-auto md:bottom-auto">
             <span className={`px-4 py-2 rounded-lg uppercase tracking-widest font-bold shadow-lg backdrop-blur-md border border-white/20
                ${prize.rarity === 'Legendary' ? 'bg-yellow-400/90 text-yellow-900' : 
                  prize.rarity === 'Rare' ? 'bg-emerald-200/90 text-emerald-800' : 'bg-stone-200/90 text-stone-700'}`}>
                {rarityMap[prize.rarity] || prize.rarity}
             </span>
        </div>
      </div>

      {/* Right: Content Section */}
      <div className="w-full md:w-1/2 min-h-screen md:min-h-0 md:h-full overflow-y-auto bg-[#fdfbf7] p-6 md:p-12 md:pt-24 relative">
        <div className="max-w-xl mx-auto space-y-10 pb-20">
          
          {/* Title Header */}
          <div className="border-b border-[#8b3a3a]/20 pb-8">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#2c2c2c] mb-4">{prize.name}</h1>
            <div className="flex flex-wrap gap-2 mb-6">
                {prize.notes.split(', ').map((note, idx) => (
                  <span key={idx} className="px-3 py-1 border border-[#8b3a3a] text-[#8b3a3a] rounded-full text-sm font-serif">
                    {note}
                  </span>
                ))}
            </div>
            <p className="text-lg text-stone-600 leading-relaxed font-serif italic">
               "{prize.description}"
            </p>
          </div>

          {/* Story Section */}
          <div>
            <h3 className="flex items-center gap-2 text-[#8b3a3a] font-bold text-lg mb-4 uppercase tracking-widest">
              <Leaf size={18} />
              茶品故事
            </h3>
            <p className="text-stone-600 leading-7 text-justify">
              这款{prize.name}源自我们对云南古老茶山的深情致敬。精选海拔1800米以上的生态茶园，
              经过72小时的传统工艺发酵，再辅以现代低温慢萃技术。茶汤色泽红亮剔透，
              如同山间初升的朝阳。每一口都是时间沉淀的味道，不仅是味蕾的享受，更是一次心灵的洗礼。
              在这个快节奏的时代，我们希望用这一杯，带您找回内心的宁静。
            </p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-6">
             <div className="bg-stone-100 p-4 rounded-xl">
                <div className="text-stone-400 text-xs mb-1 uppercase tracking-wider">产地 Origin</div>
                <div className="text-[#2c2c2c] font-serif font-bold flex items-center gap-2">
                    <MapPin size={16} className="text-[#8b3a3a]"/> 云南 · 普洱
                </div>
             </div>
             <div className="bg-stone-100 p-4 rounded-xl">
                <div className="text-stone-400 text-xs mb-1 uppercase tracking-wider">工艺 Process</div>
                <div className="text-[#2c2c2c] font-serif font-bold">
                    古法发酵 · 低温冷萃
                </div>
             </div>
          </div>

          {/* Brewing Guide */}
          <div className="bg-[#2c2c2c] text-[#fdfbf7] p-8 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#8b3a3a] rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
            
            <h3 className="text-[#d4af37] font-bold text-lg mb-6 uppercase tracking-widest flex items-center gap-2 relative z-10">
                赏味指南 · Brewing Guide
            </h3>
            
            <div className="grid grid-cols-3 gap-4 relative z-10">
                <div className="text-center">
                    <div className="w-10 h-10 mx-auto bg-stone-700 rounded-full flex items-center justify-center mb-2 text-[#d4af37]">
                        <Thermometer size={20} />
                    </div>
                    <div className="text-sm font-bold">{brewingGuide.temp}</div>
                    <div className="text-xs text-stone-400">最佳温度</div>
                </div>
                <div className="text-center">
                    <div className="w-10 h-10 mx-auto bg-stone-700 rounded-full flex items-center justify-center mb-2 text-[#d4af37]">
                        <Droplets size={20} />
                    </div>
                    <div className="text-sm font-bold">{brewingGuide.ratio}</div>
                    <div className="text-xs text-stone-400">粉水比例</div>
                </div>
                <div className="text-center">
                    <div className="w-10 h-10 mx-auto bg-stone-700 rounded-full flex items-center justify-center mb-2 text-[#d4af37]">
                        <Clock size={20} />
                    </div>
                    <div className="text-sm font-bold">{brewingGuide.time}</div>
                    <div className="text-xs text-stone-400">萃取时间</div>
                </div>
            </div>
          </div>

          <div className="text-center pt-8">
            <div className="inline-block w-16 h-1 bg-[#8b3a3a] rounded-full mb-4"></div>
            <p className="text-sm text-stone-400 italic">"一期一会，难得一面，世当珍惜。"</p>
          </div>

        </div>
      </div>
    </motion.div>
  );
};