'use client';

import React from 'react';
import { ReactLenis } from 'lenis/react';

export interface SmoothScrollProps {
  children: React.ReactNode;
}

export const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.2, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
};

SmoothScroll.displayName = 'SmoothScroll';
