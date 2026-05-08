"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FaUserGraduate } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { signIn, signOut, useSession } from "next-auth/react";
import type { Session } from "next-auth";
import { Button } from "../ui/button";
import { useGetScholarByUsernameQuery } from "@/features/scholar/scholarApi";
import { skipToken } from "@reduxjs/toolkit/query";
import Link from "next/link";

function getUsernameFromSession(session: Session | null): string | undefined {
  const user = session?.user;
  if (typeof user !== "object" || user === null) return undefined;
  if (!("username" in user)) return undefined;
  const username = (user as { username: unknown }).username;
  return typeof username === "string" && username.length > 0
    ? username
    : undefined;
}

function getInitialFromUsername(username?: string): string {
  if (!username) return "";
  const first = username.trim().split(/[\s._-]+/)[0];
  return first.charAt(0).toUpperCase();
}

function LoginSkeleton() {
  return (
    <Button
      disabled
      className="flex items-center justify-center p-0 h-8 w-8 rounded-full border bg-accent/50 font-bilingual transition-colors cursor-wait"
      title="Loading..."
      aria-label="Loading account"
    >
      <div className="h-7 w-7 rounded-full bg-primary/5 animate-pulse" />
    </Button>
  );
}

export default function LogInButton() {
  const t = useTranslations();
  const { data: session, status } = useSession();

  const username = getUsernameFromSession(session);
  const { data: scholar, isLoading } = useGetScholarByUsernameQuery(
    username ?? skipToken
  );

  const avatarUrl =
    typeof scholar?.avatar === "string" && scholar.avatar.length > 0
      ? scholar.avatar
      : undefined;
  const initial = getInitialFromUsername(username);

  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!menuRef.current) return;
      if (e.target instanceof Node && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  if (isLoading || status === "loading") {
    return <LoginSkeleton />;
  }

  if (session) {
    const handleSignOut = async () => {
      const confirmed = window.confirm("Are you sure you want to sign out?");
      if (!confirmed) return;
      // follow existing login process (Keycloak via next-auth)
      await signOut({ callbackUrl: "/" });
    };

    return (
      <div className="relative" ref={menuRef}>
        <Button
          onClick={() => setOpen((s) => !s)}
          className="flex items-center justify-center p-0 h-8 w-8 rounded-full border bg-accent hover:bg-accent-hover font-bilingual transition-colors cursor-pointer"
          title="Account"
          aria-label="Account"
          aria-expanded={open}
        >
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt="Scholar avatar"
              width={28}
              height={28}
              className="h-7 w-7 rounded-full object-cover"
              priority
            />
          ) : initial ? (
            <span className="h-7 w-7 rounded-full bg-primary/10 text-white text-md font-semibold flex items-center justify-center font-bilingual">
              {initial}
            </span>
          ) : (
            <FaUserGraduate className="h-4 w-4 text-white" />
          )}
        </Button>

        {open && (
          <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white dark:bg-gray-800 border z-50">
            <div className="flex flex-col py-1">
              <Link
                href="/me"
                className="block px-3 py-2 text-sm text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setOpen(false)}
              >
                Profile
              </Link>
              <button
                type="button"
                onClick={handleSignOut}
                className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {t("logout")}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <Button
      onClick={() => signIn("keycloak")}
      className="flex items-center font-bilingual font-description-5 font-semibold text-white px-4 py-1 border bg-accent hover:bg-accent-hover rounded-full transition-colors cursor-pointer"
    >
      <FaUserGraduate className="h-4 w-4" />
      <span className="ml-0">{t("log-in")}</span>
    </Button>
  );
}
