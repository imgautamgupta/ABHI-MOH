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
      className={cn('flex flex-col gap-6 font-satoshi text-xs text-left w-full', className)}
    >
      <div className="flex flex-col gap-1 border-b border-white/[0.08] pb-3">
        <h3 className="font-hero text-xl font-[500] uppercase tracking-[0.16em] text-[#5E0006]">
          Step 3: Bespoke Gift Packaging & Presentation
        </h3>
        <p className="font-sans text-xs font-light text-secondary-text">
          Select a signature box, satin ribbon color, and personalize your gift message.
        </p>
      </div>

      {/* 1. GIFT BOX CARDS GRID */}
      <div className="flex flex-col gap-2">
        <span className="uppercase tracking-[0.18em] text-secondary-text/80 text-[10px]">
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

      {/* 3. GIFT MESSAGE INPUT */}
      <GiftMessage
        message={data.giftMessage}
        onChange={(msg) => onChange({ ...data, giftMessage: msg })}
      />

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
          Continue To Review
        </button>
      </div>
    </motion.form>
  );
};

GiftExperience.displayName = 'GiftExperience';
