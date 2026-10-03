'use client';

import React, { useState, useRef, useEffect } from 'react';
import { User } from 'lucide-react';
import { IconButton } from './IconButton';
import { AccountMenu } from '@/features/account/AccountMenu';
import { useAuth } from '@/features/account/AuthContext';

export const AccountDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isLoggedIn, user, login } = useAuth();

  const handleAccountClick = () => {
    if (!isLoggedIn) {
      const currentPath =
        typeof window !== 'undefined'
          ? window.location.pathname + window.location.search
          : '/account';
      login(currentPath);
    } else {
      setIsOpen((prev) => !prev);
    }
  };

  // Click outside and Escape listener
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
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
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <IconButton
        ariaLabel="Account"
        onClick={handleAccountClick}
        className="relative"
      >
        {isLoggedIn && user ? (
          <div className="w-[22px] h-[22px] rounded-full bg-[#7A1C28] text-[#FAF7F2] text-[10px] font-hero font-semibold flex items-center justify-center border border-[#C89D5C]/60 shadow-xs">
            {user.avatarMonogram || 'AM'}
          </div>
        ) : (
          <User className="w-[20px] h-[20px] text-primary-text" />
        )}
      </IconButton>

      <AccountMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

AccountDropdown.displayName = 'AccountDropdown';
