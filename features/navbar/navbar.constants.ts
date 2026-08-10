import { NavItem, SocialLink } from './navbar.types';

export const DESKTOP_LEFT_LINKS: NavItem[] = [
  { label: 'Collections', href: '/collections' },
  { label: 'Lookbook', href: '/lookbook' },
  { label: 'Our Story', href: '/our-story' },
];



export const MOBILE_DRAWER_LINKS: NavItem[] = [
  { label: 'Collections', href: '/collections' },
  { label: 'Lookbook', href: '/lookbook' },
  { label: 'Our Story', href: '/our-story' },
  { label: 'Favorites', href: '/favorites' },
  { label: 'Search', href: '#search' },
  { label: 'Account', href: '/account' },
];

export const MOBILE_SOCIAL_LINKS: SocialLink[] = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'WhatsApp', href: 'https://whatsapp.com' },
  { label: 'Email', href: 'mailto:concierge@abhi-moh.com' },
];

export const BRAND_MAROON = '#7A1C28';

export const NAVBAR_HEIGHTS = {
  desktop: '88px',
  tablet: '80px',
  mobile: '72px',
} as const;
