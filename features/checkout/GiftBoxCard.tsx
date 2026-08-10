'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GiftBoxOption } from './checkout.types';
import { CARD_SELECTION_VARIANTS } from './checkout.animations';
import { cn } from '@/lib/utils';
import { Box, Sparkles, Check } from 'lucide-react';

export interface GiftBoxCardProps {
  option: GiftBoxOption;
  isSelected: boolean;
  onSelect: () => void;
}

export const GiftBoxCard: React.FC<GiftBoxCardProps> = ({ option, isSelected, onSelect }) => {
  return (
    <motion.div
      variants={CARD_SELECTION_VARIANTS}
      animate={isSelected ? 'selected' : 'idle'}
      onClick={onSelect}
      className={cn(
        'group relative p-5 rounded-xl border flex flex-col justify-between gap-4 cursor-pointer transition-all duration-300 select-none text-left bg-[#FAF7F2]',
        isSelected
          ? 'border-[#7A1C28] bg-[#7A1C28]/5 shadow-sm ring-1 ring-[#7A1C28]/20'
          : 'border-[#E8DFD5] hover:border-[#D9C7A7] hover:bg-white'
      )}
    >
      {/* Top Header & Selection Checkmark / Badge */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className={cn(
            'p-2.5 rounded-full border transition-colors',
            isSelected ? 'bg-[#7A1C28]/10 border-[#7A1C28]/30' : 'bg-white border-[#E8DFD5]'
          )}>
            <Box className={cn('w-4 h-4 transition-colors', isSelected ? 'text-[#7A1C28]' : 'text-[#736357]')} />
          </div>

          <div className="flex flex-col">
            <span className="font-hero text-sm font-[500] text-[#2A221E] tracking-wide">
              {option.title}
            </span>
            {option.badge && (
              <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-widest text-[#7A1C28] font-medium">
                <Sparkles className="w-2.5 h-2.5 text-[#C9A96E]" />
                {option.badge}
              </span>
            )}
          </div>
        </div>

        {/* Selected Active Checkmark */}
        {isSelected && (
          <div className="w-5 h-5 rounded-full bg-[#7A1C28] flex items-center justify-center flex-shrink-0">
            <Check className="w-3 h-3 text-white" />
          </div>
        )}
      </div>

      {/* Description */}
      <p className="font-sans text-xs font-light text-[#736357] leading-relaxed">
        {option.description}
      </p>

      {/* Price Tag */}
      <div className="pt-2 border-t border-[#E8DFD5] flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-widest text-[#736357]/80">
          Packaging Fee
        </span>
        <span className="font-satoshi text-sm font-semibold text-[#7A1C28]">
          {option.priceFormatted}
        </span>
      </div>
    </motion.div>
  );
};

GiftBoxCard.displayName = 'GiftBoxCard';
