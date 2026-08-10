'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface ProductInfoProps {
  name: string;
  material: string;
  className?: string;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ name, material, className }) => {
  return (
    <div className={cn('flex flex-col gap-1 text-left w-full pt-2', className)}>
      {/* Product Name (Bodoni Moda Serif) */}
      <h3 className="font-hero text-base sm:text-lg font-normal tracking-[0.04em] text-[#382C26] group-hover:text-[#7D2130] transition-colors duration-300 line-clamp-2 leading-snug">
        {name}
      </h3>

      {/* Material (Inter / Satoshi) */}
      <p className="font-sans text-xs font-light tracking-wide text-[#736357] line-clamp-1">
        {material}
      </p>
    </div>
  );
};

ProductInfo.displayName = 'ProductInfo';

