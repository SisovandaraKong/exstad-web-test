/** @format */

export function StaticCard_NewCourses() {
	const courses = [
		"Graphics Design",
		"Web Design",
		"UI/UX Design",
		"Web development",
	];

	return (
		<div className='w-full max-w-[230px] bg-gray-800 rounded-3xl p-3 flex flex-col justify-center items-center shadow-lg aspect-square'>
			<h2 className='text-white text-xs sm:text-base md:text-lg font-bold mb-1 sm:mb-2'>
				New Courses
			</h2>
			<div className='flex flex-col gap-1 sm:gap-2 flex-1 justify-center w-full'>
				{courses.map((course, index) => (
					<div key={index} className='flex items-center gap-1 sm:gap-2 w-full'>
						<div className='w-5 sm:w-6 h-1 bg-gradient-to-r from-[#7777FF] to-[#FF0000] rounded-full flex-shrink-0'></div>
						<span className='text-white text-[10px] sm:text-xs md:text-sm'>
							{course}
						</span>
					</div>
				))}
			</div>
		</div>
	);
}
