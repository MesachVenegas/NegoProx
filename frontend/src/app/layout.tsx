import "../styles/globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
	weight: ["400", "500", "600", "700"],
	subsets: ["latin", "latin-ext"],
	variable: "--font-poppins",
	display: "swap",
	preload: true,
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html suppressHydrationWarning>
			<body className={`${poppins.variable} antialiased`}>{children}</body>
		</html>
	);
}
