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
    return { title: `Product Not Found | ${SITE_METADATA.name}` };
  }

  return {
    title: `${product.name} | ${SITE_METADATA.name}`,
    description: product.material,
    openGraph: {
      title: product.name,
      description: product.material,
      images: product.images[0] ? [{ url: product.images[0] }] : [],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  return <ProductDetailPage product={product} />;
}
