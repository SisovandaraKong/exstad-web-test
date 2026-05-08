import React from "react";

const ShortCourseCardActiveSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 rounded-[24px] justify-between gap-1 md:gap-2 lg:gap-4 p-4 md:p-4 lg:p-6 bg-background [box-shadow:0px_8px_24px_rgba(0,0,0,0.05)] animate-pulse">
      {/* Image skeleton */}
      <div className="w-full h-[200px] md:h-[250px] lg:h-[300px] bg-gray-300 rounded-[20px] max-w-full"></div>

      {/* Content skeleton */}
      <div className="h-full flex flex-col justify-between gap-2">
        {/* Header skeleton */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex flex-col items-center">
              <div className="w-2 h-8 bg-gray-400 rounded-full"></div>
              <div className="w-1 h-4 bg-gray-400 rounded-full mt-1"></div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-6 md:h-8 w-40 bg-gray-400 rounded"></div> {/* title */}
              <div className="h-4 w-32 bg-gray-400 rounded"></div> {/* scholarship */}
            </div>
          </div>
        </div>

        {/* Description skeleton */}
        <div className="h-24 md:h-32 lg:h-40 bg-gray-300 rounded"></div>

        {/* Footer skeleton (deadline, duration, discount) */}
        <div className="flex justify-between items-center gap-2 mt-2">
          <div className="h-16 w-20 bg-gray-300 rounded-lg"></div>
          <div className="h-16 w-20 bg-gray-300 rounded-lg"></div>
          <div className="h-16 w-24 bg-gray-300 rounded-lg relative"></div>
        </div>

        {/* Enroll button skeleton */}
        <div className="h-10 md:h-12 lg:h-14 w-full bg-gray-400 rounded-2xl mt-4"></div>
      </div>
    </div>
  );
};

export default ShortCourseCardActiveSkeleton;
