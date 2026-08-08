'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  ariaLabel: string;
  badgeCount?: number;
  showBadge?: boolean;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ children, className, ariaLabel, badgeCount, showBadge = false, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        aria-label={ariaLabel}
        className={cn(
          'relative flex items-center justify-center p-2 text-[#2A221E]/90 hover:text-[#7A1C28] transition-all duration-300 ease-silk hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#7A1C28]/40 rounded-full select-none cursor-pointer',
          className
        )}
        {...props}
      >
        {children}

        {/* Optional Badge Count Overlay */}
        {showBadge && (
          <span className="absolute top-0.5 right-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#7A1C28] px-1 text-[10px] font-medium text-[#FAF7F2] border border-[#C29F62]/50 shadow-xs pointer-events-none">
            {badgeCount !== undefined ? badgeCount : 0}
          </span>
        )}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
