"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { CalendarDays, CheckCircle, MapPin, Search, Users } from "lucide-react";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Link } from "@/i18n/navigation";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import FadeWhenVisible from "@/components/containers/FadeWhenVisible";
import { categories } from "@/lib/constants/categories";

export default function Home() {
	const t = useTranslations("HomePage");

	return (
		<div className="flex-1 flex flex-col items-center">
			{/* Hero sections */}
			<motion.section
				className="w-full min-h-[750px] relative"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1 }}>
				<div className="absolute inset-0 z-0">
					<Image
						src="https://picsum.photos/1000/800"
						alt="Hero image"
						fill
						className="object-cover"
						priority
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
							<Button size="lg" className="px-8">
								<Link href="/business">{t("hero.button1")}</Link>
							</Button>
							<Button
								size="lg"
								variant="outline"
								className="bg-white/10 hover:bg-white/20 border-white/50 text-white hover:text-white backdrop-blur supports-[backdrop-filter]:bg-white/5">
								<Link href="/register/business">{t("hero.button2")}</Link>
							</Button>
						</motion.div>
					</div>
				</div>
			</motion.section>

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
							{[1, 2, 3, 4].map((item) => (
								<motion.div
									key={item}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.5, delay: item * 0.1 }}>
									<Card className="overflow-hidden group hover:shadow-lg transition-all duration-200">
										<Link key={item} href={`/business/${item}`}>
											<div className="relative">
												<Image
													src="https://picsum.photos/400/200"
													alt={`Business ${item}`}
													width={400}
													height={200}
													className="object-cover w-full h-48 group-hover:scale-105 transition-all duration-300"
												/>
												<Badge className="absolute top-2 right-2 bg-primary/90 hover:bg-primary">
													{t("featuredBusiness.featured")}
												</Badge>
											</div>
										</Link>
										<CardContent className="p-4">
											<div className="space-y-2">
												<div className="flex items-center justify-between">
													<h3 className="font-bold">Business {item}</h3>
													<div className="flex items-center">
														{Array(5)
															.fill(0)
															.map((_, index) => (
																<svg
																	key={index}
																	xmlns="http://www.w3.org/2000/svg"
																	viewBox="0 0 24 24"
																	fill="currentColor"
																	className={`w-4 h-4 ${
																		index < 4
																			? "text-yellow-500"
																			: "text-gray-300"
																	}`}>
																	<path
																		fillRule="evenodd"
																		d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
																		clipRule="evenodd"
																	/>
																</svg>
															))}
													</div>
												</div>
												<p className="text-sm text-muted-foreground line-clamp-3">
													Lorem ipsum dolor sit amet consectetur adipisicing
													elit. Natus placeat fugit obcaecati deserunt quisquam,
													dignissimos totam quae maxime at neque nemo rem nulla
													tenetur numquam aliquam. Id perferendis officia
													dolorem!
												</p>
												<div className="flex items-center text-sm text-muted-foreground">
													<MapPin className="mr-1 h-3 w-3" />
													<span>Location</span>
												</div>
												<div className="flex items-center justify-between pt-2">
													<Badge
														variant="outline"
														className="flex items-center">
														<CalendarDays className="mr-1 h-3 w-3" />
														{t("featuredBusiness.availability")}
													</Badge>
													<Button
														size="sm"
														className="bg-primary/90 hover:bg-primary">
														{t("featuredBusiness.appointment")}
													</Button>
												</div>
											</div>
										</CardContent>
									</Card>
								</motion.div>
							))}
						</div>
						<div className="flex justify-center mt-8">
							<Button
								variant="outline"
								className="border-primary/50 text-primary hover:bg-primary/10">
								{t("featuredBusiness.seeMore")}
							</Button>
						</div>
					</div>
				</section>
			</FadeWhenVisible>

			{/* How it works section */}
			<FadeWhenVisible>
				<section className="w-full py-12 md:py-16 lg:py-20 bg-gradient-to-tl from-background to-secondary/70 ">
					<div className="container mx-auto max-w-[1400px] px-4 md:px-6">
						<div className="flex flex-col items-center justify-center space-y-4 text-center">
							<div className="space-y-2">
								<h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
									{t("howItWorks.title")}
								</h2>
								<p className="max-w-[700px] text-muted-foreground md:text-xl">
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
									className="flex flex-col items-center text-center space-y-2"
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{
										duration: 0.5,
										delay: index * 0.2,
									}}>
									<div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
										{step.icon}
									</div>
									<h3 className="text-xl font-bold">{step.title}</h3>
									<p className="text-muted-foreground">{step.description}</p>
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
								<ul className="grid gap-2">
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
								</ul>
								<div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
									<Button size="lg" className="cursor-pointer">
										{t("forBusiness.register")}
									</Button>
									<Button
										size="lg"
										variant="outline"
										className="hover:text-black transition-all duration-200 cursor-pointer">
										{t("forBusiness.learnMore")}
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
							{categories.map((category, i) => (
								<motion.div
									key={i}
									initial={{ opacity: 0, scale: 0.9 }}
									whileInView={{ opacity: 1, scale: 1 }}
									viewport={{ once: true }}
									transition={{ duration: 0.3, delay: i * 0.3 }}>
									<Link
										href={`/categories/`}
										className="flex flex-col items-center justify-center p-4 rounded-lg border bg-background hover:bg-muted/50 transition-colors">
										<div className="mb-2 text-primary">{category.icon}</div>
										<span className="text-sm font-medium text-center">
											{category.name}
										</span>
									</Link>
								</motion.div>
							))}
						</div>
					</div>
				</section>
			</FadeWhenVisible>

			{/* Testimonials section */}
		</div>
	);
}
