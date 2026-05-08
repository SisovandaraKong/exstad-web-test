"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export function useLocale() {
  const [locale, setLocale] = useState<string>(() => {
    if (typeof window === "undefined") return "en";
    // prefer cookie (server-side set) so client initial render matches server
    const cookie = Cookies.get("locale");
    if (cookie) return cookie;
    return localStorage.getItem("locale") ?? "en";
  });

  useEffect(() => {
    const onCustom = (e: Event) => {
      const detail = (e as CustomEvent)?.detail;
      const next = detail?.locale ?? localStorage.getItem("locale") ?? "en";
      setLocale(next);
    };

    const onStorage = (e: StorageEvent) => {
      if (e.key === "locale") setLocale(e.newValue ?? "en");
    };

    window.addEventListener("localechange", onCustom as EventListener);
    window.addEventListener("storage", onStorage as EventListener);

    return () => {
      window.removeEventListener("localechange", onCustom as EventListener);
      window.removeEventListener("storage", onStorage as EventListener);
    };
  }, []);

  return locale;
}

export function setLocale(locale: string, opts?: { reload?: boolean }) {
  // persist for client-side and server-side (cookie) usage
  try {
    localStorage.setItem("locale", locale);
  } catch {
    /* ignore */
  }

  try {
    Cookies.set("locale", locale, { expires: 365, path: "/" });
  } catch {
    /* ignore */
  }

  // notify same-window listeners
  try {
    window.dispatchEvent(
      new CustomEvent("localechange", { detail: { locale } })
    );
  } catch {
    /* ignore */
  }

  // optionally reload to force server-rendered locale changes
  if (opts?.reload) {
    window.location.reload();
  }
}
