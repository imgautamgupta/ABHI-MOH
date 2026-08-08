'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { BUTTON_HOVER_TRANSITION } from './hero.animations';

export interface HeroButtonProps {
  text: string;
  href?: string;
  className?: string;
}

export const HeroButton: React.FC<HeroButtonProps> = ({
  text,
  href = '/collections',
  className,
}) => {
  return (
    <Link href={href} className="inline-block focus:outline-none">
      <motion.button
        type="button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={BUTTON_HOVER_TRANSITION}
        className={cn(
          'inline-flex items-center justify-center bg-[#7A1C28] hover:bg-[#63141F] text-[#FAF7F2] font-satoshi font-medium text-xs md:text-sm tracking-[0.22em] uppercase px-9 py-4 rounded-full border border-[#C29F62]/30 shadow-md hover:shadow-xl transition-all duration-300 ease-silk select-none cursor-pointer focus-visible:ring-1 focus-visible:ring-[#7A1C28]',
          className
        )}
        aria-label={text}
      >
        {text}
      </motion.button>
    </Link>
  );
};

HeroButton.displayName = 'HeroButton';
