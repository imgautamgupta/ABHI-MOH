'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SortDropdown } from './SortDropdown';
import { SortOption } from './collections.types';
import { cn } from '@/lib/utils';

export type CategoryFilter = 'ALL' | 'NEW ARRIVALS' | 'HANDWOVEN' | 'SILK' | 'ZARI' | 'FESTIVE' | 'LIMITED EDITION';

const CATEGORIES: CategoryFilter[] = [
  'ALL',
  'NEW ARRIVALS',
  'HANDWOVEN',
  'SILK',
  'ZARI',
  'FESTIVE',
  'LIMITED EDITION',
];

export interface CollectionsFilterBarProps {
  activeCategory: CategoryFilter;
  onSelectCategory: (category: CategoryFilter) => void;
  selectedSort: SortOption;
  onSelectSort: (sort: SortOption) => void;
  itemCount: number;
}

export const CollectionsFilterBar: React.FC<CollectionsFilterBarProps> = ({
  activeCategory,
  onSelectCategory,
  selectedSort,
  onSelectSort,
  itemCount,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
      className="w-full flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 py-4 border-b border-[#D9C7A7]/40 mb-12 font-satoshi"
    >
      {/* LEFT: Category Navigation Tabs */}
      <div
        className="flex items-center gap-4 sm:gap-6 md:gap-8 overflow-x-auto no-scrollbar py-1 text-xs uppercase tracking-[0.16em] sm:tracking-[0.2em]"
        style={{ touchAction: 'pan-x' }}
      >
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => onSelectCategory(cat)}
              className={cn(
                'relative py-2 font-medium transition-colors duration-300 whitespace-nowrap cursor-pointer select-none focus:outline-none focus-visible:text-[#7D2130] min-h-[44px] flex items-center',
                isActive ? 'text-[#7D2130]' : 'text-[#736357] hover:text-[#382C26]'
              )}
            >
              <span>{cat}</span>
              {isActive && (
                <motion.div
                  layoutId="activeCategoryBorder"
                  className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#7D2130]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* RIGHT: Count & Sort Dropdown */}
      <div className="flex items-center justify-between md:justify-end gap-6 self-stretch md:self-auto flex-shrink-0">
        <span className="text-[11px] uppercase tracking-[0.22em] text-[#736357]/80 font-light">
          {itemCount} {itemCount === 1 ? 'Design' : 'Designs'}
        </span>
        <SortDropdown selectedOption={selectedSort} onSelectOption={onSelectSort} />
      </div>
    </motion.div>
  );
};

CollectionsFilterBar.displayName = 'CollectionsFilterBar';
