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
      <span className="uppercase tracking-[0.18em] text-[#736357] text-[10px] font-medium">
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
                'flex items-center gap-2.5 p-3 rounded-xl border transition-all duration-300 select-none cursor-pointer text-left',
                isSelected
                  ? 'border-[#7A1C28] bg-[#7A1C28]/5 ring-1 ring-[#7A1C28]/20'
                  : 'border-[#E8DFD5] bg-[#FAF7F2] hover:border-[#D9C7A7] hover:bg-white'
              )}
            >
              {/* Color Swatch Circle */}
              <div
                className="w-5 h-5 rounded-full border border-black/10 flex items-center justify-center flex-shrink-0 shadow-xs"
                style={{ backgroundColor: ribbon.hex }}
              >
                {isSelected && <Check className="w-3 h-3 text-white drop-shadow-sm" />}
              </div>

              <span className="text-[11px] font-medium text-[#2A221E] uppercase tracking-wider truncate">
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
