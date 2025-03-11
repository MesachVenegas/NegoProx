import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { getMessages, setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import "../../styles/globals.css";

import GoToTop from "@/components/GoToTop";
import { ThemeProvider } from "@/components/containers/ThemeProvider";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
	title: {
		template: "%s | NegoProx",
		default: "NegoProx - Conectando negocios",
	},
	description:
		"Conectando negocios, desde la comodidad de tu hogar y facilitando la comunicación con tus clientes.",
	icons: {
		icon: "/favicon.ico",
	},
};

const poppins = Poppins({
	weight: ["400", "500", "600", "700"],
	subsets: ["latin", "latin-ext"],
	variable: "--font-poppins",
	display: "auto",
	preload: true,
});

// Apply the font to the html element in the root layout
export const fontClass = poppins.variable;

export default async function LanguageLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: Promise<{ locale: "es" | "en" }>;
}>) {
	const { locale } = await params;
	if (!routing.locales.includes(locale)) {
		notFound();
	}

	setRequestLocale(locale);
	const messages = await getMessages();

	return (
		<html lang={locale} suppressHydrationWarning>
			<body className={`${fontClass} antialiased`}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange>
					<NextIntlClientProvider messages={messages}>
						<div className="flex min-h-screen flex-col">
							<main className="flex-1">{children}</main>
						</div>
						<GoToTop />
					</NextIntlClientProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
