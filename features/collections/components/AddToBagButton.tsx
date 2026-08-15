'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AddToBagButtonProps {
  onAdd?: () => void;
  disabled?: boolean;
  className?: string;
}

export const AddToBagButton: React.FC<AddToBagButtonProps> = ({ onAdd, disabled = false, className }) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled) return;
    setIsAdded(true);
    if (onAdd) onAdd();

    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        'group/btn relative w-full py-2.5 px-4 rounded-xs border font-satoshi font-medium text-[11px] uppercase tracking-[0.2em] transition-all duration-400 overflow-hidden flex items-center justify-between select-none focus:outline-none focus-visible:ring-1 focus-visible:ring-[#7D2130]',
        disabled
          ? 'border-[#D9C7A7]/50 text-[#736357]/50 cursor-not-allowed'
          : 'border-[#7D2130]/30 hover:border-[#7D2130] text-[#7D2130] hover:text-[#FAF7F2] cursor-pointer',
        isAdded && 'bg-emerald-800 text-emerald-50 border-emerald-700 hover:bg-emerald-700 hover:text-white',
        className
      )}
      aria-label={disabled ? 'Out Of Stock' : 'Add To Bag'}
    >
      {/* Gentle expanding burgundy background on hover */}
      {!disabled && (
        <span className="absolute inset-0 bg-[#7D2130] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-400 ease-out -z-10" />
      )}

      {disabled ? (
        <span className="flex items-center justify-between w-full">
          <span>Out Of Stock</span>
        </span>
      ) : isAdded ? (
        <span className="flex items-center justify-between w-full text-emerald-100 font-medium">
          <span>Added To Bag</span>
          <Check className="w-3.5 h-3.5 text-emerald-200" />
        </span>
      ) : (
        <span className="flex items-center justify-between w-full relative z-10">
          <span>Add To Bag</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
        </span>
      )}
    </button>
  );
};

AddToBagButton.displayName = 'AddToBagButton';

