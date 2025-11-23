import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Sparkles, Coffee } from 'lucide-react';

interface BlindBoxProps {
  onOpen: () => void;
  isOpening: boolean;
}

export const BlindBox: React.FC<BlindBoxProps> = ({ onOpen, isOpening }) => {
  return (
    <div className="relative flex flex-col items-center justify-center h-96 w-full">
      <AnimatePresence>
        {!isOpening ? (
          <motion.div
            key="box"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0, rotate: 10 }}
            whileHover={{ scale: 1.05, rotate: [-1, 1, -1] }}
            transition={{ duration: 0.5 }}
            className="cursor-pointer relative group"
            onClick={onOpen}
          >
            {/* Decorative Aura */}
            <div className="absolute inset-0 bg-red-800 blur-3xl opacity-20 group-hover:opacity-30 transition-opacity rounded-full"></div>
            
            {/* The Box Image/Representation */}
            <div className="relative w-64 h-64 bg-[#8b3a3a] rounded-xl shadow-2xl flex items-center justify-center border-4 border-[#d4af37] rotate-3 transform transition-transform duration-500 group-hover:rotate-0">
              <div className="absolute inset-2 border border-[#d4af37]/50 rounded-lg"></div>
              <div className="flex flex-col items-center text-[#d4af37]">
                <div className="p-4 border-2 border-[#d4af37] rounded-full mb-2 bg-[#6e2c2c]">
                    <span className="text-4xl font-serif font-bold">茶</span>
                </div>
                <span className="text-xl font-serif tracking-widest uppercase">普洱 · 盲盒</span>
              </div>
              
              {/* Traditional Pattern Overlay */}
              <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
            </div>

            {/* Call to Action */}
            <motion.div 
              className="absolute -bottom-12 w-full text-center"
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <span className="text-stone-800 font-serif italic tracking-widest bg-white/50 px-4 py-1 rounded-full backdrop-blur-sm">
                点击开启 · 今日运势
              </span>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="opening"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center"
          >
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 10, 0],
                scale: [1, 1.1, 0.9, 1.2] 
              }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="relative"
            >
                <Coffee className="w-32 h-32 text-[#8b3a3a]" />
                <motion.div 
                    animate={{ scale: [1, 2], opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="absolute inset-0 bg-amber-200 rounded-full blur-xl -z-10"
                />
            </motion.div>
            <p className="mt-8 text-xl font-serif text-stone-600 animate-pulse">正在萃取您的运势...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};