/** @format */

"use client";

import React from "react";
import { motion } from "framer-motion";

// Enhanced Skeleton component with better animations
const SkeletonElement = ({
	className = "",
	variant = "rectangular",
	animate = true,
}: {
	className?: string;
	variant?: "rectangular" | "circular" | "text" | "rounded";
	animate?: boolean;
}) => {
	const baseClasses = animate
		? "bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 bg-[length:200%_100%] animate-[shimmer_2s_infinite]"
		: "bg-gray-200 dark:bg-gray-700";

	const variantClasses = {
		rectangular: "rounded-none",
		circular: "rounded-full",
		text: "rounded-sm h-4",
		rounded: "rounded-lg",
	};

	return (
		<motion.div
			className={`${baseClasses} ${variantClasses[variant]} ${className}`}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.3 }}
			aria-hidden='true'
		/>
	);
};

// Custom Skeleton for specific components
export const HeroSkeleton = () => (
	<div className='flex flex-col lg:flex-row w-full py-10 px-2 sm:px-4 md:px-8 lg:px-32 mx-auto max-w-full'>
		{/* Hero Text Section */}
		<div className='w-full lg:w-1/2 max-w-full mx-auto min-h-[120px] sm:min-h-[180px] flex flex-col items-center justify-center mb-4 relative overflow-hidden'>
			<div className='w-full max-w-2xl space-y-4 px-4'>
				<SkeletonElement className='h-8 w-3/4 mx-auto' variant='text' />
				<SkeletonElement className='h-8 w-5/6 mx-auto' variant='text' />
				<SkeletonElement className='h-8 w-2/3 mx-auto' variant='text' />
			</div>
			<div className='w-full flex items-center justify-center mt-6'>
				<SkeletonElement className='w-32 h-32' variant='circular' />
			</div>
		</div>
		<div className='w-full lg:w-1/2 flex items-center justify-center mx-auto'>
			<SkeletonElement className='w-full h-48 max-w-md' variant='rounded' />
		</div>
	</div>
);

export const StatsSkeleton = () => (
	<div className='bg-background py-24 sm:py-32'>
		<div className='mx-auto max-w-7xl px-6 lg:px-8'>
			<div className='mx-auto max-w-2xl lg:max-w-none'>
				<div className='text-center space-y-4 mb-16'>
					<SkeletonElement className='h-10 w-80 mx-auto' variant='text' />
					<SkeletonElement className='h-6 w-96 mx-auto' variant='text' />
				</div>
				<div className='mt-16 py-8 grid grid-cols-1 gap-4 sm:gap-6 md:gap-4 lg:gap-6 text-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
					{[...Array(8)].map((_, index) => (
						<motion.div
							key={index}
							className='bg-card border border-border p-6 sm:p-8 shadow-sm rounded-lg'
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3, delay: index * 0.1 }}>
							<SkeletonElement
								className='h-8 w-16 mx-auto mb-4'
								variant='text'
							/>
							<SkeletonElement className='h-4 w-20 mx-auto' variant='text' />
						</motion.div>
					))}
				</div>
			</div>
		</div>
	</div>
);

export const CourseCardSkeleton = () => (
	<div className='flex gap-4 overflow-hidden'>
		{[...Array(3)].map((_, index) => (
			<motion.div
				key={index}
				className='flex-shrink-0 w-80'
				initial={{ opacity: 0, x: 50 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.5, delay: index * 0.1 }}>
				<div className='bg-card border border-border rounded-lg p-4 shadow-sm'>
					<SkeletonElement className='w-full h-48 mb-4' variant='rounded' />
					<SkeletonElement className='h-6 w-3/4 mb-2' variant='text' />
					<SkeletonElement className='h-4 w-full mb-2' variant='text' />
					<SkeletonElement className='h-4 w-2/3' variant='text' />
				</div>
			</motion.div>
		))}
	</div>
);

// Enhanced Main Page Skeleton with better component breakdown
export const EnhancedPageSkeleton = () => {
	return (
		<div className='min-h-screen flex flex-col bg-background'>
			<style jsx>{`
				@keyframes shimmer {
					0% {
						background-position: -200% 0;
					}
					100% {
						background-position: 200% 0;
					}
				}
			`}</style>

			<div className='w-full'>
				{/* Hero Section */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.6 }}>
					<HeroSkeleton />
				</motion.div>

				{/* Welcoming Section */}
				<motion.div
					className='w-full py-4 sm:py-6 md:py-8 lg:py-12 px-4 sm:px-8 md:px-16 lg:px-32 mx-auto'
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}>
					<SkeletonElement className='w-full h-64' variant='rounded' />
				</motion.div>

				{/* Short Courses and Scholarships */}
				<motion.div
					className='w-full pb-4 sm:pb-6 md:pb-8 lg:pb-12 px-4 sm:px-8 md:px-16 lg:px-32 mx-auto flex flex-col md:flex-row gap-4 md:gap-8 lg:gap-12 justify-center items-stretch'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.6, delay: 0.4 }}>
					<motion.div
						className='h-full w-full md:w-[45%] lg:w-[42%] xl:w-[40%]'
						initial={{ opacity: 0, x: -30 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: 0.6 }}>
						<SkeletonElement className='w-full h-80' variant='rounded' />
					</motion.div>
					<motion.div
						className='h-full w-full md:w-[45%] lg:w-[42%] xl:w-[40%]'
						initial={{ opacity: 0, x: 30 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: 0.6 }}>
						<SkeletonElement className='w-full h-80' variant='rounded' />
					</motion.div>
				</motion.div>

				{/* Popular Course Section */}
				<motion.div
					className='w-full py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-8 md:px-16 lg:px-32 mx-auto'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.6, delay: 0.8 }}>
					<div className='text-center mb-8 space-y-3'>
						<SkeletonElement className='h-8 w-64 mx-auto' variant='text' />
						<SkeletonElement className='h-4 w-96 mx-auto' variant='text' />
					</div>
					<CourseCardSkeleton />
				</motion.div>

				{/* Statistics Section */}
				<StatsSkeleton />

				{/* Recommended Course Section */}
				<motion.div
					className='w-full pt-8 sm:pt-12 md:pt-16 lg:pt-20 px-4 sm:px-8 md:px-16 lg:px-32 mx-auto'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.6, delay: 1.2 }}>
					<div className='text-center mb-8 space-y-3'>
						<SkeletonElement className='h-8 w-64 mx-auto' variant='text' />
						<SkeletonElement className='h-4 w-96 mx-auto' variant='text' />
					</div>
					<CourseCardSkeleton />
				</motion.div>

				{/* Offering Section */}
				<motion.div
					className='w-full py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-8 md:px-16 lg:px-32 mx-auto'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.6, delay: 1.4 }}>
					<div className='text-center mb-12 space-y-3'>
						<SkeletonElement className='h-8 w-48 mx-auto' variant='text' />
						<SkeletonElement className='h-4 w-80 mx-auto' variant='text' />
					</div>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-x-8 md:gap-y-8 lg:gap-x-12 lg:gap-y-12'>
						{[...Array(6)].map((_, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}>
								<SkeletonElement className='w-full h-48' variant='rounded' />
							</motion.div>
						))}
					</div>
				</motion.div>

				{/* Why Choose EXSTAD Section */}
				<motion.div
					className='w-full py-4 sm:py-6 md:py-8 lg:py-10 px-4 sm:px-8 md:px-16 lg:px-32 mx-auto'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.6, delay: 2.0 }}>
					<SkeletonElement className='w-full h-96' variant='rounded' />
				</motion.div>

				{/* Partners Section */}
				<motion.div
					className='w-full py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-8 md:px-16 lg:px-32 mx-auto'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.6, delay: 2.2 }}>
					<div className='text-center mb-12'>
						<SkeletonElement className='h-8 w-48 mx-auto' variant='text' />
					</div>
					<div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center'>
						{[...Array(12)].map((_, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.3, delay: 2.4 + index * 0.05 }}>
								<SkeletonElement className='w-full h-16' variant='rounded' />
							</motion.div>
						))}
					</div>
				</motion.div>
			</div>
		</div>
	);
};
