"use client";

import { useMutation, useQuery } from "@tanstack/react-query";

import apiRequest from "@/lib/axios";
import { useRouter } from "@/i18n/navigation";

export const useAuth = () => {
	const router = useRouter();

	// Verify if user is authenticated
	const { data: user, refetch: refetchUser } = useQuery({
		queryKey: ["user"],
		queryFn: async () => {
			const { data } = await apiRequest.get("/auth/verify");

			return data;
		},
		enabled: !!document.cookie.includes("_ngx_access_token"),
	});

	// Login user
	const loginMutation = useMutation({
		mutationFn: async ({
			email,
			password,
		}: {
			email: string;
			password: string;
		}) => {
			const { data } = await apiRequest.post("/auth/login", {
				email,
				password,
			});

			return data;
		},
		onSuccess: (data) => {
			refetchUser();
			if (data.role === "BUSINESS") {
				router.push("/dashboard");
			} else {
				router.push("/profile");
			}
		},
		onError: (error) => {
			console.error(`Login error: ${error}`);
		},
	});

	// Logout user and clear cookies
	const logoutMutation = useMutation({
		mutationFn: async () => {
			await apiRequest.get("/auth/logout");
		},
		onSuccess: () => {
			// clear cookies
			document.cookie = "_ngx_access_token=; Max-Age=0; path=/;";
			document.cookie = "__ngx_csrf__=; Max-Age=0; path=/;";

			refetchUser();
			router.push("/");
		},
		onError: (error) => {
			console.error(`Logout error: ${error}`);
		},
	});

	return {
		user,
		login: loginMutation.mutate,
		logout: logoutMutation.mutate,
		isLoading: loginMutation.isPending || logoutMutation.isPending,
		isError: loginMutation.isError || logoutMutation.isError,
		error: loginMutation.error || logoutMutation.error,
	};
};
