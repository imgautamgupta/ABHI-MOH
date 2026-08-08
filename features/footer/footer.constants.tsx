import React from 'react';
import { Mail } from 'lucide-react';
import { FooterSocialLink, FooterLegalLink } from './footer.types';

// Custom Monochrome Brand SVGs for luxury consistency
const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const PinterestIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
    <circle cx="12" cy="12" r="9" />
  </svg>
);

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const EmailIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Mail className={className} />
);

export const FOOTER_COPY = {
  stayConnected: 'Stay Connected',
  brandName: 'ABHI-MOH',
  tagline: 'The Essence of Elegance',
  copyright: '© 2026 ABHI-MOH. All Rights Reserved.',
  brandColor: '#6B0F1A',
};

export const FOOTER_LEFT_SOCIALS: FooterSocialLink[] = [
  { label: 'Instagram', href: 'https://instagram.com', icon: InstagramIcon },
  { label: 'Pinterest', href: 'https://pinterest.com', icon: PinterestIcon },
];

export const FOOTER_RIGHT_SOCIALS: FooterSocialLink[] = [
  { label: 'WhatsApp', href: 'https://whatsapp.com', icon: WhatsAppIcon },
  { label: 'Email', href: 'mailto:concierge@abhi-moh.com', icon: EmailIcon },
];

export const FOOTER_LEGAL_LINKS: FooterLegalLink[] = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms & Conditions', href: '/terms' },
];
