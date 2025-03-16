import jwt from "jsonwebtoken";
import NodeCache from "node-cache";
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

import apiRequest from "./lib/axios";
import { routing } from "./i18n/routing";
import { UserJWTProps, UserLoginProps } from "./types/user";
import { protectedRoutes, publicRoutes } from "./routes";

const intlMiddleware = createMiddleware(routing);

const tokenCache = new NodeCache({ stdTTL: 300 });

// Get current locale prefix from pathname
const getLocale = (pathname: string) => {
	return pathname.startsWith("/en") ? "en" : "es";
};

// Verify session by cookies
async function verifyToken() {
	try {
		const { data } = await apiRequest.get("/auth/verify");

		return data;
	} catch (error) {
		console.error(`Verify session error: ${error}`);
		return null;
	}
}

// Decode token and return user data from it
function decodeToken(token: string) {
	try {
		return jwt.decode(token) as UserJWTProps;
	} catch (error) {
		console.error(`Decode token error: ${error}`);
		return null;
	}
}

export default async function middleware(req: NextRequest) {
	const pathname = req.nextUrl.pathname;
	const locale = getLocale(pathname);
	const pathnameWithoutLocale = pathname.match(/^\/(es|en)(\/|$)/)
		? "/" + pathname.replace(/^\/(es|en)(\/|$)/, "")
		: pathname;

	const intlResponse = intlMiddleware(req);

	const loginRoute =
		locale === "es"
			? `/login?callback=${encodeURIComponent(pathname)}`
			: `/${locale}/login?callback=${encodeURIComponent(pathname)}`;

	// clear cache on logout
	if (pathnameWithoutLocale === "/logout") {
		const token = req.cookies.get("_ngx_access_token")?.value;
		if (token) {
			const decoded = decodeToken(token);
			if (decoded?.sub) {
				tokenCache.del(decoded.sub);
			}
		}
		return intlResponse;
	}

	// Allow public routes and assets
	if (
		publicRoutes.some((route) => pathnameWithoutLocale === route) ||
		/\.(jpg|png|svg|css|js)$/.test(pathnameWithoutLocale) ||
		pathnameWithoutLocale.startsWith("/api") ||
		pathnameWithoutLocale.startsWith("/_next")
	) {
		return intlResponse;
	}

	// Verify protected routes
	const isProtectedRoute = Object.keys(protectedRoutes).find(
		(route) =>
			pathnameWithoutLocale === route ||
			pathnameWithoutLocale.startsWith(`${route}/`)
	);

	if (isProtectedRoute) {
		const sessionToken = req.cookies.get("_ngx_access_token")?.value;
		if (!sessionToken) {
			return NextResponse.redirect(new URL(loginRoute, req.url));
		}

		const decoded = decodeToken(sessionToken);
		if (!decoded) {
			return NextResponse.redirect(new URL(loginRoute, req.url));
		}

		const { sub, tokenVersion } = decoded;

		const cachedToken = tokenCache.get<{
			sub: string;
			role: "USER" | "BUSINESS" | "ADMIN";
			tokenVersion: number;
		}>(sub);
		let userData: UserJWTProps;

		// Check if token is cached and if it is valid or verify it.
		if (cachedToken && cachedToken.tokenVersion === tokenVersion) {
			userData = {
				sub: cachedToken.sub,
				email: "",
				picture: "",
				role: cachedToken.role,
				tokenVersion,
			};
		} else {
			const result = (await verifyToken()) as UserLoginProps;
			if (!result) {
				return NextResponse.redirect(new URL(loginRoute, req.url));
			}
			userData = {
				sub: result.user.id,
				email: result.user.email,
				picture: result.user.picture,
				role: result.user.role,
				tokenVersion,
			};
			// Update cache
			tokenCache.set(result.user.id, {
				sub: result.user.id,
				role: result.user.role,
				tokenVersion,
			});
		}

		// Check if user has the required role to access the route
		const allowedRoles = protectedRoutes[isProtectedRoute];
		if (!allowedRoles.includes(userData.role)) {
			const forbiddenRoute =
				locale === "es" ? "/forbidden" : `/${locale}/forbidden`;
			return NextResponse.redirect(new URL(forbiddenRoute, req.url));
		}
	}

	return intlResponse;
}

export const config = {
	matcher: ["/", "/(es|en)/:path*", "/((?!api|_next|.*\\..*).*)"],
};
