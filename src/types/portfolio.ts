export interface SocialLink {
  uuid: string;
  title: string;
  link: string;
  isActive: boolean;
}

export interface Certificate {
  id: number;
  logo: string;
  title: string;
}

export interface Achievement {
  id: number;
  logo: string;
  title: string;
  description: string;
  link: string;
  demo: string;
  date: string;
  type: string;
}

export interface CompletedCourse {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  bgColor: string;
  leftText: string;
  rightText: string;
}

export interface Scholar {
  uuid: string;
  email?: string;
  socialLinks?: SocialLink[];
  avatar?: string;
  englishName?: string;
  khmerName?: string;
  university?: string;
  role?: string;
  bio?: string;
  username: string;
}
