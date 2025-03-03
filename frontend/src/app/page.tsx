"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
	const router = useRouter();

	useEffect(() => {
		const userLocale = navigator.language.split("-")[0];
		const supportedLocales = ["es", "en"];
		const defaultLocale = "es";

		const redirectLocale = supportedLocales.includes(userLocale)
			? userLocale
			: defaultLocale;

		router.push(`/${redirectLocale}`);
	}, [router]);

	return <div>Cargando...</div>;
}
