/** @format */
"use client";
import { ReactNode } from "react";
import { motion } from "framer-motion";

type OfferCardProps = {
	icon: ReactNode;
	content: ReactNode;
};

export function OfferCard({ icon, content }: OfferCardProps) {
	return (
		<motion.div
			className='relative group h-full'
			whileHover={{ scale: 1.02 }}
			transition={{ duration: 0.2 }}>
			{/* Glowing border effect */}
			<div className='absolute -inset-0.5 bg-gradient-to-r from-primary via-secondary to-primary rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-300 dark:opacity-0 dark:group-hover:opacity-20'></div>

			<div className='relative w-full h-full min-h-[300px] bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-between transform transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-primary/20 dark:hover:shadow-primary/30 border border-gray-200/50 dark:border-gray-600/50 hover:border-primary/30 dark:hover:border-primary/20'>
				{/* Icon Section */}
				<motion.div
					className='flex items-center justify-center mb-6'
					whileHover={{ scale: 1.1, rotate: 5 }}
					transition={{ duration: 0.2 }}>
					<div className='p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-full shadow-inner'>
						<div className='text-[2.5rem] sm:text-[3rem] lg:text-[3.5rem] flex items-center justify-center'>
							{icon}
						</div>
					</div>
				</motion.div>

				{/* Content Section */}
				<motion.div
					className='flex-1 flex items-center justify-center'
					initial={{ opacity: 0.9 }}
					whileHover={{ opacity: 1 }}
					transition={{ duration: 0.2 }}>
					<div className='text-gray-700 dark:text-gray-200 text-base sm:text-lg md:text-[18px] text-center leading-7 sm:leading-8 font-medium'>
						{content}
					</div>
				</motion.div>

				{/* Decorative bottom element */}
				<div className='mt-6 w-12 h-1 bg-gradient-to-r from-primary to-secondary rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300'></div>
			</div>
		</motion.div>
	);
}
