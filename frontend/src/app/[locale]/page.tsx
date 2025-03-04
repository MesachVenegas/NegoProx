import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Home() {
	const t = useTranslations("HomePage");

	return (
		<div className="flex-1 flex flex-col items-center">
			{/* Hero sections */}
			<section className="w-full min-h-[750px] relative">
				<div className="absolute inset-0 z-0">
					<Image
						src="https://picsum.photos/1000/800"
						alt="Hero image"
						fill
						objectFit="cover"
						priority
					/>
					<div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-transparent" />
				</div>
				<div className="container mx-auto max-w-[1400px] px-4 md:px-6 relative z-10 h-full py-12 md:py-24 lg:py-32">
					<div className="grid gap-6 lg:grid-cols-2 lg:gap-1 items-center">
						<div className="flex flex-col justify-center space-y-4 text-white">
							<div className="space-y-2">
								<h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
									{t("hero.title")}
								</h1>
								<p className="max-w-[600px] text-gray-200 md:text-xl">
									{t("hero.subtitle")}
								</p>
							</div>
							<div className="flex flex-col gap-2 min-[400px]:flex-row">
								<Button size="lg" className="px-8">
									<Link href="/business">{t("hero.button1")}</Link>
								</Button>
								<Button
									size="lg"
									variant="outline"
									className="bg-white/10 hover:bg-white/20 hover:text-white backdrop-blur supports-[backdrop-filter]:bg-white/5">
									<Link href="/register/business">{t("hero.button2")}</Link>
								</Button>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
