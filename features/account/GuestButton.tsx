'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface GuestButtonProps {
  onClick?: () => void;
  className?: string;
}

export const GuestButton: React.FC<GuestButtonProps> = ({ onClick, className }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'w-full py-3 px-5 rounded-sm border border-borders hover:border-warm-cream/50 bg-transparent text-secondary-text hover:text-warm-cream font-satoshi text-xs font-light uppercase tracking-[0.2em] transition-all duration-300 ease-silk select-none cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-warm-cream/50',
        className
      )}
    >
      Continue As Guest
    </button>
  );
};

GuestButton.displayName = 'GuestButton';
