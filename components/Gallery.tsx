import React from 'react';
import { PRIZES } from '../constants';
import { Prize } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface GalleryProps {
  onProductSelect: (prize: Prize) => void;
}

const rarityMap: Record<string, string> = {
  'Common': '日常款',
  'Rare': '珍藏款',
  'Legendary': '隐藏款'
};

export const Gallery: React.FC<GalleryProps> = ({ onProductSelect }) => {
  return (
    <section className="py-16 px-4 w-full max-w-6xl mx-auto">
      <div className="flex flex-col items-center mb-12">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#2c2c2c] mb-4">茶咖图鉴</h2>
        <div className="w-24 h-1 bg-[#8b3a3a] rounded-full"></div>
        <p className="mt-4 text-stone-500 font-serif italic">探索东方茶韵与西方咖啡的融合</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PRIZES.map((prize) => (
          <div 
            key={prize.id} 
            onClick={() => onProductSelect(prize)}
            className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-stone-100 relative"
          >
            {/* View Details Hover Overlay Hint */}
            <div className="absolute top-4 right-4 z-10 bg-white/90 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0 shadow-lg text-[#8b3a3a]">
                <ArrowUpRight size={20} />
            </div>

            <div className="relative h-48 overflow-hidden">
              <img 
                src={prize.imageUrl} 
                alt={prize.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute top-2 left-2">
                 <span className={`text-[10px] px-2 py-1 rounded-full uppercase tracking-widest font-bold shadow-sm
                    ${prize.rarity === 'Legendary' ? 'bg-yellow-400/90 text-yellow-900' : 
                      prize.rarity === 'Rare' ? 'bg-emerald-200/90 text-emerald-800' : 'bg-stone-200/90 text-stone-700'}`}>
                    {rarityMap[prize.rarity] || prize.rarity}
                 </span>
              </div>
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start">
                  <h3 className="text-xl font-serif font-bold text-[#2c2c2c] mb-2 group-hover:text-[#8b3a3a] transition-colors">{prize.name}</h3>
              </div>
              <p className="text-sm text-stone-500 mb-4 line-clamp-2">{prize.description}</p>
              <div className="flex flex-wrap gap-2">
                {prize.notes.split(', ').map((note, idx) => (
                  <span key={idx} className="text-xs px-2 py-1 border border-stone-200 rounded-md text-stone-400 group-hover:border-[#8b3a3a]/30 group-hover:text-[#8b3a3a]/70 transition-colors">
                    {note}
                  </span>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-stone-100 flex items-center text-[#8b3a3a] text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0">
                  查看详细介绍 <ArrowUpRight size={14} className="ml-1" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};