/** @format */

export interface Recommendation {
	id: string;
	title: string;
	description: string;
	imageUrl: string;
	leftText?: string;
	rightText?: string;
	bgColor: string;
}

export const popularCourses = [
	{
		id: "1",
		title: "Pre University Course",
		description: "Be ready for your journey at the university.",
		imageUrl:"/exstad/scholars/dara.png",
		bgColor: "#ffffff",
		leftText: "Learn More",
		rightText: "Explore Scholarship",
	},
	{
		id: "2",
		title: "Foundation Course",
		description: "Grow your skill, starting with the foundation.",
		imageUrl: "/exstad/scholars/daraborameyling.png",
		bgColor: "linear-gradient(135deg, #E5F2FF 0%, #ffffff 100%)",
		leftText: "Learn More",
		rightText: "Explore Scholarship",
	},
	{
		id: "3",
		title: "Full Stack Course",
		description: "Become a full stack developer with us.",
		imageUrl:"/exstad/scholars/sambath.png",
		bgColor: "linear-gradient(135deg, #FFE5B4 0%, #FFD6D6 100%)",
		leftText: "Learn More",
		rightText: "Explore Scholarship",
	},
	{
		id: "4",
		title: "ITP Course",
		description: "Go further, dive deeply with the huge of IT",
				imageUrl:"/exstad/scholars/bora.png",

		bgColor: "#FDF0E8",
		leftText: "Learn More",
		rightText: "Explore Scholarship",
	},
	{
		id: "5",
		title: "ITE Course",
		description: "Come to become an exporter of IT field. ",
		imageUrl:"/exstad/scholars/vannda.png",
		bgColor: "#FEFEF2",
		leftText: "Learn More",
		rightText: "Explore Scholarship",
	},
];
