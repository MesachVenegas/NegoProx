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

export interface UserJWTProps {
	sub: string;
	email: string;
	picture?: string;
	role: "USER" | "BUSINESS" | "ADMIN";
	tokenVersion: number;
}

export interface UserLoginProps {
	user: {
		id: string;
		email: string;
		name: string;
		picture: string;
		role: "USER" | "BUSINESS" | "ADMIN";
	};
	access_token: string;
}
