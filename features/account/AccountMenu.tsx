'use client';

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ACCOUNT_PANEL_VARIANTS } from './account.animations';
import { GuestButton } from './GuestButton';
import { ProfileDropdown } from './ProfileDropdown';
import { useAuth } from './AuthContext';
import { ShieldCheck, LogIn, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AccountMenuProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export const AccountMenu: React.FC<AccountMenuProps> = ({ isOpen, onClose, className }) => {
  const { isLoggedIn, user, login } = useAuth();
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on Outside Click & Escape Key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleInitiateLogin = () => {
    login('/account');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={panelRef}
          variants={ACCOUNT_PANEL_VARIANTS}
          initial="initial"
          animate="animate"
          exit="exit"
          className={cn(
            'absolute top-full right-0 mt-3 w-[340px] sm:w-[380px] bg-[#FFFDFC]/98 backdrop-blur-[24px] border border-[#E8DFD5] shadow-2xl rounded-2xl p-6 sm:p-7 z-50 flex flex-col gap-5 text-center font-satoshi overflow-hidden text-[#2A221E]',
            className
          )}
        >
          {isLoggedIn && user ? (
            <ProfileDropdown onClose={onClose} />
          ) : (
            <>
              {/* HEADER */}
              <div className="flex flex-col items-center gap-1.5">
                <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#7A1C28] bg-[#7A1C28]/10 px-3 py-1 rounded-full">
                  Client Portal
                </span>

                <h3 className="font-hero text-xl sm:text-2xl font-medium tracking-[0.16em] uppercase text-[#2A221E] mt-2">
                  Welcome To ABHI-MOH
                </h3>
                <p className="font-sans text-xs font-light text-[#6E645A] max-w-xs leading-relaxed mt-1">
                  Sign in or create an account to view your orders, curated wishlist, and access private client services.
                </p>
              </div>

              {/* ACTION: Primary Login / Register Button */}
              <div className="flex flex-col gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleInitiateLogin}
                  className="w-full py-3.5 px-5 rounded-full bg-gradient-to-r from-[#7A1C28] via-[#8C1C2A] to-[#60121D] hover:from-[#8C1C2A] hover:to-[#7A1C28] text-[#FAF7F2] border border-[#C89D5C]/35 font-medium text-xs uppercase tracking-[0.18em] transition-all duration-300 flex items-center justify-between cursor-pointer shadow-md hover:shadow-lg active:scale-[0.98]"
                >
                  <div className="flex items-center gap-2.5">
                    <LogIn className="w-4 h-4 text-[#E5C388]" />
                    <span>Sign In / Register</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[#E5C388]" />
                </button>

                <div className="flex items-center gap-1.5 text-[10px] text-[#6E645A] justify-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C89D5C]" />
                  <span>Secure & Encrypted Authentication</span>
                </div>
              </div>

              <div className="border-t border-[#E8DFD5] pt-3">
                <GuestButton onClick={onClose} />
              </div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

AccountMenu.displayName = 'AccountMenu';
