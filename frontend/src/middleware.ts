import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

const publicRoutes = [
	"/",
	"/login",
	"/register",
	"/forgot-password",
	"/reset-password",
	"/verify-email/:token",
	"/business",
	"/business/:id",
	"/categories",
	"/categories/:id",
	"/about",
	"/how-it-works",
];

const protectedRoutes = {
	"/dashboard": ["BUSINESS", "ADMIN"],
	"/profile": ["USER", "BUSINESS", "ADMIN"],
	"/business/profile": ["BUSINESS", "ADMIN"],
	"/business/dashboard": ["BUSINESS", "ADMIN"],
	"/business/jobs": ["BUSINESS", "ADMIN"],
	"/business/services": ["BUSINESS", "ADMIN"],
	"/business/appointments": ["BUSINESS", "ADMIN"],
	"/business/settings": ["BUSINESS", "ADMIN"],
};

export default async function middleware(req: NextRequest) {
	const intlResponse = intlMiddleware(req);

	const pathname = req.nextUrl.pathname;
	const pathnameWithoutLocale = pathname.replace(/^\/(es|en)\//, "");

	const getLocale = (pathname: string) => {
		if (pathname.startsWith("/en")) {
			return "en";
		}
		return "es";
	};

	if (
		publicRoutes.some((route) => pathnameWithoutLocale === route) ||
		/\.(jpg|png|svg|css|js)$/.test(pathnameWithoutLocale) ||
		pathnameWithoutLocale.startsWith("/api") ||
		pathnameWithoutLocale.startsWith("/_next")
	) {
		return intlResponse;
	}

	const isProtectedRoute = Object.keys(protectedRoutes).some(
		(route) =>
			pathnameWithoutLocale === route ||
			pathnameWithoutLocale.startsWith(`${route}/`)
	);

	if (isProtectedRoute) {
		const session = req.cookies.get("_ngx_access_token")?.value;

		if (!session) {
			const locale = getLocale(pathname);

			let loginRoute;

			// TODO: Fix this, works only for es routes
			if (locale === "en") {
				loginRoute = `/en/login?callbackUrl=${encodeURIComponent(pathname)}`;
			} else {
				loginRoute = `/login?callbackUrl=${encodeURIComponent(pathname)}`;
			}

			return NextResponse.redirect(new URL(loginRoute, req.url));
		}
	}

	return intlResponse;
}

export const config = {
	matcher: ["/", "/(es|en)/:path*", "/((?!api|_next|.*\\..*).*)"],
};
