import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Link } from "@/i18n/navigation";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Home() {
	const t = useTranslations("HomePage");

	return (
		<div className="flex-1 flex flex-col items-center">
			{/* Hero sections */}
			<section className="w-full min-h-[600px] relative">
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
				<div className="container mx-auto max-w-[1400px] px-4 md:px-6 relative z-10 h-full py-12 md:py-24 lg:py-32 flex items-center">
					<div className="max-w-[800px]">
						<h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-white mb-6">
							{t("hero.title")}
						</h1>
						<p className="max-w-[600px] text-gray-200 md:text-xl">
							{t("hero.subtitle")}
						</p>
						<div className="flex flex-col gap-4 sm:flex-row mt-6">
							<Button size="lg" className="px-8">
								<Link href="/business">{t("hero.button1")}</Link>
							</Button>
							<Button
								size="lg"
								variant="outline"
								className="bg-white/10 hover:bg-white/20 border-white/50 text-white hover:text-white backdrop-blur supports-[backdrop-filter]:bg-white/5">
								<Link href="/register/business">{t("hero.button2")}</Link>
							</Button>
						</div>
					</div>
				</div>
			</section>

			{/* Search section */}
			<section className="w-full py-12 md:py-16 lg:py-20">
				<div className="container mx-auto max-w-[1400px] px-4 md:px-6">
					<div className="mx-auto max-w-[800px] space-y-4">
						<div className="text-center space-y-2">
							<h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
								{t("search.title")}
							</h2>
							<p className="text-muted-foreground">{t("search.description")}</p>
						</div>
						<div className="flex flex-col sm:flex-row gap-4">
							<div className="relative flex-1">
								<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
								<Input
									type="search"
									placeholder={t("search.search_placeholder")}
									className="w-full pl-8 bg-background"
								/>
							</div>
							<Select>
								<SelectTrigger className="w-full sm:w-[180px]">
									<SelectValue placeholder={t("search.category_placeholder")} />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="id_category">Restaurantes</SelectItem>
									<SelectItem value="id_category2">Estética</SelectItem>
									<SelectItem value="id_category3">Taller</SelectItem>
								</SelectContent>
							</Select>
							<Select>
								<SelectTrigger className="w-full sm:w-[180px]">
									<SelectValue placeholder={t("search.location_placeholder")} />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="id_location">Norte</SelectItem>
									<SelectItem value="id_location2">Sur</SelectItem>
									<SelectItem value="id_location3">Centro</SelectItem>
								</SelectContent>
							</Select>
							<Button type="submit" className="shrink-0">
								{t("search.button")}
							</Button>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
