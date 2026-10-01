import type { Metadata } from 'next';
import { bodoni, cormorant, inter } from '@/lib/fonts';
import { SITE_METADATA } from '@/lib/constants';
import { Navbar } from '@/features/navbar/Navbar';
import { Footer } from '@/features/footer/Footer';
import { SmoothScroll } from '@/components/common/SmoothScroll';
import { AuthProvider } from '@/features/account/AuthContext';
import { CartProvider } from '@/features/cart/CartContext';
import { FavoritesProvider } from '@/features/favorites/FavoritesContext';
import { SearchProvider } from '@/features/search/SearchContext';
import { SideCart } from '@/features/cart/SideCart';
import { SearchModal } from '@/features/search/SearchModal';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_METADATA.url),
  title: {
    default: `${SITE_METADATA.name} | ${SITE_METADATA.tagline}`,
    template: `%s | ${SITE_METADATA.name}`,
  },
  description: SITE_METADATA.description,
  keywords: [
    'ABHI-MOH',
    'Luxury Sarees',
    'Haute Couture Sarees',
    'Silk Sarees',
    'Kanjivaram Silk',
    'Chanderi Silk',
    'Indian Haute Couture',
    'The Essence of Elegance',
  ],
  authors: [{ name: 'ABHI-MOH Atelier' }],
  creator: 'ABHI-MOH',
  publisher: 'ABHI-MOH',
  openGraph: {
    title: `${SITE_METADATA.name} | ${SITE_METADATA.tagline}`,
    description: SITE_METADATA.description,
    url: SITE_METADATA.url,
    siteName: SITE_METADATA.name,
    locale: SITE_METADATA.locale,
    type: 'website',
    images: [
      {
        url: '/assets/sarees/saree-maroon.png',
        width: 1200,
        height: 630,
        alt: 'ABHI-MOH Haute Couture Sarees',
      },
    ],
  },
  icons: {
    icon: '/images/abhi-moh-monogram.png',
    shortcut: '/images/abhi-moh-monogram.png',
    apple: '/images/abhi-moh-monogram.png',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_METADATA.name} | ${SITE_METADATA.tagline}`,
    description: SITE_METADATA.description,
    images: ['/assets/sarees/saree-maroon.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bodoni.variable} ${cormorant.variable} ${inter.variable}`}
      style={{ colorScheme: 'light' }}
    >
      <body className="font-sans antialiased bg-[#FAF7F2] text-[#2A221E]">
        <AuthProvider>
          <CartProvider>
            <FavoritesProvider>
              <SearchProvider>
                <SmoothScroll>
                  <Navbar />
                  {children}
                  <Footer />
                  <SideCart />
                  <SearchModal />
                </SmoothScroll>
              </SearchProvider>
            </FavoritesProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
