import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Scroll, Grid, Lock, Calendar } from 'lucide-react';
import { Prize, HistoryItem } from '../types';
import { PRIZES } from '../constants';

interface UserCenterProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryItem[];
}

export const UserCenter: React.FC<UserCenterProps> = ({ isOpen, onClose, history }) => {
  const [activeTab, setActiveTab] = useState<'collection' | 'history'>('collection');

  // Calculate stats
  const uniqueCollectedIds = new Set(history.map(h => h.prizeId));
  const collectionRate = Math.round((uniqueCollectedIds.size / PRIZES.length) * 100);
  
  // Determine "Tea Level" based on collection
  let title = "初来乍到";
  if (uniqueCollectedIds.size >= 1) title = "品茗客";
  if (uniqueCollectedIds.size >= 3) title = "茶博士";
  if (uniqueCollectedIds.size >= 5) title = "茶道宗师";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#fdfbf7] z-50 shadow-2xl border-l-4 border-[#8b3a3a] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 bg-[#2c2c2c] text-[#fdfbf7] relative overflow-hidden shrink-0">
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-stone-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
              
              <div className="flex items-center gap-4 relative z-10 mt-4">
                <div className="w-16 h-16 rounded-full border-2 border-[#d4af37] bg-stone-800 flex items-center justify-center">
                    <User size={32} className="text-[#d4af37]" />
                </div>
                <div>
                    <div className="text-xs text-[#d4af37] uppercase tracking-widest mb-1">当前境界</div>
                    <h2 className="text-2xl font-serif font-bold">{title}</h2>
                    <p className="text-xs text-stone-400 mt-1">已收集 {uniqueCollectedIds.size} / {PRIZES.length} 款茶品</p>
                </div>
              </div>

              {/* Decorative bg pattern */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#8b3a3a] rounded-full opacity-10 -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none"></div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-stone-200 bg-white shrink-0">
                <button 
                    onClick={() => setActiveTab('collection')}
                    className={`flex-1 py-4 text-sm font-serif font-bold flex items-center justify-center gap-2 transition-colors
                    ${activeTab === 'collection' ? 'text-[#8b3a3a] border-b-2 border-[#8b3a3a]' : 'text-stone-400 hover:text-stone-600'}`}
                >
                    <Grid size={16} /> 茶籍图鉴
                </button>
                <button 
                    onClick={() => setActiveTab('history')}
                    className={`flex-1 py-4 text-sm font-serif font-bold flex items-center justify-center gap-2 transition-colors
                    ${activeTab === 'history' ? 'text-[#8b3a3a] border-b-2 border-[#8b3a3a]' : 'text-stone-400 hover:text-stone-600'}`}
                >
                    <Scroll size={16} /> 签文茶缘
                </button>
            </div>

            {/* Content Area */}
            <div className="flex-grow overflow-y-auto p-6 bg-paper-texture">
                {activeTab === 'collection' ? (
                    <div className="grid grid-cols-2 gap-4">
                        {PRIZES.map((prize) => {
                            const isCollected = uniqueCollectedIds.has(prize.id);
                            return (
                                <div key={prize.id} className={`relative rounded-xl overflow-hidden border ${isCollected ? 'border-[#8b3a3a]/20 shadow-sm' : 'border-dashed border-stone-300 bg-stone-50'}`}>
                                    <div className="aspect-square relative">
                                        <img 
                                            src={prize.imageUrl} 
                                            alt={prize.name}
                                            className={`w-full h-full object-cover transition-all duration-500 ${isCollected ? '' : 'grayscale opacity-30 blur-[1px]'}`} 
                                        />
                                        {!isCollected && (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <Lock className="text-stone-400" />
                                            </div>
                                        )}
                                        {isCollected && (
                                            <div className="absolute top-2 right-2 bg-[#8b3a3a] text-white text-[10px] px-2 py-0.5 rounded-full shadow-md">
                                                已拥有
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-3 text-center">
                                        <p className={`font-serif text-sm font-bold truncate ${isCollected ? 'text-[#2c2c2c]' : 'text-stone-400'}`}>
                                            {prize.name}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="space-y-6">
                        {history.length === 0 ? (
                            <div className="text-center py-12 opacity-50">
                                <Scroll size={48} className="mx-auto mb-4 text-stone-300" />
                                <p className="font-serif text-stone-500">暂无记录，快去开启盲盒吧</p>
                            </div>
                        ) : (
                            // Reverse history to show newest first
                            [...history].reverse().map((item) => (
                                <div key={item.id} className="relative pl-6 border-l-2 border-[#8b3a3a]/20 pb-8 last:pb-0 group">
                                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#fdfbf7] border-2 border-[#8b3a3a] group-hover:bg-[#8b3a3a] transition-colors"></div>
                                    
                                    <div className="bg-white p-4 rounded-lg shadow-sm border border-stone-100 relative overflow-hidden">
                                         {/* Date Stamp */}
                                        <div className="flex justify-between items-center mb-2 border-b border-stone-100 pb-2">
                                            <span className="text-xs font-bold text-[#8b3a3a] flex items-center gap-1">
                                                <Calendar size={12} />
                                                {new Date(item.timestamp).toLocaleDateString('zh-CN')}
                                            </span>
                                            <span className="text-xs text-stone-400">
                                                {new Date(item.timestamp).toLocaleTimeString('zh-CN', {hour: '2-digit', minute:'2-digit'})}
                                            </span>
                                        </div>

                                        <div className="flex gap-4">
                                            <img src={item.prizeImage} className="w-16 h-16 rounded-md object-cover flex-shrink-0" alt={item.prizeName} />
                                            <div>
                                                <h4 className="font-serif font-bold text-stone-800">{item.prizeName}</h4>
                                                <p className="text-xs text-stone-500 mt-1">幸运元素: <span className="text-[#8b3a3a]">{item.luckyElement}</span></p>
                                            </div>
                                        </div>

                                        <div className="mt-3 pt-3 border-t border-dashed border-stone-200">
                                            <p className="font-serif italic text-stone-600 text-sm leading-relaxed">
                                                "{item.fortune}"
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-stone-200 text-center text-xs text-stone-400 bg-stone-50 shrink-0">
                每一杯茶，都是一种缘分
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
