import type { Metadata } from 'next';
import { Checkout } from '@/features/checkout/Checkout';
import { SITE_METADATA } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Checkout | ${SITE_METADATA.name}`,
  description: 'Complete your luxury saree purchase with ABHI-MOH concierge checkout.',
};

export default function Page() {
  return <Checkout />;
}
