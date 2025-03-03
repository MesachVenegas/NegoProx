import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "../../styles/globals.css";
import { ThemeProvider } from "@/components/containers/ThemeProvider";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

const poppins = Poppins({
	weight: ["400", "500", "600", "700"],
	subsets: ["latin", "latin-ext"],
	variable: "--font-poppins",
	display: "swap",
	preload: true,
});

export const metadata: Metadata = {
	title: "NegoProx - Conectando negocios",
	description:
		"Conectando negocios, desde la comodidad de tu hogar y facilitando la comunicación con tus clientes.",
};

export default async function RootLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: Promise<{ locale: "es" | "en" }>;
}>) {
	const locale = (await params).locale;
	if (!routing.locales.includes(locale)) {
		notFound();
	}

	const messages = await getMessages();

	return (
		<html lang={locale} suppressHydrationWarning>
			<body className={`${poppins.variable} antialiased`}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange>
					<NextIntlClientProvider messages={messages}>
						<div className="flex min-h-screen flex-col">
							<main className="flex-1">{children}</main>
						</div>
					</NextIntlClientProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
