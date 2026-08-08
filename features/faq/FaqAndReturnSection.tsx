'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, RotateCcw, ShieldAlert, Truck, X, CheckCircle2 } from 'lucide-react';

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
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);

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
                    MAISON PROMISE
                  </span>
                  <h3 className="font-hero text-xl font-medium uppercase text-[#382C26]">
                    Return & Exchange Policy
                  </h3>
                </div>
              </div>

              <p className="font-sans text-sm text-[#736357] font-light leading-relaxed mb-6">
                Every ABHI-MOH creation undergoes rigorous quality inspection. If you wish to exchange your purchase, we provide a seamless 14-day hassle-free domestic exchange process with white-glove courier pickup.
              </p>

              {/* Quick Feature Highlights */}
              <div className="space-y-3.5 mb-8">
                <div className="flex items-center gap-3 text-xs text-[#382C26] font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#7D2130]" />
                  <span>14-Day Complimentary Domestic Exchanges</span>
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
            <button
              type="button"
              onClick={() => setIsReturnModalOpen(true)}
              className="w-full bg-[#7D2130] hover:bg-[#5E1522] text-[#F5EFE7] font-satoshi text-xs uppercase tracking-[0.2em] font-medium py-4 rounded-full shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer text-center"
            >
              Read Full Policy
            </button>
          </div>
        </div>
      </div>

      {/* FULL RETURN POLICY MODAL */}
      <AnimatePresence>
        {isReturnModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsReturnModalOpen(false)}
              className="fixed inset-0 bg-[#382C26]/60 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-2xl bg-[#F5EFE7] text-[#382C26] rounded-[24px] p-6 sm:p-10 shadow-2xl border border-[#D9C7A7] z-10 font-satoshi max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsReturnModalOpen(false)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#EADFCF] text-[#382C26] hover:bg-[#7D2130] hover:text-[#F5EFE7] transition-colors duration-200 flex items-center justify-center cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <span className="text-[11px] font-medium tracking-[0.25em] uppercase text-[#7D2130] bg-[#EADFCF] px-3.5 py-1.5 rounded-full border border-[#D9C7A7] inline-block mb-3">
                  COMPLETE GUIDELINES
                </span>
                <h3 className="font-hero text-2xl sm:text-3xl font-medium uppercase text-[#382C26]">
                  Full Return & Exchange Terms
                </h3>
              </div>

              <div className="space-y-6 font-sans text-xs sm:text-sm text-[#736357] font-light leading-relaxed">
                <div>
                  <h4 className="font-section text-base font-medium text-[#382C26] mb-1">1. Eligibility Criteria</h4>
                  <p>
                    Returns or exchanges must be initiated within 14 days of delivery. Sarees must be unworn, unwashed, unaltered, and returned with original Silk Mark authentication tags and luxury box packaging.
                  </p>
                </div>

                <div>
                  <h4 className="font-section text-base font-medium text-[#382C26] mb-1">2. Bespoke & Tailored Items</h4>
                  <p>
                    Sarees with custom blouse stitching or custom hand-embroidery requested by the client are bespoke creations and non-returnable unless a manufacturing defect is identified.
                  </p>
                </div>

                <div>
                  <h4 className="font-section text-base font-medium text-[#382C26] mb-1">3. International Exchanges</h4>
                  <p>
                    For international orders outside India, returns are accepted within 14 days. Return shipping charges and customs duties are borne by the client, unless the product arrived damaged.
                  </p>
                </div>

                <div>
                  <h4 className="font-section text-base font-medium text-[#382C26] mb-1">4. Refund Processing</h4>
                  <p>
                    Once received and inspected at our New Delhi atelier, approved refunds are credited back to your original payment method within 5–7 business days.
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#D9C7A7] flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsReturnModalOpen(false)}
                  className="bg-[#7D2130] hover:bg-[#5E1522] text-[#F5EFE7] font-satoshi text-xs uppercase tracking-[0.2em] font-medium px-8 py-3 rounded-full shadow-md transition-all duration-300 cursor-pointer"
                >
                  I Understand
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

FaqAndReturnSection.displayName = 'FaqAndReturnSection';
