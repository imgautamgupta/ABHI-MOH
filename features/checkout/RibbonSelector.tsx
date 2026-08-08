'use client';

import React from 'react';
import { RIBBON_OPTIONS } from './checkout.constants';
import { RibbonOption } from './checkout.types';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export interface RibbonSelectorProps {
  selectedRibbonId: string;
  onSelectRibbon: (ribbon: RibbonOption) => void;
  className?: string;
}

export const RibbonSelector: React.FC<RibbonSelectorProps> = ({
  selectedRibbonId,
  onSelectRibbon,
  className,
}) => {
  return (
    <div className={cn('flex flex-col gap-2 font-satoshi text-xs text-left w-full', className)}>
      <span className="uppercase tracking-[0.18em] text-secondary-text/80 text-[10px]">
        Select Silk Ribbon Color
      </span>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {RIBBON_OPTIONS.map((ribbon) => {
          const isSelected = ribbon.id === selectedRibbonId;
          return (
            <button
              key={ribbon.id}
              type="button"
              onClick={() => onSelectRibbon(ribbon)}
              className={cn(
                'flex items-center gap-2.5 p-2.5 rounded-sm bg-[#181818] border transition-all duration-300 select-none cursor-pointer text-left',
                isSelected
                  ? 'border-[#5E0006] bg-[#5E0006]/10 ring-1 ring-[#5E0006]'
                  : 'border-borders hover:border-warm-cream/40'
              )}
            >
              {/* Color Swatch Circle */}
              <div
                className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center flex-shrink-0 shadow-sm"
                style={{ backgroundColor: ribbon.hex }}
              >
                {isSelected && <Check className="w-3 h-3 text-white drop-shadow" />}
              </div>

              <span className="text-[11px] font-medium text-warm-cream uppercase tracking-wider truncate">
                {ribbon.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

RibbonSelector.displayName = 'RibbonSelector';
