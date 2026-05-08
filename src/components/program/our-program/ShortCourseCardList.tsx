"use client";

import React from "react";
import { useGetAllMasterProgramsQuery } from "../masterProgramApi";
import ShortCourseCard from "./ShortCourseCard";
import ShortCourseCardSkeleton from "../skeleton/ShortCourseCardSkeleton";
import NotFoundProgram from "../components/NotFound";

const ShortCourseCardList = () => {
  const {
    data: allPrograms = [],
    isLoading: loadingPrograms,
    isError: errorPrograms,
  } = useGetAllMasterProgramsQuery(undefined, { refetchOnMountOrArgChange: true });

  if (errorPrograms) return <p>Failed to load programs.</p>;

  // Filter only PUBLIC and SHORT_COURSE master programs
  const shortCoursePrograms = allPrograms.filter(
    (p) => p.programType === "SHORT_COURSE" && p.visibility === "PUBLIC"
  );

  // If there are no short courses, show the "No Program Found" message
  if (!loadingPrograms && !shortCoursePrograms.length) {
    return <NotFoundProgram title="No Short Courses Found" />;
  }

  return (
    <div className="flex flex-col gap-6">
      {loadingPrograms
        ? Array.from({ length: 5 }).map((_, i) => (
            <ShortCourseCardSkeleton key={i} />
          ))
        : shortCoursePrograms.map((program) => (
            <ShortCourseCard
              key={program.uuid}
              {...program}
            />
          ))}
    </div>
  );
};

export default ShortCourseCardList;