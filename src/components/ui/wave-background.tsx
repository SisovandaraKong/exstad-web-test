/** @format */
"use client";
import { useEffect, useRef } from "react";

interface WaveBackgroundProps {
	className?: string;
	primaryColor?: string;
	secondaryColor?: string;
}

export function WaveBackground({
	className = "",
	primaryColor = "#253c95",
	secondaryColor = "#f73030",
}: WaveBackgroundProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const animationRef = useRef<number>();

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const resizeCanvas = () => {
			const rect = canvas.getBoundingClientRect();
			canvas.width = rect.width * window.devicePixelRatio;
			canvas.height = rect.height * window.devicePixelRatio;
			ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
		};

		resizeCanvas();
		window.addEventListener("resize", resizeCanvas);

		let time = 0;
		const animate = () => {
			const width = canvas.offsetWidth;
			const height = canvas.offsetHeight;
			const gridSize = 40;

			// Clear canvas
			ctx.clearRect(0, 0, width, height);

			// Set line properties
			ctx.lineWidth = 1;
			ctx.lineCap = "round";

			// Draw horizontal wavy grid lines
			for (let y = 0; y <= height; y += gridSize) {
				ctx.beginPath();
				ctx.strokeStyle = primaryColor + "20"; // 20% opacity

				for (let x = 0; x <= width; x += 2) {
					const waveY = y + Math.sin(x * 0.01 + time * 2 + y * 0.05) * 8;
					if (x === 0) {
						ctx.moveTo(x, waveY);
					} else {
						ctx.lineTo(x, waveY);
					}
				}
				ctx.stroke();
			}

			// Draw vertical wavy grid lines
			for (let x = 0; x <= width; x += gridSize) {
				ctx.beginPath();
				ctx.strokeStyle = secondaryColor + "15"; // 15% opacity

				for (let y = 0; y <= height; y += 2) {
					const waveX = x + Math.sin(y * 0.01 + time * 1.5 + x * 0.03) * 6;
					if (y === 0) {
						ctx.moveTo(waveX, y);
					} else {
						ctx.lineTo(waveX, y);
					}
				}
				ctx.stroke();
			}

			time += 0.01;
			animationRef.current = requestAnimationFrame(animate);
		};

		animate();

		return () => {
			window.removeEventListener("resize", resizeCanvas);
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current);
			}
		};
	}, [primaryColor, secondaryColor]);

	return (
		<canvas
			ref={canvasRef}
			className={`absolute inset-0 w-full h-full ${className}`}
			style={{ pointerEvents: "none" }}
		/>
	);
}
