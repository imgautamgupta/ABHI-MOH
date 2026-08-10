'use client';

import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useFavorites } from '@/features/favorites/FavoritesContext';

export interface FavoriteButtonProps {
  productId?: string;
  initialIsFavorite?: boolean;
  onToggle?: (isFav: boolean) => void;
  className?: string;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  productId,
  initialIsFavorite = false,
  onToggle,
  className,
}) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [localFav, setLocalFav] = useState(initialIsFavorite);
  const [animatePop, setAnimatePop] = useState(false);

  const activeIsFav = productId ? isFavorite(productId) : localFav;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAnimatePop(true);

    if (productId) {
      toggleFavorite(productId);
      if (onToggle) onToggle(!activeIsFav);
    } else {
      const next = !localFav;
      setLocalFav(next);
      if (onToggle) onToggle(next);
    }

    setTimeout(() => setAnimatePop(false), 250);
  };

  return (
    <motion.button
      type="button"
      animate={{ scale: animatePop ? 1.15 : 1 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      onClick={handleClick}
      aria-label={activeIsFav ? 'Remove from favorites' : 'Add to favorites'}
      className={cn(
        'relative flex items-center justify-center p-2 rounded-full bg-[#FAF7F2]/90 backdrop-blur-md border border-[#D9C7A7]/50 text-[#382C26] hover:text-[#7D2130] transition-all duration-300 select-none cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#7D2130]/30 z-20 shadow-xs',
        activeIsFav && 'border-[#7D2130]/40 bg-[#FAF7F2]',
        className
      )}
    >
      <Heart
        className={cn(
          'w-3.5 h-3.5 transition-colors duration-300',
          activeIsFav
            ? 'fill-[#7D2130] text-[#7D2130]'
            : 'text-[#736357] hover:text-[#7D2130]'
        )}
      />
    </motion.button>
  );
};

FavoriteButton.displayName = 'FavoriteButton';

