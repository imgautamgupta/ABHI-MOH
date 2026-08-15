'use client';

import React from 'react';
import { AnimatePresence } from 'framer-motion';
import type { SareeProduct } from './components/hanging-card.types';
import { HangingCard } from './components/HangingCard';

export interface CollectionsGridProps {
  products: SareeProduct[];
}

export const CollectionsGrid: React.FC<CollectionsGridProps> = ({ products }) => {
  if (products.length === 0) {
    return (
      <div className="w-full py-20 flex flex-col items-center justify-center text-center font-satoshi">
        <p className="font-hero text-2xl text-[#382C26] mb-2">No Sarees Found</p>
        <p className="text-xs uppercase tracking-widest text-[#736357]">
          Try selecting another category filter above.
        </p>
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
