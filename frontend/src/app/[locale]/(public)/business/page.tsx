"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { MagnifyingGlass } from "react-loader-spinner";
import { ChevronLeft, ChevronRight, Filter, Search, X } from "lucide-react";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import ErrorBoundary from "./error";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useBusiness } from "@/hooks/useBusiness";
import BusinessCard from "@/components/BusinessCard";
import FilterSidebar from "@/components/FilterSidebar";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function Business() {
	const txt = useTranslations("BusinessPage");
	const router = useRouter();
	const searchParams = useSearchParams();

	// get query params
	const page = Number(searchParams.get("page")) || 1;
	const limit = Number(searchParams.get("limit")) || 6;
	const sort = searchParams.get("sort") || "name";
	const categories =
		searchParams.get("categories")?.split(",").filter(Boolean) || [];
	// set initial state of query params
	const [sortBy, setSortBy] = useState<string>(sort);
	const [itemsPerPage, setItemsPerPage] = useState(limit);
	const [currentPage, setCurrentPage] = useState<number>(page);
	const [selectedCategory, setSelectedCategory] =
		useState<string[]>(categories);

	// fetch business
	const { business, refetchBusiness, status, error } = useBusiness(
		currentPage,
		itemsPerPage
	);

	// filter and sort business
	const filteredBusiness = business?.data
		.filter(
			(business) =>
				selectedCategory.length === 0 ||
				selectedCategory.includes(business.categories[0].category.en_name)
		)
		.sort((a, b) => {
			switch (sortBy) {
				case "name":
					return a.name.localeCompare(b.name);
				case "rating":
					return b.rateAvg - a.rateAvg;
				case "newest":
					return (
						new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
					);
				default:
					return 0;
			}
		});

	// pagination
	const totalPages = business?.pages || 1;

	const updateQueryParams = (updates: Record<string, string>) => {
		const params = new URLSearchParams(searchParams.toString());

		Object.entries(updates).forEach(([key, value]) => {
			params.set(key, value);
		});

		router.push(`?${params.toString()}`);
	};

	const handlePageChange = (newPage: number) => {
		setCurrentPage(newPage);
		updateQueryParams({ page: newPage.toString() });
	};

	const handleItemsPerPageChange = (value: string) => {
		setItemsPerPage(Number(value));
		updateQueryParams({ limit: value.toString(), page: "1" });
	};

	const handleCategoryChange = (category: string[]) => {
		setSelectedCategory(category);
		const params = new URLSearchParams(searchParams.toString());
		if (category.length > 0) {
			params.set("categories", category.join(","));
		} else {
			params.delete("categories");
		}
		params.set("page", "1");
		router.push(`?${params.toString()}`);
	};

	const handleSortChange = (value: string) => {
		setSortBy(value);
		updateQueryParams({ sort: value });
	};

	return (
		<div className="container mx-auto max-w-[1400px] px-4 py-8">
			<div className="flex flex-col md:flex-row gap-8">
				{/* Filter sidebar to large screens */}
				<aside className="hidden xl:block w-64 sticky top-24 h-fit">
					<FilterSidebar
						selectedCategories={selectedCategory}
						setSelectedCategories={handleCategoryChange}
					/>
				</aside>

				<div className="flex-1 space-y-6">
					{/* Header */}
					<div className="flex flex-wrap gap-4 items-center">
						{/* Search bar */}
						<div className="relative flex-1 min-w-[200px]">
							<Search className="absolute left-2.5 top-2.5 w-4 h-4 text-muted-foreground" />
							<Input
								type="search"
								placeholder={txt("header.search")}
								className="pl-8"
							/>
						</div>

						{/* Sort by */}
						<Select value={sortBy} onValueChange={handleSortChange}>
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder={txt("header.filterBy.placeHolder")} />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="name">
									{txt("header.filterBy.name")}
								</SelectItem>
								<SelectItem value="rating">
									{txt("header.filterBy.rated")}
								</SelectItem>
								<SelectItem value="newest">
									{txt("header.filterBy.newest")}
								</SelectItem>
							</SelectContent>
						</Select>

						{/* Items per page */}
						<SelectGroup className="flex items-center">
							<SelectLabel>{txt("header.items.title")}</SelectLabel>
							<Select
								value={itemsPerPage.toString()}
								onValueChange={handleItemsPerPageChange}>
								<SelectTrigger className="w-[75px]">
									<SelectValue placeholder="Items per page" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="6">6</SelectItem>
									<SelectItem value="9">9</SelectItem>
									<SelectItem value="12">12</SelectItem>
								</SelectContent>
							</Select>
						</SelectGroup>

						{/* Filter sidebar to small screens */}
						<Sheet>
							<SheetTrigger asChild>
								<Button variant="outline" className="xl:hidden">
									<Filter className="mr-2 h4- w-4" />
									{txt("sortBar.title")}
									{selectedCategory.length > 0 && (
										<Badge variant="secondary" className="ml-2">
											{selectedCategory.length}
										</Badge>
									)}
								</Button>
							</SheetTrigger>
							<SheetContent side="left" className="p-4">
								<SheetHeader>
									<SheetTitle className="flex items-center justify-between mt-4">
										{txt("sortBar.filters")}{" "}
										{selectedCategory.length > 0 && (
											<Button
												variant="outline"
												size="sm"
												onClick={() => handleCategoryChange([])}
												className="hover:text-black border-primary  transition-colors duration-150">
												{txt("sortBar.clear")}
											</Button>
										)}
									</SheetTitle>
								</SheetHeader>
								<FilterSidebar
									selectedCategories={selectedCategory}
									setSelectedCategories={handleCategoryChange}
								/>
							</SheetContent>
						</Sheet>
					</div>

					{/* Currently selected categories */}
					{selectedCategory.length > 0 && (
						<div className="flex gap-2 flex-wrap">
							{selectedCategory.map((category) => (
								<Badge
									key={category}
									variant="secondary"
									className="flex items-center gap-1">
									{category}
									<button
										type="button"
										title="clear categories"
										onClick={() =>
											handleCategoryChange(
												selectedCategory.filter((cat) => cat !== category)
											)
										}
										className="ml-1 hover:text-destructive transition-colors duration-150">
										<X className="h-3 w-3" />
									</button>
								</Badge>
							))}
							<Button
								variant="outline"
								size="sm"
								onClick={() => handleCategoryChange([])}
								className="transition-colors duration-150 border-secondary hover:bg-secondary hover:text-white">
								Clear all
							</Button>
						</div>
					)}

					{/* Business grid */}
					{status === "pending" ? (
						<div className="flex flex-col gap-4 items-center justify-center h-full">
							<MagnifyingGlass
								visible={true}
								height="120"
								width="120"
								ariaLabel="magnifying-glass-loading"
								wrapperStyle={{}}
								wrapperClass="magnifying-glass-wrapper"
								glassColor="#c0efff"
								color="#e15b64"
							/>
							<p className="text-muted-foreground text-xl">Searching...</p>
						</div>
					) : error ? (
						<ErrorBoundary error={error} reset={refetchBusiness} />
					) : (
						business &&
						business.data && (
							<>
								<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
									{filteredBusiness?.map((business) => (
										<BusinessCard key={business.id} business={business} />
									))}
								</div>
								{/* Pagination */}
								<div className="flex justify-center items-center gap-2 mt-8">
									<Button
										variant="outline"
										size="icon"
										onClick={() => handlePageChange(currentPage - 1)}
										disabled={!business.prev}>
										<ChevronLeft className="h-4 w-4" />
									</Button>
									{Array.from({ length: totalPages }, (_, i) => i + 1).map(
										(page) => (
											<Button
												key={page}
												variant={currentPage === page ? "default" : "outline"}
												size="icon"
												onClick={() => handlePageChange(page)}>
												{page}
											</Button>
										)
									)}
									<Button
										variant="outline"
										size="icon"
										onClick={() => handlePageChange(currentPage + 1)}
										disabled={!business.next}>
										<ChevronRight className="h-4 w-4" />
									</Button>
								</div>
							</>
						)
					)}
				</div>
			</div>
		</div>
	);
}
