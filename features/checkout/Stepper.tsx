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
    <div className="w-full font-satoshi mt-8 mb-2 select-none">
      <div className="flex items-center justify-between relative max-w-2xl mx-auto px-2 sm:px-4">

        {/* Background Connecting Line */}
        <div className="absolute top-[18px] left-8 right-8 h-[1px] bg-[#E8DFD5] z-0" />

        {/* Active Progress Fill Line */}
        <div
          className="absolute top-[18px] left-8 h-[1px] bg-[#7A1C28] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] z-0"
          style={{
            width: `${((currentStep - 1) / (CHECKOUT_STEPS_LIST.length - 1)) * 85}%`,
          }}
        />

        {CHECKOUT_STEPS_LIST.map((item) => {
          const isCompleted = item.step < currentStep;
          const isActive    = item.step === currentStep;

          return (
            <div key={item.step} className="relative z-10 flex flex-col items-center gap-2">
              <button
                type="button"
                disabled={item.step > currentStep}
                onClick={() => onStepClick && onStepClick(item.step)}
                className={cn(
                  'w-9 h-9 rounded-full flex items-center justify-center font-medium text-xs transition-all duration-300 border cursor-pointer focus:outline-none',
                  isCompleted && 'bg-[#7A1C28] border-[#7A1C28] text-white shadow-sm',
                  isActive    && 'bg-white border-[#7A1C28] text-[#7A1C28] ring-4 ring-[#7A1C28]/15 shadow-sm',
                  !isCompleted && !isActive && 'bg-[#FAF7F2] border-[#D9C7A7] text-[#C9A96E]/70 cursor-not-allowed'
                )}
                aria-label={`Step ${item.step}: ${item.label}`}
              >
                {isCompleted ? <Check className="w-4 h-4 text-white" /> : item.step}
              </button>

              <span
                className={cn(
                  'text-[10px] uppercase tracking-widest transition-colors duration-300 font-light hidden sm:block',
                  isActive     ? 'text-[#7A1C28] font-medium'
                  : isCompleted ? 'text-[#2A221E]/70'
                  : 'text-[#C9A96E]/60'
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
