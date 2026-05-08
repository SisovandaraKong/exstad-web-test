"use client"
import { DotPattern } from "@/components/magicui/dot-pattern";
import BackgroundCircle from "@/components/roadmap/BackgroundCircle";
import HorizontalScrollText from "@/components/roadmap/HorizontalScrollText";
import RoadmapGrid from "@/components/roadmap/RoadmapGrid";
import { Button } from "@/components/ui/button";
import { useGetAllMasterProgramsQuery } from "../../components/program/masterProgramApi";

export default function RoadmapPageClient() {
  const { data: programData = [] } = useGetAllMasterProgramsQuery();

  const handleScrollDown = () => {
    const section = document.getElementById("roadmap-grid-section");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="flex flex-col gap-20 bg-whitesmoke">
      {/* Hero Section */}
      <div className="relative h-[calc(100vh-64px)] w-full md:w-2/3 px-5 md:px-0 mx-auto flex justify-center items-center bg-whitesmoke">
        <BackgroundCircle />

        <div className="absolute">
          <div className="flex flex-col justify-center items-center gap-5">
            <span className="text-[48px] md:text-[64px] leading-[110%] text-center font-extrabold">
              ROADMAP TO <br />
              TECH MASTERY
            </span>
            <p className="text-[var(--text-color)]/80 text-center">
              A structured guide to learning the right skills in the right
              order, <br /> helping you grow into a confident developer.
            </p>
            <Button
              size="lg"
              className="cursor-pointer text-white"
              onClick={handleScrollDown}
            >
              Explore More
            </Button>
          </div>
        </div>
      </div>

      <HorizontalScrollText />

      {/* Target Section */}
      <div id="roadmap-grid-section">
        <RoadmapGrid programData={programData} />
      </div>
    </main>
  );
}