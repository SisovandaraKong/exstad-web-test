"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa6";
import { CgMail } from "react-icons/cg";
import { FiArrowUpRight } from "react-icons/fi";

import CompletedCourseCard from "@/components/ui/completed-course-card";

import type { SocialLink } from "@/types/portfolio";
import type { ScholarAchievement } from "@/types/achievement";

import {
  useGetScholarByUsernameQuery,
  useGetScholarSocialLinksQuery,
  useGetScholarCertificatesQuery,
  useGetScholarAchievementsQuery,
  useGetOpeningProgramByUuidQuery,
  useUpdateScholarMutation,
  useAddScholarSocialLinkMutation,
} from "@/components/student/StudentApi";
import { skipToken } from "@reduxjs/toolkit/query";
import { RainbowButton } from "../magicui/rainbow-button";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { BorderBeam } from "../magicui/border-beam";

type Props = {
  username: string;
  avatarAnchorRef?: React.RefObject<HTMLDivElement>;
};

type CertificateFromApi = {
  uuid: string;
  fileName?: string;
  scholarUuid?: string;
  openingProgramUuid?: string;
  tempCertificateUrl?: string;
  certificateUrl?: string;
  isVerified?: boolean;
  audit?: {
    createdBy?: string;
    updatedBy?: string;
    createdAt?: string;
    updatedAt?: string;
  };
};

type CompletedCourseFromScholar = {
  uuid: string;
  programName?: string;
  generation?: number;
  posterUrl?: string;
  thumbnail?: string;
};

const iconFor = (title: string) => {
  const key = title.toLowerCase();
  if (key.includes("facebook")) return <FaFacebook className="text-blue-600" />;
  if (key.includes("github"))
    return <FaGithub className="text-gray-900 dark:text-white" />;
  if (key.includes("telegram")) return <FaTelegram className="text-sky-500" />;
  if (key.includes("mail") || key.includes("email"))
    return <CgMail className="text-red-500" />;
  return <FiArrowUpRight />;
};

const AVATAR_PX = 192;

// Small helper that fetches Opening Program name by UUID
function ProgramTitle({
  openingProgramUuid,
  fallback,
}: {
  openingProgramUuid?: string;
  fallback: string;
}) {
  const { data, isLoading, isError } = useGetOpeningProgramByUuidQuery(
    openingProgramUuid ?? skipToken
  );

  if (!openingProgramUuid) return <>{fallback}</>;
  if (isLoading) return <>Loading…</>;
  if (isError || !data) return <>{fallback}</>;

  const label =
    data.programName && data.generation
      ? `${data.programName} • Gen ${data.generation}`
      : data.programName || data.name || fallback;

  return <>{label}</>;
}

export default function ProfilePortfolio({ username, avatarAnchorRef }: Props) {
  const t = useTranslations("Profile");

  const {
    data: scholar,
    isLoading,
    isError,
    refetch,
  } = useGetScholarByUsernameQuery(username, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const { data: socialLinks = [] } = useGetScholarSocialLinksQuery(
    scholar?.uuid ?? skipToken,
    { refetchOnMountOrArgChange: true, refetchOnFocus: true }
  );

  const pathname = usePathname();
  const { data: session } = useSession();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bio, setBio] = useState<string>("");
  const [quote, setQuote] = useState<string>("");
  const [nickname, setNickname] = useState("");
  const [facebook, setFacebook] = useState("");
  const [github, setGithub] = useState("");
  const [telegram, setTelegram] = useState("");
  const [website, setWebsite] = useState("");

  // Prefill Bio & Quote when modal opens
  useEffect(() => {
    if (isModalOpen && scholar) {
      setBio(scholar.bio ?? "");
      setQuote(scholar.quote ?? "");
      setNickname(scholar.nickname ?? "");
      setFacebook(socialLinks.find((d) => d.type === "facebook")?.link ?? "");
      setGithub(socialLinks.find((d) => d.type === "github")?.link ?? "");
      setTelegram(socialLinks.find((d) => d.type === "telegram")?.link ?? "");
      setWebsite(socialLinks.find((d) => d.type === "website")?.link ?? "");
    }
  }, [isModalOpen, scholar, socialLinks]);

  const [updateScholar, { isLoading: isSaving }] = useUpdateScholarMutation();
  const [addScholarSocialLink, { isLoading: isSavingSocialLinks }] =
    useAddScholarSocialLinkMutation();

  async function handleSave() {
    if (!scholar?.uuid) return;

    const nextBio = bio.trim();
    const nextQuote = quote.trim();
    const nextNickname = nickname.trim();

    // Prepare scholar update body
    const scholarBody: Record<string, unknown> = {};
    if (nextBio !== (scholar.bio ?? "")) scholarBody.bio = nextBio;
    if (nextQuote !== (scholar.quote ?? "")) scholarBody.quote = nextQuote;
    if (nextNickname !== (scholar.nickname ?? ""))
      scholarBody.nickname = nextNickname;

    // Prepare social links data
    const socialLinksToUpdate = [
      { type: "facebook", title: "Facebook", link: facebook.trim() },
      { type: "github", title: "GitHub", link: github.trim() },
      { type: "telegram", title: "Telegram", link: telegram.trim() },
      { type: "website", title: "Website", link: website.trim() },
    ];

    // Check if any social links have changed
    const hasScholarChanges = Object.keys(scholarBody).length > 0;
    const hasSocialChanges = socialLinksToUpdate.some((newLink) => {
      const existingLink = socialLinks.find((s) => s.type === newLink.type);
      return newLink.link !== (existingLink?.link ?? "");
    });

    if (!hasScholarChanges && !hasSocialChanges) {
      // Nothing changed, close modal
      setIsModalOpen(false);
      return;
    }

    try {
      // Update scholar profile if there are changes
      if (hasScholarChanges) {
        await updateScholar({ uuid: scholar.uuid, body: scholarBody }).unwrap();
      }

      // Update social links if there are changes
      if (hasSocialChanges) {
        const socialLinkPromises = socialLinksToUpdate
          .filter((link) => {
            const existingLink = socialLinks.find((s) => s.type === link.type);
            // Only update if the link has changed and is not empty
            return link.link && link.link !== (existingLink?.link ?? "");
          })
          .map((link) =>
            addScholarSocialLink({
              uuid: scholar.uuid,
              body: {
                title: link.title,
                type: link.type,
                link: link.link,
              },
            }).unwrap()
          );

        await Promise.all(socialLinkPromises);
      }

      // Refetch to get the latest data
      await refetch();

      setIsModalOpen(false);

      // Clear local fields for next open
      setNickname("");
      setBio("");
      setQuote("");
      setFacebook("");
      setGithub("");
      setTelegram("");
      setWebsite("");
    } catch (e: unknown) {
      const error = e as { status?: string | number; data?: unknown };
      const status = error?.status ?? "UNKNOWN";
      const data = error?.data ?? null;
      console.error("Failed to update profile:", { status, data, err: e });
      alert(`Update failed (${String(status)}). Check console for details.`);
    }
  }

  const {
    data: achievements = [],
    isLoading: achievementsLoading,
    isError: achievementsError,
    error: achievementsErrorDetails,
  } = useGetScholarAchievementsQuery(scholar?.uuid ?? skipToken, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });

  const {
    data: certificates = [],
    isLoading: certsLoading,
    isError: certsError,
    error: certsErrorDetails,
  } = useGetScholarCertificatesQuery(scholar?.uuid ?? skipToken, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });

  const [expandedDescriptions, setExpandedDescriptions] = React.useState<
    Record<string, boolean>
  >({});

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500 animate-pulse">
        {t("loading.profile")}
      </div>
    );
  }

  if (isError || !scholar) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        {t("error.loadProfile", { username })}
      </div>
    );
  }

  const isOwnProfile =
    pathname === "/me" && session?.user.username === username;

  return (
    <div className="px-4 sm:px-6 lg:px-12 py-6 md:py-8 grid grid-cols-1 md:grid-cols-12 gap-6">
      {/* LEFT: Profile card */}
      <div className="md:col-span-6 lg:col-span-4">
        <div className="sticky top-6 md:top-25 self-start">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6 w-full box-border">
            {/* Avatar + Names */}
            <div className="flex flex-col items-center">
              <div className="relative mb-3 rounded-full overflow-hidden w-48 h-48">
                {/* Shared avatar target */}
                <div
                  ref={avatarAnchorRef}
                  className="absolute inset-0 rounded-full overflow-hidden"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={scholar.avatar || "/avatar-fallback.jpg"}
                  alt={t("a11y.avatarAlt", {
                    name: scholar.englishName || scholar.username,
                  })}
                  className="portfolio-avatar-fallback absolute inset-0 w-full h-full object-cover"
                  width={AVATAR_PX}
                  height={AVATAR_PX}
                />
              </div>

              {/* Names */}
              {Boolean(scholar.englishName || scholar.khmerName) && (
                <div className="text-center mt-[-30px] sm:mt-0">
                  <div className="font-semibold text-base sm:text-lg lg:text-2xl dark:text-white whitespace-nowrap">
                    {scholar.englishName}
                    {scholar.khmerName && (
                      <span className="text-black dark:text-gray-300 text-sm sm:text-base lg:text-xl ml-1">
                        ({scholar.khmerName})
                      </span>
                    )}
                  </div>
                </div>
              )}

              {isOwnProfile && (
                <RainbowButton
                  variant="default"
                  size="lg"
                  onClick={() => setIsModalOpen(true)}
                  className="px-5 py-2 mb-4 transition"
                >
                  Edit Profile
                </RainbowButton>
              )}
            </div>

            {/* About */}
            <div className="pt-4">
              <h3 className="font-d2 font-semibold mb-2 dark:text-white text-md">
                {t("about.title")}
              </h3>
              <p className="font-d3 text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                {scholar.bio || t("about.empty")}
              </p>
            </div>

            {/* Social */}
            <div className="pt-4">
              <h3 className="font-d2 font-semibold mb-2 dark:text-white text-md">
                {t("social.title")}
              </h3>
              <div className="space-y-2 text-sm sm:text-base dark:text-white">
                {scholar.email && (
                  <div className="flex items-center gap-2 break-words">
                    <CgMail className="text-red-500" /> {scholar.email}
                  </div>
                )}
                {socialLinks
                  .filter((s: SocialLink) => s.isActive)
                  .map((s: SocialLink) => {
                    const href = /^https?:\/\//i.test(s.link)
                      ? s.link
                      : `https://${s.link}`;
                    return (
                      <div
                        key={s.uuid}
                        className="flex items-center gap-2 break-words"
                      >
                        {iconFor(s.title)}
                        <Link
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {s.title}
                        </Link>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: Content */}
      <div className="md:col-span-6 lg:col-span-8 flex flex-col gap-10 md:ml-5">
        {/* Certificates */}
        <section>
          <h3 className="font-h4 font-semibold mb-4">
            {t("certificates.title")}
          </h3>

          {/* Loading */}
          {certsLoading && (
            <div className="flex gap-4 overflow-x-auto hide-scroll-bar pb-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="w-72 sm:w-80 md:w-96 h-32 rounded-2xl bg-gray-200 dark:bg-gray-800 animate-pulse flex-shrink-0"
                />
              ))}
            </div>
          )}

          {/* Error */}
          {certsError && (
            <div className="text-sm text-red-500 p-4 bg-red-50 dark:bg-red-900/10 rounded-lg">
              <p className="font-semibold mb-1">
                {t("certificates.error.title")}
              </p>
              <p className="text-xs opacity-80 mb-2">
                {certsErrorDetails
                  ? `${t("certificates.error.detail")} ${JSON.stringify(
                      certsErrorDetails,
                      null,
                      2
                    )}`
                  : t("certificates.error.generic")}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="text-xs underline hover:no-underline"
              >
                {t("actions.tryRefresh")}
              </button>
            </div>
          )}

          {/* List */}
          {!certsLoading &&
            !certsError &&
            (() => {
              const list = certificates as unknown as CertificateFromApi[];
              const withFinalUrl = list.filter((c) => !!c.certificateUrl);
              const ts = (c: CertificateFromApi) =>
                c.audit?.createdAt ? Date.parse(c.audit.createdAt) : 0;

              const latestByProgram = new Map<string, CertificateFromApi>();
              for (const c of withFinalUrl) {
                const key = c.openingProgramUuid || "__no_program__";
                const prev = latestByProgram.get(key);
                if (!prev) {
                  latestByProgram.set(key, c);
                  continue;
                }
                const tNew = ts(c);
                const tOld = ts(prev);
                if (tNew > tOld) {
                  latestByProgram.set(key, c);
                } else if (tNew === tOld) {
                  const scoreNew = c.isVerified ? 1 : 0;
                  const scoreOld = prev.isVerified ? 1 : 0;
                  if (scoreNew > scoreOld) latestByProgram.set(key, c);
                }
              }

              const visible = Array.from(latestByProgram.values()).sort(
                (a, b) => ts(b) - ts(a)
              );

              if (visible.length === 0) {
                return (
                  <p className="text-sm text-muted-foreground">
                    {t("certificates.empty")}
                  </p>
                );
              }

              return (
                <div className="flex gap-4 sm:gap-6 overflow-x-auto hide-scroll-bar pb-4 snap-x snap-mandatory">
                  {visible.map((cert) => {
                    const url = cert.certificateUrl!;
                    const created =
                      cert.audit?.createdAt &&
                      new Date(cert.audit.createdAt).toLocaleDateString();

                    return (
                      <a
                        key={cert.uuid}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={cert.fileName || t("certificates.card.title")}
                        className="group relative flex-none w-72 sm:w-80 md:w-96 snap-start rounded-2xl overflow-hidden bg-white dark:bg-gray-900 ring-1 ring-black/5 dark:ring-white/10 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 p-4"
                      >
                        <div className="flex items-start gap-3">
                          <div className="shrink-0 w-10 h-10 rounded-xl grid place-items-center bg-primary/10 text-primary dark:bg-primary/15">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-5 h-5"
                              aria-hidden="true"
                            >
                              <path d="M14 2H6a2 2 0 0 0-2 2v16.5a1 1 0 0 0 1.53.85L9 19.14l3.47 2.21a1 1 0 0 0 1.53-.85V4a2 2 0 0 0-2-2Zm6 4h-4v2h3v12H14v2h5a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Z" />
                            </svg>
                          </div>

                          <div className="min-w-0 flex-1">
                            <h4 className="font-semibold text-gray-900 dark:text-white truncate">
                              <ProgramTitle
                                openingProgramUuid={cert.openingProgramUuid}
                                fallback={
                                  cert.fileName || t("certificates.card.title")
                                }
                              />
                            </h4>

                            <div className="mt-1 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                              {cert.isVerified ? (
                                <span className="inline-flex items-center gap-1">
                                  ✅ {t("certificates.verified")}
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1">
                                  🗂️ {t("certificates.unverified")}
                                </span>
                              )}
                              {created && (
                                <>
                                  <span>•</span>
                                  <time>{created}</time>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between text-xs text-primary">
                          <span className="opacity-80">
                            {t("certificates.open")}
                          </span>
                          <span className="transition-transform group-hover:translate-x-0.1">
                            ↗
                          </span>
                        </div>
                      </a>
                    );
                  })}
                </div>
              );
            })()}
        </section>

        {/* === SECTION: Achievements === */}
        <section>
          <h3 className="font-h4 font-semibold mb-4">
            {t("achievements.title")}
          </h3>

          {/* Loading */}
          {achievementsLoading && (
            <div className="flex gap-4 sm:gap-6 overflow-x-auto hide-scroll-bar pb-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="w-[300px] md:w-[340px] lg:w-[380px] flex-shrink-0 bg-white dark:bg-gray-900 rounded-xl shadow-md p-4 sm:p-6 animate-pulse"
                >
                  <div className="w-full h-36 bg-gray-200 dark:bg-gray-800 rounded-lg mb-4" />
                  <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-800 rounded mb-3" />
                  <div className="h-3 w-full bg-gray-200 dark:bg-gray-800 rounded mb-2" />
                  <div className="h-3 w-5/6 bg-gray-200 dark:bg-gray-800 rounded mb-5" />
                  <div className="flex justify-between">
                    <div className="h-3 w-20 bg-gray-200 dark:bg-gray-800 rounded" />
                    <div className="h-3 w-16 bg-gray-200 dark:bg-gray-800 rounded" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {achievementsError && (
            <div className="text-sm text-red-500 p-4 bg-red-50 dark:bg-red-900/10 rounded-lg">
              <p className="font-semibold mb-1">
                {t("achievements.error.title")}
              </p>
              <p className="text-xs opacity-80 mb-2">
                {achievementsErrorDetails
                  ? `${t("achievements.error.detail")} ${JSON.stringify(
                      achievementsErrorDetails,
                      null,
                      2
                    )}`
                  : t("achievements.error.generic")}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="text-xs underline hover:no-underline"
              >
                {t("actions.tryRefresh")}
              </button>
            </div>
          )}

          {/* List */}
          {!achievementsLoading && !achievementsError && (
            <div className="flex gap-4 sm:gap-6 overflow-x-auto hide-scroll-bar pb-4">
              {achievements.length === 0 ? (
                <div className="text-sm text-gray-500">
                  {t("achievements.empty")}
                </div>
              ) : (
                achievements.map((ach: ScholarAchievement) => {
                  const isExpanded = !!expandedDescriptions[ach.uuid];
                  const videoUrl =
                    ach.achievement.video || ach.achievement.link
                      ? /^(https?:)?\/\//i.test(
                          ach.achievement.video || ach.achievement.link
                        )
                        ? ach.achievement.video || ach.achievement.link
                        : `https://${
                            ach.achievement.video || ach.achievement.link
                          }`
                      : "";

                  return (
                    <div
                      key={ach.uuid}
                      className="w-[300px] md:w-[340px] lg:w-[380px] flex-shrink-0 bg-white dark:bg-gray-900 rounded-xl shadow-md p-4 sm:p-6 hover:shadow-lg transition flex flex-col"
                    >
                      {/* Image / Logo */}
                      <div className="w-full h-36 flex justify-center items-center mb-4">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={ach.achievement.icon}
                          alt={ach.achievement.title}
                          width={160}
                          height={160}
                          className="object-contain"
                        />
                      </div>

                      {/* Title */}
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-xl sm:text-base">
                        {ach.achievement.title}
                      </h4>

                      {/* Description */}
                      <div className="relative text-md text-gray-500 mb-2 leading-snug">
                        <p
                          className={
                            isExpanded
                              ? ""
                              : "line-clamp-1 sm:line-clamp-2 transition-all"
                          }
                        >
                          {ach.achievement.description}
                        </p>
                        {ach.achievement.description &&
                          ach.achievement.description.length > 100 && (
                            <button
                              onClick={() =>
                                setExpandedDescriptions((prev) => ({
                                  ...prev,
                                  [ach.uuid]: !prev[ach.uuid],
                                }))
                              }
                              className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 mt-1"
                            >
                              {isExpanded
                                ? t("actions.seeLess")
                                : t("actions.seeMore")}
                            </button>
                          )}
                      </div>

                      {/* Footer */}
                      <div className="mt-auto flex justify-between items-center text-xs text-accent-foreground gap-2">
                        {videoUrl && (
                          <a
                            href={videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-500 hover:text-primary-hover dark:text-primary dark:hover:text-primary-hover flex items-center gap-1"
                          >
                            🎥 {t("achievements.video")}
                          </a>
                        )}
                        <span>
                          {new Date(ach.audit.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mt-1 justify-between text-xs text-accent-foreground">
                        {ach.achievement.link && (
                          <a
                            href={
                              /^(https?:)?\/\//i.test(ach.achievement.link)
                                ? ach.achievement.link
                                : `https://${ach.achievement.link}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-500 hover:text-primary-hover dark:text-primary dark:hover:text-primary-hover flex items-center gap-1"
                          >
                            🔗 {t("achievements.projectLink")}
                          </a>
                        )}

                        <span>{ach.achievement.achievementType}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </section>

        {/* === SECTION: Completed Courses (from scholar.completedCourses) === */}
        <section>
          <h3 className="font-h4 font-semibold mb-4">{t("courses.title")}</h3>

          {!isLoading &&
            !isError &&
            (() => {
              const raw = (Array.isArray(scholar?.completedCourses)
                ? scholar.completedCourses
                : []) as unknown as CompletedCourseFromScholar[];

              if (raw.length === 0) {
                return (
                  <p className="text-sm text-muted-foreground">
                    {t("courses.empty")}
                  </p>
                );
              }

              return (
                <div className="flex gap-6 overflow-x-auto hide-scroll-bar pb-4 snap-x snap-mandatory">
                  {raw.map((c, idx: number) => (
                    <div
                      key={`${c.uuid}-${idx}`}
                      className="group relative flex-none w-[520px] h-[380px] snap-start overflow-hidden rounded-[32px] [&>div]:w-full [&>div]:h-full [&_img]:block [&_img]:absolute [&_img]:inset-0 [&_img]:w-full [&_img]:h-full [&_img]:object-cover"
                    >
                      <div className="pointer-events-none absolute inset-0 rounded-[40px] bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <CompletedCourseCard
                        variant={idx % 2 === 0 ? "dark" : "light"}
                        course={{
                          uuid: c.uuid,
                          programName: c.programName || "",
                          generation: c.generation,
                          posterUrl:
                            c.posterUrl ||
                            c.thumbnail ||
                            "/course-fallback.jpg",
                        }}
                      />
                    </div>
                  ))}
                </div>
              );
            })()}
        </section>
      </div>

      {/* styles */}
      <style jsx>{`
        .hide-scroll-bar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scroll-bar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <style jsx global>{`
        .portfolio-avatar-fallback {
          opacity: 1;
          transition: opacity 0.18s ease;
          pointer-events: none;
        }
        :root[data-shared-avatar-ready="true"] .portfolio-avatar-fallback {
          opacity: 0;
        }

        @keyframes fall-straight {
          0% {
            transform: translateY(-120px) rotate(90deg);
            opacity: 0;
          }
          60% {
            transform: translateY(10px) rotate(90deg);
            opacity: 1;
          }
          80% {
            transform: translateY(-5px) rotate(90deg);
          }
          100% {
            transform: translateY(0) rotate(90deg);
          }
        }
        .animate-fall-straight {
          animation: fall-straight 0.9s ease-out forwards;
          will-change: transform, opacity;
        }
      `}</style>

      {/* Edit Profile Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 max-w-5xl w-full max-h-[90vh] overflow-clip">
            <BorderBeam
              size={90}
              colorFrom="#ffaa40"
              colorTo="#9c40ff"
              borderWidth={1.8}
              duration={6}
            />

            <div className="mb-6">
              <h2 className="text-xl font-bold mb-2">Edit profile</h2>
              <p className="text-gray-500 dark:text-gray-400">
                You can edit your profile information and social media links.
              </p>
            </div>

            <div className="flex gap-8 relative z-10">
              {/* Left Side - Profile Information */}
              <div className="flex-1 space-y-4">
                <h3 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
                  Profile Information
                </h3>

                {/* Nickname */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Nickname
                  </label>
                  <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="Enter your nickname"
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-sm font-medium mb-1">Bio</label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={4}
                    placeholder="Write your bio here"
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  />
                </div>

                {/* Quote */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Quote
                  </label>
                  <input
                    type="text"
                    value={quote}
                    onChange={(e) => setQuote(e.target.value)}
                    placeholder="It is never too late to be what you might have been"
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              {/* Vertical Divider */}
              <div className="w-px bg-gray-200 dark:bg-gray-700"></div>

              {/* Right Side - Social Media */}
              <div className="flex-1 space-y-4">
                <h3 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
                  Social Media
                </h3>

                {/* Facebook */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Facebook
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-600">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={facebook}
                      onChange={(e) => setFacebook(e.target.value)}
                      placeholder="https://facebook.com/username"
                      className="w-full pl-10 pr-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>

                {/* GitHub */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    GitHub
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-800 dark:text-gray-200">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={github}
                      onChange={(e) => setGithub(e.target.value)}
                      placeholder="https://github.com/username"
                      className="w-full pl-10 pr-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>

                {/* Telegram */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Telegram
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={telegram}
                      onChange={(e) => setTelegram(e.target.value)}
                      placeholder="https://t.me/username"
                      className="w-full pl-10 pr-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>

                {/* Website */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Website
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-400">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="https://yourwebsite.com"
                      className="w-full pl-10 pr-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-6 mt-6 border-t dark:border-gray-700">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  // Reset all fields
                  setNickname("");
                  setBio("");
                  setQuote("");
                  setFacebook("");
                  setGithub("");
                  setTelegram("");
                  setWebsite("");
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                disabled={isSaving}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition disabled:opacity-60"
                disabled={isSaving || isSavingSocialLinks}
              >
                {isSaving || isSavingSocialLinks ? "Saving…" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}