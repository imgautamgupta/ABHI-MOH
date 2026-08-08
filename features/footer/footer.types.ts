import React from 'react';

export interface FooterSocialLink {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface FooterLegalLink {
  label: string;
  href: string;
}
