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
			<div className="max-w-md text-center relative z-10 space-y-6">
				<h1 className="text-3xl font-bold">{txt("title")}</h1>
				<p className="text-muted-foreground">{txt("description")}</p>
				<div className="max-w-5xl overflow-hidden">
					<pre>
						<code>{error.message}</code>
					</pre>
				</div>
				<div className="flex gap-4 items-center justify-center">
					<Button onClick={() => reload()}>{txt("tryAgain")}</Button>
					<Link
						href="/"
						className="flex gap-2 items-center justify-between hover:gap-3 hover:underline border border-primary p-2 rounded-md">
						<ArrowLeft className="h-5 w-5" />
						{txt("backHome")}
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
