"use client";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "./ui/button";
import { usePathname } from "@/i18n/navigation";

export default function GoToTop() {
	const pathname = usePathname();
	const [showButton, setShowButton] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const scrollPosition = window.scrollY;
			const windowHeight = window.innerHeight;
			const documentHeight = document.documentElement.scrollHeight;
			const halfwayPoint = documentHeight / 3;

			setShowButton(scrollPosition > halfwayPoint - windowHeight);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return showButton && ["not-found", "error"].includes(pathname) ? (
		<Button
			onClick={scrollToTop}
			className="fixed bottom-12 right-16 z-50 rounded-full p-2 shadow-lg hover:bg-primary/90 transition-all duration-300 ease-in-out h-10 w-10"
			variant="default">
			<ArrowUp className="h-8 w-8" />
			<span className="sr-only">Go to top</span>
		</Button>
	) : null;
}
