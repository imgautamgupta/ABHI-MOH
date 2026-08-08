'use client';

import React from 'react';
import { CART_COPY } from './cart.constants';

export interface OrderSummaryProps {
  subtotal: number;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ subtotal }) => {
  const formattedSubtotal = `₹${subtotal.toLocaleString('en-IN')}`;

  return (
    <div className="flex flex-col gap-3 py-4 border-t border-[#E8DFD5] font-satoshi text-xs tracking-wider">
      {/* Subtotal */}
      <div className="flex items-center justify-between text-[#6E645A]">
        <span>{CART_COPY.subtotalLabel}</span>
        <span className="text-[#2A221E] font-medium">{formattedSubtotal}</span>
      </div>

      {/* Shipping */}
      <div className="flex items-center justify-between text-[#6E645A]">
        <span>{CART_COPY.shippingLabel}</span>
        <span className="text-[#7A1C28] font-medium">{CART_COPY.shippingValue}</span>
      </div>

      {/* Estimated Total */}
      <div className="flex items-center justify-between pt-2 border-t border-[#E8DFD5] font-medium text-sm">
        <span className="text-[#2A221E] uppercase tracking-[0.18em]">
          {CART_COPY.totalLabel}
        </span>
        <span className="text-lg font-bold text-[#7A1C28]">
          {formattedSubtotal}
        </span>
      </div>
    </div>
  );
};

OrderSummary.displayName = 'OrderSummary';
