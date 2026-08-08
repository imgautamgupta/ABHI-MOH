'use client';

import React from 'react';
import Link from 'next/link';

// Custom Monochrome Brand SVGs for luxury consistency
const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const PinterestIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2a10 10 0 0 0-3.16 19.49c-.08-.87-.15-2.22.03-3.18.17-.86 1.11-4.7 1.11-4.7s-.28-.56-.28-1.4c0-1.3.76-2.28 1.7-2.28.8 0 1.18.6 1.18 1.32 0 .8-.51 2-.78 3.12-.22.94.47 1.7 1.4 1.7 1.68 0 2.97-1.77 2.97-4.33 0-2.26-1.63-3.84-3.95-3.84-2.69 0-4.27 2.02-4.27 4.1 0 .81.31 1.68.7 2.16.08.1.09.18.06.32l-.26 1.07c-.04.17-.15.22-.34.13-1.28-.6-2.08-2.46-2.08-3.96 0-3.23 2.35-6.2 6.77-6.2 3.55 0 6.32 2.53 6.32 5.92 0 3.53-2.23 6.37-5.32 6.37-1.04 0-2.02-.54-2.35-1.18l-.64 2.45c-.23.9-1.06 2.38-1.57 3.2A10 10 0 1 0 12 2z" />
  </svg>
);

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const EmailIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="4" width="20" height="16" rx="3" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gradient-to-b from-[#7D2130] via-[#5E1522] to-[#3B0A12] text-[#F5EFE7] pt-12 pb-14 px-6 lg:px-16 font-satoshi relative border-t border-[#D9C7A7]/30 overflow-hidden">
      {/* Subtle Background Radial Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[radial-gradient(circle_at_50%_0%,rgba(217,199,167,0.15)_0%,transparent_70%)] pointer-events-none z-0" />

      <div className="max-w-[1200px] mx-auto relative z-10 flex flex-col items-center justify-between text-center">
        {/* 1. DECORATIVE SILK-INSPIRED DIVIDER AT TOP */}
        <div className="w-full flex items-center justify-center mb-10">
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#D9C7A7]/40 to-transparent" />
          <div className="px-6 flex items-center gap-3 text-[#D9C7A7]">
            <svg className="w-5 h-5 text-[#D9C7A7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 3C7 3 3 7 3 12C3 17 7 21 12 21C17 21 21 17 21 12C21 7 17 3 12 3Z" />
              <path d="M12 7L13.5 10.5L17 12L13.5 13.5L12 17L10.5 13.5L7 12L10.5 10.5L12 7Z" fill="currentColor" />
            </svg>
            <span className="text-[10px] uppercase tracking-[0.3em] font-medium opacity-90">
              ROYAL HERITAGE ATELIER
            </span>
            <svg className="w-5 h-5 text-[#D9C7A7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 3C7 3 3 7 3 12C3 17 7 21 12 21C17 21 21 17 21 12C21 7 17 3 12 3Z" />
              <path d="M12 7L13.5 10.5L17 12L13.5 13.5L12 17L10.5 13.5L7 12L10.5 10.5L12 7Z" fill="currentColor" />
            </svg>
          </div>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#D9C7A7]/40 to-transparent" />
        </div>

        {/* 2. TAGLINE */}
        <h3 className="font-section text-2xl sm:text-3xl italic font-light text-[#D9C7A7] tracking-wide mb-2">
          The Essence of Elegance
        </h3>

        {/* 3. SMALL PREMIUM WORDMARK */}
        <Link href="/" className="inline-block focus:outline-none my-2 group">
          <span className="font-hero text-2xl lg:text-3xl font-[500] tracking-[0.25em] uppercase text-[#F5EFE7] group-hover:text-[#D9C7A7] transition-colors duration-300 block">
            ABHI-MOH
          </span>
        </Link>

        {/* 4. SUBTITLE PARAGRAPH */}
        <p className="font-sans text-xs sm:text-sm text-[#F5EFE7]/85 font-light leading-relaxed max-w-sm mx-auto mb-8 tracking-wide">
          Crafted with heritage.<br />
          Designed for timeless elegance.
        </p>

        {/* 5. SOCIAL LINKS IN CIRCULAR BUTTONS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 my-6">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="w-11 h-11 rounded-full bg-[#F5EFE7]/10 border border-[#D9C7A7]/30 text-[#F5EFE7] group-hover:bg-[#D9C7A7] group-hover:text-[#7D2130] group-hover:border-[#D9C7A7] transition-all duration-300 flex items-center justify-center shadow-xs">
              <InstagramIcon className="w-4 h-4" />
            </div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#F5EFE7]/90 group-hover:text-[#D9C7A7] transition-colors duration-300 font-medium">
              Instagram
            </span>
          </a>

          <a
            href="https://pinterest.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="w-11 h-11 rounded-full bg-[#F5EFE7]/10 border border-[#D9C7A7]/30 text-[#F5EFE7] group-hover:bg-[#D9C7A7] group-hover:text-[#7D2130] group-hover:border-[#D9C7A7] transition-all duration-300 flex items-center justify-center shadow-xs">
              <PinterestIcon className="w-4 h-4" />
            </div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#F5EFE7]/90 group-hover:text-[#D9C7A7] transition-colors duration-300 font-medium">
              Pinterest
            </span>
          </a>

          <a
            href="https://whatsapp.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="w-11 h-11 rounded-full bg-[#F5EFE7]/10 border border-[#D9C7A7]/30 text-[#F5EFE7] group-hover:bg-[#D9C7A7] group-hover:text-[#7D2130] group-hover:border-[#D9C7A7] transition-all duration-300 flex items-center justify-center shadow-xs">
              <WhatsAppIcon className="w-4 h-4" />
            </div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#F5EFE7]/90 group-hover:text-[#D9C7A7] transition-colors duration-300 font-medium">
              WhatsApp
            </span>
          </a>

          <a
            href="mailto:concierge@abhi-moh.com"
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="w-11 h-11 rounded-full bg-[#F5EFE7]/10 border border-[#D9C7A7]/30 text-[#F5EFE7] group-hover:bg-[#D9C7A7] group-hover:text-[#7D2130] group-hover:border-[#D9C7A7] transition-all duration-300 flex items-center justify-center shadow-xs">
              <EmailIcon className="w-4 h-4" />
            </div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#F5EFE7]/90 group-hover:text-[#D9C7A7] transition-colors duration-300 font-medium">
              Email
            </span>
          </a>
        </div>

        {/* HORIZONTAL DIVIDER */}
        <div className="w-full max-w-3xl border-t border-[#D9C7A7]/25 my-8" />

        {/* 6. LEGAL LINKS ROW */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mb-6 text-xs text-[#F5EFE7]/80 tracking-wider font-light">
          <Link href="/privacy" className="hover:text-[#D9C7A7] transition-colors duration-200">
            Privacy Policy
          </Link>
          <Link href="/shipping" className="hover:text-[#D9C7A7] transition-colors duration-200">
            Shipping
          </Link>
          <Link href="/returns" className="hover:text-[#D9C7A7] transition-colors duration-200">
            Returns
          </Link>
          <Link href="/terms" className="hover:text-[#D9C7A7] transition-colors duration-200">
            Terms
          </Link>
        </div>

        {/* 7. COPYRIGHT */}
        <div className="text-[11px] text-[#D9C7A7]/70 font-light tracking-widest">
          © 2026 ABHI-MOH
        </div>
      </div>
    </footer>
  );
};

Footer.displayName = 'Footer';
