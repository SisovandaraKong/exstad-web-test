import { MasterProgramType } from "@/types/master-program";
import RoadmapCard from "./RoadmapCard";
import Link from "next/link";

export default function RoadmapGrid({ programData }: { programData: MasterProgramType[] }) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {programData.map((data) => (
        <Link key={data.slug} href={`/roadmap/${data.slug}`}>
          <RoadmapCard
            icon={data.logoUrl}
            title={data.title}
            label={data.programLevel}
          />
        </Link>
      ))}
    </div>
  );
}
