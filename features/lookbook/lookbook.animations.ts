import { Variants } from 'framer-motion';
import { EASING_SILK } from '@/lib/animations';

// Hardcover Book Opening Variant (1.2s, 3D Rotation along left spine axis)
export const BOOK_COVER_VARIANTS: Variants = {
  closed: {
    rotateY: 0,
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.9)',
  },
  open: {
    rotateY: -175,
    boxShadow: '-20px 25px 50px -12px rgba(0, 0, 0, 0.95)',
    transition: {
      duration: 1.2,
      ease: EASING_SILK,
    },
  },
};

// 3D Page Flip Variant (0.8s spread rotation)
export const PAGE_FLIP_VARIANTS: Variants = {
  initial: {
    rotateY: 0,
  },
  flipped: {
    rotateY: -180,
    transition: {
      duration: 0.8,
      ease: EASING_SILK,
    },
  },
};

// Editorial Content Fade In
export const EDITORIAL_FADE: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: EASING_SILK,
    },
  },
};
