import { Metadata } from "next";
import ProgramDetailClient from "./OpeningProgramDetail";
import { MasterProgramType } from "@/types/master-program";
import { openingProgramType } from "@/types/opening-program";
import NotFoundProgram from "@/components/program/components/NotFound";

// Params type
interface ProgramPageParams {
  slug: string;
}

// Fetch master program
async function getProgramData(slug: string): Promise<MasterProgramType | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/programs/slug/${slug}`,
    { cache: "no-store" }
  );
  if (!res.ok) return null;
  const data = await res.json();
  return data ?? null;
}

// Fetch opening program
async function getOpeningProgramData(slug: string): Promise<openingProgramType | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/opening-programs/slug/${slug}`,
    { cache: "no-store" }
  );
  if (!res.ok) return null;
  const data = await res.json();
  return data ?? null;
}

// Generate metadata using opening program posterUrl
export async function generateMetadata({ params }: { params: Promise<ProgramPageParams> }): Promise<Metadata> {
  const { slug } = await params;
  const program = await getProgramData(slug);
  const openingProgram = await getOpeningProgramData(slug);

  if (!program) {
    return {
      title: "Program Not Found | EXSTAD",
      description: "Explore our wide range of courses and programs at EXSTAD.",
      openGraph: {
        title: "Program Not Found | EXSTAD",
        description: "Explore our wide range of courses and programs at EXSTAD.",
        images: [`${process.env.NEXT_PUBLIC_BASE_URL}/default-og.jpg`],
      },
    };
  }

  return {
    title: `${program.title} | EXSTAD`,
    description: program.subtitle || "Join our professional programs today!",
    openGraph: {
      title: `${program.title} | EXSTAD`,
      description: program.subtitle || "Join our professional programs today!",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/explore-course/${program.slug}`,
      images: [
        {
          url: openingProgram?.posterUrl || `${process.env.NEXT_PUBLIC_BASE_URL}/default-og.jpg`,
          width: 1200,
          height: 630,
          alt: program.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${program.title} | EXSTAD`,
      description: program.subtitle || "Join our professional programs today!",
      images: [openingProgram?.posterUrl || `${process.env.NEXT_PUBLIC_BASE_URL}/default-og.jpg`],
    },
  };
}

// Server Component
export default async function ProgramDetailPage({ params }: { params: Promise<ProgramPageParams> }) {
  const { slug } = await params;
  const program = await getProgramData(slug);

  if (!program) {
    return <NotFoundProgram title="Program not found"/>;
  }

  return <ProgramDetailClient initialProgram={program} />;
}