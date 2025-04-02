"use client";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ComponentType } from "react";
import { motion } from "framer-motion";
import * as LucideUIcons from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { CalendarDays, CheckCircle, Search, Users } from "lucide-react";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	BusinessCardFeatured,
	BusinessCardSkeleton,
} from "@/components/BusinessCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useBusiness } from "@/hooks/useBusiness";
import { Link, useRouter } from "@/i18n/navigation";
import { useCategories } from "@/hooks/useCategories";
import { testimonials } from "@/lib/constants/testimonials";
import { ReloadContent } from "@/components/ReloadContent";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load components
const Testimonials = dynamic(() => import("@/components/Testimonials"), {
	loading: () => <div className="min-h-[400px] animate-pulse bg-muted/50" />,
});

const FadeWhenVisible = dynamic(
	() => import("@/components/containers/FadeWhenVisible"),
	{
		loading: () => <div className="min-h-[200px] animate-pulse bg-muted/50" />,
	}
);

export default function Home() {
	const router = useRouter();
	const locale = useLocale();
	const {
		business,
		status: businessStatus,
		error: businessError,
		refetchBusiness,
	} = useBusiness(1, 4);
	const t = useTranslations("HomePage");
	const {
		categories,
		status: categoriesStatus,
		error: categoriesError,
		refetchCategories,
	} = useCategories();

	// Render category icon component
	const renderCategoryIcon = (iconName: string) => {
		const Icon = (LucideUIcons as never)[iconName] as ComponentType<{
			className: string;
		}>;
		return Icon ? <Icon className="h-8 w-8" /> : null;
	};

	return (
		<div className="flex-1 flex flex-col items-center">
			{/* Hero sections */}
			<section className="relative min-h-[650px] flex items-center w-full">
				<div className="absolute inset-0 z-0">
					<Image
						src="https://picsum.photos/1000/800"
						alt="Hero image"
						fill
						className="object-cover"
						priority
						sizes="100vw"
						quality={85}
						placeholder="blur"
						blurDataURL="L]J[FpM{a}ay_NRjofayWZofofay"
					/>
					<div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-transparent" />
				</div>
				<div className="container mx-auto max-w-[1400px] px-4 md:px-6 relative z-10 h-full py-12 md:py-24 lg:py-32 flex items-center">
					<div className="max-w-[800px]">
						<motion.h1
							className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-white mb-6"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2, duration: 0.8 }}>
							{t("hero.title")}
						</motion.h1>
						<motion.p
							className="max-w-[600px] text-gray-200 md:text-xl"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.4, duration: 0.8 }}>
							{t("hero.subtitle")}
						</motion.p>
						<motion.div
							className="flex flex-col gap-4 sm:flex-row mt-6"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.6, duration: 0.8 }}>
							<Button
								size="lg"
								className="px-8"
								onClick={() => router.push("/business")}>
								{t("hero.button1")}
							</Button>
							<Button
								size="lg"
								variant="outline"
								className="bg-white/10 hover:bg-white/20 border-white/50 text-white hover:text-white backdrop-blur supports-[backdrop-filter]:bg-white/5"
								onClick={() => router.push("/register/business")}>
								{t("hero.button2")}
							</Button>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Search section */}
			<FadeWhenVisible>
				<section className="w-full py-12 md:py-16 lg:py-20">
					<div className="container mx-auto max-w-[1400px] px-4 md:px-6">
						<div className="mx-auto max-w-[800px] space-y-4">
							<div className="text-center space-y-2">
								<h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
									{t("search.title")}
								</h2>
								<p className="text-muted-foreground">
									{t("search.description")}
								</p>
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
										<SelectValue
											placeholder={t("search.category_placeholder")}
										/>
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="id_category">Restaurantes</SelectItem>
										<SelectItem value="id_category2">Estética</SelectItem>
										<SelectItem value="id_category3">Taller</SelectItem>
									</SelectContent>
								</Select>
								<Select>
									<SelectTrigger className="w-full sm:w-[180px]">
										<SelectValue
											placeholder={t("search.location_placeholder")}
										/>
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
			</FadeWhenVisible>

			{/* Featured businesses */}
			<FadeWhenVisible>
				<section className="w-full py-12 md:py-16 lg:py-20 bg-muted/50">
					<div className="container mx-auto px-4 md:px-6 max-w-[1400px]">
						<div className="flex flex-col items-center justify-center space-y-4 text-center">
							<div className="space-y-2">
								<h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
									{t("featuredBusiness.title")}
								</h2>
								<p className="max-w-[700px] text-muted-foreground md:text-xl">
									{t("featuredBusiness.description")}
								</p>
							</div>
						</div>
						<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
							{businessStatus === "pending" ? (
								<>
									{[1, 2, 3, 4].map((_, index) => (
										<BusinessCardSkeleton key={index} />
									))}
								</>
							) : businessError ? (
								<div className="col-span-full">
									<ReloadContent refetch={refetchBusiness} />
								</div>
							) : (
								business &&
								business.data.map((item, index) => (
									<motion.div
										key={item.id}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{ duration: 0.5, delay: index * 0.1 }}>
										<BusinessCardFeatured item={item} />
									</motion.div>
								))
							)}
						</div>
						<div className="flex justify-center mt-8">
							<Button
								asChild
								variant="outline"
								className="border-primary/50 text-primary hover:bg-primary/10 dark:hover:text-white">
								<Link href="/business">{t("featuredBusiness.seeMore")}</Link>
							</Button>
						</div>
					</div>
				</section>
			</FadeWhenVisible>

			{/* How it works section */}
			<FadeWhenVisible>
				<section className="w-full py-12 md:py-16 lg:py-20 bg-secondary dark:bg-secondary/50">
					<div className="container mx-auto max-w-[1400px] px-4 md:px-6">
						<div className="flex flex-col items-center justify-center space-y-4 text-center">
							<div className="space-y-2 text-white">
								<h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
									{t("howItWorks.title")}
								</h2>
								<p className="max-w-[700px] md:text-xl">
									{t("howItWorks.description")}
								</p>
							</div>
						</div>
						<div className="grid grid-cols-1 gap-8 md:grid-cols-3 mt-8">
							{[
								{
									title: `${t("howItWorks.steps.step1.title")}`,
									icon: <Search className="h-8 w-8" />,
									description: `${t("howItWorks.steps.step1.description")}`,
								},
								{
									title: `${t("howItWorks.steps.step2.title")}`,
									icon: <Users className="h-8 w-8" />,
									description: `${t("howItWorks.steps.step2.description")}`,
								},
								{
									title: `${t("howItWorks.steps.step3.title")}`,
									icon: <CalendarDays className="h-8 w-8" />,
									description: `${t("howItWorks.steps.step3.description")}`,
								},
							].map((step, index) => (
								<motion.div
									key={step.title}
									className="flex flex-col items-center text-center space-y-2 text-white"
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{
										duration: 0.5,
										delay: index * 0.2,
									}}>
									<div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary shadow-lg">
										{step.icon}
									</div>
									<h3 className="text-xl font-bold">{step.title}</h3>
									<p>{step.description}</p>
								</motion.div>
							))}
						</div>
					</div>
				</section>
			</FadeWhenVisible>

			{/* For businesses section */}
			<FadeWhenVisible>
				<section className="w-full py-12 md:py-16 lg:py-20 bg-muted">
					<div className="container mx-auto max-w-[1400px] px-4 md:px-6">
						<div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
							<motion.div
								className="flex justify-center"
								initial={{ opacity: 0, x: -50 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5 }}>
								<Image
									src="https://picsum.photos/500/500"
									width={500}
									height={500}
									alt="Business Dashboard"
									className="rounded-lg object-cover"
								/>
							</motion.div>
							<motion.div
								className="flex flex-col justify-between space-y-4"
								initial={{ opacity: 0, x: 50 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5 }}>
								<div className="space-y-2">
									<h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
										{t("forBusiness.title")}
									</h2>
									<p className="text-muted-foreground md:text-xl">
										{t("forBusiness.description")}
									</p>
								</div>
								<motion.ul className="grid gap-2">
									{[
										`${t("forBusiness.list.0")}`,
										`${t("forBusiness.list.1")}`,
										`${t("forBusiness.list.2")}`,
										`${t("forBusiness.list.3")}`,
									].map((item, index) => (
										<motion.li
											key={index}
											className="flex items-center gap-2"
											initial={{ opacity: 0, x: 20 }}
											whileInView={{ opacity: 1, x: 0 }}
											viewport={{ once: true }}
											transition={{ duration: 0.5, delay: index * 0.1 }}>
											<CheckCircle className="h-5 w-5 text-primary" />
											<span>{item}</span>
										</motion.li>
									))}
								</motion.ul>
								<div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
									<Button size="lg" className="cursor-pointer" asChild>
										<Link href="/business/register">
											{t("forBusiness.register")}
										</Link>
									</Button>
									<Button
										size="lg"
										variant="outline"
										className="hover:text-black transition-all duration-200 cursor-pointer"
										asChild>
										<Link href="/how-it-works">
											{t("forBusiness.learnMore")}
										</Link>
									</Button>
								</div>
							</motion.div>
						</div>
					</div>
				</section>
			</FadeWhenVisible>

			{/* Categories section */}
			<FadeWhenVisible>
				<section className="w-full py-12 md:py-16 lg:py-20">
					<div className="container mx-auto max-w-[1400px] px-4 md:px-6">
						<div className="flex flex-col items-center justify-center space-y-4 text-center">
							<div className="space-y-2">
								<h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
									{t("categories.title")}
								</h2>
								<p className="max-w-[700px] text-muted-foreground md:text-xl">
									{t("categories.description")}
								</p>
							</div>
						</div>
						<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 mt-8">
							{categoriesStatus === "pending" ? (
								<>
									{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((_, index) => (
										<div key={index}>
											<div className="flex flex-col gap-4 items-center justify-center rounded-lg h-[100px] bg-foreground/10 p-4">
												<Skeleton className="rounded-full h-12 w-12 bg-foreground/20" />
												<Skeleton className="h-4 w-full bg-foreground/20" />
											</div>
										</div>
									))}
								</>
							) : categoriesError ? (
								<ReloadContent refetch={refetchCategories} />
							) : (
								categories &&
								categories.map((category, i) => (
									<motion.div
										key={i}
										initial={{ opacity: 0, scale: 0.9 }}
										whileInView={{ opacity: 1, scale: 1 }}
										viewport={{ once: true }}
										transition={{ duration: 0.3, delay: i * 0.1 }}>
										<Link
											href={`/categories/${category.en_name}`}
											className="flex flex-col items-center justify-center p-4 rounded-lg border bg-background hover:bg-muted/50 transition-colors h-[100px]">
											<div className="mb-2 text-primary">
												{renderCategoryIcon(category.icon)}
											</div>
											<span className="text-sm font-medium text-center">
												{locale === "en" ? category.en_name : category.name}
											</span>
										</Link>
									</motion.div>
								))
							)}
						</div>
					</div>
				</section>
			</FadeWhenVisible>

			{/* Testimonials section */}
			<FadeWhenVisible>
				<Testimonials
					testimonials={testimonials}
					title={t("testimonials.title")}
					description={t("testimonials.description")}
				/>
			</FadeWhenVisible>

			{/* Call to action section */}
			<FadeWhenVisible>
				<section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-teal-300 via-blue-500 to-black dark:from-teal-400 dark:via-blue-600 dark:to-black text-white dark:text-white">
					<div className="container mx-auto px-4 md:px-6 max-w-[1400px]">
						<div className="flex flex-col items-center justify-center space-y-4 text-center">
							<div className="space-y-2">
								<h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
									{t("cta.title")}
								</h2>
								<p className="max-w-[700px] md:text-xl opacity-90">
									{t("cta.description")}
								</p>
							</div>
							<div className="flex flex-col gap-2 min-[400px]:flex-row mt-4">
								<Button
									size="lg"
									className="px-8 shadow-lg hover:shadow-xl transition-all cursor-pointer">
									<Link href="/business">{t("cta.button")}</Link>
								</Button>
								<Button
									size="lg"
									variant="outline"
									className="px-8 bg-transparent border-white/50 hover:text-black hover:bg-white/40 shadow-lg hover:shadow-xl transition-all cursor-pointer">
									<Link href="/business/register">{t("cta.register")}</Link>
								</Button>
							</div>
						</div>
					</div>
				</section>
			</FadeWhenVisible>
		</div>
	);
}
