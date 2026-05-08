/** @format */

"use client";

import React, { useState, useEffect } from "react";
import { PageSkeleton } from "./PageSkeleton";

interface LoadingWrapperProps {
	children: React.ReactNode;
	loadingDuration?: number; // Duration in milliseconds
	className?: string;
}

export const LoadingWrapper: React.FC<LoadingWrapperProps> = ({
	children,
	loadingDuration = 2000, // Default 2 seconds
	className = "",
}) => {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, loadingDuration);

		return () => clearTimeout(timer);
	}, [loadingDuration]);

	if (isLoading) {
		return (
			<div className={`w-full h-full ${className}`}>
				<PageSkeleton />
			</div>
		);
	}

	return <>{children}</>;
};
