import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18n } from '@/i18n.config';
export function middleware(request: NextRequest) {
	const pathname = request.nextUrl.pathname;
	const pathnameIsMissingLocale = i18n.locales.every(
		(locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
	);

	if (pathnameIsMissingLocale) {
		const locale = 'az';
		if (locale === i18n.defaultLocale) {
			return NextResponse.rewrite(new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url));
		}
		return NextResponse.redirect(new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url));
	}
}

export const config = {
	// Matcher ignoring `/_next/` and `/api/`
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
