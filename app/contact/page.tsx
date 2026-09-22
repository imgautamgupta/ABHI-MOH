import type { Metadata } from 'next';
import { ContactContent } from '@/features/contact/ContactContent';
import { SITE_METADATA } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Contact Atelier Concierge & Private Salons | ${SITE_METADATA.name}`,
  description:
    'Connect with the ABHI-MOH master couture concierge for bridal appointments, custom loom weaving, video styling sessions, and client care.',
  alternates: {
    canonical: `${SITE_METADATA.url}/contact`,
  },
  openGraph: {
    title: `Contact Atelier Concierge | ${SITE_METADATA.name}`,
    description:
      'Connect with the ABHI-MOH master couture concierge for bridal appointments, custom loom weaving, and client care.',
    url: `${SITE_METADATA.url}/contact`,
    siteName: SITE_METADATA.name,
    locale: SITE_METADATA.locale,
    type: 'website',
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
