'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Mail,
  MessageCircle,
  Clock,
  Send,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Building2,
} from 'lucide-react';
import { CONTACT } from '@/lib/constants';

export const ContactContent: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'Bespoke Bridal Appointment',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setIsSubmitted(true);
  };

  return (
    <div className="relative w-full min-h-screen bg-[#FAF7F2] text-[#2A221E] pt-[100px] lg:pt-[130px] pb-32 px-5 sm:px-10 lg:px-16 font-satoshi select-none">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(circle_at_50%_0%,rgba(217,199,167,0.25)_0%,transparent_70%)] pointer-events-none z-0" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Breadcrumb Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#736357] hover:text-[#7D2130] transition-colors mb-8 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Return Home</span>
        </Link>

        {/* Editorial Header */}
        <div className="flex flex-col items-start gap-2 border-b border-[#E8DFD5] pb-8 mb-12">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-semibold text-[#7D2130] bg-[#F3ECE3] px-3.5 py-1 rounded-full border border-[#E8DFD5]">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A96E]" />
            <span>Maison Concierge &amp; Private Salons</span>
          </div>
          <h1 className="font-hero text-3xl sm:text-5xl uppercase tracking-[0.08em] text-[#2A221E] mt-2">
            Connect With Our Atelier
          </h1>
          <p className="text-xs sm:text-sm font-light text-[#736357] tracking-wider max-w-2xl">
            Whether inquiring about bespoke wedding handlooms, private salon consultations, or order care, our master stylists are at your service.
          </p>
        </div>

        {/* Two Column Layout: Atelier Channels (Left) & Inquiry Form (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Direct Atelier Concierge Channels (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* WhatsApp Direct Card */}
            <div className="p-6 rounded-2xl bg-white border border-[#E8DFD5] shadow-xs hover:border-[#D9C7A7] transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-[#7D2130]/10 flex items-center justify-center text-[#7D2130]">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#7D2130] font-semibold">
                    Instant Messaging
                  </span>
                  <h3 className="font-hero text-base uppercase text-[#2A221E]">
                    WhatsApp Concierge
                  </h3>
                </div>
              </div>
              <p className="text-xs text-[#736357] font-light mb-4">
                Connect with our senior draper for real-time video draping, fabric swatches, and loom inquiries.
              </p>
              {/* WhatsApp Concierge — visible only when number is configured */}
              {CONTACT.whatsapp ? (
                <a
                  href={`https://wa.me/${CONTACT.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full py-3 px-4 rounded-xl bg-[#7D2130] text-[#F5EFE7] text-xs uppercase tracking-[0.18em] font-medium hover:bg-[#5E1522] transition-colors shadow-xs"
                >
                  Start WhatsApp Chat
                </a>
              ) : (
                <p className="text-xs text-[#736357] italic font-light">
                  WhatsApp concierge will be available soon. For now, please reach us via email below.
                </p>
              )}
            </div>

            {/* Email & Phone Details */}
            <div className="p-6 rounded-2xl bg-[#F3ECE3]/60 border border-[#E8DFD5] flex flex-col gap-4">
              <div className="flex items-start gap-3.5">
                <Mail className="w-4 h-4 text-[#7D2130] mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#736357] block font-medium">
                    Email Desk
                  </span>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="text-xs sm:text-sm font-medium text-[#2A221E] hover:text-[#7D2130] transition-colors"
                  >
                    {CONTACT.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 border-t border-[#E8DFD5] pt-4">
                <Clock className="w-4 h-4 text-[#7D2130] mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#736357] block font-medium">
                    Consultation Hours
                  </span>
                  <p className="text-xs text-[#5C4D44] font-light">
                    Monday to Saturday: 10:00 AM – 8:00 PM IST
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 border-t border-[#E8DFD5] pt-4">
                <Building2 className="w-4 h-4 text-[#7D2130] mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#736357] block font-medium">
                    Atelier Salons
                  </span>
                  <p className="text-xs text-[#5C4D44] font-light">
                    Flagship Studio, New Delhi &amp; Mumbai, India
                  </p>
                </div>
              </div>
            </div>

            {/* Trust Assurance Card */}
            <div className="p-4 rounded-xl bg-white border border-[#E8DFD5] flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#C9A96E] flex-shrink-0" />
              <p className="text-[11px] text-[#736357] font-light leading-snug">
                Every client inquiry is managed confidentially by an assigned senior couture concierge.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Atelier Inquiry Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-7 sm:p-10 border border-[#E8DFD5] shadow-md relative">
            <h2 className="font-hero text-xl sm:text-2xl uppercase tracking-[0.08em] text-[#2A221E] mb-2">
              Send a Bespoke Inquiry
            </h2>
            <p className="text-xs text-[#736357] font-light mb-8">
              Fill in your details below and our concierge team will respond within 4 business hours.
            </p>

            {isSubmitted ? (
              <div className="py-12 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#7D2130]/10 text-[#7D2130] flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-hero text-2xl uppercase text-[#2A221E] mb-2">
                  Inquiry Received
                </h3>
                <p className="text-xs sm:text-sm text-[#736357] font-light max-w-md mx-auto mb-6">
                  Thank you for connecting with ABHI-MOH. Your personal couture concierge will reach out to you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormState({
                      name: '',
                      email: '',
                      phone: '',
                      inquiryType: 'Bespoke Bridal Appointment',
                      message: '',
                    });
                  }}
                  className="py-2.5 px-6 rounded-full bg-[#FAF7F2] border border-[#D9C7A7] text-xs uppercase tracking-[0.18em] text-[#2A221E] hover:bg-[#7D2130] hover:text-[#F5EFE7] transition-all"
                >
                  Send Another Note
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-[#736357] font-medium">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ananya Sharma"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#E8DFD5] text-xs text-[#2A221E] focus:outline-none focus:border-[#7D2130] transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-[#736357] font-medium">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. ananya@example.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#E8DFD5] text-xs text-[#2A221E] focus:outline-none focus:border-[#7D2130] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-[#736357] font-medium">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +91 98765 43210"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#E8DFD5] text-xs text-[#2A221E] focus:outline-none focus:border-[#7D2130] transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-[#736357] font-medium">
                      Inquiry Category
                    </label>
                    <select
                      value={formState.inquiryType}
                      onChange={(e) => setFormState({ ...formState, inquiryType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#E8DFD5] text-xs text-[#2A221E] focus:outline-none focus:border-[#7D2130] transition-colors"
                    >
                      <option value="Bespoke Bridal Appointment">Bespoke Bridal Appointment</option>
                      <option value="Custom Handloom Weaving">Custom Handloom Weaving</option>
                      <option value="Virtual Styling Session">Virtual Styling Session</option>
                      <option value="Order & Delivery Tracking">Order &amp; Delivery Tracking</option>
                      <option value="Return or Exchange Assistance">Return or Exchange Assistance</option>
                      <option value="Press & Media Relations">Press &amp; Media Relations</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-[#736357] font-medium">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your bespoke drape requirements, event dates, or specific questions..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#E8DFD5] text-xs text-[#2A221E] focus:outline-none focus:border-[#7D2130] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 w-full py-4 rounded-xl bg-[#7D2130] hover:bg-[#5E1522] text-[#F5EFE7] text-xs uppercase tracking-[0.2em] font-medium transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
