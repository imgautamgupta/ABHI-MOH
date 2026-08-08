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
        'font-satoshi text-base sm:text-lg font-semibold tracking-wide block text-left',
        className
      )}
      style={{ color: '#E5C388' }}
    >
      {amount}
    </span>
  );
};

Price.displayName = 'Price';
