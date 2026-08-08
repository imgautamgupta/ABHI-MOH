'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AddToBagButtonProps {
  onAdd?: () => void;
  className?: string;
}

export const AddToBagButton: React.FC<AddToBagButtonProps> = ({ onAdd, className }) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdded(true);
    if (onAdd) onAdd();

    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      className={cn(
        'w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#8C1C2A] via-[#A32233] to-[#7A1523] text-[#F6ECE1] border border-[#C89D5C]/35 hover:border-[#C89D5C]/70 font-satoshi font-medium text-xs uppercase tracking-[0.2em] transition-all duration-500 ease-silk flex items-center justify-center gap-2 select-none cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C89D5C]/50 shadow-md hover:shadow-lg transform translate-y-3 opacity-80 group-hover:translate-y-0 group-hover:opacity-100',
        isAdded && 'bg-emerald-950 text-emerald-100 border-emerald-500/50 hover:bg-emerald-900 opacity-100 translate-y-0',
        className
      )}
      aria-label="Add To Bag"
    >
      {isAdded ? (
        <>
          <Check className="w-4 h-4 text-emerald-300" />
          <span>Added To Bag</span>
        </>
      ) : (
        <>
          <ShoppingBag className="w-3.5 h-3.5 text-[#E5C388]" />
          <span>Add To Bag</span>
        </>
      )}
    </motion.button>
  );
};

AddToBagButton.displayName = 'AddToBagButton';
