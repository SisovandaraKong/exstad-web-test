// "use client";

// import React from "react";
// import { ProfileSection } from "@/components/student/ProfileSection";
// import ProfilePortfolioSetting from "@/components/student/ProfilePortfolioSetting";

// export default function SettingPage({ params }: { params: Promise<{ username: string }> }) {
//   // ✅ unwrap the params promise
//   const { username } = React.use(params);

//   return (
//     <div className="flex flex-col gap-16">
//       {/* 🔹 Top section */}
//       <ProfileSection username={username} />

//       {/* 🔹 Editable portfolio section */}
//       <div className="-mt-10 md:-mt-16">
//         <ProfilePortfolioSetting username={username} />
//       </div>
//     </div>
//   );
// }

"use client";
import ProfilePortfolio from "@/components/student/ProfilePortfolio";
import ProfilePortfolioSetting from "@/components/student/ProfilePortfolioSetting";
import { ProfileSection } from "@/components/student/ProfileSection";
import SharedScrollAvatar from "@/components/student/SharedScrollAvatar";
import { useSession } from "next-auth/react";
import { useRef } from "react";

const BLUR =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzUwIiBoZWlnaHQ9IjM1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCBmaWxsPSIjZWVlIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PC9zdmc+";

export default function SettingPage() {
  const { data: session } = useSession();

  const topAnchor = useRef<HTMLDivElement>(null);
  const bottomAnchor = useRef<HTMLDivElement>(null);

  return (
    <div className="relative">
      <SharedScrollAvatar
        username={session?.user.username ?? ""}
        topAnchor={topAnchor}
        bottomAnchor={bottomAnchor}
        topSize={350}
        bottomSize={192}
        viewportOffsetTop={72}
      />

      <div className="flex flex-col gap-16">
        <ProfileSection
          username={session?.user.username ?? ""}
          avatarAnchorRef={topAnchor}
        />
        <div className="-mt-10 md:-mt-16">
          <ProfilePortfolio
            username={session?.user.username ?? ""}
            avatarAnchorRef={bottomAnchor}
          />
        </div>
      </div>
    </div>
  );
}
