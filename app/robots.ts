import { MetadataRoute } from 'next';
import { SITE_METADATA } from '@/lib/constants';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/account/',
        '/checkout/',
      ],
    },
    sitemap: `${SITE_METADATA.url}/sitemap.xml`,
  };
}
