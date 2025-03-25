import { Category } from "./category";
import { ServiceProps } from "./services";

export type BusinessProps = {
	id: string;
	slug: string;
	name: string;
	description: string;
	address: string;
	latitude: number;
	longitude: number;
	phone: string;
	createdAt: Date;
	updatedAt: Date;
};

export type BusinessProfile = {
	id: string;
	bannerImage: string;
	website: string;
	socialMedia: {
		facebook?: string;
		instagram?: string;
		twitter?: string;
		youtube?: string;
		linkedin?: string;
		tiktok?: string;
	};
	createdAt: Date;
	updatedAt: Date;
};

export interface BusinessData extends BusinessProps {
	businessProfile: BusinessProfile;
	categories: {
		categoryId: string;
		category: Category;
	}[];
	services: ServiceProps[];
	availability: {
		id: string;
		dayOfWeek: number;
		startTime: Date;
		endTime: Date;
		businessId: string;
		serviceId: string;
	}[];
	rateAvg: number;
}
