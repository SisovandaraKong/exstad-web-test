// ProgramCardList.tsx - CORRECTED VERSION

"use client";

import React from "react";
import ScholarshipCard from "./ScholarshipCard";
import ShortCourseCardActive from "./ShortCourseCardActive";
import ShortCourseCardActiveSkeleton from "../skeleton/ShortCourseCarcActiveSkeleton";
import { MasterProgramType } from "@/types/master-program";
import { openingProgramType } from "@/types/opening-program";

type Props = {
  programs: MasterProgramType[];
  openingPrograms?: openingProgramType[];
  programFilter?: string;
  subFilter?: string[];
  levelFilter?: string[];
  searchValue?: string;
  isLoading?: boolean;
};

const ProgramCardList: React.FC<Props> = ({
  programs,
  openingPrograms = [],
  programFilter = "All",
  subFilter = [],
  levelFilter = [],
  searchValue = "",
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <ShortCourseCardActiveSkeleton key={i} />
        ))}
      </div>
    );
  }

  // Filter openings according to master program filters
  const filteredOpenings = openingPrograms.filter((opening) => {
    const master = programs.find((p) => p.title === opening.programName);
    if (!master) return false;

    // Program Type
    if (programFilter !== "All") {
      if (
        (programFilter === "Scholarship Course" && master.programType !== "SCHOLARSHIP") ||
        (programFilter === "Short Course" && master.programType !== "SHORT_COURSE")
      )
        return false;
    }

    // Level filter - FIXED: Use .some() with case-insensitive comparison
    if (levelFilter.length > 0) {
      const masterLevel = master.programLevel?.toUpperCase() || '';
      const hasMatchingLevel = levelFilter.some(
        (level) => level.toUpperCase() === masterLevel
      );
      if (!hasMatchingLevel) return false;
    }

    // SubFilter
    if (subFilter.length > 0 && !subFilter.includes(master.title)) return false;

    // Search
    if (searchValue && !master.title.toLowerCase().includes(searchValue.toLowerCase()))
      return false;

    return true;
  });

  // Separate by type
  const scholarshipOpenings = filteredOpenings.filter(
    (o) => programs.find((p) => p.title === o.programName)?.programType === "SCHOLARSHIP"
  );
  const shortCourseOpenings = filteredOpenings.filter(
    (o) => programs.find((p) => p.title === o.programName)?.programType === "SHORT_COURSE"
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Scholarship Programs */}
      <div className="grid gap-6">
        {scholarshipOpenings.map((opening) => {
          const master = programs.find((p) => p.title === opening.programName)!;
          return <ScholarshipCard key={opening.uuid} {...master} openingProgram={opening} />;
        })}
      </div>

      {/* Short Courses */}
      <div className="grid gap-6">
        {shortCourseOpenings.map((opening) => {
          const master = programs.find((p) => p.title === opening.programName)!;
          return <ShortCourseCardActive key={opening.uuid} {...master} openingProgram={opening} />;
        })}
      </div>
    </div>
  );
};

export default ProgramCardList;