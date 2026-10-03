'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RotateCcw, RefreshCw, AlertCircle, ShieldAlert, CheckCircle2, Loader2 } from 'lucide-react';
import { ClientOrder } from '@/lib/account/types';
import { isWixImage, wixThumbImage, SOFT_IVORY_PLACEHOLDER } from '@/lib/wixImage';

interface ReturnRequestModalProps {
  order: ClientOrder | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const ReturnRequestModal: React.FC<ReturnRequestModalProps> = ({
  order,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [requestType, setRequestType] = useState<'RETURN' | 'EXCHANGE'>('RETURN');
  const [reason, setReason] = useState<string>('Fabric preference / Sizing adjustment');
  const [details, setDetails] = useState<string>('');
  const [exchangePreference, setExchangePreference] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !order) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/account/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: order.id,
          type: requestType,
          reason,
          details,
          exchangeItemPreference: requestType === 'EXCHANGE' ? exchangePreference : undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit request.');
      }

      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onSuccess();
        onClose();
      }, 1800);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An error occurred.';
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#2A221E]/60 backdrop-blur-xs"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-xl bg-[#FAF7F2] border border-[#E8DFD5] rounded-2xl shadow-2xl overflow-hidden z-10 my-8 flex flex-col font-satoshi text-[#2A221E]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#E8DFD5] bg-[#FFFDFC]">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#7A1C28] bg-[#7A1C28]/10 px-2.5 py-0.5 rounded-full">
                Atelier Services
              </span>
              <h3 className="font-hero text-lg uppercase tracking-wider text-[#2A221E] mt-1">
                Returns & Exchanges
              </h3>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-[#F3ECE3] hover:bg-[#E8DFD5] text-[#2A221E] flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
            {isSuccess ? (
              <div className="py-12 flex flex-col items-center text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-hero text-xl uppercase tracking-wider text-[#2A221E]">
                  Request Submitted
                </h4>
                <p className="text-xs text-[#6E645A] max-w-sm font-light">
                  Your {requestType.toLowerCase()} request has been lodged. Our private concierge specialist will reach out within 24 hours to coordinate white-glove pickup.
                </p>
              </div>
            ) : (
              <>
                {/* Selected Order Summary */}
                <div className="p-4 rounded-xl bg-[#FFFDFC] border border-[#E8DFD5] flex items-center gap-4">
                  {order.items[0]?.image && (
                    <div className="relative w-14 h-18 rounded-lg overflow-hidden bg-[#FAF7F2] border border-[#E8DFD5] shrink-0">
                      <Image
                        src={wixThumbImage(order.items[0].image)}
                        alt={order.items[0].name}
                        fill
                        unoptimized={isWixImage(order.items[0].image)}
                        className="object-contain p-1"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (target.src !== SOFT_IVORY_PLACEHOLDER) {
                            target.src = SOFT_IVORY_PLACEHOLDER;
                          }
                        }}
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0 text-xs">
                    <span className="text-[10px] font-mono text-[#6E645A]">{order.displayId}</span>
                    <p className="font-hero font-medium text-sm text-[#2A221E] truncate mt-0.5">
                      {order.items[0]?.name || 'Commissioned Saree'}
                    </p>
                    <p className="text-[#7A1C28] font-semibold mt-1">
                      ₹{order.total.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>

                {/* Request Type Selector */}
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-semibold text-[#6E645A] block">
                    Select Request Type
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setRequestType('RETURN')}
                      className={`p-3.5 rounded-xl border text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all ${
                        requestType === 'RETURN'
                          ? 'bg-[#7A1C28] text-[#FAF7F2] border-[#7A1C28] shadow-xs'
                          : 'bg-[#FFFDFC] text-[#2A221E] border-[#E8DFD5] hover:bg-[#F3ECE3]'
                      }`}
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Return & Refund</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setRequestType('EXCHANGE')}
                      className={`p-3.5 rounded-xl border text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all ${
                        requestType === 'EXCHANGE'
                          ? 'bg-[#7A1C28] text-[#FAF7F2] border-[#7A1C28] shadow-xs'
                          : 'bg-[#FFFDFC] text-[#2A221E] border-[#E8DFD5] hover:bg-[#F3ECE3]'
                      }`}
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Exchange Weave</span>
                    </button>
                  </div>
                </div>

                {/* Reason Selection */}
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-semibold text-[#6E645A] block">
                    Reason for {requestType === 'RETURN' ? 'Return' : 'Exchange'}
                  </label>
                  <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full px-4 py-3 bg-[#FFFDFC] border border-[#E8DFD5] rounded-xl text-xs text-[#2A221E] focus:outline-none focus:border-[#7A1C28]"
                  >
                    <option value="Fabric preference / Sizing adjustment">
                      Fabric preference / Sizing adjustment
                    </option>
                    <option value="Color tone differs from expectation">
                      Color tone differs from expectation
                    </option>
                    <option value="Exchange for different color / weave in collection">
                      Exchange for different color / weave in collection
                    </option>
                    <option value="Occasion cancelled / Rescheduled">
                      Occasion cancelled / Rescheduled
                    </option>
                    <option value="Other bespoke consultation needed">
                      Other bespoke consultation needed
                    </option>
                  </select>
                </div>

                {/* Exchange item preference input if exchange selected */}
                {requestType === 'EXCHANGE' && (
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-semibold text-[#6E645A] block">
                      Preferred Replacement Saree / Color
                    </label>
                    <input
                      type="text"
                      value={exchangePreference}
                      onChange={(e) => setExchangePreference(e.target.value)}
                      placeholder="e.g. Crimson Kashi Brocade or Mustard Yellow Zari"
                      className="w-full px-4 py-3 bg-[#FFFDFC] border border-[#E8DFD5] rounded-xl text-xs text-[#2A221E] focus:outline-none focus:border-[#7A1C28]"
                    />
                  </div>
                )}

                {/* Details / Notes */}
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-semibold text-[#6E645A] block">
                    Additional Notes for Concierge (Optional)
                  </label>
                  <textarea
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    rows={3}
                    placeholder="Provide any specific instructions regarding draping, fall adjustment, or pickup timing..."
                    className="w-full px-4 py-3 bg-[#FFFDFC] border border-[#E8DFD5] rounded-xl text-xs text-[#2A221E] focus:outline-none focus:border-[#7A1C28] resize-none"
                  />
                </div>

                {/* Loyalty Milestone Transparency Notice */}
                <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#C89D5C]/40 flex items-start gap-3">
                  <ShieldAlert className="w-4 h-4 text-[#7A1C28] shrink-0 mt-0.5" />
                  <div className="text-[11px] text-[#6E645A] leading-relaxed">
                    <p className="font-medium text-[#2A221E]">Loyalty Program Transparency Note</p>
                    <p className="mt-0.5">
                      If this order is returned or exchanged, it will not count towards your Silver/Gold membership tier milestone. Our bespoke team will process your request seamlessly with complete white-glove care.
                    </p>
                  </div>
                </div>

                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-full bg-[#7A1C28] hover:bg-[#60121D] text-[#FAF7F2] text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-md hover:shadow-lg disabled:opacity-60 cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-[#E5C388]" />
                        <span>Submitting Request...</span>
                      </>
                    ) : (
                      <span>Submit {requestType === 'RETURN' ? 'Return' : 'Exchange'} Request</span>
                    )}
                  </button>
                </div>
              </>
            )}
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
