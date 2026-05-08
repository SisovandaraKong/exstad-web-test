// app/our-program/short-courses/page.tsx
import type { Metadata } from "next";
import ShortCoursePage from "./ShortCoursePage";
export const metadata: Metadata = {
  title: "ISTAD Short Courses | Learn Flutter, iOS, Android, SQL, Web Design, DevOps, C++, Docker, Data Analytics, NEXT.js, Linux, Spring, Blockchain, and Java. Boost your skills and career with hands-on learning in Cambodia",
  description:
    "Explore ISTAD short courses in Flutter, iOS, Android, SQL, Web Design, DevOps, C++, Docker, Data Analytics, NEXT.js, Linux, Spring, Blockchain, and Java. Boost your skills and career with hands-on learning in Cambodia.",
  keywords: [
    "ISTAD",
    "Short Courses",
    "Flutter",
    "CSTAD",
    "Exstad Short Courses",
    "iOS Development",
    "Android Development",
    "SQL",
    "PostgreSQL",
    "Web Design",
    "DevOps",
    "C++",
    "Docker",
    "Data Analytics",
    "NEXT.js",
    "Linux",
    "Spring",
    "Blockchain",
    "Java",
    "Scholarship",
    "Tech Courses Cambodia",
    "Hands-on Learning",
    "Our Program"
  ],
  metadataBase: new URL("https://www.exstad.tech/"),
  alternates: { canonical: "/our-program/short-courses" },
  openGraph: {
    title: "ISTAD Short Courses | Learn Flutter, iOS, Android, Web, DevOps, and More",
    description:
      "Explore ISTAD short courses in Flutter, iOS, Android, SQL, Web Design, DevOps, C++, Docker, Data Analytics, NEXT.js, Linux, Spring, Blockchain, and Java. Boost your skills and career with hands-on learning in Cambodia.",
    url: "https://www.exstad.tech/our-program/short-courses",
    siteName: "EXSTAD",
    images: [
      {
        url: "https://scontent.fpnh11-1.fna.fbcdn.net/v/t39.30808-6/368678344_283065197807321_642903727610062012_n.png?stp=dst-jpg_tt6&_nc_cat=105&ccb=1-7&_nc_sid=86c6b0&_nc_ohc=sMkFl8GamJYQ7kNvwGbHLIX&_nc_oc=Adk9au9BIzRPi4fqWs3R8_66XEd4Gf6P2r7g7Eatz7Bg2klJxprI_0rQ4uDMa2JOCiI&_nc_zt=23&_nc_ht=scontent.fpnh11-1.fna&_nc_gid=CxUWi1Xl611pfxuddeYx5g&oh=00_Afc-Hc7EYhQdSxqLSPK9tsTPz_X6aWfzvmhYrt9xmodQtQ&oe=6908C9DD",
        width: 1200,
        height: 630,
        alt: "EXSTAD / ISTAD Short Courses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ISTAD Short Courses | EXSTAD",
    description:
      "Browse ISTAD short courses and scholarships — Flutter, iOS, Android, Web, DevOps, Docker, Data Analytics, NEXT.js, Spring, Blockchain, Java, and more.",
    images: ["https://scontent.fpnh11-1.fna.fbcdn.net/v/t39.30808-6/368678344_283065197807321_642903727610062012_n.png?stp=dst-jpg_tt6&_nc_cat=105&ccb=1-7&_nc_sid=86c6b0&_nc_ohc=sMkFl8GamJYQ7kNvwGbHLIX&_nc_oc=Adk9au9BIzRPi4fqWs3R8_66XEd4Gf6P2r7g7Eatz7Bg2klJxprI_0rQ4uDMa2JOCiI&_nc_zt=23&_nc_ht=scontent.fpnh11-1.fna&_nc_gid=CxUWi1Xl611pfxuddeYx5g&oh=00_Afc-Hc7EYhQdSxqLSPK9tsTPz_X6aWfzvmhYrt9xmodQtQ&oe=6908C9DD"],
    creator: "@exstad",
  },
};

export default function ShortCoursesPage() {
  return <ShortCoursePage />
}
