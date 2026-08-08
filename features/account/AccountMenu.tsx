'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AccountTabMode } from './account.types';
import { ACCOUNT_PANEL_VARIANTS } from './account.animations';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';
import { GuestButton } from './GuestButton';
import { ProfileDropdown } from './ProfileDropdown';
import { cn } from '@/lib/utils';

// Monochrome Social SVG Icons
const GoogleIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 15.907 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
  </svg>
);

const AppleIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.13c.67-.81 1.13-1.94.99-3.07-1 .04-2.2.67-2.91 1.5-.63.73-1.18 1.89-1.03 3.01 1.12.09 2.25-.57 2.95-1.44z" />
  </svg>
);

export interface AccountMenuProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export const AccountMenu: React.FC<AccountMenuProps> = ({ isOpen, onClose, className }) => {
  const [activeTab, setActiveTab] = useState<AccountTabMode>('signin');
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
            'absolute top-full right-0 mt-3 w-[360px] sm:w-[420px] bg-[#FFFDFC]/98 backdrop-blur-[24px] border border-[#E8DFD5] shadow-xl rounded-2xl p-6 sm:p-8 z-50 flex flex-col gap-6 text-center font-satoshi overflow-hidden text-[#2A221E]',
            className
          )}
        >
          {/* HEADER: Welcome To ABHI-MOH & Mode Tabs */}
          {activeTab !== 'loggedin' ? (
            <div className="flex flex-col items-center gap-2">
              <h3 className="font-hero text-xl sm:text-2xl font-[500] tracking-[0.16em] uppercase text-[#7A1C28]">
                Welcome To ABHI-MOH
              </h3>
              <p className="font-sans text-xs font-light text-[#6E645A] max-w-xs leading-relaxed">
                Sign in to access your curated wishlist, order history, and luxury concierge services.
              </p>

              {/* Mode Switcher Tabs */}
              <div className="flex items-center justify-center p-1 bg-[#F3ECE3] border border-[#E8DFD5] rounded-full mt-3 w-full max-w-[280px]">
                <button
                  type="button"
                  onClick={() => setActiveTab('signin')}
                  className={cn(
                    'flex-1 py-1.5 text-[11px] uppercase tracking-wider font-medium rounded-full transition-all duration-300',
                    activeTab === 'signin'
                      ? 'bg-[#7A1C28] text-[#FAF7F2] shadow-xs'
                      : 'text-[#6E645A] hover:text-[#2A221E]'
                  )}
                >
                  Sign In
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('signup')}
                  className={cn(
                    'flex-1 py-1.5 text-[11px] uppercase tracking-wider font-medium rounded-full transition-all duration-300',
                    activeTab === 'signup'
                      ? 'bg-[#7A1C28] text-[#FAF7F2] shadow-xs'
                      : 'text-[#6E645A] hover:text-[#2A221E]'
                  )}
                >
                  Create Account
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between border-b border-[#E8DFD5] pb-3">
              <span className="font-hero text-sm font-medium uppercase tracking-[0.2em] text-[#7A1C28]">
                Maison Account
              </span>
              <button
                type="button"
                onClick={() => setActiveTab('signin')}
                className="text-[10px] uppercase tracking-widest text-[#6E645A] hover:text-[#7A1C28] underline"
              >
                Switch Account
              </button>
            </div>
          )}

          {/* ACTIVE CONTENT VIEW */}
          {activeTab === 'signin' && (
            <>
              <LoginForm onSuccessLogin={() => setActiveTab('loggedin')} />

              {/* Social Login Divider & Buttons */}
              <div className="flex flex-col gap-4 pt-2 border-t border-[#E8DFD5]">
                <div className="relative flex items-center justify-center">
                  <span className="absolute bg-[#FFFDFC] px-3 text-[10px] uppercase tracking-widest text-[#6E645A]">
                    OR
                  </span>
                  <div className="w-full border-t border-[#E8DFD5]" />
                </div>

                {/* Google & Apple Monochrome Buttons */}
                <div className="grid grid-cols-2 gap-3 mt-1">
                  <button
                    type="button"
                    onClick={() => setActiveTab('loggedin')}
                    className="flex items-center justify-center gap-2 py-2.5 px-4 bg-[#F3ECE3] hover:bg-[#E8DFD5] border border-[#E8DFD5] rounded-xl text-xs font-medium uppercase tracking-wider text-[#2A221E] transition-colors duration-200 cursor-pointer shadow-xs"
                  >
                    <GoogleIcon />
                    <span>Google</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('loggedin')}
                    className="flex items-center justify-center gap-2 py-2.5 px-4 bg-[#280E17] hover:bg-[#35131F] border border-[#C89D5C]/30 rounded-sm text-xs font-medium uppercase tracking-wider text-[#F6ECE1] transition-colors duration-200 cursor-pointer shadow-xs"
                  >
                    <AppleIcon />
                    <span>Apple</span>
                  </button>
                </div>
              </div>

              {/* Continue As Guest */}
              <GuestButton onClick={onClose} />
            </>
          )}

          {activeTab === 'signup' && (
            <>
              <SignupForm onSuccessSignup={() => setActiveTab('loggedin')} />
              <GuestButton onClick={onClose} />
            </>
          )}

          {activeTab === 'loggedin' && (
            <ProfileDropdown
              onLogout={() => setActiveTab('signin')}
              onClose={onClose}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

AccountMenu.displayName = 'AccountMenu';
