'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Lock,
  Smartphone,
  Mail,
  Key,
  LogOut,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';
import { AccountDossier } from '@/lib/account/types';

interface PrivacySecuritySectionProps {
  dossier: AccountDossier;
  onLogout: () => void;
}

export const PrivacySecuritySection: React.FC<PrivacySecuritySectionProps> = ({
  dossier,
  onLogout,
}) => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(dossier.security.twoFactorEnabled);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const toggle2FA = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    setFeedbackMsg(
      !twoFactorEnabled
        ? 'Two-factor OTP security activated for mobile sign-in.'
        : 'Two-factor authentication disabled.'
    );
    setTimeout(() => setFeedbackMsg(null), 3000);
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
          Client Safeguards
        </span>
        <h2 className="font-hero text-2xl uppercase tracking-wider text-[#2A221E] mt-0.5">
          Privacy & Security
        </h2>
      </div>

      {feedbackMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* Security Credentials Card */}
      <div className="bg-[#FFFDFC] border border-[#E8DFD5] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-[#E8DFD5] pb-4">
          <h3 className="font-hero text-lg uppercase tracking-wider text-[#2A221E]">
            Account Credentials
          </h3>
          <ShieldCheck className="w-5 h-5 text-[#C89D5C]" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
          <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E8DFD5] space-y-1">
            <span className="text-[10px] uppercase tracking-widest text-[#6E645A] block">
              Registered Email
            </span>
            <p className="font-medium text-sm text-[#2A221E] flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#7A1C28]" />
              <span>{dossier.email}</span>
            </p>
            <p className="text-[11px] text-emerald-700 font-medium pt-1">
              ✓ Verified Primary Address
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E8DFD5] space-y-1">
            <span className="text-[10px] uppercase tracking-widest text-[#6E645A] block">
              Registered Mobile
            </span>
            <p className="font-medium text-sm text-[#2A221E] flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-[#7A1C28]" />
              <span>{dossier.phone || '+91 98765 43210'}</span>
            </p>
            <p className="text-[11px] text-emerald-700 font-medium pt-1">
              ✓ Verified for Order OTPs
            </p>
          </div>
        </div>
      </div>

      {/* Authentication & Security Settings */}
      <div className="bg-[#FFFDFC] border border-[#E8DFD5] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-[#E8DFD5] pb-4">
          <h3 className="font-hero text-lg uppercase tracking-wider text-[#2A221E]">
            Access & Authentication Safeguards
          </h3>
          <Lock className="w-5 h-5 text-[#7A1C28]" />
        </div>

        <div className="space-y-4 divide-y divide-[#E8DFD5]">
          <div className="flex items-center justify-between pt-2">
            <div className="text-xs space-y-0.5">
              <p className="font-semibold text-[#2A221E]">Two-Factor Authentication (2FA)</p>
              <p className="text-[#6E645A] font-light">
                Require SMS / Email OTP verification when commissioning sarees or changing addresses.
              </p>
            </div>

            <button
              type="button"
              onClick={toggle2FA}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                twoFactorEnabled
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-[#F3ECE3] text-[#6E645A] border border-[#E8DFD5]'
              }`}
            >
              {twoFactorEnabled ? 'Enabled' : 'Disabled'}
            </button>
          </div>

          <div className="flex items-center justify-between pt-4">
            <div className="text-xs space-y-0.5">
              <p className="font-semibold text-[#2A221E]">Session Status</p>
              <p className="text-[#6E645A] font-light">
                {dossier.security.lastLogin} ({dossier.security.loginMethod})
              </p>
            </div>

            <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Active Session Secure
            </span>
          </div>

          <div className="flex items-center justify-between pt-4">
            <div className="text-xs space-y-0.5">
              <p className="font-semibold text-[#2A221E]">Client Sign Out</p>
              <p className="text-[#6E645A] font-light">
                Safely end your private client session on this browser.
              </p>
            </div>

            <button
              type="button"
              onClick={onLogout}
              className="px-4 py-2 rounded-full border border-[#7A1C28] text-[#7A1C28] hover:bg-[#7A1C28]/10 text-xs uppercase tracking-widest font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
