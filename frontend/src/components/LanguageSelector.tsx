"use client";
import { Globe } from "lucide-react";
import { useEffect, useState } from "react";
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

	const languages = {
		en: "English",
		es: "Español",
	};

	useEffect(() => {
		const currentLang = pathname.split("/")[1];
		if (currentLang in languages) {
			setLanguage(currentLang);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname]);

	const changeLanguage = (newLocale: string) => {
		const currentLang = pathname.split("/")[1];
		let newPath;
		if (currentLang in languages) {
			newPath = pathname.replace(`/${currentLang}`, `/${newLocale}`);
		} else {
			newPath = `/${newLocale}${pathname}`;
		}

		setLanguage(newLocale);
		router.push(newPath);
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
