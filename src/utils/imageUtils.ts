/** @format */

import { IMAGE_CONFIG, IMAGE_SIZES, ImageSizeType } from "@/config/imageConfig";

/**
 * Utility function to add size parameters to image URLs
 * This can be customized based on your backend/CDN image transformation service
 */

/**
 * Adds size parameters to image URL for API fetching
 * @param url - Original image URL from API
 * @param width - Desired width in pixels (default: 1280)
 * @param height - Desired height in pixels (default: 1280)
 * @returns URL with size parameters
 */
export function addImageSizeParams(
	url: string | undefined,
	width: number = IMAGE_CONFIG.POSTER_WIDTH,
	height: number = IMAGE_CONFIG.POSTER_HEIGHT
): string {
	if (!url) return "/fallback.png";

	// If it's already a fallback or relative path, return as is
	if (url.startsWith("/") || url === "fallback.png") {
		return url;
	}

	// Check if URL already has parameters
	const separator = url.includes("?") ? "&" : "?";

	// Add size parameters
	// Adjust this format based on your backend/CDN requirements
	// Common formats:
	// - ?width=1280&height=1280 (generic)
	// - ?w=1280&h=1280 (short form)
	// - ?size=1280x1280 (single parameter)
	// - ?resize=1280,1280 (some CDNs)

	return `${url}${separator}width=${width}&height=${height}`;
}

/**
 * Alternative formats for different CDN services:
 */

// For Cloudinary
export function addCloudinarySize(
	url: string | undefined,
	width: number = 1280,
	height: number = 1280
): string {
	if (!url) return "/fallback.png";
	if (url.startsWith("/")) return url;

	// Cloudinary format: insert transformation before the filename
	// Example: https://res.cloudinary.com/demo/image/upload/w_1280,h_1280/sample.jpg
	if (url.includes("cloudinary.com")) {
		return url.replace("/upload/", `/upload/w_${width},h_${height}/`);
	}

	return addImageSizeParams(url, width, height);
}

// For ImageKit
export function addImageKitSize(
	url: string | undefined,
	width: number = 1280,
	height: number = 1280
): string {
	if (!url) return "/fallback.png";
	if (url.startsWith("/")) return url;

	// ImageKit format: tr=w-1280,h-1280
	const separator = url.includes("?") ? "&" : "?";
	return `${url}${separator}tr=w-${width},h-${height}`;
}

// For AWS S3 + Lambda (or similar)
export function addS3LambdaSize(
	url: string | undefined,
	width: number = 1280,
	height: number = 1280
): string {
	if (!url) return "/fallback.png";
	if (url.startsWith("/")) return url;

	const separator = url.includes("?") ? "&" : "?";
	return `${url}${separator}w=${width}&h=${height}`;
}

/**
 * Adds predefined size parameters to image URL
 * @param url - Original image URL from API
 * @param sizeType - Predefined size type ('poster', 'thumbnail', 'preview', etc.)
 * @returns URL with size parameters
 */
export function addImageSize(
	url: string | undefined,
	sizeType: ImageSizeType = "poster"
): string {
	const { width, height } = IMAGE_SIZES[sizeType];
	return addImageSizeParams(url, width, height);
}
