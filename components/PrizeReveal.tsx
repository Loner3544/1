import React from 'react';
import { motion } from 'framer-motion';
import { Prize, FortuneResult } from '../types';
import { X, Share2, Download } from 'lucide-react';

interface PrizeRevealProps {
  prize: Prize;
  fortune: FortuneResult | null;
  onClose: () => void;
}

const rarityMap: Record<string, string> = {
  'Common': '日常款',
  'Rare': '珍藏款',
  'Legendary': '隐藏款'
};

export const PrizeReveal: React.FC<PrizeRevealProps> = ({ prize, fortune, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-stone-900/80 backdrop-blur-sm" onClick={onClose} />
      
      <motion.div 
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20 }}
        className="relative bg-[#fdfbf7] w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl border-2 border-[#8b3a3a]"
      >
        {/* Close Button */}
        <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 text-stone-500 hover:text-[#8b3a3a] transition-colors"
        >
            <X size={24} />
        </button>

        <div className="flex flex-col">
            {/* Image Header */}
            <div className="h-64 w-full relative">
                <img 
                    src={prize.imageUrl} 
                    alt={prize.name} 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#fdfbf7] to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2
                        ${prize.rarity === 'Legendary' ? 'bg-yellow-400 text-yellow-900' : 
                          prize.rarity === 'Rare' ? 'bg-emerald-200 text-emerald-800' : 'bg-stone-200 text-stone-700'}`}>
                        获得 {rarityMap[prize.rarity] || prize.rarity}
                    </span>
                    <h2 className="text-3xl font-serif font-bold text-[#2c2c2c]">{prize.name}</h2>
                </div>
            </div>

            {/* Content Body */}
            <div className="p-8 pt-2 flex flex-col gap-6 relative">
                 {/* Decorative Stamps */}
                <div className="absolute top-0 right-8 opacity-20 pointer-events-none rotate-12">
                     <div className="w-24 h-24 border-4 border-red-800 rounded-lg flex items-center justify-center">
                        <span className="font-serif font-bold text-red-800 text-4xl">大吉</span>
                     </div>
                </div>

                <div className="text-center">
                    <p className="text-stone-600 italic font-serif leading-relaxed">
                        "{prize.description}"
                    </p>
                </div>

                {/* Gemini Fortune Section */}
                <div className="bg-stone-100 p-6 rounded-xl border border-stone-200 relative overflow-hidden group">
                    {fortune ? (
                        <>
                           <h3 className="text-[#8b3a3a] font-bold text-sm uppercase tracking-widest mb-2 text-center flex items-center justify-center gap-2">
                              <span className="w-8 h-[1px] bg-[#8b3a3a]"></span>
                              茶语签文
                              <span className="w-8 h-[1px] bg-[#8b3a3a]"></span>
                           </h3>
                           <p className="text-xl font-serif text-stone-800 text-center leading-8 mb-4">
                               {fortune.fortune}
                           </p>
                           <div className="flex justify-center gap-2 items-center text-sm text-stone-500">
                               <span>幸运元素:</span>
                               <span className="text-[#8b3a3a] font-bold">{fortune.luckyElement}</span>
                           </div>
                        </>
                    ) : (
                        <div className="animate-pulse flex flex-col items-center gap-2">
                            <div className="h-4 bg-stone-200 rounded w-3/4"></div>
                            <div className="h-4 bg-stone-200 rounded w-1/2"></div>
                            <span className="text-xs text-stone-400 mt-2">正在向茶灵祈问...</span>
                        </div>
                    )}
                </div>

                {/* Coupon Code */}
                <div className="border-dashed border-2 border-[#8b3a3a]/30 p-4 rounded-lg text-center bg-[#8b3a3a]/5">
                    <p className="text-xs text-stone-500 uppercase tracking-wide mb-1">数字礼券</p>
                    <p className="text-2xl font-mono font-bold text-[#8b3a3a]">PUER-{Math.random().toString(36).substring(2, 7).toUpperCase()}</p>
                    <p className="text-xs text-stone-400 mt-1">24小时内有效 · 仅限普洱茶咖门店</p>
                </div>

                {/* Actions */}
                <div className="flex gap-4 justify-center mt-2">
                    <button className="flex items-center gap-2 px-6 py-3 bg-[#2c2c2c] text-white rounded-full hover:bg-stone-700 transition-colors font-serif">
                        <Download size={18} /> 保存
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 border border-[#2c2c2c] text-[#2c2c2c] rounded-full hover:bg-stone-100 transition-colors font-serif">
                        <Share2 size={18} /> 分享
                    </button>
                </div>
            </div>
        </div>
      </motion.div>
    </div>
  );
};