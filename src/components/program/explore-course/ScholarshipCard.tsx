"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { MasterProgramType } from "@/types/master-program";
import { openingProgramType } from "@/types/opening-program";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useKhmerNumber } from "@/services/to-khmer-number";

interface ScholarshipCardProps extends MasterProgramType {
  openingProgram?: openingProgramType;
}

const ScholarshipCard: React.FC<ScholarshipCardProps> = ({
  title,
  description,
  openingProgram,
}) => {
  const router = useRouter();

  const handleEnrollClick = () => {
    if (!openingProgram?.slug) return;
    router.push(`/explore-course/${openingProgram.slug}/enrollment`);
  };
  const t = useTranslations();
  const toKhmerNumber = useKhmerNumber();
  const durationParts = openingProgram?.duration?.split(" ") || [];
  const number = durationParts[0] || "0";
  const unitKey = durationParts[1] || ""; // this should match your translation key, e.g., "months" or "hours"
   const deadlineParts = openingProgram?.deadline.split(" ") || [];
  const deadlineNumber = deadlineParts[0] || "0";
  const deadlineUnitKey = deadlineParts[1] || "";
  const formatDeadline = (date: Date | string) => {
  const d = new Date(date);
  const day = d.getDate();
  const month = d.toLocaleString("en-US", { month: "short" }).toUpperCase(); // "AUG"
  return `${day} ${month}`;
};
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.2 }}
      whileHover={{ boxShadow: "0px 8px 30px rgba(0,0,0,0.1)" }}
      className="w-full  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 rounded-[24px] justify-between gap-1 md:gap-2 lg:gap-4 p-4 md:p-4 lg:p-6 bg-background [box-shadow:0px_8px_24px_rgba(0,0,0,0.05)]"
    >
      <Link href={`/explore-course/${openingProgram?.slug}`} className="block">
        <Image
          unoptimized
          height={500}
          width={500}
          src={openingProgram?.posterUrl ?? "/fallback.png"}
          alt={title}
          className="w-full aspect-square rounded-[20px] object-cover sm:max-w-[300px] md:max-w-[400px] lg:max-w-[500px]"
        />
      </Link>

      <div className="h-full flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex flex-col items-center">
            <div className="w-2 h-8 bg-gradient-to-b from-primary to-primary dark:from-accent dark:to-accent rounded-full"></div>
            <div className="w-1 h-4 bg-gradient-to-b from-primary to-transparent dark:from-accent dark:to-yellow-transparent rounded-full mt-1"></div>
          </div>
          <div className="flex flex-col">
            <Link href={`/explore-course/${openingProgram?.slug}`} className="block">
            <h1 className="text-primary dark:text-white text-[20px] md:text-2xl lg:text-3xl font-bold hover:text-primary-hover">
              {title}
            </h1>
            </Link>
            <p className="text-secondary dark:text-accent font-bold text-[16px] md:text-[18px] lg:text-[20px]">
              {openingProgram?.scholarship != null ? toKhmerNumber(openingProgram.scholarship) : "0"}% {t("scholarship")}
            </p>
          </div>
        </div>

        {/* Description + Info */}
        <div className="h-full flex flex-col justify-between gap-2">
          <p className="text-description font-normal text-[16px] md:text-[18px] lg:text-[20px] overflow-hidden text-ellipsis line-clamp-2 md:line-clamp-5 lg:line-clamp-5">
            {description}
          </p>

          <div className="flex justify-between items-end w-full gap-2">
            {/* Deadline */}
              <div className="sm:flex-1 border-b-4 text-center rounded-[8px] border-secondary text-secondary dark:text-white px-4 py-2">
  <p className="font-bold text-sm md:text-[18px] lg:text-[22px]">
    {openingProgram?.deadline
      ? `${toKhmerNumber(new Date(openingProgram.deadline).getDate())} ${t(
          formatDeadline(openingProgram.deadline).split(" ")[1]
        )}`
      : ""}
  </p>
  <p className="text-xs md:text-base lg:text-lg">{t("deadline")}</p>
</div>


            {/* Duration */}
            <div className="flex-1 w-fit border-b-4 text-primary text-center rounded-[8px] dark:text-white border-primary  px-4  py-2">
              <p className="font-bold text-nowrap text-sm md:text-[18px] lg:text-[22px]">
                {toKhmerNumber(number)} {t(unitKey)}
              </p>
              <p className="text-xs md:text-base lg:text-lg">{t("duration")}</p>
            </div>

            {/* Total Slots */}
            <div className="sm:flex-1 border-b-4 text-center rounded-[8px] text-[#1E7D34] dark:text-white border-[#1E7D34] px-4 py-2">
              <p className="font-bold text-sm md:text-[18px] lg:text-[22px]">
                {openingProgram?.totalSlot != null
                  ? toKhmerNumber(openingProgram.totalSlot)
                  : "0"}
              </p>
              <p className=" text-xs text-nowrap md:text-base lg:text-lg">
                {t("total-slots")}
              </p>
            </div>
          </div>

          {/* Enroll Now Button */}
          <button
            onClick={handleEnrollClick}
            className="text-white text-center bg-primary p-3 md:p-3.5 lg:p-4 hover:bg-primary-hover cursor-pointer rounded-2xl font-bold text-sm sm:text-base md:text-base"
          >
            {t("enroll-now")}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ScholarshipCard;
