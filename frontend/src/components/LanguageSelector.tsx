"use client";
import { Globe } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export default function LanguageSelector() {
	const router = useRouter();
	const pathname = usePathname();
	const currentLang = useLocale();
	const [language, setLanguage] = useState(currentLang);

	const languages = useMemo(
		() => ({
			en: "English",
			es: "Español",
		}),
		[]
	);

	useEffect(() => {
		if (currentLang in languages) {
			setLanguage(currentLang);
		}
	}, [currentLang, languages]);

	const changeLanguage = (newLocale: string) => {
		const scrollPosition = window.scrollY;
		localStorage.setItem("scrollPosition", scrollPosition.toString());

		router.replace(pathname, { locale: newLocale });
		setLanguage(newLocale);
		router.refresh();
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					size="sm"
					className="w=[120px] justify-start gap-2 hover:text-black">
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
