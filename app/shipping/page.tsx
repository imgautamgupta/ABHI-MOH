import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, Package, Clock, ShieldCheck, Globe, Truck, HelpCircle } from 'lucide-react';
import { SITE_METADATA } from '@/lib/constants';

export const metadata: Metadata = {
  title: `White-Glove Shipping & Delivery Policy | ${SITE_METADATA.name}`,
  description:
    'Complimentary insured luxury shipping across 28,000+ pin codes in India and express worldwide air delivery by ABHI-MOH.',
  alternates: {
    canonical: `${SITE_METADATA.url}/shipping`,
  },
  openGraph: {
    title: `Shipping & Delivery Policy | ${SITE_METADATA.name}`,
    description: 'Complimentary insured luxury shipping across India and worldwide delivery options by ABHI-MOH.',
    url: `${SITE_METADATA.url}/shipping`,
    siteName: SITE_METADATA.name,
  },
};

export default function ShippingPolicyPage() {
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
            <Package className="w-3.5 h-3.5 text-[#C9A96E]" />
            <span>Atelier Logistics &amp; Transport Charter</span>
          </div>
          <h1 className="font-hero text-3xl sm:text-5xl uppercase tracking-[0.08em] text-[#2A221E] mt-2">
            Shipping &amp; Delivery Policy
          </h1>
          <p className="text-xs sm:text-sm font-light text-[#736357] tracking-wider">
            Complimentary Insured Express Shipping Across 28,000+ Pin Codes in India
          </p>
        </div>

        {/* Policy Content Sections */}
        <div className="flex flex-col gap-10 font-sans text-sm text-[#5C4D44] font-light leading-relaxed">
          {/* Section 1 */}
          <section className="flex flex-col gap-3">
            <h2 className="font-hero text-lg sm:text-xl font-medium uppercase tracking-[0.14em] text-[#2A221E] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#7D2130]" />
              <span>1. Complimentary Pan-India Insured Express</span>
            </h2>
            <p>
              At ABHI-MOH, every single domestic order—regardless of commission value—receives 100% complimentary, fully insured express delivery across all serviceable pin codes throughout India.
            </p>
            <p>
              We partner exclusively with premier air-courier logistics partners (Blue Dart Apex, Delhivery Express, and Sequel Secure Logistics) to guarantee rapid and safe transit directly from our New Delhi atelier to your doorstep.
            </p>
          </section>

          {/* Section 2 */}
          <section className="flex flex-col gap-3">
            <h2 className="font-hero text-lg sm:text-xl font-medium uppercase tracking-[0.14em] text-[#2A221E] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#7D2130]" />
              <span>2. Dispatch Timelines &amp; Crafting Cycles</span>
            </h2>
            <p>
              Because each saree is a masterpiece of Indian handloom weaving, delivery timelines vary based on garment availability and tailoring customization:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
              <div className="p-4 rounded-xl bg-white border border-[#E8DFD5] shadow-xs">
                <span className="font-hero text-xs uppercase tracking-wider text-[#7D2130] font-semibold block mb-1">
                  Ready Atelier Pieces
                </span>
                <p className="text-xs text-[#736357] leading-relaxed">
                  Dispatched within 24–48 hours. Typical domestic doorstep transit: 2–4 business days.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-[#E8DFD5] shadow-xs">
                <span className="font-hero text-xs uppercase tracking-wider text-[#7D2130] font-semibold block mb-1">
                  Custom Blouse Stitching
                </span>
                <p className="text-xs text-[#736357] leading-relaxed">
                  Master tailoring requires 5–7 business days prior to dispatch.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-[#E8DFD5] shadow-xs">
                <span className="font-hero text-xs uppercase tracking-wider text-[#7D2130] font-semibold block mb-1">
                  Made-to-Order Handlooms
                </span>
                <p className="text-xs text-[#736357] leading-relaxed">
                  Woven exclusively on pit looms. Takes 14–28 days with personal loom status updates.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="flex flex-col gap-3">
            <h2 className="font-hero text-lg sm:text-xl font-medium uppercase tracking-[0.14em] text-[#2A221E] flex items-center gap-2">
              <Package className="w-4 h-4 text-[#7D2130]" />
              <span>3. Archival Presentation Packaging &amp; Unboxing</span>
            </h2>
            <p>
              Your commissioned saree is encased in our signature archival velvet casket, swaddled in unbleached breathable muslin, and sealed with a tamper-evident gold hallmark. This ensures your handloom arrives in pristine loom-fresh condition, protected from humidity, dust, and transit friction.
            </p>
          </section>

          {/* Section 4 */}
          <section className="flex flex-col gap-3">
            <h2 className="font-hero text-lg sm:text-xl font-medium uppercase tracking-[0.14em] text-[#2A221E] flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#7D2130]" />
              <span>4. Worldwide International Delivery</span>
            </h2>
            <p>
              We deliver to patrons globally across the United States, United Kingdom, UAE, Singapore, Canada, Europe, Australia, and 60+ countries worldwide via insured DHL Express and FedEx Priority.
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-xs sm:text-sm">
              <li><strong>International Transit Time:</strong> 4–7 business days following dispatch.</li>
              <li><strong>Customs &amp; Import Duties:</strong> Import tariffs and local customs taxes (if applicable in the destination country) are determined by local authorities and coordinated through DHL/FedEx.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="flex flex-col gap-3">
            <h2 className="font-hero text-lg sm:text-xl font-medium uppercase tracking-[0.14em] text-[#2A221E] flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#7D2130]" />
              <span>5. Transit Insurance &amp; Safe Handover</span>
            </h2>
            <p>
              Every parcel is 100% insured by ABHI-MOH throughout transit until successful handover. For security, delivery requires an OTP verification or signature upon physical receipt at your specified residence or hotel concierge.
            </p>
          </section>

          {/* Section 6 */}
          <section className="flex flex-col gap-3">
            <h2 className="font-hero text-lg sm:text-xl font-medium uppercase tracking-[0.14em] text-[#2A221E] flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#7D2130]" />
              <span>6. Tracking &amp; Concierge Assistance</span>
            </h2>
            <p>
              Upon dispatch, real-time airway bill tracking is transmitted to your registered mobile and email. For delivery rescheduling or emergency rush dispatch, reach our logistics concierge directly at <a href="mailto:concierge@abhi-moh.com" className="text-[#7D2130] font-medium underline">concierge@abhi-moh.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
