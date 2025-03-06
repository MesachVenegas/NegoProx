"use client";
import { Globe } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

export default function LanguageSelector() {
	const router = useRouter();
	const pathname = usePathname();
	const [language, setLanguage] = useState("en");

	const languages = useMemo(
		() => ({
			en: "English",
			es: "Español",
		}),
		[]
	);

	useEffect(() => {
		const currentLang = pathname.split("/")[1];
		if (currentLang in languages) {
			setLanguage(currentLang);
		}
	}, [pathname, languages]);

	const changeLanguage = (newLocale: string) => {
		const scrollPosition = window.scrollY;
		localStorage.setItem("scrollPosition", scrollPosition.toString());

		const currentLang = pathname.split("/")[1];
		let newPath;
		if (currentLang in languages) {
			newPath = pathname.replace(`/${currentLang}`, `/${newLocale}`);
		} else {
			newPath = `/${newLocale}${pathname}`;
		}

		setLanguage(newLocale);
		router.push(newPath);
		router.refresh();
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					size="sm"
					className="w=[120px] justify-start gap-2">
					<Globe className="h-4 w-4" />
					{languages[language as keyof typeof languages]}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={() => changeLanguage("en")}>
					English
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => changeLanguage("es")}>
					Español
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
