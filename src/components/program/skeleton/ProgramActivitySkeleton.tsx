'use client';
import React from 'react';

const ProgramActivitySkeleton: React.FC = () => {
  return (
    <div className="w-full bg-background p-[24px] gap-[40px] grid animate-pulse rounded-[12px] shadow-md">
      {/* Title */}
      <div className="h-10 w-3/5 bg-gray-300 rounded-md mx-auto mb-6"></div>

      {/* Tabs placeholder */}
      <div className="flex gap-4 overflow-x-auto pb-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-8 w-28 bg-gray-300 rounded-2xl"></div>
        ))}
      </div>

      {/* Activities */}
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i} className="grid gap-4">
          <div className="h-8 w-40 bg-gray-300 rounded-md"></div>
          <div className="h-4 w-full bg-gray-200 rounded-md"></div>
          <div className="h-64 w-full bg-gray-300 rounded-2xl"></div>
        </div>
      ))}
    </div>
  );
};

export default ProgramActivitySkeleton;
