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
    <div className={cn('flex flex-col gap-1 text-left w-full', className)}>
      {/* Product Name (Bodoni Moda, Warm Champagne Ivory) */}
      <h3 className="font-hero text-base sm:text-lg font-[500] tracking-[0.08em] text-[#F6ECE1] group-hover:text-[#E5C388] transition-colors duration-300 line-clamp-1">
        {name}
      </h3>

      {/* Material (Inter, Warm Taupe / Champagne) */}
      <p className="font-sans text-xs font-light tracking-wider text-[#D0BEAB]/85 line-clamp-1">
        {material}
      </p>
    </div>
  );
};

ProductInfo.displayName = 'ProductInfo';
