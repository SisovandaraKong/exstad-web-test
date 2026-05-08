/** @format */

interface StarburstIconProps {
	size?: number;
	className?: string;
}

export function StarburstIcon({
	size = 80,
	className = "",
}: StarburstIconProps) {
	return (
		<svg
			width={size}
			height={size}
			viewBox='0 0 80 80'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			className={className}>
			{/* Top ray */}
			<ellipse cx='40' cy='18' rx='3.5' ry='14' fill='#E85A5A' />

			{/* Top-right diagonal ray */}
			<ellipse
				cx='40'
				cy='18'
				rx='3.5'
				ry='14'
				fill='#E85A5A'
				transform='rotate(45 40 40)'
			/>

			{/* Right ray */}
			<ellipse
				cx='40'
				cy='18'
				rx='3.5'
				ry='14'
				fill='#E85A5A'
				transform='rotate(90 40 40)'
			/>

			{/* Bottom-right diagonal ray */}
			<ellipse
				cx='40'
				cy='18'
				rx='3.5'
				ry='14'
				fill='#E85A5A'
				transform='rotate(135 40 40)'
			/>

			{/* Bottom ray */}
			<ellipse
				cx='40'
				cy='18'
				rx='3.5'
				ry='14'
				fill='#E85A5A'
				transform='rotate(180 40 40)'
			/>

			{/* Bottom-left diagonal ray */}
			<ellipse
				cx='40'
				cy='18'
				rx='3.5'
				ry='14'
				fill='#E85A5A'
				transform='rotate(225 40 40)'
			/>

			{/* Left ray */}
			<ellipse
				cx='40'
				cy='18'
				rx='3.5'
				ry='14'
				fill='#E85A5A'
				transform='rotate(270 40 40)'
			/>

			{/* Top-left diagonal ray */}
			<ellipse
				cx='40'
				cy='18'
				rx='3.5'
				ry='14'
				fill='#E85A5A'
				transform='rotate(315 40 40)'
			/>
		</svg>
	);
}
