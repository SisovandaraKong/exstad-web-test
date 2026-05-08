/** @format */

export interface Course {
	id: string;
	title: string;
	description: string;
	category: string;
	image: string;
	imageAlt?: string;
	readMoreUrl?: string;
	joinCourseUrl?: string;
}

export interface CourseCardProps {
	course: Course;
	className?: string;
}
