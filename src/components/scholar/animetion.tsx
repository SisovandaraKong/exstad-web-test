"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { Marquee } from "@/components/magicui/marquee";
import { BorderBeam } from "@/components/magicui/border-beam";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

import {
  Globe,
  GraduationCap,
  Layers,
  Code,
  BookOpen,
  Award,
  Briefcase,
} from "lucide-react";
import scholarData from "@/data/Scholar.json";
import styles from "./styles.module.css";

// Define types for our data
interface Scholar {
  id: number;
  name: string;
  title: string;
  image: string;
}

interface ScholarWithQuote extends Scholar {
  quote: string;
  category: string;
}

interface SpotlightData {
  image: string;
  badge: string;
  headline: string;
  sub: string;
  description: string;
}

// Get the data from our JSON file
const {
  MOCK_SCHOLARS,
  MOCK_SCHOLARS_2,
  SPOTLIGHT,
}: {
  MOCK_SCHOLARS: Scholar[];
  MOCK_SCHOLARS_2: ScholarWithQuote[];
  SPOTLIGHT: SpotlightData;
} = scholarData;

// --- Section 1 Card (no animation) ---
// const Card1 = ({ person }: { person: (typeof MOCK_SCHOLARS)[number] }) => (
//   <div className="relative group rounded-3xl overflow-hidden bg-white/20 backdrop-blur-xl shadow-md hover:shadow-xl transition-all hover:-translate-y-1 dark:bg-slate-800/40">
//     <div className="aspect-[4/5] w-full overflow-hidden relative">
//       <Image
//         src={person.image}
//         alt={person.name}
//         fill
//         className="object-cover scale-105 group-hover:scale-110 transition-transform duration-700 ease-out"
//         priority={person.id === 1}
//       />
//       <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
//     </div>

//     {/* Shorter gradient footer */}
//     <div className="absolute bottom-0 left-0 right-0 py-1.5 px-2 text-center bg-gradient-to-r from-rose-600/80 to-indigo-500/70">
//       <h3 className="text-xs md:text-sm font-semibold text-white drop-shadow-md">
//         {person.name}
//       </h3>
//       <p className="text-[10px] md:text-xs text-white/90 mt-0.5 leading-snug drop-shadow">
//         {person.title}
//       </p>
//     </div>
//   </div>
// );

// --- Section 1 Card (clickable -> navigates) ---
// const Card1 = ({ person }: { person: (typeof MOCK_SCHOLARS)[number] }) => (
//   // UPDATE: wrap the whole card in <Link> so clicking anywhere navigates.
//   <Link
//     href={`/scholars/${person.id}`}                // <-- destination route
//     aria-label={`View ${person.name}'s story`}     // <-- a11y
//     className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 rounded-3xl"
//   >
//     <div className="relative group rounded-3xl overflow-hidden bg-white/20 backdrop-blur-xl shadow-md hover:shadow-xl transition-all hover:-translate-y-1 dark:bg-slate-800/40 cursor-pointer">
//       <div className="aspect-[4/5] w-full overflow-hidden relative">
//         <Image
//           src={person.image}
//           alt={person.name}
//           fill
//           className="object-cover scale-105 group-hover:scale-110 transition-transform duration-700 ease-out"
//           priority={person.id === 1}
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
//       </div>

//       {/* Shorter gradient footer */}
//       <div className="absolute bottom-0 left-0 right-0 py-1.5 px-2 text-center bg-gradient-to-r from-rose-600/80 to-indigo-500/70">
//         <h3 className="text-xs md:text-sm font-semibold text-white drop-shadow-md">
//           {person.name}
//         </h3>
//         <p className="text-[10px] md:text-xs text-white/90 mt-0.5 leading-snug drop-shadow">
//           {person.title}
//         </p>
//       </div>
//     </div>
//   </Link>
// );

// --- Section 1 Card (clickable -> navigates by NAME) ---
const Card1 = ({ person }: { person: (typeof MOCK_SCHOLARS)[number] }) => {
  // create slug from name (lowercase, spaces -> hyphens)
  const slug = person.name.toLowerCase().replace(/\\s+/g, "-");

  return (
    <Link
      href={`/scholars/${slug}`}
      aria-label={`View ${person.name}'s story`}
      className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 rounded-3xl"
      data-aos="zoom-in-up"
    >
      <div className="relative group rounded-3xl overflow-hidden bg-white/20 backdrop-blur-xl shadow-md hover:shadow-xl transition-all hover:-translate-y-1 dark:bg-slate-800/40 cursor-pointer">
        <div className="aspect-[4/5] w-full overflow-hidden relative">
          <Image
            src={person.image}
            alt={person.name}
            fill
            className="object-cover scale-105 group-hover:scale-110 transition-transform duration-700 ease-out"
            priority={person.id === 1}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
        </div>

        {/* Shorter gradient footer */}
        {/* <div className="absolute bottom-0 left-0 right-0 py-1.5 px-2 text-center bg-gradient-to-r from-rose-600/80 to-indigo-500/70">
          <h3 className="text-xs md:text-sm font-semibold text-white drop-shadow-md">
            {person.name}
          </h3>
          <p className="text-[10px] md:text-xs text-white/90 mt-0.5 leading-snug drop-shadow">
            {person.title}
          </p>
        </div> */}
        <div className="absolute bottom-0 left-0 right-0 py-1.5 px-2 text-center bg-gradient-to-r from-primary/90 to-primary/70">
          <h3 className="text-xs md:text-sm font-semibold text-white drop-shadow-md">
            {person.name}
          </h3>
          <p className="text-[30px] md:text-[15px] text-white/90 mt-0.5 leading-snug drop-shadow">
            {person.title}
          </p>
        </div>
      </div>
    </Link>
  );
};

// --- Section 2 Card (no motion) ---
const Card2 = ({ person }: { person: (typeof MOCK_SCHOLARS_2)[number] }) => (
  <div
    className="rounded-xl p-[2px] bg-gradient-to-r from-blue-500 to-pink-500 shadow-md hover:shadow-lg transition hover:-translate-y-1"
    data-aos="flip-left"
    data-aos-duration="1000"
  >
    <div className="rounded-xl bg-white dark:bg-slate-800 p-10 text-center">
      <div className="mx-auto h-40 w-40 rounded-full overflow-hidden border border-slate-200 shadow-md dark:border-slate-600">
        <Image
          src={person.image}
          alt={person.name}
          width={160}
          height={160}
          className="object-cover"
        />
      </div>
      <h3 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white">
        {person.name}
      </h3>
      <p className="text-lg text-slate-500 dark:text-slate-400">
        {person.title}
      </p>
      <p className="mt-5 text-lg md:text-xl text-slate-600 dark:text-slate-300 italic leading-relaxed">
        “{person.quote}”
      </p>
    </div>
  </div>
);

export default function HeroScholars() {
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
      easing: "ease-in-out",
    });
  }, []);

  const categories = [
    { name: "All", icon: Globe },
    { name: "Pre University", icon: GraduationCap },
    { name: "Foundation", icon: Layers },
    { name: "Full Stack Web", icon: Code },
    { name: "ITP", icon: BookOpen },
    { name: "ITE", icon: Award },
    { name: "Short Course", icon: Briefcase },
  ];

  const filtered =
    activeCategory === "All"
      ? MOCK_SCHOLARS_2
      : MOCK_SCHOLARS_2.filter((s) => s.category === activeCategory);

  return (
    <>
      {/* === SECTION 4 === */}
      <section className="relative isolate overflow-hidden dark:bg-slate-900 h-screen">
        {/* Gradient background */}
        <div
          className={`absolute inset-0 -z-10 ${styles.gradientBackground}`}
        ></div>

        <div className="w-full h-full flex flex-col justify-center px-2 sm:px-4 lg:px-6">
          {/* Titles */}
          <div className="text-center" data-aos="fade-down">
            <h1
              className="text-3xl md:text-5xl font-bold text-primary dark:text-white"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              From Classrooms to Careers
            </h1>
            {/* <p className="mt-2 text-xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-rose-600">
              The Journey of Our Abroad Scholars
            </p> */}
            <p className="mt-2 text-xl md:text-4xl font-bold bg-clip-text  bg-gradient-to-r text-primary">
              The Journey of Our Abroad Scholars
            </p>
            <p className="mt-2 text-color font-d7">
              Where learning turns into leadership and dreams
            </p>
            <p className="text-color font-d7"> into reality</p>
          </div>
          {/* Cards — marquee */}
          <div className="mt-5">
            <Marquee
              pauseOnHover
              repeat={3}
              className="[--duration:30s] [--gap:0.75rem]"
            >
              {MOCK_SCHOLARS.map((person) => (
                <div
                  key={`s1-${person.id}`}
                  className="w-[220px] md:w-[280px] shrink-0"
                >
                  <Card1 person={person} />
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </section>

      {/* === SECTION 3 (Success Blueprint) === */}
      <section className="relative isolate overflow-hidden bg-white dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* LEFT: Title + Steps */}
            <div>
              <h2
                className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white"
                data-aos="fade-right"
              >
                The Success Blueprint for ISTAD Alumni
              </h2>
              <div className="mt-12 flex flex-col gap-10">
                {/* Step 1 */}
                <div
                  className="flex items-center gap-6 relative"
                  data-aos="fade-right"
                  data-aos-delay="100"
                >
                  <span className="text-6xl md:text-7xl font-extrabold text-slate-300/60">
                    01
                  </span>
                  <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg px-6 py-5 ring-1 ring-black/5 flex items-start gap-3">
                    {/* Icon */}
                    <div className="shrink-0 rounded-xl bg-blue-50 text-blue-600 p-2 ring-1 ring-blue-100">
                      <Layers className="h-5 w-5" />
                    </div>
                    {/* Text */}
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
                        Build a Strong Foundation
                      </h3>
                      <p className="text-sm md:text-base text-slate-600 dark:text-slate-400">
                        Learn core IT skills
                      </p>
                    </div>
                  </div>
                </div>
                {/* Step 2 */}
                <div className="flex items-center gap-6 relative">
                  <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg px-6 py-5 ring-1 ring-black/5 flex items-start gap-3">
                    {/* Icon */}
                    <div className="shrink-0 rounded-xl bg-amber-50 text-amber-600 p-2 ring-1 ring-amber-100">
                      <Briefcase className="h-5 w-5" />
                    </div>
                    {/* Text */}
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
                        Putting Skills into Practice
                      </h3>
                      <p className="text-sm md:text-base text-slate-600 dark:text-slate-400">
                        Practice what you’ve learned
                      </p>
                    </div>
                  </div>
                  <span className="text-6xl md:text-7xl font-extrabold text-slate-300/60">
                    02
                  </span>
                </div>
                {/* Step 3 */}
                <div className="flex items-center gap-6 relative">
                  <span className="text-6xl md:text-7xl font-extrabold text-slate-300/60">
                    03
                  </span>
                  <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg px-6 py-5 ring-1 ring-black/5 flex items-start gap-3">
                    {/* Icon */}
                    <div className="shrink-0 rounded-xl bg-rose-50 text-rose-600 p-2 ring-1 ring-rose-100">
                      <Award className="h-5 w-5" />
                    </div>
                    {/* Text */}
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
                        Mastery and Leadership
                      </h3>
                      <p className="text-sm md:text-base text-slate-600 dark:text-slate-400">
                        Become an expert, lead projects
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* RIGHT: Two images side by side */}
            <div className="grid grid-cols-2 gap-6" data-aos="zoom-in-left">
              <Image
                src="/image/reach.jpg"
                alt="Award Ceremony"
                width={500}
                height={500}
                className="rounded-2xl object-cover shadow-md"
                priority
              />
              <Image
                src="/image/yith_sopheaktra.jpg"
                alt="Student Writing"
                width={500}
                height={400}
                className="rounded-2xl object-cover shadow-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* === SECTION 2 (Scholar Spotlight  === */}
      <section className="relative isolate overflow-hidden bg-white dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <Carousel className="relative" opts={{ align: "start", loop: true }}>
            <CarouselContent>
              {MOCK_SCHOLARS.map((person) => (
                <CarouselItem key={`spotlight-card-${person.id}`}>
                  <div className="relative rounded-2xl border border-slate-200 dark:border-slate-700 p-6 md:p-10   overflow-hidden">
                    <BorderBeam
                      size={200}
                      duration={5}
                      colorFrom="#ff4d4d"
                      colorTo="#4d9cff"
                      borderWidth={1}
                    />

                    <div className="flex flex-col gap-10 md:grid md:grid-cols-5 md:items-center relative z-10">
                      <div className="md:col-span-2">
                        <div className="rounded-2xl p-[2px] bg-gradient-to-tr from-rose-500 via-fuchsia-500 to-indigo-500 shadow-lg">
                          <div className="relative rounded-2xl overflow-hidden bg-white dark:bg-slate-800 ring-1 ring-slate-200 dark:ring-slate-700">
                            <div className="relative aspect-[16/11]">
                              <Image
                                src={person.image}
                                alt={person.name}
                                fill
                                className="object-cover w-full h-full"
                                priority={person.id === 1}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="md:col-span-3">
                        <span className="inline-flex items-center rounded-full bg-blue-50 dark:bg-slate-800/60 px-3 py-1 text-xs font-semibold text-blue-700 dark:text-blue-300 ring-1 ring-blue-200/60 dark:ring-slate-700">
                          {SPOTLIGHT.badge}
                        </span>
                        <h3 className="mt-4 text-2xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                          {SPOTLIGHT.headline}
                        </h3>
                        <p className="mt-2 text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-rose-600">
                          {SPOTLIGHT.sub}
                        </p>
                        <p className="mt-4 text-slate-600 dark:text-slate-300 leading-relaxed">
                          {SPOTLIGHT.description}
                        </p>

                        <div className="mt-6 flex flex-wrap gap-3">
                          <Link
                            href={`/scholars/${person.id}`}
                            className="inline-flex items-center rounded-xl px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-rose-600 to-indigo-600 shadow hover:opacity-90"
                          >
                            View Full Story
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Nav buttons (same styling/placement) */}
            <CarouselPrevious aria-label="Previous scholar" />
            <CarouselNext aria-label="Next scholar" />
          </Carousel>
        </div>
      </section>

      {/* === SECTION 1 === */}
      <section className="relative isolate overflow-hidden border-t border-slate-100 bg-white dark:bg-slate-900 dark:border-slate-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <div className="text-center">
            <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
              Discover Our <br /> exSTAD Scholar
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Find the best student for your company and boost your business
              too.
            </p>
          </div>

          {/* Category filter */}
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            {categories.map(({ name, icon: Icon }) => {
              const active = activeCategory === name;
              return (
                <button
                  key={name}
                  onClick={() => setActiveCategory(name)}
                  className={`relative flex items-center gap-2 px-2 py-1 text-sm font-medium transition-colors ${
                    active
                      ? "text-blue-600"
                      : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 ${
                      active
                        ? "text-blue-600"
                        : "text-slate-400 dark:text-slate-500"
                    }`}
                    aria-hidden="true"
                  />
                  <span>{name}</span>
                  {active && (
                    <span
                      className="absolute -bottom-1 left-0 right-0 mx-auto h-[2px] w-full rounded-full bg-blue-500"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Scholar cards */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {filtered.map((person) => (
              <Card2 key={`s2-${person.id}`} person={person} />
            ))}
          </div>
        </div>
      </section>
      {/* section 5 */}
      <section className="bg-gray-50 py-16 px-6 md:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Once a Member, Always a Part
          </h2>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            of the Family
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            Our alumni are part of our family for life. Celebrate achievements,
            stay connected, and share your journey with a community that lasts
            beyond the classroom.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Large top image */}
            <div className="md:col-span-2">
              <Image
                unoptimized
                width={500}
                height={500}
                src="/image/IMG_1518.jpg"
                alt="Group of alumni"
                className="w-full rounded-2xl shadow-md object-cover"
              />
            </div>
            {/* Middle row (2 images) */}
            <Image
              unoptimized
              width={500}
              height={500}
              src="https://z-p3-scontent.fpnh5-2.fna.fbcdn.net/v/t39.30808-6/482004918_646817148098789_6516389147884209010_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=f727a1&_nc_eui2=AeEVwykBn4VP38YIgK6-vHVSQjq8w9SqqJ5COrzD1Kqongw98nuJ07FCzw0w1DN2VZNYgNaWwZCZQSMsokRebut0&_nc_ohc=iMapw9jFeLoQ7kNvwGXY3Ju&_nc_oc=AdlLOCXae2eXtqjbu1L1iF3cRxvp0ex82aINp56e5lHnRoWt8znY9FVFPjk6FQ2PLYo&_nc_zt=23&_nc_ht=z-p3-scontent.fpnh5-2.fna&_nc_gid=NVh5km8Ujfb6g6zdUaApzA&oh=00_AfYn_O75nIafL6YVpYyXnTRzr8CWlpF9_UUGEWOTAqkwww&oe=68C9D144"
              alt="Alumni group photo"
              className="w-full rounded-2xl shadow-md object-cover"
            />
            <Image
              unoptimized
              width={500}
              height={500}
              src="https://z-p3-scontent.fpnh5-2.fna.fbcdn.net/v/t39.30808-6/489964894_674024462044724_7791242851026023255_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=f727a1&_nc_eui2=AeEkNbqTLsp9qLERrSHEGm11oyHmE_gLp4WjIeYT-AunhflXwXbIIPl9fTWS2JI6gy0O3HRmYVmQ8BgWhwGvr2uP&_nc_ohc=UhuDrdgWmCIQ7kNvwGjpQ9p&_nc_oc=AdkpGkFlFonZiht9GCmU8KPkZFVP19_PEQHNKvXAjoykadTmT2xRfkyvLgHfwkSIaCc&_nc_zt=23&_nc_ht=z-p3-scontent.fpnh5-2.fna&_nc_gid=jSBCAyHxc7dD7IXI4YyMXQ&oh=00_AfZzFe-ewLXHqMRKeU3RZCCn6kgpCzhYm83bRi6Qd6tVVQ&oe=68C9EC05"
              alt="Alumni group photo"
              className="w-full rounded-2xl shadow-md object-cover"
            />
            {/* Bottom row */}
            <div className="md:col-span-2">
              <Image
                unoptimized
                width={500}
                height={500}
                src="https://z-p3-scontent.fpnh5-5.fna.fbcdn.net/v/t39.30808-6/486502152_657980043649166_3017000215226357790_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeF1Jh4kM2ryul626KzSWurP5Stc0-Q0TgXlK1zT5DROBZmLU3vMrk9w_auX5vErta6qOrwlrdPfDa6iyheaV6-I&_nc_ohc=68_-Ng9BorQQ7kNvwEpeCft&_nc_oc=AdnIbcy2qqxlE57ghJgpmjF3DpZRu9iJu0HbOzDHg-gfjrYvlzPbSB6WGLyyZ9c4r18&_nc_zt=23&_nc_ht=z-p3-scontent.fpnh5-5.fna&_nc_gid=0X2bAsfQEL-d-wjMcRr1Ew&oh=00_AfaVy_c1V0lu-PmaQ_hkOYX2Dvd9EG7xJZeWTEkqMTrvNw&oe=68C9D7F9"
                alt="Alumni outdoor photo"
                className="w-full  rounded-2xl shadow-md object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
