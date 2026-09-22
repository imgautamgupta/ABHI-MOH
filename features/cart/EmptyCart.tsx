'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { CART_COPY } from './cart.constants';

export interface EmptyCartProps {
  onClose: () => void;
}

export const EmptyCart: React.FC<EmptyCartProps> = ({ onClose }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-6 my-auto font-satoshi select-none">
      {/* Luxury Thin Line Icon Capsule */}
      <div className="w-20 h-20 rounded-full bg-[#FAF7F2] border border-[#D9C7A7]/60 flex items-center justify-center mb-6 shadow-xs">
        <ShoppingBag className="w-8 h-8 text-[#7D2130] stroke-[1.25]" />
      </div>

      {/* Heading */}
      <h3 className="font-hero text-2xl sm:text-3xl font-normal tracking-[0.06em] text-[#382C26]">
        {CART_COPY.emptyTitle}
      </h3>

      {/* Subtitle */}
      <p className="mt-2.5 font-sans text-xs sm:text-sm font-light tracking-wide text-[#736357] max-w-xs leading-relaxed">
        {CART_COPY.emptySubtitle}
      </p>

      {/* Explore Collection Button */}
      <Link href="/collections" onClick={onClose} className="mt-8">
        <button
          type="button"
          className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xs bg-[#7D2130] hover:bg-[#5E1522] text-[#FAF7F2] border border-[#7D2130] font-medium text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer focus:outline-none"
        >
          <span>{CART_COPY.continueShoppingBtn}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </Link>
    </div>
  );
};

EmptyCart.displayName = 'EmptyCart';
