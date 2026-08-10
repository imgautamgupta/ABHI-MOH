'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FORM_TAB_VARIANTS } from './account.animations';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface LoginFormProps {
  onSuccessLogin?: () => void;
  className?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccessLogin, className }) => {
  const [step, setStep] = useState<'request' | 'verify'>('request');
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');

  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileNumber.length >= 10) {
      setStep('verify');
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSuccessLogin) {
      onSuccessLogin();
    }
  };

  return (
    <motion.form
      variants={FORM_TAB_VARIANTS}
      initial="initial"
      animate="animate"
      exit="exit"
      onSubmit={step === 'request' ? handleRequestOtp : handleVerifyOtp}
      className={cn('flex flex-col gap-4 font-satoshi text-xs text-left', className)}
    >
      {step === 'request' ? (
        <>
          {/* Full Name */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="auth-name" className="uppercase tracking-[0.18em] text-[#D0BEAB]/80 text-[10px]">
              Full Name *
            </label>
            <input
              id="auth-name"
              type="text"
              required
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#250D14] border border-[#C89D5C]/30 focus:border-[#C89D5C] text-[#F6ECE1] px-4 py-3 rounded-md outline-none transition-colors duration-200"
            />
          </div>

          {/* Mobile Number Input */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="auth-mobile" className="uppercase tracking-[0.18em] text-[#D0BEAB]/80 text-[10px]">
              Mobile Number (+91) *
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-[#E5C388] font-medium text-xs">+91</span>
              <input
                id="auth-mobile"
                type="tel"
                required
                maxLength={10}
                placeholder="10-digit mobile number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                className="w-full bg-[#250D14] border border-[#C89D5C]/30 focus:border-[#C89D5C] text-[#F6ECE1] pl-12 pr-4 py-3 rounded-md outline-none transition-colors duration-200"
              />
            </div>
          </div>

          {/* Request OTP Button */}
          <button
            type="submit"
            className="w-full py-3.5 mt-2 rounded-full bg-gradient-to-r from-[#8C1C2A] via-[#A32233] to-[#7A1523] text-[#F6ECE1] border border-[#C89D5C]/35 font-medium text-xs uppercase tracking-[0.2em] transition-all duration-300 ease-silk flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg"
          >
            <span>Request Concierge OTP</span>
            <ArrowRight className="w-4 h-4 text-[#E5C388]" />
          </button>
        </>
      ) : (
        <>
          {/* OTP Input */}
          <div className="flex flex-col gap-1.5">
            <div className="p-3 bg-[#250D14] border border-[#C89D5C]/30 rounded-md mb-2 flex items-center justify-between text-xs">
              <span className="text-[#D0BEAB]">Sent to +91 {mobileNumber}</span>
              <button
                type="button"
                onClick={() => setStep('request')}
                className="text-[10px] uppercase text-[#E5C388] underline cursor-pointer"
              >
                Edit
              </button>
            </div>

            <label htmlFor="auth-otp" className="uppercase tracking-[0.18em] text-[#D0BEAB]/80 text-[10px] text-left">
              Enter 4-Digit Concierge OTP *
            </label>
            <input
              id="auth-otp"
              type="text"
              required
              maxLength={4}
              placeholder="8888"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full bg-[#250D14] border border-[#C89D5C]/40 focus:border-[#E5C388] text-[#E5C388] text-center font-hero text-2xl tracking-[0.4em] px-4 py-3 rounded-md outline-none transition-colors duration-200"
            />
          </div>

          {/* Verify & Enter Maison Button */}
          <button
            type="submit"
            className="w-full py-3.5 mt-2 rounded-full bg-gradient-to-r from-[#8C1C2A] via-[#A32233] to-[#7A1523] text-[#F6ECE1] border border-[#C89D5C]/35 font-medium text-xs uppercase tracking-[0.2em] transition-all duration-300 ease-silk flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg"
          >
            <ShieldCheck className="w-4 h-4 text-[#E5C388]" />
            <span>Verify & Access Maison</span>
          </button>
        </>
      )}
    </motion.form>
  );
};

LoginForm.displayName = 'LoginForm';
