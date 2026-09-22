import React from 'react';
import { FooterSocialLink, FooterLegalLink, FooterTrustBadge } from './footer.types';
import { CONTACT } from '@/lib/constants';

// ==========================================
// LUXURY MONOCHROME BRAND & SOCIAL ICONS
// ==========================================

export const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export const ThreadsIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12.186 24C5.454 24 0 18.648 0 12.032 0 5.417 5.454.065 12.186.065c6.682 0 12.134 5.302 12.186 11.867v.478c0 3.731-2.073 6.074-4.887 6.074-1.636 0-3.08-.857-3.606-2.186-.889 1.455-2.28 2.236-4.043 2.236-3.084 0-5.184-2.316-5.184-5.46 0-3.488 2.502-5.918 6.136-5.918 1.436 0 2.766.417 3.86 1.213V7.935c-.88-.27-1.897-.42-2.997-.42-5.183 0-9.284 3.774-9.284 8.783 0 5.06 4.148 8.874 9.284 8.874 4.093 0 7.42-2.457 8.28-6.108l2.678.718C23.36 21.05 18.257 24 12.186 24zm-.195-8.874c1.554 0 2.76-1.127 2.76-2.585 0-1.48-1.206-2.585-2.76-2.585-1.577 0-2.806 1.105-2.806 2.585 0 1.458 1.229 2.585 2.806 2.585z" />
  </svg>
);

export const WhatsAppIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    <path d="M9.5 9.5c.2-.4.4-.5.7-.5.2 0 .4.1.5.3.3.4.7 1.2.7 1.4 0 .2-.1.3-.3.5l-.3.3c-.1.2-.2.3 0 .6.3.4.6.8 1 1.1.4.3.8.6 1.2.7.2.1.4 0 .5-.2l.4-.4c.2-.2.3-.2.5-.1.2.1 1.2.6 1.4.7.2.1.2.2.2.4 0 .3-.3 1-.8 1.2-.5.2-1.1.3-1.8 0-1.5-.6-2.8-1.8-3.5-3.3-.6-.7-.6-1.3-.3-1.8.2-.3.6-.6.8-.8z" strokeWidth="1.2" fill="currentColor" />
  </svg>
);

export const EmailIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="2" y="4" width="20" height="16" rx="3" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

export const FacebookIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export const YouTubeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
  </svg>
);

// ==========================================
// TRUST INDICATOR ICONS
// ==========================================

export const SecureLockIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    <circle cx="12" cy="16" r="1" fill="currentColor" />
  </svg>
);

export const AuthenticBadgeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const IndiaDeliveryIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="1" y="3" width="15" height="13" />
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

export const SupportConciergeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
  </svg>
);

// ==========================================
// FOOTER COPY & CONSTANTS
// ==========================================

export const FOOTER_COPY = {
  atelierBadge: 'ROYAL HERITAGE ATELIER',
  brandName: 'ABHI-MOH',
  tagline: 'The Essence of Elegance',
  subtitleLine1: 'Crafted with heritage.',
  subtitleLine2: 'Designed for timeless elegance.',
  copyright: '© 2026 ABHI-MOH. All Rights Reserved.',
  brandColor: '#7D2130',
  accentColor: '#D9C7A7',
};

// ==========================================
// ACTIVE SOCIAL LINKS
// Configured to easily add future social platforms (WhatsApp, Facebook, YouTube, etc.)
// ==========================================

export const FOOTER_SOCIAL_LINKS: FooterSocialLink[] = [
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/abhimoh.ethnic',
    icon: InstagramIcon,
    isExternal: true,
  },
  {
    id: 'threads',
    label: 'Threads',
    href: 'https://www.threads.net/@abhimoh.ethnic',
    icon: ThreadsIcon,
    isExternal: true,
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    href: CONTACT.whatsapp ? `https://wa.me/${CONTACT.whatsapp}` : 'https://wa.me',
    icon: WhatsAppIcon,
    isExternal: true,
  },
  {
    id: 'email',
    label: 'Email',
    href: `mailto:${CONTACT.email}`,
    icon: EmailIcon,
    isExternal: false,
  },
];

// For split layouts if needed
export const FOOTER_LEFT_SOCIALS: FooterSocialLink[] = FOOTER_SOCIAL_LINKS.slice(0, 2);
export const FOOTER_RIGHT_SOCIALS: FooterSocialLink[] = FOOTER_SOCIAL_LINKS.slice(2);

// ==========================================
// VERIFIED ATELIER TRUST INDICATORS
// True, verified claims representing real atelier service
// ==========================================

export const FOOTER_TRUST_BADGES: FooterTrustBadge[] = [
  {
    id: 'authentic',
    title: 'Authentic Handcraft',
    subtitle: 'Pure Silk & Natural Zari, Weaver-Verified',
    icon: AuthenticBadgeIcon,
  },
  {
    id: 'delivery',
    title: 'India-Wide Delivery',
    subtitle: 'Complimentary Insured Express Shipping',
    icon: IndiaDeliveryIcon,
  },
  {
    id: 'secure',
    title: 'Secure Checkout',
    subtitle: 'Safe & Encrypted Online Ordering',
    icon: SecureLockIcon,
  },
  {
    id: 'support',
    title: 'Concierge Support',
    subtitle: 'Dedicated Atelier Client Desk',
    icon: SupportConciergeIcon,
  },
];

// ==========================================
// AUDITED POLICY & CONTACT LINKS (NO 404s)
// ==========================================

export const FOOTER_LEGAL_LINKS: FooterLegalLink[] = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Shipping Policy', href: '/shipping' },
  { label: 'Returns & Exchange', href: '/returns' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Contact', href: '/contact' },
];
