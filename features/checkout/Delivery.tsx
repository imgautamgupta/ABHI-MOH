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

const inputClass =
  'w-full bg-[#FAF7F2] border border-[#D9C7A7] focus:border-[#7A1C28] text-[#2A221E] placeholder:text-[#C9A96E]/60 px-4 py-3.5 rounded-xl outline-none transition-colors duration-200 text-sm';

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
      className={cn('flex flex-col gap-6 font-satoshi text-left w-full', className)}
    >
      {/* Step Header */}
      <div className="flex flex-col gap-1 border-b border-[#E8DFD5] pb-4">
        <h3 className="font-hero text-xl font-[500] uppercase tracking-[0.16em] text-[#2A221E]">
          Shipping Address &amp; Delivery
        </h3>
        <p className="text-xs font-light text-[#736357]">
          Specify your delivery address and choose standard or bespoke gift packaging.
        </p>
      </div>

      {/* Street Address */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="del-address" className="uppercase tracking-[0.18em] text-[#736357] text-[10px] font-medium">
          Street Address *
        </label>
        <textarea
          id="del-address"
          required
          rows={3}
          autoComplete="street-address"
          placeholder="Enter your complete address"
          value={data.address}
          onChange={(e) => onChange({ ...data, address: e.target.value })}
          className="w-full bg-[#FAF7F2] border border-[#D9C7A7] focus:border-[#7A1C28] text-[#2A221E] placeholder:text-[#C9A96E]/60 px-4 py-3.5 rounded-xl outline-none transition-colors duration-200 resize-none text-sm"
        />
      </div>

      {/* City, State & Pincode */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="del-city" className="uppercase tracking-[0.18em] text-[#736357] text-[10px] font-medium">
            City *
          </label>
          <input
            id="del-city"
            type="text"
            required
            autoComplete="address-level2"
            placeholder="Enter city"
            value={data.city}
            onChange={(e) => onChange({ ...data, city: e.target.value })}
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="del-state" className="uppercase tracking-[0.18em] text-[#736357] text-[10px] font-medium">
            State *
          </label>
          <input
            id="del-state"
            type="text"
            required
            autoComplete="address-level1"
            placeholder="Enter state"
            value={data.state}
            onChange={(e) => onChange({ ...data, state: e.target.value })}
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="del-pincode" className="uppercase tracking-[0.18em] text-[#736357] text-[10px] font-medium">
            Pincode *
          </label>
          <input
            id="del-pincode"
            type="text"
            required
            autoComplete="postal-code"
            maxLength={6}
            placeholder="Enter pincode"
            value={data.pincode}
            onChange={(e) => onChange({ ...data, pincode: e.target.value.replace(/\D/g, '').slice(0, 6) })}
            className={inputClass}
          />
        </div>
      </div>

      {/* Delivery Mode Cards */}
      <div className="flex flex-col gap-3 pt-1">
        <span className="uppercase tracking-[0.18em] text-[#736357] text-[10px] font-medium">
          Delivery Experience *
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Normal Delivery */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => onChange({ ...data, deliveryMode: 'normal' })}
            onKeyDown={(e) => e.key === 'Enter' && onChange({ ...data, deliveryMode: 'normal' })}
            className={cn(
              'p-5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all duration-300 select-none',
              data.deliveryMode === 'normal'
                ? 'border-[#7A1C28] bg-[#7A1C28]/5 shadow-sm ring-1 ring-[#7A1C28]/20'
                : 'border-[#E8DFD5] bg-[#FAF7F2] hover:border-[#D9C7A7]'
            )}
          >
            <PackageCheck className={cn('w-5 h-5 mt-0.5 flex-shrink-0', data.deliveryMode === 'normal' ? 'text-[#7A1C28]' : 'text-[#C9A96E]')} />
            <div className="flex flex-col gap-0.5">
              <span className="font-medium text-[#2A221E] uppercase tracking-wider text-xs">
                Normal Delivery
              </span>
              <span className="text-[11px] text-[#736357] font-light leading-relaxed">
                Signature ABHI-MOH boutique garment bag &amp; box.
              </span>
            </div>
          </div>

          {/* Gift Delivery */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => onChange({ ...data, deliveryMode: 'gift' })}
            onKeyDown={(e) => e.key === 'Enter' && onChange({ ...data, deliveryMode: 'gift' })}
            className={cn(
              'p-5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all duration-300 select-none',
              data.deliveryMode === 'gift'
                ? 'border-[#7A1C28] bg-[#7A1C28]/5 shadow-sm ring-1 ring-[#7A1C28]/20'
                : 'border-[#E8DFD5] bg-[#FAF7F2] hover:border-[#D9C7A7]'
            )}
          >
            <Gift className={cn('w-5 h-5 mt-0.5 flex-shrink-0', data.deliveryMode === 'gift' ? 'text-[#7A1C28]' : 'text-[#C9A96E]')} />
            <div className="flex flex-col gap-0.5">
              <span className="font-medium text-[#2A221E] uppercase tracking-wider text-xs">
                Gift Delivery
              </span>
              <span className="text-[11px] text-[#736357] font-light leading-relaxed">
                Unlocks luxury gift box cards, ribbon swatches &amp; gift message.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-2">
        <button
          type="button"
          onClick={onBack}
          className="sm:w-auto px-7 py-4 rounded-full border border-[#D9C7A7] hover:border-[#7A1C28] text-[#736357] hover:text-[#7A1C28] text-xs uppercase tracking-[0.18em] transition-colors cursor-pointer"
        >
          Back
        </button>
        <button
          type="submit"
          className="flex-1 py-4 rounded-full bg-gradient-to-r from-[#8C1C2A] via-[#A32233] to-[#7A1523] text-[#FAF7F2] font-medium text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-[1px] cursor-pointer"
        >
          {data.deliveryMode === 'gift' ? 'Continue To Gift Experience' : 'Continue To Review'}
        </button>
      </div>
    </motion.form>
  );
};

Delivery.displayName = 'Delivery';
