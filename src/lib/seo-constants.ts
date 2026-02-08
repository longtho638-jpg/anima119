/**
 * SEO Configuration Constants for ANIMA 119
 */

export const SEO_CONFIG = {
  siteName: {
    vi: 'ANIMA 119 - Đông Y Lên Men Hàn Quốc',
    en: 'ANIMA 119 - Korean Fermented Oriental Medicine',
  },
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://anima119.com',
  defaultLocale: 'vi',
  locales: ['vi', 'en'] as const,
  ogImage: '/images/og-default.jpg',
  twitterHandle: '@anima119_vn',
  facebookAppId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
} as const;

export function getAlternateLinks(path: string) {
  return SEO_CONFIG.locales.map(locale => ({
    hrefLang: locale,
    href: `${SEO_CONFIG.siteUrl}/${locale}${path}`,
  }));
}
