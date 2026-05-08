import { Audit } from "../audit";
import { BadgeForScholar } from "../badge";
import { ScholarGender, ScholarStatus } from ".";
import { CompletedCourse } from "../portfolio";

export type Scholar = {
  completedCourses: CompletedCourse[];
  uuid: string;
  username: string;
  email: string;
  englishName: string;
  khmerName: string;
  gender: ScholarGender;
  status: ScholarStatus;
  dob: string;
  role: string;
  university: string;
  province: string;
  currentAddress: string;
  nickname: string;
  bio: string;
  avatar: string;
  phoneFamilyNumber: string;
  isPublic: boolean;
  isAbroad: boolean;
  quote: string;
  audit: Audit;
  badges: BadgeForScholar[];
};
