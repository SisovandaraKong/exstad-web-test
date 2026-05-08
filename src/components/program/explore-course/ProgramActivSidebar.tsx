// ProgramActiveSidebar.tsx - Updated with "All" option for Level

"use client";

import React, { useState } from "react";
import { X, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useKhmerNumber } from "@/services/to-khmer-number";
import { useTranslations } from "next-intl";

type MasterProgramType = {
  programType: "SCHOLARSHIP" | "SHORT_COURSE" | string;
  title: string;
};

type Props = {
  programData: MasterProgramType[];
  programFilter: string;
  setProgramFilter: (filter: string) => void;
  levelFilter: string[];
  setLevelFilter: (filter: string[]) => void;
  subFilter: string[];
  setSubFilter: (filter: string[]) => void;
};

const ProgramActiveSidebar: React.FC<Props> = ({
  programData,
  programFilter,
  setProgramFilter,
  levelFilter,
  setLevelFilter,
  subFilter,
  setSubFilter,
}) => {
  const [showAllScholarships, setShowAllScholarships] = useState(false);
  const [showAllShortCourses, setShowAllShortCourses] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const t = useTranslations();
  const toKhmerNumber = useKhmerNumber();

  const scholarshipOptions = Array.from(
    new Set(
      programData
        .filter((p) => p.programType === "SCHOLARSHIP")
        .map((p) => p.title)
        .filter(Boolean)
    )
  );

  const shortCourseOptions = Array.from(
    new Set(
      programData
        .filter((p) => p.programType === "SHORT_COURSE")
        .map((p) => p.title)
        .filter(Boolean)
    )
  );

  const visibleScholarshipOptions = showAllScholarships
    ? scholarshipOptions
    : scholarshipOptions.slice(0, 3);

  const visibleShortCourseOptions = showAllShortCourses
    ? shortCourseOptions
    : shortCourseOptions.slice(0, 3);

  const toggleOption = (option: string) => {
    setSubFilter(
      subFilter.includes(option)
        ? subFilter.filter((o) => o !== option)
        : [...subFilter, option]
    );
  };

  const renderOption = (option: string, selected: boolean) => (
    <li key={option} className="flex items-center gap-2">
      <div className="form-check flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          id={`option_${option}`}
          checked={selected}
          onChange={() => toggleOption(option)}
          className="form-check-input  w-4 h-4 accent-primary text-primary border-gray-400 rounded cursor-pointer"
        />
        <label
          htmlFor={`option_${option}`}
          className="form-check-label text-[13px] font-medium text-gray-700 dark:text-gray-300 cursor-pointer select-none"
        >
          {option}
        </label>
      </div>
    </li>
  );

  const renderToggleButton = (
    options: string[],
    showAll: boolean,
    setShowAll: (show: boolean) => void
  ) => {
    if (options.length <= 3) return null;
    const remainingCount = options.length - 3;
    const displayCount = toKhmerNumber(remainingCount);

    return (
      <button
        onClick={() => setShowAll(!showAll)}
        className="mt-2 ml-1 text-primary dark:text-white text-xs font-semibold hover:underline transition-colors duration-150"
      >
        {showAll ? t("show-less") : `${t("load-more")} (${displayCount})`}
      </button>
    );
  };

  const isFiltered =
    programFilter !== "All" || levelFilter.length > 0 || subFilter.length > 0;

  const SidebarContent = (
    <>
      <div className="flex items-center gap-3 pb-4 border-b border-gray-200 dark:border-gray-700">
        <Filter size={26} className="text-primary flex-shrink-0" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight m-0">
          {t("filter")}
        </h2>
      </div>

      <div className="overflow-y-auto max-h-[70vh] space-y-4">
        {/* Program Type Filter */}
        <div>
          <h3 className="font-medium text-[16px] mb-2 text-gray-800 dark:text-gray-200">
            {t("program-type")}
          </h3>
          <ul className="space-y-2 p-2">
            {["All", "Scholarship Course", "Short Course"].map((type) => (
              <li key={type} className="flex items-center gap-2 cursor-pointer">
                <div
                  className={`w-[18px] h-[18px] rounded-full border border-[#BFBFBF] flex-shrink-0 transition-all duration-150 ${
                    programFilter === type ? "border-4 border-primary" : ""
                  }`}
                  onClick={() => {
                    setProgramFilter(type);
                    setSubFilter([]);
                  }}
                />
                <button
                  onClick={() => {
                    setProgramFilter(type);
                    setSubFilter([]);
                  }}
                  className="text-[13px] font-medium text-gray-700 dark:text-gray-300"
                >
                  {type === "All"
                    ? t("all")
                    : type === "Scholarship Course"
                    ? t("scholarship-courses")
                    : t("short-courses")}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Scholarship Filter */}
        <div>
          <h3 className="font-medium text-[16px] mb-2 text-gray-800 dark:text-gray-200">
            {t("scholarship")}
          </h3>
          <ul className="space-y-2 p-2">
            {visibleScholarshipOptions.map((option) =>
              renderOption(option, subFilter.includes(option))
            )}
          </ul>
          {renderToggleButton(
            scholarshipOptions,
            showAllScholarships,
            setShowAllScholarships
          )}
        </div>

        {/* Short Course Filter */}
        <div>
          <h3 className="font-medium text-[16px] mb-2 text-gray-800 dark:text-gray-200">
            {t("short-courses")}
          </h3>
          <ul className="space-y-2 p-2">
            {visibleShortCourseOptions.map((option) =>
              renderOption(option, subFilter.includes(option))
            )}
          </ul>
          {renderToggleButton(
            shortCourseOptions,
            showAllShortCourses,
            setShowAllShortCourses
          )}
        </div>

        {/* Level Filter with "All" option */}
        <div>
          <h3 className="font-medium text-[16px] mb-2 text-gray-800 dark:text-gray-200">
            {t("level")}
          </h3>
          <ul className="space-y-2 p-2">
            {/* All option for Level */}
            <li className="flex items-center gap-2">
              <div className="form-check flex items-center gap-2">
                <input
                  type="checkbox"
                  id="level_All"
                  checked={levelFilter.length === 0}
                  onChange={() => setLevelFilter([])}
                  className="form-check-input w-4 h-4 accent-primary text-primary border-gray-400 rounded cursor-pointer"
                />
                <label
                  htmlFor="level_All"
                  className="form-check-label text-[13px] font-medium text-gray-700 dark:text-gray-300 cursor-pointer select-none"
                >
                  {t("all")}
                </label>
              </div>
            </li>

            {/* Individual Level Checkboxes */}
            {["Basic", "Intermediate", "Advanced"].map((level) => (
              <li key={level} className="flex items-center gap-2">
                <div className="form-check flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`level_${level}`}
                    checked={levelFilter.includes(level)}
                    onChange={() => {
                      if (levelFilter.includes(level)) {
                        setLevelFilter(levelFilter.filter((l) => l !== level));
                      } else {
                        setLevelFilter([...levelFilter, level]);
                      }
                    }}
                    className="form-check-input w-4 h-4 accent-primary text-primary border-gray-400 rounded cursor-pointer"
                  />
                  <label
                    htmlFor={`level_${level}`}
                    className="form-check-label text-[13px] font-medium text-gray-700 dark:text-gray-300 cursor-pointer select-none"
                  >
                    {level === "Basic"
                      ? t("basic")
                      : level === "Intermediate"
                      ? t("intermediate")
                      : t("advanced")}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Reset Filters */}
      {isFiltered && (
        <button
          onClick={() => {
            setProgramFilter("All");
            setLevelFilter([]);
            setSubFilter([]);
            setShowAllScholarships(false);
            setShowAllShortCourses(false);
          }}
          className="flex items-center justify-center gap-1 mt-2 px-3 py-1 
            border border-gray-300 text-gray-700 bg-white 
            hover:bg-gray-50 hover:border-gray-400 hover:shadow-md
            dark:border-gray-600 dark:text-gray-300 dark:bg-gray-800
            dark:hover:bg-gray-700 
            text-sm font-medium rounded-lg shadow-sm 
            focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 focus:ring-offset-1 
            transition-all duration-150 w-full"
        >
          <X className="w-4 h-4" />
          {t("reset-filters")}
        </button>
      )}
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-auto sticky top-28 p-[20px] border rounded-lg bg-background shadow-lg space-y-1">
        {SidebarContent}
      </aside>

      {/* Floating Filter Button for Tablet & Mobile */}
      <button
        onClick={() => setIsDrawerOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-primary text-white rounded-full p-3 shadow-lg hover:bg-primary/90 transition-all lg:hidden"
      >
        <Filter size={24} />
      </button>

      {/* Drawer for Tablet & Mobile */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Overlay */}
            <motion.div
              key="overlay"
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
            />

            {/* Slide-in drawer */}
            <motion.div
              key="drawer"
              className="fixed right-0 top-0 h-full bg-background z-50 shadow-2xl p-4 overflow-y-auto
              w-[60%] sm:w-[60%] md:w-[40%] lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {t("filter")}
                </h2>
                <button onClick={() => setIsDrawerOpen(false)}>
                  <X size={22} className="text-gray-500 hover:text-gray-700" />
                </button>
              </div>
              {SidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProgramActiveSidebar;