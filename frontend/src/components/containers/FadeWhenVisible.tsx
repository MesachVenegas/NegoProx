"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function FadeWhenVisible({
	children,
}: {
	children: React.ReactNode;
}) {
	const ref = useRef(null);
	const isInView = useInView(ref, {
		once: true,
		margin: "-10% 0px",
	});

	return (
		<motion.div
			className="w-full"
			ref={ref}
			initial={{ opacity: 0, y: 50 }}
			animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
			transition={{ duration: 0.5 }}>
			{children}
		</motion.div>
	);
}
