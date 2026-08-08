'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { InformationData } from './checkout.types';
import { STEP_TRANSITION_VARIANTS } from './checkout.animations';
import { cn } from '@/lib/utils';

export interface InformationProps {
  data: InformationData;
  onChange: (data: InformationData) => void;
  onNext: () => void;
  className?: string;
}

export const Information: React.FC<InformationProps> = ({ data, onChange, onNext, className }) => {
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
      <div className="flex flex-col gap-1 border-b border-[#C89D5C]/25 pb-3">
        <h3 className="font-hero text-xl font-[500] uppercase tracking-[0.16em] text-[#E5C388]">
          Step 1: Contact Information
        </h3>
        <p className="font-sans text-xs font-light text-[#D0BEAB]">
          Enter your details for order confirmation and concierge tracking.
        </p>
      </div>

      {/* Full Name Input */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="info-name" className="uppercase tracking-[0.18em] text-[#D0BEAB]/90 text-[10px]">
          Full Name *
        </label>
        <input
          id="info-name"
          type="text"
          required
          placeholder="Princess Gayatri Devi"
          value={data.fullName}
          onChange={(e) => onChange({ ...data, fullName: e.target.value })}
          className="w-full bg-[#1F0A10] border border-[#C89D5C]/30 focus:border-[#C89D5C] text-[#F6ECE1] px-4 py-3 rounded-md outline-none transition-colors duration-200"
        />
      </div>

      {/* Phone Number Input */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="info-phone" className="uppercase tracking-[0.18em] text-[#D0BEAB]/90 text-[10px]">
          Phone Number (for Courier Updates) *
        </label>
        <input
          id="info-phone"
          type="tel"
          required
          placeholder="+91 98765 43210"
          value={data.phoneNumber}
          onChange={(e) => onChange({ ...data, phoneNumber: e.target.value })}
          className="w-full bg-[#1F0A10] border border-[#C89D5C]/30 focus:border-[#C89D5C] text-[#F6ECE1] px-4 py-3 rounded-md outline-none transition-colors duration-200"
        />
      </div>

      {/* Email Input */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="info-email" className="uppercase tracking-[0.18em] text-[#D0BEAB]/90 text-[10px]">
          Email Address *
        </label>
        <input
          id="info-email"
          type="email"
          required
          placeholder="concierge@abhi-moh.com"
          value={data.email}
          onChange={(e) => onChange({ ...data, email: e.target.value })}
          className="w-full bg-[#1F0A10] border border-[#C89D5C]/30 focus:border-[#C89D5C] text-[#F6ECE1] px-4 py-3 rounded-md outline-none transition-colors duration-200"
        />
      </div>

      {/* Next Step Button */}
      <button
        type="submit"
        className="w-full py-4 mt-4 rounded-full bg-gradient-to-r from-[#8C1C2A] via-[#A32233] to-[#7A1523] text-[#F6ECE1] border border-[#C89D5C]/35 hover:border-[#C89D5C]/70 font-medium text-xs uppercase tracking-[0.2em] transition-all duration-300 ease-silk shadow-lg hover:shadow-xl cursor-pointer focus:outline-none"
      >
        Continue To Delivery
      </button>
    </motion.form>
  );
};

Information.displayName = 'Information';
