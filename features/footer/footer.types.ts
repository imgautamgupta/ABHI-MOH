import React from 'react';

export interface FooterSocialLink {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  isExternal?: boolean;
  /** When true, the link renders as non-clickable (placeholder until real URL is ready) */
  disabled?: boolean;
}

export interface FooterLegalLink {
  label: string;
  href: string;
}

export interface FooterTrustBadge {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
}
