"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Briefcase, LogIn, LogOut, Menu, Settings, User } from "lucide-react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { ThemeToggle } from "./ThemeToggle";
import LanguageSelector from "./LanguageSelector";
import { Link, usePathname } from "@/i18n/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "./ui/sheet";

export default function Navbar() {
	// Scroll effect for navbar
	const pathname = usePathname();
	const { scrollY } = useScroll();
	const [isVisible, setIsVisible] = useState<boolean>(true);
	const [isScrolled, setIsScrolled] = useState<boolean>(false);
	const isAbsolute = pathname === "/";
	// TODO: Fix to work on paths white handle correct colors to pages
	// ["/", "/login", "/register"].includes(pathname);
	// Transalate function
	const t = useTranslations("Navbar");

	const menu = [
		{ label: t("home"), href: "/" },
		{ label: t("business"), href: "/business" },
		{ label: t("categories"), href: "/categories" },
		{ label: t("howItWorks"), href: "/how-it-works" },
		{ label: t("about"), href: "/about" },
	];

	// Navbar styles variants
	const navVariants = {
		initial: { opacity: 1, y: 0 },
		visible: { opacity: 1, y: 0 },
		hidden: { opacity: 0, y: -25 },
	};

	// scroll effect detection
	useMotionValueEvent(scrollY, "change", (latest) => {
		const prev = scrollY.getPrevious() || 0;

		if (latest > prev && latest > 250) {
			setIsVisible(false);
		} else {
			setIsVisible(true);
		}
		setIsScrolled(latest > 50);
	});

	// navbar background to change based on scrolling
	const navBackground = isAbsolute
		? isScrolled
			? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
			: "bg-transparent"
		: "bg-background";

	return (
		<motion.header
			variants={navVariants}
			initial="initial"
			animate={isVisible ? "visible" : "hidden"}
			transition={{ ease: "easeInOut", duration: 0.3 }}
			className={`w-full border-b ${
				isAbsolute
					? "fixed top-0 left-0 z-50 border-transparent"
					: `sticky top-0 z-50 border-border`
			} ${navBackground}`}>
			<div className="container flex h-16 items-center mx-auto max-w-[1400px] md:px-4 px-2">
				{/* Mobile menu */}
				<Sheet>
					<SheetTrigger asChild>
						<Button
							variant="outline"
							size="icon"
							className={`mr-2 lg:hidden ${
								isAbsolute && !isScrolled
									? "text-white hover:bg-white/20 border-muted-foreground/30 bg-transparent hover:text-teal-300"
									: " bg-transparent border-muted hover:bg-teal-300/50"
							}`}>
							<Menu className="h-6 w-6" />
							<span className="sr-only">Toggle menu</span>
						</Button>
					</SheetTrigger>
					<SheetContent side="left" className="p-6">
						<div className="flex flex-col h-full">
							<div className="flex-grow">
								<SheetTitle>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 300 100"
										width="180"
										height="90">
										<g fill="#003366">
											<rect x="10" y="40" width="40" height="30" />
											<polygon points="10,40 30,20 50,40" />
											<circle cx="90" cy="30" r="10" />
											<rect x="80" y="40" width="20" height="30" />
											<path
												d="M50,55 Q70,25 90,35"
												stroke="#66CC99"
												strokeWidth="2"
												fill="none"
											/>
											<circle cx="60" cy="40" r="2" fill="#66CC99" />
											<circle cx="70" cy="30" r="2" fill="#66CC99" />
											<circle cx="80" cy="35" r="2" fill="#66CC99" />
										</g>
										<text
											x="110"
											y="60"
											fontFamily="Arial, sans-serif"
											fontSize="40"
											fill="#003366">
											<tspan fontWeight="bold" fill="#66CC99">
												Nego
											</tspan>
											<tspan fontWeight="normal" className="dark:fill-white">
												Prox
											</tspan>
										</text>
									</svg>
								</SheetTitle>
								<div className="flex flex-col gap-6 py-6">
									{menu.map((item) => {
										const isActive = item.href === pathname;

										return (
											<Link
												key={item.label}
												href={item.href}
												className={`nav-link ${
													isActive ? "text-teal-500 dark:text-teal-300" : ""
												}`}>
												{item.label}
											</Link>
										);
									})}
									{/* Account menu */}
									<div className="space-y-3 pt-4 border-t">
										<div>{t("account")}</div>
										<Link
											href="/profile"
											className="nav-link flex items-center gap-2">
											{t("profile")}
										</Link>
										<Link
											href="/dashboard"
											className="nav-link flex items-center gap-2">
											{t("dashboard")}
										</Link>
										<Link
											href="/settings"
											className="nav-link flex items-center gap-2">
											{t("settings")}
										</Link>
										<Link
											href="/login"
											className="nav-link text-sm flex items-center gap-2">
											<LogIn className="h-4 w-4" />
											{t("login")}
										</Link>
										<span className="nav-link text-sm flex items-center gap-2 group hover:text-red-500">
											<LogOut className="h-4 w-4 group-hover:text-red-500" />
											{t("logout")}
										</span>
									</div>
								</div>
							</div>
							<div className="border-t pt-4">
								<div className="flex items-center justify-between mb-4">
									<ThemeToggle />
									<LanguageSelector />
								</div>
								<Button className="w-full">
									<Link href="/business/register">{t("callToAction")}</Link>
								</Button>
							</div>
						</div>
					</SheetContent>
				</Sheet>
				{/* Brand Logo */}
				<Link href="/" className="flex items-center gap-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 300 100"
						className="h-12 w-auto">
						<g fill="#003366">
							<rect x="10" y="40" width="40" height="30" />
							<polygon points="10,40 30,20 50,40" />
							<circle cx="90" cy="30" r="10" />
							<rect x="80" y="40" width="20" height="30" />
							<path
								d="M50,55 Q70,25 90,35"
								stroke="#66CC99"
								strokeWidth="2"
								fill="none"
							/>
							<circle cx="60" cy="40" r="2" fill="#66CC99" />
							<circle cx="70" cy="30" r="2" fill="#66CC99" />
							<circle cx="80" cy="35" r="2" fill="#66CC99" />
						</g>
						<text
							x="110"
							y="60"
							fontFamily="Arial, sans-serif"
							fontSize="40"
							fill="#003366">
							<tspan fontWeight="bold" fill="#66CC99">
								Nego
							</tspan>
							<tspan
								fontWeight="normal"
								className={
									isAbsolute && !isScrolled
										? "fill-white dark:fill-white"
										: "dark:fill-white"
								}>
								Prox
							</tspan>
						</text>
					</svg>
				</Link>
				{/* Navigation */}
				<nav className="hidden xl:flex gap-6 mx-6">
					{menu.map((item) => {
						const isActive = item.href === pathname;

						return (
							<Link
								key={item.label}
								href={item.href}
								className={`relative py-2 text-sm font-medium transition-colors ${
									isAbsolute && !isScrolled
										? "text-white hover:text-primary/80"
										: isActive
										? "text-teal-300"
										: "text-black dark:text-white hover:text-primary"
								}`}>
								<span>{item.label}</span>
								<motion.div
									className="absolute bottom-0 left-0 h-[2px] bg-teal-300"
									initial={false}
									animate={{
										width: isActive ? "100%" : "0%",
									}}
									transition={{
										type: "spring",
										stiffness: 400,
										damping: 30,
									}}
									whileHover={{
										width: "100%",
									}}
								/>
							</Link>
						);
					})}
				</nav>
				{/* Actions */}
				<div className="flex items-center gap-4 ml-auto">
					<div className="hidden xl:flex items-center gap-4">
						<LanguageSelector />
						<ThemeToggle />
					</div>
					<Button
						className={`hidden md:inline-flex ${
							isAbsolute && !isScrolled ? "text-white hover:text-white/80" : ""
						}`}>
						<Link href="/business/register">{t("callToAction")}</Link>
					</Button>
					<Button
						variant="outline"
						size="sm"
						className="hidden md:flex items-center cursor-pointer hover:text-black">
						<Link href="/login" className="flex items-center gap-2">
							<LogIn className="h-4 w-4" />
							{t("login")}
						</Link>
					</Button>
					{/* User menu */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							{/* TODO: make this visible when user is logged in */}
							<Button
								variant={isAbsolute && !isScrolled ? "outline" : "ghost"}
								size="icon"
								className={`relative h-8 w-8 rounded-full hidden ${
									isAbsolute && !isScrolled
										? "text-white hover:text-primary hover:bg-white/20 border-white"
										: "text-foreground hover:text-teal-300"
								} `}>
								<Avatar className="h-8 w-8">
									{/* TODO: Add user avatar */}
									<AvatarImage src="" alt="User" />
									<AvatarFallback>UN</AvatarFallback>
								</Avatar>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="w-56">
							<DropdownMenuLabel>{t("account")}</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem className="group">
								<User className="mr-2 h-4 w-4 group-hover:text-black" />
								<Link href="/profile" className="group-hover:text-black">
									{t("profile")}
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem className="group">
								<Briefcase className="mr-2 h-4 w-4 dark:group-hover:text-black" />
								<Link href="/dashboard" className="dark:group-hover:text-black">
									{t("dashboard")}
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem className="group">
								<Settings className="mr-2 h-4 w-4 dark:group-hover:text-black" />
								<Link
									href="/profile/settings"
									className="dark:group-hover:text-black">
									{t("settings")}
								</Link>
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem className="group cursor-pointer">
								<LogOut className="group-hover:text-red-500 mr-2 h-4 w-4" />
								<span className="group-hover:text-red-500">{t("logout")}</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</motion.header>
	);
}
