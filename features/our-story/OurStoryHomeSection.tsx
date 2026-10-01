'use client';

import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { OurStoryHomeFallback } from './OurStoryHomeFallback';
import { isWebGLAvailable } from './OurStoryHomeSectionInner';

// ─────────────────────────────────────────────────────────────────────────────
// OUR STORY — PUBLIC WRAPPER
//
// Handles:
//   1. WebGL availability check (server-safe)
//   2. Reduced-motion preference
//   3. Dynamic import of the Three.js inner component (no SSR)
//   4. Graceful CSS/editorial fallback
// ─────────────────────────────────────────────────────────────────────────────

const OurStoryHomeSectionInner = dynamic(
  () =>
    import('./OurStoryHomeSectionInner').then(
      (mod) => mod.OurStoryHomeSectionInner
    ),
  { ssr: false, loading: () => <LoadingShell /> }
);

function LoadingShell() {
  return (
    <div
      className="w-full flex items-center justify-center"
      style={{ height: '100vh', background: '#F0E8DC' }}
      aria-hidden="true"
    />
  );
}

export function OurStoryHomeSection() {
  const [ready, setReady]           = useState(false);
  const [hasWebGL, setHasWebGL]     = useState(false);
  const [reducedMotion, setReduced] = useState(false);

  useEffect(() => {
    const supported = isWebGLAvailable();
    setHasWebGL(supported);
    setReduced(
      typeof window !== 'undefined'
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false
    );
    setReady(true);
  }, []);

  if (!ready) return <LoadingShell />;
  if (!hasWebGL || reducedMotion) return <OurStoryHomeFallback />;
  return <OurStoryHomeSectionInner />;
}
