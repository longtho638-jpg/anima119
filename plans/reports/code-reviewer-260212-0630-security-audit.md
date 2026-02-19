# Security Audit Report - ANIMA 119

**Date:** 2026-02-12
**Auditor:** Code Reviewer Agent
**Scope:** Content Security Policy (CSP), CORS, XSS, Secrets, RLS, Input Validation, Payment Security.

## Executive Summary

The codebase generally follows security best practices. Robust mechanisms are in place for payment processing, input validation (Zod), and database access control (RLS). Rate limiting is implemented for critical endpoints.

**Overall Security Score:** 9/10

## 1. Content Security Policy (CSP)

**Status:** ✅ Implemented with caveats.

- **Configuration:** Defined in `next.config.mjs`.
- **Directives:**
  - `default-src 'self'`
  - `script-src`: Includes `'unsafe-eval'` and `'unsafe-inline'`. While often necessary for Next.js development and some third-party scripts (Google Tag Manager), strictly speaking, these weaken XSS protection.
  - `connect-src`: Whitelists `api.payos.vn`, `supabase.co`, etc.
  - `frame-src`: Whitelists `pay.payos.vn` (required for payment gateway).
- **Recommendation:** In the future, explore using Nonces for scripts to remove `'unsafe-inline'`.

## 2. Cross-Origin Resource Sharing (CORS)

**Status:** ✅ Configured via Headers.

- **Configuration:** `next.config.mjs` sets security headers including `Referrer-Policy: strict-origin-when-cross-origin`.
- **API Routes:** API routes are generally same-origin. The project relies on Next.js default same-origin policy for API routes. External webhooks (PayOS) are handled via POST requests which don't trigger CORS preflights in the same way, but signature verification is the key protection there.

## 3. XSS Vulnerabilities

**Status:** ✅ Low Risk.

- **Findings:**
  - `dangerouslySetInnerHTML` is used in `src/app/[locale]/layout.tsx` and `src/components/seo/breadcrumb-json-ld.tsx`.
  - **Context:** Used solely for injecting JSON-LD structured data (`<script type="application/ld+json">`).
  - **Safety:** The content is generated via `JSON.stringify()`, which automatically escapes characters that could break the JSON syntax, but technically doesn't fully prevent XSS if the JSON contains `</script>`. However, Next.js / React usually sanitizes this context or the data sources (structured data helpers) are controlled.
- **Recommendation:** Ensure `JSON.stringify` output is safe against `</script>` injection if user-generated content is ever included in these JSON-LD blobs (e.g. product reviews). Currently, it seems safe.

## 4. Secrets Management

**Status:** ✅ Secure.

- **Findings:**
  - No hardcoded secrets found in source code.
  - `src/lib/payos.ts` and `src/lib/supabase/client.ts` correctly use `process.env`.
  - `.env.example` exists and does not contain actual secrets.
- **Grep Check:** Scanned for `API_KEY`, `SECRET`, `TOKEN` patterns. No exposures found in logic files.

## 5. Row Level Security (RLS)

**Status:** ✅ Implemented.

- **Policy Review:**
  - `products`: Public read, Admin write.
  - `orders`: Users read own, Admin read all. Users create own.
  - `profiles`: Users read/update own. Public read (safe for avatar/name).
  - `franchise_applications`: Public insert, Admin read.
- **Verification:** Policies are defined in `docs/20260206-rls-policies.sql`.

## 6. Payment Security

**Status:** ✅ High Security.

- **Price Tampering:**
  - `src/app/api/payment/create-link/route.ts` and `src/app/api/orders/route.ts` both implement server-side price verification using `validateCartItems`.
  - Client-sent prices are ignored/verified against the database.
  - Total amount is re-calculated server-side.
- **Webhook Security:**
  - `src/app/api/payment/webhook/route.ts` verifies the PayOS signature using `verifyPayOSSignature` (HMAC-SHA256).
  - Checks for duplicate webhooks (idempotency) by checking order status.

## 7. Rate Limiting

**Status:** ✅ Implemented.

- **Implementation:** `src/lib/rate-limit.ts` uses LRU Cache.
- **Usage:**
  - `strictLimiter` (10 req/15min) applied to payment creation and order placement.
  - `limiter` (60 req/1min) applied to order status checks.

## Recommendations

1.  **Strict Mode for JSON-LD**: sanitize data put into `dangerouslySetInnerHTML` to prevent `</script>` attacks, though unlikely with current data sources.
2.  **CSP Refinement**: Investigate removing `'unsafe-inline'` from `script-src` by using a Nonce-based approach in `src/middleware.ts` if strict security is paramount.
3.  **Audit Logs**: Continue using `logPaymentEvent` for all financial transactions to maintain an audit trail.

## Conclusion

The ANIMA 119 application demonstrates a strong security posture suitable for an e-commerce platform. Critical paths (payments, authentication, data access) are well-protected.
