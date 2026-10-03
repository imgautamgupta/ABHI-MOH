'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCart } from '../cart/CartContext';
import { GIFT_BOX_OPTIONS } from './checkout.constants';
import { Price } from '../collections/components/Price';
import { CheckoutStep } from './checkout.types';
import { cn } from '@/lib/utils';
import { ShieldCheck, Lock, ArrowRight, ShoppingBag, Loader2, Crown, Award, Sparkles } from 'lucide-react';
import { MembershipDetails } from '@/lib/account/types';
import { isWixImage, wixThumbImage, SOFT_IVORY_PLACEHOLDER } from '@/lib/wixImage';

export interface OrderSummaryProps {
  selectedBoxId?: string;
  isGiftDelivery?: boolean;
  currentStep?: CheckoutStep;
  isLoading?: boolean;
  onNextStep?: () => void;
  onPaymentClick?: () => void;
  className?: string;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  selectedBoxId,
  isGiftDelivery = false,
  currentStep = 1,
  isLoading = false,
  onNextStep,
  onPaymentClick,
  className,
}) => {
  const { items } = useCart();
  const [membership, setMembership] = useState<MembershipDetails | null>(null);

  // Fetch client membership tier securely from server API
  useEffect(() => {
    fetch('/api/account/membership')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.membership) {
          setMembership(data.membership);
        }
      })
      .catch((e) => console.warn('Could not load checkout membership tier:', e));
  }, []);

  const subtotal = items.reduce((sum, item) => sum + (item.priceNumber || 0) * (item.quantity || 1), 0);

  const selectedBox = GIFT_BOX_OPTIONS.find((b) => b.id === selectedBoxId) || GIFT_BOX_OPTIONS[0];

  const isGold = membership?.tier === 'GOLD';
  const isSilver = membership?.tier === 'SILVER';

  // Packaging fee: Gold members get complimentary gift packaging
  const originalPackagingFee = isGiftDelivery && selectedBox ? selectedBox.priceNumber : 0;
  const packagingFee = isGold ? 0 : originalPackagingFee;

  // Personal Member Discount calculation
  const discountPercent = membership?.discountPercent || 0;
  const discountAmount = Math.round((subtotal * discountPercent) / 100);

  const total = Math.max(0, subtotal - discountAmount + packagingFee);

  const formattedSubtotal = `₹${subtotal.toLocaleString('en-IN')}`;
  const formattedDiscount = `-₹${discountAmount.toLocaleString('en-IN')}`;
  const formattedPackaging = `₹${packagingFee.toLocaleString('en-IN')}`;
  const formattedTotal = `₹${total.toLocaleString('en-IN')}`;

  const handleAction = () => {
    if (isLoading) return;
    if (currentStep === 4) {
      if (onPaymentClick) onPaymentClick();
    } else {
      if (onNextStep) onNextStep();
    }
  };

  const getButtonText = () => {
    if (isLoading) return 'Connecting To Payment...';
    if (currentStep === 1) return 'Continue To Delivery';
    if (currentStep === 2) return isGiftDelivery ? 'Continue To Gift Experience' : 'Continue To Review';
    if (currentStep === 3) return 'Continue To Review';
    return 'Place Order';
  };

  if (items.length === 0) {
    return (
      <div
        className={cn(
          'w-full bg-white border border-[#E8DFD5] rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center gap-5 font-satoshi shadow-sm text-[#2A221E]',
          className
        )}
      >
        <div className="w-14 h-14 rounded-full bg-[#FAF7F2] border border-[#E8DFD5] flex items-center justify-center text-[#7A1C28]">
          <ShoppingBag className="w-6 h-6 stroke-[1.5]" />
        </div>
        <div className="flex flex-col gap-1.5">
          <h4 className="font-hero text-lg uppercase tracking-[0.14em] text-[#2A221E]">
            Your Bag is Empty
          </h4>
          <p className="text-xs text-[#736357] font-light max-w-xs leading-relaxed">
            Select a bespoke heirloom saree from our atelier collection to proceed with checkout.
          </p>
        </div>
        <Link
          href="/collections"
          className="mt-2 px-6 py-3.5 rounded-full bg-[#7A1C28] text-[#FAF7F2] text-xs uppercase tracking-[0.18em] font-medium hover:bg-[#5C141E] transition-colors"
        >
          Explore Collection
        </Link>
      </div>
    );
  }

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
          <div className="flex items-center gap-2">
            <h3 className="font-hero text-lg font-[500] uppercase tracking-[0.16em] text-[#2A221E]">
              Order Summary
            </h3>
            {isGold && (
              <span className="px-2 py-0.5 rounded-full text-[9px] uppercase tracking-widest font-semibold bg-[#C89D5C]/20 text-[#8F6526] border border-[#C89D5C]/40 flex items-center gap-1">
                <Crown className="w-3 h-3" />
                Gold
              </span>
            )}
            {isSilver && (
              <span className="px-2 py-0.5 rounded-full text-[9px] uppercase tracking-widest font-semibold bg-slate-200 text-slate-800 border border-slate-300 flex items-center gap-1">
                <Award className="w-3 h-3" />
                Silver
              </span>
            )}
          </div>
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
                  src={wixThumbImage(item.imageSrc)}
                  alt={item.name}
                  fill
                  unoptimized={isWixImage(item.imageSrc)}
                  sizes="60px"
                  className="object-contain p-1 drop-shadow-sm"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== SOFT_IVORY_PLACEHOLDER) {
                      target.src = SOFT_IVORY_PLACEHOLDER;
                    }
                  }}
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

          {/* Personal Member Discount Display */}
          {discountAmount > 0 && (
            <div className="flex items-center justify-between text-[#7A1C28] bg-[#FAF7F2] p-2.5 rounded-xl border border-[#C89D5C]/30">
              <div className="flex items-center gap-1.5">
                {isGold ? (
                  <Crown className="w-3.5 h-3.5 text-[#C89D5C]" />
                ) : (
                  <Award className="w-3.5 h-3.5 text-[#7A1C28]" />
                )}
                <span className="font-medium uppercase tracking-wider text-[11px]">
                  {isGold ? 'ABHI-MOH GOLD BENEFIT' : 'ABHI-MOH SILVER BENEFIT'} ({discountPercent}%)
                </span>
              </div>
              <span className="font-semibold text-sm">{formattedDiscount}</span>
            </div>
          )}

          {isGiftDelivery && selectedBox && (
            <div className="flex items-center justify-between text-[#736357]">
              <span>Packaging ({selectedBox.title})</span>
              {isGold ? (
                <span className="text-emerald-700 font-medium">Complimentary Gold Benefit</span>
              ) : (
                <span className="text-[#7A1C28] font-medium">{formattedPackaging}</span>
              )}
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
          disabled={isLoading}
          whileTap={{ scale: 0.98 }}
          onClick={handleAction}
          className={cn(
            'w-full py-4 rounded-full bg-gradient-to-r from-[#8C1C2A] via-[#A32233] to-[#7A1523] text-[#FAF7F2] font-medium text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-[1px] cursor-pointer flex items-center justify-center gap-2',
            isLoading && 'opacity-75 cursor-not-allowed'
          )}
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 text-[#E5C388] animate-spin" />
          ) : currentStep === 4 ? (
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
