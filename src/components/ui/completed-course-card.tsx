"use client";

import React from "react";
import clsx from "clsx";
import Image from "next/image";

export type CompletedCourseDTO = {
  uuid: string;
  programName: string;
  generation?: number;
  posterUrl?: string;
};

type Props = {
  course: CompletedCourseDTO;
  ctaText?: string;
  variant?: "dark" | "light";
};

export default function CompletedCourseCard({
  course,
  ctaText = "Completed",
  variant = "dark",
}: Props) {
  const { programName, generation, posterUrl } = course;
  const img = posterUrl || "/course-fallback.jpg";
  const isLight = variant === "light";

  return (
    <div
      className={clsx(
        "group relative w-full max-w-xl overflow-hidden rounded-[32px]",
        "min-h-[340px] sm:min-h-[380px]", // 🧩 smaller than before
        isLight ? "bg-white" : "bg-black",
        "transition-all duration-500 hover:-translate-y-[2px] hover:shadow-xl"
      )}
    >
      {/* Full-cover image */}
      <Image
      width={600}
        height={400}
        unoptimized
        src={img}
        alt={programName}
        className="absolute inset-0 block w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
      />

      {/* Hover gradient overlay */}
      <div
        className={clsx(
          "pointer-events-none absolute inset-0 transition-opacity duration-500",
          "bg-gradient-to-br from-white via-white/90 to-white/70 opacity-0 group-hover:opacity-100"
        )}
      />

      {/* Text content */}
      <div
        className={clsx(
          "absolute inset-y-0 left-0 p-6 sm:p-8 flex flex-col justify-center z-10",
          isLight ? "text-gray-900" : "text-white",
          "max-w-[70%] translate-x-[-20%] opacity-0",
          "group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-black transition-all duration-500"
        )}
      >
        <h3 className="text-xl sm:text-2xl font-bold mb-2 leading-snug">
          {programName}
        </h3>

        {generation && (
          <p className="text-sm mb-5 transition-colors duration-300 group-hover:text-black">
            Generation {generation}
          </p>
        )}

        <div
          className={clsx(
            "inline-flex items-center justify-center rounded-full font-semibold text-xs sm:text-sm px-4 py-2 border backdrop-blur-md select-none pointer-events-none transition-all duration-300",
            isLight
              ? "bg-black/70 text-white border-black/20"
              : "bg-white/15 text-white border-white/30",
            "group-hover:bg-accent group-hover:text-black"
          )}
        >
          {ctaText}
        </div>
      </div>
    </div>
  );
}
