import { Variants } from 'framer-motion';

export const EASING_LUXURY_DRAWER = [0.25, 1, 0.5, 1] as [number, number, number, number];

// Right-Side Slide-Over Drawer Variant (350ms, Luxury Easing)
export const DRAWER_SLIDE_VARIANTS: Variants = {
  initial: {
    x: '100%',
  },
  animate: {
    x: 0,
    transition: {
      duration: 0.35,
      ease: EASING_LUXURY_DRAWER,
    },
  },
  exit: {
    x: '100%',
    transition: {
      duration: 0.35,
      ease: EASING_LUXURY_DRAWER,
    },
  },
};

// Dark Backdrop Fade (300ms)
export const BACKDROP_FADE_VARIANTS: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
};

// Quantity Scale Bounce/Pop (200ms)
export const QUANTITY_POP_VARIANTS: Variants = {
  idle: { scale: 1 },
  pop: {
    scale: [1, 1.15, 1],
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
};

export const CART_ITEM_ANIMATION: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: EASING_LUXURY_DRAWER,
    },
  },
  exit: {
    opacity: 0,
    x: 30,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
};
