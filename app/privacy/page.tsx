import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, ShieldCheck, Lock, Eye, FileText, Server, UserCheck, HelpCircle } from 'lucide-react';
import { SITE_METADATA } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Privacy Policy & Client Data Charter | ${SITE_METADATA.name}`,
  description: 'ABHI-MOH atelier client data privacy charter, 256-bit TLS encryption protocols, and patron privacy rights.',
  alternates: {
    canonical: `${SITE_METADATA.url}/privacy`,
  },
  openGraph: {
    title: `Privacy Policy | ${SITE_METADATA.name}`,
    description: 'ABHI-MOH atelier client data privacy charter, encryption protocols, and patron rights.',
    url: `${SITE_METADATA.url}/privacy`,
    siteName: SITE_METADATA.name,
  },
};

export default function PrivacyPolicyPage() {
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
            <ShieldCheck className="w-3.5 h-3.5 text-[#C9A96E]" />
            <span>Client Protection Charter</span>
          </div>
          <h1 className="font-hero text-3xl sm:text-5xl uppercase tracking-[0.08em] text-[#2A221E] mt-2">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm font-light text-[#736357] tracking-wider">
            Last Updated: August 2026 • Confidential &amp; Encrypted Atelier Standards
          </p>
        </div>

        {/* Complete Policy Content Sections */}
        <div className="flex flex-col gap-10 font-sans text-sm text-[#5C4D44] font-light leading-relaxed">
          {/* Section 1 */}
          <section className="flex flex-col gap-3">
            <h2 className="font-hero text-lg sm:text-xl font-medium uppercase tracking-[0.14em] text-[#2A221E] flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#7D2130]" />
              <span>1. Client Confidentiality &amp; Information We Collect</span>
            </h2>
            <p>
              At ABHI-MOH, we recognize that privacy and discretion are fundamental pillars of haute couture patronage. When you commission handcrafted sarees, book private styling salon sessions, or interact with our digital atelier, we collect only strictly necessary information:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-xs sm:text-sm">
              <li><strong>Patron Identification:</strong> Full name, salutation, contact email, and telephone numbers for white-glove communication.</li>
              <li><strong>Logistics &amp; Delivery Data:</strong> Billing address, insured shipping address, and delivery instructions.</li>
              <li><strong>Bespoke Couture Details:</strong> Drape preferences, blouse measurements, custom embroidery color requests, and loom commission notes.</li>
              <li><strong>Technical &amp; Session Records:</strong> Encrypted session identifiers, device browser metadata, and essential security cookies to preserve authentication and shopping cart continuity.</li>
            </ul>
            <p>
              We maintain an unwavering commitment never to sell, rent, monetize, or distribute patron dossiers to any third-party marketing brokers.
            </p>
          </section>

          {/* Section 2 */}
          <section className="flex flex-col gap-3">
            <h2 className="font-hero text-lg sm:text-xl font-medium uppercase tracking-[0.14em] text-[#2A221E] flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#7D2130]" />
              <span>2. Purpose &amp; Usage of Patron Records</span>
            </h2>
            <p>
              Your data is processed strictly for legitimate atelier operations and white-glove client servicing:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-xs sm:text-sm">
              <li>Executing bespoke handloom commissions, tailoring coordination, and insured express dispatch.</li>
              <li>Generating Silk Mark Certification dossiers, authenticity cards, and lifetime provenance records.</li>
              <li>Facilitating scheduled video styling consultations and private showroom appointments in New Delhi &amp; Mumbai.</li>
              <li>Providing optional early-access invitations to limited festival drops and high-jewelry textile runways.</li>
              <li>Preventing financial fraud and ensuring compliance with applicable Indian and international tax statutes.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="flex flex-col gap-3">
            <h2 className="font-hero text-lg sm:text-xl font-medium uppercase tracking-[0.14em] text-[#2A221E] flex items-center gap-2">
              <Server className="w-4 h-4 text-[#7D2130]" />
              <span>3. Payment Gateway &amp; Financial Security</span>
            </h2>
            <p>
              All online financial transactions on abhi-moh.com are processed through PCI-DSS Level 1 compliant secure payment gateways using 256-bit TLS encryption. ABHI-MOH does not store, process, or view your complete credit card numbers, CVVs, or online banking credentials on our servers.
            </p>
          </section>

          {/* Section 4 */}
          <section className="flex flex-col gap-3">
            <h2 className="font-hero text-lg sm:text-xl font-medium uppercase tracking-[0.14em] text-[#2A221E] flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-[#7D2130]" />
              <span>4. Patron Rights &amp; Data Control</span>
            </h2>
            <p>
              As an esteemed patron of ABHI-MOH, you retain full sovereignty over your personal data:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-xs sm:text-sm">
              <li><strong>Right of Access:</strong> Request a complete summary of personal records held in your atelier dossier.</li>
              <li><strong>Right of Correction:</strong> Update your delivery addresses, measurement charts, or contact details at any time.</li>
              <li><strong>Right to Erasure:</strong> Request the deletion of your customer profile, subject to statutory tax and accounting retention requirements.</li>
              <li><strong>Communication Preferences:</strong> Opt out of editorial newsletters or festive lookbook mailings with a single click.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="flex flex-col gap-3">
            <h2 className="font-hero text-lg sm:text-xl font-medium uppercase tracking-[0.14em] text-[#2A221E] flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#7D2130]" />
              <span>5. Cookies &amp; Tracking Architecture</span>
            </h2>
            <p>
              We employ minimal, essential cookies necessary for authentication, security, and cart preservation. Performance and analytics cookies are strictly anonymized and used exclusively to refine browsing performance across our editorial showcases.
            </p>
          </section>

          {/* Section 6 */}
          <section className="flex flex-col gap-3">
            <h2 className="font-hero text-lg sm:text-xl font-medium uppercase tracking-[0.14em] text-[#2A221E] flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#7D2130]" />
              <span>6. Grievance Redressal &amp; Data Officer Contact</span>
            </h2>
            <p>
              For privacy-related inquiries, data modification requests, or to contact our Grievance Officer in accordance with the Information Technology Act:
            </p>
            <div className="p-4 rounded-xl bg-white border border-[#E8DFD5] text-xs leading-relaxed">
              <p className="font-medium text-[#2A221E]">ABHI-MOH Atelier Privacy &amp; Legal Desk</p>
              <p className="text-[#736357]">Email: <a href="mailto:concierge@abhi-moh.com" className="text-[#7D2130] underline font-medium">concierge@abhi-moh.com</a></p>
              <p className="text-[#736357]">Atelier Office: New Delhi &amp; Mumbai, India</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
