/** @format */

export interface SocialLinks {
	facebook: string;
	github: string;
	telegram: string;
	linkedin?: string;
	twitter?: string;
}

export interface TeamMember {
	name: string;
	role: string;
	image: string;
	social: SocialLinks;
	bio?: string;
	skills?: string[];
}

export interface Mentor extends TeamMember {
	experience?: string;
	specialization?: string[];
}

export interface TeamData {
	mentors: { [key: string]: Mentor };
	members: { [key: string]: TeamMember };
}
