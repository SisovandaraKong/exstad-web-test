/** @format */

"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface LanguageLoadingContextType {
	isLoading: boolean;
	currentLocale: string;
	nextLocale: string;
	startLanguageSwitch: (from: string, to: string) => void;
	stopLanguageSwitch: () => void;
}

const LanguageLoadingContext = createContext<LanguageLoadingContextType | null>(
	null
);

export function LanguageLoadingProvider({ children }: { children: ReactNode }) {
	const [isLoading, setIsLoading] = useState(false);
	const [currentLocale, setCurrentLocale] = useState("");
	const [nextLocale, setNextLocale] = useState("");

	const startLanguageSwitch = (from: string, to: string) => {
		setCurrentLocale(from);
		setNextLocale(to);
		setIsLoading(true);
	};

	const stopLanguageSwitch = () => {
		setIsLoading(false);
		setCurrentLocale("");
		setNextLocale("");
	};

	return (
		<LanguageLoadingContext.Provider
			value={{
				isLoading,
				currentLocale,
				nextLocale,
				startLanguageSwitch,
				stopLanguageSwitch,
			}}>
			{children}
		</LanguageLoadingContext.Provider>
	);
}

export function useLanguageLoading() {
	const context = useContext(LanguageLoadingContext);
	if (!context) {
		throw new Error(
			"useLanguageLoading must be used within a LanguageLoadingProvider"
		);
	}
	return context;
}
