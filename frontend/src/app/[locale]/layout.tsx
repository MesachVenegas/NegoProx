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

// Apply the font to the html element in the root layout
export const fontClass = poppins.variable;

export default async function LanguageLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: { locale: "es" | "en" };
}>) {
	const { locale } = params;
	const messages = await getMessages();

	return (
		<html lang={locale} suppressHydrationWarning>
			<body>
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
