'use client';

import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface EditionPaginationProps {
  currentVolume: number;
  totalVolumes: number;
  onPrevVolume?: () => void;
  onNextVolume?: () => void;
}

export const EditionPagination: React.FC<EditionPaginationProps> = ({
  currentVolume = 1,
  totalVolumes = 2,
  onPrevVolume,
  onNextVolume,
}) => {
  const hasPrev = currentVolume > 1;
  const hasNext = currentVolume < totalVolumes;

  return (
    <div className="w-full py-16 lg:py-24 bg-[#FAF7F2] border-t border-[#D9C7A7]/40 text-[#382C26] font-satoshi">
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
        {/* PREVIOUS EDITION BUTTON */}
        <button
          type="button"
          onClick={onPrevVolume}
          disabled={!hasPrev}
          className={cn(
            'group inline-flex items-center gap-2.5 text-xs uppercase tracking-[0.2em] font-medium transition-colors duration-300 select-none cursor-pointer focus:outline-none',
            hasPrev ? 'text-[#7D2130] hover:text-[#382C26]' : 'text-[#736357]/40 cursor-not-allowed'
          )}
        >
          <ArrowLeft className={cn('w-3.5 h-3.5 transition-transform duration-300', hasPrev && 'group-hover:-translate-x-1')} />
          <span>PREVIOUS EDITION</span>
        </button>

        {/* VOLUME COUNTER */}
        <span className="text-xs uppercase tracking-[0.25em] text-[#736357] font-light">
          VOLUME 0{currentVolume} / 0{totalVolumes}
        </span>

        {/* NEXT EDITION BUTTON */}
        <button
          type="button"
          onClick={onNextVolume}
          disabled={!hasNext}
          className={cn(
            'group inline-flex items-center gap-2.5 text-xs uppercase tracking-[0.2em] font-medium transition-colors duration-300 select-none cursor-pointer focus:outline-none',
            hasNext ? 'text-[#7D2130] hover:text-[#382C26]' : 'text-[#736357]/40 cursor-not-allowed'
          )}
        >
          <span>NEXT EDITION</span>
          <ArrowRight className={cn('w-3.5 h-3.5 transition-transform duration-300', hasNext && 'group-hover:translate-x-1')} />
        </button>
      </div>
    </div>
  );
};

EditionPagination.displayName = 'EditionPagination';
