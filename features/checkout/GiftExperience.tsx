'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GiftExperienceData } from './checkout.types';
import { GIFT_BOX_OPTIONS } from './checkout.constants';
import { GiftBoxCard } from './GiftBoxCard';
import { GiftMessage } from './GiftMessage';
import { RibbonSelector } from './RibbonSelector';
import { STEP_TRANSITION_VARIANTS } from './checkout.animations';
import { cn } from '@/lib/utils';

export interface GiftExperienceProps {
  data: GiftExperienceData;
  onChange: (data: GiftExperienceData) => void;
  onNext: () => void;
  onBack: () => void;
  className?: string;
}

export const GiftExperience: React.FC<GiftExperienceProps> = ({
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
          Bespoke Gift Packaging
        </h3>
        <p className="text-xs font-light text-[#736357]">
          Select a signature box, satin ribbon color, and personalize your gift message.
        </p>
      </div>

      {/* 1. GIFT BOX SELECTION */}
      <div className="flex flex-col gap-2">
        <span className="uppercase tracking-[0.18em] text-[#736357] text-[10px] font-medium">
          Select Packaging Box *
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {GIFT_BOX_OPTIONS.map((option) => (
            <GiftBoxCard
              key={option.id}
              option={option}
              isSelected={data.selectedBoxId === option.id}
              onSelect={() => onChange({ ...data, selectedBoxId: option.id })}
            />
          ))}
        </div>
      </div>

      {/* 2. RIBBON SELECTION */}
      <RibbonSelector
        selectedRibbonId={data.selectedRibbonId}
        onSelectRibbon={(ribbon) => onChange({ ...data, selectedRibbonId: ribbon.id })}
      />

      {/* 3. GIFT MESSAGE */}
      <GiftMessage
        message={data.giftMessage}
        onChange={(msg) => onChange({ ...data, giftMessage: msg })}
      />

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
          Continue To Review
        </button>
      </div>
    </motion.form>
  );
};

GiftExperience.displayName = 'GiftExperience';
