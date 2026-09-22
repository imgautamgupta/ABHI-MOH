'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Plus, Edit2, Trash2, CheckCircle2, ShieldCheck, Phone } from 'lucide-react';
import { SavedAddress } from '@/lib/account/types';
import { AddressModal } from '../AddressModal';

interface AddressesSectionProps {
  addresses: SavedAddress[];
  onRefresh: () => void;
}

export const AddressesSection: React.FC<AddressesSectionProps> = ({
  addresses,
  onRefresh,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<SavedAddress | null>(null);
  const [isSettingDefault, setIsSettingDefault] = useState<string | null>(null);

  const handleOpenAdd = () => {
    setEditingAddress(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (addr: SavedAddress) => {
    setEditingAddress(addr);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this delivery address?')) return;
    try {
      const res = await fetch(`/api/account/addresses?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        onRefresh();
      }
    } catch (e) {
      console.error('Failed to delete address:', e);
    }
  };

  const handleSetDefault = async (id: string) => {
    setIsSettingDefault(id);
    try {
      const res = await fetch('/api/account/addresses', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'set_default', addressId: id }),
      });
      if (res.ok) {
        onRefresh();
      }
    } catch (e) {
      console.error('Failed to set default address:', e);
    } finally {
      setIsSettingDefault(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 font-satoshi text-[#2A221E]"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E8DFD5] pb-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#7A1C28]">
            Delivery Destinations
          </span>
          <h2 className="font-hero text-2xl uppercase tracking-wider text-[#2A221E] mt-0.5">
            Saved Addresses
          </h2>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="px-5 py-2.5 rounded-full bg-[#7A1C28] hover:bg-[#60121D] text-[#FAF7F2] text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Address</span>
        </button>
      </div>

      {addresses.length === 0 ? (
        <div className="bg-[#FFFDFC] border border-[#E8DFD5] rounded-2xl p-8 sm:p-12 text-center max-w-xl mx-auto shadow-xs">
          <div className="w-16 h-16 rounded-full bg-[#F3ECE3] flex items-center justify-center mx-auto mb-4 text-[#7A1C28]">
            <MapPin className="w-7 h-7" />
          </div>
          <h3 className="font-hero text-xl uppercase tracking-wider text-[#2A221E] mb-2">
            No Addresses Saved
          </h3>
          <p className="font-sans text-xs text-[#6E645A] font-light max-w-sm mx-auto mb-6 leading-relaxed">
            Add your primary residence or bridal gifting destination for expedited, white-glove checkout.
          </p>
          <button
            type="button"
            onClick={handleOpenAdd}
            className="px-5 py-2.5 rounded-full bg-[#7A1C28] text-[#FAF7F2] text-xs uppercase tracking-widest font-semibold"
          >
            Add First Address
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className={`bg-[#FFFDFC] border rounded-2xl p-6 shadow-xs flex flex-col justify-between gap-5 transition-all ${
                addr.isDefault
                  ? 'border-[#C89D5C] ring-1 ring-[#C89D5C]/30'
                  : 'border-[#E8DFD5] hover:border-[#7A1C28]/40'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-hero font-semibold text-sm uppercase tracking-wider text-[#2A221E]">
                      {addr.title}
                    </span>
                    {addr.isDefault && (
                      <span className="px-2 py-0.5 rounded-full text-[9px] uppercase tracking-widest font-semibold bg-[#C89D5C]/20 text-[#8F6526] border border-[#C89D5C]/40">
                        Default Address
                      </span>
                    )}
                  </div>
                  <MapPin className="w-4 h-4 text-[#7A1C28]" />
                </div>

                <div className="text-xs space-y-1 text-[#6E645A]">
                  <p className="font-semibold text-sm text-[#2A221E]">{addr.recipientName}</p>
                  <p className="leading-relaxed">{addr.addressLine1}</p>
                  {addr.addressLine2 && <p className="leading-relaxed">{addr.addressLine2}</p>}
                  <p className="leading-relaxed">
                    {addr.city}, {addr.state} — {addr.pincode}
                  </p>
                  <p className="leading-relaxed">{addr.country}</p>
                  <p className="pt-1 flex items-center gap-1.5 text-[#2A221E] font-medium">
                    <Phone className="w-3 h-3 text-[#7A1C28]" />
                    <span>{addr.phone}</span>
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-[#E8DFD5] text-xs">
                <div className="flex items-center gap-2">
                  {!addr.isDefault && (
                    <button
                      type="button"
                      onClick={() => handleSetDefault(addr.id)}
                      disabled={isSettingDefault === addr.id}
                      className="text-[11px] uppercase tracking-wider font-semibold text-[#7A1C28] hover:text-[#5E0006] transition-colors cursor-pointer"
                    >
                      {isSettingDefault === addr.id ? 'Setting...' : 'Set As Default'}
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(addr)}
                    className="p-2 rounded-full hover:bg-[#F3ECE3] text-[#6E645A] hover:text-[#2A221E] transition-colors cursor-pointer"
                    title="Edit Address"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(addr.id)}
                    className="p-2 rounded-full hover:bg-red-50 text-[#6E645A] hover:text-red-700 transition-colors cursor-pointer"
                    title="Delete Address"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Address Form Modal */}
      <AddressModal
        address={editingAddress}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={onRefresh}
      />
    </motion.div>
  );
};
