/** @format */

import Image from "next/image";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import { withBasePath } from "@/lib/base-path";

type MainCardProps = {
	id: string;
	title: string;
	description: string;
	imageSrc?: string;
};

export default function ScholarshipCard({
	id,
	title,
	description,
	imageSrc = "/image/sampleImage/graduate-cap.png",
}: MainCardProps) {
	const t = useTranslations();

	return (
		<div className='w-full h-full min-h-[400px] sm:min-h-[450px] md:min-h-[500px]'>
			<div className='flex flex-col w-full h-full p-4 sm:p-6 md:p-8 lg:p-10 bg-white border border-gray-200 rounded-3xl shadow-sm dark:bg-gray-800 dark:border-gray-700 overflow-hidden'>
				{/* ABOVE SECTION: Title + Description + Button */}
				<div className='flex flex-col justify-start pb-4 sm:pb-6 md:pb-8'>
					<h5 className='mb-2 sm:mb-3 md:mb-4 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-gray-900 dark:text-white'>
						{title}
					</h5>
					<p className='mb-3 sm:mb-4 md:mb-6 text-sm sm:text-base md:text-[18px] font-normal text-gray-700 dark:text-gray-400'>
						{description}
					</p>
					<Button
						onClick={() => console.log("Button clicked")}
						className='bg-primary hover:bg-primary-hover text-white px-4 sm:px-6 py-2 rounded-full text-sm font-medium w-fit mt-2'>
						{t("main-cards.scholarship.button")}
					</Button>
				</div>

				{/* BELOW SECTION: Scholarship Image (Right-Bottom Edge) */}
				<div className='relative flex-1 min-h-[140px] sm:min-h-[200px] -mb-4 sm:-mb-6 md:-mb-8 lg:-mb-10 -mr-4 sm:-mr-6 md:-mr-8 lg:-mr-10'>
					{/* Scholarship Image - Hits Right-Bottom Edge */}
					<div className='absolute bottom-0 right-0 w-[60%] max-w-[220px] sm:max-w-[320px] md:max-w-[400px] lg:max-w-[460px]'>
						<Image
							unoptimized
							width={500}
							height={500}
							src={withBasePath(imageSrc)}
							alt='Scholarship student with graduation cap'
							className='w-full h-auto object-contain rounded-br-3xl'
							style={{ objectPosition: "bottom right" }}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
