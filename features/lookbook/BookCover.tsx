'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BOOK_COVER_VARIANTS } from './lookbook.animations';
import { cn } from '@/lib/utils';
import { BookOpen } from 'lucide-react';

export interface BookCoverProps {
  isOpen: boolean;
  onOpen: () => void;
  className?: string;
}

export const BookCover: React.FC<BookCoverProps> = ({ isOpen, onOpen, className }) => {
  return (
    <motion.div
      variants={BOOK_COVER_VARIANTS}
      initial="closed"
      animate={isOpen ? 'open' : 'closed'}
      onClick={onOpen}
      style={{ transformOrigin: 'left center', transformStyle: 'preserve-3d' }}
      className={cn(
        'absolute inset-0 w-full h-full bg-[#FFFDFC] border border-[#DDD3C8] border-l-[#6B0F1A]/80 rounded-r-md shadow-xl p-8 sm:p-12 flex flex-col justify-between items-center text-center font-satoshi select-none cursor-pointer z-30 transition-shadow duration-500',
        className
      )}
    >
      {/* Front Cover Gold & Maroon Foil Borders */}
      <div className="absolute inset-4 border border-[#C8A96A]/40 rounded-r-sm pointer-events-none" />
      <div className="absolute inset-6 border border-[#6B0F1A]/30 rounded-r-sm pointer-events-none" />

      {/* TOP: Monogram */}
      <div className="relative z-10 flex flex-col items-center gap-3 pt-6 sm:pt-10">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#6B0F1A] to-[#3B0006] border border-[#C8A96A]/50 flex items-center justify-center text-[#F8F4EF] font-hero text-xl font-medium tracking-[0.2em] shadow-md">
          AM
        </div>
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#6A625A] font-light">
          Maison Edition
        </span>
      </div>

      {/* CENTER: ABHI-MOH Wordmark & Tagline */}
      <div className="relative z-10 flex flex-col items-center gap-4 my-auto">
        <h1
          className="font-hero text-4xl sm:text-6xl font-[500] tracking-[0.2em] uppercase block leading-none"
          style={{ color: '#6B0F1A' }}
        >
          ABHI-MOH
        </h1>

        <div className="w-12 h-[1px] bg-[#C8A96A]/60" />

        <h2 className="font-section text-xl sm:text-3xl italic font-light tracking-wide text-[#C8A96A]">
          &quot;The Essence of Elegance&quot;
        </h2>
      </div>

      {/* BOTTOM: Call to Open Action */}
      <div className="relative z-10 flex flex-col items-center gap-3 pb-4">
        <div className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#6B0F1A] text-[#F8F4EF] text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 hover:bg-[#8C1C2A] hover:scale-105 shadow-sm">
          <BookOpen className="w-4 h-4 text-[#F8F4EF]" />
          <span>Tap / Scroll To Open</span>
        </div>

        <span className="text-[9px] uppercase tracking-[0.25em] text-[#6A625A]">
          Volume I • Haute Couture Lookbook
        </span>
      </div>
    </motion.div>
  );
};

BookCover.displayName = 'BookCover';
