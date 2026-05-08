"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";

import ProgramHeader from "@/components/program/ProgramHeader";
import ProgramSidebar from "@/components/program/explore-course/ProgramSidebar";
import ProgramOverviewTap from "@/components/program/detail-program/ProgramOverviewTap";
import ProgramCurriculumTap from "@/components/program/detail-program/curriculum/ProgramCurriculum";
import ProgramActivityTap, {
  ProgramGeneration,
} from "@/components/program/detail-program/activity/ProgramActivity";
import ProgramEnrollment from "@/components/program/ProgramEnrollment";

import ProgramHeaderSkeleton from "@/components/program/skeleton/ProgramHeaderSkeleton";
import ProgramOverviewCardSkeleton from "@/components/program/skeleton/ProgramOverviewTapSkeleton";
import ProgramCurriculumSkeleton from "@/components/program/skeleton/ProgramCurriculumSkeleton";
import ProgramActivitySkeleton from "@/components/program/skeleton/ProgramActivitySkeleton";
import TimeLine from "@/components/program/detail-program/timeline/TimeLine";

import { useGetMasterProgramByTitleQuery } from "@/components/program/masterProgramApi";
import { useGetAllOpeningProgramsQuery } from "@/components/program/openingProgramApi";
import { MasterProgramType } from "@/types/master-program";
import ProgramOverviewSidebarSkeleton from "@/components/program/skeleton/ProgramSidebarSkeleton";
import NotFoundProgram from "@/components/program/components/NotFound";
import WorkNodeViewer from "@/components/roadmap/roadmap-detail";

interface ProgramDetailClientProps {
  initialProgram?: MasterProgramType;
}

const OpeningProgramDetail: React.FC<ProgramDetailClientProps> = ({
  initialProgram,
}) => {
  const params = useParams();
  const openingProgramSlug = params?.slug as string;

  const [activeTab, setActiveTab] = useState("overview");

  // Fetch all opening programs
  const {
    data: allPrograms = [],
    isLoading: isAllLoading,
    isError: isAllError,
  } = useGetAllOpeningProgramsQuery(undefined,{refetchOnFocus:true,refetchOnMountOrArgChange:true,refetchOnReconnect:true});

  const openingProgram = allPrograms.find(
    (op) => op.slug === openingProgramSlug
  );

  // Fetch master program
  const {
    data: masterProgramData,
    isLoading: isMasterLoading,
    isError: isMasterError,
  } = useGetMasterProgramByTitleQuery(
    { title: openingProgram?.programName ?? initialProgram?.title ?? "" },
    { skip: !openingProgram?.programName && !initialProgram?.title }
  );

  const masterProgram = masterProgramData || initialProgram;

  // Loading skeletons
  if (isAllLoading || isMasterLoading) {
    return (
      <div className="flex flex-col lg:flex-row md:flex-col bg-whitesmoke min-h-screen mx-auto max-w-7xl gap-6 w-full p-5 md:p-8 lg:py-8 lg:px-0">
        <div className="flex-1">
          <ProgramHeaderSkeleton />
          {activeTab === "overview" && <ProgramOverviewCardSkeleton />}
          {activeTab === "curriculum" && <ProgramCurriculumSkeleton />}
          {activeTab === "activity" && <ProgramActivitySkeleton />}
        </div>
        <ProgramOverviewSidebarSkeleton />
      </div>
    );
  }

  // Error handling
  if (isAllError || !allPrograms)
    return <p className="text-center text-red-500">Failed to load programs!</p>;
  if (!openingProgram && !initialProgram)
    return <p className="text-center text-red-500">Program not found!</p>;
  if (isMasterError || !masterProgram) return <NotFoundProgram />;

  // Build generations
  const generations: ProgramGeneration[] = allPrograms
    .filter((op) => op.programName === openingProgram?.programName)
    .sort((a, b) => (a.generation ?? 1) - (b.generation ?? 1))
    .map((op) => ({
      uuid: op.uuid,
      title: `Generation ${op.generation ?? 1}`,
    }));

  // Map translation keys to components
  const tabComponents: Record<string, React.FC> = {
    overview: () => <ProgramOverviewTap program={masterProgram} />,
    curriculum: () => (
      <ProgramCurriculumTap
        openingUuid={openingProgram?.uuid ?? ""}
        masterUuid={masterProgram.uuid}
      />
    ),
    activity: () =>
      generations.length ? (
        <ProgramActivityTap generations={generations} />
      ) : (
        <p className="text-gray-500 text-center">
          No opening programs available.
        </p>
      ),

    enrollment: () => <ProgramEnrollment openingProgram={openingProgram!} />,
    timeline: () => (
      <TimeLine openingProgramUuid={openingProgram!.uuid ?? ""} />
    ),
    roadmap: () =>
  openingProgram?.uuid ? (
    <WorkNodeViewer
      programUuid={openingProgram.uuid}
      programType="opening-programs"
    />
  ) : (
    <p className="text-gray-500 text-center">Roadmap not available.</p>
  ),
  

  };
console.log(openingProgram)
  const ActiveTabComponent = tabComponents[activeTab];

  return (
    <div className="flex lg:flex-col min-h-screen md:flex-col flex-col xl:flex-row p-5 md:p-8 lg:py-6 lg:px-0 mx-auto gap-6 my-[20px] max-w-7xl">
      <div className="flex-1 w-full min-w-0 shrink-0">
        <ProgramHeader
          masterProgram={masterProgram}
          openingProgram={openingProgram}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <div className="w-full">
          <ActiveTabComponent />
        </div>
      </div>
      <ProgramSidebar program={masterProgram} openingData={openingProgram} />
    </div>
  );
};

export default OpeningProgramDetail;
