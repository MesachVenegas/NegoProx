"use client";
import apiRequest from "@/lib/axios";
import { BusinessData } from "@/types/business";
import { PaginatedResponse } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

export const useBusiness = (page: number = 1, limit: number = 6) => {
	async function getBusiness(page: number, limit: number) {
		const { data } = await apiRequest.get<PaginatedResponse<BusinessData[]>>(
			`/business?page=${page}&limit=${limit}`
		);

		return data;
	}

	const {
		data: business,
		refetch: refetchBusiness,
		status,
		error,
	} = useQuery({
		queryKey: ["business", page, limit],
		queryFn: () => getBusiness(page, limit),
		retry: 2,
	});

	return { business, refetchBusiness, status, error };
};
