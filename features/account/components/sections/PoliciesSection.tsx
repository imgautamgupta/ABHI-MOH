'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ShieldCheck, Truck, RotateCcw, Sparkles } from 'lucide-react';

export const PoliciesSection: React.FC = () => {
  const policies = [
    {
      title: '7-Day Return & Exchange Protocol',
      icon: RotateCcw,
      content:
        'All standard saree drapes may be returned or exchanged within 7 calendar days from verified doorstep delivery. The piece must remain unworn, with original atelier tags, fall-pico intact, and inside the signature archival presentation casket. Returns and exchanges are handled via complimentary white-glove courier pickup.',
    },
    {
      title: 'Silk Mark & Pure Zari Certification',
      icon: ShieldCheck,
      content:
        'Every ABHI-MOH drape is accompanied by a registered Silk Mark Certificate and an atelier handloom provenance seal. Real zari pieces (electroplated gold and silver zari threads) undergo rigorous quality verification by certified textile masters before dispatch.',
    },
    {
      title: 'White-Glove Shipping & Delivery Timelines',
      icon: Truck,
      content:
        'In-stock boutique sarees are dispatched within 24–48 hours via insured express air courier (2–4 business days across India). Bespoke bridal commissions, custom blouse stitching, or specialized zari inscriptions require 10–14 crafting days prior to shipment.',
    },
    {
      title: 'Heirloom Saree Care & Storage Guidelines',
      icon: Sparkles,
      content:
        'Pure Katan silk and delicate Banarasi zari drapes should be dry-cleaned only by specialized heritage textile cleaners. Store folded in breathable cotton or muslin fabric (provided in your archival box) away from direct sunlight, and refold along different crease lines every 4–6 months.',
    },
    {
      title: 'Personal Membership Privileges & Discretion',
      icon: FileText,
      content:
        'Personal membership discounts (Silver 3%, Gold 5%) are non-transferable and calculated securely per verified client account. Milestones are credited only after the 7-day return window concludes safely without returns or exchanges.',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="space-y-8 font-satoshi text-[#2A221E]"
    >
      {/* Header */}
      <div className="border-b border-[#E8DFD5] pb-4">
        <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#7A1C28]">
          Atelier Standards
        </span>
        <h2 className="font-hero text-2xl uppercase tracking-wider text-[#2A221E] mt-0.5">
          Client Terms & Policies
        </h2>
      </div>

      <div className="space-y-4">
        {policies.map((p, idx) => {
          const Icon = p.icon;
          return (
            <div
              key={idx}
              className="bg-[#FFFDFC] border border-[#E8DFD5] rounded-2xl p-6 shadow-xs space-y-2.5"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#7A1C28]/10 text-[#7A1C28] flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="font-hero text-base uppercase tracking-wider text-[#2A221E]">
                  {p.title}
                </h3>
              </div>
              <p className="text-xs text-[#6E645A] font-light leading-relaxed pl-11">
                {p.content}
              </p>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};
