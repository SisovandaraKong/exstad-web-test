import React from "react";
import Image from "next/image";

const ProgramOverviewSidebarSkeleton: React.FC = () => {
  return (
    <div className="bg-background gap-[24px] sticky top-28 p-[24px] rounded-[24px] text-center flex flex-col animate-pulse">
      {/* Title */}
      <div className="h-6 w-40 bg-gray-300 mx-auto rounded mb-2"></div>
      <div className="h-4 w-64 bg-gray-200 mx-auto rounded mb-4"></div>

      {/* QR Code Placeholder Image */}
      <div className="w-[143px] h-[142px] bg-gray-300 rounded mx-auto mb-2"></div>

      <div className="h-3 w-48 bg-gray-200 mx-auto rounded mb-4"></div>

      {/* Info Boxes */}
      <div className="flex flex-col gap-2 w-full">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex justify-between items-center">
            <div className="h-3 w-20 bg-gray-300 rounded"></div>
            <div className="h-3 w-16 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="h-10 w-full bg-gray-300 rounded mt-4"></div>
      <div className="h-10 w-full bg-gray-300 rounded mt-2"></div>
    </div>
  );
};

export default ProgramOverviewSidebarSkeleton;
