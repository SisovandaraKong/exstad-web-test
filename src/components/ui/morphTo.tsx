/** @format */

"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MorphToProps {
	className?: string;
	width?: number;
	height?: number;
	centerX?: number;
	centerY?: number;
	minRadius?: number;
	maxRadius?: number;
	minPoints?: number;
	maxPoints?: number;
	duration?: number;
	autoPlay?: boolean;
}

export default function MorphTo({
	className,
	width = 304,
	height = 112,
	centerX = 152,
	centerY = 56,
	minRadius = 4,
	maxRadius = 56,
	minPoints = 4,
	maxPoints = 64,
	duration = 2,
	autoPlay = true,
}: MorphToProps) {
	const [currentPoints, setCurrentPoints] = useState<string>("");
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	// Random number generator
	const random = (min: number, max: number): number => {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	// Generate random points for morphing
	const generatePoints = (): string => {
		const total = random(minPoints, maxPoints);
		const r1 = random(minRadius, maxRadius);
		const r2 = maxRadius;
		const isOdd = (n: number) => n % 2;
		let points = "";

		for (let i = 0, l = isOdd(total) ? total + 1 : total; i < l; i++) {
			const r = isOdd(i) ? r1 : r2;
			const a = (2 * Math.PI * i) / l - Math.PI / 2;
			const x = centerX + Math.round(r * Math.cos(a));
			const y = centerY + Math.round(r * Math.sin(a));
			points += `${x},${y} `;
		}
		return points.trim();
	};

	// Initialize points
	useEffect(() => {
		setCurrentPoints(generatePoints());
	}, []);

	// Auto-morphing animation
	useEffect(() => {
		if (!autoPlay) return;

		const startMorphing = () => {
			intervalRef.current = setInterval(() => {
				setCurrentPoints(generatePoints());
			}, duration * 1000);
		};

		startMorphing();

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, [
		autoPlay,
		duration,
		centerX,
		centerY,
		minRadius,
		maxRadius,
		minPoints,
		maxPoints,
	]);

	return (
		<div className={cn("relative", className)}>
			<svg
				width={width}
				height={height}
				viewBox={`0 0 ${width} ${height}`}
				className='overflow-visible'>
				<motion.polygon
					points={currentPoints}
					fill='currentColor'
					className='text-blue-500/20 dark:text-blue-400/20'
					initial={{ opacity: 0 }}
					animate={{
						opacity: 1,
						points: currentPoints,
					}}
					transition={{
						duration: duration * 0.8,
						ease: "easeInOut",
						points: {
							duration: duration * 0.8,
							ease: "easeInOut",
						},
					}}
				/>
			</svg>
		</div>
	);
}
