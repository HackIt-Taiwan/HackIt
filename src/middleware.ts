import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

// 支持的語言列表
const locales = ['zh-TW', 'en'];
// 預設語言
export const defaultLocale = 'zh-TW';

// 獲取客戶端偏好語言
function getLocale(request: NextRequest): string {
  // 協商器需要 headers，但 NextRequest 的 headers 不是標準格式
  // 所以我們需要轉換格式
  const headers = new Headers(request.headers);
  const acceptLanguageHeader = headers.get('accept-language');
  if (acceptLanguageHeader) {
    headers.set('accept-language', acceptLanguageHeader.replace(/_/g, '-'));
  }

  const headersObject: Record<string, string> = {};
  headers.forEach((value, key) => {
    headersObject[key] = value;
  });

  // 使用協商器獲取偏好語言
  const negotiator = new Negotiator({ headers: headersObject });
  try {
    // 如果用戶已保存語言偏好，則使用保存的語言
    const savedLocale = request.cookies.get('locale')?.value;
    if (savedLocale && locales.includes(savedLocale)) {
      return savedLocale;
    }
    
    // 否則匹配瀏覽器偏好語言
    return matchLocale(negotiator.languages(), locales, defaultLocale);
  } catch (error) {
    // 匹配失敗使用預設語言
    return defaultLocale;
  }
}

// 不需要重定向的路徑
const publicRoutes = [
  '/images',
  '/fonts',
  '/favicon.ico',
  '/api'
];

// 中間件函數
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // 檢查是否為公共路徑
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }
  
  // 檢查當前路徑是否已有支持的語言前綴
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  
  // 如果已有語言前綴，直接返回
  if (pathnameHasLocale) {
    return NextResponse.next();
  }
  
  // 獲取用戶偏好語言
  const locale = getLocale(request);
  
  // 重定向到帶有語言前綴的路徑
  const newUrl = new URL(`/${locale}${pathname.startsWith('/') ? pathname : `/${pathname}`}`, request.url);
  return NextResponse.redirect(newUrl);
}

// 符合所有路徑
export const config = {
  matcher: [
    // 排除公共資源路徑
    '/((?!api|_next/static|_next/image|images|favicon.ico).*)',
  ],
}; 