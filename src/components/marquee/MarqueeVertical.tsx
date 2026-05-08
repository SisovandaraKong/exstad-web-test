/** @format */

/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import Image from "next/image";

const reviews = [
	{
		name: "Graduate Students",
		username: "",
		body: "After graduate, students have the real skills of IT Fields.",
		img: "https://api.exstad.tech/documents/a7ff28d817264a95a7a945a0d6cd65d4-2025Oct27-152544.png",
	},
	
	{
		name: "Job Offer",
		username: "",
		body: "At ISTAD, 92% of students secure internships before graduation.",
		img: "https://cdn-icons-png.freepik.com/512/3688/3688606.png",
	},
	{
		name: "Industry Partnership",
		username: "",
		body: "Strong connections with leading tech companies for internships.",
		img: "https://api.exstad.tech/documents/8ae7bcc9508e4f0a8bb03c319f9db04c-2025Oct27-151616.png",
	},
	
	{
		name: "Modern Curriculum",
		username: "",
		body: "Updated curriculum aligned with current industry demands.",
		img: "https://api.exstad.tech/documents/6dc9826361824ce19dba253aa9683838-2025Oct27-151936.png",
	},
	{
		name: "Real Projects",
		username: "",
		body: "All ISTAD students must complete real-world projects to graduate.",
		img: "https://cdn-icons-png.freepik.com/512/8162/8162006.png",
	},
	{
		name: "Expert Mentors",
		username: "",
		body: "Learn from experienced professionals in the tech industry.",
		img: "https://api.exstad.tech/documents/7e42e8c2ed3b4a8a8ce1830d1fb72c37-2025Oct27-152911.png",
	},
];

const firstRow = reviews.slice(0, Math.ceil(reviews.length / 2));
const secondRow = reviews.slice(Math.ceil(reviews.length / 2));

const ReviewCard = ({
	img,
	name,
	username,
	body,
}: {
	img: string;
	name: string;
	username: string;
	body: string;
}) => {
	return (
		<figure
			className={cn(
				"relative h-full w-fit cursor-pointer overflow-hidden rounded-xl border p-4 ",
				// Use consistent card background
				"bg-card border-border hover:bg-card/80 transition-colors duration-200"
			)}>
			<div className='flex flex-row items-center gap-2'>
				<Image
					unoptimized
					className=''
					width='32'
					height='32'
					alt=''
					src={img}
				/>
				<div className='flex flex-col'>
					<figcaption className='text-sm font-medium text-foreground'>
						{name}
					</figcaption>
					<p className='text-xs font-medium text-muted-foreground'>
						{username}
					</p>
				</div>
			</div>
			<blockquote className='mt-2 text-sm text-muted-foreground'>
				{body}
			</blockquote>
		</figure>
	);
};

export function MarqueeVertical() {
	return (
		<div className='relative flex h-[500px] w-full flex-row items-center justify-center overflow-hidden'>
			<Marquee pauseOnHover vertical className='[--duration:20s]'>
				{firstRow.map((review) => (
					<ReviewCard key={review.name} {...review} />
				))}
			</Marquee>
			<Marquee reverse pauseOnHover vertical className='[--duration:20s]'>
				{secondRow.map((review) => (
					<ReviewCard key={review.name} {...review} />
				))}
			</Marquee>
			<div className='from-background pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b'></div>
			<div className='from-background pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t'></div>
		</div>
	);
}
