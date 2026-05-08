import RoadmapPageClient from "@/app/roadmap/RoadMapPage"

export const metadata = {
  title: "Roadmap | exSTAD",
  description:
    "Discover the roadmap to tech mastery with exSTAD — a structured guide that helps Cambodian students build IT skills, explore ISTAD programs, and grow into confident developers.",
  keywords: [
    "exSTAD roadmap",
    "ISTAD roadmap",
    "CSTAD roadmap",
    "EXSTAD roadmap",
    "ISTAD programs",
    "IT career Cambodia",
    "tech learning path",
    "ISTAD scholarships",
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
  openGraph: {
    title: "Roadmap to Tech Mastery | exSTAD",
    description:
      "Follow the exSTAD roadmap to develop the right IT skills and explore ISTAD programs designed to help you grow your tech career.",
    url: "https://www.exstad.tech/roadmap",
    siteName: "exSTAD",
    locale: "en_US",
    type: "website",
  },
};

export default function RoadmapPage() {
  return <RoadmapPageClient />;
}
