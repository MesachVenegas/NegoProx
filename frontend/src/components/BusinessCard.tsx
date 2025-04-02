"use client";
import Image from "next/image";
// CalendarDays,
import { CalendarDays, MapPin, Star } from "lucide-react";

// import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Link } from "@/i18n/navigation";
import { Card, CardContent } from "./ui/card";
import { BusinessData } from "@/types/business";
import { useTranslations } from "next-intl";
import { Skeleton } from "./ui/skeleton";
import { Badge } from "./ui/badge";

export function BusinessCard({ business }: { business: BusinessData }) {
	const txt = useTranslations("BusinessPage.cards");

	return (
		<Card key={business.id} className="overflow-hidden">
			<Link href={`/business/${business.slug}`}>
				<div className="relative">
					<Image
						src={business.businessProfile.bannerImage}
						alt={business.name}
						width={400}
						height={200}
						className="object-cover w-full h-48"
						loading="lazy"
						sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
						quality={85}
					/>
				</div>
				<CardContent className="p-4">
					<div className="space-y-2">
						<div className="flex items-center justify-between">
							<h3 className="font-bold">{business.name}</h3>
							<div className="flex items-center">
								<Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
								<span className="ml-1 text-sm">{business.rateAvg}</span>
							</div>
						</div>
						<p className="text-sm text-muted-foreground line-clamp-3">
							{business.description}
						</p>
						<div className="flex items-center text-sm text-muted-foreground">
							<MapPin className="w-3 h-3 mr-1" />
							<span>{business.address}</span>
						</div>
						<div className="flex items-center justify-end pt-2">
							{/* <Badge
								variant="outline"
								className={`flex items-center ${
									business.availability
										? "text-teal-600 dark:text-teal-400"
										: "text-destructive dark:text-red-500"
								}`}>
								<CalendarDays className="w-3 h-3 mr-1" />
								{business.availability ? "Available today" : "Closed"}
							</Badge> */}
							<Button size="sm" className="hover:text-black">
								{txt("booked")}
							</Button>
						</div>
					</div>
				</CardContent>
			</Link>
		</Card>
	);
}

export function BusinessCardSkeleton() {
	return (
		<div className="w-[300px] rounded-lg bg-muted">
			{/* Image */}
			<div className="relative">
				<Skeleton className="w-full h-48 bg-foreground/10 mt-4" />
				<Skeleton className="absolute top-2 right-2 z-40" />
			</div>
			{/* Card Content */}
			<div className="p-4">
				{/* Title and rate */}
				<div className="flex justify-between">
					<Skeleton className="w-1/2 h-3 bg-foreground/10 mt-4" />
					<Skeleton className="w-1/3 h-3 bg-foreground/10 mt-4" />
				</div>
				{/* Description */}
				<Skeleton className="w-full h-3 bg-foreground/10 mt-4" />
				<Skeleton className="w-full h-3 bg-foreground/10 mt-4" />
				{/* address */}
				<div className="flex justify-start">
					<Skeleton className="w-1/4 h-3 bg-foreground/10 mt-4" />
				</div>
				{/* availability and booked button */}
				<div className="flex justify-between items-center mt-4">
					<Skeleton className="w-1/3 h-5 bg-foreground/10 mt-4" />
					<Skeleton className="w-1/3 h-8 bg-foreground/10 mt-4" />
				</div>
			</div>
		</div>
	);
}

export function BusinessCardFeatured({ item }: { item: BusinessData }) {
	const t = useTranslations("HomePage");

	return (
		<Card className="overflow-hidden group hover:shadow-lg transition-all duration-200">
			<Link key={item.id} href={`/business/${item.slug}`}>
				<div className="relative">
					<Image
						src={item.businessProfile.bannerImage}
						alt={item.name}
						width={400}
						height={200}
						className="object-cover w-full h-48 group-hover:scale-105 transition-all duration-300"
					/>
					<Badge className="absolute top-2 right-2 bg-primary/90 hover:bg-primary">
						{t("featuredBusiness.featured")}
					</Badge>
				</div>
			</Link>
			<CardContent className="p-4">
				<div className="space-y-2">
					<div className="flex items-center justify-between">
						<h3 className="font-bold">{item.name}</h3>
						<div className="flex items-center">
							{Array(5)
								.fill(0)
								.map((_, index) => (
									<svg
										key={index}
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
										className={`w-4 h-4 ${
											index < 4 ? "text-yellow-500" : "text-gray-300"
										}`}>
										<path
											fillRule="evenodd"
											d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
											clipRule="evenodd"
										/>
									</svg>
								))}
						</div>
					</div>
					<p className="text-sm text-muted-foreground line-clamp-3">
						{item.description}
					</p>
					<div className="flex items-center text-sm text-muted-foreground">
						<MapPin className="mr-1 h-3 w-3" />
						<span>{item.address}</span>
					</div>
					<div className="flex items-center justify-between pt-2">
						<Badge variant="outline" className="flex items-center">
							<CalendarDays className="mr-1 h-3 w-3" />
							{t("featuredBusiness.availability")}
						</Badge>
						<Button
							size="sm"
							className="bg-primary/90 hover:bg-primary"
							asChild>
							<Link href={`/business/${item.slug}`}>
								{t("featuredBusiness.appointment")}
							</Link>
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
