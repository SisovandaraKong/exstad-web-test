/** @format */

export function StaticCard_Internship() {
	const percentage = 92;
	const circumference = 2 * Math.PI * 45; // radius of 45
	const strokeDasharray = circumference;
	const strokeDashoffset = circumference - (percentage / 100) * circumference;

	return (
		<div className='w-full max-w-[230px] bg-white rounded-3xl shadow-2xl p-3 flex flex-col justify-center items-center aspect-square'>
			{/* Circular Progress */}
			<div className='relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0'>
				<svg
					className='w-full h-full transform -rotate-90'
					viewBox='0 0 100 100'>
					{/* Background circle */}
					<circle
						cx='50'
						cy='50'
						r='45'
						stroke='#e5e7eb'
						strokeWidth='8'
						fill='none'
					/>
					{/* Progress circle */}
					<circle
						cx='50'
						cy='50'
						r='45'
						stroke='url(#gradient)'
						strokeWidth='8'
						fill='none'
						strokeLinecap='round'
						strokeDasharray={strokeDasharray}
						strokeDashoffset={strokeDashoffset}
						className='transition-all duration-300 ease-in-out'
					/>
					{/* Gradient definition */}
					<defs>
						<linearGradient id='gradient' x1='0%' y1='0%' x2='100%' y2='0%'>
							<stop offset='0%' stopColor='#f59e0b' />
							<stop offset='100%' stopColor='#FFA500' />
						</linearGradient>
					</defs>
				</svg>
				{/* Percentage text */}
				<div className='absolute inset-0 flex items-center justify-center'>
					<span className='text-base sm:text-xl font-bold text-gray-800'>
						{percentage}%
					</span>
				</div>
			</div>
			{/* Content */}
			<div className='text-center flex flex-col items-center justify-center gap-1 flex-1 w-full'>
				<h2 className='text-xs sm:text-base md:text-lg font-bold text-gray-800'>
					Internship
				</h2>
				<p className='text-gray-600 text-[10px] sm:text-xs md:text-sm leading-tight w-full'>
					At ISTAD, 92% of students secure internships before graduation.
				</p>
			</div>
		</div>
	);
}
