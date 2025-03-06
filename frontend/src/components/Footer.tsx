"use client";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function Footer() {
	const t = useTranslations("Footer");

	return (
		<footer className="w-full border-t py-6 md:py-0">
			<div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row mx-auto max-w-[1400px]">
				<div className="flex items-center gap-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 300 100"
						className="h-12 w-auto">
						<g fill="#003366">
							<rect x="10" y="40" width="40" height="30" />
							<polygon points="10,40 30,20 50,40" />
							<circle cx="90" cy="30" r="10" />
							<rect x="80" y="40" width="20" height="30" />
							<path
								d="M50,55 Q70,25 90,35"
								stroke="#66CC99"
								strokeWidth="2"
								fill="none"
							/>
							<circle cx="60" cy="40" r="2" fill="#66CC99" />
							<circle cx="70" cy="30" r="2" fill="#66CC99" />
							<circle cx="80" cy="35" r="2" fill="#66CC99" />
						</g>
						<text
							x="110"
							y="60"
							fontFamily="Arial, sans-serif"
							fontSize="40"
							fill="#003366">
							<tspan fontWeight="bold" fill="#66CC99">
								Nego
							</tspan>
							<tspan fontWeight="normal" className="dark:fill-white">
								Prox
							</tspan>
						</text>
					</svg>
				</div>
				<p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
					{t("label")}
				</p>
				<div className="flex gap-4">
					<Link
						href="#"
						className="text-sm font-medium hover:underline hover:text-teal-400">
						{t("terms")}
					</Link>
					<Link
						href="#"
						className="text-sm font-medium hover:underline hover:text-teal-400">
						{t("privacy")}
					</Link>
					<Link
						href="#"
						className="text-sm font-medium hover:underline hover:text-teal-400">
						{t("contact")}
					</Link>
				</div>
			</div>
		</footer>
	);
}
