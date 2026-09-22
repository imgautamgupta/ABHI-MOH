'use client';

import React from 'react';
import { BadgeType } from './hanging-card.types';
import { cn } from '@/lib/utils';

export interface BadgeProps {
  label: BadgeType;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ label, className }) => {
  const isSale = label === 'Sale';
  const isNew = label === 'New Arrival';

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-[0.22em] font-medium backdrop-blur-md select-none shadow-2xs transition-colors',
        isSale
          ? 'bg-[#7D2130] text-[#FAF7F2] border border-[#7D2130] font-semibold'
          : isNew
          ? 'bg-[#FAF7F2]/95 text-[#7D2130] border border-[#C29F62]/70 font-semibold'
          : 'bg-[#FAF7F2]/90 text-[#7D2130] border border-[#D9C7A7]/50',
        className
      )}
    >
      {label}
    </span>
  );
};

Badge.displayName = 'Badge';

