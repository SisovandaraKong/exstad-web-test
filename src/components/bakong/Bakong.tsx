"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import {
  useGenerateQrMutation,
  useGetQrImageMutation,
  useCheckTransactionByMd5Mutation,
} from "../../features/bakong/BakongApi";
import {
  useUpdateEnrollmentByUuidMutation,
  useGetEnrollmentByUuidQuery,
} from "../../features/enrollment/enrollmentApi";
import khqrLogo from "../../../public/image/bakong/KHQR-Logo.png";
import dollarSymbol from "../../../public/image/bakong/dollar_symbol.png";
import { Check, Clock, X } from "lucide-react";
import { FaTelegramPlane } from "react-icons/fa";
import { useLocale, useTranslations } from "next-intl";
import { useGetOpeningProgramByUuidQuery } from "../program/openingProgramApi";
import { LoadingOverlay } from "../loading/LoadingOverlay";
import { useSendTelegramMessageMutation } from "@/features/telegram/telegramApi";
import { enrollmentPaymentMessageFormatter } from "@/services/enrollment-message-formatter";

interface BakongProps {
  open: boolean;
  amount: number;
  enrollmentUuid: string;
  openingProgramUuid: string;
  onClose?: () => void;
  onQrReady?: () => void;
}

export default function Bakong({
  open,
  amount,
  enrollmentUuid,
  openingProgramUuid,
  onClose,
  onQrReady,
}: BakongProps) {
  const [generateQr, { isLoading: genLoading, error: genError }] =
    useGenerateQrMutation();
  const [getQrImage] = useGetQrImageMutation();
  const [checkTransactionByMd5] = useCheckTransactionByMd5Mutation();
  const [updateEnrollmentByUuid] = useUpdateEnrollmentByUuidMutation();

  const [qrImageUrl, setQrImageUrl] = useState<string | null>(null);
  const [localLoading, setLocalLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [md5, setMd5] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Keep UI below navbar height
  useEffect(() => {
    const findNavbar = () =>
      (document.getElementById("site-navbar") as HTMLElement) ||
      (document.getElementById("site-header") as HTMLElement) ||
      (document.getElementById("navbar") as HTMLElement) ||
      (document.querySelector("header") as HTMLElement) ||
      (document.querySelector("nav") as HTMLElement);

    const applyOffset = () => {
      const el = findNavbar();
      const h = el ? el.getBoundingClientRect().height : 0;
      document.documentElement.style.setProperty("--nav-offset", `${h}px`);
    };

    applyOffset();
    const el = findNavbar();
    let ro: ResizeObserver | null = null;

    if (el && "ResizeObserver" in window) {
      ro = new ResizeObserver(applyOffset);
      ro.observe(el);
    }
    const onResize = () => applyOffset();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      if (ro && el) ro.unobserve(el);
      document.documentElement.style.removeProperty("--nav-offset");
    };
  }, []);

  useEffect(() => {
    if (open) setDismissed(false);
  }, [open]);

  // 3-minute countdown
  const COUNTDOWN_MS = 3 * 60 * 1000;
  const [expiresAt, setExpiresAt] = useState<number | null>(null);
  const [countdownMs, setCountdownMs] = useState<number>(0);

  const req = { amount };

  const formatCountdown = (ms: number) => {
    const total = Math.max(0, Math.ceil(ms / 1000));
    const m = Math.floor(total / 60);
    const s = total % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleDownloadQr = () => {
    if (!qrImageUrl) return;
    const a = document.createElement("a");
    a.href = qrImageUrl;
    a.download = `khqr_${new Date()
      .toISOString()
      .slice(0, 19)
      .replace(/[:T]/g, "-")}.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  // Generate QR when open
  useEffect(() => {
    const run = async () => {
      if (!open) return;
      setLocalLoading(true);
      setLocalError(null);
      setQrImageUrl(null);
      setMd5(null);
      setExpiresAt(null);
      setCountdownMs(0);
      setShowSuccess(false);

      try {
        const resp = await generateQr(req).unwrap();
        if (resp?.data?.qr && resp?.data?.md5) {
          setMd5(resp.data.md5);

          const expiry = Date.now() + COUNTDOWN_MS;
          setExpiresAt(expiry);
          setCountdownMs(COUNTDOWN_MS);

          const blob = await getQrImage({
            qr: resp.data.qr,
            md5: resp.data.md5,
          }).unwrap();
          const url = URL.createObjectURL(blob);
          setQrImageUrl(url);
          onQrReady?.();
        } else {
          setLocalError("Failed to generate QR code.");
        }
      } catch {
        setLocalError("Failed to generate QR code.");
      } finally {
        setLocalLoading(false);
      }
    };
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, amount]);

  // Countdown timer
  useEffect(() => {
    if (!open || !expiresAt) return;
    setCountdownMs(Math.max(0, expiresAt - Date.now()));
    const id = window.setInterval(() => {
      const left = Math.max(0, (expiresAt ?? 0) - Date.now());
      setCountdownMs(left);
    }, 1000);
    return () => window.clearInterval(id);
  }, [open, expiresAt]);

  const [sendTelegramMessage] = useSendTelegramMessageMutation();

  // Poll transaction by md5 and mark isPaid + show receipt
  useEffect(() => {
    if (!open || !md5) return;

    const pollIntervalMs = 5000;
    const pollTimeoutMs = 3 * 60 * 1000;
    let stopped = false;

    const startedAt = Date.now();
    const tick = async () => {
      if (stopped) return;
      try {
        const res = await checkTransactionByMd5(md5).unwrap();
        const isDone =
          res?.responseCode === 0 &&
          res?.responseMessage === "Success" &&
          !!res?.data;
        if (isDone) {
          try {
            const enrollment = await updateEnrollmentByUuid({
              uuid: enrollmentUuid,
              body: { isPaid: true },
            }).unwrap();

            const message = enrollmentPaymentMessageFormatter(
              enrollment,
              amount.toFixed(2) as unknown as number
            );
            const threadId = Number(
              process.env.NEXT_PUBLIC_TELEGRAM_ENROLLMENT_THREAD_ID || 0
            );
            await sendTelegramMessage({
              message,
              threadId: threadId || undefined,
            });
          } catch (e) {
            console.warn("Failed to update enrollment isPaid:", e);
          }

          setShowSuccess(true);
          stopped = true;
          return;
        }
      } catch (e) {
        console.warn("checkTransactionByMd5 poll failed:", e);
      }

      if (!stopped && Date.now() - startedAt < pollTimeoutMs) {
        timerId = window.setTimeout(tick, pollIntervalMs);
      } else if (!stopped) {
        setLocalError("Payment verification timed out.");
      }
    };

    let timerId = window.setTimeout(tick, pollIntervalMs);

    return () => {
      stopped = true;
      window.clearTimeout(timerId);
    };
  }, [
    open,
    md5,
    amount,
    checkTransactionByMd5,
    updateEnrollmentByUuid,
    enrollmentUuid,
    sendTelegramMessage,
  ]);

  const isLoading = genLoading || localLoading;
  const hasError = Boolean(genError || localError);
  const shouldShowQr =
    open &&
    !dismissed &&
    !isLoading &&
    !hasError &&
    !!qrImageUrl &&
    !showSuccess;

  if (dismissed) return null;
  if (!shouldShowQr && !showSuccess) return null;

  // render into body to escape stacking contexts of ancestors (table/tooltip)
  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      // full viewport, very high z so it sits above sticky table headers etc.
      className="fixed inset-0 z-[99999] overflow-auto pt-[var(--nav-offset)]"
      role="presentation"
    >
      {/* backdrop must be below modal but above page */}
      <div
        className="fixed inset-0 bg-black/60 z-[99990]"
        aria-hidden="true"
        onClick={() => {
          setDismissed(true);
          onClose?.();
        }}
      />

      <div className="relative z-[99995] w-full min-h-[calc(100vh-var(--nav-offset))] flex items-center justify-center p-4">
        {shouldShowQr && (
          <BakongCard
            amount={amount}
            qrImageUrl={qrImageUrl}
            loading={genLoading || localLoading}
            errorMessage={
              genError || localError ? "Failed to generate QR code." : ""
            }
            countdownText={formatCountdown(countdownMs)}
            onDownloadQr={handleDownloadQr}
            onClose={() => {
              setDismissed(true);
              onClose?.();
            }}
          />
        )}
        {showSuccess && (
          <PaymentReceipt
            enrollmentUuid={enrollmentUuid}
            openingProgramUuid={openingProgramUuid}
            amount={amount}
            onClose={() => {
              setShowSuccess(false);
              setDismissed(true);
              onClose?.();
            }}
          />
        )}
      </div>
    </div>,
    document.body
  );
}

function BakongCard({
  amount,
  qrImageUrl,
  loading,
  errorMessage,
  countdownText,
  onClose,
}: {
  amount: number;
  qrImageUrl: string | null;
  loading: boolean;
  errorMessage: string;
  countdownText: string;
  onDownloadQr?: () => void;
  onClose?: () => void;
}) {
  const t = useTranslations();
  return (
    <div className="flex sm:flex-row flex-col z-[99996] items-center bg-background sm:p-8 lg:py-4 py-10 rounded-lg justify-center animate-fadeIn relative shadow-xl max-w-4xl">
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-50 h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="h-4 w-4 text-gray-600 dark:text-gray-300" />
        </button>
      )}

      <div
        className="
          relative sm:w-[300px] sm:h-[435px] w-[200px] h-[290px] aspect-[20/29] rounded-xl overflow-hidden
          bg-white flex flex-col
          shadow-[0_0_16px_rgba(0,0,0,0.10)]
        "
      >
        <div className="relative sm:h-[53px] h-[50px] bg-red flex items-center justify-center">
          <Image src={khqrLogo} alt="Bakong Logo" height={13} />
          <div
            className="absolute sm:right-0 -right-1 sm:top-13 top-5 sm:h-[30px] sm:w-[30px] h-[20px] w-[20px] bg-red [clip-path:polygon(0_0,100%_0,100%_100%,10%_0)]"
            aria-hidden="true"
          />
        </div>

        <div className="flex-1 flex flex-col sm:pt-6 pt-4">
          <p className="sm:text-sm text-xs font-medium text-black sm:px-8 px-4 font-inter">
            ISTAD
          </p>
          <p className="mt-1 sm:text-3xl text-xl text-black font-semibold leading-tight sm:px-8 px-4 font-bilingual">
            {amount.toFixed(2)}{" "}
            <span className="align-middle mt-4 text-base font-normal font-inter">
              USD
            </span>
          </p>

          <div className="mt-4 h-px w-full border-t border-dashed border-gray-300 sm:px-8 px-4" />

          <div className="relative flex-1 w-full flex items-center justify-center sm:px-4.5 px-1.5">
            {!loading && errorMessage && (
              <div className="w-40 text-center text-xs text-red-500">
                {errorMessage}
              </div>
            )}
            {!loading && !errorMessage && qrImageUrl && (
              // using next/image with external blob URL is okay when url set via createObjectURL
              <Image
                src={qrImageUrl}
                alt="KHQR"
                width={500}
                height={500}
                className="rounded-sm"
              />
            )}
            {!loading && !errorMessage && qrImageUrl && (
              <Image
                src={dollarSymbol}
                alt="KHQR"
                width={30}
                height={30}
                className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center"
              />
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:gap-4 gap-2 items-center justify-center max-w-sm text-center px-4">
        <h2 className="sm:text-3xl text-lg font-semibold mb-1">{t("scan")}</h2>

        <p className="text-red/90 sm:text-sm text-xs leading-relaxed font-bilingual">
          {t("note")}
        </p>

        <div className="w-full flex flex-col items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 text-sm font-bilingual">
            <Clock className="h-4 w-4" />
            <span className="font-bilingual">
              {t("expires")} {countdownText}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Localize shift like the enrollment page */
const SHIFT_LABELS: Record<string, { en: string; kh: string }> = {
  morning: { en: "Morning", kh: "ព្រឹក" },
  afternoon: { en: "Afternoon", kh: "រសៀល" },
  evening: { en: "Evening", kh: "ល្ងាច" },
  night: { en: "Night", kh: "យប់" },
};

const WEEK_TEXT = {
  en: { weekend: "(Sat - Sun)", weekday: "(Mon - Fri)" },
  kh: { weekend: "(សៅរ៍ - អាទិត្យ)", weekday: "(ចន្ទ - សុក្រ)" },
};

const normalizeShiftKey = (s: string) =>
  s
    .trim()
    .toLowerCase()
    .replace(/[\s_-]+/g, "");

const localizeShift = (s: string, isKh: boolean) => {
  const key = normalizeShiftKey(s);
  const map = SHIFT_LABELS[key];
  if (map) return isKh ? map.kh : map.en;
  return s ? s.replace(/_/g, " ") : "";
};

// Format "08:00:00" | "08:00" -> "8:00 AM/PM"
function toHHmm(t?: string): string {
  if (!t) return "";
  const m = t.match(/^(\d{1,2})(?::(\d{2}))?(?::\d{2})?$/);
  if (!m) return t;
  const hh = Number(m[1]);
  const mm = (m[2] ?? "00").slice(0, 2).padStart(2, "0");
  const suffix = hh >= 12 ? "PM" : "AM";
  const hour12 = hh % 12 === 0 ? 12 : hh % 12;
  return `${hour12}:${mm} ${suffix}`;
}

// helper: format date to "DD-MonthName-YYYY", translate month to Khmer when locale indicates Khmer
function formatDateDMY(input?: string | null, locale = "en"): string {
  if (!input) return "";
  const KHMER_MONTHS = [
    "មករា",
    "កុម្ភៈ",
    "មីនា",
    "មេសា",
    "ឧសភា",
    "មិថុនា",
    "កក្កដា",
    "សីហា",
    "កញ្ញា",
    "តុលា",
    "វិច្ឆិកា",
    "ធ្នូ",
  ];

  const parsed = new Date(input);
  if (!isNaN(parsed.getTime())) {
    const dd = String(parsed.getDate()).padStart(2, "0");
    const yyyy = parsed.getFullYear();

    if (typeof locale === "string" && locale.toLowerCase().startsWith("kh")) {
      const monthName =
        KHMER_MONTHS[parsed.getMonth()] ||
        String(parsed.getMonth() + 1).padStart(2, "0");
      return `${dd}-${monthName}-${yyyy}`;
    }

    try {
      const monthName = new Intl.DateTimeFormat(locale, {
        month: "long",
      }).format(parsed);
      return `${dd}-${monthName}-${yyyy}`;
    } catch {
      const mm = String(parsed.getMonth() + 1).padStart(2, "0");
      return `${dd}-${mm}-${yyyy}`;
    }
  }

  const m = String(input).match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})/);
  if (m) {
    const yyyy = Number(m[1]);
    const mmNum = Number(m[2]);
    const ddNum = Number(m[3]);
    const dd = String(ddNum).padStart(2, "0");

    if (typeof locale === "string" && locale.toLowerCase().startsWith("kh")) {
      const monthName =
        KHMER_MONTHS[mmNum - 1] || String(mmNum).padStart(2, "0");
      return `${dd}-${monthName}-${yyyy}`;
    }

    try {
      const d = new Date(yyyy, mmNum - 1, ddNum);
      const monthName = new Intl.DateTimeFormat(locale, {
        month: "long",
      }).format(d);
      return `${dd}-${monthName}-${yyyy}`;
    } catch {
      const mm = String(mmNum).padStart(2, "0");
      return `${dd}-${mm}-${yyyy}`;
    }
  }

  return input;
}

// Payment receipt component
function PaymentReceipt({
  enrollmentUuid,
  openingProgramUuid,
  amount,
  onClose,
}: {
  enrollmentUuid: string;
  openingProgramUuid: string;
  amount: number;
  onClose: () => void;
}) {
  const t = useTranslations();
  const locale = useLocale();
  const isKh = locale === "kh" || locale === "km";
  const router = useRouter();

  const { data, isLoading } = useGetEnrollmentByUuidQuery(enrollmentUuid);
  const { data: openingProgram } = useGetOpeningProgramByUuidQuery({
    uuid: openingProgramUuid,
  });

  const isRecord = (v: unknown): v is Record<string, unknown> =>
    typeof v === "object" && v !== null;

  const pickStr = (
    obj: unknown,
    path: readonly string[]
  ): string | undefined => {
    let cur: unknown = obj;
    for (const key of path) {
      if (!isRecord(cur) || !(key in cur)) return undefined;
      cur = (cur as Record<string, unknown>)[key];
    }
    return typeof cur === "string" ? cur : undefined;
  };

  const pickBool = (
    obj: unknown,
    path: readonly string[]
  ): boolean | undefined => {
    let cur: unknown = obj;
    for (const key of path) {
      if (!isRecord(cur) || !(key in cur)) return undefined;
      cur = (cur as Record<string, unknown>)[key];
    }
    return typeof cur === "boolean" ? cur : undefined;
  };

  const enName = pickStr(data, ["englishName"]);
  const khName = pickStr(data, ["khmerName"]);
  const name = isKh ? khName || enName || "-" : enName || khName || "-";

  const dobRaw = pickStr(data, ["dob"]) || "";
  const dob = dobRaw ? formatDateDMY(dobRaw, locale || "en") : "-";

  const programTitle =
    pickStr(data, ["program"]) ||
    pickStr(data, ["openingProgram", "programName"]) ||
    "-";
  const shiftRaw =
    pickStr(data, ["_class", "shift"]) ||
    pickStr(data, ["class", "shift"]) ||
    "";
  const startTime = toHHmm(
    pickStr(data, ["_class", "startTime"]) ||
      pickStr(data, ["class", "startTime"]) ||
      ""
  );
  const endTime = toHHmm(
    pickStr(data, ["_class", "endTime"]) ||
      pickStr(data, ["class", "endTime"]) ||
      ""
  );
  const isWeekend =
    pickBool(data, ["_class", "isWeekend"]) ??
    pickBool(data, ["class", "isWeekend"]) ??
    false;

  const shiftLabel = localizeShift(shiftRaw, isKh);
  const weekLabel = isKh
    ? WEEK_TEXT.kh[isWeekend ? "weekend" : "weekday"]
    : WEEK_TEXT.en[isWeekend ? "weekend" : "weekday"];
  const shift =
    shiftLabel &&
    `${shiftLabel} ${weekLabel}${
      startTime && endTime ? ` | ${startTime} - ${endTime}` : ""
    }`;

  const telegramLink =
    pickStr(openingProgram, ["telegramGroup"]) ||
    pickStr(openingProgram, ["telegram"]) ||
    "";

  const openingProgramSlug = pickStr(openingProgram, ["slug"]);

  const handleClose = () => {
    if (openingProgramSlug) {
      router.push(`/explore-course/${openingProgramSlug}`);
    } else {
      router.push("/explore-course");
    }
    onClose();
  };

  return (
    <div
      className="relative bg-background rounded-2xl shadow-xl w-full max-w-3xl overflow-hidden animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 w-full flex flex-col items-center justify-center xl:p-8 p-6 gap-6 bg-muted/30">
          <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center">
            <Check className="h-14 w-14 text-green-600" />
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-foreground">
              {t("your-payment-was-successful")}
            </h3>
            <p className="mt-2 text-muted-foreground">{t("thank-you")}</p>
            <p className="mt-2 text-sm text-muted-foreground font-bilingual">
              {t("amount")}:{" "}
              <span className="text-red-600 text-bold">
                {amount.toFixed(2)}
              </span>{" "}
              USD
            </p>
          </div>
        </div>

        <div className="hidden md:block w-px bg-border" />

        <div className="md:w-1/2 w-full xl:p-8 p-6">
          <h4 className="text-lg font-semibold mb-4">{t("details")}</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start justify-between gap-4">
              <span className="text-muted-foreground">{t("name")}:</span>
              <span className="font-medium text-right font-bilingual">
                {name}
              </span>
            </li>
            <li className="flex items-start justify-between gap-4">
              <span className="text-muted-foreground">
                {t("date-of-birth")}:
              </span>
              <span className="font-medium text-right font-bilingual">
                {dob}
              </span>
            </li>
            <li className="flex items-start justify-between gap-4">
              <span className="text-muted-foreground">{t("program")}:</span>
              <span className="font-medium text-right font-bilingual">
                {programTitle}
              </span>
            </li>
            <li className="flex items-start justify-between gap-4 font-bilingual">
              <span className="text-muted-foreground ">{t("shift")}:</span>
              <span className="font-medium text-right font-bilingual">
                {shift || "-"}
              </span>
            </li>
            <li className="flex items-start justify-between gap-4">
              <span className="text-muted-foreground">{t("payment")}:</span>
              <span className="font-medium text-green-600">{t("success")}</span>
            </li>
          </ul>

          <div className="mt-8 flex justify-between gap-3">
            {telegramLink && (
              <a
                href={telegramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-medium hover:bg-primary/90 hover:text-white transition-colors font-bilingual"
              >
                <FaTelegramPlane className="h-4 w-4 hover:text-white" />
                {t("join-telegram-group")}
              </a>
            )}

            <button
              type="button"
              onClick={handleClose}
              className="inline-flex items-center justify-center rounded-full cursor-pointer bg-red-600 px-6 py-2.5 text-white text-sm font-medium hover:bg-red-700"
            >
              {t("close")}
            </button>
          </div>

          {isLoading && <LoadingOverlay />}
        </div>
      </div>
    </div>
  );
}
