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
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          setIsScrolled((prev) => {
            const next = currentScrollY > 20;
            return prev !== next ? next : prev;
          });

          // Always keep header visible near top
          if (currentScrollY <= 80) {
            gsap.to(headerRef.current, {
              yPercent: 0,
              duration: 0.35,
              ease: 'power2.out',
              overwrite: 'auto',
            });
            lastScrollYRef.current = currentScrollY;
            ticking = false;
            return;
          }

          // Scrolling Down -> Hide Header
          if (currentScrollY > lastScrollYRef.current + 8) {
            gsap.to(headerRef.current, {
              yPercent: -100,
              duration: 0.35,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          }
          // Scrolling Up -> Reveal Header
          else if (currentScrollY < lastScrollYRef.current - 8) {
            gsap.to(headerRef.current, {
              yPercent: 0,
              duration: 0.35,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          }

          lastScrollYRef.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
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
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-silk select-none bg-[#FAF7F2]/90 backdrop-blur-[20px] border-b border-[#E8DFD5]/80 shadow-xs text-[#2A221E]'
      )}
    >
      <DesktopNav />
      <MobileNav />
    </header>
  );
};

Navbar.displayName = 'Navbar';
