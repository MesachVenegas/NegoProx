export interface ServiceProps {
	id: number;
	name: string;
	description: string;
	price: string;
	date: string;
}

export type BusinessProps = {
	id: string;
	name: string;
	description: string;
	address: string;
	latitude: number;
	longitude: number;
	phone: string;
	createdAt: Date;
	updatedAt: Date;
};
