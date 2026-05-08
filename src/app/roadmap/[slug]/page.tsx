import { Metadata } from "next";
import { MasterProgramType } from "@/types/master-program";
import RoadMapDetailClient from "@/app/roadmap/[slug]/RoadMapDetailpage"
interface RoadmapPageParams {
  slug: string;
}

// Fetch master program for metadata
async function getProgramData(slug: string): Promise<MasterProgramType | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/programs/slug/${slug}`,
      { 
        cache: "no-store",
        next: { revalidate: 0 }
      }
    );
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Error fetching program for roadmap:", error);
    return null;
  }
}

// Generate metadata for roadmap
export async function generateMetadata({
  params,
}: {
  params: Promise<RoadmapPageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const program = await getProgramData(slug);

  // Default metadata for 404
  if (!program) {
    return {
      title: "Roadmap Not Found | EXSTAD",
      description: "Explore our program roadmaps at EXSTAD.",
      openGraph: {
        title: "Roadmap Not Found | EXSTAD",
        description: "Explore our program roadmaps at EXSTAD.",
        images: [`${process.env.NEXT_PUBLIC_BASE_URL}/default-og.jpg`],
      },
    };
  }

  return {
    title: `${program.title} - Roadmap | EXSTAD`,
    description: `Explore the learning roadmap for ${program.title}. ${
      program.subtitle || "Discover the path to mastering this program."
    }`,
    openGraph: {
      title: `${program.title} - Roadmap | EXSTAD`,
      description: `Explore the learning roadmap for ${program.title}. ${
        program.subtitle || "Discover the path to mastering this program."
      }`,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/explore-course/${slug}/roadmap`,
      images: [
        {
          url: program.logoUrl || `${process.env.NEXT_PUBLIC_BASE_URL}/default-og.jpg`,
          width: 1200,
          height: 630,
          alt: `${program.title} Roadmap`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${program.title} - Roadmap | EXSTAD`,
      description: `Explore the learning roadmap for ${program.title}.`,
      images: [
        program.logoUrl || `${process.env.NEXT_PUBLIC_BASE_URL}/default-og.jpg`,
      ],
    },
  };
}

// Server Component
export default async function RoadmapDetailPage({
  params,
}: {
  params: Promise<RoadmapPageParams>;
}) {
  const { slug } = await params;
  const program = await getProgramData(slug);

  if (!program) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Roadmap Not Found</h1>
          <p className="text-muted-foreground">
            The program roadmap you are looking for does not have exist.
          </p>
        </div>
      </div>
    );
  }

  return <RoadMapDetailClient initialProgram={program} />;
}