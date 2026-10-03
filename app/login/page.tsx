import { Suspense } from 'react';
import type { Metadata } from 'next';
import { LoginPage } from '@/features/auth/LoginPage';
import { SITE_METADATA } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Client Dossier & Access | ${SITE_METADATA.name}`,
  description:
    'Enter your private ABHI-MOH haute couture dossier to view bespoke commissions, order tracking, and private saree viewings.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#D9C7A7] border-t-[#7D2130] animate-spin" />
        </div>
      }
    >
      <LoginPage />
    </Suspense>
  );
}
