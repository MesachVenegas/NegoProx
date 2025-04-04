import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatTime(timeString: Date) {
	const date = new Date(timeString);
	return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function getDayName(dayOfWeek: number, locale: string) {
	const enDays = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	const esDays = [
		"Domingo",
		"Lunes",
		"Martes",
		"Miércoles",
		"Jueves",
		"Viernes",
		"Sábado",
	];

	if (locale === "en") return enDays[dayOfWeek];
	if (locale === "es") return esDays[dayOfWeek];

	return "";
}

export function formatPrice(price: number) {
	return new Intl.NumberFormat("es-Mx", {
		style: "currency",
		currency: "MXN",
	}).format(price);
}
