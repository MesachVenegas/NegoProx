export type PaginatedResponse<T> = {
	pages: number;
	prev: number | null;
	next: number | null;
	limit: number;
	data: T;
};
