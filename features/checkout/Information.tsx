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
      className={cn('flex flex-col gap-6 font-satoshi text-left w-full', className)}
    >
      {/* Step Header */}
      <div className="flex flex-col gap-1 border-b border-[#E8DFD5] pb-4">
        <h3 className="font-hero text-xl font-[500] uppercase tracking-[0.16em] text-[#2A221E]">
          Contact Information
        </h3>
        <p className="text-xs font-light text-[#736357]">
          Enter your details for order confirmation and concierge tracking.
        </p>
      </div>

      {/* Full Name */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="info-name" className="uppercase tracking-[0.18em] text-[#736357] text-[10px] font-medium">
          Full Name *
        </label>
        <input
          id="info-name"
          type="text"
          required
          autoComplete="name"
          placeholder="Enter your full name"
          value={data.fullName}
          onChange={(e) => onChange({ ...data, fullName: e.target.value })}
          className="w-full bg-[#FAF7F2] border border-[#D9C7A7] focus:border-[#7A1C28] text-[#2A221E] placeholder:text-[#C9A96E]/60 px-4 py-3.5 rounded-xl outline-none transition-colors duration-200 text-sm"
        />
      </div>

      {/* Phone Number */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="info-phone" className="uppercase tracking-[0.18em] text-[#736357] text-[10px] font-medium">
          Phone Number *
        </label>
        <input
          id="info-phone"
          type="tel"
          required
          autoComplete="tel"
          placeholder="Enter your 10-digit mobile number"
          value={data.phoneNumber}
          onChange={(e) => onChange({ ...data, phoneNumber: e.target.value })}
          className="w-full bg-[#FAF7F2] border border-[#D9C7A7] focus:border-[#7A1C28] text-[#2A221E] placeholder:text-[#C9A96E]/60 px-4 py-3.5 rounded-xl outline-none transition-colors duration-200 text-sm"
        />
      </div>

      {/* Email Address */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="info-email" className="uppercase tracking-[0.18em] text-[#736357] text-[10px] font-medium">
          Email Address *
        </label>
        <input
          id="info-email"
          type="email"
          required
          autoComplete="email"
          placeholder="Enter your email address"
          value={data.email}
          onChange={(e) => onChange({ ...data, email: e.target.value })}
          className="w-full bg-[#FAF7F2] border border-[#D9C7A7] focus:border-[#7A1C28] text-[#2A221E] placeholder:text-[#C9A96E]/60 px-4 py-3.5 rounded-xl outline-none transition-colors duration-200 text-sm"
        />
      </div>

      {/* Continue Button */}
      <button
        type="submit"
        className="w-full py-4 mt-2 rounded-full bg-gradient-to-r from-[#8C1C2A] via-[#A32233] to-[#7A1523] text-[#FAF7F2] font-medium text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-[1px] cursor-pointer focus:outline-none"
      >
        Continue To Delivery
      </button>
    </motion.form>
  );
};

Information.displayName = 'Information';
