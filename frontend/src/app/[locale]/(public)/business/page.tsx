"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Filter, Search, X } from "lucide-react";

import {
	Select,
	SelectContent,
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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import BusinessCard from "@/components/BusinessCard";
import FilterSidebar from "@/components/FilterSidebar";
import { useBusiness } from "@/hooks/useBusiness";
import Loading from "@/app/loading";
import { SelectGroup } from "@radix-ui/react-select";
import ErrorBoundary from "./error";

export default function Business() {
	const [itemsPerPage, setItemsPerPage] = useState(6);
	const { business, refetchBusiness, status, error } = useBusiness(
		1,
		itemsPerPage
	);

	const [sortBy, setSortBy] = useState<string>("name");
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [selectedCategory, setSelectedCategory] = useState<string[]>([]);

	// filter and sort business
	const filteredBusiness = business
		?.filter(
			(b) =>
				selectedCategory.length === 0 ||
				selectedCategory.includes(b.categories[0].category.en_name)
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
	const totalPages = Math.ceil(filteredBusiness?.length || 0 / itemsPerPage);
	const currentBusiness = filteredBusiness?.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	return (
		<div className="container mx-auto max-w-[1400px] px-4 py-8">
			<div className="flex flex-col md:flex-row gap-8">
				{/* Filter sidebar to large screens */}
				<aside className="hidden xl:block w-64 sticky top-24 h-fit">
					<FilterSidebar
						selectedCategories={selectedCategory}
						setSelectedCategories={setSelectedCategory}
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
								placeholder="Search business..."
								className="pl-8"
							/>
						</div>

						{/* Sort by */}
						<Select value={sortBy} onValueChange={setSortBy}>
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="Sort by" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="name">Name</SelectItem>
								<SelectItem value="rating">Highest Rating</SelectItem>
								<SelectItem value="newest">Newest First</SelectItem>
							</SelectContent>
						</Select>

						{/* Items per page */}
						<SelectGroup className="flex items-center">
							<SelectLabel>No. Items</SelectLabel>
							<Select
								value={itemsPerPage.toString()}
								onValueChange={(value) => setItemsPerPage(Number(value))}>
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
									Filter
									{selectedCategory.length > 0 && (
										<Badge variant="secondary" className="ml-2">
											{selectedCategory.length}
										</Badge>
									)}
								</Button>
							</SheetTrigger>
							<SheetContent side="left" className="p-4">
								<SheetHeader>
									<SheetTitle>
										Filters{" "}
										{selectedCategory.length > 0 && (
											<Button
												variant="ghost"
												size="sm"
												onClick={() => setSelectedCategory([])}
												className="hover:text-black transition-colors duration-150">
												Clear all
											</Button>
										)}
									</SheetTitle>
									Too many re-renders. React limits the number of renders to
									prevent an infinite loop.
								</SheetHeader>
								<FilterSidebar
									selectedCategories={selectedCategory}
									setSelectedCategories={setSelectedCategory}
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
											setSelectedCategory((prev) =>
												prev.filter((cat) => cat !== category)
											)
										}
										className="ml-1 hover:text-destructive transition-colors duration-150">
										<X className="h-3 w-3" />
									</button>
								</Badge>
							))}
							<Button
								variant="ghost"
								size="sm"
								onClick={() => setSelectedCategory([])}
								className="hover:text-black transition-colors duration-150">
								Clear all
							</Button>
						</div>
					)}

					{/* Business grid */}
					{status === "pending" ? (
						<Loading />
					) : error ? (
						<ErrorBoundary error={error} reset={refetchBusiness} />
					) : (
						business && (
							<>
								<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
									{currentBusiness?.map((business) => (
										<BusinessCard key={business.id} business={business} />
									))}
								</div>
								{/* Pagination */}
								<div className="flex justify-center items-center gap-2 mt-8">
									<Button
										variant="outline"
										size="icon"
										onClick={() =>
											setCurrentPage((prev) => Math.max(prev - 1, 1))
										}>
										<ChevronLeft className="h-4 w-4" />
									</Button>
									{Array.from({ length: totalPages }, (_, i) => i + 1).map(
										(page) => (
											<Button
												key={page}
												variant={currentPage === page ? "default" : "outline"}
												size="icon"
												onClick={() => setCurrentPage(page)}>
												{page}
											</Button>
										)
									)}
									<Button
										variant="outline"
										size="icon"
										onClick={() =>
											setCurrentPage((prev) => Math.min(prev + 1, totalPages))
										}
										disabled={currentPage === totalPages}>
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
