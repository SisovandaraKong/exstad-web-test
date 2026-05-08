/** @format */

// Assuming you have lucide-react installed.
// If not, run: npm install lucide-react
import { PiStudentBold } from "react-icons/pi";

export function StatisticsCard_10000() {
	return (
		<div className='w-full max-w-[230px] bg-gray-800 rounded-3xl p-3 flex flex-col justify-center items-center aspect-square'>
			{/* Orange icon in top left */}
			<div className=' top-6 left-3 flex items-center justify-center'>
				<PiStudentBold
					className='w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12'
					style={{ color: "#FFA500" }}
				/>
			</div>

			{/* Main statistic */}
			<div className='flex flex-col items-start justify-center flex-1  w-full gap-1'>
				<h1 className='text-white text-lg sm:text-xl md:text-2xl lg:text-2xl font-bold leading-none text-left w-full'>
					100000+
				</h1>
				<p className='text-white text-[10px] sm:text-xs md:text-sm leading-tight text-left mt-1 w-full'>
					Student Finished Course
					<br />
					Every Year
				</p>
			</div>

			{/* Chart area */}
			<div
				className='w-full flex-shrink-0 flex flex-col items-start justify-end gap-1'
				style={{ height: "48px" }}>
				<svg
					className='w-full h-5'
					viewBox='0 0 213 24'
					preserveAspectRatio='none'>
					<path
						d='M0,21 Q30,10 53,18 Q76,26 106,12 Q136,0 150,12 Q170,24 190,10 Q200,5 213,9'
						stroke='#f59e0b'
						strokeWidth='2'
						fill='none'
						strokeLinecap='round'
					/>
					<circle cx='213' cy='9' r='3' fill='#f59e0b' />
					<path
						d='M213,9 Q220,7 227,5'
						stroke='#6b7280'
						strokeWidth='2'
						fill='none'
						strokeLinecap='round'
					/>
				</svg>
				<div className='w-full flex justify-start text-white text-[8px] sm:text-[10px] md:text-xs px-1 gap-2'>
					<span>10000</span>
					<span>50000</span>
					<span>120000</span>
				</div>
			</div>
		</div>
	);
}
