'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useCart } from '../cart/CartContext';
import { GIFT_BOX_OPTIONS } from './checkout.constants';
import { Price } from '../collections/components/Price';
import { CheckoutStep } from './checkout.types';
import { cn } from '@/lib/utils';
import { ShieldCheck, Lock, ArrowRight } from 'lucide-react';

export interface OrderSummaryProps {
  selectedBoxId?: string;
  isGiftDelivery?: boolean;
  currentStep?: CheckoutStep;
  onNextStep?: () => void;
  onPaymentClick?: () => void;
  className?: string;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  selectedBoxId,
  isGiftDelivery = false,
  currentStep = 1,
  onNextStep,
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

  const handleAction = () => {
    if (currentStep === 4) {
      if (onPaymentClick) onPaymentClick();
    } else {
      if (onNextStep) onNextStep();
    }
  };

  const getButtonText = () => {
    if (currentStep === 1) return 'Continue To Delivery';
    if (currentStep === 2) return isGiftDelivery ? 'Continue To Gift Experience' : 'Continue To Review';
    if (currentStep === 3) return 'Continue To Review';
    return 'Place Order';
  };

  return (
    <div
      className={cn(
        'w-full bg-white border border-[#E8DFD5] rounded-2xl p-5 sm:p-7 flex flex-col justify-between gap-6 font-satoshi text-left select-none shadow-sm text-[#2A221E]',
        className
      )}
    >
      <div className="flex flex-col gap-4">
        {/* Title */}
        <div className="flex items-center justify-between border-b border-[#E8DFD5] pb-4">
          <h3 className="font-hero text-lg font-[500] uppercase tracking-[0.16em] text-[#2A221E]">
            Order Summary
          </h3>
          <span className="text-xs text-[#736357] font-light">
            {items.length} {items.length === 1 ? 'Piece' : 'Pieces'}
          </span>
        </div>

        {/* Product Items List */}
        <div className="flex flex-col gap-4 max-h-[260px] overflow-y-auto pr-1 divide-y divide-[#E8DFD5]/60">
          {items.map((item) => (
            <div key={item.id} className="flex gap-3 pt-3 first:pt-0 items-center">
              <div className="relative w-14 h-18 aspect-[3/4] bg-[#FAF7F2] rounded-lg overflow-hidden border border-[#E8DFD5] flex-shrink-0">
                <Image
                  src={item.imageSrc}
                  alt={item.name}
                  fill
                  sizes="60px"
                  className="object-contain p-1 drop-shadow-sm"
                />
              </div>

              <div className="flex flex-col flex-grow text-xs gap-0.5 overflow-hidden">
                <span className="font-hero font-[500] text-[#2A221E] truncate">{item.name}</span>
                <span className="text-[10px] text-[#736357] font-light truncate">
                  {item.material} • Qty: {item.quantity}
                </span>
                <span className="font-satoshi text-xs font-semibold text-[#7A1C28] mt-0.5">
                  {item.priceFormatted}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Price Calculations */}
        <div className="flex flex-col gap-2.5 pt-4 border-t border-[#E8DFD5] text-xs">
          <div className="flex items-center justify-between text-[#736357]">
            <span>Subtotal</span>
            <span className="text-[#2A221E] font-medium">{formattedSubtotal}</span>
          </div>

          {isGiftDelivery && (
            <div className="flex items-center justify-between text-[#736357]">
              <span>Packaging ({selectedBox.title})</span>
              <span className="text-[#7A1C28] font-medium">{formattedPackaging}</span>
            </div>
          )}

          <div className="flex items-center justify-between text-[#736357]">
            <span>Shipping</span>
            <span className="text-[#7A1C28] font-light">Complimentary Express</span>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-[#E8DFD5] text-sm">
            <span className="font-medium uppercase tracking-[0.16em] text-[#2A221E]">Total</span>
            <Price amount={formattedTotal} className="text-xl text-[#7A1C28]" />
          </div>
        </div>
      </div>

      {/* Button & Security Badge */}
      <div className="flex flex-col gap-3 pt-2">
        <motion.button
          type="button"
          whileTap={{ scale: 0.98 }}
          onClick={handleAction}
          className="w-full py-4 rounded-full bg-gradient-to-r from-[#8C1C2A] via-[#A32233] to-[#7A1523] text-[#FAF7F2] font-medium text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-[1px] cursor-pointer flex items-center justify-center gap-2"
        >
          {currentStep === 4 ? (
            <ShieldCheck className="w-4 h-4 text-[#E5C388]" />
          ) : (
            <ArrowRight className="w-3.5 h-3.5 text-[#E5C388]" />
          )}
          <span>{getButtonText()}</span>
        </motion.button>

        <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-[#736357]">
          <Lock className="w-3.5 h-3.5 text-[#7A1C28]" />
          <span>Encrypted Luxury Concierge Checkout</span>
        </div>
      </div>
    </div>
  );
};

OrderSummary.displayName = 'OrderSummary';
