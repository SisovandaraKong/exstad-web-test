"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useGetAllActivityQuery } from "@/components/program/detail-program/activity/activityApi";
import AOS from "aos";
import NotFoundProgram from "../../components/NotFound";
import { useTranslations } from "next-intl";
import { ActivityType } from "@/types/opening-program";
import { useKhmerNumber } from "@/services/to-khmer-number";
import NoDataComponent from "../../components/NoDataComponents";
export type ProgramGeneration = {
  uuid: string;
  title: string;
};

type ActivityProps = {
  generations: ProgramGeneration[];
};

const ProgramActivityTap: React.FC<ActivityProps> = ({ generations }) => {
  const [selectedGenerationId, setSelectedGenerationId] = useState("");

  // Update selectedGenerationId whenever generations change
  useEffect(() => {
    if (generations.length) {
      setSelectedGenerationId(generations[0].uuid); // or generations[generations.length - 1].uuid for latest
    }
  }, [generations]);

  const {
    data: activities = [],
    isLoading,
    isError,
  } = useGetAllActivityQuery(selectedGenerationId, {
    skip: !selectedGenerationId,
    refetchOnMountOrArgChange: true,
  });
  const t = useTranslations();
  const toKhmerNumber = useKhmerNumber();
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const underlineRef = useRef<HTMLDivElement>(null);
  
  // Animate underline
  useEffect(() => {
    const currentTab = tabsRef.current.find(
      (tab) => tab?.dataset.id === selectedGenerationId
    );
    if (currentTab && underlineRef.current) {
      const { offsetLeft, offsetWidth } = currentTab;
      underlineRef.current.style.transform = `translateX(${offsetLeft}px)`;
      underlineRef.current.style.width = `${offsetWidth}px`;
    }
  }, [selectedGenerationId]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  if (!generations.length) {
    return (
      <p className="text-gray-500 text-center">No opening program available.</p>
    );
  }
  if (isLoading) {
    return <p className="text-gray-500 text-center">Loading activities...</p>;
  }
  if (isError) {
    return (
      <NotFoundProgram
        title="Failed to Load Activity"
        className="bg-background rounded-b-3xl flex flex-col space-y-3 justify-center items-center min-h-screen h-fit"
      />
    );
  }
  if (!activities || activities.length === 0) {
    return (
      <NoDataComponent message="This program does not have any activity content yet." />
    );
  }

  return (
    <div className="w-full bg-background grid p-4 sm:p-6 md:p-6 gap-10 rounded-b-3xl">
      <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-foreground">
        {t("activity")}
      </h1>

      {/* Scrollable generations */}
      <div className="relative flex gap-2 sm:gap-3 md:gap-4 overflow-x-auto pb-2 mt-2 scrollbar-hide">
        {generations.map((gen, index) => {
          const parts = gen.title.split(" ");
          const numberPart = parts.find((part) => !isNaN(Number(part))) ?? "";
          const khmerNumber = toKhmerNumber(numberPart);
          const khmerGeneration = t("generation");
          const khmerTitle = `${khmerGeneration} ${khmerNumber}`;
          return (
            <button
              key={gen.uuid}
              data-id={gen.uuid}
              ref={(el) => {
                tabsRef.current[index] = el;
              }}
              onClick={() => setSelectedGenerationId(gen.uuid)}
              className={`px-3 sm:px-4 md:px-6 py-1 sm:py-2 rounded-2xl font-medium whitespace-nowrap text-sm sm:text-base md:text-lg ${
                selectedGenerationId === gen.uuid
                  ? "text-primary dark:text-white"
                  : "text-foreground  hover:bg-gray-200 dark:hover:bg-primary "
              }`}
            >
              {khmerTitle}
            </button>
          );
        })}

        <div
          ref={underlineRef}
          className="absolute bottom-0 h-1 bg-primary transition-all duration-300 rounded"
        />
      </div>

      {/* Activities */}
      <div className="grid gap-4 sm:gap-6 border-t border-gray-300">
        {activities.map((activity: ActivityType) => (
          <div
            key={activity.uuid}
            className="relative flex flex-col gap-4 sm:gap-6 my-4 sm:my-6 p-4 sm:p-6 md:p-8 rounded-2xl border-l-0.5 border-transparent"
            data-aos="fade-up"
          >
            <div className="absolute top-0 left-0 h-full w-0.5 rounded-l-2xl bg-gradient-to-b from-[#328BE6] to-transparent"></div>
            <h3 className="font-bold text-lg sm:text-xl md:text-2xl text-foreground">
  {t(activity.title.toLowerCase().replaceAll(" ", "-"), { default: activity.title })}
            </h3>
            <p className="font-normal text-description text-sm sm:text-base md:text-lg">
              {activity.description}
            </p>
            {activity.image && (
              <Image
                unoptimized
                height={500}
                width={500}
                src={activity.image}
                alt={activity.title}
                className="rounded-2xl w-full  h-auto max-h-96 object-cover"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgramActivityTap;
