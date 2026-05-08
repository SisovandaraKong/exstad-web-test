/** @format */
"use client";
import { motion } from "framer-motion";
import { BsBank2 } from "react-icons/bs";
import { FaPlaneDeparture, FaSchool } from "react-icons/fa";
import { MdLocalPolice } from "react-icons/md";
import { GrResources, GrTechnology } from "react-icons/gr";
import { TbWorldCode } from "react-icons/tb";

const cardData = [
	{
		icon: FaPlaneDeparture,
		percentage: "2%",
		title: "Study Abroad",
		color: "#3B82F6",
	},
	{
		icon: MdLocalPolice,
		percentage: "16%",
		title: "Officer",
		color: "#F59E0B",
	},
	{
		icon: BsBank2,
		percentage: "34%",
		title: "Bank & Finance",
		color: "#10B981",
	},
	{
		icon: GrTechnology,
		percentage: "38%",
		title: "Technology Company",
		color: "#8B5CF6",
	},
	{
		icon: FaSchool,
		percentage: "7%",
		title: "ISTAD",
		color: "#EF4444",
	},
	{
		icon: GrResources,
		percentage: "2%",
		title: "Outsourcing",
		color: "#F97316",
	},
	{
		icon: TbWorldCode,
		percentage: "1%",
		title: "International Technology Company",
		color: "#06B6D4",
	},
	{
		icon: GrTechnology,
		percentage: "5%",
		title: "Startup Company",
		color: "#EC4899",
	},
];

export default function StateCard() {
	return (
		<section className='flex flex-col mt-6 sm:mt-8 md:mt-10 lg:mt-12 mx-auto text-center px-4 sm:px-6 lg:px-8'>
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, ease: "easeOut" }}
				viewport={{ once: true }}
				className='mb-8'>
				<motion.h2
					className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent mb-2 sm:mb-3 md:mb-4'
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					viewport={{ once: true }}>
					Our Outstanding Achievements
				</motion.h2>
				<motion.p
					className='text-xs sm:text-sm md:text-base lg:text-lg leading-5 sm:leading-6 md:leading-7 text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 md:mb-8 max-w-3xl mx-auto px-2 sm:px-4'
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.4 }}
					viewport={{ once: true }}>
					A showcase of the milestones we have reached, highlighting our growth,
					dedication, and impact in delivering excellence.
				</motion.p>
			</motion.div>

			<div className='flex flex-col gap-6 w-full mx-auto max-w-6xl'>
				<div className='flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-5 lg:gap-6'>
					{cardData.slice(0, 4).map((card, index) => {
						const IconComponent = card.icon;
						return (
							<motion.div
								key={index}
								className='group relative'
								initial={{ opacity: 0, y: 50, scale: 0.9 }}
								whileInView={{ opacity: 1, y: 0, scale: 1 }}
								transition={{
									duration: 0.6,
									delay: index * 0.1,
									ease: "easeOut",
								}}
								viewport={{ once: true }}
								whileHover={{
									y: -8,
									scale: 1.02,
									transition: { duration: 0.2 },
								}}>
								<div className='absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur opacity-0 group-hover:opacity-70 transition duration-500'></div>

								<div className='relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 rounded-2xl p-4 h-[220px] w-[200px] flex flex-col items-center justify-between shadow-lg hover:shadow-xl transform transition-all duration-300 group-hover:border-opacity-50'>
									<motion.div
										className='relative mb-3'
										whileHover={{
											rotate: [0, -10, 10, -10, 0],
											scale: 1.1,
										}}
										transition={{ duration: 0.5 }}>
										<div className='p-3 rounded-xl bg-white/80 dark:bg-gray-800/80 shadow-md ring-1 ring-black/5 dark:ring-white/10'>
											<IconComponent
												className='w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8'
												style={{ color: card.color }}
											/>
										</div>
									</motion.div>

									<motion.div
										className='text-center mb-1'
										initial={{ scale: 0 }}
										whileInView={{ scale: 1 }}
										transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
										viewport={{ once: true }}>
										<motion.p
											className='font-bold text-2xl sm:text-3xl md:text-4xl leading-tight bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent'
											whileHover={{ scale: 1.05 }}
											transition={{ duration: 0.2 }}>
											{card.percentage}
										</motion.p>
									</motion.div>

									<motion.div
										className='text-center'
										initial={{ opacity: 0 }}
										whileInView={{ opacity: 1 }}
										transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
										viewport={{ once: true }}>
										<p className='font-semibold text-xs sm:text-sm md:text-base leading-4 sm:leading-5 text-center text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300'>
											{card.title}
										</p>
									</motion.div>
								</div>
							</motion.div>
						);
					})}
				</div>

				<div className='flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-5 lg:gap-6'>
					{cardData.slice(4).map((card, index) => {
						const actualIndex = index + 4;
						const IconComponent = card.icon;
						return (
							<motion.div
								key={actualIndex}
								className='group relative'
								initial={{ opacity: 0, y: 50, scale: 0.9 }}
								whileInView={{ opacity: 1, y: 0, scale: 1 }}
								transition={{
									duration: 0.6,
									delay: actualIndex * 0.1,
									ease: "easeOut",
								}}
								viewport={{ once: true }}
								whileHover={{
									y: -8,
									scale: 1.02,
									transition: { duration: 0.2 },
								}}>
								<div className='absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur opacity-0 group-hover:opacity-70 transition duration-500'></div>

								<div className='relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 rounded-2xl p-4 h-[220px] w-[200px] flex flex-col items-center justify-between shadow-lg hover:shadow-xl transform transition-all duration-300 group-hover:border-opacity-50'>
									<motion.div
										className='relative mb-3'
										whileHover={{
											rotate: [0, -10, 10, -10, 0],
											scale: 1.1,
										}}
										transition={{ duration: 0.5 }}>
										<div className='p-3 rounded-xl bg-white/80 dark:bg-gray-800/80 shadow-md ring-1 ring-black/5 dark:ring-white/10'>
											<IconComponent
												className='w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8'
												style={{ color: card.color }}
											/>
										</div>
									</motion.div>

									<motion.div
										className='text-center mb-1'
										initial={{ scale: 0 }}
										whileInView={{ scale: 1 }}
										transition={{
											duration: 0.5,
											delay: actualIndex * 0.1 + 0.3,
										}}
										viewport={{ once: true }}>
										<motion.p
											className='font-bold text-2xl sm:text-3xl md:text-4xl leading-tight bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent'
											whileHover={{ scale: 1.05 }}
											transition={{ duration: 0.2 }}>
											{card.percentage}
										</motion.p>
									</motion.div>

									<motion.div
										className='text-center'
										initial={{ opacity: 0 }}
										whileInView={{ opacity: 1 }}
										transition={{
											duration: 0.5,
											delay: actualIndex * 0.1 + 0.5,
										}}
										viewport={{ once: true }}>
										<p className='font-semibold text-xs sm:text-sm md:text-base leading-4 sm:leading-5 text-center text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300'>
											{card.title}
										</p>
									</motion.div>
								</div>
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
