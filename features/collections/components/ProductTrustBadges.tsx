'use client';

import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ProductTrustBadgesProps {
  className?: string;
}

export const ProductTrustBadges: React.FC<ProductTrustBadgesProps> = ({ className }) => {
  const trustItems = [
    {
      icon: <ShieldCheck className="w-4 h-4 text-[#7D2130]" />,
      title: 'Authenticity Assured',
      subtitle: 'Certified handloom provenance',
    },
    {
      icon: <Truck className="w-4 h-4 text-[#7D2130]" />,
      title: 'Pan-India Express',
      subtitle: 'Complimentary insured shipping',
    },
    {
      icon: <RotateCcw className="w-4 h-4 text-[#7D2130]" />,
      title: '7-Day Easy Exchange',
      subtitle: 'Doorstep pickup available',
    },
    {
      icon: <Lock className="w-4 h-4 text-[#7D2130]" />,
      title: '100% Secure Checkout',
      subtitle: 'Encrypted payment gateways',
    },
  ];

  return (
    <div className={cn('grid grid-cols-2 gap-2.5 sm:gap-3', className)}>
      {trustItems.map((item, idx) => (
        <div
          key={idx}
          className="flex items-start gap-2.5 p-3 rounded-xs bg-[#FAF7F2] border border-[#D9C7A7]/40 shadow-2xs"
        >
          <div className="p-1 rounded-full bg-[#7D2130]/5 flex-shrink-0 mt-0.5">
            {item.icon}
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-medium text-[#382C26] tracking-wide">
              {item.title}
            </span>
            <span className="text-[10px] text-[#736357]/80 font-light leading-tight mt-0.5">
              {item.subtitle}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

ProductTrustBadges.displayName = 'ProductTrustBadges';
