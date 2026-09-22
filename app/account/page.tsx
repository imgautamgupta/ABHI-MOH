'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { useAuth } from '@/features/account/AuthContext';
import { AccountTabKey, AccountDossier, ClientOrder } from '@/lib/account/types';

// Sections
import { ProfileSection } from '@/features/account/components/sections/ProfileSection';
import { OrdersSection } from '@/features/account/components/sections/OrdersSection';
import { OrderTrackingSection } from '@/features/account/components/sections/OrderTrackingSection';
import { WishlistSection } from '@/features/account/components/sections/WishlistSection';
import { ReturnsExchangesSection } from '@/features/account/components/sections/ReturnsExchangesSection';
import { AddressesSection } from '@/features/account/components/sections/AddressesSection';
import { MembershipSection } from '@/features/account/components/sections/MembershipSection';
import { ConciergeSection } from '@/features/account/components/sections/ConciergeSection';
import { PrivacySecuritySection } from '@/features/account/components/sections/PrivacySecuritySection';
import { PoliciesSection } from '@/features/account/components/sections/PoliciesSection';

// Layout & Modals
import { AccountSidebar } from '@/features/account/components/AccountSidebar';
import { AccountMobileNav } from '@/features/account/components/AccountMobileNav';
import { OrderDetailsModal } from '@/features/account/components/OrderDetailsModal';
import { ReturnRequestModal } from '@/features/account/components/ReturnRequestModal';

const VALID_TABS: AccountTabKey[] = [
  'profile',
  'orders',
  'tracking',
  'wishlist',
  'returns',
  'addresses',
  'membership',
  'concierge',
  'security',
  'policies',
];

function AccountPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const tabParam = searchParams.get('tab') as AccountTabKey;
  const initialTab: AccountTabKey = tabParam && VALID_TABS.includes(tabParam) ? tabParam : 'profile';

  const [activeTab, setActiveTab] = useState<AccountTabKey>(initialTab);
  const [dossier, setDossier] = useState<AccountDossier | null>(null);
  const [isLoadingDossier, setIsLoadingDossier] = useState(true);

  // Modals & Tracking selection
  const [selectedOrderForDetails, setSelectedOrderForDetails] = useState<ClientOrder | null>(null);
  const [selectedOrderForReturn, setSelectedOrderForReturn] = useState<ClientOrder | null>(null);
  const [selectedTrackingOrderId, setSelectedTrackingOrderId] = useState<string>('');

  const { user, isLoggedIn, isLoading: isAuthLoading, login, logout } = useAuth();

  // Fetch dossier from API
  const fetchDossier = useCallback(async () => {
    try {
      setIsLoadingDossier(true);
      const res = await fetch('/api/account/profile', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.dossier) {
          // If Wix member info exists, merge name & email
          if (user) {
            data.dossier.name = user.name || data.dossier.name;
            data.dossier.email = user.email || data.dossier.email;
            data.dossier.avatarMonogram = user.avatarMonogram || data.dossier.avatarMonogram;
          }
          setDossier(data.dossier);
        }
      }
    } catch (e) {
      console.warn('Failed to load profile dossier:', e);
    } finally {
      setIsLoadingDossier(false);
    }
  }, [user]);

  useEffect(() => {
    fetchDossier();
  }, [fetchDossier]);

  // Sync tab with URL search parameter
  useEffect(() => {
    const currentTab = searchParams.get('tab') as AccountTabKey;
    if (currentTab && VALID_TABS.includes(currentTab)) {
      setActiveTab(currentTab);
    }
    const orderIdParam = searchParams.get('orderId');
    if (orderIdParam) {
      setSelectedTrackingOrderId(orderIdParam);
    }
  }, [searchParams]);

  const handleSelectTab = (tab: AccountTabKey) => {
    setActiveTab(tab);
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tab);
    router.replace(`/account?${params.toString()}`, { scroll: false });
  };

  const handleTrackOrder = (orderId: string) => {
    setSelectedTrackingOrderId(orderId);
    handleSelectTab('tracking');
  };

  const handleRequestReturn = (orderId: string) => {
    if (!dossier) return;
    const order = dossier.orders.find((o) => o.id === orderId);
    if (order) {
      setSelectedOrderForReturn(order);
    }
  };

  const handleSelectTestScenario = async (scenario: string) => {
    try {
      setIsLoadingDossier(true);
      const res = await fetch('/api/account/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'set_test_scenario', scenario }),
      });
      const data = await res.json();
      if (data.success && data.dossier) {
        setDossier(data.dossier);
      }
    } catch (e) {
      console.error('Failed to set test scenario:', e);
    } finally {
      setIsLoadingDossier(false);
    }
  };

  // Loading state
  if (isAuthLoading || (isLoadingDossier && !dossier)) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex flex-col items-center justify-center pt-24 font-satoshi text-[#2A221E]">
        <div className="w-10 h-10 rounded-full border-2 border-[#7A1C28]/20 border-t-[#7A1C28] animate-spin mb-4" />
        <p className="font-hero text-xs tracking-[0.25em] uppercase text-[#7A1C28]">
          Authenticating Client Dossier...
        </p>
      </div>
    );
  }

  // Unauthenticated client state (if not logged in and no mock session)
  if (!isLoggedIn && !user && !dossier) {
    return (
      <div className="relative w-full bg-[#FAF7F2] text-[#2A221E] min-h-screen pt-[120px] lg:pt-[150px] pb-32 px-5 sm:px-10 lg:px-16 max-w-[1400px] mx-auto font-satoshi overflow-hidden">
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

  // Active Client Dossier
  const activeDossier = dossier!;

  return (
    <div className="relative w-full bg-[#FAF7F2] text-[#2A221E] min-h-screen pt-[100px] lg:pt-[130px] pb-32 px-4 sm:px-8 lg:px-12 max-w-[1600px] mx-auto font-satoshi overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] lg:w-[1300px] h-[550px] bg-[radial-gradient(ellipse_at_50%_0%,rgba(217,199,167,0.22)_0%,transparent_70%)] pointer-events-none z-0" />

      <div className="relative z-10">
        {/* Mobile Navigation Header */}
        <AccountMobileNav
          activeTab={activeTab}
          onSelectTab={handleSelectTab}
          dossier={activeDossier}
          onLogout={logout}
        />

        {/* Desktop Dashboard Layout: Sidebar + Main Content */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Desktop Left Sidebar */}
          <div className="hidden lg:block sticky top-28">
            <AccountSidebar
              activeTab={activeTab}
              onSelectTab={handleSelectTab}
              dossier={activeDossier}
              onLogout={logout}
              onSelectTestScenario={handleSelectTestScenario}
            />
          </div>

          {/* Main Section Content Area */}
          <main className="flex-1 w-full min-w-0">
            <AnimatePresence mode="wait">
              {activeTab === 'profile' && (
                <ProfileSection
                  key="profile"
                  dossier={activeDossier}
                  onNavigateTab={handleSelectTab}
                  onSelectOrderForTracking={handleTrackOrder}
                />
              )}

              {activeTab === 'orders' && (
                <OrdersSection
                  key="orders"
                  orders={activeDossier.orders}
                  onViewDetails={(order) => setSelectedOrderForDetails(order)}
                  onTrackOrder={handleTrackOrder}
                  onRequestReturn={handleRequestReturn}
                />
              )}

              {activeTab === 'tracking' && (
                <OrderTrackingSection
                  key="tracking"
                  orders={activeDossier.orders}
                  selectedOrderId={selectedTrackingOrderId}
                  onSelectOrder={(id) => setSelectedTrackingOrderId(id)}
                />
              )}

              {activeTab === 'wishlist' && <WishlistSection key="wishlist" />}

              {activeTab === 'returns' && (
                <ReturnsExchangesSection
                  key="returns"
                  orders={activeDossier.orders}
                  returnRequests={activeDossier.returnRequests}
                  onRequestReturn={handleRequestReturn}
                />
              )}

              {activeTab === 'addresses' && (
                <AddressesSection
                  key="addresses"
                  addresses={activeDossier.savedAddresses}
                  onRefresh={fetchDossier}
                />
              )}

              {activeTab === 'membership' && (
                <MembershipSection
                  key="membership"
                  membership={activeDossier.membership}
                />
              )}

              {activeTab === 'concierge' && <ConciergeSection key="concierge" />}

              {activeTab === 'security' && (
                <PrivacySecuritySection
                  key="security"
                  dossier={activeDossier}
                  onLogout={logout}
                />
              )}

              {activeTab === 'policies' && <PoliciesSection key="policies" />}
            </AnimatePresence>
          </main>
        </div>
      </div>

      {/* Order Details Modal */}
      <OrderDetailsModal
        order={selectedOrderForDetails}
        isOpen={Boolean(selectedOrderForDetails)}
        onClose={() => setSelectedOrderForDetails(null)}
        onTrackOrder={handleTrackOrder}
        onRequestReturn={handleRequestReturn}
      />

      {/* Return & Exchange Request Modal */}
      <ReturnRequestModal
        order={selectedOrderForReturn}
        isOpen={Boolean(selectedOrderForReturn)}
        onClose={() => setSelectedOrderForReturn(null)}
        onSuccess={fetchDossier}
      />
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
