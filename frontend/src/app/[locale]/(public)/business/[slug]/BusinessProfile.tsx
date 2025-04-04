"use client";
import {
	ChevronLeft,
	ChevronRight,
	Clock,
	Facebook,
	Globe,
	Instagram,
	Linkedin,
	MapPin,
	Phone,
	Share2,
	Star,
	Youtube,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Loading from "@/app/loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getDayName, formatTime, formatPrice } from "@/lib/utils";
import { getBusinessProfile } from "@/data/business";
import { ReloadContent } from "@/components/ReloadContent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BusinessReviews from "@/components/BusinessReviews";

export default function BusinessProfilePage({ slug }: { slug: string }) {
	const locale = useLocale();
	const [sortBy, setSortBy] = useState<string>("name");
	const [currentPage, setCurrentPage] = useState<number>(1);
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
						return Number(a.price) - Number(b.price);
					case "duration":
						return a.time - b.time;
					default:
						return a.name.localeCompare(b.name);
				}
		  })
		: [];

	const totalPages = Math.ceil(sortedServices.length / 9);
	const paginatedServices = sortedServices.slice(
		(currentPage - 1) * 9,
		currentPage * 9
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
				business && (
					<>
						<div className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] w-full">
							<Image
								src={business?.images[currentImageIndex].imageUrl || ""}
								alt={business?.name || ""}
								fill
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
								className="object-cover"
								priority
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

							{/* Gallery Navigation */}
							<div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex justify-between px-4 z-50">
								<Button
									variant="outline"
									size="icon"
									className="bg-black/30 border-primary/20 hover:bg-black/50 hover:text-white"
									onClick={prevImage}>
									<ChevronLeft className="h-6 w-6" />
								</Button>
								<Button
									variant="outline"
									size="icon"
									className="bg-black/30 border-primary/20 hover:bg-black/50 hover:text-white"
									onClick={nextImage}>
									<ChevronRight className="h-6 w-6" />
								</Button>
							</div>
							{/* Image counter */}
							<div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs md:text-sm">
								{currentImageIndex + 1} / {business?.images.length}
							</div>
							{/* Overlar business info */}
							<div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-10 text-white mx-auto max-w-[1400px]">
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5 }}>
									<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
										{business.name}
									</h1>
									<div className="flex items-center mb-4">
										<div className="flex items-center mr-4">
											<Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
											<span className="ml-1 font-semibold">
												{business.rateAvg}
											</span>
											<span className="ml-1 text-white/50">
												({business.reviews?.length} reviews)
											</span>
										</div>
										{business.rateAvg >= 4.5 && (
											<Badge className="bg-primary/60 hover:bg-primary text-white">
												Top Rated
											</Badge>
										)}
									</div>
									<p className="max-w-2xl text-white/90 mb-6 line-clamp-2 md:line-clamp-none">
										{business.description}
									</p>
									<div className="flex flex-wrap gap-3">
										<Button
											className="bg-white hover:bg-white/80"
											onClick={scrollToGallery}>
											View Gallery
										</Button>
										<Button
											variant="outline"
											className="border-primary bg-transparent backdrop-blur-xl transition-all duration-200">
											Book Appointment
										</Button>
										<Button
											variant="outline"
											size="icon"
											className="border-primary bg-transparent backdrop-blur-xl transition-all duration-200">
											<Share2 className="w-5 h-5" />
										</Button>
									</div>
								</motion.div>
							</div>
						</div>
						{/* Content */}
						<div className="container mx-auto max-w-[1400px] px-4 py-8">
							<div className="grid gap-8 md:grid-cols-3 lg:grid-cols-4">
								{/* sidebar info */}
								<div className="md:col-span-1">
									<div className="space-y-6 sticky top-20">
										<Card>
											<CardHeader>
												<CardTitle>Business Information</CardTitle>
											</CardHeader>
											<CardContent className="space-y-4">
												<div className="flex items-center">
													<MapPin className="w-5 h-5 mr-3 text-primary" />
													<span>{business.address}</span>
												</div>
												<div className="flex items-center">
													<Phone className="w-5 h-5 mr-3 text-primary" />
													<span>{business.phone}</span>
												</div>
												<div className="flex items-center">
													<Globe className="w-5 h-5 mr-3 text-primary" />
													<Link
														href={business.businessProfile.website}
														target="_blank"
														rel="noopener noreferrer"
														prefetch={false}
														className="text-primary hover:underline">
														{business.businessProfile.website}
													</Link>
												</div>
												<div className="h-[1px] bg-foreground/40 w-full" />
												<div className="flex flex-col items-center gap-4 w-full">
													<h2 className="text-center">Social Media</h2>
													<div className="flex items-center justify-center gap-2">
														{business.businessProfile.socialMedia.facebook && (
															<Link
																href={
																	business.businessProfile.socialMedia.facebook
																}
																target="_blank"
																rel="noopener noreferrer"
																className="text-muted-foreground hover:text-primary">
																<Facebook className="w-5 h-5" />
															</Link>
														)}
														{business.businessProfile.socialMedia.instagram && (
															<Link
																href={
																	business.businessProfile.socialMedia.instagram
																}
																target="_blank"
																rel="noopener noreferrer"
																className="text-muted-foreground hover:text-primary">
																<Instagram className="w-5 h-5" />
															</Link>
														)}
														{business.businessProfile.socialMedia.linkedin && (
															<Link
																href={
																	business.businessProfile.socialMedia.linkedin
																}
																target="_blank"
																rel="noopener noreferrer"
																className="text-muted-foreground hover:text-primary">
																<Linkedin className="w-5 h-5" />
															</Link>
														)}
														{business.businessProfile.socialMedia.tiktok && (
															<Link
																href={
																	business.businessProfile.socialMedia.tiktok
																}
																target="_blank"
																rel="noopener noreferrer"
																className="text-muted-foreground hover:text-primary">
																<Facebook className="w-5 h-5" />
															</Link>
														)}
														{business.businessProfile.socialMedia.youtube && (
															<Link
																href={
																	business.businessProfile.socialMedia.youtube
																}
																target="_blank"
																rel="noopener noreferrer"
																className="text-muted-foreground hover:text-primary">
																<Youtube className="w-5 h-5" />
															</Link>
														)}
													</div>
												</div>
											</CardContent>
										</Card>
										{/* Bussines Availability */}
										<Card>
											<CardHeader>
												<CardTitle>Business Hours</CardTitle>
											</CardHeader>
											<CardContent>
												<ul className="space-y-2">
													{business.availability.map((availability) => (
														<li
															key={availability.id}
															className="flex justify-between items-center">
															<span className="font-medium">
																{getDayName(availability.dayOfWeek, locale)}
															</span>
															<span>
																{formatTime(availability.startTime)} ~{" "}
																{formatTime(availability.endTime)}
															</span>
														</li>
													))}
												</ul>
											</CardContent>
										</Card>
										{/* Location */}
										<Card>
											<CardHeader>
												<CardTitle>Location</CardTitle>
											</CardHeader>
											<CardContent>
												<div className="aspect-video relative rounded-md overflow-hidden"></div>
												<Button
													variant="outline"
													className="w-full mt-3 transition-all duration-150 ease-in"
													onClick={() =>
														window.open(
															`https://www.google.com/maps/dir/?api=1&destination=${business.latitude},${business.longitude}`,
															"_blank"
														)
													}>
													<MapPin className="w-4 h-4 mr-2" />
													Get Directions
												</Button>
											</CardContent>
										</Card>
										<Button className="w-full">Book Appointment</Button>
									</div>
								</div>
								{/* Main Content */}
								<div className="md:col-span-2 lg:col-span-3 space-y-8">
									{/* About */}
									<Card>
										<CardHeader>
											<CardTitle>About {business.name}</CardTitle>
										</CardHeader>
										<CardContent>
											<p className="text-muted-foreground">
												{business.description}
											</p>
											<p className="text-muted-foreground mt-4">
												We pride ourselves on creating a welcoming environment
												where clients can relax and enjoy premium beauty
												services. Our team of skilled professionals stays
												up-to-date with the latest trends and techniques to
												provide you with exceptional results. We use only
												high-quality products and maintain the highest standards
												of cleanliness and safety.
											</p>
										</CardContent>
									</Card>
									{/* Gallery */}
									<div ref={galleryRef}>
										<h2 className="text-2xl font-semibold mb-4">Gallery</h2>
										<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
											{business.images.length > 0 &&
												business.images.map((image, index) => (
													<motion.div
														key={image.id}
														whileHover={{ scale: 1.02 }}
														transition={{ duration: 0.2 }}
														className="relative aspect-square rounded-lg overflow-hidden cursor-pointer"
														onClick={() => setCurrentImageIndex(index)}>
														<Image
															src={image.imageUrl || ""}
															alt={`Image${index + 1}`}
															fill
															className="object-cover hover:brightness-90 transition-all"
														/>
													</motion.div>
												))}
										</div>
									</div>
									{/* Services */}
									<div>
										<div className="flex justify-between items-center mb-4">
											<h2 className="text-2xl font-semibold">Services</h2>
											{/* Sort */}
											<Select value={sortBy} onValueChange={setSortBy}>
												<SelectTrigger className="w-[180px]">
													<SelectValue placeholder="Sort by" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="name">Sort by Name</SelectItem>
													<SelectItem value="price">Sort by Price</SelectItem>
													<SelectItem value="duration">
														Sort by Duration
													</SelectItem>
												</SelectContent>
											</Select>
										</div>
										{/* Services Grid */}
										<div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
											{paginatedServices.map((service) => (
												<motion.div
													key={service.id}
													initial={{ opacity: 0, y: 20 }}
													animate={{ opacity: 1, y: 0 }}
													transition={{ duration: 0.3 }}>
													<Card className="overflow-hidden h-full flex flex-col">
														<div className="relative h-48">
															<Image
																src={
																	"https://www.suac.ac.jp/archives/data/00091/file/19559/noimage.png"
																}
																alt={service.name}
																fill
																className="object-cover h-full w-full"
															/>
														</div>
														<CardHeader>
															<div className="flex justify-between items-start">
																<CardTitle>{service.name}</CardTitle>
																<div className="text-right">
																	<span className="font-bold text-lg text-primary">
																		{formatPrice(service.price)}
																	</span>
																	<div className="flex items-center text-sm text-muted-foreground">
																		<Clock className="w-4 h-4 mr-1" />
																		{service.time} minutes
																	</div>
																</div>
															</div>
														</CardHeader>
														<CardContent className="flex-grow">
															<p className="text-muted-foreground">
																{service.description}
															</p>
														</CardContent>
														<div className="p-4 pt-0 mt-auto">
															<Button>Book Now</Button>
														</div>
													</Card>
												</motion.div>
											))}
										</div>
										{/* Pagination */}
										{totalPages > 1 && (
											<div className="flex justify-center items-center space-x-2 mt-6">
												<Button
													variant="outline"
													size="icon"
													disabled={currentPage === 1}
													onClick={() =>
														setCurrentPage((prev) => Math.max(prev - 1, 1))
													}>
													<ChevronLeft className="w-4 h-4" />
												</Button>
												<span>
													Page {currentPage} of {totalPages}
												</span>
												<Button
													variant="outline"
													size="icon"
													disabled={currentPage === totalPages}
													onClick={() =>
														setCurrentPage((prev) =>
															Math.min(prev + 1, totalPages)
														)
													}>
													<ChevronRight className="w-4 h-4" />
												</Button>
											</div>
										)}
									</div>
									{/* Reviews */}
									<div>
										<div className="flex justify-between items-center mb-4">
											<h2 className="text-2xl font-semibold">
												Customer Reviews
											</h2>
										</div>
										<Card>
											<CardContent className="p-6">
												<div className="flex items-center justify-between mb-6">
													<div className="flex items-center">
														<div className="mr-4">
															<span className="text-4xl font-bold">
																{business.rateAvg}
															</span>
															<span className="text-xl text-muted-foreground">
																/5
															</span>
														</div>
														<div className="flex">
															{[...Array(5)].map((_, index) => (
																<Star
																	key={index}
																	className={`w-5 h-5 ${
																		index < Math.floor(business.rateAvg)
																			? "fill-yellow-400 text-yellow-400"
																			: index < business.rateAvg
																			? "fill-yellow-400/50 text-yellow-400/50"
																			: "fill-muted text-muted"
																	}`}
																/>
															))}
														</div>
													</div>
													<div className="text-right">
														<div className="text-lg font-semibold">
															{business.reviews?.length}
														</div>
														<div className="text-sm text-muted-foreground">
															Total Reviews
														</div>
													</div>
												</div>
												<Tabs defaultValue="recent">
													<TabsList className="mb-4">
														<TabsTrigger value="recent">Recent</TabsTrigger>
														<TabsTrigger value="highest">Highest</TabsTrigger>
														<TabsTrigger value="lowest">Lowest</TabsTrigger>
													</TabsList>
													<TabsContent value="recent">
														<BusinessReviews id={business.id} sortBy="recent" />
													</TabsContent>
													<TabsContent value="highest">
														<BusinessReviews
															id={business.id}
															sortBy="highest"
														/>
													</TabsContent>
													<TabsContent value="lowest">
														<BusinessReviews id={business.id} sortBy="lowest" />
													</TabsContent>
												</Tabs>
											</CardContent>
										</Card>
									</div>
								</div>
							</div>
						</div>
					</>
				)
			)}
		</div>
	);
}
