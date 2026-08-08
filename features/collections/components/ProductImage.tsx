'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { HANGER_SWAY_VARIANTS, IMAGE_CROSS_FADE } from './hanging-card.animations';
import { ImageNavigator } from './ImageNavigator';
import { FavoriteButton } from './FavoriteButton';
import { Badge } from './Badge';
import { BadgeType } from './hanging-card.types';
import { cn } from '@/lib/utils';

export interface ProductImageProps {
  images: string[];
  title: string;
  badges?: BadgeType[];
  isFavorite?: boolean;
  onFavoriteToggle?: (isFav: boolean) => void;
  className?: string;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  images,
  title,
  badges,
  isFavorite = false,
  onFavoriteToggle,
  className,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentImageIndex > 0) {
      setCurrentImageIndex((prev) => prev - 1);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex((prev) => prev + 1);
    }
  };

  const activeImage = images[currentImageIndex] || images[0];

  return (
    <div
      className={cn(
        'relative w-full aspect-[3/4] bg-gradient-to-b from-[#2A0E17]/80 to-[#1B0A0F]/80 rounded-md flex flex-col items-center justify-between overflow-hidden select-none border border-[#C89D5C]/25',
        className
      )}
    >
      {/* BADGES OVERLAY (TOP-LEFT) */}
      <div className="absolute top-4 left-4 z-20 flex flex-col items-start gap-1.5 pointer-events-none">
        {badges?.map((b) => (
          <Badge key={b} label={b} />
        ))}
      </div>

      {/* FAVORITE BUTTON OVERLAY (TOP-RIGHT) */}
      <div className="absolute top-4 right-4 z-20">
        <FavoriteButton initialIsFavorite={isFavorite} onToggle={onFavoriteToggle} />
      </div>

      {/* SUBTLE SLEEK METALLIC ANCHOR LINE (MINIMAL BOUTIQUE PRESENTATION) */}
      <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#C89D5C]/40 to-transparent mt-4 z-10 pointer-events-none" />

      {/* DRAPED FOLDED SAREE IMAGE CONTAINER WITH 300ms PURE CROSS-FADE */}
      <div className="relative w-full flex-grow flex items-center justify-center z-0 px-6 pb-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImage}
            variants={IMAGE_CROSS_FADE}
            initial="initial"
            animate="animate"
            exit="exit"
            className="relative w-full h-full max-h-[380px] sm:max-h-[440px]"
          >
            <Image
              src={activeImage}
              alt={title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-contain object-top drop-shadow-[0_16px_32px_rgba(0,0,0,0.65)] pointer-events-none"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* IMAGE FADE NAVIGATOR (HOVER OVERLAY) */}
      <ImageNavigator
        onPrev={handlePrev}
        onNext={handleNext}
        hasPrev={currentImageIndex > 0}
        hasNext={currentImageIndex < images.length - 1}
      />

      {/* SUBTLE FLOATING FLOOR SHADOW */}
      <div className="absolute bottom-0 inset-x-4 h-6 bg-[radial-gradient(ellipse_at_center,rgba(31,26,23,0.12)_0%,transparent_75%)] pointer-events-none z-10 group-hover:scale-105 transition-transform duration-500" />
    </div>
  );
};

ProductImage.displayName = 'ProductImage';
