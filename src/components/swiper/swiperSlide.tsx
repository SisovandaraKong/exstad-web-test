/** @format */
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { useRef } from "react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

// Import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Import component-specific styles (make sure this file exists)
import styles from "./SwiperSlideComponent.module.css";

import CourseCard from "../mostPopularCourseCard/CourseCard";
import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";

import { MasterProgramType } from "@/types/master-program";
import { openingProgramType } from "@/types/opening-program";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";

// --- Mock Data ---
// In a real Next.js app, this data would likely come from getStaticProps,
// getServerSideProps, or a client-side API call.
type Props = {
	programs: MasterProgramType[];
	openingPrograms?: openingProgramType[];
};
const SwiperSlideComponent_PopularCourse: React.FC<Props> = ({
	programs,
	openingPrograms = [],
}) => {
	const t = useTranslations();
	const getOpeningProgram = (programTitle: string) =>
		openingPrograms.find(
			(o) => o.programName === programTitle && o.status === "OPEN"
		);

	// Correctly typed ref for Swiper instance
	const swiperRef = useRef<SwiperType | null>(null);

	return (
		<div className='w-full flex flex-col items-center sm:gap-5 lg:gap-10'>
			{/* Title and Navigation Section */}
			<div className='w-full flex flex-col sm:flex-row items-center justify-between gap-4'>
				<h2 className='text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-primary text-center sm:text-left'>
					{t("course-sections.popular-courses")}
				</h2>
				{/* Custom Navigation */}
				<div className='flex gap-2 sm:gap-3'>
					<button
						onClick={() => swiperRef.current?.slidePrev()}
						aria-label='Previous Slide'
						className='text-[#253C95] cursor-pointer hover:opacity-80 transition-opacity rounded-full p-2 sm:p-3'>
						<FaCircleArrowLeft className='w-4 h-4 sm:w-7 sm:h-7' />
					</button>
					<button
						onClick={() => swiperRef.current?.slideNext()}
						aria-label='Next Slide'
						className='text-[#253C95] cursor-pointer hover:opacity-80 transition-opacity rounded-full p-2 sm:p-3'>
						<FaCircleArrowRight className='w-4 h-4 sm:w-7 sm:h-7' />
					</button>
				</div>
			</div>

			{/* Swiper Component */}
			<Swiper
				onSwiper={(swiper) => {
					swiperRef.current = swiper;
				}}
				modules={[Autoplay, Pagination, Navigation]}
				loop={true}
				spaceBetween={16}
				slidesPerView={1}
				pagination={{ clickable: true }}
				autoplay={{
					delay: 2500,
					disableOnInteraction: false,
				}}
				breakpoints={{
					// sm: 2 slides
					640: {
						slidesPerView: 2,
						spaceBetween: 20,
					},
					// md: 2 slides with more space
					768: {
						slidesPerView: 2,
						spaceBetween: 24,
					},
					// lg: 3 slides
					1024: {
						slidesPerView: 3,
						spaceBetween: 32,
					},
				}}
				// Apply the CSS Module class here
				className={`w-full mx-auto h-auto ${styles.swiperContainer}`}>
				{programs.map((program) => {
					const matchedOpeningProgram = getOpeningProgram(program.title);
					return (
						<SwiperSlide key={program.uuid} className='self-stretch h-full'>
							<CourseCard {...program} openingProgram={matchedOpeningProgram} />
						</SwiperSlide>
					);
				})}
			</Swiper>
		</div>
	);
};
export default SwiperSlideComponent_PopularCourse;
