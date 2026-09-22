import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Compass } from 'lucide-react';
import { SITE_METADATA } from '@/lib/constants';

export const metadata = {
  title: `Piece Not Found | 404 | ${SITE_METADATA.name}`,
  description: 'The requested luxury drape or atelier salon could not be located.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="relative w-full min-h-screen bg-[#FAF7F2] text-[#2A221E] flex items-center justify-center px-5 sm:px-10 py-32 font-satoshi select-none">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(circle_at_50%_0%,rgba(217,199,167,0.3)_0%,transparent_70%)] pointer-events-none z-0" />

      <div className="relative z-10 max-w-lg w-full text-center flex flex-col items-center">
        {/* Subtle Icon Badge */}
        <div className="w-16 h-16 rounded-full bg-[#EADFCF]/60 border border-[#D9C7A7] flex items-center justify-center mb-6 shadow-sm text-[#7D2130]">
          <Compass className="w-7 h-7 stroke-[1.5]" />
        </div>

        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-semibold text-[#7D2130] bg-[#F3ECE3] px-3.5 py-1 rounded-full border border-[#E8DFD5] mb-4">
          <Sparkles className="w-3 h-3 text-[#C9A96E]" />
          <span>Atelier Archive Notice</span>
        </div>

        <h1 className="font-hero text-4xl sm:text-5xl font-medium uppercase tracking-[0.06em] text-[#2A221E] mb-3">
          Piece Not Found
        </h1>

        <p className="text-xs sm:text-sm font-light text-[#736357] leading-relaxed mb-8 max-w-sm">
          The requested drape, editorial essay, or atelier salon is unavailable or has moved to our historical archives.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full justify-center">
          <Link
            href="/collections"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#7D2130] hover:bg-[#5E1522] text-[#FAF7F2] text-xs uppercase tracking-[0.2em] font-medium transition-all shadow-sm hover:shadow-md cursor-pointer"
          >
            <span>Explore Collections</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-[#FAF7F2] border border-[#D9C7A7] text-[#2A221E] hover:border-[#7D2130] hover:text-[#7D2130] text-xs uppercase tracking-[0.2em] font-medium transition-all cursor-pointer"
          >
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
