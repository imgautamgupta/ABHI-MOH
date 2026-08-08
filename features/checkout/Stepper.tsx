'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { CHECKOUT_STEPS_LIST } from './checkout.constants';
import { CheckoutStep } from './checkout.types';
import { cn } from '@/lib/utils';

export interface StepperProps {
  currentStep: CheckoutStep;
  onStepClick?: (step: CheckoutStep) => void;
}

export const Stepper: React.FC<StepperProps> = ({ currentStep, onStepClick }) => {
  return (
    <div className="w-full font-satoshi my-6 select-none">
      <div className="flex items-center justify-between relative max-w-2xl mx-auto px-4">
        {/* Background Connecting Line */}
        <div className="absolute top-1/2 left-8 right-8 -translate-y-1/2 h-[1px] bg-[#C89D5C]/20 -z-0" />

        {/* Active Progress Fill Line */}
        <div
          className="absolute top-1/2 left-8 -translate-y-1/2 h-[1px] bg-[#A32233] transition-all duration-500 ease-silk -z-0"
          style={{
            width: `${((currentStep - 1) / (CHECKOUT_STEPS_LIST.length - 1)) * 85}%`,
          }}
        />

        {CHECKOUT_STEPS_LIST.map((item) => {
          const isCompleted = item.step < currentStep;
          const isActive = item.step === currentStep;

          return (
            <div key={item.step} className="relative z-10 flex flex-col items-center gap-2">
              <button
                type="button"
                disabled={item.step > currentStep}
                onClick={() => onStepClick && onStepClick(item.step)}
                className={cn(
                  'w-9 h-9 rounded-full flex items-center justify-center font-medium text-xs transition-all duration-300 ease-silk border cursor-pointer focus:outline-none',
                  isCompleted && 'bg-[#A32233] border-[#C89D5C]/60 text-[#F6ECE1] shadow-sm',
                  isActive && 'bg-[#230C14] border-[#C89D5C] text-[#E5C388] ring-4 ring-[#C89D5C]/20',
                  !isCompleted && !isActive && 'bg-[#180A0E] border-[#C89D5C]/20 text-[#D0BEAB]/50 cursor-not-allowed'
                )}
                aria-label={`Step ${item.step}: ${item.label}`}
              >
                {isCompleted ? <Check className="w-4 h-4 text-[#F6ECE1]" /> : item.step}
              </button>

              <span
                className={cn(
                  'text-[10px] uppercase tracking-widest transition-colors duration-300 font-light hidden sm:block',
                  isActive ? 'text-[#E5C388] font-medium' : isCompleted ? 'text-[#F6ECE1]/80' : 'text-[#D0BEAB]/50'
                )}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

Stepper.displayName = 'Stepper';
