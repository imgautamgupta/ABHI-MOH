'use client';

import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { QUANTITY_POP_VARIANTS } from './cart.animations';
import { cn } from '@/lib/utils';

export interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  className?: string;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  className,
}) => {
  const [animatePop, setAnimatePop] = useState(false);

  const handleAction = (action: () => void) => {
    action();
    setAnimatePop(true);
    setTimeout(() => setAnimatePop(false), 150);
  };

  const isMin = quantity <= 1;

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#FAF7F2] border border-[#D9C7A7]/70 rounded-xs font-satoshi text-xs select-none shadow-2xs',
        className
      )}
    >
      <button
        type="button"
        onClick={() => {
          if (!isMin) handleAction(onDecrease);
        }}
        disabled={isMin}
        className={cn(
          'w-7 h-7 flex items-center justify-center rounded-xs transition-colors duration-200 focus:outline-none active:scale-90',
          isMin
            ? 'text-[#736357]/40 cursor-not-allowed'
            : 'text-[#736357] hover:text-[#7D2130] hover:bg-[#7D2130]/10 cursor-pointer'
        )}
        aria-label="Decrease Quantity"
      >
        <Minus className="w-3.5 h-3.5" />
      </button>

      <motion.span
        variants={QUANTITY_POP_VARIANTS}
        animate={animatePop ? 'pop' : 'idle'}
        className="font-medium text-[#382C26] min-w-[20px] text-center text-xs"
      >
        {quantity}
      </motion.span>

      <button
        type="button"
        onClick={() => handleAction(onIncrease)}
        className="w-7 h-7 flex items-center justify-center rounded-xs text-[#736357] hover:text-[#7D2130] hover:bg-[#7D2130]/10 transition-colors duration-200 focus:outline-none cursor-pointer active:scale-90"
        aria-label="Increase Quantity"
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

QuantitySelector.displayName = 'QuantitySelector';
