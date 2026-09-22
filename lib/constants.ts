/**
 * Global Site Constants for ABHI-MOH Luxury Fashion Maison
 */

/**
 * Centralised contact details.
 * ─────────────────────────────────────────────────────────────
 * IMPORTANT: Replace whatsapp with the real verified number
 * before making the WhatsApp channel publicly visible.
 * Keep whatsapp as null to hide the WhatsApp channel.
 * ─────────────────────────────────────────────────────────────
 */
export const CONTACT = {
  email: 'concierge@abhi-moh.com',
  /** Set to a verified Indian mobile number (e.g. '919812345678') to activate WhatsApp channel. */
  whatsapp: null as string | null,
} as const;

export const SITE_METADATA = {
  name: 'ABHI-MOH',
  tagline: 'Haute Couture Saree Maison',
  description: 'Experience the pinnacle of Indian luxury sarees, handcrafted Varanasi weaves, pure Kanjivaram silks, and royal heritage drapes at ABHI-MOH.',
  url: 'https://abhi-moh.com',
  ogImage: '/assets/sarees/saree-maroon.png',
  locale: 'en_IN',
  currency: 'INR',
  currencySymbol: '₹',
};

export const ROUTES = {
  home: '/',
  collections: '/collections',
  lookbook: '/lookbook',
  ourStory: '/our-story',
  contact: '/contact',
  shipping: '/shipping',
  returns: '/returns',
  privacy: '/privacy',
  terms: '/terms',
  cart: '/cart',
  checkout: '/checkout',
  account: '/account',
  api: {
    checkout: '/api/checkout',
    products: '/api/products',
  },
} as const;
