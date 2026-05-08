// app/explore-course/page.tsx
import ExploreProgramPageClient from "@/components/program/components/ExploreComponent";
import type { Metadata } from "next";

// Metadata for SEO (server-side)
export const metadata: Metadata = {
  title: "Explore ISTAD Courses & Scholarships | EXSTAD",
  description:
    "Browse and explore ISTAD programs, scholarships, and short courses on EXSTAD. Find open programs, filter by level, type, or keywords, and kickstart your learning journey.",
  keywords: [
    "EXSTAD",
    "ISTAD Courses",
    "Scholarships",
    "Short Courses",
    "Bachelor Scholarship",
    "Pre-University Scholarship",
    "IT Skills",
    "Full Stack Development",
    "Pre University",
    "Foundation Scholarship",
    "IT Expert Scholarship",
    "IT Professional Scholarship",
    "ISTAD",
    "CSTAD",
    "EXSTAD",
    "Short Courses",
    "ISTAD Short Courses",
    "Flutter Course",
    "iOS Development",
    "Android Development",
    "SQL and PostgreSQL",
    "Web Design Course",
    "DevOps Engineering",
    "C++ Programming",
    "Docker Course",
    "Data Analytics",
    "NEXT.js Course",
    "Linux Administration",
    "Spring Framework",
    "Blockchain Development",
    "Java Programming",
    "Tech Courses Cambodia",
    "Professional Training",
    "Skill Development",
    "Hands-on Learning",
    "IT Skills",
    "Full Stack Development",
    "Scholarships",
    "Student Learning Platform",
    "Open Programs",
    "Program Explorer",
    "Student Learning Platform",
    "Tech Education Cambodia",
    "Online Courses",
    "Hands-on Learning",
    "Cambodia Scholarships",
    "Open Programs",
    "Program Explorer",
  ],
  metadataBase: new URL("https://www.exstad.tech/"),
  alternates: { canonical: "/explore-course" },
  openGraph: {
    type: "website",
    title: "Explore ISTAD Courses & Scholarships | EXSTAD",
    description:
      "Discover and filter ISTAD programs, scholarships, and short courses on EXSTAD. Access open programs and find the perfect learning opportunity.",
    url: "https://www.exstad.tech/explore-course",
    siteName: "EXSTAD",
    images: [
      {
        url: "https://i.postimg.cc/9fdsMbhW/292288986-112580688176704-7615104361272795142-n.png",
        width: 1200,
        height: 630,
        alt: "EXSTAD Logo - Explore ISTAD Courses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Explore ISTAD Courses & Scholarships | EXSTAD",
    description:
      "Browse open ISTAD programs and scholarships on EXSTAD. Filter by type, level, or program and find your next learning opportunity.",
    images: [
      "https://i.postimg.cc/9fdsMbhW/292288986-112580688176704-7615104361272795142-n.png",
    ],
    creator: "@exstad",
  },
};

export default function ExploreProgramPageWrapper() {
  return <ExploreProgramPageClient />;
}
