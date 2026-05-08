"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { FileInput, FileUploader } from "@/components/ui/file-upload";
import { provinceData } from "@/data/provinceData";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { currentAddressData } from "@/data/currentAddress";
import { educationQualificationData } from "@/data/educationQualification";
import { yearData } from "@/data/year";
import { majorData } from "@/data/major";
import { universitiesData } from "@/data/universities";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CalendarIcon,
  Check,
  ChevronsUpDown,
  CloudUpload,
  Paperclip,
  Trash2,
} from "lucide-react";
import * as React from "react";
import { useForm, type FieldErrors } from "react-hook-form";
import { toast, Toaster } from "sonner";
import { z } from "zod";
import {
  useGetAllOpeningProgramsQuery,
  useGetOpeningProgramBySlugQuery,
} from "@/components/program/openingProgramApi";
import { useCreateDocumentMutation } from "@/features/document/documentApi";
import { useCreateEnrollmentMutation } from "@/features/enrollment/enrollmentApi";
import { useSendTelegramMessageMutation } from "@/features/telegram/telegramApi";
import { useTranslations, useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { enrollmentMessageFormatter } from "@/services/enrollment-message-formatter";
import { useGetClassesByOpeningProgramUuidQuery } from "@/features/class/classApi";
import { skipToken } from "@reduxjs/toolkit/query";
import Bakong from "@/components/bakong/Bakong";
import Image from "next/image";
import { useGetMasterProgramByOpeningProgramUuidQuery } from "@/components/program/masterProgramApi";
import { LoadingOverlay } from "@/components/loading/LoadingOverlay";
import { useSession } from "next-auth/react";
import { useGetScholarByUsernameQuery } from "@/features/scholar/scholarApi";

type ProvinceItem = (typeof provinceData)[number];
type UniversityItem = (typeof universitiesData)[number];
type AddressItem = (typeof currentAddressData)[number];
type EducationQualificationItem = (typeof educationQualificationData)[number];
type yearItem = (typeof yearData)[number];
type majorItem = (typeof majorData)[number];

/* Helpers */
/**
 * Format a Date for display using local date parts (prevents timezone shift).
 * Accepts optional locale (e.g. "en-US" or "kh"). Uses local midnight so the
 * selected calendar day never shifts to previous/next day.
 */
function formatDate(date: Date | undefined, locale = "en-US") {
  if (!date) return "";
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  try {
    return d.toLocaleDateString(locale, {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  } catch {
    // fallback simple format
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  }
}

/** Serialize a Date to local YYYY-MM-DD (no UTC conversion) */
function toLocalYMD(date: Date) {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate()); // local midnight
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function capitalizeWord(s: string): string {
  if (!s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

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
  return capitalizeWord(s.replace(/_/g, " ").toLowerCase());
};

// Format "08:00:00" | "08:00" -> "8:00"
function toHHmm(t?: string | null): string {
  if (!t) return "";
  const s = String(t).trim();
  // match "H", "HH", "H:MM", "HH:MM", "HH:MM:SS"
  const m = s.match(/^(\d{1,2})(?::(\d{2}))?(?::(\d{2}))?$/);
  if (!m) return s;
  const hh = Number(m[1]);
  const mm = (m[2] ?? "00").slice(0, 2).padStart(2, "0");
  const suffix = hh >= 12 ? "PM" : "AM";
  const hour12 = hh % 12 === 0 ? 12 : hh % 12;
  return `${hour12}:${mm} ${suffix}`;
}

const provinces: ProvinceItem[] = provinceData;
const universities: UniversityItem[] = universitiesData;
const addresses: AddressItem[] = currentAddressData;
const eduQual: EducationQualificationItem[] = educationQualificationData;
// const year: yearItem[] = yearData;
// const major: majorItem[] = majorData;

const getKhmerName = (obj: Record<string, unknown>): string | undefined => {
  const v = obj["khmerName"];
  return typeof v === "string" ? v : undefined;
};

function isUserLoggedInClient(): boolean {
  if (typeof window === "undefined") return false;
  const cookies = typeof document !== "undefined" ? document.cookie : "";
  const hasNextAuth =
    /(?:^|;\s*)(?:next-auth\.session-token|__Secure-next-auth\.session-token)=/.test(
      cookies
    );
  const hasToken =
    !!localStorage.getItem("accessToken") ||
    !!localStorage.getItem("token") ||
    !!localStorage.getItem("authToken");
  const hasUser = !!localStorage.getItem("user");
  return hasNextAuth || hasToken || hasUser;
}

const formSchema = z.object({
  englishName: z.string().min(1, "English name is required"),
  khmerName: z.string().min(1, "Khmer name is required"),
  openingProgramUuid: z.string().min(1, "Opening program is required"),
  classUuid: z.string().min(1, "Class is required"),
  gender: z.string().min(1, "Gender is required"),
  dob: z
    .date()
    .max(new Date(), { message: "Date of birth cannot be in the future" })
    .or(
      z.never().transform(() => {
        throw new Error("Date of birth is required");
      })
    ),
  currentAddress: z.string().min(1, "Current address is required"),
  grade: z.string().optional(),
  university: z.string().min(1, "University is required"),
  avatar: z.string().optional(),
  province: z.string().min(1, "Place of birth is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  educationQualification: z
    .string()
    .min(1, "Education qualification is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  howLongProgramming: z.string().optional(),
  howDoYouKnewISTAD: z.string().optional(),
  major: z.string().optional(),
  year: z.string().optional(),
  request: z.string().optional(),
  extra: z.record(z.string(), z.string()).optional(),
});

function extractError(error: unknown): { status?: number; message: string } {
  if (typeof error === "object" && error !== null) {
    const maybeStatus = (error as { status?: unknown }).status;
    const status = typeof maybeStatus === "number" ? maybeStatus : undefined;

    let message = "Failed to submit the form. Please try again.";
    const data = (error as { data?: unknown }).data;

    if (typeof data === "string") {
      message = data;
    } else if (typeof data === "object" && data !== null) {
      const r = data as Record<string, unknown>;
      if (typeof r.message === "string") message = r.message;
      else if (typeof r.error === "string") message = r.error;
      else if (Array.isArray(r.errors) && typeof r.errors[0] === "string") {
        message = r.errors[0] as string;
      }
    }

    return { status, message };
  }

  if (error instanceof Error) {
    return { message: error.message };
  }
  return { message: "Failed to submit the form. Please try again." };
}

export default function EnrollmentPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const t = useTranslations();
  const locale = useLocale();
  const isKh = locale === "kh" || locale === "km";
  const localize = React.useCallback(
    (en?: string, kh?: string) => (isKh && kh ? kh : en ?? kh ?? ""),
    [isKh]
  );

  const { data: session } = useSession();
  const { data: scholar } = useGetScholarByUsernameQuery(
    session?.user?.username ?? "",
    {
      skip: !session?.user?.username,
    }
  );

  // UI state
  const [addressOpen, setAddressOpen] = React.useState(false);
  const [provinceOpen, setProvinceOpen] = React.useState(false);
  const [universityOpen, setUniversityOpen] = React.useState(false);
  const [dobOpen, setDobOpen] = React.useState(false);
  const [files, setFiles] = React.useState<File[] | null>(null);
  const [openingProgramOpen, setOpeningProgramOpen] = React.useState(false);

  // Wait for Bakong QR to be ready after enrollment
  const [waitingForQr, setWaitingForQr] = React.useState(false);

  // Additional loading overlay for file upload
  const [uploading, setUploading] = React.useState(false);

  // Preview URLs for selected images
  const [previews, setPreviews] = React.useState<string[]>([]);
  React.useEffect(() => {
    if (!files?.length) {
      setPreviews([]);
      return;
    }
    const urls = files.map((f) =>
      f.type?.startsWith("image/") ? URL.createObjectURL(f) : ""
    );
    setPreviews(urls);
    return () => {
      urls.forEach((u) => u && URL.revokeObjectURL(u));
    };
  }, [files]);

  const removeFile = (idx: number) => {
    setFiles((prev) => {
      if (!prev) return prev;
      const next = [...prev];
      next.splice(idx, 1);
      return next.length ? next : null;
    });
    setPreviews((prev) => prev.filter((_, i) => i !== idx));
  };

  // Bakong modal state
  const [bakongOpen, setBakongOpen] = React.useState(false);
  const [bakongEnrollmentUuid, setBakongEnrollmentUuid] = React.useState<
    string | null
  >(null);
  const [bakongAmount, setBakongAmount] = React.useState<number>(5.0);
  const [bakongOpeningProgramUuid, setBakongOpeningProgramUuid] =
    React.useState<string>();

  // Opening program by slug (page context)
  const {
    data: openingProgram,
    isLoading,
    isError,
  } = useGetOpeningProgramBySlugQuery({ slug });

  // All opening programs for the combobox list
  const { data: openingPrograms } = useGetAllOpeningProgramsQuery();

  // --- ADD: determine page-level program type (master program for the page openingProgram)
  const { data: pageMasterProgram } =
    useGetMasterProgramByOpeningProgramUuidQuery(
      openingProgram?.uuid
        ? { openingProgramUuid: openingProgram.uuid }
        : skipToken
    );

  // Enrollment mutation
  const [createEnrollment, { isLoading: isSubmitting }] =
    useCreateEnrollmentMutation();

  // Document upload mutation
  const [createDocument] = useCreateDocumentMutation();

  // Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      englishName: "",
      khmerName: "",
      gender: "",
      university: "",
      currentAddress: "",
      avatar: "",
      province: "",
      phoneNumber: "",
      educationQualification: "",
      howLongProgramming: "",
      howDoYouKnewISTAD: "",
      grade: "",
      openingProgramUuid: openingProgram?.uuid || "",
      classUuid: "",
      email: "",
      request: "",
      year: "",
      major: "",
      dob: undefined,
    },
  });

  React.useEffect(() => {
    if (scholar) {
      form.setValue("englishName", scholar.englishName || "");
      form.setValue("khmerName", scholar.khmerName || "");
      form.setValue("email", scholar.email || "");
      form.setValue("phoneNumber", scholar.phoneNumber || "");
      form.setValue("province", scholar.province || "");
      form.setValue("currentAddress", scholar.currentAddress || "");
      form.setValue("dob", scholar.dob ? new Date(scholar.dob) : new Date());
      form.setValue("university", scholar.university || "");
      form.setValue("avatar", scholar.avatar || "");
      form.setValue("gender", scholar.gender || "");
    }
  }, [scholar, form]);

  // When openingProgram loads, set it on the form and clear class
  React.useEffect(() => {
    if (openingProgram?.uuid) {
      form.setValue("openingProgramUuid", openingProgram.uuid);
      form.setValue("classUuid", "");
    }
  }, [openingProgram?.uuid, form]);

  const selectedOpeningUuid = form.watch("openingProgramUuid");

  const { data: classData } = useGetClassesByOpeningProgramUuidQuery(
    selectedOpeningUuid ? selectedOpeningUuid : skipToken
  );
  const classes = classData?.classes ?? [];

  const [sendTelegramMessage] = useSendTelegramMessageMutation();

  // Determine the program amount
  const openingUuidForAmount =
    selectedOpeningUuid || openingProgram?.uuid || "";

  const { data: masterProgram } = useGetMasterProgramByOpeningProgramUuidQuery(
    openingUuidForAmount
      ? { openingProgramUuid: openingUuidForAmount }
      : skipToken
  );

  const coercePrice = (p: unknown): number => {
    if (typeof p === "number") return Number.isFinite(p) ? p : 0;
    if (typeof p === "string") {
      const n = parseFloat(p);
      return Number.isFinite(n) ? n : 0;
    }
    return 0;
  };

  const selectedOpening = React.useMemo(
    () => openingPrograms?.find((p) => p.uuid === openingUuidForAmount),
    [openingPrograms, openingUuidForAmount]
  );

  // Read both registerFee and price from the opening program
  const { registerFee: _registerFee, price: _price } =
    (selectedOpening as
      | { registerFee?: unknown; price?: unknown }
      | undefined) ?? {};

  const registerFeeFromOpening = React.useMemo(
    () => coercePrice(_registerFee),
    [_registerFee]
  );
  const priceFromOpening = React.useMemo(() => coercePrice(_price), [_price]);

  // Accept both SCHOLARSHIP and SCHOLASHIP spellings
  const programTypeUpper =
    masterProgram?.programType
      ?.toString()
      ?.toUpperCase()
      ?.replace(/\s+/g, "") ?? "";
  const isScholarship =
    programTypeUpper === "SCHOLARSHIP" || programTypeUpper === "SCHOLASHIP";

  // Amount logic:
  // - Scholarship => openingProgram.registerFee (fallback to price)
  // - Others => openingProgram.price
  const computedAmount = React.useMemo(() => {
    if (isScholarship) {
      return registerFeeFromOpening || priceFromOpening || 0;
    }
    return priceFromOpening || 0;
  }, [isScholarship, registerFeeFromOpening, priceFromOpening]);

  // Clear scholarship-only fields if not scholarship
  React.useEffect(() => {
    if (!isScholarship) {
      form.setValue("grade", "");
      form.setValue("howLongProgramming", "");
      form.setValue("howDoYouKnewISTAD", "");
      form.setValue("request", "");
    }
  }, [isScholarship, form]);

  // --- ADD: page-level program type detection and filtered opening program list
  const pageProgramTypeUpper =
    pageMasterProgram?.programType
      ?.toString()
      ?.toUpperCase()
      ?.replace(/\s+/g, "") ?? "";
  const isPageScholarship =
    pageProgramTypeUpper === "SCHOLARSHIP" ||
    pageProgramTypeUpper === "SCHOLASHIP";
  const isPageShortCourse =
    pageProgramTypeUpper.includes("SHORT") ||
    pageProgramTypeUpper.includes("SHORTCOURSE") ||
    pageProgramTypeUpper.includes("SHORT_COUSE");

  const getProgramTypeUpperFrom = (p: unknown) => {
    const rec = p as Record<string, unknown> | undefined;
    const raw =
      rec?.programType ??
      (rec?.masterProgram as Record<string, unknown> | undefined)
        ?.programType ??
      "";
    return (raw ?? "").toString().toUpperCase().replace(/\s+/g, "");
  };

  const filteredOpeningPrograms = React.useMemo(() => {
    if (!openingPrograms) return [];
    // If page is scholarship -> lock to the page openingProgram only
    if (isPageScholarship) {
      return openingProgram ? [openingProgram] : [];
    }
    // If page is short course -> only show opening programs that look like short course
    if (isPageShortCourse) {
      return openingPrograms.filter((p) => {
        const pt = getProgramTypeUpperFrom(p);
        return (
          pt.includes("SHORT") ||
          pt.includes("SHORTCOURSE") ||
          pt.includes("SHORT_COUSE")
        );
      });
    }
    // Default: all
    return openingPrograms;
  }, [openingPrograms, openingProgram, isPageScholarship, isPageShortCourse]);

  const onInvalid = (errors: FieldErrors<z.infer<typeof formSchema>>) => {
    const [firstName, firstErr] = Object.entries(errors)[0] ?? [];
    const message =
      (firstErr as { message?: unknown })?.message &&
      typeof (firstErr as { message?: unknown }).message === "string"
        ? ((firstErr as { message?: unknown }).message as string)
        : "Please fix the highlighted fields.";
    toast.error(message);
    if (firstName) {
      form.setFocus(firstName as keyof z.infer<typeof formSchema>);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // show overlay immediately when user clicks enroll
      setWaitingForQr(true);

      if (isScholarship && !values.grade) {
        toast.error("Grade is required for scholarship.");
        form.setFocus("grade");
        setWaitingForQr(false);
        return;
      }

      let avatarUri = "";

      if (files && files.length > 0) {
        setUploading(true);
        const file = files[0];
        const documentPayload = {
          programSlug: masterProgram?.slug || "",
          gen: openingProgram?.generation ?? 1,
          documentType: "avatar" as const,
          filename:
            "avatar_" +
            values.englishName.toLocaleLowerCase().replaceAll(" ", "_") +
            new Date()
              .getTime()
              .toLocaleString()
              .toLocaleLowerCase()
              .replaceAll(",", ""), // use real filename
          file,
        };
        const document = await createDocument(documentPayload).unwrap();
        avatarUri = document.uri;
        form.setValue("avatar", avatarUri);
        setUploading(false);
      }

      let extra: Record<string, string> | null = null;
      if (isScholarship) {
        const tmp: Record<string, string> = {};
        if (values.howDoYouKnewISTAD)
          tmp.howDoYouKnowIstad = values.howDoYouKnewISTAD;
        if (values.request) tmp.request = values.request;
        if (values.grade) tmp.grade = values.grade;
        if (values.year) tmp.year = values.year;
        if (values.major) tmp.major = values.major;
        if (values.howLongProgramming)
          tmp.howLongProgramming = values.howLongProgramming;
        extra = Object.keys(tmp).length > 0 ? tmp : null;
      }

      const enrollmentData = {
        englishName: values.englishName,
        khmerName: values.khmerName,
        openingProgramUuid: values.openingProgramUuid,
        classUuid: values.classUuid,
        amount: computedAmount,
        // serialize DOB using local date parts to avoid timezone shift
        dob: values.dob instanceof Date ? toLocalYMD(values.dob) : values.dob,
        university: values.university,
        currentAddress: values.currentAddress,
        province: values.province,
        phoneNumber: values.phoneNumber,
        educationQualification: values.educationQualification,
        email: values.email,
        extra: extra,
        isScholar: session?.user?.username ? true : false,
        gender: values.gender,
        ...(avatarUri ? { avatar: avatarUri } : {}),
      };

      const enroll = await createEnrollment(enrollmentData).unwrap();
      // beautiful toast success message
      toast.success("Enrollment submitted successfully!");

      const message = enrollmentMessageFormatter(enroll);
      const threadId = Number(
        process.env.NEXT_PUBLIC_TELEGRAM_ENROLLMENT_THREAD_ID || 0
      );

      await sendTelegramMessage({
        message,
        photoUrl: avatarUri || undefined,
        threadId: threadId || undefined,
      });

      // keep overlay visible until Bakong QR is generated
      setWaitingForQr(true);

      setBakongAmount(enrollmentData.amount);
      setBakongEnrollmentUuid(enroll.uuid);
      setBakongOpeningProgramUuid(values.openingProgramUuid);
      setBakongOpen(true);

      form.reset();
      setFiles(null);
    } catch (error: unknown) {
      setUploading(false);
      setWaitingForQr(false);
      const { status, message } = extractError(error);
      if (status === 409) {
        toast.error("You already enrolled for this program/class.");
        return;
      }
      toast.error(message);
    }
  }

  // Show "not found" only when not loading
  if (!isLoading && (isError || !openingProgram))
    return <div>Program not found.</div>;

  // don't show global LoadingOverlay while Bakong modal is open (Bakong has own loader)
  const showOverlay =
    (isLoading || isSubmitting || uploading || waitingForQr) && !bakongOpen;

  return (
    <>
      {showOverlay && <LoadingOverlay />}

      <div className="flex flex-col max-w-7xl mx-auto gap-6 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto bg-background rounded-md mt-10 p-4 w-full px-4 sm:px-6 lg:px-8">
          <h1 className="font-d2 font-bold text-3xl text-center text-primary dark:text-white">
            {masterProgram?.title} - {t("enrollment")}
          </h1>
        </div>

        <div className="mx-auto bg-background sm:p-8 rounded-md mb-16 w-full px-4 sm:px-6 lg:px-8">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit, onInvalid)}
              className="space-y-8"
            >
              <div className="grid md:grid-cols-2 grid-cols-1 gap-16 mt-8">
                {/* First Column */}
                <div className="flex flex-col gap-6">
                  {/* English Name */}
                  <FormField
                    control={form.control}
                    name="englishName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("full-name-en")}
                          <span className="text-red-600">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="w-full py-7 bg-whitesmoke font-inter"
                            placeholder="Tong Bora"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Gender */}
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("gender")} <span className="text-red-600">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full py-7 bg-whitesmoke">
                              <SelectValue placeholder={t("select-gender")} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Male">{t("male")}</SelectItem>
                            <SelectItem value="Female">
                              {t("female")}
                            </SelectItem>
                            <SelectItem value="Other">{t("other")}</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Date of Birth */}
                  <FormField
                    control={form.control}
                    name="dob"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("dob")} <span className="text-red-600">*</span>
                        </FormLabel>
                        <Popover open={dobOpen} onOpenChange={setDobOpen}>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className="w-full py-7 bg-whitesmoke justify-between font-normal hover:bg-whitesmoke font-inter"
                              >
                                {field.value ? (
                                  formatDate(field.value, locale || "en-US")
                                ) : (
                                  <span className="text-muted-foreground font-bilingual">
                                    2005-06-01
                                  </span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-auto overflow-hidden p-0 font-inter"
                            align="end"
                          >
                            <Calendar
                              mode="single"
                              selected={field.value}
                              className="font-bilingual"
                              captionLayout="dropdown"
                              onSelect={(date) => {
                                // normalize to local midnight to avoid timezone shift
                                const normalized =
                                  date instanceof Date
                                    ? new Date(
                                        date.getFullYear(),
                                        date.getMonth(),
                                        date.getDate()
                                      )
                                    : date;
                                field.onChange(normalized);
                                setDobOpen(false);
                              }}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Province */}
                  <FormField
                    control={form.control}
                    name="province"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("place-of-birth")}{" "}
                          <span className="text-red-600">*</span>
                        </FormLabel>
                        <Popover
                          open={provinceOpen}
                          onOpenChange={setProvinceOpen}
                        >
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={provinceOpen}
                                className={cn(
                                  "w-full py-7 bg-whitesmoke justify-between font-normal hover:bg-whiesmoke",
                                  field.value
                                    ? "text-accent-foreground"
                                    : "text-muted-foreground"
                                )}
                              >
                                {(() => {
                                  const selected = provinces.find(
                                    (p) => p.englishName === field.value
                                  );
                                  return selected
                                    ? localize(
                                        selected.englishName,
                                        getKhmerName(
                                          selected as unknown as Record<
                                            string,
                                            unknown
                                          >
                                        )
                                      )
                                    : t("select-place-of-birth");
                                })()}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent
                            className="!w-full min-w-[300px] max-h-[200px] p-0"
                            align="end"
                          >
                            <Command>
                              <CommandInput
                                placeholder={t("search-address")}
                                className="h-9"
                              />
                              <CommandList>
                                <CommandEmpty>{t("not-found")}</CommandEmpty>
                                <CommandGroup>
                                  {provinces.map((province) => {
                                    const kh = getKhmerName(
                                      province as unknown as Record<
                                        string,
                                        unknown
                                      >
                                    );
                                    return (
                                      <CommandItem
                                        key={province.uuid}
                                        value={`${province.englishName} ${
                                          kh ?? ""
                                        }`}
                                        onSelect={() => {
                                          field.onChange(province.englishName);
                                          setProvinceOpen(false);
                                        }}
                                      >
                                        {localize(province.englishName, kh)}
                                        <Check
                                          className={cn(
                                            "ml-auto h-4 w-4",
                                            field.value === province.englishName
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                      </CommandItem>
                                    );
                                  })}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Grade (only for scholarship) */}
                  {isScholarship && (
                    <FormField
                      control={form.control}
                      name="grade"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {t("grade")} <span className="text-red-600">*</span>
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value ?? ""}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full py-7 bg-whitesmoke">
                                <SelectValue placeholder={t("select-grade")} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>{t("select-grade")}</SelectLabel>
                                <SelectItem value="Grade A">
                                  {t("grade-a")}
                                </SelectItem>
                                <SelectItem value="Grade B">
                                  {t("grade-b")}
                                </SelectItem>
                                <SelectItem value="Grade C">
                                  {t("grade-c")}
                                </SelectItem>
                                <SelectItem value="Grade D">
                                  {t("grade-d")}
                                </SelectItem>
                                <SelectItem value="Other">
                                  {t("other")}
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {/* University */}
                  <FormField
                    control={form.control}
                    name="university"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("university")}{" "}
                          <span className="text-red-600">*</span>
                        </FormLabel>
                        <Popover
                          open={universityOpen}
                          onOpenChange={setUniversityOpen}
                        >
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={universityOpen}
                                className={cn(
                                  "w-full py-7 bg-whitesmoke justify-between font-normal hover:bg-whitesmoke",
                                  field.value
                                    ? "text-accent-foreground"
                                    : "text-muted-foreground"
                                )}
                              >
                                {(() => {
                                  const selected = universities.find(
                                    (u) => u.englishName === field.value
                                  );
                                  return selected
                                    ? localize(
                                        selected.englishName,
                                        getKhmerName(
                                          selected as unknown as Record<
                                            string,
                                            unknown
                                          >
                                        )
                                      )
                                    : t("select-university");
                                })()}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent
                            className=" max-w-xl min-w-sm p-0"
                            align="end"
                          >
                            <Command>
                              <CommandInput
                                placeholder={t("search-university")}
                                className="h-9"
                              />
                              <CommandList>
                                <CommandEmpty>{t("not-found")}</CommandEmpty>
                                <CommandGroup>
                                  {universities.map((u) => {
                                    const kh = getKhmerName(
                                      u as unknown as Record<string, unknown>
                                    );
                                    return (
                                      <CommandItem
                                        key={u.uuid}
                                        value={`${u.englishName} ${kh ?? ""}`}
                                        onSelect={() => {
                                          field.onChange(u.englishName);
                                          setUniversityOpen(false);
                                        }}
                                      >
                                        {localize(u.englishName, kh)}
                                        <Check
                                          className={cn(
                                            "ml-auto h-4 w-4",
                                            field.value === u.englishName
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                      </CommandItem>
                                    );
                                  })}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* How long programming (only for scholarship) */}
                  {isScholarship && (
                    <FormField
                      control={form.control}
                      name="howLongProgramming"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bilingual">
                            {t("how-long-have-you-been-learning-programming")}
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value ?? ""}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full py-7 bg-whitesmoke">
                                <SelectValue
                                  placeholder={t("select-month-or-year")}
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>
                                  {t("select-month-or-year")}
                                </SelectLabel>
                                <SelectItem value="Less than 3 months">
                                  {t("less-than-3-months")}
                                </SelectItem>
                                <SelectItem value="Less than 6 months">
                                  {t("less-than-6-months")}
                                </SelectItem>
                                <SelectItem value="Less than 12 months">
                                  {t("less-than-12-months")}
                                </SelectItem>
                                <SelectItem value="More than 1 year">
                                  {t("more-than-1-year")}
                                </SelectItem>
                                <SelectItem value="Never">
                                  {t("never")}
                                </SelectItem>
                                <SelectItem value="Other">
                                  {t("other")}
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {/* How do you know ISTAD (only for scholarship) */}
                  {isScholarship && (
                    <FormField
                      control={form.control}
                      name="howDoYouKnewISTAD"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bilingual">
                            {t("how-do-you-know-istad")}
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder={t("message")}
                              className="resize-none w-full sm:py-10 py-8"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {/* Opening Program */}
                  <FormField
                    control={form.control}
                    name="openingProgramUuid"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("opening-program")}
                          <span className="text-red-600">*</span>
                        </FormLabel>
                        <Popover
                          // prevent opening when page-level program is scholarship (locked)
                          open={openingProgramOpen && !isPageScholarship}
                          onOpenChange={(open) => {
                            if (!isPageScholarship) setOpeningProgramOpen(open);
                          }}
                        >
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={
                                  openingProgramOpen && !isPageScholarship
                                }
                                className={cn(
                                  "w-full py-7 bg-whitesmoke justify-between font-normal hover:bg-whitesmoke font-bilingual",
                                  field.value
                                    ? "text-accent-foreground"
                                    : "text-muted-foreground"
                                )}
                                // disable when the page is scholarship (locked)
                                disabled={isPageScholarship}
                                title={
                                  isPageScholarship
                                    ? "opening-program-locked"
                                    : undefined
                                }
                              >
                                {field.value
                                  ? openingPrograms?.find(
                                      (p) => p.uuid === field.value
                                    )?.programName ||
                                    openingProgram?.programName
                                  : t("select-opening-program")}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent
                            className="!w-full min-w-[300px] maxh-[200px] p-0 font-inter"
                            align="end"
                          >
                            <Command>
                              <CommandInput
                                placeholder={t("search-opening-program")}
                                className="h-9 font-bilingual"
                              />
                            </Command>
                            <Command>
                              <CommandList>
                                <CommandEmpty>{t("not-found")}</CommandEmpty>
                                <CommandGroup>
                                  {filteredOpeningPrograms?.map((p) => {
                                    const rec = p as Record<string, unknown>;
                                    const uuid = String(rec.uuid ?? "");
                                    const name = String(
                                      rec.programName ?? rec.programName ?? ""
                                    );
                                    return (
                                      <CommandItem
                                        className="font-inter"
                                        key={uuid || name}
                                        value={name}
                                        onSelect={() => {
                                          // ignore selection when page is locked to scholarship
                                          if (isPageScholarship) return;
                                          const next =
                                            uuid === field.value ? "" : uuid;
                                          field.onChange(next);
                                          form.setValue("classUuid", "");
                                          setOpeningProgramOpen(false);
                                        }}
                                      >
                                        {name}
                                        <Check
                                          className={cn(
                                            "ml-auto h-4 w-4",
                                            field.value === uuid
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                      </CommandItem>
                                    );
                                  })}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Class Selection (Shift) */}
                  <FormField
                    control={form.control}
                    name="classUuid"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("shift")} <span className="text-red-600">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl className="w-full py-7 bg-whitesmoke">
                            <SelectTrigger>
                              <SelectValue placeholder={t("select-shift")} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {classes.map((cls) => (
                              <SelectItem
                                className="font-bilingual"
                                key={cls.uuid}
                                value={cls.uuid}
                              >
                                {localizeShift(cls.shift, isKh)}{" "}
                                {isKh
                                  ? WEEK_TEXT.kh[
                                      cls.isWeekend ? "weekend" : "weekday"
                                    ]
                                  : WEEK_TEXT.en[
                                      cls.isWeekend ? "weekend" : "weekday"
                                    ]}{" "}
                                | {toHHmm(cls.startTime)} -{" "}
                                {toHHmm(cls.endTime)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Second Column */}
                <div className="flex flex-col gap-6">
                  {/* Full Name (kh) */}
                  <FormField
                    control={form.control}
                    name="khmerName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("full-name-kh")}{" "}
                          <span className="text-red-600">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="តុង បូរា"
                            className="py-7 bg-whitesmoke"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Current Address */}
                  <FormField
                    control={form.control}
                    name="currentAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("current-address")}
                          <span className="text-red-600">*</span>
                        </FormLabel>
                        <Popover
                          open={addressOpen}
                          onOpenChange={setAddressOpen}
                        >
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={addressOpen}
                                className={cn(
                                  "w-full py-7 bg-whitesmoke justify-between font-normal hover:bg-whitesmoke",
                                  field.value
                                    ? "text-accent-foreground"
                                    : "text-muted-foreground"
                                )}
                              >
                                {(() => {
                                  const selected = addresses.find(
                                    (a) => a.englishName === field.value
                                  );
                                  return selected
                                    ? localize(
                                        selected.englishName,
                                        getKhmerName(
                                          selected as unknown as Record<
                                            string,
                                            unknown
                                          >
                                        )
                                      )
                                    : t("select-current-address");
                                })()}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent
                            className="!w-full min-w-[300px] max-h-[200px] p-0"
                            align="end"
                          >
                            <Command>
                              <CommandInput
                                placeholder={t("search-address")}
                                className="h-9"
                              />
                              <CommandList>
                                <CommandEmpty>{t("not-found")}</CommandEmpty>
                                <CommandGroup>
                                  {addresses.map((address) => {
                                    const kh = getKhmerName(
                                      address as unknown as Record<
                                        string,
                                        unknown
                                      >
                                    );
                                    return (
                                      <CommandItem
                                        key={address.uuid}
                                        value={`${address.englishName} ${
                                          kh ?? ""
                                        }`}
                                        onSelect={() => {
                                          field.onChange(address.englishName);
                                          setAddressOpen(false);
                                        }}
                                      >
                                        {localize(address.englishName, kh)}
                                        <Check
                                          className={cn(
                                            "ml-auto h-4 w-4",
                                            field.value === address.englishName
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                      </CommandItem>
                                    );
                                  })}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Phone Number */}
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("phone-number")}{" "}
                          <span className="text-red-600">*</span>
                        </FormLabel>
                        <FormControl className="w-full font-bilingual">
                          <PhoneInput
                            className="font-bilingual"
                            defaultCountry="KH"
                            placeholder="077 815 896"
                            value={
                              typeof field.value === "string" ? field.value : ""
                            }
                            onChange={(val: string) =>
                              field.onChange(val ?? "")
                            }
                            onBlur={field.onBlur}
                            name={field.name}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Education Qualification */}
                  <FormField
                    control={form.control}
                    name="educationQualification"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("education-qualification")}{" "}
                          <span className="text-red-600">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full py-7 bg-whitesmoke">
                              <SelectValue
                                placeholder={t(
                                  "select-education-qualification"
                                )}
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>
                                {t("select-education-qualification")}
                              </SelectLabel>
                              {eduQual.map((q) => {
                                const label = isKh
                                  ? q.khmerName
                                  : q.englishName;
                                return (
                                  <SelectItem
                                    key={q.uuid}
                                    value={q.englishName}
                                  >
                                    {label}
                                  </SelectItem>
                                );
                              })}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Year */}
                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("year")} <span className="text-red-600">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full py-7 bg-whitesmoke">
                              <SelectValue placeholder={t("select-year")} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>{t("select-year")}</SelectLabel>
                              {yearData.map((q) => {
                                const label = isKh
                                  ? q.khmerName
                                  : q.englishName;
                                return (
                                  <SelectItem
                                    key={q.uuid}
                                    value={q.englishName}
                                  >
                                    {label}
                                  </SelectItem>
                                );
                              })}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Major */}
                  <FormField
                    control={form.control}
                    name="major"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("major")} <span className="text-red-600">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full py-7 bg-whitesmoke">
                              <SelectValue placeholder={t("select-major")} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>{t("select-major")}</SelectLabel>
                              {majorData.map((q) => {
                                const label = isKh
                                  ? q.khmerName
                                  : q.englishName;
                                return (
                                  <SelectItem
                                    key={q.uuid}
                                    value={q.englishName}
                                  >
                                    {label}
                                  </SelectItem>
                                );
                              })}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("email")} <span className="text-red-600">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="w-full py-7 bg-whitesmoke font-inter"
                            placeholder="tongbora.official@gmail.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Any Request (only for scholarship) */}
                  {isScholarship && (
                    <FormField
                      control={form.control}
                      name="request"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bilingual">
                            {t("any-request")}
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder={t("message")}
                              className="resize-none w-full sm:py-10 py-8  bg-whitesmoke"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {/* Upload Image */}
                  <FormField
                    control={form.control}
                    name="avatar"
                    render={() => (
                      <FormItem>
                        <FormLabel>{t("picture-file")}</FormLabel>
                        <FormControl>
                          <FileUploader
                            value={files}
                            onValueChange={setFiles}
                            dropzoneOptions={{
                              maxFiles: 5,
                              maxSize: 1024 * 1024 * 4,
                              multiple: true,
                              accept: { "image/*": [] },
                            }}
                            className="relative bg-background rounded-lg p-2"
                          >
                            <FileInput
                              id="fileInput"
                              className="outline-dashed outline-1 outline-slate-500"
                            >
                              <div className="flex items-center justify-center flex-col p-8 w-full ">
                                <CloudUpload className="text-gray-500 w-10 h-10" />
                                <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                                  <span className="font-semibold">
                                    {t("picture")}
                                  </span>
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {t("upload-picture")}
                                </p>
                                <p className="text-xs font-bilingual text-gray-500 dark:text-gray-400">
                                  {t("type-of-file")}
                                </p>
                              </div>
                            </FileInput>
                          </FileUploader>
                        </FormControl>

                        {files?.length ? (
                          <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                            {files.map((file, i) => (
                              <div key={i} className="relative group">
                                {previews[i] ? (
                                  <Image
                                    src={previews[i]}
                                    alt={file.name}
                                    width={160}
                                    height={160}
                                    unoptimized
                                    className="h-32 w-32 rounded-lg object-cover border"
                                  />
                                ) : (
                                  <div className="h-32 w-32 rounded-lg border bg-muted/30 flex items-center justify-center">
                                    <Paperclip className="h-6 w-6 text-muted-foreground" />
                                  </div>
                                )}
                                <button
                                  type="button"
                                  onClick={() => removeFile(i)}
                                  className="absolute cursor-pointer top-1 right-1 rounded  text-white bg-secondary/90 hover:bg-secondary/70 p-1 transition"
                                  aria-label="Remove image"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                                <p className="mt-1 w-32 truncate text-xs text-foreground/80">
                                  {file.name}
                                </p>
                              </div>
                            ))}
                          </div>
                        ) : null}

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end py-6">
                <Button
                  type="submit"
                  className="w-full py-6 sm:w-auto sm:max-w-md cursor-pointer text-white border-primary dark:hover:bg-primary/90 px-8 bg-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t("enroll-now") + "..." : t("enroll-now")}
                </Button>
              </div>
            </form>
          </Form>
        </div>

        {/* Bakong QR after enrollment success */}
        {bakongOpen && bakongEnrollmentUuid && (
          <Bakong
            openingProgramUuid={bakongOpeningProgramUuid as string}
            open={bakongOpen}
            amount={bakongAmount}
            enrollmentUuid={bakongEnrollmentUuid}
            onQrReady={() => setWaitingForQr(false)}
            onClose={() => {
              setBakongOpen(false);
              setWaitingForQr(false);
            }}
          />
        )}
      </div>

      {/* Toaster (styled) */}
      <Toaster
        position="top-right"
        richColors
        closeButton
        expand
        toastOptions={{
          classNames: {
            toast: "bg-background text-foreground border border-border",
            title: "text-foreground",
            description: "text-muted-foreground",
            actionButton: "bg-primary text-primary-foreground",
            cancelButton: "bg-muted text-foreground",
          },
        }}
      />
    </>
  );
}
