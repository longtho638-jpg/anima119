# Security Audit Report - Anima119

**Date:** 2026-02-12
**Scope:** `src/` directory, configuration files
**Focus:** CSP, XSS, Secrets

## 1. Security Headers (CSP, HSTS, etc.)
**Status:** ✅ **Implemented Strong**

Security headers are centrally configured in `next.config.mjs`.

- **Content-Security-Policy (CSP)**:
  - `default-src 'self'`
  - `script-src`: Allows specific trusted domains (`vercel.live`, `googletagmanager.com`) and `'unsafe-inline'` (necessary for Next.js hydration/analytics, though stricter is better if possible).
  - `connect-src`: Whitelists Supabase, Vercel, PayOS, and Google Analytics.
  - `frame-src`: Whitelists PayOS (required for payment iframe/redirects).
- **HSTS**: `max-age=63072000; includeSubDomains; preload` (Strict Transport Security enabled for 2 years).
- **X-Frame-Options**: `DENY` (Prevents clickjacking).
- **X-Content-Type-Options**: `nosniff`.
- **Referrer-Policy**: `strict-origin-when-cross-origin`.
- **Permissions-Policy**: Restricts camera, microphone, geolocation.

**Observation:** The configuration is robust and follows best practices for a Next.js commerce application.

## 2. Cross-Site Scripting (XSS)
**Status:** ✅ **Controlled**

`dangerouslySetInnerHTML` is used in **3 locations**, all related to SEO (JSON-LD structured data injection).

**Locations:**
1. `src/app/[locale]/layout.tsx` (Organization & Website JSON-LD)
2. `src/components/seo/breadcrumb-json-ld.tsx` (Breadcrumb JSON-LD)

**Analysis:**
- **Usage Pattern:** `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />`
- **Risk Level:** **Low**. The content is strictly JSON serialized data. The data sources (`structured-data.ts`) rely on static config (`SEO_CONFIG`) and product data. As long as `JSON.stringify` is used, the risk of XSS execution via these blocks is minimal in modern React/Next.js environments.

## 3. Hardcoded Secrets
**Status:** ✅ **Clean**

No hardcoded API keys, tokens, or passwords were found in the source code.

- **Environment Variables:** The application correctly uses `process.env` for sensitive values:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`

**Note on Webhook Logic (`src/app/api/payment/webhook/route.ts`):**
The Supabase client initialization uses a fallback:
```typescript
process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
```
While not a hardcoded secret, ensure `SUPABASE_SERVICE_ROLE_KEY` is set in the production environment. If missing, the webhook will run with Anon privileges, which might cause database updates to fail if Row Level Security (RLS) policies don't permit anonymous updates to the `orders` table.

## 4. Other Security Findings
- **Payment Webhooks:** `src/app/api/payment/webhook/route.ts` correctly verifies PayOS webhook signatures (`payOS.webhooks.verify(body)`) before processing, preventing replay attacks or forged requests.
- **Middleware:** `src/middleware.ts` handles auth session refreshing (`updateSession`) and internationalization routing standardly.

## Recommendations
1. **Verify Environment Variables:** Ensure `SUPABASE_SERVICE_ROLE_KEY` is defined in the production Vercel/environment settings to ensure the payment webhook functions correctly.
2. **CSP Monitoring:** Continue monitoring CSP reports (if reporting is enabled) to ensure no legitimate scripts (like new marketing pixels) are blocked.
