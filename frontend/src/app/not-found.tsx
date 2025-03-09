import Link from "next/link";
import { ArrowLeft, Home, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";

export const metadata = {
	title: "404 Not Found",
	description: "Not found page",
};

export default async function NotFound() {
	const t = await getTranslations();

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-background to-secondary/20 text-foreground px-4 overflow-hidden">
			<div className="max-w-md text-center relative z-10">
				<h1 className="text-9xl font-extrabold mb-4 text-primary animate-in">
					404
				</h1>
				<h2 className="text-2xl font-semibold mb-4 animate-in delay-300">
					{t("NotFound.title")}
				</h2>
				<p className="text-muted-foreground mb-8 animate-in delay-300">
					{t("NotFound.description")}
				</p>
				<div className="flex flex-col sm:flex-row gap-4 justify-center animate-in delay-500">
					<Button asChild>
						<Link href="/" className="flex items-center">
							<Home className="mr-2 h-4 w-4" />
							{t("NotFound.backhome")}
						</Link>
					</Button>
					<Button variant="outline" asChild>
						<Link
							href="/businesses"
							className="flex items-center hover:text-black transition-all duration-200">
							<Search className="mr-2 h-4 w-4" />
							{t("NotFound.search")}
						</Link>
					</Button>
				</div>
				<div className="mt-8 animate-in delay-700">
					<Link
						href="javascript:history.back()"
						className="text-primary hover:underline inline-flex items-center">
						<ArrowLeft className="mr-2 h-4 w-4" />
						{t("NotFound.goBack")}
					</Link>
				</div>
			</div>

			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-primary/20 animate-pulse" />
				<div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-secondary/30 animate-pulse" />
			</div>
		</div>
	);
}
