'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Mail,
  Phone,
  Calendar,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Crown,
} from 'lucide-react';

export const ConciergeSection: React.FC = () => {
  const [appointmentBooked, setAppointmentBooked] = useState(false);
  const [appointmentTopic, setAppointmentTopic] = useState('Bridal & Trousseau Weave Advisory');

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    setAppointmentBooked(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="space-y-8 font-satoshi text-[#2A221E]"
    >
      {/* Header */}
      <div className="border-b border-[#E8DFD5] pb-4">
        <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#7A1C28]">
          White-Glove Advisory
        </span>
        <h2 className="font-hero text-2xl uppercase tracking-wider text-[#2A221E] mt-0.5">
          Private Concierge Desk
        </h2>
      </div>

      {/* Concierge Hero Strip */}
      <div className="rounded-3xl bg-gradient-to-br from-[#FFFDFC] via-[#FAF7F2] to-[#F3ECE3] border border-[#C89D5C]/50 p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#C89D5C]" />
            <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#7A1C28]">
              Personalized Atelier Service
            </span>
          </div>
          <h3 className="font-hero text-2xl uppercase tracking-wider text-[#2A221E]">
            Dedicated Textile Specialist
          </h3>
          <p className="text-xs sm:text-sm text-[#6E645A] font-light max-w-xl leading-relaxed">
            Our master curators from Varanasi & Kanchipuram provide bespoke styling, zari authentication certificates, and custom fall-pico detailing for your heirlooms.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[#FFFDFC] border border-[#E8DFD5] text-xs space-y-1 min-w-[200px]">
          <span className="text-[10px] uppercase tracking-widest text-[#6E645A]">Desk Hours</span>
          <p className="font-semibold text-[#2A221E]">Monday – Sunday</p>
          <p className="text-[#6E645A]">10:00 AM – 8:00 PM IST</p>
          <span className="text-[10px] text-emerald-700 font-medium block pt-1">
            ● Priority Line Active
          </span>
        </div>
      </div>

      {/* Direct Contact Channels */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <a
          href="mailto:concierge@abhi-moh.com"
          className="p-5 rounded-2xl bg-[#FFFDFC] border border-[#E8DFD5] hover:border-[#7A1C28] transition-all flex flex-col justify-between gap-3 group shadow-xs"
        >
          <div className="w-10 h-10 rounded-full bg-[#7A1C28]/10 text-[#7A1C28] flex items-center justify-center">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#6E645A]">Email Concierge</span>
            <p className="font-medium text-xs text-[#2A221E] group-hover:text-[#7A1C28] mt-0.5 flex items-center justify-between">
              <span>concierge@abhi-moh.com</span>
              <ExternalLink className="w-3 h-3 text-[#6E645A] opacity-60" />
            </p>
          </div>
        </a>

        <a
          href="tel:+919876543210"
          className="p-5 rounded-2xl bg-[#FFFDFC] border border-[#E8DFD5] hover:border-[#7A1C28] transition-all flex flex-col justify-between gap-3 group shadow-xs"
        >
          <div className="w-10 h-10 rounded-full bg-[#7A1C28]/10 text-[#7A1C28] flex items-center justify-center">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#6E645A]">Private Hotline</span>
            <p className="font-medium text-xs text-[#2A221E] group-hover:text-[#7A1C28] mt-0.5 flex items-center justify-between">
              <span>+91 98765 43210</span>
              <ExternalLink className="w-3 h-3 text-[#6E645A] opacity-60" />
            </p>
          </div>
        </a>

        <a
          href="https://wa.me/919876543210"
          target="_blank"
          rel="noopener noreferrer"
          className="p-5 rounded-2xl bg-[#FFFDFC] border border-[#E8DFD5] hover:border-[#7A1C28] transition-all flex flex-col justify-between gap-3 group shadow-xs"
        >
          <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#6E645A]">WhatsApp VIP Desk</span>
            <p className="font-medium text-xs text-[#2A221E] group-hover:text-[#7A1C28] mt-0.5 flex items-center justify-between">
              <span>Chat with Atelier</span>
              <ExternalLink className="w-3 h-3 text-[#6E645A] opacity-60" />
            </p>
          </div>
        </a>
      </div>

      {/* Appointment Consultation Form */}
      <div className="bg-[#FFFDFC] border border-[#E8DFD5] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-[#E8DFD5] pb-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#7A1C28]">
              Private Consultation
            </span>
            <h3 className="font-hero text-lg uppercase tracking-wider text-[#2A221E] mt-0.5">
              Request a Video Consultation with a Master Weaver
            </h3>
          </div>
          <Calendar className="w-5 h-5 text-[#C89D5C]" />
        </div>

        {appointmentBooked ? (
          <div className="p-8 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-700 mx-auto" />
            <h4 className="font-hero text-lg uppercase tracking-wider text-[#2A221E]">
              Consultation Scheduled
            </h4>
            <p className="text-xs text-[#6E645A] max-w-sm mx-auto font-light">
              Our lead curator will contact you on WhatsApp/Email within 4 business hours to confirm your private video walkthrough.
            </p>
          </div>
        ) : (
          <form onSubmit={handleBook} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-widest font-semibold text-[#6E645A]">
                  Consultation Topic
                </label>
                <select
                  value={appointmentTopic}
                  onChange={(e) => setAppointmentTopic(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#E8DFD5] rounded-xl text-xs text-[#2A221E] focus:outline-none focus:border-[#7A1C28]"
                >
                  <option value="Bridal & Trousseau Weave Advisory">Bridal & Trousseau Weave Advisory</option>
                  <option value="Zari Silk Certification & Weight Query">Zari Silk Certification & Weight Query</option>
                  <option value="Custom Blouse Detailing & Saree Fall Adjustments">Custom Blouse Detailing & Saree Fall Adjustments</option>
                  <option value="Exclusive Heirloom Commission">Exclusive Heirloom Commission</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-widest font-semibold text-[#6E645A]">
                  Preferred Date & Time Window
                </label>
                <input
                  type="text"
                  placeholder="e.g. Tomorrow Afternoon 3:00 PM IST"
                  className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#E8DFD5] rounded-xl text-xs text-[#2A221E] focus:outline-none focus:border-[#7A1C28]"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-widest font-semibold text-[#6E645A]">
                Special Notes or Specific Saree Reference (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="Mention any specific saree from our collection or ceremony color palettes..."
                className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#E8DFD5] rounded-xl text-xs text-[#2A221E] focus:outline-none focus:border-[#7A1C28] resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-[#7A1C28] hover:bg-[#60121D] text-[#FAF7F2] text-xs uppercase tracking-widest font-semibold transition-all shadow-xs cursor-pointer"
              >
                Schedule Private Video Session
              </button>
            </div>
          </form>
        )}
      </div>
    </motion.div>
  );
};
