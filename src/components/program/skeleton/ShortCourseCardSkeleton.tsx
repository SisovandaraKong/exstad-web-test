'use client'
import React from "react";

const ShortCourseCardSkeleton = () => {
  return (
    <div className="w-[1190px] h-[491px] rounded-[20px] p-[70px] bg-gray-200 animate-pulse">
      <div className="p-4 flex justify-between items-center gap-[267px]">
        {/* Left Content */}
        <div className="flex flex-col gap-4 w-full">
          <div className="h-[44px] w-1/2 bg-gray-400 rounded"></div> {/* title */}
          <div className="h-[32px] w-1/3 bg-gray-300 rounded"></div> {/* subtitle */}
          <div className="h-[60px] w-full bg-gray-300 rounded"></div> {/* description */}
        </div>
        {/* Right Image */}
        <div className="w-[192px] h-[192px] bg-gray-300 rounded"></div>
      </div>

      {/* Highlights */}
      <div className="mt-4 flex justify-between items-stretch gap-[15px]">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="rounded-[25px] p-5 w-full flex-1 bg-gray-300 h-[120px]"></div>
        ))}
      </div>
    </div>
  );
};

export default ShortCourseCardSkeleton;
