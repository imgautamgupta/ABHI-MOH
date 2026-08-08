/**
 * Global Site Constants for ABHI-MOH Luxury Fashion Maison
 */

export const SITE_METADATA = {
  name: 'ABHI-MOH',
  tagline: 'Haute Couture & Luxury Fashion Maison',
  description: 'Experience the pinnacle of luxury fashion, handcrafted silhouettes, and timeless designs at ABHI-MOH.',
  url: 'https://abhi-moh.com',
  ogImage: '/assets/logo.png',
  locale: 'en_US',
  currency: 'USD',
  currencySymbol: '$',
};

export const ROUTES = {
  home: '/',
  collections: '/collections',
  lookbook: '/lookbook',
  cart: '/cart',
  checkout: '/checkout',
  account: '/account',
  api: {
    checkout: '/api/checkout',
    cart: '/api/cart',
  },
} as const;

export const NAVIGATION_LINKS = [
  { label: 'Collections', href: ROUTES.collections },
  { label: 'Lookbook', href: ROUTES.lookbook },
  { label: 'Maison', href: '#maison' },
  { label: 'Store Locator', href: '#stores' },
] as const;

export const FOOTER_LINKS = {
  explore: [
    { label: 'New Arrivals', href: '/collections/new' },
    { label: 'Haute Couture', href: '/collections/couture' },
    { label: 'Ready-to-Wear', href: '/collections/rtw' },
    { label: 'Accessories', href: '/collections/accessories' },
  ],
  services: [
    { label: 'Bespoke Appointments', href: '/bespoke' },
    { label: 'Private Salons', href: '/salons' },
    { label: 'Care & Alterations', href: '/care' },
    { label: 'Virtual Styling', href: '/styling' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Accessibility', href: '/accessibility' },
  ],
} as const;
