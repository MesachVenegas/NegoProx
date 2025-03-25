"use client";
import apiRequest from "@/lib/axios";
import { BusinessData } from "@/types/business";
import { PaginatedResponse } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

export const useBusiness = (
	page: number = 1,
	limit: number = 6,
	category?: string[],
	slug?: string
) => {
	async function getBusiness(
		page: number,
		limit: number,
		category: string[] = []
	) {
		const { data } = await apiRequest.get<PaginatedResponse<BusinessData[]>>(
			`/business?page=${page}&limit=${limit}&category=${category}`
		);

		return data;
	}

	async function getBusinessProfile(slug?: string) {
		if (!slug) return null;
		const { data } = await apiRequest.get<BusinessData>(`/business/${slug}`);

		return data;
	}

	const {
		data: business,
		refetch: refetchBusiness,
		status,
		error,
	} = useQuery({
		queryKey: ["business", page, limit, category],
		queryFn: () => getBusiness(page, limit),
		retry: 2,
	});

	const {} = useQuery({
		queryKey: ["businessProfile", slug],
		queryFn: () => getBusinessProfile(slug),
	});

	return { business, refetchBusiness, status, error };
};
