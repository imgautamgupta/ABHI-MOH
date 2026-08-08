import { Variants, Transition } from 'framer-motion';

/**
 * Single Source of Truth Animation and Transition Tokens for ABHI-MOH
 * Everything is designed with silk-like, no-bounce, premium easing curve logic.
 */

// Premium Easing Curves
export const EASING_SILK = [0.25, 1, 0.5, 1] as [number, number, number, number]; // Smooth luxury curve
export const EASING_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number]; // High-end deceleration curve

// Reusable Transitions
export const TRANSITION_FAST: Transition = {
  type: 'tween',
  ease: EASING_SILK,
  duration: 0.15,
};

export const TRANSITION_NORMAL: Transition = {
  type: 'tween',
  ease: EASING_SILK,
  duration: 0.3,
};

export const TRANSITION_SLOW: Transition = {
  type: 'tween',
  ease: EASING_SILK,
  duration: 0.5,
};

export const TRANSITION_LUXURY: Transition = {
  type: 'tween',
  ease: EASING_EXPO,
  duration: 0.8,
};

export const TRANSITION_SILK: Transition = {
  type: 'tween',
  ease: EASING_SILK,
  duration: 1.0,
};

/**
 * Standardized Framer Motion Page & Element Variants
 */

// Elegant Fade
export const FADE_IN_VARIANTS: Variants = {
  hidden: { opacity: 0 },
  visible: (customTransition?: Transition) => ({
    opacity: 1,
    transition: customTransition || TRANSITION_NORMAL,
  }),
};

// Premium Slide & Fade Up (Standard Editorial Reveal)
export const REVEAL_UP_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (customTransition?: Transition) => ({
    opacity: 1,
    y: 0,
    transition: customTransition || TRANSITION_LUXURY,
  }),
};

// Slide & Fade Down (e.g. Nav dropdowns)
export const REVEAL_DOWN_VARIANTS: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: (customTransition?: Transition) => ({
    opacity: 1,
    y: 0,
    transition: customTransition || TRANSITION_NORMAL,
  }),
};

// Soft Scale Reveal (e.g. Image popups, modals)
export const SCALE_REVEAL_VARIANTS: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: (customTransition?: Transition) => ({
    opacity: 1,
    scale: 1,
    transition: customTransition || TRANSITION_LUXURY,
  }),
};

// Staggered Container for Grid Items
export const STAGGER_CONTAINER_VARIANTS: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

/**
 * GSAP Helper Curves
 */
export const GSAP_EASE_SILK = 'cubic-bezier(0.25, 1, 0.5, 1)';
export const GSAP_EASE_EXPO = 'cubic-bezier(0.16, 1, 0.3, 1)';
