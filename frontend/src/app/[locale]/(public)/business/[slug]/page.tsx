import type { Metadata } from "next";

import BusinessProfilePage from "./BusinessProfile";
import { getBusinessProfile } from "@/data/business";

interface Props {
	params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	try {
		const slug = (await params).slug;
		const business = await getBusinessProfile(slug);
		if (!business) {
			return {
				title: "Negocios Not Found",
				description: "Negocios en México",
			};
		}

		const businessName = encodeURIComponent(business.name);
		const baseUrl = "http://localhost:3000";

		return {
			title: business.name,
			description: business.description,
			openGraph: {
				title: business.name,
				description: business.description,
				url: `${baseUrl}/business/${business.slug}`,
				siteName: "Negoprox",
				images: [
					{
						url:
							business.businessProfile.bannerImage ||
							`/placeholder.svg?height=600&width=800&text=${businessName}`,
						width: 800,
						height: 600,
						alt: business.name,
					},
				],
				locale: "es-MX",
				type: "website",
			},
			alternates: {
				canonical: "/",
				languages: {
					en: `${baseUrl}/en/business/${slug}`,
					es: `${baseUrl}/business/${slug}`,
				},
			},
		};
	} catch (error) {
		console.log(error);
		return {
			title: "Negocios Not Found",
			description: "Negocios en México",
		};
	}
}

export default async function Page({ params }: Props) {
	const slug = (await params).slug;
	return <BusinessProfilePage slug={slug} />;
}
