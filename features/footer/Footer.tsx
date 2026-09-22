'use client';

import React from 'react';
import Link from 'next/link';
import {
  FOOTER_COPY,
  FOOTER_SOCIAL_LINKS,
  FOOTER_TRUST_BADGES,
  FOOTER_LEGAL_LINKS,
} from './footer.constants';

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
            <svg className="w-5 h-5 text-[#D9C7A7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M12 3C7 3 3 7 3 12C3 17 7 21 12 21C17 21 21 17 21 12C21 7 17 3 12 3Z" />
              <path d="M12 7L13.5 10.5L17 12L13.5 13.5L12 17L10.5 13.5L7 12L10.5 10.5L12 7Z" fill="currentColor" />
            </svg>
            <span className="text-[10px] uppercase tracking-[0.3em] font-medium opacity-90">
              {FOOTER_COPY.atelierBadge}
            </span>
            <svg className="w-5 h-5 text-[#D9C7A7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M12 3C7 3 3 7 3 12C3 17 7 21 12 21C17 21 21 17 21 12C21 7 17 3 12 3Z" />
              <path d="M12 7L13.5 10.5L17 12L13.5 13.5L12 17L10.5 13.5L7 12L10.5 10.5L12 7Z" fill="currentColor" />
            </svg>
          </div>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#D9C7A7]/40 to-transparent" />
        </div>

        {/* 2. TAGLINE */}
        <h3 className="font-section text-2xl sm:text-3xl italic font-light text-[#D9C7A7] tracking-wide mb-2">
          {FOOTER_COPY.tagline}
        </h3>

        {/* 3. SMALL PREMIUM WORDMARK */}
        <Link href="/" className="inline-block focus:outline-none my-2 group">
          <span className="font-hero text-2xl lg:text-3xl font-[500] tracking-[0.25em] uppercase text-[#F5EFE7] group-hover:text-[#D9C7A7] transition-colors duration-300 block">
            {FOOTER_COPY.brandName}
          </span>
        </Link>

        {/* 4. SUBTITLE PARAGRAPH */}
        <p className="font-sans text-xs sm:text-sm text-[#F5EFE7]/85 font-light leading-relaxed max-w-sm mx-auto mb-8 tracking-wide">
          {FOOTER_COPY.subtitleLine1}<br />
          {FOOTER_COPY.subtitleLine2}
        </p>

        {/* 5. ACTIVE SOCIAL LINKS (INSTAGRAM, THREADS, WHATSAPP, EMAIL) */}
        <div className="grid grid-cols-2 min-[420px]:grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 my-6 w-full max-w-sm sm:max-w-2xl mx-auto">
          {FOOTER_SOCIAL_LINKS.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.id}
                href={social.href}
                target={social.isExternal ? '_blank' : undefined}
                rel={social.isExternal ? 'noopener noreferrer' : undefined}
                className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer justify-center sm:justify-start p-1.5 rounded-lg transition-all duration-300 hover:bg-[#F5EFE7]/5"
                aria-label={`ABHI-MOH on ${social.label}`}
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#F5EFE7]/10 border border-[#D9C7A7]/30 text-[#F5EFE7] transition-all duration-300 flex items-center justify-center shadow-xs flex-shrink-0 group-hover:bg-[#D9C7A7] group-hover:text-[#7D2130] group-hover:border-[#D9C7A7] group-hover:scale-105">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] font-medium text-[#F5EFE7]/90 group-hover:text-[#D9C7A7] transition-colors duration-300">
                  {social.label}
                </span>
              </a>
            );
          })}
        </div>

        {/* 6. VERIFIED ATELIER TRUST PILLARS ROW */}
        <div className="w-full max-w-4xl my-8 py-6 px-4 border-y border-[#D9C7A7]/20 bg-[#F5EFE7]/[0.03] rounded-2xl">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-left">
            {FOOTER_TRUST_BADGES.map((badge) => {
              const BadgeIcon = badge.icon;
              return (
                <div key={badge.id} className="flex items-start gap-3 p-2 rounded-xl">
                  <div className="w-8 h-8 rounded-full bg-[#D9C7A7]/15 border border-[#D9C7A7]/30 flex items-center justify-center text-[#D9C7A7] flex-shrink-0 mt-0.5">
                    <BadgeIcon className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-[#F5EFE7] tracking-wider">
                      {badge.title}
                    </span>
                    <span className="text-[10px] text-[#D9C7A7]/80 font-light mt-0.5 tracking-wide leading-tight">
                      {badge.subtitle}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 7. AUDITED LEGAL & CONTACT LINKS */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-8 mb-6 text-xs text-[#F5EFE7]/80 tracking-wider font-light">
          {FOOTER_LEGAL_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="py-1.5 px-2 hover:text-[#D9C7A7] transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* 8. COPYRIGHT */}
        <div className="text-[11px] text-[#D9C7A7]/70 font-light tracking-widest">
          {FOOTER_COPY.copyright}
        </div>
      </div>
    </footer>
  );
};

Footer.displayName = 'Footer';
