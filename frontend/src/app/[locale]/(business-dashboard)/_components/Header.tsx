"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Bell, Mail, Search } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export function Header() {
	const txt = useTranslations("BusinessDashboard");
	const [notifications, setNotifications] = useState(3);
	const [messages, setMessages] = useState(5);

	// usedata example
	const user = {
		name: "Business Owner",
		email: "owner@business.com",
		avatar: "",
	};

	return (
		<header className="sticky top-0 z-10 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="flex h-16 items-center px-4 gap-4">
				{/* Search bar */}
				<div className="flex-1 md:flex-initial md:w-64 lg:w-80 relative hidden md:block">
					<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
					<Input
						type="search"
						placeholder={txt("header.search")}
						className="pl-8 bg-background w-full"
					/>
				</div>

				<div className="ml-auto flex items-center gap-4">
					{/* Notifications */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="icon" className="relative">
								<Bell className="h-5 w-5" />
								{notifications > 0 && (
									<Badge
										variant="destructive"
										className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
										{notifications}
									</Badge>
								)}
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="w-80">
							<DropdownMenuLabel className="flex justify-between">
								<span>{txt("header.notifications")}</span>
								{notifications > 0 && (
									<Button
										variant="ghost"
										size="sm"
										onClick={() => setNotifications(0)}
										className="h-auto p-0 text-xs font-normal text-primary">
										{txt("header.markAllRead")}
									</Button>
								)}
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							{notifications > 0 ? (
								<div className="max-h-80 overflow-y-auto">
									{[...Array(notifications)].map((_, i) => (
										<DropdownMenuItem
											key={i}
											className="flex flex-col items-start py-2">
											<div className="font-medium">
												{txt("header.newAppointment")}
											</div>
											<div className="text-xs text-muted-foreground">
												{txt("header.minutesAgo", { minutes: 5 * (i + 1) })}
											</div>
										</DropdownMenuItem>
									))}
								</div>
							) : (
								<div className="py-4 text-center text-muted-foreground">
									{txt("header.noNotifications")}
								</div>
							)}
						</DropdownMenuContent>
					</DropdownMenu>

					{/* Messages */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="icon" className="relative">
								<Mail className="h-5 w-5" />
								{messages > 0 && (
									<Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary">
										{messages}
									</Badge>
								)}
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="w-80">
							<DropdownMenuLabel className="flex justify-between">
								<span>{txt("header.messages")}</span>
								{messages > 0 && (
									<Button
										variant="ghost"
										size="sm"
										onClick={() => setMessages(0)}
										className="h-auto p-0 text-xs font-normal text-primary">
										{txt("header.markAllRead")}
									</Button>
								)}
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							{messages > 0 ? (
								<div className="max-h-80 overflow-y-auto">
									{[...Array(messages)].map((_, i) => (
										<DropdownMenuItem
											key={i}
											className="flex items-start gap-2 py-2">
											<Avatar className="h-8 w-8">
												<AvatarFallback>{`C${i + 1}`}</AvatarFallback>
											</Avatar>
											<div className="flex flex-col">
												<div className="font-medium">{`Client ${i + 1}`}</div>
												<div className="text-xs text-muted-foreground truncate">
													Mensaje del cliente
												</div>
											</div>
										</DropdownMenuItem>
									))}
								</div>
							) : (
								<div className="py-4 text-center text-muted-foreground">
									{txt("header.noMessages")}
								</div>
							)}
						</DropdownMenuContent>
					</DropdownMenu>

					{/* User profile */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="rounded-full h-8 w-8 ml-2">
								<Avatar>
									{user.avatar ? (
										<AvatarImage src={user.avatar} alt={user.name} />
									) : (
										<AvatarFallback className="bg-primary text-primary-foreground">
											{user.name.charAt(0)}
										</AvatarFallback>
									)}
								</Avatar>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel className="font-normal">
								<div className="flex flex-col space-y-1">
									<p className="text-sm font-medium leading-none">
										{user.name}
									</p>
									<p className="text-xs leading-none text-muted-foreground">
										{user.email}
									</p>
								</div>
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>{txt("header.profile")}</DropdownMenuItem>
							<DropdownMenuItem>{txt("header.settings")}</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem className="text-red-600">
								{txt("header.logout")}
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</header>
	);
}
