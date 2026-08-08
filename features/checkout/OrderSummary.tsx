'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useCart } from '../cart/CartContext';
import { GIFT_BOX_OPTIONS } from './checkout.constants';
import { Price } from '../collections/components/Price';
import { cn } from '@/lib/utils';
import { ShieldCheck, Lock } from 'lucide-react';

export interface OrderSummaryProps {
  selectedBoxId?: string;
  isGiftDelivery?: boolean;
  onPaymentClick?: () => void;
  className?: string;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  selectedBoxId,
  isGiftDelivery = false,
  onPaymentClick,
  className,
}) => {
  const { items } = useCart();

  const subtotal = items.reduce((sum, item) => sum + item.priceNumber * item.quantity, 0);

  const selectedBox = GIFT_BOX_OPTIONS.find((b) => b.id === selectedBoxId) || GIFT_BOX_OPTIONS[0];
  const packagingFee = isGiftDelivery ? selectedBox.priceNumber : 0;
  const total = subtotal + packagingFee;

  const formattedSubtotal = `₹${subtotal.toLocaleString('en-IN')}`;
  const formattedPackaging = `₹${packagingFee.toLocaleString('en-IN')}`;
  const formattedTotal = `₹${total.toLocaleString('en-IN')}`;

  return (
    <div
      className={cn(
        'w-full bg-[#230C14]/85 backdrop-blur-[16px] border border-[#C89D5C]/30 rounded-lg p-6 sm:p-8 flex flex-col justify-between gap-6 font-satoshi text-left select-none shadow-2xl text-[#F6ECE1]',
        className
      )}
    >
      <div className="flex flex-col gap-4">
        {/* Title */}
        <div className="flex items-center justify-between border-b border-[#C89D5C]/25 pb-4">
          <h3 className="font-hero text-lg font-[500] uppercase tracking-[0.16em] text-[#E5C388]">
            Order Summary
          </h3>
          <span className="text-xs text-[#D0BEAB] font-light">
            {items.length} {items.length === 1 ? 'Piece' : 'Pieces'}
          </span>
        </div>

        {/* Product Items List */}
        <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto pr-1 divide-y divide-[#C89D5C]/20">
          {items.map((item) => (
            <div key={item.id} className="flex gap-3 pt-3 first:pt-0 items-center">
              <div className="relative w-14 h-18 aspect-[3/4] bg-[#1F0A10] rounded-md overflow-hidden border border-[#C89D5C]/30 flex-shrink-0">
                <Image
                  src={item.imageSrc}
                  alt={item.name}
                  fill
                  sizes="60px"
                  className="object-contain p-1 drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
                />
              </div>

              <div className="flex flex-col flex-grow text-xs gap-0.5 overflow-hidden">
                <span className="font-hero font-[500] text-[#F6ECE1] truncate">{item.name}</span>
                <span className="text-[10px] text-[#D0BEAB] font-light truncate">
                  {item.material} • Qty: {item.quantity}
                </span>
                <span className="font-satoshi text-xs font-semibold text-[#E5C388] mt-0.5">
                  {item.priceFormatted}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Price Calculations */}
        <div className="flex flex-col gap-2.5 pt-4 border-t border-[#C89D5C]/25 text-xs">
          <div className="flex items-center justify-between text-[#D0BEAB]">
            <span>Subtotal</span>
            <span className="text-[#F6ECE1] font-medium">{formattedSubtotal}</span>
          </div>

          {isGiftDelivery && (
            <div className="flex items-center justify-between text-[#D0BEAB]">
              <span>Packaging ({selectedBox.title})</span>
              <span className="text-[#E5C388] font-medium">{formattedPackaging}</span>
            </div>
          )}

          <div className="flex items-center justify-between text-[#D0BEAB]">
            <span>Shipping</span>
            <span className="text-[#E5C388] font-light">Complimentary Express</span>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-[#C89D5C]/25 text-sm">
            <span className="font-medium uppercase tracking-[0.16em] text-[#F6ECE1]">Total</span>
            <Price amount={formattedTotal} className="text-xl" />
          </div>
        </div>
      </div>

      {/* Button & Security Badge */}
      <div className="flex flex-col gap-3 pt-2">
        <motion.button
          type="button"
          whileTap={{ scale: 0.98 }}
          onClick={onPaymentClick}
          className="w-full py-4 rounded-full bg-gradient-to-r from-[#8C1C2A] via-[#A32233] to-[#7A1523] text-[#F6ECE1] border border-[#C89D5C]/35 hover:border-[#C89D5C]/70 font-medium text-xs uppercase tracking-[0.2em] transition-all duration-300 ease-silk shadow-lg hover:shadow-xl cursor-pointer flex items-center justify-center gap-2"
        >
          <Lock className="w-3.5 h-3.5 text-[#E5C388]" />
          <span>Continue To Payment</span>
        </motion.button>

        <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-[#D0BEAB]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#C89D5C]" />
          <span>Encrypted Luxury Concierge Checkout</span>
        </div>
      </div>
    </div>
  );
};

OrderSummary.displayName = 'OrderSummary';
