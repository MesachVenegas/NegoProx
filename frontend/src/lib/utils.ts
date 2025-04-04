import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * A shorthand for `twMerge(clsx(inputs))` that combines multiple class names or
 * objects into a single class string.
 *
 * @param inputs - Class names or objects to combine.
 * @returns A single class string.
 *
 * @example
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Format a Date object into a string of the form "HH:MM".
 *
 * @param timeString - The Date object to format.
 * @returns A string of the form "HH:MM".
 *
 * @example
 * formatTime(new Date("2022-07-01T12:00:00Z")) // "12:00"
 */
export function formatTime(timeString: Date) {
	const date = new Date(timeString);
	return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

/**
 * Given a day of the week as a number (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
 * and a locale, returns the name of the day in that locale.
 *
 * @param dayOfWeek - The day of the week as a number.
 * @param locale - The locale to return the day name in. Currently only supports
 *     "en" for English and "es" for Spanish.
 * @returns The name of the day in the given locale.
 *
 * @example
 * getDayName(0, "en") // "Sunday"
 * getDayName(1, "es") // "Lunes"
 */
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

/**
 * Format a number as a price in Mexican pesos.
 *
 * @param price - The price to format.
 * @returns The price formatted as a string, e.g. "$1,234.00".
 *
 * @example
 * formatPrice(1234) // "$1,234.00"
 */
export function formatPrice(price: number, locale?: string) {
	return new Intl.NumberFormat(locale || "es-MX", {
		style: "currency",
		currency: "MXN",
	}).format(price);
}
