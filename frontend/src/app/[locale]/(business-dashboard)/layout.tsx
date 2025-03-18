import { Metadata } from "next";
import { ReactNode } from "react";
import { Header } from "./_components/Header";
import { Sidebar } from "./_components/Sidebar";

export const metadata: Metadata = {
	title: "Dashboard",
	description: "Business dashboard overview",
};

export default function BusinessDashboardLayout({
	children,
}: {
	children: ReactNode;
}) {
	return (
		<div className="flex h-screen bg-background text-foreground">
			<Sidebar />
			<div className="flex-1 flex flex-col min-h-screen overflow-hidden max-w-[1440px] mx-auto">
				<Header />
				<main className="flex-1 overflow-y-auto p-4">{children}</main>
			</div>
		</div>
	);
}
