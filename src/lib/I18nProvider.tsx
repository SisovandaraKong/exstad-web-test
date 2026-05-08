"use client";

import { ReactNode, useEffect, useMemo } from "react";
import { NextIntlClientProvider } from "next-intl";
import { useLocale } from "@/hooks/useLocale";
import FontClient from "@/lib/FontClient";

import enMessages from "@/translate/en.json";
import khMessages from "@/translate/kh.json";

interface I18nProviderProps {
  children: ReactNode;
  /** Server-detected locale (internal key, e.g. 'kh' or 'en') */
  initialLocale?: string;
}

export default function I18nProvider({
  children,
  initialLocale,
}: I18nProviderProps) {
  // clientLocale reads cookie/localStorage and listens for updates.
  const clientLocale = useLocale();

  // Choose locale: prefer explicit server value to avoid hydration mismatches.
  const locale = useMemo(
    () => initialLocale ?? clientLocale ?? "en",
    [initialLocale, clientLocale]
  );

  // Select message bundle once per locale change.
  const messages = useMemo(
    () => (locale === "kh" ? khMessages : enMessages),
    [locale]
  );

  // Keep document.lang in-sync with the active locale. Use 'km' HTML tag for Khmer.
  useEffect(() => {
    const htmlLang = locale === "kh" ? "km" : locale;
    if (typeof document !== "undefined")
      document.documentElement.lang = htmlLang;
  }, [locale]);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <FontClient />
      {children}
    </NextIntlClientProvider>
  );
}
