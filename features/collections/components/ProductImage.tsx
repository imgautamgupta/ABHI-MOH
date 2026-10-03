'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageNavigator } from './ImageNavigator';
import { FavoriteButton } from './FavoriteButton';
import { Badge } from './Badge';
import { BadgeType, SareeProduct } from './hanging-card.types';
import { FavoriteItem } from '@/features/favorites/FavoritesContext';
import { cn } from '@/lib/utils';
import { isWixImage, wixCardImage, SOFT_IVORY_PLACEHOLDER } from '@/lib/wixImage';

export interface ProductImageProps {
  productId?: string;
  product?: SareeProduct | FavoriteItem;
  images: string[];
  title: string;
  badges?: BadgeType[];
  isFavorite?: boolean;
  onFavoriteToggle?: (isFav: boolean) => void;
  className?: string;
  priority?: boolean;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  productId,
  product,
  images,
  title,
  badges,
  isFavorite = false,
  onFavoriteToggle,
  className,
  priority = false,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    if (currentImageIndex > 0) {
      setCurrentImageIndex((prev) => prev - 1);
    }
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex((prev) => prev + 1);
    }
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 40 && currentImageIndex < images.length - 1) {
      handleNext();
    } else if (diff < -40 && currentImageIndex > 0) {
      handlePrev();
    }
    setTouchStartX(null);
  };

  const activeImage = images[currentImageIndex] || images[0];

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={cn(
        'relative w-full aspect-[3/4] bg-[#FAF7F2]/80 rounded-[24px] overflow-hidden select-none border border-[#D9C7A7]/30 group/img cursor-pointer',
        className
      )}
    >
      {/* EDITORIAL BADGES (TOP-LEFT) — MAX 2 VISIBLE */}
      <div className="absolute top-3 left-3 z-20 flex flex-wrap items-start gap-1.5 pointer-events-none">
        {badges?.slice(0, 2).map((b) => (
          <Badge key={b} label={b} />
        ))}
      </div>

      {/* FAVORITE BUTTON OVERLAY (TOP-RIGHT) */}
      <div className="absolute top-3 right-3 z-20">
        <FavoriteButton
          productId={productId || product?.id}
          product={product}
          initialIsFavorite={isFavorite}
          onToggle={onFavoriteToggle}
        />
      </div>

      {/* PRODUCT IMAGE WITH SUBTLE ZOOM HOVER */}
      <div className="relative w-full h-full flex items-center justify-center p-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="relative w-full h-full overflow-hidden"
          >
            <Image
              src={wixCardImage(activeImage)}
              alt={title}
              fill
              priority={priority}
              unoptimized={isWixImage(activeImage)}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-contain object-center transition-transform duration-700 ease-out group-hover/img:scale-[1.03]"
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src !== SOFT_IVORY_PLACEHOLDER) {
                  target.src = SOFT_IVORY_PLACEHOLDER;
                }
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* DESKTOP HOVER CAROUSEL ARROWS */}
      <ImageNavigator
        onPrev={handlePrev}
        onNext={handleNext}
        hasPrev={currentImageIndex > 0}
        hasNext={currentImageIndex < images.length - 1}
      />

      {/* CAROUSEL PILL & COUNTER INDICATOR */}
      {images.length > 1 && (
        <div className="absolute bottom-2.5 inset-x-0 flex items-center justify-center pointer-events-none z-20 opacity-90 sm:opacity-0 sm:group-hover/img:opacity-100 transition-opacity duration-300">
          <div className="flex items-center gap-1.5 bg-[#FAF7F2]/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#D9C7A7]/50 shadow-2xs">
            <div className="flex items-center gap-1">
              {images.map((_, idx) => (
                <span
                  key={idx}
                  className={cn(
                    'h-1 rounded-full transition-all duration-300',
                    idx === currentImageIndex ? 'bg-[#7D2130] w-3' : 'bg-[#736357]/40 w-1'
                  )}
                />
              ))}
            </div>
            <span className="text-[9px] font-medium text-[#736357] pl-1 border-l border-[#D9C7A7]/70 tracking-wider">
              {currentImageIndex + 1}/{images.length}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

ProductImage.displayName = 'ProductImage';

