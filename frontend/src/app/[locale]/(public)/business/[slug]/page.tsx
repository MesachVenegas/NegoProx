import { Metadata } from "next";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Star } from "lucide-react";

import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getBusinessProfile } from "@/data/business";
import BusinessServices from "@/components/containers/BusinessServices";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Suspense } from "react";
import Loading from "@/app/loading";
import { Days } from "@/lib/constants/business";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const business = await getBusinessProfile(slug);

	if (!business) {
		return {
			title: "Business Not Found",
			description: "The requested business was not found",
		};
	}
	return {
		title: business.name,
		description:
			business.description || `Business Profile for ${business.name}`,
		openGraph: {
			title: business.name,
			description:
				business.description || `Business Profile for ${business.name}`,
			images: business.businessProfile?.bannerImage,
		},
	};
}

export default async function BusinessProfile({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const business = await getBusinessProfile(slug);

	if (!business) {
		notFound();
	}

	return (
		<Suspense fallback={<Loading />}>
			<div className="container mx-auto max-w-[1400px] min-h-screen px-4 py-8">
				<div className="grid gap-6 md:grid-cols-3">
					<div className="md:col-span-2 space-y-6">
						<div className="relative h-64 md:h-96">
							<Image
								src={
									business.businessProfile?.bannerImage ||
									"https://picsum.photos/600/300"
								}
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
							<h1 className="text-3xl font-bold">{business.name}</h1>
							<div className="flex items-center mt-2">
								<Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
								<span className="ml-1 font-semibold">{business.rateAvg}</span>
								<span className="ml-1 text-muted-foreground">
									({business.reviews?.length} reviews)
								</span>
							</div>
						</div>
						<p className="text-muted-foreground">{business.description}</p>

						{/* Services cards */}
						<div className="space-y-4">
							{business.services && (
								<BusinessServices services={business.services} />
							)}
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
										href={`https://${business.businessProfile.website}`}
										target="_blank"
										rel="noopener noreferrer"
										className="text-primary hover:underline">
										{business.businessProfile.website}
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
									{business.availability?.map((schedule, index) => (
										<li key={index} className="flex justify-between">
											<span>{Days[schedule.dayOfWeek - 1]}</span>
											<span>
												{new Date(schedule.startTime).toLocaleTimeString()} -{" "}
												{new Date(schedule.endTime).toLocaleTimeString()}
											</span>
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
		</Suspense>
	);
}
