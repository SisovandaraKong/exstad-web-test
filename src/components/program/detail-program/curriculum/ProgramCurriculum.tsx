"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useGetMasterCurriculumsQuery, useGetOpeningCurriculumsQuery } from "./curriculumApi";
import AOS from "aos";
import NotFoundProgram from "../../components/NotFound";
import ProgramCurriculumSkeleton from "../../skeleton/ProgramCurriculumSkeleton";
import { useTranslations } from "next-intl";
import { useKhmerNumber } from "@/services/to-khmer-number";
import NoDataComponent from "../../components/NoDataComponents";

type CurriculumProps = {
  openingUuid?: string; // Make optional
  masterUuid: string;
};

const   ProgramCurriculumTap: React.FC<CurriculumProps> = ({ openingUuid, masterUuid }) => {
  // If no openingUuid, skip opening query and use master directly
  const hasOpeningProgram = Boolean(openingUuid);

  // Fetch opening program curriculum only if openingUuid exists
  const { data: openingData, isLoading: loadingOpening, refetch: refetchOpening } =
    useGetOpeningCurriculumsQuery(openingUuid || "", { skip: !hasOpeningProgram });

  // Fetch master curriculum
  const { data: masterData, isLoading: loadingMaster } =
    useGetMasterCurriculumsQuery(masterUuid);

  // Determine which curriculum to show
  // Priority: opening program (if exists and has data) -> master program
  const shouldUseMaster = !hasOpeningProgram || !openingData || openingData.length === 0;
  const curriculumSections = shouldUseMaster ? (masterData ?? []) : openingData;

  const refs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const [openSections, setOpenSections] = useState<{ [key: number]: boolean }>(
    {}
  );

  // Initialize open sections whenever curriculum changes
  useEffect(() => {
    if (curriculumSections.length > 0) {
      const initialState: { [key: number]: boolean } = {};
      curriculumSections.forEach((section) => {
        initialState[section.order] = true;
      });
      setOpenSections(initialState);
    }
  }, [curriculumSections]);

  // Refetch if openingUuid changes
  useEffect(() => {
    if (hasOpeningProgram) {
      refetchOpening();
    }
  }, [openingUuid, hasOpeningProgram, refetchOpening]);

  const toggle = (key: number) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Initialize AOS animations
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  const t = useTranslations();
  const toKhmerNumber = useKhmerNumber();

  if (loadingOpening || loadingMaster) return <ProgramCurriculumSkeleton />;
  if (curriculumSections.length === 0)
    return (
      <NoDataComponent  message="This program does not have any curriculum content yet."  />
    );

  return (
    <div className="w-full bg-background p-4 sm:p-6 md:p-6 space-y-8 md:space-y-10 rounded-b-[24px]">
      <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-foreground" data-aos="fade-up">
        {t("curriculum")}
      </h1>
      <div className="grid gap-3 sm:gap-4">
        {curriculumSections.map((section, idx) => {
          const key = section.order;
          const isOpen = openSections[key];
          const height = refs.current[key]?.scrollHeight || 0;

          return (
            <div key={key} className="border border-[#8AB9FF] rounded-2xl p-4 sm:p-6" data-aos="fade-up">
              <button
                onClick={() => toggle(key)}
                className="flex justify-between items-center w-full text-start font-semibold text-base sm:text-lg md:text-xl text-foreground"
              >
                <span className="text-lg sm:text-xl md:text-2xl lg:text-2xl">
                  <span className="text-primary mr-2">
  {toKhmerNumber(String(idx + 1).padStart(2, "0"))}
</span>

                  {section.title}
                </span>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              <div
                ref={(el) => {
                  refs.current[key] = el;
                }}
                style={{ maxHeight: isOpen ? `${height}px` : "0px" }}
                className="transition-all duration-500 ease-in-out overflow-hidden"
              >
                <div className="grid gap-3 sm:gap-4 border-t border-gray-300 py-4 sm:py-6 mt-3 sm:mt-4">
                  {section.subtitle && (
                    <p className="text-base sm:text-lg md:text-xl text-foreground font-medium">
                      {section.subtitle}
                    </p>
                  )}
                  {section.description.map((des, i) => (
                    <p key={i} className="flex items-start font-normal text-description text-sm sm:text-base md:text-lg">
                      <FontAwesomeIcon icon={faCheckCircle} className="text-primary mr-2 mt-1" />
                      {des}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgramCurriculumTap;