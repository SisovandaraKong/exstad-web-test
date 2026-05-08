
// /** @format */

// import { Swiper, SwiperSlide } from "swiper/react";
// import { useRef } from "react";
// import type { Swiper as SwiperType } from "swiper";
// import "swiper/css";
// import "swiper/css/pagination";

// // Import required modules
// import { Autoplay, Pagination, Navigation } from "swiper/modules";

// // Import component-specific styles (make sure this file exists)
// import styles from "./SwiperSlideComponent.module.css";

// import CourseCard from "../mostPopularCourseCard/CourseCard";
// import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";

// // --- Mock Data ---
// // In a real Next.js app, this data would likely come from getStaticProps,
// // getServerSideProps, or a client-side API call.
// const popularCourses = [
// 	{
// 		id: "1",
// 		title: "UI/UX Design Masterclass",
// 		description:
// 			"Use Figma to get a job in UI Design, User Interface, User Experience design.",
// 		category: "Design",
// 		image:
// 			"https://img.freepik.com/free-vector/gradient-ui-ux-background_23-2149052117.jpg?semt=ais_hybrid&w=740&q=80",
// 	},
// 	{
// 		id: "2",
// 		title: "React for Beginners",
// 		description:
// 			"Learn the fundamentals of React and build modern web applications.",
// 		category: "Development",
// 		image:
// 			"https://img.freepik.com/free-photo/programming-background-with-person-working-with-codes-computer_23-2150010125.jpg?semt=ais_hybrid&w=740&q=80",
// 	},
// 	{
// 		id: "3",
// 		title: "Digital Marketing Essentials",
// 		description:
// 			"Master SEO, social media marketing, and content strategy to grow businesses.",
// 		category: "Marketing",
// 		image:
// 			"https://img.freepik.com/free-photo/social-media-marketing-concept-marketing-with-applications_23-2150063134.jpg?semt=ais_hybrid&w=740&q=80",
// 	},
// 	{
// 		id: "4",
// 		title: "Advanced JavaScript Concepts",
// 		description:
// 			"Dive deep into closures, promises, and async/await to become a JS pro.",
// 		category: "Development",
// 		image:
// 			"https://img.freepik.com/free-photo/person-front-computer-showing-html-codes_23-2150040428.jpg?semt=ais_hybrid&w=740&q=80",
// 	},
// ];

// const SwiperSlideComponent = () => {
// 	// Correctly typed ref for Swiper instance
// 	const swiperRef = useRef<SwiperType | null>(null);

// 	return (
// 		<div className='w-full flex flex-col items-center sm:gap-5 lg:gap-10'>
// 			{/* Title and Navigation Section */}
// 			<div className='w-full flex flex-col sm:flex-row items-center justify-between gap-4'>
// 				<h2 className='text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white text-center sm:text-left'>
// 					Our Most Popular Course
// 				</h2>

// 				{/* Custom Navigation */}
// 				<div className='flex gap-4 sm:gap-6 '>
// 					<button
// 						onClick={() => swiperRef.current?.slidePrev()}
// 						aria-label='Previous Slide'
// 						className='text-[#253C95] hover:opacity-80 transition-opacity rounded-3xl p-2'>
// 						<FaCircleArrowLeft className='w-8 h-8 sm:w-10 sm:h-10' />
// 					</button>
// 					<button
// 						onClick={() => swiperRef.current?.slideNext()}
// 						aria-label='Next Slide'
// 						className='text-[#253C95] hover:opacity-80 transition-opacity rounded-3xl p-2'>
// 						<FaCircleArrowRight className='w-8 h-8 sm:w-10 sm:h-10' />
// 					</button>
// 				</div>
// 			</div>

// 			{/* Swiper Component */}
// 			<Swiper
// 				onSwiper={(swiper) => {
// 					swiperRef.current = swiper;
// 				}}
// 				modules={[Autoplay, Pagination, Navigation]}
// 				loop={true}
// 				spaceBetween={24}
// 				slidesPerView={1}
// 				pagination={{ clickable: true }}
// 				autoplay={{
// 					delay: 2500,
// 					disableOnInteraction: false,
// 				}}
// 				breakpoints={{
// 					// sm: 2 slides
// 					640: {
// 						slidesPerView: 2,
// 						spaceBetween: 24,
// 					},
// 					// lg: 3 slides
// 					1024: {
// 						slidesPerView: 3,
// 						spaceBetween: 32,
// 					},
// 				}}
// 				// Apply the CSS Module class here
// 				className={`w-full h-auto ${styles.swiperContainer}`}>
// 				{popularCourses.map((course) => (
// 					<SwiperSlide key={course.id} className='self-stretch h-full p-2'>
// 						{/* Assuming CourseCard handles its own styling */}
// 						<CourseCard course={course} />
// 					</SwiperSlide>
// 				))}
// 			</Swiper>
// 		</div>
// 	);
// };
// export default SwiperSlideComponent;