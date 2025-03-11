"use client";

import { startTransition } from "react";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

type Props = {
	error: Error;
	reset: () => void;
};

export default function ErrorBoundary({ error, reset }: Props) {
	const router = useRouter();
	const txt = useTranslations("ErrorPage");

	function reload() {
		startTransition(() => {
			router.refresh();
			reset();
		});
	}

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-background to-secondary/20 text-foreground px-4 overflow-hidden">
			<div className="max-w-1/2 text-center relative z-10 space-y-6">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
					<rect width="800" height="500" fill="transparent" />
					<circle cx="400" cy="250" r="180" fill="#f1f3f5" />

					<rect
						x="320"
						y="180"
						width="160"
						height="220"
						rx="10"
						fill="#dee2e6"
					/>
					<rect
						x="330"
						y="190"
						width="140"
						height="200"
						rx="5"
						fill="#343a40"
					/>

					<circle cx="350" cy="210" r="6" fill="#ff6b6b" />
					<circle cx="350" cy="210" r="3" fill="#fa5252" />
					<circle cx="375" cy="210" r="6" fill="#fcc419" />
					<circle cx="375" cy="210" r="3" fill="#fab005" />
					<circle cx="400" cy="210" r="6" fill="#40c057" />
					<circle cx="400" cy="210" r="3" fill="#37b24d" />

					<rect x="350" y="235" width="100" height="15" rx="2" fill="#495057" />
					<rect x="350" y="260" width="100" height="15" rx="2" fill="#495057" />
					<rect x="350" y="285" width="100" height="15" rx="2" fill="#495057" />
					<rect x="350" y="310" width="100" height="15" rx="2" fill="#495057" />
					<rect x="350" y="335" width="100" height="15" rx="2" fill="#495057" />

					<circle cx="520" cy="180" r="70" fill="#ff8787" opacity="0.9" />
					<rect x="510" y="140" width="20" height="60" rx="4" fill="white" />
					<circle cx="520" cy="220" r="10" fill="white" />

					<path
						d="M320 250 L260 250 L220 180"
						stroke="#adb5bd"
						stroke-width="4"
						stroke-linecap="round"
						stroke-dasharray="7 7"
						fill="none"
						className="stroke-primary"
					/>
					<path
						d="M480 250 L540 250 L580 180"
						stroke="#adb5bd"
						stroke-width="4"
						stroke-linecap="round"
						stroke-dasharray="7 7"
						fill="none"
						className="stroke-secondary"
					/>

					<path
						d="M150 100 L250 100 L250 150 L200 150 L200 200 L150 200 Z"
						stroke="#ced4da"
						stroke-width="2"
						fill="none"
						className="stroke-primary"
					/>
					<path
						d="M550 350 L650 350 L650 300 L600 300 L600 250 L550 250 Z"
						stroke="#ced4da"
						stroke-width="2"
						fill="none"
						className="stroke-secondary"
					/>
					<circle cx="150" cy="100" r="5" fill="#adb5bd" />
					<circle cx="250" cy="150" r="5" fill="#adb5bd" />
					<circle cx="200" cy="200" r="5" fill="#adb5bd" />
					<circle cx="550" cy="350" r="5" fill="#adb5bd" />
					<circle cx="650" cy="300" r="5" fill="#adb5bd" />
					<circle cx="600" cy="250" r="5" fill="#adb5bd" />

					<text
						x="120"
						y="330"
						font-family="monospace"
						font-size="14"
						fill="#868e96">
						10011101
					</text>
					<text
						x="120"
						y="350"
						font-family="monospace"
						font-size="14"
						fill="#868e96">
						01100110
					</text>
					<text
						x="120"
						y="370"
						font-family="monospace"
						font-size="14"
						fill="#868e96">
						11001010
					</text>
					<text
						x="650"
						y="130"
						font-family="monospace"
						font-size="14"
						fill="#868e96">
						00110101
					</text>
					<text
						x="650"
						y="150"
						font-family="monospace"
						font-size="14"
						fill="#868e96">
						11010011
					</text>
					<text
						x="650"
						y="170"
						font-family="monospace"
						font-size="14"
						fill="#868e96">
						01001110
					</text>
				</svg>
				<h1 className="text-3xl font-bold">{txt("title")}</h1>
				<p className="text-muted-foreground">{txt("description")}</p>
				<div className="flex gap-4 items-center justify-center">
					<Button onClick={() => reload()}>{txt("tryAgain")}</Button>
					<Link
						href="/"
						className="flex gap-2 items-center justify-between hover:gap-3 hover:underline border border-primary p-2 rounded-md">
						<ArrowLeft className="h-5 w-5" />
						{txt("backhome")}
					</Link>
				</div>
				<div className="w-full max-w-5xl overflow-hidden mt-6">
					{process.env.NODE_ENV === "development" && (
						<pre className="overflow-scroll text-xs">
							<code>{error.stack}</code>
						</pre>
					)}
				</div>
			</div>
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-primary/20 animate-pulse" />
				<div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-secondary/30 animate-pulse" />
			</div>
		</div>
	);
}
