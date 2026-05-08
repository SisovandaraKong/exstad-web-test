/** @format */

"use client";
import { useLanguageLoading } from "@/contexts/LanguageLoadingContext";
import { LanguageLoadingOverlay } from "./LanguageLoadingOverlay";

export function GlobalLanguageLoader() {
	const { isLoading, currentLocale, nextLocale } = useLanguageLoading();

	return (
		<LanguageLoadingOverlay
			isVisible={isLoading}
			currentLocale={currentLocale}
			nextLocale={nextLocale}
		/>
	);
}
