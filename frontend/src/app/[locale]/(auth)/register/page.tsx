"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const registerSchema = z
	.object({
		email: z.string().email({
			message: "Please enter a valid email address",
		}),
		password: z.string().min(8, {
			message: "Password must be at least 8 characters long",
		}),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	const onSubmit = async (data: RegisterFormData) => {
		setIsLoading(true);
		try {
			// TODO: Implement registration logic
			const response = await fetch("/api/auth/register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});

			if (response.ok) {
				router.push("/login");
			}
		} catch (error) {
			console.error("Registration failed:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex min-h-screen items-center justify-center">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle className="text-2xl text-center">
						Create an account
					</CardTitle>
					<CardDescription className="text-center">
						Enter your email and password to create your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												placeholder="Enter your email"
												type="email"
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
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input
												placeholder="Enter your password"
												type="password"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="confirmPassword"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Confirm Password</FormLabel>
										<FormControl>
											<Input
												placeholder="Confirm your password"
												type="password"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button type="submit" className="w-full" disabled={isLoading}>
								{isLoading ? "Creating account..." : "Create account"}
							</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
