/** @format */

import { TeamData } from "@/types/team";

// Define proper return types
type MentorData = TeamData["mentors"];
type MemberData = TeamData["members"];

// Team member data - simulating data that would come from an API
export const teamData: TeamData = {
	mentors: {
		chhaya: {
			name: "Chan Chhaya",
			role: "Senior Mentor",
			image: "/team/mt_chhaya.JPG",
			bio: "Experienced full-stack developer with 8+ years in web development and mentoring.",
			experience: "8+ years",
			specialization: [
				"Full Stack Development",
				"Spring",
				"Microservices",
				"Java",
			],
			social: {
				facebook: "https://www.facebook.com/chhayadevkh",
				github: "https://github.com/it-chhaya",
				telegram: "https://t.me/chhayadevkh",
			},
		},
		lyzia: {
			name: "Eung Lyzia",
			role: "Technical Mentor",
			image: "/team/mt_lyzia.JPG",
			bio: "Frontend specialist with expertise in modern JavaScript frameworks and UI/UX design.",
			experience: "6+ years",
			specialization: [
				"Spring",
				"Frontend Development",
				"UI/UX Design",
				"JavaScript",
				"TypeScript",
			],
			social: {
				facebook: "https://www.facebook.com/lyzhia.eung",
				github: "https://github.com/lyzhiaa",
				telegram: "https://t.me/lyzhia",
			},
		},
	},
	members: {
		sambath: {
			name: "Srun O.Sambath",
			role: "Group Leader",
			image: "/team/sambath.JPG",
			bio: "Project leader with strong organizational skills and full-stack development experience.",
			skills: [
				"Leadership",
				"Project Management",
				"Full Stack Development",
				"Team Coordination",
			],
			social: {
				facebook: "https://www.facebook.com/share/1BQwL8DseK/?mibextid=wwXIfr",
				github: "https://github.com/srunoudomsambath",
				telegram: "https://t.me/srunoudomsambath",
			},
		},
		narak: {
			name: "Leng Narak",
			role: "Frontend Developer",
			image: "/team/narak.JPG",
			bio: "Creative designer focused on user experience and modern interface design.",
			skills: [
				"UI/UX Design",
				"Figma",
				"Adobe Creative Suite",
				"User Research",
				"Frontend Development",
			],
			social: {
				facebook: "https://www.facebook.com/share/1ARwNegGV7/?mibextid=wwXIfr",
				github: "https://github.com/Narak-168",
				telegram: "https://t.me/Narak_Leng",
			},
		},
		vanda: {
			name: "Kung Sovannda",
			role: "Full Stack Developer",
			image: "/team/vannda.JPG",
			bio: "Versatile developer with experience in both frontend and backend technologies.",
			skills: ["Spring", "Next.js", "TypeScript", "Java", "REST APIs", "SQL"],
			social: {
				facebook: "https://www.facebook.com/share/16NvHFMLN3/",
				github: "https://github.com/kungsovannda",
				telegram: "https://t.me/kungsovannda",
			},
		},
		dara: {
			name: "Kong Sisovandara",
			role: "Full Stack Developer",
			image: "/team/dara.JPG",
			bio: "Full stack developer with expertise in server architecture and database design.",
			skills: ["Spring", "Next.js", "TypeScript", "Java", "REST APIs", "SQL"],
			social: {
				facebook: "https://facebook.com/kmean.nakyljit",
				github: "https://github.com/SisovandaraKong",
				telegram: "https://t.me/sisovandaraKong",
			},
		},
		bora: {
			name: "Tong Bora",
			role: "Full Stack Developer",
			image: "/team/bora.JPG",
			bio: "Full stack developer passionate about creating responsive and interactive web applications.",
			skills: ["Spring", "Next.js", "TypeScript", "Java", "REST APIs", "SQL"],
			social: {
				facebook: "https://www.facebook.com/tongboraa",
				github: "https://github.com/tongbora",
				telegram: "https://t.me/tongboraa",
			},
		},
		menghouy: {
			name: "Teng Menghouy",
			role: "Frontend Developer",
			image: "/team/menghouy.JPG",
			bio: "Full-stack developer with a focus on modern web technologies and clean code practices.",
			skills: ["React", "Next.js", "TypeScript", "JavaScript", "CSS", "HTML"],
			social: {
				facebook: "https://www.facebook.com/share/1HcowJBeb6/",
				github: "https://github.com/TengMengHouy",
				telegram: "https://t.me/Menghouy1688",
			},
		},
		meyling: {
			name: "Chhun Meyling",
			role: "Frontend Developer",
			image: "/team/meyling.JPG",
			bio: "Dedicated full stack developer with a passion for building responsive web applications.",
			skills: [
				"Spring",
				"React",
				"Next.js",
				"TypeScript",
				"JavaScript",
				"CSS",
				"HTML",
			],
			social: {
				facebook: "https://www.facebook.com/share/17XhLoPS1R/?mibextid=wwXIfr",
				github: "https://github.com/ChhunMeyling",
				telegram: "https://t.me/chhun_meyling",
			},
		},
		sreynuch: {
			name: "Phum Sreynoch",
			role: "Frontend Developer",
			image: "/team/sreynoch.JPG",
			bio: "Creative full stack developer specializing in educational content and technical documentation.",
			skills: ["React", "Next.js", "TypeScript", "JavaScript", "CSS", "HTML"],
			social: {
				facebook: "https://www.facebook.com/share/16UND1s9oF/",
				github: "https://github.com/noch-08",
				telegram: "https://t.me/sreynoch_phum",
			},
		},
	},
};

// Helper functions to simulate API calls
export const getMentors = (): Promise<MentorData> => {
	return new Promise((resolve) => {
		// Simulate API delay
		setTimeout(() => {
			resolve(teamData.mentors);
		}, 100);
	});
};

export const getMembers = (): Promise<MemberData> => {
	return new Promise((resolve) => {
		// Simulate API delay
		setTimeout(() => {
			resolve(teamData.members);
		}, 100);
	});
};

export const getAllTeamData = (): Promise<TeamData> => {
	return new Promise((resolve) => {
		// Simulate API delay
		setTimeout(() => {
			resolve(teamData);
		}, 100);
	});
};
