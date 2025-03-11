"use client";
import { motion } from "framer-motion";
import {
	Briefcase,
	Calendar,
	HardHat,
	Layers2,
	Settings,
	UserRoundPen,
	ChevronLeft,
	Menu,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

import {
	Sheet,
	SheetContent,
	SheetTrigger,
	SheetClose,
} from "@/components/ui/sheet";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import LanguageSelector from "@/components/LanguageSelector";

export function Sidebar() {
	const pathname = usePathname();
	const txt = useTranslations("BusinessDashboard");
	const [expanded, setExpanded] = useState(true);
	const [isMobile, setIsMobile] = useState(false);

	// Check if the window width is less than 768px
	useEffect(() => {
		const checkIfMobile = () => {
			setIsMobile(window.innerWidth < 768);
			if (window.innerWidth < 1024) {
				setExpanded(false);
			} else {
				setExpanded(true);
			}
		};

		checkIfMobile();
		window.addEventListener("resize", checkIfMobile);

		return () => window.removeEventListener("resize", checkIfMobile);
	}, []);

	const toggleSidebar = () => {
		setExpanded(!expanded);
	};

	const menuItems = [
		{ name: txt("menu.dashboard"), icon: Layers2, link: "/dashboard" },
		{
			name: txt("menu.profile"),
			icon: UserRoundPen,
			link: "/dashboard/business-profile",
		},
		{
			name: txt("menu.appointments"),
			icon: Calendar,
			link: "/dashboard/appointments",
		},
		{ name: txt("menu.jobs"), icon: Briefcase, link: "/dashboard/jobs" },
		{ name: txt("menu.services"), icon: HardHat, link: "/dashboard/services" },
		{
			name: txt("menu.settings"),
			icon: Settings,
			link: "/dashboard/settings",
		},
	];

	// Mobile sidebar using Sheet component
	const MobileSidebar = () => (
		<Sheet>
			<SheetTrigger asChild>
				<Button
					variant="outline"
					size="icon"
					className="md:hidden fixed top-4 left-4 z-40">
					<Menu className="h-5 w-5" />
				</Button>
			</SheetTrigger>
			<SheetContent side="left" className="p-0 w-[280px]">
				<div className="flex flex-col h-full bg-background">
					<div className="flex items-center justify-center h-20 border-b border-border shadow-sm">
						<h1 className="text-3xl font-bold text-primary">NegoProx</h1>
					</div>
					<ul className="flex flex-col py-4 flex-1">
						{menuItems.map((item) => (
							<li key={item.name}>
								<SheetClose asChild>
									<Link
										href={item.link}
										className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-muted-foreground hover:text-foreground">
										<span className="inline-flex items-center justify-center h-12 w-12 text-lg text-muted-foreground">
											<item.icon className="w-5 h-5" />
										</span>
										<span className="text-sm font-medium">{item.name}</span>
									</Link>
								</SheetClose>
							</li>
						))}
					</ul>
					<div className="p-4 border-t border-border space-y-4">
						<div className="flex justify-between items-center w-full mb-4">
							<ThemeToggle />
							<LanguageSelector />
						</div>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);

	// Desktop sidebar with collapsible functionality
	return (
		<>
			{/* Mobile sidebar */}
			{isMobile ? (
				<MobileSidebar />
			) : (
				<div
					className={`flex flex-col ${
						expanded ? "w-64" : "w-15"
					} bg-background border-r border-border shadow-lg h-screen transition-all duration-300 ease-in-out`}>
					<div className="flex items-center justify-between h-20 border-b border-border shadow-sm px-4">
						{/* Logo or business name */}
						{expanded ? (
							<h1 className="text-2xl font-bold text-primary">NegoProx</h1>
						) : (
							""
						)}

						{/* Toggle button */}
						<Button
							variant="ghost"
							size="icon"
							onClick={toggleSidebar}
							className="hover:bg-muted dark:hover:text-primary">
							<ChevronLeft
								className={`h-8 w-8 transition-all ease-in duration-100 ${
									expanded ? "" : "rotate-180"
								}`}
							/>
						</Button>
					</div>

					{/* Navigation menu */}
					<ul className="flex flex-col py-4 flex-1">
						{menuItems.map((item) => (
							<li key={item.name}>
								<Link
									href={item.link}
									className={`flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-muted-foreground hover:text-foreground group relative ${
										pathname === item.link ? "text-primary" : ""
									}`}>
									{pathname === item.link && (
										<motion.div
											layoutId="sidebar-indicator"
											initial={{ opacity: 0, x: -4 }}
											animate={{ opacity: 1, x: 0 }}
											exit={{ opacity: 0, x: -4 }}
											transition={{
												type: "spring",
												stiffness: 300,
												damping: 30,
											}}
											className="absolute left-0 top-0 h-full w-1 bg-primary rounded-r-lg"
										/>
									)}
									<span className="inline-flex items-center justify-center h-12 w-12 text-lg text-muted-foreground">
										<item.icon
											className={`w-5 h-5 ${
												pathname === item.link ? "text-primary" : ""
											} ${!expanded && "mx-auto"}`}
										/>
									</span>
									{expanded && (
										<span
											className={`text-sm font-medium ${
												pathname === item.link ? "text-primary" : ""
											}`}>
											{item.name}
										</span>
									)}
								</Link>
							</li>
						))}
					</ul>

					{/* Footer with theme toggle and language selector */}
					<div
						className={`p-4 border-t border-border ${
							expanded ? "space-y-4" : ""
						}`}>
						<div
							className={`${
								expanded ? "flex justify-between" : "flex flex-col gap-4"
							} items-center w-full mb-4`}>
							<ThemeToggle />
							<LanguageSelector variant={expanded ? "default" : "minimal"} />
						</div>
					</div>
				</div>
			)}
		</>
	);
}
