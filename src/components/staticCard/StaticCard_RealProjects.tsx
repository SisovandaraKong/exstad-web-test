/** @format */

// Assuming you have lucide-react installed.
// If not, run: npm install lucide-react
import { PackageCheck } from "lucide-react";

export default function StaticCard_RealProjects() {
	return (
		<div className='w-full max-w-[230px] bg-white rounded-3xl shadow-2xl p-3 flex flex-col justify-center items-center aspect-square'>
			{/* Icon section */}
			<div className='flex items-center justify-center p-2'>
				<PackageCheck
					style={{ color: "#3b82f6" }}
					// Responsive icon size using Tailwind's breakpoint modifiers.
					className='w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12'
				/>
			</div>
			<div className='flex flex-col gap-1 flex-1 w-full items-center justify-center'>
				<h1 className='text-sm sm:text-base md:text-lg font-bold text-gray-900 text-center w-full'>
					Real Projects
				</h1>
				<p className='text-gray-600 text-xs text-center sm:text-sm leading-tight w-full px-2'>
					All ISTAD students must complete real-world projects to graduate.
				</p>
			</div>
		</div>
	);
}
