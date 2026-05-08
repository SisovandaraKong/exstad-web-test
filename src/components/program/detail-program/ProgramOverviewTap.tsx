"use client";

import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import ProgramOverviewSection from "./overview/ProgramOverviewSection";
import LearningOutcomeSection from "./outcomes/LearningOutcomeSection";
import RequirementSection from "./requirement/RequirementSection";
import FaqSection from "./faq/faqSection";
import TechnologySection from "./technology/TechnologySection";

import { MasterProgramType } from "@/types/master-program";
import { openingProgramType } from "@/types/opening-program";
import NoDataComponent from "../components/NoDataComponents";

type Props = {
  program: MasterProgramType & { openingProgram?: openingProgramType };
};

const ProgramOverviewCard: React.FC<Props> = ({ program }) => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  // Track each section's data presence
  const [sectionStates, setSectionStates] = useState({
    overview: false,
    learning: false,
    requirement: false,
    technology: false,
    faq: false,
    loading: true,
  });

  // Callback to update section state
  const updateSectionState = (section: string, hasData: boolean) => {
    setSectionStates((prev) => ({
      ...prev,
      [section]: hasData,
      loading: false,
    }));
  };

  // Check if all sections are empty
  const allEmpty =
    !sectionStates.loading &&
    !sectionStates.overview &&
    !sectionStates.learning &&
    !sectionStates.requirement &&
    !sectionStates.technology &&
    !sectionStates.faq;

  return (
    <div>
      <div className="w-full grid p-[24px] gap-[40px] bg-background rounded-b-[24px]">
        {/* Title from master program */}
        <h1 className="text-foreground font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl">
          {program.title}
        </h1>

        {/* Show deadline or generation if available */}
        {program.openingProgram && (
          <p className="text-muted-foreground">
            Generation {program.openingProgram.generation} · Deadline:{" "}
            {new Date(program.openingProgram.deadline).toLocaleDateString()}
          </p>
        )}

        {/* Loading state */}
        {sectionStates.loading && (
          <div className="text-center text-gray-500 py-12">
            Loading content...
          </div>
        )}
        
        {/* Fallback message if all sections are empty */}
        {allEmpty && (
          <NoDataComponent className="text-center bg-background rounded-b-3xl py-12 min-h-screen h-fit flex justify-center items-center "/>
        )}

        {/* Sections - only show if not all empty */}
        {!allEmpty && (
          <>
            <div className="grid gap-[24px]" data-aos="fade-up">
              <ProgramOverviewSection
                programUuid={program.uuid}
                onHasData={(hasData) => updateSectionState("overview", hasData)}
              />
            </div>

            <div data-aos="fade-up">
              <LearningOutcomeSection
                programUuid={program.uuid}
                onHasData={(hasData) => updateSectionState("learning", hasData)}
              />
            </div>

            <div data-aos="fade-up">
              <RequirementSection
                programUuid={program.uuid}
                onHasData={(hasData) => updateSectionState("requirement", hasData)}
              />
            </div>

            <div className="grid gap-[24px]" data-aos="fade-up">
              <TechnologySection
                programUuid={program.uuid}
                onHasData={(hasData) => updateSectionState("technology", hasData)}
              />
            </div>

            <div data-aos="fade-up">
              <FaqSection
                programUuid={program.uuid}
                onHasData={(hasData) => updateSectionState("faq", hasData)}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProgramOverviewCard;