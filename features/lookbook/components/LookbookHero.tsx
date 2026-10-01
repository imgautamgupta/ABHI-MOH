'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface LookbookHeroProps {
  activeCategory: string;
  onSelectCategory: (categoryId: string) => void;
  categories: { id: string; label: string }[];
}

export const LookbookHero: React.FC<LookbookHeroProps> = ({
  activeCategory,
  onSelectCategory,
  categories,
}) => {
  return (
    <section className="relative w-full pt-32 pb-14 lg:pt-40 lg:pb-20 px-5 sm:px-10 lg:px-16 flex flex-col items-center justify-center text-center font-satoshi overflow-hidden">
      {/* Background radial warmth & subtle paper texture */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] lg:w-[1200px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(217,199,167,0.22)_0%,transparent_70%)] pointer-events-none z-0" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: [0.25, 1, 0.5, 1] }}
        className="relative z-10 max-w-4xl mx-auto flex flex-col items-center"
      >
        {/* Editorial Masthead Tag */}
        <div className="flex items-center gap-2.5 mb-4">
          <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.35em] text-[#7D2130] bg-[#FAF7F2]/90 px-4 py-1 rounded-full border border-[#D9C7A7]/60 inline-flex items-center gap-1.5 shadow-2xs">
            <Sparkles className="w-3 h-3" />
            <span>ABHI-MOH • COUTURE EDITORIAL</span>
          </span>
        </div>

        {/* Editorial Main Title */}
        <h1 className="font-hero text-4xl min-[360px]:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-[0.1em] sm:tracking-[0.16em] uppercase text-[#382C26] leading-none mb-3">
          LOOKBOOK
        </h1>

        {/* Issue Subtitle */}
        <p className="font-hero text-lg sm:text-2xl md:text-3xl italic font-light tracking-wide text-[#7D2130] mb-4">
          Visual Narratives in Pure Silk & Gold Zari
        </p>

        {/* Editorial Subhead */}
        <p className="font-sans text-xs sm:text-sm font-light tracking-[0.12em] uppercase text-[#736357] max-w-xl leading-relaxed">
          An intimate visual exploration of Indian textile heritage, timeless silhouettes, and the poetry of the handloom.
        </p>

        {/* Divider */}
        <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#7D2130]/50 to-transparent mt-8 mb-10" />

        {/* Editorial Category Selector Tabs */}
        <div className="w-full max-w-[1100px] flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className={cn(
                  'px-4 py-2 rounded-full text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-medium transition-all duration-300 select-none cursor-pointer focus:outline-none shadow-2xs',
                  isActive
                    ? 'bg-[#7D2130] text-[#FAF7F2] border border-[#7D2130] shadow-sm'
                    : 'bg-[#FAF7F2]/80 text-[#736357] border border-[#D9C7A7]/50 hover:border-[#7D2130]/60 hover:text-[#382C26]'
                )}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

LookbookHero.displayName = 'LookbookHero';
