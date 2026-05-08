import { Metadata } from "next";
import HeroScholars from "@/components/scholar/Scholar";

// Generate metadata for scholars page
export const metadata: Metadata = {
  title: "Scholars | EXSTAD",
  description: "Meet ISTAD's exceptional scholars who have transformed their learning journey into successful careers. Discover stories of students studying at top universities in Korea, working at leading tech companies, and making their mark in the IT industry.",
  keywords: [
    "ISTAD scholars",
    "abroad scholars",
    "Pukyong National University",
    "AI Convergence",
    "IT students Cambodia",
    "study in Korea",
    "tech careers Cambodia",
    "ISTAD alumni",
    "success stories",
    "scholarship program",
    "CSTAD scholars",
    "EXSTAD scholars"
  ],
  openGraph: {
    title: "Scholars | EXSTAD",
    description: "The journey of our abroad scholars - where learning turns into leadership and dreams into reality. Meet students from ISTAD who are now pursuing PhDs, Masters, and successful careers in technology.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/scholars`,
    siteName: "EXSTAD",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Scholars - From Classrooms to Careers | EXSTAD",
    description: "Meet ISTAD's exceptional scholars pursuing higher education and successful careers in technology.",
    creator: "@ISTAD", 
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/scholars`,
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
};

// Server Component
export default function ScholarPage() {
  return (
    <main className="">
      <HeroScholars />
    </main>
  );
}