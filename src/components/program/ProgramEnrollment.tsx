import { enrollmentColumns } from "@/features/enrollment/components/table/culumns";
import { EnrollmentDataTable } from "@/features/enrollment/components/table/data-table";
import { useGetAllEnrollmentsByProgramQuery } from "@/features/enrollment/enrollmentApi";
import { openingProgramType } from "@/types/opening-program";
import { useMemo } from "react";
// import { enrollments } from "@/data/enrollments";

export default function ProgramEnrollment({
  openingProgram,
}: {
  openingProgram: openingProgramType;
}) {
  const { data: enrollments, isLoading } = useGetAllEnrollmentsByProgramQuery(
    openingProgram.uuid ?? "",
    { skip: !openingProgram }
  );

  const column = useMemo(
    () =>
      enrollmentColumns({
        amount: openingProgram.registerFee,
        openingProgramUuid: openingProgram.uuid ?? "",
      }),
    [openingProgram]
  );
  return (
    <div className="w-full !z-10 max-w-full h-fit p-6 bg-background rounded-b-[24px]">
      <EnrollmentDataTable data={enrollments ?? []} columns={column} />
    </div>
  );
}
