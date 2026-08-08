'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LookbookSpread } from './lookbook.types';
import { BookPage } from './BookPage';
import { PAGE_FLIP_VARIANTS } from './lookbook.animations';
import { cn } from '@/lib/utils';

export interface PageFlipProps {
  spread: LookbookSpread;
  isFlipped?: boolean;
  className?: string;
}

export const PageFlip: React.FC<PageFlipProps> = ({ spread, isFlipped = false, className }) => {
  return (
    <div
      style={{ perspective: '2000px' }}
      className={cn('relative w-full h-full flex items-center justify-center', className)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={spread.id}
          variants={PAGE_FLIP_VARIANTS}
          initial="initial"
          animate={isFlipped ? 'flipped' : 'initial'}
          style={{ transformOrigin: 'left center', transformStyle: 'preserve-3d' }}
          className="w-full h-full relative"
        >
          <BookPage spread={spread} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

PageFlip.displayName = 'PageFlip';
