/** @format */

"use client";
import { motion } from "framer-motion";
import { Loader2, Globe } from "lucide-react";
import { useTranslations } from "next-intl";

interface LanguageLoadingOverlayProps {
	isVisible: boolean;
	currentLocale: string;
	nextLocale: string;
}

export function LanguageLoadingOverlay({
	isVisible,
	currentLocale,
	nextLocale,
}: LanguageLoadingOverlayProps) {
	const t = useTranslations();

	if (!isVisible) return null;

	const getLanguageName = (locale: string) => {
		return locale === "en" ? "English" : "ខ្មែរ";
	};

	return (
		<motion.div
			className='fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.2 }}>
			<motion.div
				className='language-loading-overlay bg-background border border-border rounded-2xl p-8 shadow-2xl max-w-sm w-full mx-4'
				initial={{ opacity: 0, scale: 0.9, y: 20 }}
				animate={{ opacity: 1, scale: 1, y: 0 }}
				exit={{ opacity: 0, scale: 0.9, y: 20 }}
				transition={{ duration: 0.3, ease: "easeOut" }}>
				{/* Loading Animation */}
				<div className='flex flex-col items-center space-y-4'>
					{/* Icon with spinning loader */}
					<div className='relative'>
						<Globe className='w-12 h-12 text-primary' />
						<motion.div
							animate={{ rotate: 360 }}
							transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
							className='absolute -inset-2'>
							<Loader2 className='w-16 h-16 text-primary/30' />
						</motion.div>
					</div>

					{/* Text Content */}
					<div className='text-center space-y-2'>
						<h3 className='text-lg font-semibold text-foreground'>
							{t("language-loading.switching-title")}
						</h3>
						<p className='text-sm text-muted-foreground'>
							{t("language-loading.switching-from-to", {
								from: getLanguageName(currentLocale),
								to: getLanguageName(nextLocale),
							})}
						</p>
					</div>

					{/* Progress Dots */}
					<div className='flex space-x-1'>
						{[0, 1, 2].map((i) => (
							<motion.div
								key={i}
								className='w-2 h-2 bg-primary rounded-full'
								animate={{
									scale: [1, 1.2, 1],
									opacity: [0.5, 1, 0.5],
								}}
								transition={{
									duration: 1,
									repeat: Infinity,
									delay: i * 0.2,
								}}
							/>
						))}
					</div>
				</div>
			</motion.div>
		</motion.div>
	);
}
