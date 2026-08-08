'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, RotateCcw } from 'lucide-react';
import { LookbookSpread } from './lookbook.types';
import { BookPage } from './BookPage';
import { cn } from '@/lib/utils';

export const LOOKBOOK_DATASET: LookbookSpread[] = [
  {
    id: 'spread-01',
    spreadNumber: 1,
    title: 'The Royal Heritage Edition',
    leftItem: {
      title: 'The Crimson Monarchy',
      image: '/assets/sarees/saree-maroon.png',
      material: 'Pure Kanjivaram Mulberry Silk',
      craft: 'Zardozi Hand Embroidery & Real Gold Thread',
      color: 'Royal Velvet Maroon & Antique Gold',
      collection: 'Haute Couture Volume I',
      shortDescription: 'Inspired by the regal palaces of Rajasthan, this deep maroon silk drape features hand-embroidered gold zardozi motifs passed down through master artisans.',
    },
    rightItem: {
      title: 'Swarna Tissue Majesty',
      image: '/assets/sarees/saree-gold.png',
      material: 'Chanderi Tissue Silk',
      craft: 'Brocade Jacquard & Pure Gold Zari Weave',
      color: 'Champagne Gold & Warm Amber',
      collection: 'Haute Couture Volume I',
      shortDescription: 'A timeless celebration of pure gold zari work woven into tissue silk. Each thread reflects ambient light with a soft metallic luminescence.',
    },
  },
  {
    id: 'spread-02',
    spreadNumber: 2,
    title: 'Imperial Evening Serenade',
    leftItem: {
      title: 'Velvet Nocturne',
      image: '/assets/sarees/saree-maroon.png',
      material: 'Raw Mulberry Silk',
      craft: 'Jamdani Handloom Weave',
      color: 'Obsidian Velvet Maroon',
      collection: 'Haute Couture Volume I',
      shortDescription: 'Crafted for intimate evening soirées, combining dark obsidian maroon borders with delicate floral motifs embroidered in fine gold wire.',
    },
    rightItem: {
      title: 'Crown Swarnachari',
      image: '/assets/sarees/saree-gold.png',
      material: 'Swarnachari Brocade Silk',
      craft: 'Shuttle Meenakari Handwork',
      color: 'Gilded Champagne & Metallic Gold',
      collection: 'Haute Couture Volume I',
      shortDescription: 'The pinnacle of haute couture saree weaving, featuring mythological narratives woven into pure gold pallu panels using wooden shuttle techniques.',
    },
  },
];

export const Magazine: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSpreadIndex, setActiveSpreadIndex] = useState(0);
  const touchStartXRef = useRef<number | null>(null);

  const totalSpreads = LOOKBOOK_DATASET.length;

  const handleNext = useCallback(() => {
    if (!isOpen) {
      setIsOpen(true);
    } else if (activeSpreadIndex < totalSpreads - 1) {
      setActiveSpreadIndex((prev) => prev + 1);
    }
  }, [isOpen, activeSpreadIndex, totalSpreads]);

  const handlePrev = useCallback(() => {
    if (activeSpreadIndex > 0) {
      setActiveSpreadIndex((prev) => prev - 1);
    } else if (activeSpreadIndex === 0 && isOpen) {
      setIsOpen(false);
    }
  }, [activeSpreadIndex, isOpen]);

  // Scroll wheel listener (Each scroll turns ONE spread)
  useEffect(() => {
    let lastWheelTime = 0;
    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastWheelTime < 600) return;

      if (e.deltaY > 20) {
        lastWheelTime = now;
        handleNext();
      } else if (e.deltaY < -20) {
        lastWheelTime = now;
        handlePrev();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [handleNext, handlePrev]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Mobile Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartXRef.current - touchEndX;

    if (diffX > 40) {
      handleNext();
    } else if (diffX < -40) {
      handlePrev();
    }
    touchStartXRef.current = null;
  };

  const currentSpread = LOOKBOOK_DATASET[activeSpreadIndex];

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full max-w-[1400px] flex flex-col items-center justify-center font-satoshi select-none"
    >
      {/* SEAMLESS MAGAZINE SPREAD */}
      <div className="w-full relative z-10">
        <BookPage spread={currentSpread} />

        {/* READER CONTROLS BAR (FLOATING BELOW SPREAD) */}
        <div className="flex items-center justify-between w-full mt-10 px-2 z-40">
          {/* Prev Button */}
          <button
            type="button"
            onClick={handlePrev}
            disabled={activeSpreadIndex === 0}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1C0A10]/90 border border-[#C89D5C]/35 hover:border-[#C89D5C] text-xs font-medium uppercase tracking-widest text-[#D0BEAB] hover:text-[#E5C388] transition-all duration-300 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed shadow-md"
          >
            <ChevronLeft className="w-4 h-4 text-[#C89D5C]" />
            <span>Previous Edition</span>
          </button>

          {/* Spread Indicator */}
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] font-light text-[#E5C388] bg-[#1C0A10]/90 backdrop-blur-md px-5 py-2.5 rounded-full border border-[#C89D5C]/35 shadow-md">
            <BookOpen className="w-4 h-4 text-[#C89D5C]" />
            <span>Edition {activeSpreadIndex + 1} / {totalSpreads}</span>
          </div>

          {/* Next Button */}
          <button
            type="button"
            onClick={handleNext}
            disabled={activeSpreadIndex === totalSpreads - 1}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1C0A10]/90 border border-[#C89D5C]/35 hover:border-[#C89D5C] text-xs font-medium uppercase tracking-widest text-[#D0BEAB] hover:text-[#E5C388] transition-all duration-300 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed shadow-md"
          >
            <span>Next Edition</span>
            <ChevronRight className="w-4 h-4 text-[#C89D5C]" />
          </button>
        </div>
      </div>
    </div>
  );
};

Magazine.displayName = 'Magazine';
