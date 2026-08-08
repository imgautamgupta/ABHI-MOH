'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FOOTER_COPY } from './footer.constants';

export const FooterBrand: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-center text-center my-6 lg:my-10 overflow-hidden w-full select-none">
      {/* Masked Container: Only visible inside this overflow-hidden box */}
      <div className="overflow-hidden w-full py-3 flex items-center justify-center">
        <motion.h2
          initial={{ y: '85%' }}
          whileInView={{ y: '0%' }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-hero text-[clamp(36px,7.5vw,130px)] font-[500] tracking-[0.2em] uppercase leading-none block whitespace-nowrap bg-gradient-to-r from-[#F6ECE1] via-[#E5C388] to-[#9E1B2B] bg-clip-text text-transparent drop-shadow-[0_4px_25px_rgba(158,27,43,0.3)] text-center"
        >
          {FOOTER_COPY.brandName}
        </motion.h2>
      </div>
    </div>
  );
};

FooterBrand.displayName = 'FooterBrand';
