import createMiddleware from 'next-intl/middleware';
import { type NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

interface CookieToSet {
  name: string;
  value: string;
  options?: Record<string, unknown>;
}

/**
 * No protected routes for ANIMA 119 (pure e-commerce).
 */
function isProtectedRoute(_pathname: string): boolean {
  return false;
}

export async function middleware(request: NextRequest) {
  // 1. Run intl middleware first to handle routing
  const response = intlMiddleware(request as NextRequest);

  // 2. Setup Supabase to check/refresh session
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseKey) {
    const supabase = createServerClient(
      supabaseUrl,
      supabaseKey,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet: CookieToSet[]) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            );
            // Set cookies on the response object from next-intl
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    // 3. Refresh session and get user
    const { data: { user } } = await supabase.auth.getUser();

    // 4. Protect authenticated routes
    if (isProtectedRoute(request.nextUrl.pathname) && !user) {
      const locale = request.nextUrl.pathname.match(/^\/(vi|en)/)?.[1] || 'vi';
      const loginUrl = new URL(`/${locale}`, request.url);
      loginUrl.searchParams.set('auth', 'required');
      return NextResponse.redirect(loginUrl);
    }
  } else {
    console.error('Missing Supabase environment variables in middleware');
  }

  // 5. Add security headers to API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('Cache-Control', 'no-store, max-age=0');
  }

  return response;
}

export const config = {
  // Match internationalized pathnames and API routes
  matcher: ['/', '/(vi|en)/:path*', '/api/:path*'],
};
