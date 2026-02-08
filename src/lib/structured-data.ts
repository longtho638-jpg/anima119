import { Product } from '@/types/product';
import { SEO_CONFIG } from './seo-constants';

export function generateProductJsonLd(product: Product, locale: string) {
  const name = typeof product.name === 'string' ? product.name : product.name[locale as 'vi' | 'en'] || product.name.vi;
  const description = typeof product.description === 'string' ? product.description : product.description[locale as 'vi' | 'en'] || product.description.vi;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image: product.image_url,
    brand: {
      '@type': 'Brand',
      name: 'ANIMA 119',
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'VND',
      availability: product.in_stock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: `${SEO_CONFIG.siteUrl}/${locale}/san-pham/${product.slug}`,
    },
    // Mock rating for now, connect to real reviews later
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '127',
    },
  };
}

export function generateOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ANIMA 119',
    url: SEO_CONFIG.siteUrl,
    logo: `${SEO_CONFIG.siteUrl}/images/logo.png`,
    sameAs: [
      'https://facebook.com/anima119.vn',
      'https://instagram.com/anima119.vn',
      SEO_CONFIG.twitterHandle,
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'contact@anima119.com',
      contactType: 'Customer Service',
      areaServed: ['VN'],
      availableLanguage: ['Vietnamese', 'English'],
    },
  };
}

export function generateWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ANIMA 119',
    url: SEO_CONFIG.siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SEO_CONFIG.siteUrl}/san-pham?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}
