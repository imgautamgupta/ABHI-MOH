'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ImageNavigatorProps {
  onPrev: (e: React.MouseEvent) => void;
  onNext: (e: React.MouseEvent) => void;
  hasPrev: boolean;
  hasNext: boolean;
  className?: string;
}

export const ImageNavigator: React.FC<ImageNavigatorProps> = ({
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  className,
}) => {
  return (
    <div
      className={cn(
        // On mobile: always visible (opacity-100) so touch users can tap
        // On desktop: only on hover
        'absolute inset-x-2 top-1/2 -translate-y-1/2 flex items-center justify-between pointer-events-none z-20',
        // Mobile (< sm): show at 60% opacity so user knows arrows exist
        'opacity-60 sm:opacity-0 sm:group-hover/img:opacity-100 transition-opacity duration-300',
        className
      )}
    >
      {/* PREVIOUS IMAGE ARROW */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onPrev(e);
        }}
        disabled={!hasPrev}
        aria-label="Previous Image"
        className={cn(
          // Larger touch target on mobile (44×44), smaller on sm+
          'w-9 h-9 sm:w-7 sm:h-7 flex items-center justify-center rounded-full bg-[#FAF7F2]/90 text-[#382C26] border border-[#D9C7A7]/50 backdrop-blur-md transition-all duration-300 pointer-events-auto hover:bg-[#7D2130] hover:text-[#FAF7F2] hover:border-[#7D2130] focus:outline-none shadow-xs cursor-pointer',
          !hasPrev && 'opacity-0 pointer-events-none'
        )}
      >
        <ChevronLeft className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
      </button>

      {/* NEXT IMAGE ARROW */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onNext(e);
        }}
        disabled={!hasNext}
        aria-label="Next Image"
        className={cn(
          'w-9 h-9 sm:w-7 sm:h-7 flex items-center justify-center rounded-full bg-[#FAF7F2]/90 text-[#382C26] border border-[#D9C7A7]/50 backdrop-blur-md transition-all duration-300 pointer-events-auto hover:bg-[#7D2130] hover:text-[#FAF7F2] hover:border-[#7D2130] focus:outline-none shadow-xs cursor-pointer',
          !hasNext && 'opacity-0 pointer-events-none'
        )}
      >
        <ChevronRight className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
      </button>
    </div>
  );
};

ImageNavigator.displayName = 'ImageNavigator';
