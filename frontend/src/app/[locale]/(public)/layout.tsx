import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function PublicLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Navbar />
			<div className="min-h-screen">
				<main className="flex-1">{children}</main>
			</div>
			<Footer />
		</>
	);
}
