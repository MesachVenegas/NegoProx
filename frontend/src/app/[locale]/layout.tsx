import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import "../../styles/globals.css";

import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import GoToTop from "@/components/GoToTop";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ReactQueryProvider } from "@/components/providers/ReactQueryProvider";

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
						<ReactQueryProvider>
							<div className="flex flex-col">{children}</div>
						</ReactQueryProvider>
						<GoToTop />
					</NextIntlClientProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
