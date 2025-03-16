export const publicRoutes = [
	"/",
	"/login",
	"/register",
	"/forgot-password",
	"/reset-password",
	"/verify-email",
	"/business",
	"/business/:id",
	"/categories",
	"/categories/:id",
	"/about",
	"/how-it-works",
];

export const protectedRoutes: { [key: string]: string[] } = {
	"/dashboard": ["BUSINESS", "ADMIN"],
	"/profile": ["USER", "BUSINESS", "ADMIN"],
};
