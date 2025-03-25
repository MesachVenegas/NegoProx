import { Category } from "./category";

export interface ServiceProps {
	id: number;
	name: string;
	description: string;
	price: string;
	date: string;
}

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

export interface BusinessData extends BusinessProps {
	businessProfile: BusinessProfile;
	categories: {
		categoryId: string;
		category: Category;
	}[];
	rateAvg: number;
}
