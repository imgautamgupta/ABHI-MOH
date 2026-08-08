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
        'absolute inset-x-2 top-1/2 -translate-y-1/2 flex items-center justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20',
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
          'p-2 rounded-full bg-black/40 text-white backdrop-blur-sm transition-all duration-300 pointer-events-auto hover:bg-black/70 hover:scale-110 active:scale-95 disabled:opacity-0 disabled:pointer-events-none focus:outline-none',
          !hasPrev && 'opacity-0 pointer-events-none'
        )}
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* NEXT IMAGE ARROW */}
      <button
        type="button"
        onClick={onNext}
        disabled={!hasNext}
        aria-label="Next Image"
        className={cn(
          'p-2 rounded-full bg-black/40 text-white backdrop-blur-sm transition-all duration-300 pointer-events-auto hover:bg-black/70 hover:scale-110 active:scale-95 disabled:opacity-0 disabled:pointer-events-none focus:outline-none',
          !hasNext && 'opacity-0 pointer-events-none'
        )}
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

ImageNavigator.displayName = 'ImageNavigator';
