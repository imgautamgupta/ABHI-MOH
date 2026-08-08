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
    setTimeout(() => setAnimatePop(false), 200);
  };

  return (
    <div
      className={cn(
        'inline-flex items-center gap-3 px-3 py-1 bg-surface/90 border border-borders rounded-sm font-satoshi text-xs select-none',
        className
      )}
    >
      <button
        type="button"
        onClick={() => handleAction(onDecrease)}
        className="text-secondary-text hover:text-warm-cream transition-colors duration-200 focus:outline-none p-1"
        aria-label="Decrease Quantity"
      >
        <Minus className="w-3 h-3" />
      </button>

      <motion.span
        variants={QUANTITY_POP_VARIANTS}
        animate={animatePop ? 'pop' : 'idle'}
        className="font-medium text-warm-cream min-w-[16px] text-center"
      >
        {quantity}
      </motion.span>

      <button
        type="button"
        onClick={() => handleAction(onIncrease)}
        className="text-secondary-text hover:text-warm-cream transition-colors duration-200 focus:outline-none p-1"
        aria-label="Increase Quantity"
      >
        <Plus className="w-3 h-3" />
      </button>
    </div>
  );
};

QuantitySelector.displayName = 'QuantitySelector';
