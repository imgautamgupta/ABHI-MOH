'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface PriceProps {
  amount: string;
  className?: string;
}

export const Price: React.FC<PriceProps> = ({ amount, className }) => {
  return (
    <span
      className={cn(
        'font-hero text-[#7D2130] text-base sm:text-lg font-medium tracking-wide block text-left mt-1',
        className
      )}
    >
      {amount}
    </span>
  );
};

Price.displayName = 'Price';

