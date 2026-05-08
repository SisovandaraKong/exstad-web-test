import { Audit } from "./audit";

export type Badge = {
  uuid: string;
  badgeImage: string;
  title: string;
  description: string;
  isDeleted: boolean;
  audit: Audit;
};

export type BadgeForScholar = {
  uuid: string;
  completionDate: string;
  badge: Badge;
};
