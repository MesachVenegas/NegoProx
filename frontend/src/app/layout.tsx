import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

import "../styles/globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/containers/ThemeProvider";

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
	icons: {
		icon: "/favicon.ico",
	},
};

export default async function RootLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: Promise<{ locale: "es" | "en" }>;
}>) {
	const locale = (await params).locale || "es";
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
							<Navbar />
							<main className="flex-1">{children}</main>
						</div>
					</NextIntlClientProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
