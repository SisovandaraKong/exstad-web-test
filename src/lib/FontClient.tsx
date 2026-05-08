"use client";

import { useEffect } from "react";
import { useLocale } from "../hooks/useLocale";
import { inter, koh } from "./fonts";

export default function FontClient() {
  const locale = useLocale() || "en";

  useEffect(() => {
    const body = document.body;
    // remove both to ensure deterministic state
    body.classList.remove(inter.className, koh.className);

    if (locale === "kh") {
      body.classList.add(koh.className);
    } else {
      body.classList.add(inter.className);
    }

    // also ensure CSS variables are present so non-next/font fallbacks can use them
    body.classList.add(inter.variable, koh.variable);

    return () => {
      body.classList.remove(inter.className, koh.className);
    };
  }, [locale]);

  return null;
}
