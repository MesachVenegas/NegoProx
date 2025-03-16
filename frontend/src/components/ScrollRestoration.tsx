"use client";
import { useEffect } from "react";
import { usePathname } from "@/i18n/navigation";

export default function ScrollRestoration() {
	const pathname = usePathname();

	useEffect(() => {
		const restoreScroll = () => {
			const savedPosition = localStorage.getItem("scrollPosition");
			if (savedPosition) {
				window.scrollTo({
					top: parseInt(savedPosition),
					behavior: "smooth",
				});
				localStorage.removeItem("scrollPosition");
			}
		};

		restoreScroll();

		window.addEventListener("load", restoreScroll);

		const timer = setTimeout(restoreScroll, 300);

		return () => {
			window.removeEventListener("load", restoreScroll);
			clearTimeout(timer);
		};
	}, [pathname]);

	return null;
}
