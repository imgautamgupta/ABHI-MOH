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
    <div className="flex items-center justify-between px-6 lg:px-8 py-6 border-b border-[#E8DFD5] font-satoshi">
      {/* Title & Item Count */}
      <div className="flex items-baseline gap-3">
        <h2 className="font-hero text-2xl sm:text-3xl font-[500] tracking-[0.16em] uppercase text-[#7A1C28]">
          {CART_COPY.headerTitle}
        </h2>
        <span className="font-sans text-xs font-medium tracking-wider text-[#6E645A]">
          ({itemCount} {itemCount === 1 ? 'Item' : 'Items'})
        </span>
      </div>

      {/* Close Icon Button */}
      <button
        type="button"
        onClick={onClose}
        className="p-2 text-[#6E645A] hover:text-[#7A1C28] transition-colors duration-300 rounded-full hover:bg-[#F3ECE3] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#7A1C28] cursor-pointer"
        aria-label="Close Shopping Bag"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};

CartHeader.displayName = 'CartHeader';
