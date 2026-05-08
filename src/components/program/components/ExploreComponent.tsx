"use client";

import React, { useState } from "react";
import ProgramActiveSidebar from "@/components/program/explore-course/ProgramActivSidebar";
import ProgramSearch from "@/components/program/ProgramSearch";
import ProgramActiveSidebarSkeleton from "@/components/program/skeleton/ProgramActiveSidebarSkeleton";
import ProgramCardList from "@/components/program/explore-course/ProgramCardList";
import { useGetAllMasterProgramsQuery } from "@/components/program/masterProgramApi";
import { useGetAllOpeningProgramsQuery } from "@/components/program/openingProgramApi";
import NotFoundProgram from "@/components/program/components/NotFound";

export default function ExploreProgramPageClient() {
  const [programFilter, setProgramFilter] = useState("All");
  const [subFilter, setSubFilter] = useState<string[]>([]);
  const [levelFilter, setLevelFilter] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState("");

  // Fetch master programs
  const { data: allPrograms = [], isLoading, isError } =
    useGetAllMasterProgramsQuery(undefined, {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    });

  const programs = allPrograms.filter((p) => p.visibility === "PUBLIC");

  // Fetch opening programs
  const { data: allOpeningProgram = [] } = useGetAllOpeningProgramsQuery(
    undefined,
    { refetchOnMountOrArgChange: true, refetchOnFocus: true, refetchOnReconnect: true }
  );

  // Only OPEN openings
  const openingPrograms = allOpeningProgram.filter((p) => p.status === "OPEN");

  // Filter openings to only those with a matching master program
  const validOpeningPrograms = openingPrograms.filter((o) =>
    programs.some((p) => p.title === o.programName)
  );

  const sidebarPrograms = programs.filter((p) =>
    openingPrograms.some((o) => o.programName === p.title)
  );

  // Apply filters per opening
  const filteredOpeningPrograms = validOpeningPrograms.filter((opening) => {
    const master = programs.find((p) => p.title === opening.programName);
    if (!master) return false;

    // Program Type filter
    if (programFilter !== "All") {
      if (programFilter === "Scholarship Course" && master.programType !== "SCHOLARSHIP") return false;
      if (programFilter === "Short Course" && master.programType !== "SHORT_COURSE") return false;
    }

    // Level filter
    if (levelFilter.length > 0) {
      const masterLevel = master.programLevel?.toUpperCase() || '';
      const hasMatchingLevel = levelFilter.some((level) => level.toUpperCase() === masterLevel);
      if (!hasMatchingLevel) return false;
    }

    // SubFilter (individual program selections)
    if (subFilter.length > 0 && !subFilter.includes(master.title)) return false;

    // Search filter
    if (searchValue && !master.title.toLowerCase().includes(searchValue.toLowerCase())) return false;

    return true;
  });

  if (isError) return <NotFoundProgram title="Error loading program" />;

  return (
    <div className="flex flex-col lg:flex-row md:flex-col bg-whitesmoke min-h-screen mx-auto max-w-7xl gap-6 w-full p-5 md:p-8 lg:py-8 lg:px-0">
      {/* Sidebar */}
      <div className="shrink-0 w-full lg:w-72">
        {isLoading ? (
          <ProgramActiveSidebarSkeleton />
        ) : (
          <ProgramActiveSidebar
            programData={sidebarPrograms}
            programFilter={programFilter}
            setProgramFilter={setProgramFilter}
            levelFilter={levelFilter}
            setLevelFilter={setLevelFilter}
            subFilter={subFilter}
            setSubFilter={setSubFilter}
          />
        )}
      </div>

      {/* Main content */}
      <div className="flex-1">
        <div className="mb-6">
          <ProgramSearch
            total={filteredOpeningPrograms.length}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        </div>

        <div>
          {filteredOpeningPrograms.length === 0 ? (
            <NotFoundProgram title="No Program Found" />
          ) : (
            <ProgramCardList
              programs={programs}
              openingPrograms={filteredOpeningPrograms}
              programFilter={programFilter}
              subFilter={subFilter}
              levelFilter={levelFilter}
              searchValue={searchValue}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
}
