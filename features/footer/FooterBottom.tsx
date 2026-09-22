'use client';

import React from 'react';
import Link from 'next/link';
import { FOOTER_COPY, FOOTER_LEGAL_LINKS } from './footer.constants';

export const FooterBottom: React.FC = () => {
  return (
    <div className="w-full pt-8 border-t border-[#C89D5C]/25 font-satoshi flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-light tracking-widest text-[#D0BEAB]">
      {/* Copyright */}
      <span>{FOOTER_COPY.copyright}</span>

      {/* Legal Links */}
      <div className="flex flex-wrap items-center justify-center gap-6">
        {FOOTER_LEGAL_LINKS.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="hover:text-[#E5C388] transition-colors duration-300 uppercase font-medium"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

FooterBottom.displayName = 'FooterBottom';
