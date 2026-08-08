'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CART_COPY } from './cart.constants';
import { OrderSummary } from './OrderSummary';

export interface CartFooterProps {
  subtotal: number;
  onClose: () => void;
  onCheckout?: () => void;
}

export const CartFooter: React.FC<CartFooterProps> = ({ subtotal, onClose, onCheckout }) => {
  return (
    <div className="px-6 lg:px-8 pt-4 pb-8 border-t border-[#E8DFD5] bg-[#FAF7F2] font-satoshi flex flex-col gap-4">
      {/* Order Summary Calculation */}
      <OrderSummary subtotal={subtotal} />

      {/* Buttons */}
      <div className="flex flex-col gap-3">
        {/* Proceed To Checkout Primary Velvet Maroon Button */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.98 }}
          onClick={onCheckout}
          className="w-full py-4 rounded-full bg-[#7A1C28] hover:bg-[#63141F] text-[#FAF7F2] border border-[#C29F62]/30 font-medium text-xs uppercase tracking-[0.22em] transition-all duration-300 ease-silk shadow-md hover:shadow-lg cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#7A1C28]"
        >
          {CART_COPY.checkoutBtn}
        </motion.button>

        {/* Continue Shopping Outline Button */}
        <button
          type="button"
          onClick={onClose}
          className="w-full py-3 rounded-full border border-[#E8DFD5] hover:border-[#7A1C28] text-[#6E645A] hover:text-[#7A1C28] font-normal text-xs uppercase tracking-[0.2em] transition-colors duration-300 cursor-pointer focus:outline-none"
        >
          {CART_COPY.continueShoppingBtn}
        </button>
      </div>
    </div>
  );
};

CartFooter.displayName = 'CartFooter';
