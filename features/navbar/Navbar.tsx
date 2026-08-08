'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { DesktopNav } from './DesktopNav';
import { MobileNav } from './MobileNav';
import { cn } from '@/lib/utils';

export const Navbar: React.FC = () => {
  const headerRef = useRef<HTMLElement>(null);
  const lastScrollYRef = useRef<number>(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 20);

      // Always keep header visible near top
      if (currentScrollY <= 80) {
        gsap.to(headerRef.current, {
          yPercent: 0,
          duration: 0.4,
          ease: 'power2.out',
          overwrite: 'auto',
        });
        lastScrollYRef.current = currentScrollY;
        return;
      }

      // Scrolling Down -> Hide Header
      if (currentScrollY > lastScrollYRef.current + 5) {
        gsap.to(headerRef.current, {
          yPercent: -100,
          duration: 0.4,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }
      // Scrolling Up -> Reveal Header
      else if (currentScrollY < lastScrollYRef.current - 5) {
        gsap.to(headerRef.current, {
          yPercent: 0,
          duration: 0.4,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-silk select-none',
        isScrolled
          ? 'bg-[#FAF7F2]/90 backdrop-blur-[20px] border-b border-[#E8DFD5] shadow-xs text-[#2A221E]'
          : 'bg-transparent border-b border-transparent text-[#2A221E]'
      )}
    >
      <DesktopNav />
      <MobileNav />
    </header>
  );
};

Navbar.displayName = 'Navbar';
