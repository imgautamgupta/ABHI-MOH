'use client';

import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import type { SareeProduct } from './components/hanging-card.types';
import { HangingCard } from './components/HangingCard';

export interface CollectionsGridProps {
  products: SareeProduct[];
  onResetCategory?: () => void;
}

export const CollectionsGrid: React.FC<CollectionsGridProps> = ({ products, onResetCategory }) => {
  if (products.length === 0) {
    return (
      <div className="w-full py-24 px-4 flex flex-col items-center justify-center text-center font-satoshi">
        <div className="w-12 h-12 rounded-full border border-[#D9C7A7]/60 flex items-center justify-center mb-4 text-[#7D2130] bg-[#FAF7F2]/90 shadow-2xs">
          <Sparkles className="w-5 h-5" />
        </div>
        <h2 className="font-hero text-2xl sm:text-3xl text-[#382C26] font-normal tracking-[0.08em] mb-2">
          No pieces found
        </h2>
        <p className="text-xs uppercase tracking-[0.2em] text-[#736357] max-w-sm mb-6 leading-relaxed">
          There are currently no sarees matching this selection.
        </p>
        {onResetCategory && (
          <button
            type="button"
            onClick={onResetCategory}
            className="px-6 py-3 border border-[#7D2130] bg-[#7D2130] text-[#FAF7F2] text-xs uppercase tracking-[0.22em] font-medium rounded-xs hover:bg-[#5E1522] transition-colors duration-300 shadow-sm cursor-pointer"
          >
            Explore Collection
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 items-start">
      <AnimatePresence mode="popLayout">
        {products.map((product) => (
          <HangingCard key={product.id} product={product} />
        ))}
      </AnimatePresence>
    </div>
  );
};

CollectionsGrid.displayName = 'CollectionsGrid';

