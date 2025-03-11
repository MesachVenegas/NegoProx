import { Metadata } from "next";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Star } from "lucide-react";

import BusinessServices from "@/components/containers/BusinessServices";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { business } from "@/lib/constants/business";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ id: string }>;
}): Promise<Metadata> {
	const { id } = await params;
	const business = "Business Profile";

	return {
		title: `${business} ${id}`,
		description: `Business profile`,
	};
}

export default async function BusinessProfile({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	// example business data

	return (
		<div className="container mx-auto max-w-[1400px] min-h-screen px-4 py-8">
			<div className="grid gap-6 md:grid-cols-3">
				<div className="md:col-span-2 space-y-6">
					<div className="relative h-64 md:h-96">
						<Image
							src="https://picsum.photos/600/300"
							alt={business.name}
							fill
							sizes="(min-width: 1024px) 600px, 100vw"
							placeholder="blur"
							quality={85}
							blurDataURL="https://picsum.photos/600/300"
							className="rounded-lg"
						/>
					</div>
					<div>
						<h1 className="text-3xl font-bold">
							{business.name} {id}
						</h1>
						<div className="flex items-center mt-2">
							<Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
							<span className="ml-1 font-semibold">{business.rating}</span>
							<span className="ml-1 text-muted-foreground">
								({business.reviews} reviews)
							</span>
						</div>
					</div>
					<p className="text-muted-foreground">{business.description}</p>

					{/* Services cards */}
					<div className="space-y-4">
						<BusinessServices services={business.services} />
					</div>
				</div>

				{/* Business info */}
				<div className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>Business Information</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex items-center">
								<MapPin className="w-5 h-5 mr-2" />
								<span>{business.address}</span>
							</div>
							<div className="flex items-center">
								<Phone className="w-5 h-5 mr-2" />
								<span>{business.phone}</span>
							</div>
							<div className="flex items-center">
								<Link
									href={`https://${business.website}`}
									target="_blank"
									rel="noopener noreferrer"
									className="text-primary hover:underline">
									{business.website}
								</Link>
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>Business Hours</CardTitle>
						</CardHeader>
						<CardContent>
							<ul className="space-y-2">
								{business.hours.map((schedule, index) => (
									<li key={index} className="flex justify-between">
										<span>{schedule.day}</span>
										<span>{schedule.hours}</span>
									</li>
								))}
							</ul>
						</CardContent>
					</Card>
					<Button
						variant="outline"
						className="w-full text-primary border-primary transition-colors duration-200 cursor-pointer dark:hover:text-black/80">
						Book Appointment
					</Button>
				</div>
			</div>

			<div className="mt-12 space-y-8">
				<h2 className="text-2xl font-semibold">Customer Reviews</h2>
				{/* Reviews list */}
			</div>
		</div>
	);
}
