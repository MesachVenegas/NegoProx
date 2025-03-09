"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Filter, Search, X } from "lucide-react";

import {
	Select,
	SelectContent,
	SelectItem,
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

export default function Business() {
	const [sortBy, setSortBy] = useState<string>("name");
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
	const itemsPerPage = 9;

	// example data
	const business = Array.from({ length: 20 }, (_, i) => ({
		id: i + 1,
		name: `Business ${i + 1}`,
		rating: (4 + Math.random()).toFixed(1),
		image: `https://picsum.photos/400/200?random=${i + 1}`,
		description:
			"lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
		category: ["Health & Wellness", "Food & Dining", "Retail", "Travel"][
			Math.floor(Math.random() * 5)
		],
		location: ["Tijuana", "Tecate", "San Diego", "Mexicali", "Ensenada"][
			Math.floor(Math.random() * 5)
		],
		availability: [true, false][Math.floor(Math.random() * 2)],
		createdAt: new Date(2024, 0, i + 1).toISOString(),
	}));

	// filter and sort business
	const filteredBusiness = business
		.filter(
			(b) =>
				selectedCategory.length === 0 || selectedCategory.includes(b.category)
		)
		.sort((a, b) => {
			switch (sortBy) {
				case "name":
					return a.name.localeCompare(b.name);
				case "rating":
					return Number.parseFloat(b.rating) - Number.parseFloat(a.rating);
				case "newest":
					return (
						new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
					);
				default:
					return 0;
			}
		});

	// pagination
	const totalPages = Math.ceil(filteredBusiness.length / itemsPerPage);
	const currentBusiness = filteredBusiness.slice(
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
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						{currentBusiness.map((business) => (
							<BusinessCard key={business.id} business={business} />
						))}
					</div>

					{/* Pagination */}
					<div className="flex justify-center items-center gap-2 mt-8">
						<Button
							variant="outline"
							size="icon"
							onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
							<ChevronLeft className="h-4 w-4" />
						</Button>
						{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
							<Button
								key={page}
								variant={currentPage === page ? "default" : "outline"}
								size="icon"
								onClick={() => setCurrentPage(page)}>
								{page}
							</Button>
						))}
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
				</div>
			</div>
		</div>
	);
}
