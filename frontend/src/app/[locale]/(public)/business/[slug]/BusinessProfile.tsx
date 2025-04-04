"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Loading from "@/app/loading";
import { getBusinessProfile } from "@/data/business";
import { ReloadContent } from "@/components/ReloadContent";

export default function BusinessProfilePage({ slug }: { slug: string }) {
	const [sortBy, setSortBy] = useState<string>("name");
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [itemsPerPage, setItemsPerPage] = useState<number>(6);
	const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
	const galleryRef = useRef<HTMLDivElement>(null);

	const {
		data: business,
		error,
		status,
		refetch,
	} = useQuery({
		queryKey: [slug],
		queryFn: () => getBusinessProfile(slug),
	});

	const sortedServices = business?.services
		? [...business?.services].sort((a, b) => {
				switch (sortBy) {
					case "price":
						return a.price - b.price;
					case "duration":
						return a.time - b.time;
					default:
						return a.name.localeCompare(b.name);
				}
		  })
		: [];

	const totalPages = Math.ceil(sortedServices.length / itemsPerPage);
	const paginatedServices = sortedServices.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	const nextImage = () => {
		setCurrentImageIndex(
			(prev) => (prev + 1) % (business?.images?.length || 1)
		);
	};

	const prevImage = () => {
		setCurrentImageIndex(
			(prev) =>
				(prev - 1 + (business?.images?.length || 1)) %
				(business?.images?.length || 1)
		);
	};

	const scrollToGallery = () => {
		galleryRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<div className="bg-background">
			{status === "pending" ? (
				<Loading />
			) : error ? (
				<ReloadContent refetch={refetch} />
			) : (
				<div className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] w-full">
					<Image
						src={business?.businessProfile.bannerImage || ""}
						alt={business?.name || ""}
						fill
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						className="object-cover"
						priority
					/>
				</div>
			)}
		</div>
	);
}
