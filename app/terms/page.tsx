import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, Scale, Award, ShieldAlert, BookOpen, FileCheck, HelpCircle } from 'lucide-react';
import { SITE_METADATA } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Terms & Conditions of Service | ${SITE_METADATA.name}`,
  description: 'ABHI-MOH atelier client terms of service, authenticity warranty, and craftsmanship guidelines.',
  alternates: {
    canonical: `${SITE_METADATA.url}/terms`,
  },
  openGraph: {
    title: `Terms & Conditions | ${SITE_METADATA.name}`,
    description: 'ABHI-MOH atelier client terms of service, authenticity warranty, and craftsmanship guidelines.',
    url: `${SITE_METADATA.url}/terms`,
    siteName: SITE_METADATA.name,
  },
};

export default function TermsOfServicePage() {
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
            <Scale className="w-3.5 h-3.5 text-[#C9A96E]" />
            <span>Atelier Client Terms &amp; Conditions</span>
          </div>
          <h1 className="font-hero text-3xl sm:text-5xl uppercase tracking-[0.08em] text-[#2A221E] mt-2">
            Terms of Service
          </h1>
          <p className="text-xs sm:text-sm font-light text-[#736357] tracking-wider">
            Last Updated: August 2026 • Royal Heritage Atelier Guidelines
          </p>
        </div>

        {/* Policy Content Sections */}
        <div className="flex flex-col gap-10 font-sans text-sm text-[#5C4D44] font-light leading-relaxed">
          {/* Section 1 */}
          <section className="flex flex-col gap-3">
            <h2 className="font-hero text-lg sm:text-xl font-medium uppercase tracking-[0.14em] text-[#2A221E] flex items-center gap-2">
              <Award className="w-4 h-4 text-[#7D2130]" />
              <span>1. Handcrafted Artisanal Authenticity &amp; Variations</span>
            </h2>
            <p>
              Each ABHI-MOH saree is handwoven by master artisans across India&apos;s heritage loom clusters. Due to the purely manual nature of pit looms, jacquard weaving, and hand-spun zari yarns, subtle variations in yarn slub, color depth, and zari sheen are hallmarks of genuine handloom authenticity and artisanal individuality, not manufacturing flaws.
            </p>
          </section>

          {/* Section 2 */}
          <section className="flex flex-col gap-3">
            <h2 className="font-hero text-lg sm:text-xl font-medium uppercase tracking-[0.14em] text-[#2A221E] flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#7D2130]" />
              <span>2. Pricing, Invoicing &amp; Taxes</span>
            </h2>
            <p>
              All prices displayed on abhi-moh.com for domestic Indian deliveries are inclusive of applicable Goods and Services Tax (GST). A formalized tax invoice is provided with every dispatch. We reserve the right to correct accidental typographic errors in pricing and adjust loom lead times in rare instances of raw silk seasonality.
            </p>
          </section>

          {/* Section 3 */}
          <section className="flex flex-col gap-3">
            <h2 className="font-hero text-lg sm:text-xl font-medium uppercase tracking-[0.14em] text-[#2A221E] flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-[#7D2130]" />
              <span>3. Bespoke Commissions &amp; Cancellation Policy</span>
            </h2>
            <p>
              Orders for ready-to-ship catalog sarees may be cancelled within <strong>12 hours</strong> of placement prior to logistics dispatch. For custom-commissioned weaves or bespoke blouse tailoring, loom allocation and cloth cutting begin immediately; cancellations after 24 hours are subject to raw material and artisan labor costs.
            </p>
          </section>

          {/* Section 4 */}
          <section className="flex flex-col gap-3">
            <h2 className="font-hero text-lg sm:text-xl font-medium uppercase tracking-[0.14em] text-[#2A221E] flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-[#7D2130]" />
              <span>4. Intellectual Property &amp; Motif Copyright</span>
            </h2>
            <p>
              All textile motif arrangements, lookbook photographic essays, atelier sketches, and brand insignias appearing on this platform are the exclusive intellectual property of ABHI-MOH. Unauthorized reproduction, commercial distribution, or imitation of our copyrighted weave patterns is strictly prohibited under Indian and international copyright treaties.
            </p>
          </section>

          {/* Section 5 */}
          <section className="flex flex-col gap-3">
            <h2 className="font-hero text-lg sm:text-xl font-medium uppercase tracking-[0.14em] text-[#2A221E] flex items-center gap-2">
              <Scale className="w-4 h-4 text-[#7D2130]" />
              <span>5. Governing Law &amp; Jurisdiction</span>
            </h2>
            <p>
              These Terms and Conditions and any transactions concluded on this portal are governed by and construed in accordance with the laws of India. Any legal proceedings arising out of or related to these terms shall be subject to the exclusive jurisdiction of the competent courts of New Delhi, India.
            </p>
          </section>

          {/* Section 6 */}
          <section className="flex flex-col gap-3">
            <h2 className="font-hero text-lg sm:text-xl font-medium uppercase tracking-[0.14em] text-[#2A221E] flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#7D2130]" />
              <span>6. Atelier Legal &amp; Concierge Contact</span>
            </h2>
            <p>
              For formal legal communications or general inquiries regarding our client terms, reach us at:
            </p>
            <div className="p-4 rounded-xl bg-white border border-[#E8DFD5] text-xs leading-relaxed">
              <p className="font-medium text-[#2A221E]">ABHI-MOH Concierge &amp; Legal Desk</p>
              <p className="text-[#736357]">Email: <a href="mailto:concierge@abhi-moh.com" className="text-[#7D2130] underline font-medium">concierge@abhi-moh.com</a></p>
              <p className="text-[#736357]">Flagship Studio: New Delhi &amp; Mumbai, India</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
