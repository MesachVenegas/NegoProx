"use client";
import Image from "next/image";
import { useState } from "react";

import { z } from "zod";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
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
import { Link } from "@/i18n/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
	const text = useTranslations("Register");
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const registerSchema = z.object({
		firstName: z.string().optional(),
		lastName: z.string().optional(),
		email: z.string().email(`${text("form.email.validation")}`),
		password: z
			.string()
			.min(6, `${text("form.password.min")}`)
			.regex(
				/^(?=.*[A-Z])(?=.*[0-9!@#$%^&*])/,
				`${text("form.password.validation")}`
			),
	});

	const form = useForm<z.infer<typeof registerSchema>>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
		},
	});

	async function handleRegister(data: z.infer<typeof registerSchema>) {
		// TODO: Implement register logic
		setIsLoading(true);
		try {
			console.log(data);
		} catch (error) {
			console.error(error);
			form.setError("root", { message: "Something went wrong" });
		} finally {
			setIsLoading(false);
		}
	}

	const handleGoogleRegister = () => {
		// TODO: Implement google register logic
	};

	return (
		<div className="flex min-h-screen bg-gradient-to-br from-primary/20 via-background to-secondary/20">
			<div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-8">
				<motion.div
					initial={{ y: -20, opacity: 0 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="w-full max-w-md space-y-5">
					<div className="text-center">
						<h2 className="mt-6 text-3xl font-extrabold text-muted-foreground">
							{text("title")}
						</h2>
						<p className="mt-2 text-sm text-muted-foreground">
							{text("subtitle")}{" "}
							<Link
								href="/login"
								className="font-medium text-primary hover:text-primary/80 hover:underline">
								{text("login")}
							</Link>
						</p>
					</div>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(handleRegister)}
							className="mt-8 space-y-6">
							<div className="rounded-md shadow-sm space-y-4">
								<FormField
									control={form.control}
									name="firstName"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="sr-only">
												{text("form.name.value")}
											</FormLabel>
											<FormControl>
												<Input
													placeholder={text("form.name.placeholder")}
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
									name="lastName"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="sr-only">
												{text("form.lastName.value")}
											</FormLabel>
											<FormControl>
												<Input
													placeholder={text("form.lastName.placeholder")}
													className="rounded-none"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="sr-only">
												{text("form.email.value")}
											</FormLabel>
											<FormControl>
												<Input
													placeholder={text("form.email.placeholder")}
													className="rounded-none"
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
											<FormLabel className="sr-only">
												{text("form.password.value")}
											</FormLabel>
											<FormControl>
												<Input
													type="password"
													placeholder={text("form.password.placeholder")}
													className="rounded-b-md"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							{/* Form button submit */}
							<div>
								<Button type="submit" className="w-full" disabled={isLoading}>
									{isLoading
										? text("form.registerBtn.loading")
										: text("form.registerBtn.default")}
								</Button>
							</div>
						</form>
					</Form>

					{/* Google Register */}
					<div className="mt-6">
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-muted-foreground" />
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="px-2 bg-background text-muted-foreground">
									{text("subtitle2")}
								</span>
							</div>
						</div>
						<div className="mt-6">
							<Button
								onClick={handleGoogleRegister}
								variant="outline"
								className="w-full flex items-center justify-center">
								<FcGoogle className="w-5 h-5 mr-2" />
								{text("googleBtn")}
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
