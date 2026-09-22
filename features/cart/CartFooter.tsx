'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { CART_COPY } from './cart.constants';
import { OrderSummary } from './OrderSummary';

export interface CartFooterProps {
  subtotal: number;
  onClose: () => void;
  onCheckout?: () => void;
}

export const CartFooter: React.FC<CartFooterProps> = ({ subtotal, onClose, onCheckout }) => {
  return (
    <div className="px-6 lg:px-8 pt-3 pb-8 border-t border-[#D9C7A7]/40 bg-[#FAF7F2] font-satoshi flex flex-col gap-3.5 select-none">
      {/* Order Summary Calculation */}
      <OrderSummary subtotal={subtotal} />

      {/* Buttons */}
      <div className="flex flex-col gap-2.5">
        {/* Proceed To Checkout Primary Velvet Maroon Button */}
        <Link href="/checkout" onClick={onClose} className="w-full">
          <motion.button
            type="button"
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 rounded-xs bg-[#7D2130] hover:bg-[#5E1522] text-[#FAF7F2] border border-[#7D2130] font-medium text-xs uppercase tracking-[0.22em] transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer focus:outline-none flex items-center justify-center gap-2"
          >
            <span>{CART_COPY.checkoutBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </Link>

        {/* Continue Shopping / Explore Collection Link */}
        <Link href="/collections" onClick={onClose} className="w-full">
          <button
            type="button"
            className="w-full py-3 rounded-xs border border-[#D9C7A7]/70 hover:border-[#7D2130] text-[#736357] hover:text-[#7D2130] font-light text-xs uppercase tracking-[0.2em] transition-colors duration-300 cursor-pointer focus:outline-none bg-transparent"
          >
            {CART_COPY.continueShoppingBtn}
          </button>
        </Link>
      </div>

      {/* Trust Micro-Text */}
      <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#736357]/80 uppercase tracking-widest pt-1">
        <ShieldCheck className="w-3.5 h-3.5 text-[#7D2130]" />
        <span>Complimentary Insured Shipping Across India</span>
      </div>
    </div>
  );
};

CartFooter.displayName = 'CartFooter';
