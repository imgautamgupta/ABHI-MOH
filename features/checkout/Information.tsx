'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { InformationData } from './checkout.types';
import { STEP_TRANSITION_VARIANTS } from './checkout.animations';
import { cn } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';

export interface InformationProps {
  data: InformationData;
  onChange: (data: InformationData) => void;
  onNext: () => void;
  className?: string;
}

export interface InformationErrors {
  fullName?: string;
  phoneNumber?: string;
  email?: string;
}

export const Information: React.FC<InformationProps> = ({ data, onChange, onNext, className }) => {
  const [errors, setErrors] = useState<InformationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validate = (): boolean => {
    const newErrors: InformationErrors = {};

    // 1. Full Name
    const nameTrimmed = data.fullName.trim();
    if (!nameTrimmed) {
      newErrors.fullName = 'Please enter your full name';
    } else if (nameTrimmed.length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    // 2. Phone Number (10 digits)
    const rawPhone = data.phoneNumber.replace(/\D/g, '');
    if (!rawPhone) {
      newErrors.phoneNumber = 'Mobile number is required for dispatch updates';
    } else if (rawPhone.length !== 10 || !/^[6-9]\d{9}$/.test(rawPhone)) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit Indian mobile number';
    }

    // 3. Email Address
    const emailTrimmed = data.email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailTrimmed) {
      newErrors.email = 'Email address is required for order confirmation';
    } else if (!emailRegex.test(emailTrimmed)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ fullName: true, phoneNumber: true, email: true });
    if (validate()) {
      onNext();
    }
  };

  const handleBlur = (field: keyof InformationData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validate();
  };

  return (
    <motion.form
      variants={STEP_TRANSITION_VARIANTS}
      initial="initial"
      animate="animate"
      exit="exit"
      onSubmit={handleSubmit}
      noValidate
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
          autoComplete="name"
          placeholder="Enter your full name"
          value={data.fullName}
          onBlur={() => handleBlur('fullName')}
          onChange={(e) => {
            onChange({ ...data, fullName: e.target.value });
            if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
          }}
          className={cn(
            'w-full bg-[#FAF7F2] border text-[#2A221E] placeholder:text-[#C9A96E]/60 px-4 py-3.5 rounded-xl outline-none transition-colors duration-200 text-base sm:text-sm',
            errors.fullName && touched.fullName
              ? 'border-[#7A1C28] ring-1 ring-[#7A1C28]/25 bg-[#7A1C28]/5'
              : 'border-[#D9C7A7] focus:border-[#7A1C28]'
          )}
        />
        {errors.fullName && touched.fullName && (
          <span className="text-xs text-[#7A1C28] flex items-center gap-1.5 font-normal mt-0.5">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{errors.fullName}</span>
          </span>
        )}
      </div>

      {/* Phone Number */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="info-phone" className="uppercase tracking-[0.18em] text-[#736357] text-[10px] font-medium">
          Mobile Number (+91) *
        </label>
        <div className="relative flex items-center">
          <span className="absolute left-3.5 text-[#7A1C28] font-medium text-sm">+91</span>
          <input
            id="info-phone"
            type="tel"
            maxLength={10}
            autoComplete="tel"
            placeholder="10-digit mobile number"
            value={data.phoneNumber}
            onBlur={() => handleBlur('phoneNumber')}
            onChange={(e) => {
              const cleaned = e.target.value.replace(/\D/g, '').slice(0, 10);
              onChange({ ...data, phoneNumber: cleaned });
              if (errors.phoneNumber) setErrors((prev) => ({ ...prev, phoneNumber: undefined }));
            }}
            className={cn(
              'w-full bg-[#FAF7F2] border text-[#2A221E] placeholder:text-[#C9A96E]/60 pl-14 pr-4 py-3.5 rounded-xl outline-none transition-colors duration-200 text-base sm:text-sm',
              errors.phoneNumber && touched.phoneNumber
                ? 'border-[#7A1C28] ring-1 ring-[#7A1C28]/25 bg-[#7A1C28]/5'
                : 'border-[#D9C7A7] focus:border-[#7A1C28]'
            )}
          />
        </div>
        {errors.phoneNumber && touched.phoneNumber && (
          <span className="text-xs text-[#7A1C28] flex items-center gap-1.5 font-normal mt-0.5">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{errors.phoneNumber}</span>
          </span>
        )}
      </div>

      {/* Email Address */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="info-email" className="uppercase tracking-[0.18em] text-[#736357] text-[10px] font-medium">
          Email Address *
        </label>
        <input
          id="info-email"
          type="email"
          autoComplete="email"
          placeholder="Enter your email address"
          value={data.email}
          onBlur={() => handleBlur('email')}
          onChange={(e) => {
            onChange({ ...data, email: e.target.value });
            if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
          }}
          className={cn(
            'w-full bg-[#FAF7F2] border text-[#2A221E] placeholder:text-[#C9A96E]/60 px-4 py-3.5 rounded-xl outline-none transition-colors duration-200 text-base sm:text-sm',
            errors.email && touched.email
              ? 'border-[#7A1C28] ring-1 ring-[#7A1C28]/25 bg-[#7A1C28]/5'
              : 'border-[#D9C7A7] focus:border-[#7A1C28]'
          )}
        />
        {errors.email && touched.email && (
          <span className="text-xs text-[#7A1C28] flex items-center gap-1.5 font-normal mt-0.5">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{errors.email}</span>
          </span>
        )}
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

