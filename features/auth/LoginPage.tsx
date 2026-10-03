'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { WeavingPanel } from './WeavingPanel';
import { SilkTagCard } from './SilkTagCard';
import { SilkCurtain } from './SilkCurtain';
import { ZariBorderStrip } from './auth.constants';
import { useAuth } from '@/features/account/AuthContext';

export interface LoginPageProps {
  initialMode?: 'login' | 'signup' | 'forgot' | 'verify';
}

const getSafeReturnTo = (url: string | null | undefined, fallback = '/account'): string => {
  if (!url) return fallback;
  const trimmed = url.trim();
  if (
    trimmed.startsWith('/') &&
    !trimmed.startsWith('//') &&
    !trimmed.startsWith('/\\') &&
    !trimmed.includes('://')
  ) {
    return trimmed;
  }
  return fallback;
};

export const LoginPage: React.FC<LoginPageProps> = ({ initialMode = 'login' }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLoggedIn, isLoading, user, refreshUser } = useAuth();

  const queryMode = searchParams.get('mode');
  const rawReturnTo = searchParams.get('returnTo') || searchParams.get('returnUrl');
  const returnUrl = getSafeReturnTo(rawReturnTo);

  const [mode, setMode] = useState<'login' | 'signup' | 'forgot' | 'verify'>(
    queryMode === 'signup'
      ? 'signup'
      : queryMode === 'forgot'
      ? 'forgot'
      : queryMode === 'verify'
      ? 'verify'
      : initialMode
  );

  // email prefill state (set when signup finds duplicate email → switches to login)
  const [prefillEmail, setPrefillEmail] = useState<string | undefined>(undefined);

  const [showCurtain, setShowCurtain] = useState(false);
  const [welcomeName, setWelcomeName] = useState('');

  // ── Already-logged-in: redirect immediately (no flash of form) ───────────
  useEffect(() => {
    // Wait for the auth loading to finish before acting
    if (isLoading) return;
    if (isLoggedIn && !showCurtain) {
      router.replace(returnUrl);
    }
  }, [isLoggedIn, isLoading, returnUrl, router, showCurtain]);

  // ── onSuccess: called by SilkTagCard after cookie is set ─────────────────
  const handleSuccess = useCallback(
    async (firstName: string) => {
      // Refresh the AuthContext from the new httpOnly cookie
      await refreshUser();
      const displayName = firstName || user?.firstName || 'Esteemed Client';
      setWelcomeName(displayName);
      setShowCurtain(true);
    },
    [refreshUser, user?.firstName]
  );

  const handleCurtainComplete = useCallback(() => {
    router.push(returnUrl);
  }, [router, returnUrl]);

  // ── Mode change with optional email prefill ───────────────────────────────
  const handleModeChange = useCallback(
    (next: 'login' | 'signup' | 'forgot' | 'verify', emailPrefill?: string) => {
      if (emailPrefill) setPrefillEmail(emailPrefill);
      setMode(next);
    },
    []
  );

  // ── Loading skeleton while session is being checked ───────────────────────
  if (isLoading) {
    return (
      <main className="relative min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          {/* Spinning gold ring */}
          <div className="w-10 h-10 rounded-full border-2 border-[#D9C7A7] border-t-[#C29F62] animate-spin" />
          <span className="font-sans text-[11px] uppercase tracking-[0.22em] text-[#736357]">
            Verifying Dossier…
          </span>
        </div>
      </main>
    );
  }

  // ── Already logged in — show welcome banner briefly before redirect ────────
  if (isLoggedIn && !showCurtain) {
    return (
      <main className="relative min-h-screen bg-[#FAF7F2] flex items-center justify-center px-4">
        <div className="text-center space-y-3">
          <p className="font-hero text-2xl text-[#2A221E]">
            Welcome back{user?.firstName ? `, ${user.firstName}` : ''}.
          </p>
          <p className="text-xs text-[#736357] uppercase tracking-widest">
            Redirecting to your account…
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-[#FAF7F2] text-[#2A221E] font-satoshi flex flex-col justify-between overflow-x-hidden selection:bg-[#7D2130] selection:text-[#FAF7F2]">
      {/* ── MOBILE HEADER ─────────────────────────────────────────────────── */}
      <div className="lg:hidden w-full pt-10 pb-4 px-6 flex flex-col items-center select-none">
        <ZariBorderStrip orientation="horizontal" className="mb-4 opacity-80" />
        <Link href="/" className="flex items-center gap-3 group focus:outline-none" aria-label="ABHI-MOH Home">
          <div className="relative w-11 h-11 rounded-full bg-[#FAF7F2] border border-[#D9C7A7] flex items-center justify-center p-1.5 shadow-2xs">
            <Image
              src="/images/abhi-moh-monogram.png"
              alt="ABHI-MOH Monogram"
              width={36}
              height={36}
              className="w-full h-full object-contain"
              priority
            />
          </div>
          <div>
            <span className="font-hero text-sm font-semibold tracking-[0.22em] uppercase text-[#7D2130] block">
              ABHI-MOH
            </span>
            <span className="font-sans text-[9px] tracking-[0.18em] uppercase text-[#736357]">
              Haute Couture Atelier
            </span>
          </div>
        </Link>
      </div>

      {/* ── MAIN TWO-PANEL ARENA ──────────────────────────────────────────── */}
      <div className="relative flex-1 w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 py-6 lg:py-14 flex items-center justify-center">
        <div className="w-full flex flex-col lg:flex-row items-stretch justify-center gap-8 lg:gap-12">
          {/* LEFT 55%: IVORY WEAVING PANEL (DESKTOP) */}
          <WeavingPanel mode={mode} />

          {/* RIGHT 45%: HANG TAG CARD (DESKTOP + MOBILE) */}
          <div className="w-full lg:w-[46%] flex items-center justify-center">
            <SilkTagCard
              mode={mode}
              onModeChange={handleModeChange}
              onSuccess={handleSuccess}
              prefillEmail={prefillEmail}
              returnTo={returnUrl}
            />
          </div>
        </div>
      </div>

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <footer className="w-full py-5 border-t border-[#D9C7A7]/40 text-center select-none">
        <p className="text-[11px] font-sans tracking-widest uppercase text-[#736357]">
          &copy; {new Date().getFullYear()} ABHI-MOH Atelier • All Rights Reserved
        </p>
      </footer>

      {/* ── SILK CURTAIN SUCCESS TRANSITION ──────────────────────────────── */}
      {showCurtain && (
        <SilkCurtain
          firstName={welcomeName}
          onComplete={handleCurtainComplete}
        />
      )}
    </main>
  );
};
