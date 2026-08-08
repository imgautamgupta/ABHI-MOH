'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { LookbookSpread, SareeMetadata } from './lookbook.types';
import { EDITORIAL_FADE } from './lookbook.animations';
import { cn } from '@/lib/utils';

export interface BookPageProps {
  spread: LookbookSpread;
  className?: string;
}

const SareeMagazineCard: React.FC<{ item: SareeMetadata; side: 'LEFT' | 'RIGHT' }> = ({
  item,
  side,
}) => (
  <motion.div
    variants={EDITORIAL_FADE}
    initial="hidden"
    animate="visible"
    className="w-full lg:w-1/2 flex flex-col justify-between p-6 sm:p-10 bg-[#1C0A10]/95 backdrop-blur-[24px] border border-[#C89D5C]/30 rounded-xl shadow-2xl text-left font-satoshi select-none"
  >
    {/* Top Editorial Label */}
    <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-[#C89D5C] font-medium mb-4">
      <span>{side === 'LEFT' ? 'LOOKBOOK PLATE I' : 'LOOKBOOK PLATE II'}</span>
      <span>{item.collection}</span>
    </div>

    {/* Consistent Fixed-Height Image Container (NEVER CROPPED!) */}
    <div className="relative w-full h-[360px] sm:h-[420px] lg:h-[480px] bg-[#15080C] rounded-lg border border-[#C89D5C]/20 flex items-center justify-center p-6 my-2 shadow-inner overflow-hidden group">
      <Image
        src={item.image}
        alt={item.title}
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-contain object-center drop-shadow-[0_20px_40px_rgba(0,0,0,0.75)] pointer-events-none transition-transform duration-700 ease-silk group-hover:scale-[1.03]"
      />
    </div>

    {/* Title & Detailed Metadata Block Below Image */}
    <div className="flex flex-col gap-4 mt-6 pt-4 border-t border-[#C89D5C]/25">
      <h3 className="font-hero text-xl sm:text-2xl font-[500] uppercase tracking-[0.16em] text-[#F6ECE1]">
        {item.title}
      </h3>

      <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs font-satoshi">
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] uppercase tracking-widest text-[#D0BEAB]/70 font-light">
            Material
          </span>
          <span className="font-medium text-[#F6ECE1]">{item.material}</span>
        </div>

        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] uppercase tracking-widest text-[#D0BEAB]/70 font-light">
            Craft
          </span>
          <span className="font-medium text-[#F6ECE1]">{item.craft}</span>
        </div>

        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] uppercase tracking-widest text-[#D0BEAB]/70 font-light">
            Color
          </span>
          <span className="font-medium text-[#E5C388]">{item.color}</span>
        </div>

        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] uppercase tracking-widest text-[#D0BEAB]/70 font-light">
            Collection
          </span>
          <span className="font-medium text-[#F6ECE1]">{item.collection}</span>
        </div>
      </div>

      <p className="font-sans text-xs font-light leading-relaxed text-[#D0BEAB]/90 tracking-wide mt-1">
        {item.shortDescription}
      </p>
    </div>
  </motion.div>
);

export const BookPage: React.FC<BookPageProps> = ({ spread, className }) => {
  return (
    <div
      className={cn(
        'w-full flex flex-col lg:flex-row items-stretch justify-between gap-8 sm:gap-12 relative select-none',
        className
      )}
    >
      {/* NO vertical partition line between pages! Single seamless luxury magazine spread */}
      <SareeMagazineCard item={spread.leftItem} side="LEFT" />
      <SareeMagazineCard item={spread.rightItem} side="RIGHT" />
    </div>
  );
};

BookPage.displayName = 'BookPage';
