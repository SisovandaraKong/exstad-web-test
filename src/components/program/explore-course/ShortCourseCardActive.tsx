/** @format */

"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MasterProgramType } from "@/types/master-program";
import { openingProgramType } from "@/types/opening-program";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useKhmerNumber } from "@/services/to-khmer-number";

interface ShortCourseCardProps extends MasterProgramType {
  openingProgram?: openingProgramType;
}

const ShortCourseCardActive: React.FC<ShortCourseCardProps> = ({
  // uuid,
  title,
  description,
  openingProgram,
}) => {
  const router = useRouter();
  const t = useTranslations();
  const handleEnrollClick = () => {
    if (!openingProgram?.slug) return; // safety check
    router.push(`/explore-course/${openingProgram.slug}/enrollment`);
  };
  const toKhmerNumber = useKhmerNumber();

  const durationParts = openingProgram?.duration?.split(" ") || [];
  const deadlineParts = openingProgram?.deadline.split(" ") || [];
  const number = durationParts[0] || "0";
  const unitKey = durationParts[1] || ""; // this should match your translation key, e.g., "months" or "hours"
  const deadlineNumber = deadlineParts[0] || "0";
  const deadlineUnitKey = deadlineParts[1] || "";
  const formatDeadline = (date: Date | string) => {
    const d = new Date(date);
    const day = d.getDate();
    const month = d.toLocaleString("en-US", { month: "short" }).toUpperCase(); // "AUG"
    return `${day} ${month}`;
  };
  return (
    <div className="w-full   grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 rounded-[24px] justify-between gap-1 md:gap-2 lg:gap-4 p-4 md:p-4 lg:p-6 bg-background [box-shadow:0px_8px_24px_rgba(0,0,0,0.05)]">
      {/* Course Image */}
      <Link href={`/explore-course/${openingProgram?.slug}`} className="block">
        <Image
          unoptimized
          src={openingProgram?.posterUrl || "/placeholder.jpg"}
          alt={title}
          width={500}
          height={300}
          className="w-full aspect-square rounded-[20px] object-cover sm:max-w-[300px] md:max-w-[400px] lg:max-w-[500px]"
        />
      </Link>

      {/* Course Info */}
      <div className="h-full flex flex-col">
        {/* Title & Scholarship */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex flex-col items-center">
            <div className="w-2 h-8 bg-gradient-to-b from-primary to-primary dark:from-accent dark:to-accent rounded-full"></div>
            <div className="w-1 h-4 bg-gradient-to-b from-primary to-transparent dark:from-accent dark:to-yellow-transparent rounded-full mt-1"></div>
          </div>
          <div className="flex flex-col">
            <Link
              href={`/explore-course/${openingProgram?.slug}`}
              className="block"
            >
              <h1 className="text-primary dark:text-white  text-[20px] md:text-2xl lg:text-3xl font-bold hover:text-primary-hover cursor-pointer">
                {title}
              </h1>
            </Link>
            <p className="text-secondary dark:text-accent font-bold text-[16px] md:text-[18px] lg:text-[20px]">
              {openingProgram?.scholarship != null
                ? toKhmerNumber(openingProgram.scholarship)
                : "0"}
              % {t("scholarship")}
            </p>
          </div>
        </div>

        {/* Description + Info */}
        <div className="h-full gap-2 flex flex-col justify-between">
          <p className="text-description font-normal text-[16px] md:text-[18px] lg:text-[20px] overflow-hidden text-ellipsis line-clamp-2 md:line-clamp-5 lg:line-clamp-none">
            {description}
          </p>

          <div className="flex justify-between items-center w-full gap-4 my-2">
            {/* Deadline */}
            <div className="sm:flex-1 border-b-4 text-center rounded-lg border-secondary text-secondary dark:text-white px-4 py-2">
              <p className="font-bold text-sm sm:text-base md:text-lg lg:text-xl">
                {openingProgram?.deadline
                  ? `${toKhmerNumber(
                      new Date(openingProgram.deadline).getDate()
                    )} ${t(
                      formatDeadline(openingProgram.deadline).split(" ")[1]
                    )}`
                  : ""}
              </p>
              <p className="text-xs md:text-base lg:text-lg">{t("deadline")}</p>
            </div>

            {/* Duration */}
            <div className="flex-1 border-b-4 text-center rounded-lg border-primary  text-primary dark:text-white px-4 py-2">
              <p className="font-bold text-sm sm:text-base md:text-lg lg:text-xl">
                {toKhmerNumber(number)} {t(unitKey)}
              </p>
              <p className="text-sm sm:text-base md:text-base lg:text-lg">
                {t("duration")}
              </p>
            </div>

            {/* Price */}
            <div className="sm:flex-1 text-center relative">
              <p className="inline-block text-white font-bold text-xl sm:text-2xl md:text-2xl lg:text-3xl bg-primary rounded-full py-1 sm:py-2 px-4 sm:px-6 md:px-7">
                $
                {openingProgram?.price != null
                  ? toKhmerNumber(openingProgram.price)
                  : "0"}
              </p>
              {openingProgram?.originalFee && (
                <p className="absolute -top-4 -right-1 text-white text-xs sm:text-sm md:text-sm lg:text-base line-through bg-secondary rounded-full px-2 sm:px-3 py-0.5 border border-white">
                  $
                  {openingProgram?.originalFee != null
                    ? toKhmerNumber(openingProgram.price)
                    : "0"}
                </p>
              )}
            </div>
          </div>

          {/* Enroll Button */}
          <button
            onClick={handleEnrollClick}
            className="text-white text-center bg-primary p-3 md:p-3.5 lg:p-4 hover:bg-primary-hover cursor-pointer rounded-2xl font-bold text-sm sm:text-base md:text-base"
          >
            {t("enroll-now")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShortCourseCardActive;
