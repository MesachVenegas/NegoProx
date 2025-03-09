"use client";
import { useState } from "react";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ServiceProps } from "@/types/business";
import ServiceCard from "../ServiceCard";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function BusinessServices({
	services,
}: {
	services: ServiceProps[];
}) {
	const [sortBy, setSortBy] = useState<string>("name");
	const [currentPage, setCurrentPage] = useState<number>(1);

	// sort services by name, date, or price
	const sortedServices = [...services].sort((a, b) => {
		if (sortBy === "name") {
			return a.name.localeCompare(b.name);
		} else if (sortBy === "date") {
			return new Date(a.date).getTime() - new Date(b.date).getTime();
		} else {
			return (
				Number.parseFloat(a.price.replace("$", "")) -
				Number.parseFloat(b.price.replace("$", ""))
			);
		}
	});

	// pagination
	const totalPages = Math.ceil(sortedServices.length / 4);
	const paginatedServices = sortedServices.slice(
		(currentPage - 1) * 4,
		currentPage * 4
	);

	return (
		<>
			<div className="flex justify-between items-center">
				<h2 className="text-2xl font-semibold">Services</h2>
				<Select value={sortBy} onValueChange={setSortBy}>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Sort by" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="name">Sort by name</SelectItem>
						<SelectItem value="date">Sort by date</SelectItem>
						<SelectItem value="price">Sort by price</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<div className="grid gap-4 md:grid-cols-2">
				{paginatedServices.map((service) => (
					<ServiceCard key={service.id} service={service} />
				))}
			</div>
			<div className="flex justify-center items-center space-x-2 mt-4">
				<Button
					variant="outline"
					size="icon"
					onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
					disabled={currentPage === 1}>
					<ChevronLeft className="h-4 w-4" />
				</Button>
				<span>
					Page {currentPage} of {totalPages}
				</span>
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
	);
}
