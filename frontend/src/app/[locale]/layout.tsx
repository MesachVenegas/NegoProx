import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

import GoToTop from "@/components/GoToTop";
import { ThemeProvider } from "@/components/containers/ThemeProvider";

const poppins = Poppins({
	weight: ["400", "500", "600", "700"],
	subsets: ["latin", "latin-ext"],
	variable: "--font-poppins",
	display: "swap",
	preload: true,
});

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

export default async function LanguageLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: Promise<{ locale: "es" | "en" }>;
}>) {
	const { locale } = await params;
	const messages = await getMessages();

	return (
		<html lang={locale}>
			<body className={`${poppins.variable} antialiased`}>
				<NextIntlClientProvider messages={messages}>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange>
						<div className="flex min-h-screen flex-col">
							<main className="flex-1">{children}</main>
						</div>
						<GoToTop />
					</ThemeProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
