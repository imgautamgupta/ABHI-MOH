'use client';

import React from 'react';
import { CART_COPY } from './cart.constants';

export interface OrderSummaryProps {
  subtotal: number;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ subtotal }) => {
  const formattedSubtotal = `₹${subtotal.toLocaleString('en-IN')}`;

  return (
    <div className="flex flex-col gap-2.5 py-3 border-t border-[#D9C7A7]/40 font-satoshi text-xs tracking-wider select-none">
      {/* Subtotal */}
      <div className="flex items-center justify-between text-[#736357]">
        <span className="font-light">{CART_COPY.subtotalLabel}</span>
        <span className="text-[#382C26] font-medium">{formattedSubtotal}</span>
      </div>

      {/* Shipping */}
      <div className="flex items-center justify-between text-[#736357]">
        <span className="font-light">{CART_COPY.shippingLabel}</span>
        <span className="text-[#7D2130] font-medium">{CART_COPY.shippingValue}</span>
      </div>

      {/* Estimated Total */}
      <div className="flex items-center justify-between pt-2.5 border-t border-[#D9C7A7]/40 font-medium text-sm">
        <span className="text-[#382C26] uppercase tracking-[0.16em] text-xs font-semibold">
          {CART_COPY.totalLabel}
        </span>
        <span className="font-hero text-xl font-medium text-[#7D2130]">
          {formattedSubtotal}
        </span>
      </div>
    </div>
  );
};

OrderSummary.displayName = 'OrderSummary';
