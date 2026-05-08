import type { Metadata } from "next";
import { Inter, Koh_Santepheap, Nunito_Sans } from "next/font/google";
import { cookies } from "next/headers";
import Footer from "@/components/footer/Footer";
import OnlineStatusIndicator from "@/components/offline/online-status-indicator";
import Navbar from "@/components/navbar/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import AuthProvider from "@/lib/auth-provider";
import I18nProvider from "@/lib/I18nProvider";
import Providers from "@/lib/providers";
import "./globals.css";
import AppToaster from "@/components/ui/app-toaster";
import { LanguageLoadingProvider } from "@/contexts/LanguageLoadingContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const koh = Koh_Santepheap({
  variable: "--font-koh",
  weight: "400",
  subsets: ["khmer"],
  display: "swap",
});

const nunito = Nunito_Sans({
  variable: "--font-nunito",
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.exstad.tech"),
  title: {
    default:
      "EXSTAD - Experimental Science and Technology Advanced Development",
    template: "%s | EXSTAD",
  },
  description:
    "EXSTAD: is a modern platform designed to empower Cambodian students to kickstart their IT careers. By connecting them with ISTAD's scholarships and training programs, students can easily explore and apply for opportunities that enhance their digital skills.",
  keywords: [
    "EXSTAD",
    "ISTAD",
    "CSTAD",
    "Institute of Science and Technology Advanced Development",
    "Cambodia Scholarship",
    "Bachelor degree scholarship",
    "Pre-University scholarship",
    "IT profession scholarship",
    "IT scholarship",
    "IT expert scholarship",
    "Information Technology",
    "Short Course",
    "IT Skills",
    "IT Roadmaps",
    "IT Foundation",
    "Full Stack Web Development",
    "អាហារូបករណ៍កម្ពុជា",
    "អាហារូបករណ៍បរិញ្ញាបត្រ",
    "អាហារូបករណ៍មុខវិជ្ជាព័ត៌មានវិទ្យា",
    "ជំនាញ IT",
    "Student Learning Platform",
    "Tech Education Cambodia",
    "Online Learning",
    "Project-Based Learning",
  ],
  authors: [{ name: "EXSTAD Team" }],
  creator: "EXSTAD",
  publisher: "EXSTAD",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      km: "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.exstad.tech",
    siteName: "EXSTAD",
    title: "EXSTAD - Student-Led Platform for ISTAD Courses & Scholarships",
    description:
      "Discover EXSTAD: Explore ISTAD courses, scholarships, and practical learning opportunities at CSTAD with a student-focused platform.",
    images: [
      {
        url: "https://i.postimg.cc/W1258VRQ/3.png",
        width: 1200,
        height: 630,
        alt: "EXSTAD Logo - Student Platform for ISTAD",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@exstad",
    creator: "@exstad",
    title: "EXSTAD - Student-Led Platform for ISTAD Courses & Scholarships",
    description:
      "EXSTAD offers a student-focused platform to explore ISTAD courses, scholarships, and hands-on learning at CSTAD.",
    images: ["https://i.postimg.cc/W1258VRQ/3.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code-here",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("locale")?.value;

  const internalLocale = cookieLocale === "kh" ? "kh" : cookieLocale ?? "en";
  const htmlLang = internalLocale === "kh" ? "km" : internalLocale;

  return (
    <html lang={htmlLang} suppressHydrationWarning>
      <head>
        {/* Structured Data - Educational Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              name: "EXSTAD",
              alternateName:
                "Experimental Science and Technology Advanced Development",
              url: "https://www.exstad.tech",
              logo: "https://www.exstad.tech/image/logo/exSTAD-01.png",
              description:
                "EXSTAD is a modern platform designed to empower Cambodian students to kickstart their IT careers. By connecting them with ISTAD's scholarships and training programs.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Phnom Penh",
                addressCountry: "KH",
              },
            }),
          }}
        />

        {/* Structured Data - Website with Search */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "EXSTAD",
              url: "https://www.exstad.tech",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://www.exstad.tech/",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        {/* Structured Data - Course/Educational Program */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Course",
              name: "ISTAD IT Training Programs",
              description:
                "Comprehensive IT training programs and scholarships for Cambodian students including Full Stack Development, IT Foundation, and specialized courses.",
              provider: {
                "@type": "Organization",
                name: "EXSTAD",
                sameAs: "https://www.exstad.tech",
              },
              educationalLevel: "Higher Education",
              inLanguage: ["en", "km"],
              availableLanguage: ["English", "Khmer"],
            }),
          }}
        />

        {/* Breadcrumb Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://www.exstad.tech",
                },
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${koh.variable} ${nunito.variable} antialiased relative bg-whitesmoke overflow-x-hidden`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <OnlineStatusIndicator />
          <Providers>
            <I18nProvider initialLocale={internalLocale}>
              <LanguageLoadingProvider>
                <AuthProvider>
                  <Navbar />
                  <main className="mt-20">
                    {children}
                    <AppToaster />
                  </main>
                  <Footer />
                </AuthProvider>
              </LanguageLoadingProvider>
            </I18nProvider>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
