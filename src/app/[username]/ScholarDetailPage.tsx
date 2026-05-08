"use client";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useRef } from "react";
import { ProfileSection } from "@/components/student/ProfileSection";
import ProfilePortfolio from "@/components/student/ProfilePortfolio";
import SharedScrollAvatar from "@/components/student/SharedScrollAvatar";

export default function ScholarDetailPage() {
  const params = useParams();
  const username = params.username as string;
  const { data: session } = useSession();
  const router = useRouter();

  const topAnchor = useRef<HTMLDivElement>(null);
  const bottomAnchor = useRef<HTMLDivElement>(null);

  if (session?.user?.username === username) {
    router.push("/me");
  }

  return (
    <div className="relative">
      <SharedScrollAvatar
        username={username}
        topAnchor={topAnchor}
        bottomAnchor={bottomAnchor}
        topSize={350}
        bottomSize={192}
        viewportOffsetTop={72}
      />

      <div className="flex flex-col gap-16">
        <ProfileSection username={username} avatarAnchorRef={topAnchor} />
        <div className="-mt-10 md:-mt-16">
          <ProfilePortfolio
            username={username}
            avatarAnchorRef={bottomAnchor}
          />
        </div>
      </div>
    </div>
  );
}
