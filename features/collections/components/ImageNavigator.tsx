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
        'absolute inset-x-2 top-1/2 -translate-y-1/2 flex items-center justify-between pointer-events-none opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 z-20 hidden sm:flex',
        className
      )}
    >
      {/* PREVIOUS IMAGE ARROW */}
      <button
        type="button"
        onClick={onPrev}
        disabled={!hasPrev}
        aria-label="Previous Image"
        className={cn(
          'p-1.5 rounded-full bg-[#FAF7F2]/90 text-[#382C26] border border-[#D9C7A7]/50 backdrop-blur-md transition-all duration-300 pointer-events-auto hover:bg-[#7D2130] hover:text-[#FAF7F2] hover:border-[#7D2130] disabled:opacity-0 disabled:pointer-events-none focus:outline-none shadow-xs',
          !hasPrev && 'opacity-0 pointer-events-none'
        )}
      >
        <ChevronLeft className="w-3.5 h-3.5" />
      </button>

      {/* NEXT IMAGE ARROW */}
      <button
        type="button"
        onClick={onNext}
        disabled={!hasNext}
        aria-label="Next Image"
        className={cn(
          'p-1.5 rounded-full bg-[#FAF7F2]/90 text-[#382C26] border border-[#D9C7A7]/50 backdrop-blur-md transition-all duration-300 pointer-events-auto hover:bg-[#7D2130] hover:text-[#FAF7F2] hover:border-[#7D2130] disabled:opacity-0 disabled:pointer-events-none focus:outline-none shadow-xs',
          !hasNext && 'opacity-0 pointer-events-none'
        )}
      >
        <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

ImageNavigator.displayName = 'ImageNavigator';

