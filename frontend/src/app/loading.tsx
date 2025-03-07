"use client";

import { motion } from "framer-motion";

export default function Loading() {
	return (
		<div className="h-screen w-full flex items-center justify-center bg-background">
			<div className="relative w-[300px] h-[100px]">
				<motion.svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 300 100"
					className="w-full h-full">
					<motion.g
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5 }}>
						<motion.rect
							x="10"
							y="40"
							width="40"
							height="30"
							fill="#003366"
							initial={{ scaleY: 0 }}
							animate={{ scaleY: 1 }}
							transition={{ duration: 0.5, delay: 0.2 }}
						/>
						<motion.polygon
							points="10,40 30,20 50,40"
							fill="#003366"
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.4 }}
						/>
						<motion.circle
							cx="90"
							cy="30"
							r="10"
							fill="#003366"
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ duration: 0.5, delay: 0.6 }}
						/>
						<motion.rect
							x="80"
							y="40"
							width="20"
							height="30"
							fill="#003366"
							initial={{ scaleY: 0 }}
							animate={{ scaleY: 1 }}
							transition={{ duration: 0.5, delay: 0.8 }}
						/>
						<motion.path
							d="M50,55 Q70,25 90,35"
							stroke="#66CC99"
							strokeWidth="2"
							fill="none"
							initial={{ pathLength: 0 }}
							animate={{ pathLength: 1 }}
							transition={{ duration: 1, delay: 1 }}
						/>
						<motion.g
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.5, delay: 1.2 }}>
							<circle cx="60" cy="40" r="2" fill="#66CC99" />
							<circle cx="70" cy="30" r="2" fill="#66CC99" />
							<circle cx="80" cy="35" r="2" fill="#66CC99" />
						</motion.g>
					</motion.g>
					<motion.g
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: 1.4 }}>
						<text x="110" y="60" fontFamily="Arial, sans-serif" fontSize="40">
							<tspan fontWeight="bold" fill="#66CC99">
								Nego
							</tspan>
							<tspan
								fontWeight="normal"
								className="dark:fill-white fill-[#003366]">
								Prox
							</tspan>
						</text>
					</motion.g>
				</motion.svg>

				{/* Loading spinner */}
				<motion.div
					className="absolute bottom-[-40px] left-1/2 transform -translate-x-1/2"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 1.6 }}>
					<div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
				</motion.div>
			</div>
		</div>
	);
}
