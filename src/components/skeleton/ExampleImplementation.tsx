/** @format */

"use client";

import { motion } from "framer-motion";

// Import skeleton components
import { LoadingWrapper, EnhancedPageSkeleton } from "./index";

export default function HomeWithSkeleton() {
	return (
		<LoadingWrapper
			loadingDuration={2500} // Show skeleton for 2.5 seconds
			className='min-h-screen'>
			<motion.div
				className='min-h-screen flex flex-col bg-background overflow-x-hidden'
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.6, ease: "easeOut" }}>
				<div className='w-full max-w-full overflow-x-hidden'>
					<motion.div
						className='flex flex-col lg:flex-row w-full py-6 sm:py-8 md:py-10 px-4 sm:px-6 md:px-8 lg:px-32 mx-auto max-w-full overflow-hidden'
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}>
						{/* Hero Section */}
						<motion.div
							className='w-full lg:w-1/2 max-w-full mx-auto min-h-[140px] sm:min-h-[180px] md:min-h-[200px] flex flex-col items-center justify-center mb-4 relative overflow-hidden'
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.8, delay: 0.4 }}>
							<motion.h1
								className='absolute inset-0 flex items-center justify-center font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl bg-gradient-to-r from-[#FF0000] to-[#7777FF] bg-clip-text text-transparent text-center px-3 sm:px-4 md:px-6 z-20 overflow-hidden leading-tight'
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.6 }}>
								Quality education is a key to your future success
							</motion.h1>
							<motion.div
								className='w-full flex items-center justify-center relative z-10'
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.6, delay: 0.8 }}>
								{/* AnimatedSpinner component removed - not found */}
							</motion.div>
						</motion.div>
					</motion.div>

					{/* Rest of your page content... */}
					{/* You would continue with all the sections from your original page.tsx */}
				</div>
			</motion.div>
		</LoadingWrapper>
	);
}

// Example of using individual skeleton components for specific sections
export function SectionWithSkeleton({
	children,
	isLoading = false,
}: {
	children: React.ReactNode;
	isLoading?: boolean;
}) {
	if (isLoading) {
		return <EnhancedPageSkeleton />;
	}

	return <>{children}</>;
}
