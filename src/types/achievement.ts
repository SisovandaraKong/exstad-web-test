interface Audit {
  createdBy: string;
  updatedBy: string | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface ScholarAchievement {
  uuid: string;
  achievement: {
    uuid: string;
    title: string;
    description: string;
    icon: string;
    program: string;
    achievementType: "FINAL_PROJECT" | string;
    tag: string;
    video: string;
    link: string;
    audit: Audit;
  };
  audit: Audit;
}

export type ScholarAchievementsResponse = ScholarAchievement[];
