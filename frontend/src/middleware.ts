import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);
// TODO: Fix language change, doesn't work fine, need reload page to see changes
export const config = {
	matcher: ["/", "/(es|en)/:path*"],
};
