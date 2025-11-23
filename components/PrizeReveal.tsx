import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Prize, FortuneResult } from '../types';
import { X, Share2, Download, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas';

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
  const cardRef = useRef<HTMLDivElement>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!cardRef.current || isSaving) return;
    
    try {
      setIsSaving(true);
      
      // Use html2canvas to generate an image of the card
      const canvas = await html2canvas(cardRef.current, {
        useCORS: true, // Important for external images like picsum
        scale: 3, // Higher resolution for retina displays
        backgroundColor: '#fdfbf7', // Ensure background is captured
        logging: false,
        allowTaint: false
      });

      // Create download link
      const image = canvas.toDataURL("image/png");
      const link = document.createElement('a');
      link.href = image;
      link.download = `普洱茶咖-签文-${prize.name}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
    } catch (error) {
      console.error("Failed to generate image", error);
      alert("保存图片失败，请重试");
    } finally {
      setIsSaving(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '普洱茶咖 - 今日运势',
          text: `我在普洱茶咖盲盒中抽到了【${prize.name}】，签文：${fortune?.fortune || '快来看看！'}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(`普洱茶咖 - 我抽到了【${prize.name}】！\n签文：${fortune?.fortune}\n快来试试：${window.location.href}`);
      alert("链接已复制到剪贴板！");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-stone-900/80 backdrop-blur-sm" onClick={onClose} />
      
      <motion.div 
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20 }}
        className="relative w-full max-w-lg"
      >
        {/* Close Button - Outside the card ref to avoid capturing it in image */}
        <button 
            onClick={onClose}
            className="absolute -top-12 right-0 z-50 text-white/80 hover:text-white transition-colors"
        >
            <X size={32} />
        </button>

        {/* The Capture Area */}
        <div 
            ref={cardRef}
            className="bg-[#fdfbf7] rounded-2xl overflow-hidden shadow-2xl border-2 border-[#8b3a3a]"
        >
            <div className="flex flex-col">
                {/* Image Header */}
                <div className="h-64 w-full relative">
                    <img 
                        src={prize.imageUrl} 
                        alt={prize.name} 
                        crossOrigin="anonymous" // Essential for CORS
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
                    
                    {/* Add a footer for the shared image */}
                    <div className="text-center text-[10px] text-stone-400 font-serif uppercase tracking-widest mt-2 hidden print:block" style={{ display: isSaving ? 'block' : 'none' }}>
                        Scan to play · 普洱茶咖
                    </div>
                </div>
            </div>
        </div>

        {/* Actions - Outside of cardRef to not include in screenshot */}
        <div className="flex gap-4 justify-center mt-6">
            <button 
                onClick={handleSave}
                disabled={isSaving || !fortune}
                className="flex items-center gap-2 px-6 py-3 bg-[#2c2c2c] text-white rounded-full hover:bg-stone-700 transition-colors font-serif disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
                {isSaving ? '生成中...' : '保存签文'}
            </button>
            <button 
                onClick={handleShare}
                disabled={!fortune}
                className="flex items-center gap-2 px-6 py-3 border border-[#fdfbf7] text-[#fdfbf7] rounded-full hover:bg-white/10 transition-colors font-serif"
            >
                <Share2 size={18} /> 分享
            </button>
        </div>
      </motion.div>
    </div>
  );
};