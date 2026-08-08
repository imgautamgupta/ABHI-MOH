'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FOOTER_LEFT_SOCIALS, FOOTER_RIGHT_SOCIALS } from './footer.constants';
import { FOOTER_SOCIAL_CONTAINER, FOOTER_SOCIAL_ITEM } from './footer.animations';

export const FooterLinks: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center font-satoshi">
      {/* Center Subtitle Above Wordmark with Refined Spacing */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
        className="flex flex-col items-center justify-center text-center mb-6"
      >
        <span className="font-section text-xl sm:text-2xl md:text-3xl italic font-light tracking-[0.28em] text-[#E5C388]">
          The Essence of Elegance
        </span>
      </motion.div>

      {/* Symmetrical Social Links Grid */}
      <motion.div
        variants={FOOTER_SOCIAL_CONTAINER}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="w-full flex items-center justify-between gap-6 sm:gap-12 py-5 border-t border-b border-[#C89D5C]/20"
      >
        {/* Left Group: Instagram & Pinterest */}
        <div className="flex items-center gap-8 sm:gap-14">
          {FOOTER_LEFT_SOCIALS.map((link) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={link.label}
                variants={FOOTER_SOCIAL_ITEM}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-2 py-1 text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-[#F6ECE1]/85 hover:text-[#E5C388] transition-all duration-300 ease-silk focus:outline-none rounded-sm"
                aria-label={link.label}
              >
                <Icon className="w-4 h-4 text-[#C89D5C] group-hover:text-[#E5C388] transition-colors duration-300 flex-shrink-0" />
                <span className="transition-transform duration-300 ease-silk group-hover:-translate-y-[2px]">
                  {link.label}
                </span>
                <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#C89D5C] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-silk origin-left" />
              </motion.a>
            );
          })}
        </div>

        {/* Right Group: WhatsApp & Email */}
        <div className="flex items-center gap-8 sm:gap-14">
          {FOOTER_RIGHT_SOCIALS.map((link) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={link.label}
                variants={FOOTER_SOCIAL_ITEM}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-2 py-1 text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-[#F6ECE1]/85 hover:text-[#E5C388] transition-all duration-300 ease-silk focus:outline-none rounded-sm"
                aria-label={link.label}
              >
                <Icon className="w-4 h-4 text-[#C89D5C] group-hover:text-[#E5C388] transition-colors duration-300 flex-shrink-0" />
                <span className="transition-transform duration-300 ease-silk group-hover:-translate-y-[2px]">
                  {link.label}
                </span>
                <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#C89D5C] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-silk origin-left" />
              </motion.a>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

FooterLinks.displayName = 'FooterLinks';
