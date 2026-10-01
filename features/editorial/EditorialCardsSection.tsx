'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Sparkles, Compass, ShieldCheck, Flame, X, ArrowRight, CheckCircle2 } from 'lucide-react';

export interface EditorialCardItem {
  id: 'sale' | 'materials' | 'origins' | 'care' | 'new';
  title: string;
  category: string;
  description: string;
  badge: string;
  cardBg: string;
  textColor: string;
  accentColor: string;
  icon: React.ReactNode;
  modalContent: {
    heading: string;
    subheading: string;
    points: { title: string; desc: string }[];
    ctaText: string;
  };
}

const EDITORIAL_CARDS: EditorialCardItem[] = [
  {
    id: 'sale',
    category: 'ARCHIVE PRIVILEGE',
    title: 'Private Offers & Sale',
    description: 'Up to 30% off selected bridal heirlooms and private salon archives.',
    badge: 'Limited Offers',
    cardBg: 'bg-[#7D2130]',
    textColor: 'text-[#F5EFE7]',
    accentColor: 'text-[#D9C7A7]',
    icon: <Tag className="w-6 h-6 text-[#D9C7A7]" />,
    modalContent: {
      heading: 'Private Salon Sale & Archival Privilege',
      subheading: 'Access rare past-season weaves and exclusive client courtesies.',
      points: [
        { title: 'Bespoke Savings', desc: 'Enjoy up to 30% savings on authenticated Kanjeevaram and Banarasi pure silk sarees.' },
        { title: 'VIP Salon Code', desc: 'Use complimentary code ABHI-ROYAL30 during private checkout.' },
        { title: 'Complimentary Fall & Picot', desc: 'All sale sarees include complimentary silk stitching and cotton fall application.' },
      ],
      ctaText: 'Explore Private Offers',
    },
  },
  {
    id: 'materials',
    category: 'RAW AUTHENTICITY',
    title: 'Pure Weave Materials',
    description: '100% Mulberry Silk, Fine Organza, Chanderi Tissue & Handloom Cotton.',
    badge: 'Pure Silk Mark',
    cardBg: 'bg-[#F5EFE7]',
    textColor: 'text-[#382C26]',
    accentColor: 'text-[#7D2130]',
    icon: <Sparkles className="w-6 h-6 text-[#7D2130]" />,
    modalContent: {
      heading: 'Artisanal Fabrics & Pure Weave Materials',
      subheading: 'Only 100% natural, ethically harvested silk and organic cotton fibers.',
      points: [
        { title: 'Pure Mulberry Katan Silk', desc: 'Untwisted high-density silk threads delivering unmatched luster and fluid drape.' },
        { title: 'Chanderi Tissue Silk', desc: 'Lightweight gossamer weave interwoven with gold zari threads for ethereal shimmer.' },
        { title: 'Sheer Organza & Handloom Cotton', desc: 'Crisp structural organza and breathable hand-spun cotton for timeless elegance.' },
      ],
      ctaText: 'Learn Fabric Science',
    },
  },
  {
    id: 'origins',
    category: 'GEOGRAPHY OF HERITAGE',
    title: 'Royal Saree Origins',
    description: 'Discover regional weaving clusters across Varanasi, Kanchipuram & Chanderi.',
    badge: '4 Master Guilds',
    cardBg: 'bg-[#382C26]',
    textColor: 'text-[#F5EFE7]',
    accentColor: 'text-[#D9C7A7]',
    icon: <Compass className="w-6 h-6 text-[#D9C7A7]" />,
    modalContent: {
      heading: 'Geography of Royal Indian Saree Origins',
      subheading: 'Mapping India’s most revered weaving dynasties across centuries.',
      points: [
        { title: 'Varanasi (Banaras)', desc: 'Famous for Mughal brocade jaal motifs, heavy zari borders, and Katan silk texture.' },
        { title: 'Kanchipuram (Tamil Nadu)', desc: 'Triple-twisted silk yarn woven with solid korvai contrast borders.' },
        { title: 'Chanderi & Paithan', desc: 'Tissue transparency from Madhya Pradesh and peacock tapestry pallus from Maharashtra.' },
      ],
      ctaText: 'View Heritage Map',
    },
  },
  {
    id: 'care',
    category: 'FABRIC PRESERVATION',
    title: 'Heirloom Care Guide',
    description: 'Expert preservation tips, pure muslin wrapping & dry cleaning care.',
    badge: 'Silk Preservation',
    cardBg: 'bg-[#EADFCF]',
    textColor: 'text-[#382C26]',
    accentColor: 'text-[#7D2130]',
    icon: <ShieldCheck className="w-6 h-6 text-[#7D2130]" />,
    modalContent: {
      heading: 'Heirloom Saree Preservation Rituals',
      subheading: 'Ensure your pure silk sarees retain their vibrant sheen for generations.',
      points: [
        { title: 'Breathable Muslin Storage', desc: 'Always store silk sarees wrapped in unbleached pure cotton muslin cloth.' },
        { title: 'Periodic Unfolding', desc: 'Refold your sarees along new crease lines every 3 months to prevent thread break.' },
        { title: 'Dry Clean Exclusive', desc: 'Never machine wash or line dry pure silk sarees in direct sunlight.' },
      ],
      ctaText: 'Download Full Guide',
    },
  },
  {
    id: 'new',
    category: 'RUNWAY 2026',
    title: 'New Season Arrivals',
    description: 'Fresh off traditional pit looms. Experience Monsoon 2026 Couture.',
    badge: 'Just Arrived',
    cardBg: 'bg-[#F5EFE7]',
    textColor: 'text-[#382C26]',
    accentColor: 'text-[#7D2130]',
    icon: <Flame className="w-6 h-6 text-[#7D2130]" />,
    modalContent: {
      heading: 'Monsoon 2026 Haute Couture Collection',
      subheading: 'Introducing modern pastel hues and antique gold zari motifs.',
      points: [
        { title: 'Pastel Organza Zardozi', desc: 'Subtle blush, mint, and champagne organza sarees with delicate pearl borders.' },
        { title: 'Vintage Tissue Silks', desc: 'Lightweight metallic drape crafted for contemporary evening occasions.' },
        { title: 'Artisan Signature Series', desc: 'Only 10 pieces woven per design, individually numbered with certificate.' },
      ],
      ctaText: 'Browse New Runway',
    },
  },
];

export const EditorialCardsSection: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<EditorialCardItem | null>(null);

  return (
    <section className="w-full py-24 lg:py-28 bg-[#F4EBE1] text-[#382C26] font-satoshi relative border-t border-[#D9C7A7]/50 transition-colors duration-500">
      <div className="max-w-[1920px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* SECTION HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="text-[11px] font-medium tracking-[0.3em] uppercase text-[#7D2130] bg-[#F5EFE7] px-4 py-1.5 rounded-full border border-[#D9C7A7] inline-block mb-3 shadow-xs">
            EDITORIAL INSIGHTS
          </span>
          <h2 className="font-hero text-3xl sm:text-4xl lg:text-5xl font-[500] tracking-[0.06em] uppercase text-[#382C26]">
            Atelier Highlights
          </h2>
          <p className="font-sans text-sm text-[#736357] mt-2 font-normal leading-relaxed">
            Explore curated offers, fabric craftsmanship, regional origins, and fabric care secrets.
          </p>
        </motion.div>

        {/* FIVE EDITORIAL CARDS IN ONE RESPONSIVE ROW */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 lg:gap-6 items-stretch">
          {EDITORIAL_CARDS.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{ y: -6 }}
              onClick={() => setSelectedCard(card)}
              className={`relative ${card.cardBg} ${card.textColor} p-6 sm:p-7 rounded-[22px] flex flex-col justify-between cursor-pointer transition-all duration-300 group border ${
                card.id === 'new' ? 'border-2 border-[#A67C52]' : 'border border-[#D9C7A7]'
              } ${card.id === 'sale' || card.id === 'origins' ? 'shadow-md' : 'shadow-xs'}`}
            >
              {/* TOP HEADER & ICON */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-current/10 backdrop-blur-xs">
                    {card.icon}
                  </div>
                  <span
                    className={`text-[10px] uppercase tracking-widest font-medium px-2.5 py-1 rounded-full ${
                      card.id === 'sale'
                        ? 'bg-[#D9C7A7] text-[#382C26]'
                        : 'bg-[#EADFCF] text-[#7D2130]'
                    }`}
                  >
                    {card.badge}
                  </span>
                </div>

                <span className={`text-[10px] font-medium tracking-[0.2em] uppercase block mb-1.5 ${card.accentColor}`}>
                  {card.category}
                </span>

                <h3 className="font-hero text-xl font-medium tracking-wide mb-2 line-clamp-1">
                  {card.title}
                </h3>

                <p className="font-sans text-xs opacity-85 font-light leading-relaxed line-clamp-3">
                  {card.description}
                </p>
              </div>

              {/* READ MORE CTA */}
              <div className="mt-8 pt-4 border-t border-current/15 flex items-center justify-between text-xs font-medium uppercase tracking-wider group-hover:translate-x-1 transition-transform duration-300">
                <span>Discover</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* INTERACTIVE EDITORIAL MODAL */}
      <AnimatePresence>
        {selectedCard && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCard(null)}
              className="fixed inset-0 bg-[#382C26]/60 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-2xl bg-[#F5EFE7] text-[#382C26] rounded-[24px] p-6 sm:p-10 shadow-2xl border border-[#D9C7A7] z-10 font-satoshi overflow-hidden"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedCard(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#EADFCF] text-[#382C26] hover:bg-[#7D2130] hover:text-[#F5EFE7] transition-colors duration-200 flex items-center justify-center cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="mb-6">
                <span className="text-[11px] font-medium tracking-[0.25em] uppercase text-[#7D2130] bg-[#EADFCF] px-3.5 py-1.5 rounded-full border border-[#D9C7A7] inline-block mb-3">
                  {selectedCard.category}
                </span>
                <h3 className="font-hero text-2xl sm:text-3xl font-medium uppercase text-[#382C26]">
                  {selectedCard.modalContent.heading}
                </h3>
                <p className="font-sans text-sm text-[#736357] mt-1 font-light">
                  {selectedCard.modalContent.subheading}
                </p>
              </div>

              {/* Points */}
              <div className="space-y-4 my-8">
                {selectedCard.modalContent.points.map((pt, i) => (
                  <div key={i} className="p-4 bg-[#EADFCF]/60 border border-[#D9C7A7] rounded-xl flex items-start gap-3.5">
                    <CheckCircle2 className="w-5 h-5 text-[#7D2130] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-section text-base font-medium text-[#382C26]">{pt.title}</h4>
                      <p className="font-sans text-xs text-[#736357] font-light mt-0.5 leading-relaxed">{pt.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Modal CTA */}
              <div className="flex justify-end pt-4 border-t border-[#D9C7A7]">
                <button
                  type="button"
                  onClick={() => setSelectedCard(null)}
                  className="bg-[#7D2130] hover:bg-[#5E1522] text-[#F5EFE7] font-satoshi text-xs uppercase tracking-[0.2em] font-medium px-8 py-3.5 rounded-full shadow-md transition-all duration-300 cursor-pointer"
                >
                  {selectedCard.modalContent.ctaText}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

EditorialCardsSection.displayName = 'EditorialCardsSection';
