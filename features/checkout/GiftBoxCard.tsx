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
        'group relative p-5 rounded-sm bg-[#181818] border flex flex-col justify-between gap-4 cursor-pointer transition-all duration-300 select-none text-left',
        isSelected
          ? 'border-[#5E0006] bg-[#5E0006]/10 shadow-medium'
          : 'border-borders hover:border-warm-cream/40 hover:bg-[#181818]/90'
      )}
    >
      {/* Top Header & Selection Checkmark / Badge */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-full bg-surface border border-borders group-hover:border-warm-cream/30 transition-colors">
            <Box className={cn('w-4 h-4 transition-colors', isSelected ? 'text-warm-cream' : 'text-secondary-text')} />
          </div>

          <div className="flex flex-col">
            <span className="font-hero text-sm font-[500] text-warm-cream tracking-wide">
              {option.title}
            </span>
            {option.badge && (
              <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-widest text-[#EED9B9]/90 font-light">
                <Sparkles className="w-2.5 h-2.5 text-warm-cream" />
                {option.badge}
              </span>
            )}
          </div>
        </div>

        {/* Selected Active Checkmark */}
        {isSelected && (
          <div className="w-5 h-5 rounded-full bg-[#5E0006] flex items-center justify-center flex-shrink-0">
            <Check className="w-3 h-3 text-warm-cream" />
          </div>
        )}
      </div>

      {/* Description */}
      <p className="font-sans text-xs font-light text-secondary-text leading-relaxed">
        {option.description}
      </p>

      {/* Price Tag */}
      <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-widest text-secondary-text/60">
          Packaging Fee
        </span>
        <span className="font-satoshi text-sm font-semibold text-[#5E0006]">
          {option.priceFormatted}
        </span>
      </div>
    </motion.div>
  );
};

GiftBoxCard.displayName = 'GiftBoxCard';
