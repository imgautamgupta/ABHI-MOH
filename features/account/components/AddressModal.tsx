'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Loader2, AlertCircle } from 'lucide-react';
import { SavedAddress } from '@/lib/account/types';

interface AddressModalProps {
  address: SavedAddress | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AddressModal: React.FC<AddressModalProps> = ({
  address,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [title, setTitle] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [phone, setPhone] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [country] = useState('India');
  const [isDefault, setIsDefault] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (address) {
      setTitle(address.title || 'Home Residence');
      setRecipientName(address.recipientName || '');
      setPhone(address.phone || '');
      setAddressLine1(address.addressLine1 || '');
      setAddressLine2(address.addressLine2 || '');
      setCity(address.city || '');
      setState(address.state || '');
      setPincode(address.pincode || '');
      setIsDefault(Boolean(address.isDefault));
    } else {
      setTitle('Home Residence');
      setRecipientName('');
      setPhone('');
      setAddressLine1('');
      setAddressLine2('');
      setCity('');
      setState('');
      setPincode('');
      setIsDefault(false);
    }
  }, [address, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    if (!recipientName || !phone || !addressLine1 || !city || !state || !pincode) {
      setErrorMessage('Please fill in all mandatory address fields.');
      setIsSubmitting(false);
      return;
    }

    try {
      const isEdit = Boolean(address && address.id);
      const url = '/api/account/addresses';
      const method = isEdit ? 'PUT' : 'POST';

      const payload = isEdit
        ? {
            address: {
              id: address!.id,
              title,
              recipientName,
              phone,
              addressLine1,
              addressLine2,
              city,
              state,
              pincode,
              country,
              isDefault,
            },
          }
        : {
            address: {
              title,
              recipientName,
              phone,
              addressLine1,
              addressLine2,
              city,
              state,
              pincode,
              country,
              isDefault,
            },
          };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to save address.');
      }

      onSuccess();
      onClose();
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
          className="relative w-full max-w-lg bg-[#FAF7F2] border border-[#E8DFD5] rounded-2xl shadow-2xl overflow-hidden z-10 my-8 flex flex-col font-satoshi text-[#2A221E]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#E8DFD5] bg-[#FFFDFC]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#7A1C28]/10 text-[#7A1C28] flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <h3 className="font-hero text-lg uppercase tracking-wider text-[#2A221E]">
                {address ? 'Edit Delivery Address' : 'Add New Delivery Address'}
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

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-widest font-semibold text-[#6E645A]">
                  Address Label
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Home Residence, Studio"
                  className="w-full px-3.5 py-2.5 bg-[#FFFDFC] border border-[#E8DFD5] rounded-xl text-xs text-[#2A221E] focus:outline-none focus:border-[#7A1C28]"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-widest font-semibold text-[#6E645A]">
                  Recipient Full Name
                </label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full px-3.5 py-2.5 bg-[#FFFDFC] border border-[#E8DFD5] rounded-xl text-xs text-[#2A221E] focus:outline-none focus:border-[#7A1C28]"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-widest font-semibold text-[#6E645A]">
                Contact Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-3.5 py-2.5 bg-[#FFFDFC] border border-[#E8DFD5] rounded-xl text-xs text-[#2A221E] focus:outline-none focus:border-[#7A1C28]"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-widest font-semibold text-[#6E645A]">
                Address Line 1 (Flat, House No., Building)
              </label>
              <input
                type="text"
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
                placeholder="Plot / Flat / Street Name"
                className="w-full px-3.5 py-2.5 bg-[#FFFDFC] border border-[#E8DFD5] rounded-xl text-xs text-[#2A221E] focus:outline-none focus:border-[#7A1C28]"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-widest font-semibold text-[#6E645A]">
                Address Line 2 (Area, Landmark - Optional)
              </label>
              <input
                type="text"
                value={addressLine2}
                onChange={(e) => setAddressLine2(e.target.value)}
                placeholder="Landmark or Colony"
                className="w-full px-3.5 py-2.5 bg-[#FFFDFC] border border-[#E8DFD5] rounded-xl text-xs text-[#2A221E] focus:outline-none focus:border-[#7A1C28]"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-widest font-semibold text-[#6E645A]">
                  City
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="New Delhi"
                  className="w-full px-3.5 py-2.5 bg-[#FFFDFC] border border-[#E8DFD5] rounded-xl text-xs text-[#2A221E] focus:outline-none focus:border-[#7A1C28]"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-widest font-semibold text-[#6E645A]">
                  State
                </label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="Delhi"
                  className="w-full px-3.5 py-2.5 bg-[#FFFDFC] border border-[#E8DFD5] rounded-xl text-xs text-[#2A221E] focus:outline-none focus:border-[#7A1C28]"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-widest font-semibold text-[#6E645A]">
                  Pincode
                </label>
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="110057"
                  className="w-full px-3.5 py-2.5 bg-[#FFFDFC] border border-[#E8DFD5] rounded-xl text-xs text-[#2A221E] focus:outline-none focus:border-[#7A1C28]"
                  required
                />
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2.5">
              <input
                type="checkbox"
                id="defaultAddrCheck"
                checked={isDefault}
                onChange={(e) => setIsDefault(e.target.checked)}
                className="w-4 h-4 text-[#7A1C28] rounded-sm border-[#E8DFD5] focus:ring-[#7A1C28]"
              />
              <label htmlFor="defaultAddrCheck" className="text-xs text-[#2A221E] cursor-pointer">
                Set as default delivery address for future commissions
              </label>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-full bg-[#7A1C28] hover:bg-[#60121D] text-[#FAF7F2] text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-md hover:shadow-lg disabled:opacity-60 cursor-pointer flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#E5C388]" />
                    <span>Saving Address...</span>
                  </>
                ) : (
                  <span>{address ? 'Update Address' : 'Save Address'}</span>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
