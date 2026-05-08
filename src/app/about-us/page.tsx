import AboutUsDetailpage from "@/app/about-us/AboutUsDetailPage"
export const metadata = {
  title: "About exSTAD | IT Training Program Platform for Cambodian Students",
  description:
    "Learn about exSTAD, the platform helping Cambodian students discover ISTAD's IT short courses and scholarships. Explore opportunities, programs, and apply directly through exSTAD.",
  keywords: [
    "exSTAD about",
    "ISTAD scholarships",
    "IT training programs Cambodia",
    "Cambodian students IT careers",
    "exSTAD mission",
    "scholarship application platform",
    "technology education Cambodia",
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About exSTAD | IT Career Platform for Cambodian Students",
    description:
      "Discover exSTAD, the platform helping Cambodian students launch IT careers through ISTAD scholarships and training programs. Learn about our mission and values.",
    url: "https://www.exstad.tech/",
    siteName: "exSTAD",
    locale: "en_US",
    type: "website",
  },
};


export default function AboutUsPage() {
  return <AboutUsDetailpage />;
}
