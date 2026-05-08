'use client';
import React from "react";

const ProgramOverviewCardSkeleton: React.FC = () => {
  return (
    <div className="w-full grid p-[24px] gap-[40px] bg-background animate-pulse rounded-[12px] shadow-md">
      {/* Title */}
      <div className="h-10 w-3/5 bg-gray-300 rounded-md mx-auto"></div>

      {/* Program Overview */}
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i} className="grid gap-[16px]">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
            <div className="h-6 w-40 bg-gray-300 rounded-md"></div>
          </div>
          <div className="h-20 w-full bg-gray-200 rounded-lg"></div>
        </div>
      ))}

      {/* Learning Outcomes */}
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i} className="grid gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
            <div className="h-6 w-36 bg-gray-300 rounded-md"></div>
          </div>
          {Array.from({ length: 3 }).map((__, j) => (
            <div key={j} className="h-4 w-full bg-gray-200 rounded-md"></div>
          ))}
        </div>
      ))}

      {/* Course Requirements */}
      {Array.from({ length: 1 }).map((_, i) => (
        <div key={i} className="grid gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
            <div className="h-6 w-36 bg-gray-300 rounded-md"></div>
          </div>
          {Array.from({ length: 3 }).map((__, j) => (
            <div key={j} className="h-4 w-full bg-gray-200 rounded-md"></div>
          ))}
        </div>
      ))}

      {/* FAQ Section */}
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i} className="grid gap-2">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
            <div className="h-6 w-48 bg-gray-300 rounded-md"></div>
          </div>
          {Array.from({ length: 2 }).map((__, j) => (
            <div key={j} className="h-4 w-full bg-gray-200 rounded-md"></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ProgramOverviewCardSkeleton;
