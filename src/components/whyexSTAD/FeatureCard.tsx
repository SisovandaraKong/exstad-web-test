/** @format */
"use client";
import { ReactNode } from "react";
import { motion } from "framer-motion";

interface FeatureCardProps {
	icon: ReactNode;
	title: string;
	description: string;
	technologies?: string[];
}

export function FeatureCard({
	icon,
	title,
	description,
	technologies = [],
}: FeatureCardProps) {
	return (
		<motion.div
			className='morphing-card holographic-card p-6 sm:p-8 rounded-3xl group cursor-pointer w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-md mx-auto relative overflow-hidden bg-white dark:bg-gray-900'
			whileHover={{ scale: 1.02 }}
			transition={{ duration: 0.3 }}>
			{/* Rounded gradient border */}
			<div className='absolute inset-0 rounded-3xl p-[2px] bg-gradient-to-r from-primary/50 via-secondary/60 to-primary/50 group-hover:from-primary/80 group-hover:via-secondary/90 group-hover:to-primary/80 transition-all duration-300'>
				<div className='w-full h-full rounded-3xl bg-white dark:bg-gray-900'></div>
			</div>
			{/* Content wrapper */}
			<div className='relative z-10'>
				{/* Icon Section */}
				<motion.div
					className='text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300 flex justify-center'
					whileHover={{ rotate: 5 }}>
					{icon}
				</motion.div>

				{/* Title */}
				<motion.h3
					className='text-center font-bold text-lg mb-2 text-gray-800 dark:text-white'
					initial={{ opacity: 0.9 }}
					whileHover={{ opacity: 1 }}>
					{title}
				</motion.h3>

				{/* Description */}
				<motion.p
					className='text-center text-base sm:text-lg md:text-[18px] text-gray-600 dark:text-gray-400 mb-6 leading-7 sm:leading-8'
					initial={{ opacity: 0.8 }}
					whileHover={{ opacity: 1 }}>
					{description}
				</motion.p>

				{/* Technologies Tags */}
				{technologies.length > 0 && (
					<div className='flex flex-wrap gap-2'>
						{technologies.map((tech, index) => (
							<span
								key={index}
								className='px-3 py-1 bg-primary/20 text-primary dark:bg-blue-500/20 dark:text-blue-400 rounded-full text-sm'>
								{tech}
							</span>
						))}
					</div>
				)}
			</div>
		</motion.div>
	);
}
