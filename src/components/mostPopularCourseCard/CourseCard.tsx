/** @format */

"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { MasterProgramType } from "@/types/master-program";
import { openingProgramType } from "@/types/opening-program";
import { useRouter } from "next/navigation";
import { addImageSizeParams } from "@/utils/imageUtils";
import Link from "next/link";

interface ScholarshipCardProps extends MasterProgramType {
	openingProgram?: openingProgramType;
}

const CourseCard: React.FC<ScholarshipCardProps> = ({
	openingProgram,
	title,
	programType,
	description,
}) => {
	const router = useRouter();
	const formatProgramType = (type?: string) => {
		if (!type) return "";
		return type
			.split("_")
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(" ");
	};

	return (
		<div
			className={`w-full max-w-full sm:max-w-[350px] md:max-w-[380px] lg:max-w-[400px] xl:max-w-[420px] overflow-hidden p-6 sm:p-4 md:p-5 lg:p-6 bg-white dark:bg-input/30 border border-gray-200 dark:border-gray-800 rounded-xl sm:rounded-2xl md:rounded-3xl shadow-sm hover:shadow-md transition-all duration-200 ${
				title || ""
			}`}>
			<div className='relative aspect-square mb-2 sm:mb-3 md:mb-4 lg:mb-5'>
				<Link href={`/explore-course/${openingProgram!.slug}`}>
					<Image
						src={addImageSizeParams(openingProgram?.posterUrl, 1280, 1280)}
						alt={title}
						fill
						className='object-cover cursor-pointer rounded-lg sm:rounded-xl md:rounded-2xl'
						unoptimized
					/>
				</Link>
			</div>
			<div className='flex flex-col h-full'>
				<div className='flex flex-col gap-2 sm:gap-3 md:gap-4 flex-grow'>
					<div className='flex flex-col gap-2 sm:gap-3'>
						<span className='text-xs sm:text-sm md:text-base font-medium text-orange-600 dark:text-orange-400 uppercase tracking-wide'>
							{formatProgramType(programType)}
						</span>
						<h3 className='text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-gray-900 dark:text-gray-100 leading-tight line-clamp-2 sm:line-clamp-1'>
							{title}
						</h3>
					</div>
					<p className='text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2 flex-grow'>
						{description}
					</p>
					<div className='pt-2 sm:pt-3 md:pt-4 mt-auto'>
						<Link href={`/explore-course/${openingProgram!.slug}/enrollment`}>
							<Button
								className='bg-primary cursor-pointer hover:bg-primary-hover text-white px-4 sm:px-6 py-2 rounded-full text-sm font-medium w-fit mt-2'
								>
								Enroll Now
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
export default CourseCard;
