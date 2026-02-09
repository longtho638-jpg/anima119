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

/** Route name mappings for breadcrumb generation */
const ROUTE_NAMES: Record<string, { vi: string; en: string }> = {
  'san-pham': { vi: 'Sản Phẩm', en: 'Products' },
  'khoa-hoc': { vi: 'Khoa Học', en: 'Science' },
  'nguon-goc': { vi: 'Nguồn Gốc', en: 'Origin' },
  'mua-hang': { vi: 'Mua Hàng', en: 'Purchase' },
  'lien-he': { vi: 'Liên Hệ', en: 'Contact' },
  'tin-tuc': { vi: 'Tin Tức', en: 'News' },
};

export function generateBreadcrumbJsonLd(path: string, locale: string) {
  const segments = path.split('/').filter(Boolean);
  const items = [
    {
      '@type': 'ListItem' as const,
      position: 1,
      name: 'ANIMA 119',
      item: `${SEO_CONFIG.siteUrl}/${locale}`,
    },
  ];

  let currentPath = `/${locale}`;
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    const routeName = ROUTE_NAMES[segment];
    if (routeName) {
      currentPath += `/${segment}`;
      items.push({
        '@type': 'ListItem' as const,
        position: i + 2,
        name: routeName[locale as 'vi' | 'en'] || routeName.vi,
        item: `${SEO_CONFIG.siteUrl}${currentPath}`,
      });
    }
  }

  // Only return breadcrumb if there's more than home
  if (items.length <= 1) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };
}
