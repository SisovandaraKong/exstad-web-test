// "use client";

// import React, { useEffect, useMemo, useState } from "react";
// import Image from "next/image";
// import { SparklesText } from "@/components/magicui/sparkles-text";
// import { useGetScholarByUsernameQuery } from "@/components/scholar/scholarApi";
// ;

// type Props = { username: string };

// // tiny blur placeholder
// const BLUR =
//   "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzUwIiBoZWlnaHQ9IjM1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCBmaWxsPSIjZWVlIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PC9zdmc+";

// function isLikelyUrl(u?: string) {
//   if (!u || typeof u !== "string") return false;
//   try {
//     const url = new URL(u);
//     return ["http:", "https:"].includes(url.protocol);
//   } catch {
//     return false;
//   }
// }

// export function ProfileSection({ username }: Props) {
//   const { data: scholar, isLoading, isError } = useGetScholarByUsernameQuery(username);

//   // fallback image handling
//   const initialSrc = useMemo(
//     () => (isLikelyUrl(scholar?.avatar) ? (scholar!.avatar as string) : "/avatar-fallback.png"),
//     [scholar?.avatar]
//   );
//   const [imgSrc, setImgSrc] = useState<string>(initialSrc);

//   useEffect(() => setImgSrc(initialSrc), [initialSrc]);

//   if (isLoading) {
//     return (
//       <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
//         <div
//           className="absolute inset-0"
//           style={{
//             background: `linear-gradient(
//               180deg,
//               rgba(0,0,255,0.2) 0%,
//               rgba(255,0,0,0.2) 50%,
//               rgba(101,154,210,0.2) 100%
//             )`,
//           }}
//         />
//         <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24 xl:gap-32">
//           <div className="relative w-[220px] h-[220px] lg:w-[350px] lg:h-[350px] flex-shrink-0">
//             <div className="w-full h-full rounded-full shadow-2xl bg-gray-200 dark:bg-gray-800 animate-pulse" />
//           </div>
//           <div className="flex-1 w-full max-w-2xl space-y-4 lg:mt-10">
//             <div className="h-10 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
//             <div className="h-8 w-2/3 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
//             <div className="h-24 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
//           </div>
//         </div>
//       </section>
//     );
//   }

//   if (isError || !scholar) {
//     return (
//       <section className="min-h-screen flex items-center justify-center px-6">
//         <p className="text-red-600">No scholar found for <b>{username}</b></p>
//       </section>
//     );
//   }

//   return (
//     <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
//       {/* Background gradient */}
//       <div
//         className="absolute inset-0"
//         style={{
//           background: `linear-gradient(
//             180deg,
//             rgba(0,0,255,0.2) 0%,
//             rgba(255,0,0,0.2) 50%,
//             rgba(101,154,210,0.2) 100%
//           )`,
//         }}
//       />

//       {/* Content */}
//       <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12 lg:gap-24 xl:gap-32">
//         {/* Image */}
//         <div className="relative w-[220px] h-[220px] lg:w-[350px] lg:h-[350px] flex-shrink-0">
//           <Image
//             src={imgSrc}
//             alt={scholar.englishName || scholar.username}
//             fill
//             className="rounded-full object-cover shadow-2xl"
//             placeholder="blur"
//             blurDataURL={BLUR}
//             priority
//             onError={() => setImgSrc("/avatar-fallback.png")}
//             sizes="(min-width: 1024px) 350px, 220px"
//           />

//         </div>

//         {/* Text (lowered with margin) */}
//         <div className="flex-1 text-center lg:text-left space-y-3 lg:space-y-4 lg:mt-12">
//           <h1 className="font-h1 font-extrabold text-color">
//             <SparklesText>{scholar.englishName}</SparklesText>
//           </h1>

//           <h2 className="lg:font-h2 text-[#969696]">
//             {scholar.university} • {scholar.role}
//           </h2>

//           <p className="font-d2 leading-relaxed max-w-2xl mx-auto lg:mx-0">
//             {scholar.bio}
//           </p>

//           {scholar.quote && (
//             <blockquote className="text-2xl lg:text-3xl font-medium text-primary italic">
//               “{scholar.quote}”
//             </blockquote>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";
import React, { useMemo } from "react";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { useGetScholarByUsernameQuery } from "@/components/student/StudentApi";

type Props = {
  username: string;
  avatarAnchorRef?: React.RefObject<HTMLDivElement>;
};

// Type for completed course items
type CompletedCourse = {
  programName?: string;
  title?: string;
  name?: string;
  courseName?: string;
};

export function ProfileSection({ username, avatarAnchorRef }: Props) {
  const {
    data: scholar,
    isLoading,
    isError,
  } = useGetScholarByUsernameQuery(username, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  // ✅ Pick the completed program name (replace ISTAD Scholar)
  const programNames = useMemo(() => {
    const list = Array.isArray(
      (scholar as { completedCourses?: CompletedCourse[] })?.completedCourses
    )
      ? (scholar as { completedCourses?: CompletedCourse[] }).completedCourses
      : [];

    const names = (list || [])
      .map(
        (c: CompletedCourse) =>
          c?.programName ?? c?.title ?? c?.name ?? c?.courseName
      )
      .filter(Boolean);

    // show unique names, joined by " • " if there are multiple
    return Array.from(new Set(names)).join(" • ") || null;
  }, [scholar]);

  if (isLoading) {
    return (
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 via-red-500/20 to-[rgba(101,154,210,0.2)]" />
        <div className="relative z-10 text-gray-500 animate-pulse">
          Loading profile…
        </div>
      </section>
    );
  }

  if (isError || !scholar) {
    return (
      <section className="min-h-screen flex items-center justify-center px-6">
        <p className="text-red-600">
          No scholar found for <b>{username}</b>
        </p>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 via-red-500/20 to-[rgba(101,154,210,0.2)]" />

      {/* content */}
      <div
        className="relative z-10 w-full max-w-6xl mx-auto
        flex flex-col lg:flex-row
        items-center lg:items-start
        justify-center
        gap-8 sm:gap-10 lg:gap-24 xl:gap-32"
      >
        {/* avatar / video area (keep same style) */}
        <div
          className="
            relative
            w-20 h-20
            sm:w-28 sm:h-28
            md:w-40 md:h-40
            lg:w-[350px] lg:h-[350px]
            flex-shrink-0
          "
        >
          <div
            ref={avatarAnchorRef}
            className="w-full h-full rounded-full bg-transparent mt-4 sm:mt-6 lg:mt-12"
          />
        </div>

        {/* text section */}
        <div className="flex-1 text-center lg:text-left space-y-3 lg:space-y-4 lg:self-start items-center mt-6 sm:mt-8 lg:mt-12">
          <h1 className="font-h1 font-extrabold text-color leading-tight text-xl sm:text-xl md:text-5xl lg:text-6xl xl:text-7xl">
            <SparklesText>{scholar.englishName}</SparklesText>
          </h1>

          {/* ✅ render program name instead of ISTAD Scholar */}
          <h2 className="lg:font-h2 text-primary font-semibold">
            {programNames ? <> {programNames}</> : null}
          </h2>

          <p className="font-d2 leading-relaxed max-w-2xl mx-auto lg:mx-0">
            {scholar.bio}
          </p>

          {scholar.quote && (
            <blockquote className="text-2xl lg:text-3xl font-medium text-primary italic">
              “{scholar.quote}”
            </blockquote>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProfileSection;
