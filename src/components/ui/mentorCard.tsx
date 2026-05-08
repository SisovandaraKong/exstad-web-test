/** @format */
import Image from "next/image";
import {
	motion,
	useMotionValue,
	useSpring,
	useTransform,
	useMotionTemplate,
} from "framer-motion";
import { FaFacebook, FaGithub, FaTelegram } from "react-icons/fa";
import { useRef } from "react";

// Custom styles for text shadow
const textShadowStyles = {
	textShadowLg: {
		textShadow:
			"2px 2px 4px rgba(0, 0, 0, 0.8), 0px 0px 8px rgba(0, 0, 0, 0.6)",
	},
	textShadowMd: {
		textShadow:
			"1px 1px 3px rgba(0, 0, 0, 0.7), 0px 0px 6px rgba(0, 0, 0, 0.5)",
	},
};

interface MentorCardProps {
	image: string;
	name: string;
	role: string;
	social: {
		facebook: string;
		github: string;
		telegram: string;
	};
}

export default function MentorCard({
	image,
	name,
	role,
	social,
}: MentorCardProps) {
	const ref = useRef<HTMLDivElement>(null);

	const x = useMotionValue(0);
	const y = useMotionValue(0);

	const mouseXSpring = useSpring(x);
	const mouseYSpring = useSpring(y);

	const rotateX = useTransform(
		mouseYSpring,
		[-0.5, 0.5],
		["17.5deg", "-17.5deg"]
	);
	const rotateY = useTransform(
		mouseXSpring,
		[-0.5, 0.5],
		["-17.5deg", "17.5deg"]
	);

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!ref.current) return;

		const rect = ref.current.getBoundingClientRect();
		const width = rect.width;
		const height = rect.height;

		const mouseX = (e.clientX - rect.left) / width - 0.5;
		const mouseY = (e.clientY - rect.top) / height - 0.5;

		x.set(mouseX);
		y.set(mouseY);
	};

	const handleMouseLeave = () => {
		x.set(0);
		y.set(0);
	};

	return (
		<div className='w-full max-w-[160px] sm:max-w-[200px] md:max-w-[240px] lg:max-w-[280px] xl:max-w-[320px] rounded-full text-center p-1 sm:p-2 md:p-4'>
			{/* Circular Image with Overlay Content */}
			<motion.div
				ref={ref}
				onMouseMove={handleMouseMove}
				onMouseLeave={handleMouseLeave}
				style={{
					rotateY,
					rotateX,
					transformStyle: "preserve-3d",
				}}
				className='relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-60 lg:h-60 xl:w-72 xl:h-72 mx-auto rounded-full group cursor-pointer'>
				<div className='relative w-full h-full rounded-full overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 aspect-square border border-white/10'>
					<Image
						src={image}
						alt={name || "Speaker image"}
						fill
						sizes='(max-width: 768px) 100vw, 320px'
						className='object-cover group-hover:scale-105 transition-transform duration-300'
					/>

					{/* Enhanced Gradient Overlay */}
					<div className='absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-100 transition-opacity duration-300' />

					{/* Additional Shadow Layer for Text */}
					<div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent' />

					{/* Content Overlay */}
					<div className='absolute bottom-0 left-0 right-0 p-1 sm:p-2 md:p-3 lg:p-4 xl:p-6 text-center transform translate-y-0 transition-transform duration-300'>
						{/* Name */}
						<h2
							className='text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold text-white mb-0.5 sm:mb-1 opacity-100 transition-opacity duration-300 delay-100 drop-shadow-lg'
							style={textShadowStyles.textShadowLg}>
							{name}
						</h2>

						{/* Role */}
						<p
							className='text-[10px] sm:text-xs md:text-sm lg:text-sm xl:text-sm text-white/95 font-medium mb-1 sm:mb-2 opacity-100 transition-opacity duration-300 delay-200 drop-shadow-md'
							style={textShadowStyles.textShadowMd}>
							{role}
						</p>

						{/* Social Icons */}
						<div className='flex justify-center space-x-1 sm:space-x-2 md:space-x-3 opacity-100 transition-opacity duration-300 delay-300'>
							<a
								href={social.facebook}
								target='_blank'
								rel='noopener noreferrer'
								className='text-white hover:text-[#1877F2] transition-all duration-200 p-1 sm:p-1.5 md:p-2 rounded-full hover:bg-white hover:shadow-md backdrop-blur-sm'
								aria-label={`${name} Facebook`}>
								<FaFacebook
									size={12}
									className='sm:w-[14px] sm:h-[14px] md:w-[16px] md:h-[16px] lg:w-[18px] lg:h-[18px]'
								/>
							</a>
							<a
								href={social.github}
								target='_blank'
								rel='noopener noreferrer'
								className='text-white hover:text-[#333333] transition-all duration-200 p-1 sm:p-1.5 md:p-2 rounded-full hover:bg-white hover:shadow-md backdrop-blur-sm'
								aria-label={`${name} GitHub`}>
								<FaGithub
									size={12}
									className='sm:w-[14px] sm:h-[14px] md:w-[16px] md:h-[16px] lg:w-[18px] lg:h-[18px]'
								/>
							</a>
							<a
								href={social.telegram}
								target='_blank'
								rel='noopener noreferrer'
								className='text-white hover:text-[#0088CC] transition-all duration-200 p-1 sm:p-1.5 md:p-2 rounded-full hover:bg-white hover:shadow-md backdrop-blur-sm'
								aria-label={`${name} Telegram`}>
								<FaTelegram
									size={12}
									className='sm:w-[14px] sm:h-[14px] md:w-[16px] md:h-[16px] lg:w-[18px] lg:h-[18px]'
								/>
							</a>
						</div>
					</div>
				</div>
			</motion.div>
		</div>
	);
}
