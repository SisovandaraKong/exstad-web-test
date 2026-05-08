/**
 * Global configuration for image sizes across the application
 *
 * @format
 */

export const IMAGE_CONFIG = {
	// Default size for course/program poster images
	POSTER_WIDTH: 1280,
	POSTER_HEIGHT: 1280,

	// Alternative sizes for different use cases
	THUMBNAIL_WIDTH: 320,
	THUMBNAIL_HEIGHT: 320,

	PREVIEW_WIDTH: 800,
	PREVIEW_HEIGHT: 800,

	// Hero/Banner images
	HERO_WIDTH: 1920,
	HERO_HEIGHT: 1080,

	// Profile images
	PROFILE_WIDTH: 512,
	PROFILE_HEIGHT: 512,
} as const;

/**
 * Predefined image size configurations
 */
export const IMAGE_SIZES = {
	poster: {
		width: IMAGE_CONFIG.POSTER_WIDTH,
		height: IMAGE_CONFIG.POSTER_HEIGHT,
	},
	thumbnail: {
		width: IMAGE_CONFIG.THUMBNAIL_WIDTH,
		height: IMAGE_CONFIG.THUMBNAIL_HEIGHT,
	},
	preview: {
		width: IMAGE_CONFIG.PREVIEW_WIDTH,
		height: IMAGE_CONFIG.PREVIEW_HEIGHT,
	},
	hero: { width: IMAGE_CONFIG.HERO_WIDTH, height: IMAGE_CONFIG.HERO_HEIGHT },
	profile: {
		width: IMAGE_CONFIG.PROFILE_WIDTH,
		height: IMAGE_CONFIG.PROFILE_HEIGHT,
	},
} as const;

export type ImageSizeType = keyof typeof IMAGE_SIZES;
