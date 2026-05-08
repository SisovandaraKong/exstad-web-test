"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MasterProgramType } from "@/types/master-program";
import { openingProgramType } from "@/types/opening-program";
interface ScholarshipCardProps extends MasterProgramType {
  openingProgram?: openingProgramType;
}

const ShortCourseCard: React.FC<ScholarshipCardProps> = ({
  title,
  subtitle,
  slug,
  description,
  bgColor,
  highlights,
  logoUrl,
  openingProgram,
}) => {
  return (
    <Link href={`/our-program/${slug}`} className="block">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        whileHover={{ boxShadow: "0px 10px 25px rgba(0,0,0,0.1)" }}
        className="rounded-[20px] p-4 md:p-10 lg:p-[70px] transition-shadow duration-300"
        style={{ background: bgColor }}
      >
        {/* Header section */}
     <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4 md:gap-6">
  <div className="flex-1 text-center md:text-left space-y-1 md:space-y-3">
    <motion.h2 
      className="text-2xl md:text-4xl font-bold text-foreground"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
    >
      {title}
    </motion.h2>

    {subtitle && (
      <motion.p
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/20 backdrop-blur-md border border-white/30 shadow-md text-sm md:text-2xl text-white font-medium w-fit mx-auto md:mx-0 rounded-[10px] px-2 py-1 hover:bg-white/30 transition-all duration-300"
      >
        {subtitle}
      </motion.p>
    )}

    {description && (
      <motion.p 
        className="text-sm md:text-base line-clamp-3"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {description}
      </motion.p>
    )}
  </div>

  {logoUrl && (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      <Image
        unoptimized
        width={120}
        height={500}
        src={logoUrl || "example.com"}
        alt={title}
        className="w-[120px] md:w-[192px] object-cover rounded-lg mx-auto md:mx-0"
      />
    </motion.div>
  )}
</div>


        {/* Highlights */}
        {highlights && highlights.length > 0 && (
            <motion.div 
              className="mt-4 md:mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
            {highlights.map((h, index) => {
              const isPrice = h.label.toLowerCase() === "price";
              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 250 }}
                  className={`rounded-[12px] md:rounded-[15px] lg:rounded-[20px] py-3 px-4 md:p-5 w-full ${
                    isPrice
                        ? "flex flex-col justify-center items-center bg-gradient-to-br from-white/25 via-black/20 to-black/20 backdrop-blur-xl border border-white/30 shadow-lg hover:shadow-white/20"
                      : "flex flex-col justify-between bg-black/20 backdrop-blur-xl border border-white/10 shadow-lg"
                  }`}
                >
                  {isPrice ? (
                    <>
                      <span className="absolute top-7 right-8 text-red-400 text-xs md:text-lg line-through">
                        ${h.value}
                      </span>
                      <h2 className="text-white font-bold text-lg md:text-3xl text-center drop-shadow-lg ">
                        ${h.desc}
                      </h2>
                    </>
                  ) : (
                    <>
                      <h2 className="text-white font-bold text-sm md:text-lg drop-shadow-md">
                        {h.value || h.label}
                      </h2>
                      <p className="text-white/70 font-medium text-xs md:text-base mt-1 md:mt-2 line-clamp-2">
                        {h.desc}
                      </p>
                    </>
                  )}
                </motion.div>
              );
            })}
            </motion.div>
        )}
      </motion.div>
    </Link>
  );
};

export default ShortCourseCard;
