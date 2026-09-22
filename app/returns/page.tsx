import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, RefreshCw, Sparkles, CheckCircle2, MessageCircle, ShieldCheck, AlertCircle } from 'lucide-react';
import { SITE_METADATA } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Returns & Complimentary Atelier Exchange | ${SITE_METADATA.name}`,
  description: 'ABHI-MOH comprehensive 7-day complimentary return & bespoke exchange policy with insured doorstep reverse pickup.',
  alternates: {
    canonical: `${SITE_METADATA.url}/returns`,
  },
  openGraph: {
    title: `Returns & Exchange Policy | ${SITE_METADATA.name}`,
    description: '7-day complimentary return & bespoke exchange policy with insured doorstep reverse pickup.',
    url: `${SITE_METADATA.url}/returns`,
    siteName: SITE_METADATA.name,
  },
};

export default function ReturnsPolicyPage() {
  return (
    <div className="relative w-full min-h-screen bg-[#FAF7F2] text-[#2A221E] pt-[100px] lg:pt-[130px] pb-32 px-5 sm:px-10 lg:px-16 font-satoshi select-none">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(circle_at_50%_0%,rgba(217,199,167,0.25)_0%,transparent_70%)] pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Breadcrumb Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#736357] hover:text-[#7D2130] transition-colors mb-8 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Return Home</span>
        </Link>

        {/* Editorial Header */}
        <div className="flex flex-col items-start gap-2 border-b border-[#E8DFD5] pb-8 mb-10">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-semibold text-[#7D2130] bg-[#F3ECE3] px-3.5 py-1 rounded-full border border-[#E8DFD5]">
            <RefreshCw className="w-3.5 h-3.5 text-[#C9A96E]" />
            <span>Maison Guarantee &amp; Exchanges</span>
          </div>
          <h1 className="font-hero text-3xl sm:text-5xl uppercase tracking-[0.08em] text-[#2A221E] mt-2">
            Returns &amp; Exchange Policy
          </h1>
          <p className="text-xs sm:text-sm font-light text-[#736357] tracking-wider">
            7-Day Complimentary Atelier Exchange &amp; Reverse Pickup Guarantee
          </p>
        </div>

        {/* Policy Content Sections */}
        <div className="flex flex-col gap-10 font-sans text-sm text-[#5C4D44] font-light leading-relaxed">
          {/* Section 1 */}
          <section className="flex flex-col gap-3">
            <h2 className="font-hero text-lg sm:text-xl font-medium uppercase tracking-[0.14em] text-[#2A221E] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#7D2130]" />
              <span>1. 7-Day Complimentary Doorstep Exchange</span>
            </h2>
            <p>
              We want every ABHI-MOH drape in your collection to be treasured for a lifetime. If your delivered piece does not match your styling expectations, color preference, or occasion requirements, you may initiate an exchange or return request within <strong>7 calendar days</strong> from the official delivery timestamp recorded by our logistics partner.
            </p>
            <p>
              For all eligible domestic orders across India, reverse courier pickup is 100% complimentary and arranged directly at your doorstep by our logistics team.
            </p>
          </section>

          {/* Section 2 */}
          <section className="flex flex-col gap-3">
            <h2 className="font-hero text-lg sm:text-xl font-medium uppercase tracking-[0.14em] text-[#2A221E] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#7D2130]" />
              <span>2. Return &amp; Exchange Eligibility Criteria</span>
            </h2>
            <p>
              To maintain the highest standards of hygiene and authentic silk preservation for all patrons, items submitted for return must satisfy the following conditions:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-xs sm:text-sm">
              <li><strong>Pristine Condition:</strong> The saree must be completely unworn, unwashed, unaltered, and free of perfume or makeup odors.</li>
              <li><strong>Intact Security Seals:</strong> The tamper-evident atelier security ribbon and Silk Mark Hallmark tag must remain firmly attached and untampered.</li>
              <li><strong>Complete Packaging:</strong> Saree must be returned within its original ABHI-MOH archival velvet casket, including the Certificate of Authenticity and unbleached muslin wrap.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="flex flex-col gap-3">
            <h2 className="font-hero text-lg sm:text-xl font-medium uppercase tracking-[0.14em] text-[#2A221E] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[#7D2130]" />
              <span>3. Bespoke Tailoring &amp; Custom Commissions</span>
            </h2>
            <p>
              Sarees ordered with bespoke custom blouse stitching, fall and pico customization, personalized hand-embroidery, or customized weave dyeing are custom creations crafted exclusively to your measurements. These pieces are not eligible for full refund, but receive complimentary lifetime master tailoring and alteration support.
            </p>
          </section>

          {/* Section 4 */}
          <section className="flex flex-col gap-3">
            <h2 className="font-hero text-lg sm:text-xl font-medium uppercase tracking-[0.14em] text-[#2A221E] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#7D2130]" />
              <span>4. Step-by-Step Return Process</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
              <div className="p-4 rounded-xl bg-white border border-[#E8DFD5] shadow-xs">
                <span className="text-[10px] font-semibold text-[#7D2130] uppercase tracking-wider block mb-1">Step 01</span>
                <span className="font-hero text-xs uppercase tracking-wider text-[#2A221E] font-medium block mb-1">Initiate Request</span>
                <p className="text-xs text-[#736357]">Send your Order ID and photo of the saree to our WhatsApp concierge or email.</p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-[#E8DFD5] shadow-xs">
                <span className="text-[10px] font-semibold text-[#7D2130] uppercase tracking-wider block mb-1">Step 02</span>
                <span className="font-hero text-xs uppercase tracking-wider text-[#2A221E] font-medium block mb-1">Insured Pickup</span>
                <p className="text-xs text-[#736357]">Our white-glove courier collects the casket from your doorstep within 24–48 hours.</p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-[#E8DFD5] shadow-xs">
                <span className="text-[10px] font-semibold text-[#7D2130] uppercase tracking-wider block mb-1">Step 03</span>
                <span className="font-hero text-xs uppercase tracking-wider text-[#2A221E] font-medium block mb-1">Atelier Quality Check</span>
                <p className="text-xs text-[#736357]">Upon inspection at New Delhi atelier, exchange or full refund is processed within 3–5 days.</p>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section className="flex flex-col gap-3">
            <h2 className="font-hero text-lg sm:text-xl font-medium uppercase tracking-[0.14em] text-[#2A221E] flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-[#7D2130]" />
              <span>5. How to Contact the Concierge Desk</span>
            </h2>
            <p>
              To initiate your request or discuss alternate styling pieces:
            </p>
            <div className="p-5 rounded-2xl bg-white border border-[#E8DFD5] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="font-medium text-[#2A221E] text-xs sm:text-sm">ABHI-MOH Client Relations &amp; Exchange Desk</p>
                <p className="text-xs text-[#736357]">Email: <a href="mailto:concierge@abhi-moh.com" className="text-[#7D2130] font-medium underline">concierge@abhi-moh.com</a></p>
              </div>
              <a
                href="mailto:concierge@abhi-moh.com"
                className="py-2.5 px-5 rounded-full bg-[#7D2130] text-[#F5EFE7] text-xs uppercase tracking-[0.16em] font-medium hover:bg-[#5E1522] transition-colors whitespace-nowrap"
              >
                Email Concierge
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
