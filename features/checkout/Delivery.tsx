'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { DeliveryData } from './checkout.types';
import { STEP_TRANSITION_VARIANTS } from './checkout.animations';
import { cn } from '@/lib/utils';
import { Gift, PackageCheck } from 'lucide-react';

export interface DeliveryProps {
  data: DeliveryData;
  onChange: (data: DeliveryData) => void;
  onNext: () => void;
  onBack: () => void;
  className?: string;
}

export const Delivery: React.FC<DeliveryProps> = ({
  data,
  onChange,
  onNext,
  onBack,
  className,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <motion.form
      variants={STEP_TRANSITION_VARIANTS}
      initial="initial"
      animate="animate"
      exit="exit"
      onSubmit={handleSubmit}
      className={cn('flex flex-col gap-6 font-satoshi text-xs text-left w-full', className)}
    >
      <div className="flex flex-col gap-1 border-b border-white/[0.08] pb-3">
        <h3 className="font-hero text-xl font-[500] uppercase tracking-[0.16em] text-[#5E0006]">
          Step 2: Shipping Address & Delivery Option
        </h3>
        <p className="font-sans text-xs font-light text-secondary-text">
          Specify your delivery address and choose standard or bespoke gift packaging.
        </p>
      </div>

      {/* Address Input */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="del-address" className="uppercase tracking-[0.18em] text-secondary-text/80 text-[10px]">
          Street Address / Suite *
        </label>
        <textarea
          id="del-address"
          required
          rows={3}
          placeholder="Maison Residence, 42 Royal Palace Avenue"
          value={data.address}
          onChange={(e) => onChange({ ...data, address: e.target.value })}
          className="w-full bg-[#181818] border border-borders focus:border-warm-cream/70 text-primary-text px-4 py-3 rounded-sm outline-none transition-colors duration-200 resize-none"
        />
      </div>

      {/* City, State & Pincode */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="del-city" className="uppercase tracking-[0.18em] text-secondary-text/80 text-[10px]">
            City *
          </label>
          <input
            id="del-city"
            type="text"
            required
            placeholder="Jaipur"
            value={data.city}
            onChange={(e) => onChange({ ...data, city: e.target.value })}
            className="w-full bg-[#181818] border border-borders focus:border-warm-cream/70 text-primary-text px-4 py-3 rounded-sm outline-none"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="del-state" className="uppercase tracking-[0.18em] text-secondary-text/80 text-[10px]">
            State *
          </label>
          <input
            id="del-state"
            type="text"
            required
            placeholder="Rajasthan"
            value={data.state}
            onChange={(e) => onChange({ ...data, state: e.target.value })}
            className="w-full bg-[#181818] border border-borders focus:border-warm-cream/70 text-primary-text px-4 py-3 rounded-sm outline-none"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="del-pincode" className="uppercase tracking-[0.18em] text-secondary-text/80 text-[10px]">
            Pincode *
          </label>
          <input
            id="del-pincode"
            type="text"
            required
            placeholder="302001"
            value={data.pincode}
            onChange={(e) => onChange({ ...data, pincode: e.target.value })}
            className="w-full bg-[#181818] border border-borders focus:border-warm-cream/70 text-primary-text px-4 py-3 rounded-sm outline-none"
          />
        </div>
      </div>

      {/* DELIVERY MODE SELECTION CARDS */}
      <div className="flex flex-col gap-3 pt-2">
        <span className="uppercase tracking-[0.18em] text-secondary-text/80 text-[10px]">
          Delivery Experience Mode *
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Normal Delivery */}
          <div
            onClick={() => onChange({ ...data, deliveryMode: 'normal' })}
            className={cn(
              'p-4 rounded-sm border bg-[#181818] flex items-start gap-3 cursor-pointer transition-all duration-300 select-none',
              data.deliveryMode === 'normal'
                ? 'border-[#5E0006] bg-[#5E0006]/10 shadow-sm'
                : 'border-borders hover:border-warm-cream/40'
            )}
          >
            <PackageCheck className="w-5 h-5 text-warm-cream mt-0.5 flex-shrink-0" />
            <div className="flex flex-col gap-0.5 text-left">
              <span className="font-medium text-warm-cream uppercase tracking-wider text-xs">
                Normal Delivery
              </span>
              <span className="text-[11px] text-secondary-text font-light leading-relaxed">
                Signature ABHI-MOH boutique garment bag & box.
              </span>
            </div>
          </div>

          {/* Gift Delivery */}
          <div
            onClick={() => onChange({ ...data, deliveryMode: 'gift' })}
            className={cn(
              'p-4 rounded-sm border bg-[#181818] flex items-start gap-3 cursor-pointer transition-all duration-300 select-none',
              data.deliveryMode === 'gift'
                ? 'border-[#5E0006] bg-[#5E0006]/10 shadow-sm'
                : 'border-borders hover:border-warm-cream/40'
            )}
          >
            <Gift className="w-5 h-5 text-[#EED9B9] mt-0.5 flex-shrink-0" />
            <div className="flex flex-col gap-0.5 text-left">
              <span className="font-medium text-warm-cream uppercase tracking-wider text-xs">
                Gift Delivery
              </span>
              <span className="text-[11px] text-secondary-text font-light leading-relaxed">
                Unlocks luxury gift box cards, ribbon swatches & gift message.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-4 mt-4">
        <button
          type="button"
          onClick={onBack}
          className="py-3.5 px-6 rounded-full border border-borders hover:border-warm-cream/50 text-secondary-text hover:text-warm-cream text-xs uppercase tracking-[0.18em] transition-colors cursor-pointer"
        >
          Back
        </button>

        <button
          type="submit"
          className="flex-1 py-4 rounded-full bg-[#5E0006] hover:bg-[#9B0F06] text-warm-cream font-medium text-xs uppercase tracking-[0.2em] transition-all duration-300 ease-silk shadow-medium hover:-translate-y-[2px] cursor-pointer"
        >
          {data.deliveryMode === 'gift' ? 'Continue To Gift Experience' : 'Continue To Review'}
        </button>
      </div>
    </motion.form>
  );
};

Delivery.displayName = 'Delivery';
