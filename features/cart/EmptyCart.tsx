'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { CART_COPY } from './cart.constants';

export interface EmptyCartProps {
  onClose: () => void;
}

export const EmptyCart: React.FC<EmptyCartProps> = ({ onClose }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 my-auto font-satoshi select-none">
      {/* Luxury Thin Line Illustration */}
      <div className="w-20 h-20 rounded-full bg-[#230C14] border border-[#C89D5C]/30 flex items-center justify-center mb-6 shadow-md">
        <ShoppingBag className="w-8 h-8 text-[#C89D5C] stroke-[1.25]" />
      </div>

      {/* Heading */}
      <h3 className="font-hero text-2xl font-[500] uppercase tracking-[0.18em] text-[#F6ECE1]">
        {CART_COPY.emptyTitle}
      </h3>

      {/* Subtitle */}
      <p className="mt-2 font-sans text-xs font-light tracking-wide text-[#D0BEAB]/80 max-w-xs leading-relaxed">
        {CART_COPY.emptySubtitle}
      </p>

      {/* Continue Shopping Button */}
      <Link href="/collections" onClick={onClose} className="mt-8">
        <button
          type="button"
          className="px-8 py-3.5 rounded-full border border-[#C89D5C]/40 hover:border-[#C89D5C] text-[#E5C388] font-medium text-xs uppercase tracking-[0.2em] transition-all duration-300 ease-silk hover:bg-[#C89D5C]/10 cursor-pointer focus:outline-none"
        >
          {CART_COPY.continueShoppingBtn}
        </button>
      </Link>
    </div>
  );
};

EmptyCart.displayName = 'EmptyCart';
