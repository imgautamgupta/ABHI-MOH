'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, RotateCcw, ShieldAlert, Truck, CheckCircle2 } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'How do I verify the purity & authenticity of ABHI-MOH silk sarees?',
    answer: 'Every saree from ABHI-MOH is accompanied by an official 100% Pure Silk Mark Hallmark Certificate and a unique serial-numbered authenticity card. Our weaves are crafted using pure mulberry silk yarn and certified silver/gold zari.',
  },
  {
    question: 'Can I request custom blouse stitching or bespoke zardozi embroidery?',
    answer: 'Yes, our master atelier provides bespoke tailoring services. Upon selecting your saree, you can choose custom blouse stitching, custom neckline designs, or request personalized zardozi hand-embroidery.',
  },
  {
    question: 'What are the domestic and international insured shipping timelines?',
    answer: 'We provide complimentary express insured shipping across India (3–5 business days). International orders are shipped via DHL Express / FedEx Insured Air (5–7 business days worldwide).',
  },
  {
    question: 'Do you offer private salon appointments or virtual video styling?',
    answer: 'Absolutely. You may book a 1-on-1 virtual styling salon session with our senior draper or schedule a private appointment at our flagship ateliers in New Delhi and Mumbai.',
  },
  {
    question: 'How should I store and preserve heavy gold zari sarees at home?',
    answer: 'Store pure silk sarees wrapped in unbleached cotton muslin in a cool, dry closet. Refold the saree along new fold lines every three months to prevent fiber strain.',
  },
];

export const FaqAndReturnSection: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section className="w-full py-24 lg:py-28 bg-[#F5EFE7] text-[#382C26] font-satoshi relative border-t border-[#D9C7A7]/60 transition-colors duration-500">
      <div className="max-w-[1920px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-medium tracking-[0.3em] uppercase text-[#7D2130] bg-[#EADFCF] px-4 py-1.5 rounded-full border border-[#D9C7A7] inline-block mb-3 shadow-xs">
            ASSURANCE & CLIENT SERVICES
          </span>
          <h2 className="font-hero text-3xl sm:text-4xl lg:text-5xl font-[500] tracking-[0.06em] uppercase text-[#382C26]">
            Frequently Asked Questions
          </h2>
          <p className="font-sans text-sm text-[#736357] mt-2 font-normal leading-relaxed">
            Everything you need to know about our handcrafted sarees, authenticity, and concierge services.
          </p>
        </div>

        {/* TWO COLUMN GRID: FAQS ON LEFT, RETURN POLICY ON RIGHT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* LEFT: ELEGANT FAQS ACCORDION (7 COLS) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-[#EADFCF]/50 border border-[#D9C7A7] rounded-[20px] overflow-hidden shadow-xs transition-all duration-300"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-section text-lg sm:text-xl font-medium text-[#382C26] hover:text-[#7D2130] transition-colors duration-200">
                      {item.question}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-[#D9C7A7]/50 flex items-center justify-center text-[#7D2130] flex-shrink-0">
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="px-6 pb-7 sm:px-7 font-sans text-sm text-[#736357] font-light leading-relaxed border-t border-[#D9C7A7]/50 pt-4">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* RIGHT: DEDICATED RETURN POLICY CARD (5 COLS) */}
          <div className="lg:col-span-5 bg-[#F5EFE7] border border-[#D9C7A7] rounded-[24px] p-8 sm:p-10 shadow-md flex flex-col justify-between relative overflow-hidden">
            {/* Background Subtle Ornament */}
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#EADFCF] rounded-full blur-2xl pointer-events-none opacity-80" />

            <div>
              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#7D2130] text-[#F5EFE7] flex items-center justify-center shadow-xs">
                  <RotateCcw className="w-6 h-6 text-[#D9C7A7]" />
                </div>
                <div>
                  <span className="text-[10px] font-medium tracking-[0.25em] uppercase text-[#7D2130] block">
                    OUR PROMISE
                  </span>
                  <h3 className="font-hero text-xl font-medium uppercase text-[#382C26]">
                    Return & Exchange Policy
                  </h3>
                </div>
              </div>

              <p className="font-sans text-sm text-[#736357] font-light leading-relaxed mb-6">
                Every ABHI-MOH creation undergoes rigorous quality inspection. If you wish to exchange your purchase, we provide a seamless 7-day hassle-free domestic exchange process with white-glove courier pickup.
              </p>

              {/* Quick Feature Highlights */}
              <div className="space-y-3.5 mb-8">
                <div className="flex items-center gap-3 text-xs text-[#382C26] font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#7D2130]" />
                  <span>7-Day Complimentary Domestic Exchanges</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-[#382C26] font-medium">
                  <Truck className="w-4 h-4 text-[#7D2130]" />
                  <span>Insured Doorstep White-Glove Pickup</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-[#382C26] font-medium">
                  <ShieldAlert className="w-4 h-4 text-[#7D2130]" />
                  <span>Authenticity Tag & Box Integrity Preserved</span>
                </div>
              </div>
            </div>

            {/* Read Full Policy Button */}
            <Link
              href="/returns"
              className="w-full bg-[#7D2130] hover:bg-[#5E1522] text-[#F5EFE7] font-satoshi text-xs uppercase tracking-[0.2em] font-medium py-4 rounded-full shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer text-center block"
            >
              Read Full Policy
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

FaqAndReturnSection.displayName = 'FaqAndReturnSection';

