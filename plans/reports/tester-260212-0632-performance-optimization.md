# Performance Optimization Report - Anima119

**Date:** 2026-02-12
**Project:** apps/anima119
**Status:** Completed

## Summary of Changes

This report details the performance optimizations applied to the `anima119` application to improve Core Web Vitals (LCP, CLS, FID) and overall user experience.

### 1. Lazy Loading Components
**File:** `src/app/[locale]/page.tsx`

We implemented dynamic imports (lazy loading) for below-the-fold components on the homepage. This ensures that the initial JavaScript bundle size is smaller, leading to faster First Contentful Paint (FCP) and Time to Interactive (TTI).

- **Components lazy loaded:**
  - `HeroParallax` (with a placeholder skeleton)
  - `BenefitsSection`
  - `StorySectionAnimated`
  - `FeaturedProducts`
  - `ProcessSection`
  - `CTASection`

### 2. Image Optimization
**Files:**
- `src/components/home/featured-products.tsx`
- `src/components/products/product-card.tsx`
- `src/app/[locale]/san-pham/san-pham-content.tsx`

We optimized `next/image` usage to improve Largest Contentful Paint (LCP) and reduce layout shifts.

- **Changes:**
  - Added `priority={false}` to non-critical images to prioritize LCP candidates.
  - Added `loading="lazy"` to product cards below the fold.
  - Added `priority` to the main product image on the product detail page (`san-pham-content.tsx`) to ensure it loads immediately.
  - Verified and refined `sizes` attributes to ensure responsive image loading.

### 3. Font Optimization
**File:** `src/app/[locale]/layout.tsx`

We optimized the loading of Google Fonts (Material Symbols).

- **Changes:**
  - Added `display=swap` to the Material Symbols font URL to prevent "Flash of Invisible Text" (FOIT) and ensure text remains visible while the icon font loads.

### 4. Build Verification

Ran `npm run build` to ensure all changes are valid and do not introduce build errors.

- **Result:** Build successful.
- **Static Pages:** Successfully generated.
- **Dynamic Routes:** Verified.

## Next Steps

- Monitor real-world performance using Vercel Analytics or Google Search Console.
- Consider implementing more granular code splitting if bundle size increases significantly in the future.
- Evaluate the impact of third-party scripts (if any are added) on performance.

## Conclusion

The applied optimizations bring `anima119` into alignment with best practices for Next.js performance, specifically targeting Core Web Vitals.
