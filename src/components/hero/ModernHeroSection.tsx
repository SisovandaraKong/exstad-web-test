/** @format */

"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";
import { MarqueeVertical } from "@/components/marquee/MarqueeVertical";
import { useTranslations } from "next-intl";

export default function ModernHeroSection() {
	const t = useTranslations();

	return (
		<section className='relative min-h-screen flex items-center justify-center overflow-hidden'>
			{/* Grid Background - Same as Team Section */}
			<div className='absolute inset-0 opacity-[0.15] dark:opacity-[0.20]'>
				<div
					className='w-full h-full'
					style={{
						backgroundImage: `
							linear-gradient(rgb(75, 85, 99, 0.6) 1px, transparent 1px),
							linear-gradient(90deg, rgb(75, 85, 99, 0.6) 1px, transparent 1px)
						`,
						backgroundSize: "40px 40px",
						maskImage: `
							radial-gradient(ellipse 80% 60% at 50% 50%, 
								rgba(0, 0, 0, 1) 20%, 
								rgba(0, 0, 0, 0.8) 40%, 
								rgba(0, 0, 0, 0.4) 70%, 
								rgba(0, 0, 0, 0) 100%)
						`,
						WebkitMaskImage: `
							radial-gradient(ellipse 80% 60% at 50% 50%, 
								rgba(0, 0, 0, 1) 20%, 
								rgba(0, 0, 0, 0.8) 40%, 
								rgba(0, 0, 0, 0.4) 70%, 
								rgba(0, 0, 0, 0) 100%)
						`,
					}}
				/>
			</div>

			<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24'>
				<div className='grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center'>
					{/* Left Column - Content */}
					<motion.div
						className='text-center lg:text-left'
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}>
						{/* Badge */}
						<motion.div
							className='inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-full px-3 sm:px-4 py-2 mb-4 sm:mb-6 mx-2 sm:mx-0'
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.6, delay: 0.4 }}>
							<div className='w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full animate-pulse' />
							<span className='text-xs sm:text-sm font-medium text-foreground/80'>
								{t("hero.badge")}
							</span>
						</motion.div>

						{/* Main Heading */}
						<motion.h1
							className='text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4 sm:mb-6 px-2 sm:px-0'
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.6 }}>
							<span className='block text-foreground'>
								{t("hero.title-part1")}
							</span>
							<span className='block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>
								{t("hero.title-part2")}
							</span>
						</motion.h1>

						{/* Description */}
						<motion.p
							className='text-base sm:text-lg md:text-[18px] text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0 px-4 sm:px-0 leading-7 sm:leading-8'
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.8 }}>
							{t("hero.description")}
						</motion.p>

						{/* CTA Buttons */}
						<motion.div
							className='flex flex-col gap-3 sm:gap-4 md:flex-row justify-center lg:justify-start mb-8 sm:mb-10 lg:mb-12 px-2 sm:px-0'
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 1 }}>
							<Link href='/explore-course' className='w-full md:w-auto'>
								<Button
									size='lg'
									className='w-full cursor-pointer md:w-auto min-w-[180px] sm:min-w-[200px] bg-primary text-white font-semibold px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-sm sm:text-base rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group'>
									<span className='flex items-center justify-center'>
										<span className='truncate'>
											{t("hero.explore-programs")}
										</span>
										<ArrowRight className='ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform flex-shrink-0' />
									</span>
								</Button>
							</Link>
							<Link href='/about-us' className='w-full md:w-auto'>
								<Button
									variant='outline'
									size='lg'
									className='w-full cursor-pointer md:w-auto min-w-[180px] sm:min-w-[200px] border-2 border-primary/30 hover:border-primary/50 hover:bg-primary/5 font-semibold px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-sm sm:text-base rounded-lg sm:rounded-xl transition-all duration-300 group'>
									<span className='flex items-center justify-center'>
										<Play className='mr-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform flex-shrink-0' />
										<span className='truncate'>{t("hero.watch-story")}</span>
									</span>
								</Button>
							</Link>
						</motion.div>
					</motion.div>

					{/* Right Column - Vertical Marquee */}
					<motion.div
						className='items-center lg:items-end flex flex-col space-y-8 lg:space-y-12'
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.4 }}>
						{/* Vertical Marquee */}
						<motion.div
							className='relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] flex items-center justify-center'
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 1, delay: 0.6 }}>
							<MarqueeVertical />
						</motion.div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
