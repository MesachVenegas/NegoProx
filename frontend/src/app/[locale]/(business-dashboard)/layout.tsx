import { Metadata } from "next";
import { ReactNode } from "react";
// import { Sidebar } from '@/components/dashboard/Sidebar'
// import { Header } from '@/components/dashboard/Header'

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
		<div className="flex h-screen bg-gray-100">
			{/* <Sidebar /> */}
			<div className="flex-1 flex flex-col overflow-hidden max-w-[1400px] mx-auto">
				{/* <Header /> */}
				<main className="flex-1 overflow-y-auto">{children}</main>
			</div>
		</div>
	);
}
