"use client";
import { z } from "zod";
import { useState } from "react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function LoginPage() {
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const t = useTranslations("Login");

	const loginSchema = z.object({
		email: z.string().email(`${t("errors.email")}`),
		password: z.string().min(1, `${t("errors.password")}`),
	});

	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function handleLogin(values: z.infer<typeof loginSchema>) {
		try {
			// TODO: Implement login
			setIsLoading(true);
			console.log(values);
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (_error) {
			setError(`${t("errors.general")}`);
		}
	}

	const handleGoogleLogin = () => {
		// TODO: Implement Google login
		console.log("Google login");
	};

	return (
		<div className="flex min-h-screen bg-gradient-to-br from-primary/20 via-background to-secondary/20">
			<div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-8">
				<motion.div
					initial={{ y: 20, opacity: 0 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="w-full max-w-md space-y-8">
					<div className="text-center">
						<h2 className="mt-6 text-3xl font-extrabold text-muted-foreground">
							{t("title")}
						</h2>
						<p className="mt-2 text-sm text-muted-foreground">
							{t("or")}{" "}
							<Link
								href="/register"
								className="font-medium text-primary hover:text-primary/80">
								{t("register.link")}
							</Link>
						</p>
					</div>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(handleLogin)}
							className="space-y-4 mt-8">
							<div className="rounded-md shadow-sm space-y-4">
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="sr-only">{t("email")}</FormLabel>
											<FormControl>
												<Input
													placeholder={`${t("placeHolders.email")}`}
													className="rounded-t-md"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="sr-only">{t("password")}</FormLabel>
											<FormControl>
												<Input
													type="password"
													placeholder={`${t("placeHolders.password")}`}
													className="rounded-b-md"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className="flex items-center justify-between">
								<div className="flex items-center">
									<input
										id="remember-me"
										name="remember-me"
										type="checkbox"
										className="h-4 w-4 text-primary focus:ring-primary border-muted-foreground rounded"
									/>
									<label
										htmlFor="remember-me"
										className="ml-2 block text-sm text-muted-foreground">
										Remember me
									</label>
								</div>
								<div className="text-sm">
									<Link
										href="/forgot-password"
										className="font-medium text-primary hover:text-primary/80">
										{t("forgot")}
									</Link>
								</div>
							</div>
							<div>
								<Button
									type="submit"
									className="w-full cursor-pointer"
									disabled={isLoading}>
									{isLoading ? `${t("loginInButton")}` : `${t("loginButton")}`}
								</Button>
							</div>
						</form>
					</Form>
					{error && (
						<p className="mt-2 text-center text-sm text-red-500">{error}</p>
					)}
					<div className="mt-6">
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-muted-foreground" />
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="px-2 bg-background text-muted-foreground">
									{t("subtitle")}
								</span>
							</div>
						</div>

						<div className="mt-6">
							<Button
								onClick={handleGoogleLogin}
								variant="outline"
								className="w-full flex items-center justify-center hover:text-black transition-colors duration-200">
								<FcGoogle className="w-5 h-5 mr-2" />
								{t("googleBtn")}
							</Button>
						</div>
					</div>
				</motion.div>
			</div>
			<div className="hidden lg:block relative w-1/2">
				<Image
					src="https://picsum.photos/1820/1980"
					alt="Login background"
					fill
					className="absolute inset-0 w-full h-full object-cover"
				/>
			</div>
		</div>
	);
}
