"use client";
import { useTranslations } from "next-intl";
import { Briefcase, LogIn, LogOut, Menu, Settings, User } from "lucide-react";

import { Button } from "./ui/button";
import { Link } from "@/i18n/navigation";
import { ThemeToggle } from "./ThemeToggle";
import LanguageSelector from "./LanguageSelector";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "./ui/sheet";

export default function Navbar() {
	const t = useTranslations("Navbar");

	return (
		<header className="sticky top-0 z-50 w-fill bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
			<div className="container flex h-16 items-center mx-auto max-w-[1400px] px-2.5">
				{/* Mobile menu */}
				<Sheet>
					<SheetTrigger asChild>
						<Button variant="outline" size="icon" className="mr-4 xl:hidden">
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
									<Link href="/" className="nav-link">
										{t("home")}
									</Link>
									<Link href="/business" className="nav-link">
										{t("business")}
									</Link>
									<Link href="/categories" className="nav-link">
										{t("categories")}
									</Link>
									<Link href="/how-it-works" className="nav-link">
										{t("howItWorks")}
									</Link>
									<Link href="/about" className="nav-link">
										{t("about")}
									</Link>
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
								<Button className="w-full">{t("callToAction")}</Button>
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
							<tspan fontWeight="normal" className="dark:fill-white">
								Prox
							</tspan>
						</text>
					</svg>
				</Link>
				{/* Navigation */}
				<nav className="hidden xl:flex gap-6 mx-6">
					<Link href="/" className="nav-link text-sm">
						{t("home")}
					</Link>
					<Link href="/business" className="nav-link text-sm">
						{t("business")}
					</Link>
					<Link href="/categories" className="nav-link text-sm">
						{t("categories")}
					</Link>
					<Link href="/how-it-works" className="nav-link text-sm">
						{t("howItWorks")}
					</Link>
					<Link href="/about" className="nav-link text-sm">
						{t("about")}
					</Link>
				</nav>
				{/* Actions */}
				<div className="flex items-center gap-4 ml-auto">
					<div className="hidden xl:flex items-center gap-4">
						<LanguageSelector />
						<ThemeToggle />
					</div>
					<Button>{t("callToAction")}</Button>
					<Button
						variant="outline"
						size="sm"
						className="hidden sm:flex items-center gap-2">
						<LogIn className="h-4 w-4" />
						{t("login")}
					</Button>
					{/* TODO: make this work with a authenticate user */}
					{/* User menu */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="relative h-8 w-8 rounded-full hidden">
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
								<User className="mr-2 h-4 w-4 dark:group-hover:text-teal-500" />
								<Link
									href="/profile"
									className="dark:group-hover:text-teal-500">
									{t("profile")}
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem className="group">
								<Briefcase className="mr-2 h-4 w-4 dark:group-hover:text-teal-500" />
								<Link
									href="/dashboard"
									className="dark:group-hover:text-teal-500">
									{t("dashboard")}
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem className="group">
								<Settings className="mr-2 h-4 w-4 dark:group-hover:text-teal-500" />
								<Link
									href="/profile/settings"
									className="dark:group-hover:text-teal-500">
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
		</header>
	);
}
