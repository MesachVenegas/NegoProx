"use client";
import Image from "next/image";
// CalendarDays,
import { MapPin, Star } from "lucide-react";

// import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Link } from "@/i18n/navigation";
import { Card, CardContent } from "./ui/card";
import { BusinessData } from "@/types/business";
import { useTranslations } from "next-intl";

export default function BusinessCard({ business }: { business: BusinessData }) {
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
