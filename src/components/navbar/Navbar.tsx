"use client";
import React, { useState } from "react";
import { AnimatedModeToggle } from "../button/ModeToggle";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import LanguageToggle from "../button/LanguageToggle";
import LogInButton from "../button/LogInButton";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DropDown from "./DropDown";

function Navbar({ className }: { className?: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = React.useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const t = useTranslations();

  // Function to check if a link is active
  const isActive = (href: string) => {
    const cleanPathname = pathname.replace(/^\/[a-z]{2}(\/|$)/, "/");
    return (
      cleanPathname === href || (href !== "/" && cleanPathname.startsWith(href))
    );
  };

  const getNavLinkClasses = (href: string) => {
    const baseClasses =
      "relative rounded-md transition-colors font-d4 font-normal duration-200";
    const hoverClasses = "hover:text-foreground hover:after:opacity-100";
    const afterClasses =
      "after:absolute after:-bottom-2.5 after:-left-3 after:-right-3 after:h-[2.5px] after:bg-primary after:transition-opacity after:duration-200";

    if (isActive(href)) {
      return `${baseClasses} ${afterClasses} ${hoverClasses} text-foreground after:opacity-100`;
    }

    return `${baseClasses} ${afterClasses} ${hoverClasses} after:opacity-0`;
  };

  const getNavLinkClassesForMobile = (href: string) => {
    const baseClasses =
      "relative rounded-md transition-colors font-d4 font-normal duration-200";
    const hoverClasses = "hover:text-foreground hover:bg-primary/10";

    if (isActive(href)) {
      return `${baseClasses} ${hoverClasses} text-foreground after:opacity-100 bg-primary/10`;
    }

    return `${baseClasses} ${hoverClasses}`;
  };

  React.useEffect(() => {
    if (!mobileOpen) return;

    function onPointerDown(e: PointerEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMobileOpen(false);
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  return (
    <div
      ref={navRef}
      className={cn(
        "w-full border-b-1 border-text-color z-50 fixed top-0",
        className
      )}
    >
      {/* Main navbar */}
      <nav className="bg-background relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 xl:px-2 md:py-3 py-2">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="block">
              <Image
                src="/image/logo/exSTAD-01.png"
                alt="Logo"
                width={50}
                height={70}
              />
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <DropDown />
                <Link
                  href="/explore-course"
                  className={getNavLinkClasses("/explore-course")}
                >
                  {t("explore-course")}
                </Link>
                <Link href="/scholar" className={getNavLinkClasses("/scholar")}>
                  {t("scholar")}
                </Link>
                <Link href="/roadmap" className={getNavLinkClasses("/roadmap")}>
                  {t("roadmap")}
                </Link>
                <Link
                  href="/about-us"
                  className={getNavLinkClasses("/about-us")}
                >
                  {t("about-us")}
                </Link>
              </div>
            </div>

            {/* Desktop Right Side */}
            <div className="hidden lg:block">
              <div className="flex items-center space-x-6">
                <LanguageToggle />
                <AnimatedModeToggle />
                <LogInButton />
              </div>
            </div>

            {/* Mobile menu toggle - SINGLE BUTTON */}
            <button
              className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-800/50 transition-colors"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((v) => !v)}
              type="button"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu (conditionally rendered) */}
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <div
              className="lg:hidden fixed inset-0 z-40"
              onClick={() => setMobileOpen(false)}
            />
            {/* Mobile menu */}
            <div className="lg:hidden absolute top-full left-0 right-0 bg-background border-b shadow-lg z-50">
              <div className="min-h-[100vh] w-full p-4">
                <div className="flex flex-col gap-4 items-start w-full text-left">
                  {/* Mobile Navigation Links */}
                  <div className="w-full text-left px-4 py-2">
                    <DropDown />
                  </div>

                  <Link
                    href="/explore-course"
                    className={`${getNavLinkClassesForMobile(
                      "/explore-course"
                    )} w-full text-left px-4 py-2`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {t("explore-course")}
                  </Link>
                  <Link
                    href="/scholar"
                    className={`${getNavLinkClassesForMobile(
                      "/scholar"
                    )} w-full text-left px-4 py-2`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {t("scholar")}
                  </Link>
                  <Link
                    href="/roadmap"
                    className={`${getNavLinkClassesForMobile(
                      "/roadmap"
                    )} w-full text-left px-4 py-2`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {t("roadmap")}
                  </Link>
                  <Link
                    href="/about-us"
                    className={`${getNavLinkClassesForMobile(
                      "/about-us"
                    )} w-full text-left px-4 py-2`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {t("about-us")}
                  </Link>
                </div>

                <div className="flex items-start justify-around w-full mt-8">
                  <LanguageToggle />
                  <AnimatedModeToggle />
                  <LogInButton />
                </div>
              </div>
            </div>
          </>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
