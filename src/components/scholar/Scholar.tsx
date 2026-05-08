"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTranslations } from "next-intl";

import { Marquee } from "@/components/magicui/marquee";
import { BorderBeam } from "@/components/magicui/border-beam";

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
  ChevronDown,
  Building2,
} from "lucide-react";

import styles from "./styles.module.css";

import {
  useGetAllScholarsQuery,
  useGetAllProgramsQuery,
  useGetScholarsByProgramUuidQuery,
  useLazyGetScholarsByProgramUuidQuery,
} from "@/components/student/StudentApi";

import type { Scholar as ApiScholarBase } from "@/types/scholar/scholar";

/* ---------- Types ---------- */
type ApiSpecialist = {
  uuid?: string;
  country?: string;
  specialist?: string;
  universityName?: string;
  about?: string;
  degreeType?: string;
};

type ApiCareer = {
  uuid: string;
  salary?: number;
  company?: string;
  position?: string;
  interest?: string;
  companyType?: string;
};

type ApiAudit = { updatedAt?: string | number | Date };

type ApiScholar = ApiScholarBase & {
  specialist?: ApiSpecialist[] | null;
  careers?: ApiCareer[] | null;
  completedCourses?: Array<{
    programName?: string;
    name?: string;
    title?: string;
    generation?: number;
  }> | null;
  category?: string;
  audit?: ApiAudit;
  isEmployed?: boolean;
  isAbroad?: boolean;
};

type ApiError = { data?: { message?: string }; error?: string };

type ScholarCard = {
  id: number;
  uuid?: string;
  username?: string;
  name: string;
  title: string;
  image: string;
  spec: ApiSpecialist;
};

type ScholarWithQuote = Omit<ScholarCard, "spec"> & {
  quote: string;
  category: string;
  spec: ApiSpecialist;
  company?: string;
  /** NEW: first program title to show when a program filter is active */
  programName?: string;
};

type SpotlightItem = {
  id: number;
  uuid?: string;
  href: string;
  image: string;
  displayName: string;
  programName?: string;
  generation?: number | null;
  position?: string;
  company?: string;
  interest?: string;
};

/* ---------- Helpers ---------- */
const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.exstad.tech";

function normalizeAvatar(avatar?: string) {
  if (!avatar) return "";
  const v = avatar.trim();
  return v.startsWith("http")
    ? v
    : `${API_BASE}${v.startsWith("/") ? v : `/${v}`}`;
}
function versioned(src?: string, ver?: string | number | Date) {
  const base = src || "/placeholder.svg";
  const stamp =
    typeof ver === "number"
      ? ver
      : ver instanceof Date
      ? ver.getTime()
      : ver
      ? new Date(ver).getTime()
      : Date.now();
  return `${base}${base.includes("?") ? "&" : "?"}v=${stamp}`;
}
const BLUR =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzUwIiBoZWlnaHQ9IjM1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCBmaWxsPSIjZWVlIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PC9zdmc+";

/** ===============================
 *  Section 4 helpers (category logic)
 *  (These labels are used for internal logic; per your spec,
 *  Section 4 content stays as-is except the title.)
 * ================================ */
const CATEGORY_LABELS = {
  ALL: "All",
  PREU: "Pre University",
  FDN: "Foundation",
  FSW: "Full Stack Web Development",
  ITP: "IT Professional",
  ITE: "IT Expert",
  SC: "Short Course",
} as const;

type CategoryLabel = (typeof CATEGORY_LABELS)[keyof typeof CATEGORY_LABELS];

function normalizeProgramName(
  raw?: string
): Exclude<CategoryLabel, "All"> | "" {
  if (!raw) return "";
  const s = raw.trim().toLowerCase();

  if (
    /(^|\b)pre[\s-]?uni(versity)?\b/.test(s) ||
    /pre[-\s]?university/i.test(raw)
  ) {
    return CATEGORY_LABELS.PREU;
  }
  if (/foundation/i.test(raw)) return CATEGORY_LABELS.FDN;
  if (
    s.includes("full") &&
    (s.includes("stack") || s.includes("stak") || s.includes("stcak")) &&
    (s.includes("web") || s.includes("develop"))
  ) {
    return CATEGORY_LABELS.FSW;
  }
  if (/it\s*profession(al)?/i.test(raw) || /\bitp\b/i.test(raw)) {
    return CATEGORY_LABELS.ITP;
  }
  if (/it\s*expert/i.test(raw) || /\bite\b/i.test(raw)) {
    return CATEGORY_LABELS.ITE;
  }
  return ""; // everything else → SC
}

function deriveCategoryFromCompleted(
  programNames: string[]
): Exclude<CategoryLabel, "All"> {
  const normalized = programNames
    .map(normalizeProgramName)
    .filter(Boolean) as Exclude<CategoryLabel, "All">[];

  const priority: Exclude<CategoryLabel, "All">[] = [
    CATEGORY_LABELS.FSW,
    CATEGORY_LABELS.ITE,
    CATEGORY_LABELS.ITP,
    CATEGORY_LABELS.FDN,
    CATEGORY_LABELS.PREU,
  ];

  for (const label of priority) {
    if (normalized.includes(label)) return label;
  }
  return CATEGORY_LABELS.SC;
}

/* =========================================================
   Card1 (Section 1)
   ========================================================= */
function Card1({ person }: { person: ScholarCard }) {
  const [src, setSrc] = useState(person.image || "/placeholder.svg");
  const [hovered, setHovered] = useState(false);
  useEffect(() => setSrc(person.image || "/placeholder.svg"), [person.image]);

  const lockScroll = () => {
    const sbw = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty("--scrollbar-width", `${sbw}px`);
    if (!document.body.classList.contains("no-scroll")) {
      document.body.classList.add("no-scroll");
    }
  };
  const unlockScroll = () => {
    document.body.classList.remove("no-scroll");
    document.documentElement.style.removeProperty("--scrollbar-width");
  };
  const onEnter = () => {
    setHovered(true);
    lockScroll();
  };
  const onLeave = () => {
    setHovered(false);
    unlockScroll();
  };
  useEffect(() => {
    return () => {
      document.body.classList.remove("no-scroll");
      document.documentElement.style.removeProperty("--scrollbar-width");
    };
  }, []);

  const slug = person.uuid || person.name.toLowerCase().replace(/\s+/g, "-");
  const href = person.username ? `/${person.username}` : `/scholars/${slug}`;
  const spec = person.spec;

  return (
    <Link
      href={href}
      aria-label={`View ${person.name}'s profile`}
      className="block rounded-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className="relative rounded-3xl overflow-hidden bg-white/20 backdrop-blur-xl shadow-md transition-all duration-300 hover:shadow-xl dark:bg-slate-800/40">
        <div className="relative aspect-[10/13] w-full">
          <Image
            src={src}
            alt={person.name}
            fill
            sizes="(max-width: 640px) 40vw, (max-width: 1024px) 25vw, 18vw"
            className={[
              "absolute inset-0 h-full w-full object-cover",
              "transform-gpu will-change-transform",
              "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
              hovered ? "scale-[1.045]" : "scale-100",
            ].join(" ")}
            placeholder="blur"
            blurDataURL={BLUR}
            onError={() => setSrc("/placeholder.svg")}
            unoptimized
            priority
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

          {/* EXPANDING FOOTER */}
          <div
            className={[
              "absolute bottom-0 left-0 right-0 overflow-hidden bg-primary/95 text-white",
              "transform-gpu will-change-[height]",
              "transition-[height] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
              hovered ? "h-full" : "h-[70px]",
            ].join(" ")}
          >
            {/* Compact */}

            <div
              className={[
                "px-3 py-2 text-center",
                "transition-opacity duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                hovered ? "opacity-0" : "opacity-100",
              ].join(" ")}
            >
              <p className="font-semibold text-sm">{person.name}</p>

              {spec?.universityName && (
                <p className="text-[11px] text-white/90 line-clamp-1">
                  {spec.universityName}
                </p>
              )}

              {spec?.specialist && (
                <p className="text-[11px] text-white/90 line-clamp-1">
                  {spec.specialist}
                </p>
              )}
            </div>

            {/* Expanded */}
            <div
              className={[
                "absolute inset-0 px-4 py-4",
                "transform-gpu transition-opacity duration-300 delay-150 ease-[cubic-bezier(0.22,1,0.36,1)]",
                hovered ? "opacity-100" : "opacity-0",
              ].join(" ")}
            >
              <div className="space-y-0.5">
                <p className="text-md font-bold">{person.name}</p>

                {spec?.specialist && (
                  <p className="text-sm opacity-90">{spec.specialist}</p>
                )}
                {spec?.universityName && (
                  <p className="text-sm opacity-90">{spec.universityName}</p>
                )}
                {spec?.degreeType && (
                  <p className="text-sm opacity-80">{spec.degreeType}</p>
                )}
                {/* ...country on the next line (only if present) */}
                {spec?.country && (
                  <p className="text-sm opacity-70">{spec.country}</p>
                )}
              </div>

              {spec?.about && (
                <p
                  className={[
                    "mt-3 text-sm leading-relaxed pe-1",
                    "max-h-[62%] overflow-y-auto",
                    styles.noScrollbar,
                  ].join(" ")}
                >
                  {spec.about}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
/* =========================================================
   Card2 (Section 4 grid) — version without subtitle
   ========================================================= */
function Card2({
  person,
  activeCategory,
  selectedProgramUuid,
}: {
  person: ScholarWithQuote;
  activeCategory: CategoryLabel;
  selectedProgramUuid?: string | null;
}) {
  const [src, setSrc] = useState(person.image || "/placeholder.svg");
  useEffect(() => setSrc(person.image || "/placeholder.svg"), [person.image]);

  const displayName = person.name?.trim() || "Unnamed Scholar";
  const hasCompany = !!person.company?.trim();
  const hasQuote = !!person.quote?.trim();

  // Decide what program name to show under the name
  const programLine = selectedProgramUuid
    ? activeCategory === CATEGORY_LABELS.PREU ||
      activeCategory === CATEGORY_LABELS.FSW
      ? activeCategory
      : person.programName || ""
    : "";
  const slug = person.uuid || person.name.toLowerCase().replace(/\s+/g, "-");
  const href = person.username ? `/${person.username}` : `/scholars/${slug}`;

  return (
    <Link
      href={href}
      className="group rounded-lg p-[1px] bg-gradient-to-r from-blue-500 to-pink-500 shadow transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      aria-label={`View ${displayName}'s profile`}
    >
      <div
        className={[
          "rounded-lg bg-white dark:bg-slate-800",
          "px-3 py-4 sm:px-4 sm:py-5 md:p-6",
          "text-center transition-all duration-200 ease-out",
          "flex flex-col items-center",
          "min-h-[170px] sm:min-h-[200px] md:min-h-[240px]",
        ].join(" ")}
      >
        {/* avatar (smaller) */}
        <div className="relative mx-auto h-16 w-16 sm:h-20 sm:w-20 md:h-22 md:w-22 rounded-full overflow-hidden border border-slate-200 shadow dark:border-slate-600 bg-slate-200 dark:bg-slate-700">
          <Image
            src={src}
            alt={displayName}
            fill
            className="object-cover object-center"
            sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, 160px"
            onError={() => setSrc("/placeholder.svg")}
            priority
            unoptimized
          />
        </div>

        {/* name + program + company/quote */}
        <div className="mt-2 flex flex-col items-center text-center">
          <h3
            className="mt-0.5 text-sm sm:text-base md:text-lg font-semibold text-slate-900 dark:text-white line-clamp-2"
            title={displayName}
          >
            {displayName}
          </h3>

          {!!programLine && (
            <p className="mt-0.5 text-[11px] sm:text-xs md:text-sm text-slate-500 dark:text-slate-300">
              {programLine}
            </p>
          )}

          {hasCompany ? (
            <p className="mt-1 text-xs sm:text-sm md:text-[15px] text-slate-700 dark:text-slate-200 leading-snug line-clamp-2 flex items-center justify-center gap-1.5">
              <Building2 className="h-4 w-4 opacity-70" aria-hidden="true" />
              <span>{person.company}</span>
            </p>
          ) : hasQuote ? (
            <p className="mt-1 text-xs sm:text-sm md:text-[15px] text-slate-600 dark:text-slate-300 italic leading-snug line-clamp-2">
              “{person.quote}”
            </p>
          ) : null}
        </div>
      </div>
    </Link>
  );
}

/* ---------- Page ---------- */
export default function Scholar() {
  const t = useTranslations("Scholar");

  const [activeCategory, setActiveCategory] = useState<CategoryLabel>(
    CATEGORY_LABELS.ALL
  );
  const [selectedProgramUuid, setSelectedProgramUuid] = useState<string | null>(
    null
  );
  const [selectedIsSC, setSelectedIsSC] = useState<boolean>(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
      easing: "ease-in-out",
    });
  }, []);

  // All scholars
  const {
    data: allScholars = [],
    isLoading: isLoadingAll,
    isFetching: isFetchingAll,
    isError,
    error,
  } = useGetAllScholarsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  // Programs for Section 4 header
  const { data: programs = [], refetch: refetchPrograms } =
    useGetAllProgramsQuery(undefined, {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    });

  // Prefetch for program scholars
  const [triggerPrefetchScholars] = useLazyGetScholarsByProgramUuidQuery();

  // Program-filtered scholars
  const {
    data: programScholars = [],
    isFetching: isFetchingByProgram,
    isLoading: isLoadingByProgram,
    error: programError,
  } = useGetScholarsByProgramUuidQuery(selectedProgramUuid as string, {
    skip: !selectedProgramUuid,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  // Current dataset
  const _apiScholars: ApiScholar[] = useMemo(() => {
    const apiScholars: ApiScholar[] = selectedProgramUuid
      ? (programScholars as ApiScholar[]) ?? []
      : (allScholars as ApiScholar[]) ?? [];

    return Array.isArray(apiScholars)
      ? apiScholars
      : apiScholars
      ? [apiScholars as ApiScholar]
      : [];
  }, [selectedProgramUuid, programScholars, allScholars]);

  useEffect(() => {
    console.log(
      "selectedProgramUuid:",
      selectedProgramUuid,
      "programScholars len:",
      Array.isArray(programScholars) ? programScholars.length : "n/a",
      "programError:",
      programError
    );
  }, [selectedProgramUuid, programScholars, programError]);

  const isLoading = selectedProgramUuid ? isLoadingByProgram : isLoadingAll;
  const isFetching = selectedProgramUuid ? isFetchingByProgram : isFetchingAll;

  /* =========================================================
     Specialists ONLY (Marquee)
     ========================================================= */
  const { specialistsMarquee } = useMemo(() => {
    const dedupMarquee = new Map<string, ApiScholar>();

    (_apiScholars as ApiScholar[]).forEach((s) => {
      if (
        s?.uuid && s.isAbroad &&
        Array.isArray(s.specialist) &&
        s.specialist.length > 0 &&
        s.specialist[0]?.specialist
      ) {
        if (!dedupMarquee.has(s.uuid)) dedupMarquee.set(s.uuid, s);
      }
    });

    const listMarquee = Array.from(dedupMarquee.values());

    const marq: ScholarCard[] = listMarquee.map((s, idx) => {
      const spec = s.specialist![0];
      const base = normalizeAvatar(s.avatar) || "/placeholder.svg";
      const img = versioned(base, s.audit?.updatedAt);
      return {
        id: idx + 1,
        uuid: s.uuid,
        username: s.username?.trim(),
        name: s.englishName || s.khmerName || s.username || t("labels.unnamed"),
        title: spec.specialist || t("labels.scholar"),
        image: img,
        spec,
      };
    });

    return { specialistsMarquee: marq };
  }, [_apiScholars, t]);

  /* =========================================================
     Spotlight (Section 3): ONLY scholars who have careers
     ========================================================= */
  const spotlight: SpotlightItem[] = useMemo(() => {
    const list = (_apiScholars as ApiScholar[]).filter(
      (s) => Array.isArray(s.careers) && s.isEmployed && s.careers.length > 0
    );

    return list.map((s, idx) => {
      const firstCareer = s.careers![0];

      const base = normalizeAvatar(s.avatar) || "/placeholder.svg";
      const image = versioned(base, s.audit?.updatedAt);

      const english = s.englishName || s.username || t("labels.unnamed");
      const khmer = s.khmerName?.trim();
      const displayName = khmer ? `${english} (${khmer})` : english;

      // Extract program name + generation from completedCourses
      const firstCourse =
        Array.isArray(s.completedCourses) && s.completedCourses.length > 0
          ? s.completedCourses[0]
          : null;
      const programName = firstCourse?.programName || firstCourse?.title || "";
      const generation = firstCourse?.generation ?? null;

      const href = s.username?.trim()
        ? `/${s.username.trim()}`
        : `/scholars/${s.uuid}`;

      return {
        id: idx + 1,
        uuid: s.uuid,
        href,
        image,
        displayName,
        programName,
        generation,
        position: firstCareer?.position || "",
        company: firstCareer?.company || "",
        interest: firstCareer?.interest || "",
      } as SpotlightItem;
    });
  }, [_apiScholars, t]);

  /* =========================================================
     SECTION 4 data: compute category & company
     ========================================================= */
  const section4: ScholarWithQuote[] = useMemo(() => {
    const scholars = (_apiScholars as ApiScholar[]) ?? [];

    const withDerivedCategory: ScholarWithQuote[] = scholars.map((s, idx) => {
      const base = normalizeAvatar(s.avatar) || "/placeholder.svg";
      const image = versioned(base, s.audit?.updatedAt);

      const embedded = s?.completedCourses as
        | Array<{ programName?: string; name?: string; title?: string }>
        | undefined;

      const programNames = Array.isArray(embedded)
        ? embedded
            .map((c) => c?.programName || c?.name || c?.title || "")
            .filter(Boolean)
        : [];

      const derivedCategory =
        programNames.length > 0
          ? deriveCategoryFromCompleted(programNames)
          : normalizeProgramName(s.category) ||
            normalizeProgramName(s.role || s.university) ||
            CATEGORY_LABELS.SC;

      // pick first course title to show when filtering by a program
      const firstCourseTitle =
        Array.isArray(embedded) && embedded.length > 0
          ? embedded[0]?.programName ||
            embedded[0]?.title ||
            embedded[0]?.name ||
            ""
          : "";

      const spec =
        Array.isArray(s.specialist) && s.specialist.length > 0
          ? s.specialist[0]
          : ({} as ApiSpecialist);

      const firstCompany =
        Array.isArray(s.careers) && s.careers.length > 0
          ? s.careers[0]?.company?.trim() || ""
          : "";

      return {
        id: idx + 1,
        uuid: s.uuid,
        username: s.username?.trim(),
        name: s.englishName || s.khmerName || s.username || t("labels.unnamed"),
        title:
          [s.university, s.role].filter(Boolean).join(" • ") ||
          t("labels.scholar"),
        image,
        quote: s.quote || "",
        category: derivedCategory,
        spec,
        company: firstCompany || undefined,
        programName: firstCourseTitle || undefined, // <-- NEW
      };
    });

    return withDerivedCategory;
  }, [_apiScholars, t]);

  const filtered: ScholarWithQuote[] = useMemo(() => {
    if (activeCategory === CATEGORY_LABELS.ALL) return section4;
    if (selectedProgramUuid) return section4;
    if (selectedIsSC)
      return section4.filter((s) => s.category === CATEGORY_LABELS.SC);
    return section4;
  }, [activeCategory, selectedProgramUuid, selectedIsSC, section4]);

  /* =========================================================
     SECTION 4 — header construction
     ========================================================= */
  type ApiProgram = { uuid: string; title: string; slug?: string };

  type HeaderItem =
    | {
        kind: "all" | "recognized";
        display: string;
        label: CategoryLabel;
        Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
        programUuid?: string | null;
      }
    | {
        kind: "sc-parent";
        display: string;
        label: CategoryLabel;
        Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
        children: { title: string; uuid: string }[];
      };

  const headerItems: HeaderItem[] = useMemo(() => {
    type RecognizedLabel = Exclude<CategoryLabel, "All" | "Short Course">;
    type RecognizedHeaderItem = {
      kind: "recognized";
      display: string;
      label: RecognizedLabel;
      Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
      programUuid: string;
    };

    const RECOGNIZED = new Set<RecognizedLabel>([
      CATEGORY_LABELS.PREU,
      CATEGORY_LABELS.FDN,
      CATEGORY_LABELS.FSW,
      CATEGORY_LABELS.ITP,
      CATEGORY_LABELS.ITE,
    ]);

    const seenTitles = new Set<string>();
    const recognizedBucket: Partial<
      Record<RecognizedLabel, RecognizedHeaderItem>
    > = {};
    const scChildrenMap = new Map<string, { title: string; uuid: string }>();

    (programs as ApiProgram[]).forEach((p) => {
      const rawTitle = (p.title || "").trim();
      if (!rawTitle) return;

      const key = rawTitle.toLowerCase();
      if (seenTitles.has(key)) return;
      seenTitles.add(key);

      const normalized = normalizeProgramName(rawTitle);
      if (
        normalized &&
        normalized !== CATEGORY_LABELS.SC &&
        RECOGNIZED.has(normalized as RecognizedLabel)
      ) {
        const label = normalized as RecognizedLabel;
        recognizedBucket[label] = {
          kind: "recognized",
          display: rawTitle,
          label,
          Icon:
            label === CATEGORY_LABELS.PREU
              ? GraduationCap
              : label === CATEGORY_LABELS.FDN
              ? Layers
              : label === CATEGORY_LABELS.FSW
              ? Code
              : label === CATEGORY_LABELS.ITP
              ? BookOpen
              : Award, // ITE
          programUuid: p.uuid,
        };
      } else {
        scChildrenMap.set(key, { title: rawTitle, uuid: p.uuid });
      }
    });

    const orderedRecognized: RecognizedHeaderItem[] = (
      [
        CATEGORY_LABELS.PREU,
        CATEGORY_LABELS.FDN,
        CATEGORY_LABELS.FSW,
        CATEGORY_LABELS.ITP,
        CATEGORY_LABELS.ITE,
      ] as RecognizedLabel[]
    )
      .map((lab) => recognizedBucket[lab])
      .filter((x): x is RecognizedHeaderItem => x != null);

    const scParent: HeaderItem = {
      kind: "sc-parent",
      display: CATEGORY_LABELS.SC,
      label: CATEGORY_LABELS.SC,
      Icon: Code,
      children: Array.from(scChildrenMap.values()),
    };

    return [
      {
        kind: "all",
        display: CATEGORY_LABELS.ALL,
        label: CATEGORY_LABELS.ALL,
        Icon: Globe,
        programUuid: null,
      },
      ...orderedRecognized,
      scParent,
    ];
  }, [programs]);

  // Selection handlers
  const onSelectAll = () => {
    setActiveCategory(CATEGORY_LABELS.ALL);
    setSelectedIsSC(false);
    setSelectedProgramUuid(null);
  };
  const onSelectRecognized = (
    uuid: string,
    label: Exclude<CategoryLabel, "All" | "Short Course">
  ) => {
    setActiveCategory(label);
    setSelectedIsSC(false);
    setSelectedProgramUuid(uuid);
  };
  const onSelectShortCourseParent = () => {
    setActiveCategory(CATEGORY_LABELS.SC);
    setSelectedIsSC(true);
    setSelectedProgramUuid(null);
  };
  const onSelectShortCourseChild = (uuid: string) => {
    setActiveCategory(CATEGORY_LABELS.SC);
    setSelectedIsSC(false);
    setSelectedProgramUuid(uuid);
  };

  return (
    <>
      {/* =================================== */}
      {/* SECTION 1: Hero + Marquee */}
      {/* =================================== */}
      <section className="relative isolate overflow-hidden dark:bg-slate-900 h-[calc(100vh-4rem)] sm:h-screen">
        <div
          className={`absolute inset-0 -z-10 ${styles.gradientBackground}`}
        />

        <div className="w-screen h-full flex flex-col justify-center px-0">
          <div className="text-center" data-aos="fade-down">
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary dark:text-white"
              data-aos="fade-up"
              data-aos-delay={200}
            >
              {t("hero.title1")}
            </h1>
            <p className="mt-2 text-xl sm:text-2xl md:text-4xl font-bold bg-clip-text text-primary">
              {t("hero.title2")}
            </p>
            <p className="mt-2 text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300">
              {t("hero.subtitle")}
            </p>
          </div>

          <div className="mt-6">
            {isLoading || isFetching ? (
              <div className="flex gap-3 overflow-hidden px-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-40 sm:w-56 md:w-64 h-64 rounded-3xl bg-slate-200 dark:bg-slate-800 animate-pulse"
                  />
                ))}
              </div>
            ) : specialistsMarquee.length > 0 ? (
              <div>
                <Marquee pauseOnHover className="[--duration:20s]">
                  {specialistsMarquee.map((p) => (
                    <div
                      key={`ping-${p.id}`}
                      className="w-40 sm:w-56 md:w-64 shrink-0"
                    >
                      <Card1 person={p} />{" "}
                      {/* Card1 already renders a Link internally */}
                    </div>
                  ))}
                </Marquee>
              </div>
            ) : isError ? (
              <p className="text-center text-sm text-rose-600 py-6">
                {(error as ApiError)?.data?.message ??
                  (error as ApiError)?.error ??
                  t("load.error")}
              </p>
            ) : (
              <div className="text-center text-sm text-slate-500 py-6">
                {t("marquee.empty")}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =================================== */}
      {/* SECTION 2: Success Blueprint (localized)*/}
      {/* =================================== */}
      <section className="relative isolate overflow-hidden bg-white dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* LEFT: Title + Steps */}
            <div>
              <h2
                className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white"
                data-aos="fade-right"
              >
                {t("section2.title")}
              </h2>

              <div className="mt-12 flex flex-col gap-10">
                {/* STEP 1 */}
                <div
                  className="flex items-center gap-6 relative"
                  data-aos="fade-right"
                  data-aos-delay={100}
                >
                  <span className="text-6xl md:text-7xl font-extrabold text-slate-300/60">
                    01
                  </span>
                  <div className="bg-background dark:bg-slate-800 rounded-2xl shadow-lg px-6 py-5 ring-1 ring-black/5 flex items-start gap-4">
                    <div className="shrink-0 rounded-xl bg-blue-50 text-blue-600 p-2 ring-1 ring-blue-100 w-fit">
                      <Layers className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
                        {t("section2.step1.title")}
                      </h3>
                      <p className="text-sm md:text-base text-slate-600 dark:text-slate-400">
                        {t("section2.step1.desc")}
                      </p>
                    </div>
                  </div>
                </div>

                {/* STEP 2 */}
                <div className="flex items-center gap-6 relative">
                  <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg px-6 py-5 ring-1 ring-black/5 flex items-start gap-4">
                    <div className="shrink-0 rounded-xl bg-amber-50 text-amber-600 p-2 ring-1 ring-amber-100 w-fit">
                      <Code className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
                        {t("section2.step2.title")}
                      </h3>
                      <p className="text-sm md:text-base text-slate-600 dark:text-slate-400">
                        {t("section2.step2.desc")}
                      </p>
                    </div>
                  </div>
                  <span className="text-6xl md:text-7xl font-extrabold text-slate-300/60">
                    02
                  </span>
                </div>

                {/* STEP 3 */}
                <div className="flex items-center gap-6 relative">
                  <span className="text-6xl md:text-7xl font-extrabold text-slate-300/60">
                    03
                  </span>
                  <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg px-6 py-5 ring-1 ring-black/5 flex items-start gap-4">
                    <div className="shrink-0 rounded-xl bg-rose-50 text-rose-600 p-2 ring-1 ring-rose-100 w-fit">
                      <Award className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
                        {t("section2.step3.title")}
                      </h3>
                      <p className="text-sm md:text-base text-slate-600 dark:text-slate-400">
                        {t("section2.step3.desc")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: Two images */}
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
                src="/image/pheaktra.jpg"
                alt="Student Writing"
                width={500}
                height={400}
                className="rounded-2xl object-cover shadow-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =================================== */}
      {/* SECTION 3: Spotlight Carousel (localized strings) */}
      {/* =================================== */}
      <section className="relative isolate overflow-hidden bg-white dark:bg-slate-900 -mb-[100px] md:-mb-[150px] ">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-[-10px] md:pb-[150px] relative">
          {isError ? (
            <p className="text-center text-sm text-rose-600">
              {(() => {
                const e = error as ApiError;
                return e?.data?.message ?? e?.error ?? t("load.error");
              })()}
            </p>
          ) : isLoading || isFetching ? (
            <div className="grid grid-cols-1 gap-6">
              <div className="h-80 rounded-2xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
            </div>
          ) : spotlight.length === 0 ? (
            <div className="text-center text-slate-500 dark:text-slate-400">
              {t("spotlight.empty")}
            </div>
          ) : (
            <Carousel
              className="relative"
              opts={{ align: "start", loop: true }}
            >
              <CarouselContent>
                {spotlight.map((person) => (
                  <CarouselItem key={`spotlight-card-${person.id}`}>
                    <div className="relative rounded-2xl border border-slate-200 dark:border-slate-700 p-6 md:p-10 overflow-hidden">
                      <BorderBeam
                        size={200}
                        duration={5}
                        colorFrom="#ff4d4d"
                        colorTo="#4d9cff"
                        borderWidth={1}
                      />
                      <div className="flex flex-col gap-6 md:grid md:grid-cols-5 md:items-center relative z-10">
                        {/* LEFT: image */}
                        <div className="md:col-span-2">
                          <div className="rounded-2xl p-[2px] bg-gradient-to-tr from-rose-500 via-fuchsia-500 to-indigo-500 shadow-lg">
                            <div className="relative rounded-2xl overflow-hidden bg-white dark:bg-slate-800 ring-1 ring-slate-200 dark:ring-slate-700">
                              <div className="relative aspect-[16/11] w-full">
                                <Image
                                  src={person.image}
                                  alt={person.displayName}
                                  fill
                                  className="object-cover object-[50%_35%] w-full h-full"
                                  priority={person.id === 1}
                                  unoptimized
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* RIGHT: text */}
                        <div className="md:col-span-3 mt-4 md:mt-0">
                          <span className="inline-flex items-center rounded-full bg-blue-50 dark:bg-slate-800/60 px-3 py-1 text-xs font-semibold text-blue-700 dark:text-blue-300 ring-1 ring-blue-200/60 dark:ring-slate-700">
                            {t("section3.badge")}
                          </span>

                          {/* English (Khmer) */}
                          <h3 className="mt-2 sm:mt-4 text-2xl sm:3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                            {person.displayName}
                          </h3>

                          {/* Program name + Generation */}
                          {(person.programName || person.generation) && (
                            <p className="mt-1 text-sm sm:text-base text-slate-600 dark:text-slate-300">
                              {person.programName && (
                                <span>{person.programName}</span>
                              )}
                              {person.programName && person.generation
                                ? " – "
                                : ""}
                              {person.generation && (
                                <span>
                                  {t("labels.generation")} {person.generation}
                                </span>
                              )}
                            </p>
                          )}

                          {/* Position (Company) */}
                          {(person.position || person.company) && (
                            <p className="mt-1 sm:mt-2 text-base sm:text-lg font-semibold text-accent dark:text-accent-dark">
                              {person.position ? person.position : ""}
                              {person.position && person.company ? " (" : ""}
                              {person.company ? person.company : ""}
                              {person.position && person.company ? ")" : ""}
                            </p>
                          )}

                          {/* Interest */}
                          {!!person.interest && (
                            <p className="mt-2 sm:mt-4 text-slate-600 dark:text-slate-300 leading-relaxed">
                              {person.interest}
                            </p>
                          )}

                          <div className="mt-4 sm:mt-6 flex flex-wrap gap-3">
                            <Link
                              href={person.href}
                              className="inline-flex items-center rounded-xl px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-rose-600 to-indigo-600 shadow hover:opacity-90"
                            >
                              {t("spotlight.viewStory")}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious
                aria-label={t("a11y.prev")}
                className="hidden md:flex absolute left-[-4rem] top-1/2 -translate-y-1/2 z-10 dark:bg-slate-800 p-2 rounded-full shadow bg-accent"
              />
              <CarouselNext
                aria-label={t("a11y.next")}
                className="hidden md:flex absolute right-[-4rem] top-1/2 -translate-y-1/2 z-10 dark:bg-slate-800 p-2 rounded-full shadow bg-accent"
              />

              <div className="absolute -top-10 right-15 flex gap-0.5 z-20 md:hidden">
                <CarouselPrevious
                  aria-label={t("a11y.prev")}
                  className="dark:bg-slate-800 p-2 rounded-full shadow bg-accent dark:hover:bg-slate-700"
                />
                <CarouselNext
                  aria-label={t("a11y.next")}
                  className="dark:bg-slate-800 p-2 rounded-full shadow bg-accent dark:hover:bg-slate-700"
                />
              </div>
            </Carousel>
          )}
        </div>
      </section>

      {/* =================================== */}
      {/* SECTION 4: Category Filter (Short Course dropdown) */}
      {/* =================================== */}
      <section className="relative isolate overflow-hidden  bg-white dark:bg-slate-900 dark:border-slate-700 ">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 md:py-20 py-5">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
              {t("section4.title")}
            </h2>
            {/* Keep subtitle & rest of Section 4 in your original language (unchanged) */}
            <p className="mt-2 text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              {t("section4.subtitle")}
            </p>
          </div>

          {/* Header with Short Course dropdown */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {headerItems.map((item) => {
              if (item.kind === "all") {
                const active = activeCategory === CATEGORY_LABELS.ALL;
                const Icon = item.Icon;
                return (
                  <button
                    key="ALL"
                    onClick={onSelectAll}
                    className={`relative flex items-center gap-2 px-2 py-1 text-sm sm:text-base font-medium transition-colors ${
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
                    />
                    <span>{CATEGORY_LABELS.ALL}</span>
                    {active && (
                      <span className="absolute -bottom-1 left-0 right-0 mx-auto h-[2px] w-full rounded-full bg-blue-500" />
                    )}
                  </button>
                );
              }

              if (item.kind === "recognized") {
                const active =
                  activeCategory === item.label && !!selectedProgramUuid;
                const Icon = item.Icon;
                return (
                  <button
                    key={item.label}
                    onClick={() =>
                      onSelectRecognized(
                        item.programUuid!,
                        item.label as Exclude<
                          CategoryLabel,
                          "All" | "Short Course"
                        >
                      )
                    }
                    className={`relative flex items-center gap-2 px-2 py-1 text-sm sm:text-base font-medium transition-colors ${
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
                    />
                    <span>{item.display}</span>
                    {active && (
                      <span className="absolute -bottom-1 left-0 right-0 mx-auto h-[2px] w-full rounded-full bg-blue-500" />
                    )}
                  </button>
                );
              }

              if (item.kind === "sc-parent") {
                const active =
                  activeCategory === CATEGORY_LABELS.SC &&
                  (selectedIsSC || !!selectedProgramUuid);
                const Icon = item.Icon;

                return (
                  <div key="SC" className="relative group">
                    <button
                      onClick={() => {
                        refetchPrograms();
                        onSelectShortCourseParent();
                      }}
                      onMouseEnter={() => {
                        refetchPrograms();
                      }}
                      className={`relative flex items-center gap-2 px-2 py-1 text-sm sm:text-base font-medium transition-colors ${
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
                      />
                      <span>{item.display}</span>
                      <ChevronDown className="h-4 w-4 opacity-70" />
                      {active && (
                        <span className="absolute -bottom-1 left-0 right-0 mx-auto h-[2px] w-full rounded-full bg-blue-500" />
                      )}
                    </button>

                    <div
                      className="absolute left-0 mt-2 w-64 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-xl opacity-0 pointer-events-none translate-y-1 group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0 transition duration-150 z-20"
                      role="menu"
                    >
                      <div className="max-h-[60vh] overflow-y-auto py-1">
                        {item.children.length === 0 ? (
                          <div className="px-3 py-2 text-sm text-slate-500 dark:text-slate-400">
                            No short courses
                          </div>
                        ) : (
                          item.children.map((child) => (
                            <button
                              key={child.uuid}
                              onClick={() =>
                                onSelectShortCourseChild(child.uuid)
                              }
                              onMouseEnter={() => {
                                triggerPrefetchScholars(child.uuid, true);
                              }}
                              onFocus={() => {
                                triggerPrefetchScholars(child.uuid, true);
                              }}
                              className="w-full text-left px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700/60 text-slate-700 dark:text-slate-200"
                              role="menuitem"
                            >
                              {child.title}
                            </button>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                );
              }

              return null;
            })}
          </div>

          {/* Grid */}
          {isError ? (
            <p className="mt-10 text-center text-sm md:text-base text-rose-600">
              {(() => {
                const e = error as ApiError;
                return e?.data?.message ?? e?.error ?? t("load.error");
              })()}
            </p>
          ) : isLoading || isFetching ? (
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-xl p-[2px] bg-slate-200 dark:bg-slate-700 animate-pulse"
                >
                  <div className="rounded-xl bg-white dark:bg-slate-800 p-8 text-center">
                    <div className="mx-auto h-40 w-40 rounded-full bg-slate-200 dark:bg-slate-700" />
                    <div className="mt-6 h-6 bg-slate-200 dark:bg-slate-700 rounded" />
                    <div className="mt-3 h-4 bg-slate-200 dark:bg-slate-700 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {filtered.map((person) => (
                <Card2
                  key={`s2-${person.uuid ?? person.id}-${
                    person.spec?.uuid ?? "spec"
                  }`}
                  person={person}
                  activeCategory={activeCategory}
                  selectedProgramUuid={selectedProgramUuid}
                />
              ))}
              {filtered.length === 0 && (
                <div className="col-span-full text-center text-slate-500 dark:text-slate-400">
                  No scholars in this category yet.
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
