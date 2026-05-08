"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useGetAllTechnologyQuery } from "./technologiesApi";
import NotFoundProgram from "../../components/NotFound";
import { useTranslations } from "next-intl";
import { GrTechnology } from "react-icons/gr";

interface Props {
  programUuid: string;
  onHasData?: (hasData: boolean) => void;
}

const TechnologySection: React.FC<Props> = ({ programUuid, onHasData }) => {
  const { data, isLoading, isError } = useGetAllTechnologyQuery(programUuid, {
    refetchOnMountOrArgChange: true,
  });
  const t = useTranslations();

  const technologies = data ?? [];

  // Notify parent when data state changes
  useEffect(() => {
    if (!isLoading && !isError) {
      onHasData?.(technologies.length > 0);
    }
  }, [technologies.length, isLoading, isError, onHasData]);

  if (isLoading) return null; // Return null during loading
  if (isError)  return <NotFoundProgram
        title="Failed to load technology section"
        className="bg-background  rounded-b-[24px] flex flex-col space-y-3 justify-center items-center min-h-screen h-fit"
      />; // Return null on error
  if (technologies.length === 0) return null; // Return null if empty

  return (
    <section className="">
      <div className="max-w-4xl mx-auto">
        <h1 className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg md:text-xl lg:text-2xl text-primary font-bold mb-6">
          <GrTechnology className="text-lg sm:text-xl md:text-2xl" />
          {t("technologies-in-use")}
        </h1>

        <div className="border-l-4 dark:bg-gray-800 border-primary rounded-lg shadow-[0_4px_15px_rgba(0,0,0,0.15)] overflow-hidden">
          {technologies.map((item, index) => (
            <div
              key={index}
              className="flex border-b border-gray-300 dark:border-gray-600 items-start gap-4 p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              data-aos="fade-up"
            >
              <Image
                unoptimized
                width={48}
                height={48}
                src={item.image}
                alt={item.title}
                className="w-12 flex-shrink-0 object-cover"
              />
              <div>
                <h3 className="text-base md:text-lg font-semibold text-black dark:text-white">
                  {item.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mt-1">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;