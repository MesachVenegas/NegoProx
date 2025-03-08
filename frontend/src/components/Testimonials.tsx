"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

interface TestimonialProps {
	name: string;
	role: string;
	text: string;
	image: string;
}

const TestimonialCard = ({
	testimonial,
}: {
	testimonial: TestimonialProps;
}) => (
	<div className="w-full max-w-xl mx-auto bg-card p-6 rounded-2xl shadow-lg border border-muted-foreground/30 hover:border-primary/50 transition-all duration-300 h-[200px]">
		<div className="flex flex-col gap-4 h-full w-full">
			<div className="flex gap-3">
				<Avatar className="size-12 shrink-0">
					<AvatarImage src={testimonial.image} alt={testimonial.name} />
					<AvatarFallback className="bg-primary/10 text-primary font-semibold">
						{testimonial.name
							.split(" ")
							.map((n) => n[0])
							.join("")
							.toUpperCase()}
					</AvatarFallback>
				</Avatar>
				<div className="flex flex-col">
					<h3 className="text-lg font-bold truncate">{testimonial.name}</h3>
					<p className="text-sm text-muted-foreground truncate">
						{testimonial.role}
					</p>
				</div>
			</div>
			<p className="line-clamp-3 text-wrap">{testimonial.text}</p>
		</div>
	</div>
);

const ScrollingRow = ({
	testimonials,
	speed = 50,
}: {
	testimonials: TestimonialProps[];
	speed?: number;
}) => {
	const rowRef = useRef<HTMLDivElement>(null);
	const { scrollXProgress } = useScroll({
		container: rowRef,
	});

	const x = useTransform(scrollXProgress, [0, 1], [0, -100]);

	return (
		<div className="relative overflow-hidden py-4">
			<div className="absolute left-0 top-0 bottom-0 w-[100px] z-10 bg-gradient-to-r from-background to-transparent" />
			<div className="absolute right-0 top-0 bottom-0 w-[100px] z-10 bg-gradient-to-l from-background to-transparent" />
			<motion.div
				ref={rowRef}
				className="flex gap-6 whitespace-nowrap"
				style={{ x }}
				animate={{ x: ["0%", "-50%"] }}
				transition={{
					x: {
						duration: speed,
						repeat: Infinity,
						repeatType: "loop",
						ease: "linear",
					},
				}}>
				{[...testimonials, ...testimonials].map((testimonial, index) => (
					<div key={index} className="w-[350px] flex-shrink-0">
						<TestimonialCard testimonial={testimonial} />
					</div>
				))}
			</motion.div>
		</div>
	);
};

interface TestimonialsProps {
	testimonials: TestimonialProps[];
	title?: string;
	description?: string;
}

export default function Testimonials({
	testimonials,
	title = "What Our Users Say",
	description = "Discover what our users have to say about our products and services.",
}: TestimonialsProps) {
	return (
		<section className="w-full overflow-hidden py-12 bg-background">
			<div className="container mx-auto max-w-[1400px] space-y-6">
				<div className="flex flex-col gap-2 justify-center items-center">
					<h2 className="text-3xl font-bold  tracking-tighter md:text-4xl">
						{title}
					</h2>
					<p className="max-w-[700px] text-muted-foreground md:text-xl">
						{description}
					</p>
				</div>
				<ScrollingRow testimonials={testimonials} />
			</div>
		</section>
	);
}
