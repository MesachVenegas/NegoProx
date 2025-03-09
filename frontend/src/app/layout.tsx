import "../styles/globals.css";
import type { Metadata } from "next";
import { fontClass } from "./[locale]/layout";

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

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html suppressHydrationWarning className={`${fontClass} antialiased`}>
			<body>{children}</body>
		</html>
	);
}
