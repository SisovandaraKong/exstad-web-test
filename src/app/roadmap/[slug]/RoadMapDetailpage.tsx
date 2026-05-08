"use client";

import { LoadingOverlay } from "@/components/loading/LoadingOverlay";
import { useRouter } from "next/navigation";
import { useGetMasterProgramBySlugQuery } from "@/components/program/masterProgramApi";
import WorkNodeViewer from "@/components/roadmap/roadmap-detail";
import { Card } from "@/components/ui/card";
import { MasterProgramType } from "@/types/master-program";

interface RoadmapDetailClientProps {
  initialProgram: MasterProgramType;
}

export default function RoadmapDetailClient({ initialProgram }: RoadmapDetailClientProps) {
  const router = useRouter();
  
  // Optional: Use RTK Query for real-time updates, but start with initialProgram
  const { data: program, isLoading } = useGetMasterProgramBySlugQuery(
    { slug: initialProgram.slug },
    {
      // Skip if we already have initial data (avoid duplicate fetch)
      skip: false,
      // Use initialProgram as fallback
    }
  );

  // Use the fetched program or fall back to initial program
  const currentProgram = program || initialProgram;

  if (isLoading && !initialProgram) {
    return (
      <div className="h-screen">
        <LoadingOverlay />
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Header overlay */}
      <div className="absolute top-10 left-10 z-10 w-[90%] max-w-4xl sm:w-auto">
        <Card className="flex flex-row items-center gap-3 px-4 py-2 shadow-lg flex-wrap sm:flex-nowrap">
          <button
            onClick={() => router.back()}
            className="px-2 py-1 text-sm font-medium bg-muted hover:bg-muted/80 border rounded-md shadow-sm transition hidden sm:inline-block cursor-pointer"
            aria-label="Go back"
          >
            ←
          </button>
          <h1
            onClick={() => router.back()}
            className="text-lg sm:text-2xl font-bold text-foreground text-center sm:text-left break-words cursor-pointer hover:text-primary transition-colors"
          >
            {currentProgram.title}
          </h1>
        </Card>
      </div>

      {/* Roadmap Viewer */}
      <WorkNodeViewer 
        programUuid={currentProgram.uuid} 
        programType="programs" 
      />
    </div>
  );
}