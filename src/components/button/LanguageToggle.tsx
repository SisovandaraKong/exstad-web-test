"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useLocale, setLocale } from "@/hooks/useLocale";
import { withBasePath } from "@/lib/base-path";

export default function LanguageToggle() {
  const locale = useLocale();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleLanguage = () => {
    const nextLocale = locale === "en" ? "kh" : "en";
    // update storage + cookie + broadcast; reload so server-rendered pages use the new locale
    setLocale(nextLocale, { reload: true });
  };

  const flagSrc = withBasePath(locale === "en" ? "/flags/en.png" : "/flags/kh.png");
  const altText = locale === "en" ? "English" : "Khmer";

  const ariaLabel = isMounted
    ? `Switch language (current: ${locale})`
    : "Switch language";
  const titleText = isMounted
    ? `Switch language (current: ${locale})`
    : "Switch language";

  return (
    <button
      onClick={toggleLanguage}
      aria-label={ariaLabel}
      title={titleText}
      className="hover:scale-105 transition cursor-pointer border-1 border-accent-foreground/50"
    >
      {isMounted ? (
        <Image
          src={flagSrc}
          alt={altText}
          width={25}
          height={25}
          className="w-[30px] h-[20px] shadow object-cover"
          unoptimized
        />
      ) : (
        <span className="w-[30px] h-[20px] inline-block dark:bg-foreground/30 bg-gray-200" />
      )}
    </button>
  );
}
