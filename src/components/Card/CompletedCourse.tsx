/** @format */

import { Button } from "@/components/ui/button";
import Image from "next/image";

export type CompletedCourse = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  bgColor: string;
  leftText: string;
  rightText: string;
};

type CompletedCourseCardProps = {
  course: CompletedCourse;
  className?: string;
};

export function CompletedCourseCard({ course, className }: CompletedCourseCardProps) {
  return (
    <div className={`flex ${className}`}>
      <div className="flex w-full justify-center gap-6">
        <div
          className="w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl min-h-[300px] sm:min-h-[400px] md:min-h-[500px] rounded-3xl shadow-lg overflow-hidden flex flex-col"
          style={{ background: course.bgColor }}
        >
          <div className="flex flex-col justify-between h-full px-4 sm:px-8 pt-6 sm:pt-8 text-center">
            <div>
              <h1 className="text-lg sm:text-xl md:text-2xl md:line-clamp-1 font-bold text-black mb-2">
                {course.title}
              </h1>
              <p className="text-gray-800 mb-6 sm:mb-8 font-medium text-sm sm:text-base md:text-lg line-clamp-1">
                {course.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-6 sm:mb-8 items-center justify-center">
                <Button
                  variant="outline"
                  className="flex-1 border-primary text-primary bg-transparent hover:bg-transparent hover:text-primary-hover rounded-full py-2 sm:py-3 px-4 sm:px-6 font-medium text-xs sm:text-base"
                  // onClick={() => window.open(course.rightText, "_blank")}
                >
                  {course.rightText}
                </Button>
              </div>
            </div>
            <div className="flex justify-center mt-auto">
              <Image
                unoptimized
                src={course.imageUrl}
                alt={course.title}
                className="w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] md:w-[260px] md:h-[260px] lg:w-[300px] lg:h-[300px] object-cover rounded-xl mx-auto"
                width={300}
                height={300}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
