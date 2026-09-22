'use client';

import React from 'react';
import { X } from 'lucide-react';
import { CART_COPY } from './cart.constants';

export interface CartHeaderProps {
  itemCount: number;
  onClose: () => void;
}

export const CartHeader: React.FC<CartHeaderProps> = ({ itemCount, onClose }) => {
  return (
    <div className="flex items-center justify-between px-6 lg:px-8 py-5 border-b border-[#D9C7A7]/40 bg-[#FAF7F2] font-satoshi select-none">
      {/* Title & Item Count */}
      <div className="flex items-baseline gap-2.5">
        <h2 className="font-hero text-xl sm:text-2xl font-normal tracking-[0.1em] uppercase text-[#7D2130]">
          {CART_COPY.headerTitle}
        </h2>
        <span className="font-sans text-xs font-light tracking-wider text-[#736357]">
          ({itemCount} {itemCount === 1 ? 'Piece' : 'Pieces'})
        </span>
      </div>

      {/* Close Icon Button */}
      <button
        type="button"
        onClick={onClose}
        className="p-2 text-[#736357] hover:text-[#7D2130] transition-colors rounded-full hover:bg-[#7D2130]/10 focus:outline-none cursor-pointer"
        aria-label="Close shopping bag"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};

CartHeader.displayName = 'CartHeader';
