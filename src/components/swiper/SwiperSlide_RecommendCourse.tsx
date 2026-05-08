/** @format */
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { useRef } from "react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { Navigation } from "swiper/modules";
import styles from "./SwiperSlideComponent.module.css";
import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";
import { RecommendationCourseCard } from "../recommendationCourseCard/Recommendation_CourseCard";
// If you use external data, keep the import. Otherwise, define mock data here.
import { popularCourses } from "@/types/recommendationType";
import { useTranslations } from "next-intl";

const SwiperSlideComponent_RecommendedCourse = () => {
	const t = useTranslations();
	// Correctly typed ref for Swiper instance
	const swiperRef = useRef<SwiperType | null>(null);

	return (
		<div className='w-full flex flex-col items-center sm:gap-5 lg:gap-10'>
			{/* Title and Navigation Section */}
			<div className='w-full flex flex-col sm:flex-row items-center justify-between gap-4'>
				<h2 className='text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-primary text-center sm:text-left'>
					{t("course-sections.recommended-courses")}
				</h2>

				{/* Custom Navigation */}
				<div className='flex gap-4 sm:gap-6 '>
					<button
						onClick={() => swiperRef.current?.slidePrev()}
						aria-label='Previous Slide'
						className='text-[#253C95] cursor-pointer hover:opacity-80 transition-opacity rounded-3xl p-2'>
						<FaCircleArrowLeft className='w-4 h-4 sm:w-7 sm:h-7' />
					</button>
					<button
						onClick={() => swiperRef.current?.slideNext()}
						aria-label='Next Slide'
						className='text-[#253C95] cursor-pointer hover:opacity-80 transition-opacity rounded-3xl p-2'>
						<FaCircleArrowRight className='w-4 h-4 sm:w-7 sm:h-7' />
					</button>
				</div>
			</div>

			{/* Swiper Component */}
			<Swiper
				onSwiper={(swiper) => {
					swiperRef.current = swiper;
				}}
				modules={[Navigation]}
				loop={true}
				spaceBetween={16}
				slidesPerView={1}
				breakpoints={{
					// sm: 2 slides
					640: {
						slidesPerView: 2,
						spaceBetween: 16,
					},
					// lg: 3 slides
					1024: {
						slidesPerView: 3,
						spaceBetween: 20,
					},
				}}
				// Apply the CSS Module class here
				className={`w-full h-auto ${styles.swiperContainer}`}>
				{popularCourses.map((recommendation) => (
					<SwiperSlide
						key={recommendation.id}
						className='self-stretch h-full p-2'>
						<RecommendationCourseCard recommendation={recommendation} />
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};
export default SwiperSlideComponent_RecommendedCourse;
