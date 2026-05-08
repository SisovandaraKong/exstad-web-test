import React from "react";
import { ScrollArea } from "@radix-ui/react-scroll-area";

const ProgramActiveSidebarSkeleton: React.FC = () => {
  return (
    <aside className="w-auto sticky top-28 p-[20px] md:p-[34px] lg:p-[24px] border rounded-lg bg-background space-y-6 animate-pulse">
      {/* Header */}
      <div className="flex gap-[8px] items-center justify-start mb-4">
        <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
        <div className="h-6 w-24 bg-gray-300 rounded"></div>
      </div>

      {/* Program Type */}
      <div>
        <div className="h-4 w-32 bg-gray-300 mb-2 rounded"></div>
        <ul className="space-y-2 p-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <li key={i} className="flex items-center gap-2">
              <div className="w-[18px] h-[18px] bg-gray-400 rounded-full"></div>
              <div className="h-3 w-16 bg-gray-300 rounded"></div>
            </li>
          ))}
        </ul>
      </div>

      {/* Scholarship Sub-Filter */}
      <div>
        <div className="h-4 w-24 bg-gray-300 mb-2 rounded"></div>
        <ul className="space-y-2 p-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <li key={i} className="flex items-center gap-2">
              <div className="w-[18px] h-[18px] bg-gray-400 rounded-full"></div>
              <div className="h-3 w-20 bg-gray-300 rounded"></div>
            </li>
          ))}
        </ul>
      </div>

      {/* Short Course Sub-Filter */}
      <div>
        <div className="h-4 w-28 bg-gray-300 mb-2 rounded"></div>
        <ScrollArea className="h-[140px] rounded-md p-2">
          <ul className="space-y-2 pr-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <li key={i} className="flex items-center gap-2">
                <div className="w-[18px] h-[18px] bg-gray-400 rounded-full"></div>
                <div className="h-3 w-24 bg-gray-300 rounded"></div>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </div>

      {/* Level */}
      <div>
        <div className="h-4 w-16 bg-gray-300 mb-2 rounded"></div>
        <ul className="space-y-2 p-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <li key={i} className="flex items-center gap-2">
              <div className="w-[18px] h-[18px] bg-gray-400 rounded-full"></div>
              <div className="h-3 w-16 bg-gray-300 rounded"></div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default ProgramActiveSidebarSkeleton;
