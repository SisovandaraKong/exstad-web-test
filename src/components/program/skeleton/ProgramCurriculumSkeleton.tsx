'use client';
import React from 'react';

const ProgramCurriculumSkeleton: React.FC = () => {
  return (
    <div className="w-full bg-background p-[24px] space-y-[40px] animate-pulse">
      {Array.from({ length: 2 }).map((_, sectionIndex) => (
        <div key={sectionIndex} className="space-y-[24px]">
          {/* Section Title */}
          <div className="h-10 w-3/5 bg-gray-300 rounded-md"></div>

          {/* Subsection Items */}
          {Array.from({ length: 3 }).map((_, subIndex) => (
            <div key={subIndex} className="border-b border-1 border-[#8AB9FF] rounded-[20px] p-[24px]">
              {/* Subsection Title */}
              <div className="h-8 w-4/5 bg-gray-300 rounded-md mb-4"></div>

              {/* Subsection Content */}
              {Array.from({ length: 2 }).map((_, lineIndex) => (
                <div key={lineIndex} className="h-4 w-full bg-gray-200 rounded-md mb-2"></div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ProgramCurriculumSkeleton;
