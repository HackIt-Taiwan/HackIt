import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

// Supported locales.
const locales = ['zh-TW', 'en'];
// Default locale.
export const defaultLocale = 'zh-TW';

// Resolve the preferred locale from cookies/headers.
function getLocale(request: NextRequest): string {
  // Negotiator expects plain headers, so normalize NextRequest headers first.
  const headers = new Headers(request.headers);
  const acceptLanguageHeader = headers.get('accept-language');
  if (acceptLanguageHeader) {
    headers.set('accept-language', acceptLanguageHeader.replace(/_/g, '-'));
  }

  const headersObject: Record<string, string> = {};
  headers.forEach((value, key) => {
    headersObject[key] = value;
  });

  // Use negotiator to determine the best match.
  const negotiator = new Negotiator({ headers: headersObject });
  try {
    // Prefer saved locale from cookies when available.
    const savedLocale = request.cookies.get('locale')?.value;
    if (savedLocale && locales.includes(savedLocale)) {
      return savedLocale;
    }
    
    // Otherwise match browser preferences.
    return matchLocale(negotiator.languages(), locales, defaultLocale);
  } catch (error) {
    // Fallback to default on any parsing failure.
    return defaultLocale;
  }
}

// Paths that skip locale redirects.
const publicRoutes = [
  '/images',
  '/fonts',
  '/favicon.ico',
  '/api'
];

// Middleware entry point.
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Skip public routes.
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }
  
  // Check whether the path already includes a locale prefix.
  const pathnameLocale = locales.find(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  const pathnameHasLocale = Boolean(pathnameLocale);
  
  // If a locale prefix exists, sync the cookie and continue.
  if (pathnameHasLocale) {
    const response = NextResponse.next();
    const savedLocale = request.cookies.get('locale')?.value;
    if (pathnameLocale && savedLocale !== pathnameLocale) {
      response.cookies.set('locale', pathnameLocale, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365, // 1 year
        sameSite: 'lax',
      });
    }
    return response;
  }
  
  // Resolve the preferred locale.
  const locale = getLocale(request);
  
  // Redirect to the localized path and update the cookie.
  const newUrl = new URL(`/${locale}${pathname.startsWith('/') ? pathname : `/${pathname}`}`, request.url);
  const response = NextResponse.redirect(newUrl);
  const savedLocale = request.cookies.get('locale')?.value;
  if (savedLocale !== locale) {
    response.cookies.set('locale', locale, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: 'lax',
    });
  }
  return response;
}

// Apply to all routes except static assets and APIs.
export const config = {
  matcher: [
    // Exclude public assets.
    '/((?!api|_next/static|_next/image|images|favicon.ico).*)',
  ],
};
