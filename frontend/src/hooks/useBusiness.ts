"use client";
import { getBusiness } from "@/data/business";
import { useQuery } from "@tanstack/react-query";

export const useBusiness = (
	page: number = 1,
	limit: number = 6,
	category?: string[]
) => {
	const {
		data: business,
		refetch: refetchBusiness,
		status,
		error,
	} = useQuery({
		queryKey: ["business", page, limit, category],
		queryFn: () => getBusiness(page, limit),
		retry: 2,
		staleTime: 1000 * 60 * 60 * 0.3, // 30 minutes
	});

	return { business, refetchBusiness, status, error };
};
