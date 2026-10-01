'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FORM_TAB_VARIANTS } from './account.animations';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SignupFormProps {
  onSuccessSignup?: () => void;
  className?: string;
}

export const SignupForm: React.FC<SignupFormProps> = ({ onSuccessSignup, className }) => {
  const [step, setStep] = useState<'request' | 'verify'>('request');
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');

  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileNumber.length >= 10 && fullName) {
      setStep('verify');
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSuccessSignup) {
      onSuccessSignup();
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
          {/* Full Name Input */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="signup-name" className="uppercase tracking-[0.18em] text-[#D0BEAB]/80 text-[10px]">
              Full Name *
            </label>
            <input
              id="signup-name"
              type="text"
              required
              placeholder="Princess Gayatri Devi"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-[#250D14] border border-[#C89D5C]/30 focus:border-[#C89D5C] text-[#F6ECE1] px-4 py-3 rounded-md outline-none transition-colors duration-200"
            />
          </div>

          {/* Mobile Number Input */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="signup-mobile" className="uppercase tracking-[0.18em] text-[#D0BEAB]/80 text-[10px]">
              Mobile Number (+91) *
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-[#E5C388] font-medium text-xs">+91</span>
              <input
                id="signup-mobile"
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

            <label htmlFor="signup-otp" className="uppercase tracking-[0.18em] text-[#D0BEAB]/80 text-[10px] text-left">
              Enter 4-Digit Concierge OTP *
            </label>
            <input
              id="signup-otp"
              type="text"
              required
              maxLength={4}
              placeholder="8888"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full bg-[#250D14] border border-[#C89D5C]/40 focus:border-[#E5C388] text-[#E5C388] text-center font-hero text-2xl tracking-[0.4em] px-4 py-3 rounded-md outline-none transition-colors duration-200"
            />
          </div>

          {/* Verify & Create Account Button */}
          <button
            type="submit"
            className="w-full py-3.5 mt-2 rounded-full bg-gradient-to-r from-[#8C1C2A] via-[#A32233] to-[#7A1523] text-[#F6ECE1] border border-[#C89D5C]/35 font-medium text-xs uppercase tracking-[0.2em] transition-all duration-300 ease-silk flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg"
          >
            <ShieldCheck className="w-4 h-4 text-[#E5C388]" />
            <span>Create Concierge Account</span>
          </button>
        </>
      )}
    </motion.form>
  );
};

SignupForm.displayName = 'SignupForm';
