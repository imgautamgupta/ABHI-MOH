'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ZoomIn, X } from 'lucide-react';
import { Badge } from './Badge';
import { FavoriteButton } from './FavoriteButton';
import { BadgeType, SareeProduct } from './hanging-card.types';
import { cn } from '@/lib/utils';
import { isWixImage, wixDetailImage, wixThumbImage, SOFT_IVORY_PLACEHOLDER } from '@/lib/wixImage';

export interface ProductDetailGalleryProps {
  product: SareeProduct;
  images: string[];
  title: string;
  badges?: BadgeType[];
  isFavorite?: boolean;
  onFavoriteToggle?: (isFav: boolean) => void;
  className?: string;
}

export const ProductDetailGallery: React.FC<ProductDetailGalleryProps> = ({
  product,
  images,
  title,
  badges,
  isFavorite = false,
  onFavoriteToggle,
  className,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const safeImages = images && images.length > 0 ? images : ['/assets/sarees/saree-maroon.png'];
  const activeImage = safeImages[currentIndex] || safeImages[0];

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : safeImages.length - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setCurrentIndex((prev) => (prev < safeImages.length - 1 ? prev + 1 : 0));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 40) handleNext();
    else if (diff < -40) handlePrev();
    setTouchStartX(null);
  };

  return (
    <div className={cn('flex flex-col-reverse lg:flex-row gap-4 lg:gap-6 w-full select-none', className)}>
      {/* THUMBNAIL STRIP (Vertical on large desktop, horizontal on mobile/tablet) */}
      {safeImages.length > 1 && (
        <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto no-scrollbar py-1 lg:py-0 lg:max-h-[640px] flex-shrink-0">
          {safeImages.map((img, idx) => {
            const isSelected = idx === currentIndex;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`View photo ${idx + 1}`}
                className={cn(
                  'relative w-16 h-20 sm:w-20 sm:h-24 lg:w-20 lg:h-28 rounded-xs overflow-hidden border transition-all duration-300 flex-shrink-0 bg-[#FAF7F2] p-1 cursor-pointer focus:outline-none',
                  isSelected
                    ? 'border-[#7D2130] ring-1 ring-[#7D2130] shadow-sm'
                    : 'border-[#D9C7A7]/50 hover:border-[#7D2130]/60 opacity-70 hover:opacity-100'
                )}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={wixThumbImage(img)}
                    alt={`${title} view ${idx + 1}`}
                    fill
                    unoptimized={isWixImage(img)}
                    sizes="(max-width: 640px) 64px, 80px"
                    className="object-contain object-center"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src !== SOFT_IVORY_PLACEHOLDER) {
                        target.src = SOFT_IVORY_PLACEHOLDER;
                      }
                    }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* MAIN SHOWCASE IMAGE */}
      <div className="relative flex-1">
        <div
          ref={imageContainerRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
          onMouseMove={handleMouseMove}
          className="relative w-full aspect-[3/4] max-h-[720px] bg-[#FAF7F2] rounded-[24px] overflow-hidden border border-[#D9C7A7]/40 shadow-sm group cursor-crosshair flex items-center justify-center p-3 sm:p-5"
        >
          {/* BADGES (TOP-LEFT) */}
          <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2 pointer-events-none">
            {badges?.map((b) => (
              <Badge key={b} label={b} />
            ))}
          </div>

          {/* FAVORITE BUTTON (TOP-RIGHT) */}
          <div className="absolute top-4 right-4 z-20">
            <FavoriteButton
              productId={product.id}
              product={product}
              initialIsFavorite={isFavorite}
              onToggle={onFavoriteToggle}
            />
          </div>

          {/* LIGHTBOX / FULLSCREEN TRIGGER BUTTON */}
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            aria-label="Expand image fullscreen"
            className="absolute bottom-4 right-4 z-20 p-2.5 rounded-full bg-[#FAF7F2]/90 border border-[#D9C7A7]/60 text-[#382C26] hover:bg-[#7D2130] hover:text-[#FAF7F2] hover:border-[#7D2130] transition-colors shadow-xs opacity-0 group-hover:opacity-100 cursor-pointer hidden sm:flex items-center justify-center"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          {/* MAIN IMAGE WITH LENS ZOOM ON HOVER */}
          <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="relative w-full h-full"
              >
                <Image
                  src={wixDetailImage(activeImage)}
                  alt={title}
                  fill
                  priority
                  unoptimized={isWixImage(activeImage)}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className={cn(
                    'object-contain object-center transition-transform duration-200 ease-out pointer-events-none',
                    isZoomed && 'hidden lg:block'
                  )}
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== SOFT_IVORY_PLACEHOLDER) {
                      target.src = SOFT_IVORY_PLACEHOLDER;
                    }
                  }}
                  style={
                    isZoomed
                      ? {
                          transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                          transform: 'scale(2.2)',
                        }
                      : undefined
                  }
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* PREVIOUS & NEXT ARROWS */}
          {safeImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#FAF7F2]/90 text-[#382C26] border border-[#D9C7A7]/50 backdrop-blur-md hover:bg-[#7D2130] hover:text-white hover:border-[#7D2130] transition-all shadow-xs cursor-pointer opacity-0 group-hover:opacity-100 max-sm:opacity-80 z-20"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next image"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#FAF7F2]/90 text-[#382C26] border border-[#D9C7A7]/50 backdrop-blur-md hover:bg-[#7D2130] hover:text-white hover:border-[#7D2130] transition-all shadow-xs cursor-pointer opacity-0 group-hover:opacity-100 max-sm:opacity-80 z-20"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}

          {/* IMAGE COUNTER CAPSULE */}
          {safeImages.length > 1 && (
            <div className="absolute bottom-4 inset-x-0 flex items-center justify-center pointer-events-none z-20">
              <div className="flex items-center gap-1.5 bg-[#FAF7F2]/95 backdrop-blur-md px-3 py-1 rounded-full border border-[#D9C7A7]/60 shadow-2xs">
                <div className="flex items-center gap-1">
                  {safeImages.map((_, idx) => (
                    <span
                      key={idx}
                      className={cn(
                        'h-1 rounded-full transition-all duration-300',
                        idx === currentIndex ? 'bg-[#7D2130] w-3.5' : 'bg-[#736357]/40 w-1'
                      )}
                    />
                  ))}
                </div>
                <span className="text-[10px] font-medium text-[#736357] pl-1.5 border-l border-[#D9C7A7]/70 tracking-wider">
                  {currentIndex + 1} / {safeImages.length}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#2A221E]/95 backdrop-blur-lg flex items-center justify-center p-4 sm:p-8"
          >
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              aria-label="Close fullscreen view"
              className="absolute top-6 right-6 p-3 rounded-full bg-[#FAF7F2]/20 text-[#FAF7F2] hover:bg-[#FAF7F2] hover:text-[#382C26] transition-colors cursor-pointer z-50"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative w-full max-w-4xl max-h-[85vh] aspect-[3/4] flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={wixDetailImage(activeImage)}
                alt={title}
                className="max-w-full max-h-[85vh] object-contain rounded-lg"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== SOFT_IVORY_PLACEHOLDER) {
                    target.src = SOFT_IVORY_PLACEHOLDER;
                  }
                }}
              />
            </div>

            {safeImages.length > 1 && (
              <div className="absolute bottom-6 inset-x-0 flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="p-3 rounded-full bg-[#FAF7F2]/20 text-[#FAF7F2] hover:bg-[#FAF7F2] hover:text-[#382C26] transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-xs uppercase tracking-[0.25em] text-[#FAF7F2]">
                  {currentIndex + 1} / {safeImages.length}
                </span>
                <button
                  type="button"
                  onClick={handleNext}
                  className="p-3 rounded-full bg-[#FAF7F2]/20 text-[#FAF7F2] hover:bg-[#FAF7F2] hover:text-[#382C26] transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

ProductDetailGallery.displayName = 'ProductDetailGallery';
