export interface UserProps {
	id: string;
	name: string;
	lastName: string;
	email: string;
	emailVerified: boolean;
	phone: number | string;
	isDisabled: boolean;
	userType: "USER" | "BUSINESS" | "ADMIN";
	avatar: string;
	registerAt: Date;
}

export interface JWTProps {
	sub: string;
	email: string;
	picture?: string;
	role: "USER" | "BUSINESS" | "ADMIN";
	tokenVersion: number;
}

export type UserLoginResponse = {
	user: {
		id: string;
		email: string;
		name: string;
		picture: string;
		role: "USER" | "BUSINESS" | "ADMIN";
	};
	access_token: string;
};
