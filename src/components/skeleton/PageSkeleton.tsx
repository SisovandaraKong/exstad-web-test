/** @format */

"use client";

import React from "react";

// Skeleton component for shimmer effect
const SkeletonElement = ({
	className = "",
	variant = "rectangular",
}: {
	className?: string;
	variant?: "rectangular" | "circular" | "text" | "rounded";
}) => {
	const baseClasses = "animate-pulse bg-gray-200 dark:bg-gray-700";

	const variantClasses = {
		rectangular: "rounded-none",
		circular: "rounded-full",
		text: "rounded-sm h-4",
		rounded: "rounded-lg",
	};

	return (
		<div
			className={`${baseClasses} ${variantClasses[variant]} ${className}`}
			aria-hidden='true'
		/>
	);
};

// Main Page Skeleton Component
export const PageSkeleton = () => {
	return (
		<div className='min-h-screen flex flex-col bg-background'>
			<div className='w-full'>
				{/* Hero Section Skeleton */}
				<div className='flex flex-col lg:flex-row w-full py-10 px-2 sm:px-4 md:px-8 lg:px-32 mx-auto max-w-full'>
					{/* Hero Text Section */}
					<div className='w-full lg:w-1/2 max-w-full mx-auto min-h-[120px] sm:min-h-[180px] flex flex-col items-center justify-center mb-4 relative overflow-hidden'>
						{/* Title Skeleton */}
						<div className='w-full max-w-2xl space-y-4 px-4'>
							<SkeletonElement className='h-8 w-3/4 mx-auto' variant='text' />
							<SkeletonElement className='h-8 w-5/6 mx-auto' variant='text' />
							<SkeletonElement className='h-8 w-2/3 mx-auto' variant='text' />
						</div>
						{/* Animated Spinner Skeleton */}
						<div className='w-full flex items-center justify-center mt-6'>
							<SkeletonElement className='w-32 h-32' variant='circular' />
						</div>
					</div>

					{/* Marquee Section Skeleton */}
					<div className='w-full lg:w-1/2 flex items-center justify-center mx-auto'>
						<SkeletonElement
							className='w-full h-48 max-w-md'
							variant='rounded'
						/>
					</div>
				</div>

				{/* Welcoming Section Skeleton */}
				<div className='w-full py-4 sm:py-6 md:py-8 lg:py-12 px-4 sm:px-8 md:px-16 lg:px-32 mx-auto'>
					<SkeletonElement className='w-full h-64' variant='rounded' />
				</div>

				{/* Short Courses and Scholarships Section Skeleton */}
				<div className='w-full pb-4 sm:pb-6 md:pb-8 lg:pb-12 px-4 sm:px-8 md:px-16 lg:px-32 mx-auto flex flex-col md:flex-row gap-4 md:gap-8 lg:gap-12 justify-center items-stretch'>
					{/* Short Course Card Skeleton */}
					<div className='h-full w-full md:w-[45%] lg:w-[42%] xl:w-[40%]'>
						<SkeletonElement className='w-full h-80' variant='rounded' />
					</div>

					{/* Scholarship Card Skeleton */}
					<div className='h-full w-full md:w-[45%] lg:w-[42%] xl:w-[40%]'>
						<SkeletonElement className='w-full h-80' variant='rounded' />
					</div>
				</div>

				{/* Popular Course Section Skeleton */}
				<div className='w-full py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-8 md:px-16 lg:px-32 mx-auto'>
					{/* Section Title */}
					<div className='text-center mb-8 space-y-3'>
						<SkeletonElement className='h-8 w-64 mx-auto' variant='text' />
						<SkeletonElement className='h-4 w-96 mx-auto' variant='text' />
					</div>

					{/* Course Cards Skeleton */}
					<div className='flex gap-4 overflow-hidden'>
						{[...Array(3)].map((_, index) => (
							<div key={index} className='flex-shrink-0 w-80'>
								<SkeletonElement className='w-full h-64' variant='rounded' />
							</div>
						))}
					</div>
				</div>

				{/* Statistics Section Skeleton */}
				<div className='bg-background py-24 sm:py-32'>
					<div className='mx-auto max-w-7xl px-6 lg:px-8'>
						<div className='mx-auto max-w-2xl lg:max-w-none'>
							{/* Section Header */}
							<div className='text-center space-y-4 mb-16'>
								<SkeletonElement className='h-10 w-80 mx-auto' variant='text' />
								<SkeletonElement className='h-6 w-96 mx-auto' variant='text' />
							</div>

							{/* Stats Grid */}
							<div className='mt-16 py-8 grid grid-cols-1 gap-4 sm:gap-6 md:gap-4 lg:gap-6 text-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
								{[...Array(8)].map((_, index) => (
									<div
										key={index}
										className='bg-card border border-border p-6 sm:p-8 shadow-sm rounded-lg'>
										<SkeletonElement
											className='h-8 w-16 mx-auto mb-4'
											variant='text'
										/>
										<SkeletonElement
											className='h-4 w-20 mx-auto'
											variant='text'
										/>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>

				{/* Offering Section Skeleton */}
				<div className='w-full py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-8 md:px-16 lg:px-32 mx-auto'>
					{/* Section Title */}
					<div className='text-center mb-12 space-y-3'>
						<SkeletonElement className='h-8 w-48 mx-auto' variant='text' />
						<SkeletonElement className='h-4 w-80 mx-auto' variant='text' />
					</div>

					{/* Offering Cards Grid */}
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{[...Array(6)].map((_, index) => (
							<SkeletonElement
								key={index}
								className='w-full h-48'
								variant='rounded'
							/>
						))}
					</div>
				</div>

				{/* Why Choose EXSTAD Section Skeleton */}
				<div className='w-full py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-8 md:px-16 lg:px-32 mx-auto'>
					<SkeletonElement className='w-full h-96' variant='rounded' />
				</div>

				{/* Recommended Course Section Skeleton */}
				<div className='w-full py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-8 md:px-16 lg:px-32 mx-auto'>
					{/* Section Title */}
					<div className='text-center mb-8 space-y-3'>
						<SkeletonElement className='h-8 w-64 mx-auto' variant='text' />
						<SkeletonElement className='h-4 w-96 mx-auto' variant='text' />
					</div>

					{/* Recommended Course Cards */}
					<div className='flex gap-4 overflow-hidden'>
						{[...Array(3)].map((_, index) => (
							<div key={index} className='flex-shrink-0 w-80'>
								<SkeletonElement className='w-full h-64' variant='rounded' />
							</div>
						))}
					</div>
				</div>

				{/* Partners Section Skeleton */}
				<div className='w-full py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-8 md:px-16 lg:px-32 mx-auto'>
					{/* Section Title */}
					<div className='text-center mb-12'>
						<SkeletonElement className='h-8 w-48 mx-auto' variant='text' />
					</div>

					{/* Partner Logos Grid */}
					<div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center'>
						{[...Array(12)].map((_, index) => (
							<SkeletonElement
								key={index}
								className='w-full h-16'
								variant='rounded'
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
