import { Audit } from "../audit/audit";

// Backend enums
export type Gender = "MALE" | "FEMALE" | "OTHER";
export type Role = "SCHOLAR" | "ADMIN" | "STAFF";
export type ScholarStatus = "ACTIVE" | "SUSPENDED" | "DROPPED" | "GRADUATED";

export type Specialist = {
  uuid: string;
  country?: string | null;
  specialist?: string | null;
  universityName?: string | null;
  about?: string | null;
  degreeType?: string | null;
};

export type Career = {
  uuid: string;
  salary?: number | string | null;
  company?: string | null;
  position?: string | null;
  interest?: string | null;
  companyType?: string | null;
};

export type BadgeResponse = {
  uuid: string;
  name?: string | null;
  imageUrl?: string | null;
  description?: string | null;
};

export type ScholarBadgeForScholarResponse = {
  uuid: string;
  completionDate?: string | null; // LocalDate -> ISO date string
  badge: BadgeResponse;
};

export type ScholarResponse = {
  uuid: string;
  username: string;
  phoneNumber?: string;

  email?: string | null;
  englishName?: string | null;
  khmerName?: string | null;

  gender?: Gender | null;
  dob?: string | null;
  role?: Role | null;

  university?: string | null;
  province?: string | null;
  currentAddress?: string | null;

  nickname?: string | null;
  bio?: string | null;

  specialist?: Specialist[] | null;
  careers?: Career[] | null;
  completedCourses?: string[] | null;

  avatar?: string | null;
  phoneFamilyNumber?: string | null;
  quote?: string | null;

  audit?: Audit;

  isPublic?: boolean | null;
  isAbroad?: boolean | null;
  isEmployed?: boolean | null;

  status?: ScholarStatus | null;

  badges?: ScholarBadgeForScholarResponse[] | null;
};
