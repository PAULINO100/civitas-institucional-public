import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale, type Locale } from "@/i18n/getDictionary";

function getLocale(request: NextRequest): Locale {
  const acceptLanguage = request.headers.get("accept-language") ?? "";
  for (const locale of locales) {
    if (acceptLanguage.toLowerCase().includes(locale)) {
      return locale;
    }
  }
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if pathname already has a supported locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  // Skip for static files and api routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Redirect to detected locale
  const locale = getLocale(request);
  return NextResponse.redirect(
    new URL(`/${locale}${pathname === "/" ? "" : pathname}`, request.url)
  );
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
