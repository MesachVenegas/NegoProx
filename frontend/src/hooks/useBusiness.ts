"use client";
import apiRequest from "@/lib/axios";
import { BusinessCard } from "@/types/business";
import { useQuery } from "@tanstack/react-query";

export const useBusiness = (page: number = 1, limit: number = 6) => {
	async function getBusiness(
		page: number,
		limit: number
	): Promise<BusinessCard[]> {
		const { data } = await apiRequest.get(
			`/business?page=${page}&limit=${limit}`
		);

		return data;
	}

	const { data: business, status } = useQuery({
		queryKey: ["business", page, limit],
		queryFn: () => getBusiness(page, limit),
		retry: 2,
	});

	return { business, status };
};
