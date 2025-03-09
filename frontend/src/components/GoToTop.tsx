"use client";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "./ui/button";

export default function GoToTop() {
	const [showButton, setShowButton] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const scrollPosition = window.scrollY;
			const windowHeight = window.innerHeight;
			const documentHeight = document.documentElement.scrollHeight;
			const halfwayPoint = documentHeight / 2;

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

	return showButton ? (
		<Button
			onClick={scrollToTop}
			className="fixed bottom-8 right-8 z-50 rounded-full p-3 shadow-lg hover:bg-primary/90 transition-all duration-300 ease-in-out"
			size="icon"
			variant="default">
			<ArrowUp className="h-5 w-5" />
			<span className="sr-only">Go to top</span>
		</Button>
	) : null;
}
