'use client';

import React from 'react';
import { BadgeType } from './hanging-card.types';
import { cn } from '@/lib/utils';

export interface BadgeProps {
  label: BadgeType;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ label, className }) => {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-[9px] uppercase tracking-[0.22em] font-medium bg-[#FAF7F2]/90 text-[#7D2130] border border-[#D9C7A7]/50 backdrop-blur-md select-none shadow-2xs',
        className
      )}
    >
      {label}
    </span>
  );
};

Badge.displayName = 'Badge';

