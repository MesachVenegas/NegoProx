export interface UserProps {
	id: string;
	name: string;
	lastName: string;
	email: string;
	emailVerified: boolean;
	phone: number | string;
	isDisabled: boolean;
	_password?: string;
	userType: "USER" | "BUSINESS" | "ADMIN";
	avatar: string;
	registerAt: Date;
}
