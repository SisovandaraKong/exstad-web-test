"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PiNotePencilBold } from "react-icons/pi";
import {
  MdOutlineAccessTime,
  MdOutlineSchool,
  MdOutlinePaid,
} from "react-icons/md";
import { VscGraph } from "react-icons/vsc";
import { BsPeople } from "react-icons/bs";
import { FaTelegram } from "react-icons/fa6";
import { MasterProgramType } from "@/types/master-program";
import { openingProgramType } from "@/types/opening-program";
import { useTranslations } from "next-intl";
import { useKhmerNumber } from "@/services/to-khmer-number";
import { TriangleAlert } from "lucide-react";

type Props = {
  program?: MasterProgramType;
  openingData?: openingProgramType;
  isClosed?: boolean; // ✅ Added this line
};

const ProgramSidebar: React.FC<Props> = ({ program, openingData, isClosed }) => {
  const router = useRouter();
  const t = useTranslations();
  const toKhmerNumber = useKhmerNumber();

  const handleEnrollmentClick = () => {
    if (!openingData?.slug) return;
    router.push(`/explore-course/${openingData.slug}/enrollment`);
  };

  return (
    <div className="bg-background h-fit gap-[24px] sticky top-27 p-[24px] rounded-[24px] text-center flex flex-col">
      {/* Title */}
      <div>
        <h1 className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-[22px] text-primary">
          {program?.title ?? openingData?.title ?? "Program Title"}
        </h1>
        <p className="font-medium text-description text-sm sm:text-base md:text-lg">
          {t("be-ready-for-your-journey")}
        </p>
      </div>

      {/* QR Code */}
      {openingData?.qrCodeUrl && (
        <div className="flex flex-col items-center gap-[10px]">
          <Image
            width={143}
            height={142}
            unoptimized
            src={openingData.qrCodeUrl}
            alt={openingData.programName}
            className="w-[143px] h-[142px]"
          />
          <p className="text-[12px] text-description">
            {t("scan-with-your-phone")}
          </p>
        </div>
      )}

      {/* Info boxes */}
      <div className="flex flex-col w-full gap-[10px]">
        {/* Duration */}
        <div className="flex justify-between">
          <p className="font-normal flex items-center gap-2 text-[14px] text-foreground">
            <MdOutlineAccessTime /> {t("duration")}
          </p>
          <p className="font-bold text-[14px] text-foreground">
            {openingData?.duration
              ? (() => {
                  const parts = openingData.duration.split(" ");
                  const number = parts[0];
                  const unit = parts[1]?.toLowerCase();
                  return `${number !== "-" ? toKhmerNumber(number) : "-"} ${t(
                    unit
                  )}`;
                })()
              : "-"}
          </p>
        </div>

        {/* Level */}
        <div className="flex justify-between">
          <p className="font-normal flex items-center gap-2 text-[14px] text-foreground">
            <VscGraph /> {t("level")}
          </p>
          <p className="font-bold text-[14px] text-foreground">
            {program?.programLevel
              ? t(program.programLevel.toLowerCase())
              : "-"}
          </p>
        </div>

        {/* Total Slot */}
        <div className="flex justify-between">
          <p className="font-normal flex items-center gap-2 text-[14px] text-foreground">
            <BsPeople /> {t("number")}
          </p>
          <p className="font-bold text-[14px] text-foreground">
            {openingData?.totalSlot !== undefined
              ? toKhmerNumber(openingData.totalSlot)
              : "-"}
          </p>
        </div>

        {/* Scholarship */}
        <div className="flex justify-between">
          <p className="font-normal flex items-center gap-2 text-[14px] text-foreground">
            <MdOutlineSchool /> {t("scholarship")}
          </p>
          <p className="font-bold text-[14px] text-foreground">
            {toKhmerNumber(openingData?.scholarship ?? 0)}%
          </p>
        </div>

        {/* Cost */}
        <div className="flex justify-between">
          <p className="font-normal flex items-center gap-2 text-[14px] text-foreground">
            <MdOutlinePaid /> {t("cost")}
          </p>
          <div className="flex gap-2">
            <p className="font-bold text-[14px] text-foreground line-through">
              {openingData?.originalFee !== undefined
                ? `${toKhmerNumber(openingData.originalFee)}$`
                : "-"}
            </p>
            <p className="text-secondary text-[14px] font-bold">
              {openingData?.price !== undefined
                ? `${toKhmerNumber(openingData.price)}$`
                : "-"}
            </p>
          </div>
        </div>
      </div>

      {/*  Closed Notice */}
      {isClosed && (
        <div className=" border-2 border-yellow-500 text-accent px-[24px] py-[10px] font-medium  rounded-full text-center flex items-center gap-2">
          <TriangleAlert />
           This program has not opened yet
        </div>
      )}

      {/* Buttons */}
      {!isClosed && program?.programType !== "SHORT_COURSE" &&
        openingData?.telegramGroup && (
          <a
            href={openingData.telegramGroup}
            className="bg-background hover:bg-black hover:text-white flex items-center justify-center gap-2 border border-foreground text-foreground px-[24px] py-[10px] rounded-[24px] text-center font-medium text-sm sm:text-base md:text-base"
          >
            <FaTelegram /> {t("join-telegram-group")}
          </a>
        )}

      {/* Only show "Enroll Now" if not closed */}
      {!isClosed && openingData?.slug && (
        <button
          className="bg-primary flex items-center justify-center gap-2 hover:bg-primary-hover text-white px-[24px] py-[10px] rounded-[24px] text-center font-medium text-sm sm:text-base md:text-base"
          onClick={handleEnrollmentClick}
        >
          <PiNotePencilBold /> {t("enroll-now")}
        </button>
      )}
    </div>
  );
};

export default ProgramSidebar;
