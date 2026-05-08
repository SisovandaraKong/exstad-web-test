/** @format */
"use client";

import * as React from "react";
import { useRef, useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";
import { FiMoon, FiSun } from "react-icons/fi";

export function AnimatedModeToggle() {
  const { resolvedTheme, setTheme } = useTheme(); // resolvedTheme is safe for client
  const [mounted, setMounted] = useState(false); // track client mount
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  // Ensure client-side rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = async () => {
    if (!mounted || !buttonRef.current) return;

    const isDark = resolvedTheme === "dark";
    const newTheme = isDark ? "light" : "dark";

    // Animate theme change
    await document.startViewTransition(() => {
      flushSync(() => {
        setTheme(newTheme);
      });
    }).ready;

    // Get button position for circular animation
    const { top, left, width, height } =
      buttonRef.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;

    const right = window.innerWidth - left;
    const bottom = window.innerHeight - top;
    const maxRad = Math.hypot(Math.max(left, right), Math.max(top, bottom));

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRad}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 700,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  };

  // Prevent SSR mismatch
  if (!mounted) return null;

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      title="Toggle theme"
      className="relative inline-flex items-center justify-center rounded-full border border-transparent cursor-pointer"
    >
      <FiSun className="text-accent hover:text-accent-hover h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <FiMoon className="text-accent hover:text-accent-hover absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
