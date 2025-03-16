import { defineRouting } from "next-intl/routing";
// import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
	locales: ["es", "en"],
	defaultLocale: "es",
	localeDetection: true,
	localePrefix: "as-needed",
	localeCookie: true,
});
