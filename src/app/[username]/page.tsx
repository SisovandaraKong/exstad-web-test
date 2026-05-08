import { Scholar } from "@/types/scholar";
import { Metadata } from "next";
import ScholarDetailPage from "./ScholarDetailPage";

interface PageParams {
  username: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { username } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/scholars/username/${username}`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) {
    return {
      title: "Scholar Not Found | EXSTAD",
      description:
        "Discover scholars, innovators, and technology leaders from EXSTAD.",
    };
  }

  const data = (await res.json()) as Scholar;

  const title = `${data.englishName} | EXSTAD Scholar`;
  const description =
    data.bio?.slice(0, 160) ||
    `Learn more about ${data.englishName}, a distinguished scholar at EXSTAD.`;
  const url = `https://www.exstad.tech/scholars/${username}`;
  const image = data.avatar || "https://www.exstad.tech/default-avatar.jpg";

  return {
    title,
    description,
    keywords: [
      data.englishName,
      "EXSTAD Scholar",
      "Technology",
      "Innovation",
      ...data.completedCourses.map((course) => course.title),
      "Education",
      "Research",
      "Student Excellence",
    ].filter(Boolean),
    authors: [{ name: data.englishName }],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "EXSTAD",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: data.englishName,
        },
      ],
      locale: "en_US",
      type: "profile",
      firstName: data.englishName.split(" ")[0],
      lastName: data.englishName.split(" ").slice(1).join(" "),
      username: data.username,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@exstad_tech",
    },
    metadataBase: new URL("https://www.exstad.tech"),
    other: {
      "og:type": "profile",
      "profile:username": data.username,
      "profile:first_name": data.englishName.split(" ")[0],
      "profile:last_name": data.englishName.split(" ").slice(1).join(" "),
      robots:
        "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
      googlebot: "index, follow",
    },
  };
}

export default function page() {
  return <ScholarDetailPage />;
}
