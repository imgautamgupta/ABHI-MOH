'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Package,
  Heart,
  MapPin,
  Sparkles,
  LogOut,
  ArrowRight,
  ShieldCheck,
  Crown,
  Phone,
  Mail,
  Calendar,
  ExternalLink,
  ShoppingBag,
} from 'lucide-react';
import { useAuth } from '@/features/account/AuthContext';
import { useFavorites } from '@/features/favorites/FavoritesContext';
import { useCart } from '@/features/cart/CartContext';
import { HangingCard } from '@/features/collections/components/HangingCard';
import { cn } from '@/lib/utils';

type TabKey = 'profile' | 'orders' | 'wishlist' | 'addresses' | 'concierge';

function AccountPageContent() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get('tab') as TabKey) || 'profile';

  const [activeTab, setActiveTab] = useState<TabKey>(initialTab);
  const { user, isLoggedIn, isLoading, login, logout } = useAuth();
  const { favoriteProducts, totalFavoriteCount } = useFavorites();
  const { totalItemCount } = useCart();

  useEffect(() => {
    const tab = searchParams.get('tab') as TabKey;
    if (tab && ['profile', 'orders', 'wishlist', 'addresses', 'concierge'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex flex-col items-center justify-center pt-24 font-satoshi text-[#2A221E]">
        <div className="w-10 h-10 rounded-full border-2 border-[#7A1C28]/20 border-t-[#7A1C28] animate-spin mb-4" />
        <p className="font-hero text-sm tracking-[0.2em] uppercase text-[#7A1C28]">
          Loading Account...
        </p>
      </div>
    );
  }

  // UNAUTHENTICATED STATE
  if (!isLoggedIn || !user) {
    return (
      <div className="relative w-full bg-[#FAF7F2] text-[#2A221E] min-h-screen pt-[120px] lg:pt-[150px] pb-32 px-5 sm:px-10 lg:px-16 max-w-[1400px] mx-auto font-satoshi overflow-hidden">
        {/* Subtle radial glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] lg:w-[1200px] h-[500px] bg-[radial-gradient(ellipse_at_50%_0%,rgba(217,199,167,0.25)_0%,transparent_70%)] pointer-events-none z-0" />

        <div className="relative z-10 flex flex-col items-center justify-center max-w-xl mx-auto text-center mt-6">
          <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.35em] text-[#7A1C28] bg-[#F3ECE3] px-4 py-1.5 rounded-full border border-[#E8DFD5] inline-block mb-4 shadow-2xs">
            ABHI-MOH ATELIER
          </span>

          <h1 className="font-hero text-3xl sm:text-5xl font-medium tracking-[0.14em] uppercase text-[#2A221E] leading-tight">
            Client Authentication
          </h1>

          <p className="mt-4 font-sans text-xs sm:text-sm font-light text-[#6E645A] leading-relaxed max-w-md">
            Sign in to view your orders, track bespoke weaves, and consult with our atelier specialists.
          </p>

          <div className="w-full mt-8 p-8 bg-[#FFFDFC]/90 backdrop-blur-md rounded-2xl border border-[#E8DFD5] shadow-xl flex flex-col gap-6">
            <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-[#7A1C28] font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#C89D5C]" />
              <span>Encrypted & Secure Client Portal</span>
            </div>

            <button
              type="button"
              onClick={() => login('/account')}
              className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-[#7A1C28] via-[#8C1C2A] to-[#60121D] hover:from-[#8C1C2A] hover:to-[#7A1C28] text-[#FAF7F2] border border-[#C89D5C]/40 font-medium text-xs uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer shadow-md hover:shadow-lg active:scale-[0.99]"
            >
              <span>Sign In / Register</span>
              <ArrowRight className="w-4 h-4 text-[#E5C388]" />
            </button>

            <div className="flex flex-col gap-2 pt-4 border-t border-[#E8DFD5] text-left text-xs text-[#6E645A]">
              <div className="flex items-center gap-2">
                <Crown className="w-3.5 h-3.5 text-[#C89D5C] shrink-0" />
                <span>Access your saved wishlist across any device</span>
              </div>
              <div className="flex items-center gap-2">
                <Package className="w-3.5 h-3.5 text-[#C89D5C] shrink-0" />
                <span>Track real-time orders, dispatch, and delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#C89D5C] shrink-0" />
                <span>Bespoke concierge consultations and appointments</span>
              </div>
            </div>
          </div>

          <Link
            href="/collections"
            className="mt-6 text-xs uppercase tracking-widest text-[#6E645A] hover:text-[#7A1C28] underline transition-colors"
          >
            ← Return to Boutique Collections
          </Link>
        </div>
      </div>
    );
  }

  // AUTHENTICATED STATE
  return (
    <div className="relative w-full bg-[#FAF7F2] text-[#2A221E] min-h-screen pt-[110px] lg:pt-[140px] pb-32 px-4 sm:px-8 lg:px-14 max-w-[1600px] mx-auto font-satoshi overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] lg:w-[1300px] h-[550px] bg-[radial-gradient(ellipse_at_50%_0%,rgba(217,199,167,0.22)_0%,transparent_70%)] pointer-events-none z-0" />

      <div className="relative z-10">
        {/* HEADER HERO CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full bg-[#FFFDFC]/95 backdrop-blur-md rounded-2xl border border-[#E8DFD5] p-6 sm:p-10 shadow-sm mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#7A1C28] to-[#450A10] border-2 border-[#C89D5C]/50 flex items-center justify-center text-[#FAF7F2] font-hero text-xl sm:text-2xl font-bold tracking-widest shadow-md shrink-0">
              {user.avatarMonogram || 'AM'}
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#7A1C28] bg-[#7A1C28]/10 px-2.5 py-0.5 rounded-full">
                  Verified Client
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[#6E645A]">
                  ID: {user.id ? user.id.slice(0, 8) : 'MEMBER'}
                </span>
              </div>

              <h1 className="font-hero text-2xl sm:text-4xl font-normal tracking-[0.08em] uppercase text-[#2A221E] mt-1">
                {user.name}
              </h1>

              <p className="font-sans text-xs sm:text-sm font-light text-[#6E645A]">
                {user.email || 'Client Profile'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-stretch md:self-auto justify-end">
            <button
              type="button"
              onClick={logout}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#E8DFD5] hover:border-[#7A1C28] hover:bg-[#7A1C28]/5 text-[#7A1C28] text-xs uppercase tracking-widest font-semibold transition-all duration-200 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </motion.div>

        {/* STATS STRIP */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-[#FFFDFC]/80 border border-[#E8DFD5] rounded-xl p-4 sm:p-5 flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-[#6E645A]">Wishlist Pieces</span>
            <span className="font-hero text-2xl sm:text-3xl text-[#7A1C28] mt-1 font-medium">
              {totalFavoriteCount}
            </span>
          </div>

          <div className="bg-[#FFFDFC]/80 border border-[#E8DFD5] rounded-xl p-4 sm:p-5 flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-[#6E645A]">Shopping Bag</span>
            <span className="font-hero text-2xl sm:text-3xl text-[#7A1C28] mt-1 font-medium">
              {totalItemCount}
            </span>
          </div>

          <div className="bg-[#FFFDFC]/80 border border-[#E8DFD5] rounded-xl p-4 sm:p-5 flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-[#6E645A]">Client Tier</span>
            <span className="font-hero text-base sm:text-lg text-[#2A221E] mt-1 font-medium flex items-center gap-1.5">
              <Crown className="w-4 h-4 text-[#C89D5C]" />
              Haute Patron
            </span>
          </div>

          <div className="bg-[#FFFDFC]/80 border border-[#E8DFD5] rounded-xl p-4 sm:p-5 flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-[#6E645A]">Concierge Status</span>
            <span className="font-hero text-base sm:text-lg text-[#2A221E] mt-1 font-medium flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#C89D5C]" />
              VIP Priority
            </span>
          </div>
        </div>

        {/* TABS NAVIGATION */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-[#E8DFD5] scrollbar-none">
          {[
            { key: 'profile', label: 'Profile & Privileges', icon: User },
            { key: 'orders', label: 'Orders & Commissions', icon: Package },
            { key: 'wishlist', label: `Wishlist (${totalFavoriteCount})`, icon: Heart },
            { key: 'addresses', label: 'Saved Addresses', icon: MapPin },
            { key: 'concierge', label: 'Concierge Desk', icon: Sparkles },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key as TabKey)}
                className={cn(
                  'flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-medium whitespace-nowrap transition-all duration-200 cursor-pointer',
                  isActive
                    ? 'bg-[#7A1C28] text-[#FAF7F2] shadow-sm'
                    : 'bg-[#F3ECE3] text-[#6E645A] hover:text-[#2A221E] hover:bg-[#E8DFD5]'
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB CONTENTS */}
        <AnimatePresence mode="wait">
          {/* PROFILE & PRIVILEGES TAB */}
          {activeTab === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Account Details Card */}
              <div className="lg:col-span-1 bg-[#FFFDFC] border border-[#E8DFD5] rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col gap-6">
                <div className="flex items-center justify-between border-b border-[#E8DFD5] pb-4">
                  <h3 className="font-hero text-lg uppercase tracking-wider text-[#7A1C28]">
                    Account Dossier
                  </h3>
                  <ShieldCheck className="w-4 h-4 text-[#C89D5C]" />
                </div>

                <div className="flex flex-col gap-4 text-xs">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#6E645A]">Full Name</span>
                    <p className="font-medium text-sm text-[#2A221E] mt-0.5">{user.name}</p>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#6E645A]">Primary Email</span>
                    <p className="font-medium text-sm text-[#2A221E] mt-0.5">{user.email || 'Not Specified'}</p>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#6E645A]">Member ID</span>
                    <p className="font-mono text-xs text-[#6E645A] mt-0.5 break-all">{user.id || 'N/A'}</p>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#6E645A]">Membership Status</span>
                    <p className="font-medium text-xs text-emerald-700 mt-0.5 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      Active & Verified
                    </p>
                  </div>
                </div>
              </div>

              {/* Privileges Overview */}
              <div className="lg:col-span-2 bg-[#FFFDFC] border border-[#E8DFD5] rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col gap-6">
                <div className="flex items-center justify-between border-b border-[#E8DFD5] pb-4">
                  <h3 className="font-hero text-lg uppercase tracking-wider text-[#7A1C28]">
                    Member Privileges & Benefits
                  </h3>
                  <Crown className="w-4 h-4 text-[#C89D5C]" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-[#F3ECE3]/60 border border-[#E8DFD5] flex flex-col gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#7A1C28]/10 text-[#7A1C28] flex items-center justify-center">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <h4 className="font-hero text-sm uppercase tracking-wider text-[#2A221E]">
                      Master Weaver Advisory
                    </h4>
                    <p className="font-sans text-xs text-[#6E645A] leading-relaxed">
                      Complimentary 1-on-1 consultations with our Varanasi & Kanchipuram master curators.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#F3ECE3]/60 border border-[#E8DFD5] flex flex-col gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#7A1C28]/10 text-[#7A1C28] flex items-center justify-center">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <h4 className="font-hero text-sm uppercase tracking-wider text-[#2A221E]">
                      Private Runway Previews
                    </h4>
                    <p className="font-sans text-xs text-[#6E645A] leading-relaxed">
                      72-hour early access to limited edition festive saree drops before public releases.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#F3ECE3]/60 border border-[#E8DFD5] flex flex-col gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#7A1C28]/10 text-[#7A1C28] flex items-center justify-center">
                      <Package className="w-4 h-4" />
                    </div>
                    <h4 className="font-hero text-sm uppercase tracking-wider text-[#2A221E]">
                      White-Glove Delivery
                    </h4>
                    <p className="font-sans text-xs text-[#6E645A] leading-relaxed">
                      Insured expedited shipping in signature ABHI-MOH archival velvet saree caskets.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#F3ECE3]/60 border border-[#E8DFD5] flex flex-col gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#7A1C28]/10 text-[#7A1C28] flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <h4 className="font-hero text-sm uppercase tracking-wider text-[#2A221E]">
                      Zari Silk Authenticity
                    </h4>
                    <p className="font-sans text-xs text-[#6E645A] leading-relaxed">
                      Silk Mark and Handloom certified certificates issued for every commissioned drape.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ORDERS TAB */}
          {activeTab === 'orders' && (
            <motion.div
              key="orders"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="bg-[#FFFDFC] border border-[#E8DFD5] rounded-2xl p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-xs"
            >
              <div className="w-16 h-16 rounded-full bg-[#F3ECE3] border border-[#E8DFD5] flex items-center justify-center mx-auto mb-4 text-[#7A1C28]">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <h3 className="font-hero text-2xl uppercase tracking-wider text-[#2A221E] mb-2">
                No Active Orders Yet
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#6E645A] font-light max-w-md mx-auto mb-6 leading-relaxed">
                When you purchase a saree from our atelier, your order status, loom crafting progress, and shipment tracking will appear here.
              </p>
              <Link
                href="/collections"
                className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#7A1C28] hover:bg-[#60121D] text-[#FAF7F2] text-xs uppercase tracking-widest font-semibold rounded-full shadow-sm transition-all"
              >
                <span>Discover The Weaves</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          )}

          {/* WISHLIST TAB */}
          {activeTab === 'wishlist' && (
            <motion.div
              key="wishlist"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              {totalFavoriteCount === 0 ? (
                <div className="bg-[#FFFDFC] border border-[#E8DFD5] rounded-2xl p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-xs">
                  <div className="w-16 h-16 rounded-full bg-[#F3ECE3] border border-[#E8DFD5] flex items-center justify-center mx-auto mb-4 text-[#7A1C28]">
                    <Heart className="w-7 h-7" />
                  </div>
                  <h3 className="font-hero text-2xl uppercase tracking-wider text-[#2A221E] mb-2">
                    Your Wishlist Is Empty
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#6E645A] font-light max-w-md mx-auto mb-6 leading-relaxed">
                    Explore our curated collection and save pieces to consult with our stylists or reserve for special occasions.
                  </p>
                  <Link
                    href="/collections"
                    className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#7A1C28] hover:bg-[#60121D] text-[#FAF7F2] text-xs uppercase tracking-widest font-semibold rounded-full shadow-sm transition-all"
                  >
                    <span>Browse Sarees</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {favoriteProducts.map((product) => (
                    <HangingCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* ADDRESSES TAB */}
          {activeTab === 'addresses' && (
            <motion.div
              key="addresses"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="bg-[#FFFDFC] border border-[#E8DFD5] rounded-2xl p-8 sm:p-10 shadow-xs max-w-3xl mx-auto"
            >
              <div className="flex items-center justify-between border-b border-[#E8DFD5] pb-4 mb-6">
                <h3 className="font-hero text-lg uppercase tracking-wider text-[#7A1C28]">
                  Delivery Addresses
                </h3>
                <MapPin className="w-4 h-4 text-[#C89D5C]" />
              </div>

              {user.addresses && user.addresses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {user.addresses.map((addr, idx) => (
                    <div key={addr._id || idx} className="p-4 rounded-xl bg-[#F3ECE3]/60 border border-[#E8DFD5] text-xs">
                      <p className="font-semibold text-sm text-[#2A221E] mb-1">
                        {addr.streetAddress?.name || 'Saved Address'} {addr.streetAddress?.number || ''}
                      </p>
                      <p className="text-[#6E645A]">{addr.city}, {addr.subdivision} {addr.postalCode}</p>
                      <p className="text-[#6E645A]">{addr.country}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="font-sans text-xs sm:text-sm text-[#6E645A] font-light mb-4">
                    No default shipping address saved on your profile yet. Addresses entered during checkout will appear here.
                  </p>
                  <Link
                    href="/collections"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#7A1C28] text-[#FAF7F2] text-xs uppercase tracking-widest font-semibold rounded-full"
                  >
                    <span>Start Shopping</span>
                  </Link>
                </div>
              )}
            </motion.div>
          )}

          {/* CONCIERGE TAB */}
          {activeTab === 'concierge' && (
            <motion.div
              key="concierge"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="bg-[#FFFDFC] border border-[#E8DFD5] rounded-2xl p-8 sm:p-12 max-w-3xl mx-auto shadow-xs text-center"
            >
              <div className="w-16 h-16 rounded-full bg-[#7A1C28]/10 text-[#7A1C28] border border-[#C89D5C]/40 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-7 h-7" />
              </div>
              <h3 className="font-hero text-2xl uppercase tracking-wider text-[#2A221E] mb-2">
                Private Concierge Desk
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#6E645A] font-light max-w-md mx-auto mb-8 leading-relaxed">
                Our stylists are available 7 days a week for custom weave sizing, bridal appointments, and zari curation.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 rounded-xl bg-[#F3ECE3]/60 border border-[#E8DFD5] hover:border-[#7A1C28] transition-all flex items-center gap-4 group"
                >
                  <Phone className="w-5 h-5 text-[#7A1C28]" />
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#6E645A]">WhatsApp VIP Line</span>
                    <p className="font-medium text-xs text-[#2A221E] group-hover:text-[#7A1C28] flex items-center gap-1 mt-0.5">
                      +91 (0) 98765 43210
                      <ExternalLink className="w-3 h-3 ml-auto opacity-60" />
                    </p>
                  </div>
                </a>

                <a
                  href="mailto:concierge@abhimoh.com"
                  className="p-5 rounded-xl bg-[#F3ECE3]/60 border border-[#E8DFD5] hover:border-[#7A1C28] transition-all flex items-center gap-4 group"
                >
                  <Mail className="w-5 h-5 text-[#7A1C28]" />
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#6E645A]">Private Mailbox</span>
                    <p className="font-medium text-xs text-[#2A221E] group-hover:text-[#7A1C28] flex items-center gap-1 mt-0.5">
                      concierge@abhimoh.com
                      <ExternalLink className="w-3 h-3 ml-auto opacity-60" />
                    </p>
                  </div>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function AccountPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center pt-24 font-satoshi text-[#2A221E]">
          <div className="w-10 h-10 rounded-full border-2 border-[#7A1C28]/20 border-t-[#7A1C28] animate-spin" />
        </div>
      }
    >
      <AccountPageContent />
    </Suspense>
  );
}
