import { Metadata } from "next";
import { ReactNode } from "react";
import { Sidebar } from "./_components/Sidebar";
import { Header } from "./_components/Header";

interface BusinessDashboardLayoutProps {
	children: ReactNode;
}

export const metadata: Metadata = {
	title: "Dashboard",
	description: "Business dashboard overview",
};

export default function BusinessDashboardLayout({
	children,
}: BusinessDashboardLayoutProps) {
	return (
		<div className="flex h-screen bg-background text-foreground">
			<Sidebar />
			<div className="flex-1 flex flex-col overflow-hidden max-w-[1440px] mx-auto">
				<Header />
				<main className="flex-1 overflow-y-auto p-4">{children}</main>
			</div>
		</div>
	);
}
