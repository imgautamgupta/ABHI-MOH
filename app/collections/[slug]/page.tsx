import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/lib/product.service';
import { ProductDetailPage } from '@/features/collections/ProductDetailPage';
import { SITE_METADATA } from '@/lib/constants';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: `Piece Not Found | ${SITE_METADATA.name}`,
      robots: { index: false, follow: false },
    };
  }

  const metaDescription =
    product.plainDescription ||
    product.material ||
    `${product.name} — Handcrafted luxury saree by ${SITE_METADATA.name}.`;

  const canonicalUrl = `${SITE_METADATA.url}/collections/${slug}`;
  const mainImage = product.images[0] || SITE_METADATA.ogImage;

  return {
    title: `${product.name} | Handcrafted Luxury Saree | ${SITE_METADATA.name}`,
    description: metaDescription.slice(0, 160),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${product.name} | ${SITE_METADATA.name}`,
      description: metaDescription.slice(0, 160),
      url: canonicalUrl,
      siteName: SITE_METADATA.name,
      locale: SITE_METADATA.locale,
      type: 'article',
      images: [
        {
          url: mainImage,
          width: 1200,
          height: 1600,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | ${SITE_METADATA.name}`,
      description: metaDescription.slice(0, 160),
      images: [mainImage],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const canonicalUrl = `${SITE_METADATA.url}/collections/${slug}`;

  // Schema.org Product Structured Data (JSON-LD)
  const productSchema = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    image: product.images,
    description: product.plainDescription || product.description,
    brand: {
      '@type': 'Brand',
      name: 'ABHI-MOH',
    },
    offers: {
      '@type': 'Offer',
      url: canonicalUrl,
      priceCurrency: 'INR',
      price: product.priceNumber,
      availability:
        product.inStock !== false
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: 'ABHI-MOH Atelier',
      },
    },
    category: product.category || 'Luxury Saree',
    material: product.material,
    countryOfOrigin: {
      '@type': 'Country',
      name: 'India',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <ProductDetailPage product={product} />
    </>
  );
}
