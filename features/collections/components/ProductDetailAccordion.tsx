'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Sparkles, ShieldCheck, Truck, RotateCcw, Info } from 'lucide-react';
import { SareeProduct } from './hanging-card.types';
import { ProductDescription } from './ProductDescription';
import { cn } from '@/lib/utils';

export interface ProductDetailAccordionProps {
  product: SareeProduct;
  className?: string;
}

interface AccordionItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

export const ProductDetailAccordion: React.FC<ProductDetailAccordionProps> = ({
  product,
  className,
}) => {
  const [openIds, setOpenIds] = useState<string[]>(['specs', 'care']);

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const accordionItems: AccordionItem[] = [
    {
      id: 'specs',
      title: 'Craft & Saree Specifications',
      icon: <Sparkles className="w-4 h-4 text-[#7D2130]" />,
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3.5 gap-x-6 text-xs text-[#382C26] pt-1">
          <div className="flex flex-col gap-0.5 border-b border-[#D9C7A7]/30 pb-2">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#736357]/80">Material / Fabric</span>
            <span className="font-medium text-[#382C26]">{product.material || 'Pure Handloom Silk'}</span>
          </div>

          <div className="flex flex-col gap-0.5 border-b border-[#D9C7A7]/30 pb-2">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#736357]/80">Origin & Craft Cluster</span>
            <span className="font-medium text-[#382C26]">{product.origin || 'Varanasi, India'}</span>
          </div>

          <div className="flex flex-col gap-0.5 border-b border-[#D9C7A7]/30 pb-2">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#736357]/80">Weave Technique</span>
            <span className="font-medium text-[#382C26]">{product.weave || 'Artisanal Handloom Brocade'}</span>
          </div>

          <div className="flex flex-col gap-0.5 border-b border-[#D9C7A7]/30 pb-2">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#736357]/80">Saree Length</span>
            <span className="font-medium text-[#382C26]">{product.sareeLength || '5.5 Meters'}</span>
          </div>

          <div className="flex flex-col gap-0.5 border-b border-[#D9C7A7]/30 pb-2">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#736357]/80">Blouse Piece</span>
            <span className="font-medium text-[#382C26]">{product.blousePiece || 'Included (0.8m Unstitched)'}</span>
          </div>

          <div className="flex flex-col gap-0.5 border-b border-[#D9C7A7]/30 pb-2">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#736357]/80">Care</span>
            <span className="font-medium text-[#382C26]">{product.care || 'Dry Clean Only'}</span>
          </div>
        </div>
      ),
    },
    {
      id: 'care',
      title: 'Care & Fabric Preservation',
      icon: <ShieldCheck className="w-4 h-4 text-[#7D2130]" />,
      content: (
        <div className="text-xs text-[#5c4d44] leading-relaxed flex flex-col gap-2 pt-1">
          <p>
            To maintain the lustre and longevity of authentic artisanal weaves, please observe the following heirloom care recommendations:
          </p>
          <ul className="list-disc pl-4 space-y-1 text-[#736357]">
            <li><strong>Dry clean only</strong> by specialized garment care professionals.</li>
            <li>Store your saree wrapped in unbleached cotton or pure muslin cloth.</li>
            <li>Periodically air the saree in shade; avoid direct harsh sunlight.</li>
            <li>Avoid spraying perfumes directly onto the pure silk or gold zari.</li>
            <li>Iron on low silk heat with a protective pressing cloth over zari borders.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'shipping',
      title: 'Complimentary Shipping & Delivery',
      icon: <Truck className="w-4 h-4 text-[#7D2130]" />,
      content: (
        <div className="text-xs text-[#5c4d44] leading-relaxed flex flex-col gap-2 pt-1">
          <p>
            Every ABHI-MOH creation is dispatched in our signature reinforced heritage gift box with tamper-evident security packaging.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
            <div className="p-3 bg-[#FAF7F2] border border-[#D9C7A7]/40 rounded-xs">
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#7D2130] block mb-1">
                Pan-India Express
              </span>
              <p className="text-[11px] text-[#736357]">
                Delivered in 3–5 business days. Real-time SMS and email tracking provided.
              </p>
            </div>
            <div className="p-3 bg-[#FAF7F2] border border-[#D9C7A7]/40 rounded-xs">
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#7D2130] block mb-1">
                Worldwide Courier
              </span>
              <p className="text-[11px] text-[#736357]">
                International expedited shipping available at checkout (5–8 business days).
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'returns',
      title: '7-Day Easy Exchange Policy',
      icon: <RotateCcw className="w-4 h-4 text-[#7D2130]" />,
      content: (
        <div className="text-xs text-[#5c4d44] leading-relaxed flex flex-col gap-2 pt-1">
          <p>
            We take tremendous pride in our craftsmanship. If you wish to exchange your piece:
          </p>
          <ul className="list-disc pl-4 space-y-1 text-[#736357]">
            <li>Notify our concierge within <strong>7 days</strong> of delivery.</li>
            <li>Saree must be in its original unworn condition with all authenticity tags intact.</li>
            <li>Doorstep reverse pickup arranged across all major Indian cities.</li>
          </ul>
        </div>
      ),
    },
  ];

  // Add Wix custom additional info sections if present
  if (product.additionalInfo && product.additionalInfo.length > 0) {
    product.additionalInfo.forEach((section, idx) => {
      accordionItems.push({
        id: `wix-info-${idx}`,
        title: section.title,
        icon: <Info className="w-4 h-4 text-[#7D2130]" />,
        content: <ProductDescription description={section.description} />,
      });
    });
  }

  return (
    <div className={cn('flex flex-col divide-y divide-[#D9C7A7]/40 border-t border-b border-[#D9C7A7]/40', className)}>
      {accordionItems.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div key={item.id} className="py-4">
            <button
              type="button"
              onClick={() => toggleItem(item.id)}
              className="w-full flex items-center justify-between gap-3 text-left focus:outline-none cursor-pointer group"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-2.5">
                {item.icon}
                <span className="font-hero text-sm sm:text-base font-normal tracking-[0.06em] text-[#382C26] group-hover:text-[#7D2130] transition-colors">
                  {item.title}
                </span>
              </div>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-[#736357] group-hover:text-[#7D2130]"
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pt-3 pb-1">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

ProductDetailAccordion.displayName = 'ProductDetailAccordion';
