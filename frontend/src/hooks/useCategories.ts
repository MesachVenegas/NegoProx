"use client";
import { useQuery } from "@tanstack/react-query";

import apiRequest from "@/lib/axios";
import { Category } from "@/types/category";

export const useCategories = () => {
	async function getCategories() {
		const { data } = await apiRequest.get<Category[]>("/category");

		return data;
	}

	const {
		data: categories,
		status,
		error,
		refetch: refetchCategories,
	} = useQuery({
		queryKey: ["categories"],
		queryFn: getCategories,
	});

	return { categories, status, error, refetchCategories };
};
