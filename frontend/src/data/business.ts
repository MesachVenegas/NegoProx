import apiRequest from "@/lib/axios";
import { PaginatedResponse } from "@/types/api";
import { BusinessData } from "@/types/business";

export async function getBusiness(
	page: number,
	limit: number,
	category: string[] = []
) {
	const { data } = await apiRequest.get<PaginatedResponse<BusinessData[]>>(
		`/business?page=${page}&limit=${limit}&category=${category}`
	);

	return data;
}

export async function getBusinessProfile(slug?: string) {
	if (!slug) return null;
	const { data } = await apiRequest.get<BusinessData>(
		`/business/profile?slug=${slug}`
	);

	return data;
}
