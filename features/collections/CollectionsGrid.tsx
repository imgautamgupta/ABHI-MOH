'use client';

import React from 'react';
import { HANGING_CARD_DATASET } from './components/hanging-card.constants';
import { HangingCard } from './components/HangingCard';

export const CollectionsGrid: React.FC = () => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14 xl:gap-16 justify-items-center">
      {HANGING_CARD_DATASET.map((product) => (
        <HangingCard key={product.id} product={product} />
      ))}
    </div>
  );
};

CollectionsGrid.displayName = 'CollectionsGrid';
