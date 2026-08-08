'use client';

import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { HEART_POP_VARIANTS } from './hanging-card.animations';
import { cn } from '@/lib/utils';

export interface FavoriteButtonProps {
  initialIsFavorite?: boolean;
  onToggle?: (isFav: boolean) => void;
  className?: string;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  initialIsFavorite = false,
  onToggle,
  className,
}) => {
  const [isFav, setIsFav] = useState(initialIsFavorite);
  const [animatePop, setAnimatePop] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextState = !isFav;
    setIsFav(nextState);
    setAnimatePop(true);

    if (onToggle) {
      onToggle(nextState);
    }

    setTimeout(() => setAnimatePop(false), 300);
  };

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      variants={HEART_POP_VARIANTS}
      animate={animatePop ? 'pop' : 'idle'}
      onClick={handleClick}
      aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
      className={cn(
        'relative flex items-center justify-center p-2.5 rounded-full bg-[#1A0A0F]/90 backdrop-blur-md border border-[#C89D5C]/35 shadow-lg text-[#F6ECE1] hover:text-[#E5C388] transition-all duration-500 ease-silk select-none cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C89D5C]/50 z-20 opacity-0 group-hover:opacity-100',
        isFav && 'opacity-100 border-[#C89D5C]/70 bg-[#2A0E17]',
        className
      )}
    >
      <Heart
        className={cn(
          'w-4 h-4 transition-all duration-500 ease-silk',
          isFav
            ? 'fill-[#A32233] text-[#E5C388] drop-shadow-[0_0_10px_rgba(163,34,51,0.75)]'
            : 'text-[#D0BEAB] hover:text-[#E5C388]'
        )}
      />
    </motion.button>
  );
};

FavoriteButton.displayName = 'FavoriteButton';
