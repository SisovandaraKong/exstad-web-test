/** @format */

"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { ArrowRight, Users, Award, BookOpen } from "lucide-react";
import { useTranslations } from "next-intl";
import { withBasePath } from "@/lib/base-path";

export function Welcoming_Card() {
	const t = useTranslations();
	const features = [
		{ icon: Users, text: t("welcoming-section.features.students") },
		{ icon: Award, text: t("welcoming-section.features.success-rate") },
		{ icon: BookOpen, text: t("welcoming-section.features.curriculum") },
	];

	return (
		<div className='relative overflow-hidden rounded-3xl'>
			{/* Background with grid pattern */}
			<div className='absolute inset-0 opacity-[0.08] dark:opacity-[0.12]'>
				<div
					className='w-full h-full rounded-3xl'
					style={{
						backgroundImage: `
							linear-gradient(hsl(var(--primary)/0.4) 1px, transparent 1px),
							linear-gradient(90deg, hsl(var(--primary)/0.4) 1px, transparent 1px)
						`,
						backgroundSize: "30px 30px",
					}}
				/>
			</div>

			{/* Main content */}
			<div className='relative bg-card border border-border/50 backdrop-blur-sm mx-auto max-w-full p-6 sm:p-8 md:p-10 lg:p-12 rounded-3xl flex flex-col xl:flex-row gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 items-center shadow-lg'>
				{/* Left/Top: Text Section */}
				<motion.div
					className='flex-1 space-y-6'
					initial={{ opacity: 0, x: -30 }}
					whileInView={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
					viewport={{ once: true }}>
					{/* Header */}
					<div className='space-y-4'>
						<motion.div
							className='inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-full px-4 py-2'
							initial={{ opacity: 0, scale: 0.8 }}
							whileInView={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.6, delay: 0.4 }}
							viewport={{ once: true }}>
							<div className='w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full animate-pulse' />
							<span className='text-sm font-medium text-foreground/80'>
								{t("welcoming-section.badge")}
							</span>
						</motion.div>

						<h2 className='font-bold text-2xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-foreground leading-tight'>
							{t("welcoming-section.title")}{" "}
							<span className='bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>
								{t("welcoming-section.title-brand")}
							</span>
						</h2>
					</div>

					{/* Description */}
					<p className='text-base sm:text-lg md:text-[18px] text-muted-foreground leading-7 sm:leading-8'>
						{t("welcoming-section.description")}
					</p>

					{/* Features */}
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 rounded-full'>
						{features.map((feature, index) => (
							<motion.div
								key={feature.text}
								className='flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-full bg-background/50 border border-border/30'
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
								viewport={{ once: true }}>
								<feature.icon className='h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0' />
								<span className='text-xs sm:text-sm font-medium text-foreground whitespace-nowrap'>
									{feature.text}
								</span>
							</motion.div>
						))}
					</div>

					{/* CTA Button */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.8 }}
						viewport={{ once: true }}>
						<Link href='/explore-course'>
							<Button
								size='lg'
								className='bg-primary cursor-pointer text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group'>
								{t("welcoming-section.button")}
								<ArrowRight className='ml-1 h-5 w-5 group-hover:translate-x-1 transition-transform' />
							</Button>
						</Link>
					</motion.div>
				</motion.div>

				{/* Right/Bottom: Image Section */}
				<motion.div
					className='flex items-center justify-center xl:justify-end flex-shrink-0 w-full xl:w-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-md xl:max-w-lg'
					initial={{ opacity: 0, x: 30 }}
					whileInView={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.8, delay: 0.4 }}
					viewport={{ once: true }}>
					<div className='relative'>
						{/* Glow effect behind image */}
						<div className='absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-2xl scale-110' />

						{/* Image */}
						<div className='relative bg-background/50 backdrop-blur-sm rounded-2xl p-4 border border-border/30'>
							<Image
								src={withBasePath("/image/sampleImage/3students.png")}
								alt='Learn More'
								width={700}
								height={700}
								className='object-contain w-full h-auto rounded-xl max-h-[280px] sm:max-h-[320px] md:max-h-[360px] lg:max-h-[380px] xl:max-h-[450px] 2xl:max-h-[500px]'
								unoptimized
							/>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
}
