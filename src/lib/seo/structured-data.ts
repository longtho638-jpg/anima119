/**
 * Structured Data (JSON-LD) Generators
 * WOW Protocol: Rich Snippets for Search Engines
 */

import { SEO_CONFIG } from '../seo-constants';

export interface Product {
  name: { vi: string; en: string };
  description: { vi: string; en: string };
  image_url: string;
  price: number;
  slug: string;
}

export function generateProductJsonLd(product: Product, locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name[locale as 'vi' | 'en'],
    description: product.description[locale as 'vi' | 'en'],
    image: product.image_url,
    brand: {
      '@type': 'Brand',
      name: 'ANIMA 119',
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'VND',
      availability: 'https://schema.org/InStock',
      url: `${SEO_CONFIG.siteUrl}/${locale}/products/${product.slug}`,
    },
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
      telephone: '+84-988-030-204',
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
