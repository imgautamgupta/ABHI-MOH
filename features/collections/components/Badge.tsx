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
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-[0.22em] font-medium bg-[#A32233]/25 text-[#E5C388] border border-[#C89D5C]/40 backdrop-blur-md select-none shadow-sm',
        className
      )}
    >
      {label}
    </span>
  );
};

Badge.displayName = 'Badge';
