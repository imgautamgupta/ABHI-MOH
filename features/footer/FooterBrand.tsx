'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FOOTER_COPY } from './footer.constants';

export const FooterBrand: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-center text-center my-4 lg:my-8 w-full select-none">
      <div className="w-full py-2 flex items-center justify-center">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="font-hero text-[clamp(24px,7.2vw,110px)] font-medium tracking-[0.2em] uppercase leading-none block whitespace-nowrap bg-gradient-to-r from-[#F6ECE1] via-[#E5C388] to-[#9E1B2B] bg-clip-text text-transparent drop-shadow-[0_4px_25px_rgba(158,27,43,0.3)] text-center max-w-full"
        >
          {FOOTER_COPY.brandName}
        </motion.h2>
      </div>
    </div>
  );
};

FooterBrand.displayName = 'FooterBrand';

