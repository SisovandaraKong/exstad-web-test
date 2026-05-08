/** @format */

import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import MyCard from "@/components/aboutus/missiontext";

// Small inline icons so this file is self-contained
const IconRocket = ({ className = "w-6 h-6" }) => (
	<svg
		className={className}
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'>
		<path
			d='M12 2c0 4-4 6-10 10 4 0 6 4 10 4s6-6 6-10-6-4-6-4z'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
		<path
			d='M12 2l4 4'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
);
const IconShield = ({ className = "w-6 h-6" }) => (
	<svg
		className={className}
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'>
		<path
			d='M12 2l7 4v6c0 5-3.6 9.7-7 10-3.4-.3-7-5-7-10V6l7-4z'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
);
const IconLightbulb = ({ className = "w-6 h-6" }) => (
	<svg
		className={className}
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'>
		<path
			d='M9 18h6M10 22h4M12 2a6 6 0 00-4 10c0 2 1 3 1 3h6s1-1 1-3a6 6 0 00-4-10z'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
);
const IconTel = ({ className = "h-5 w-5" }) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		className={className} // <-- use the prop here
		fill='none'
		viewBox='0 0 24 24'
		stroke='currentColor'>
		<path
			strokeLinecap='round'
			strokeLinejoin='round'
			strokeWidth={2}
			d='M3 5a2 2 0 012-2h2.28a1 1 0 01.95.68l1.2 3.6a1 1 0 01-.27 1.05l-1.52 1.52a16 16 0 006.59 6.59l1.52-1.52a1 1 0 011.05-.27l3.6 1.2a1 1 0 01.68.95V19a2 2 0 01-2 2h-1C8.82 21 3 15.18 3 8V7a2 2 0 012-2z'
		/>
	</svg>
);

const IconUsers = ({ className = "w-6 h-6" }) => (
	<svg
		className={className}
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'>
		{/* Main User (Front) */}
		<path
			d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
		<circle
			cx='9'
			cy='7'
			r='4'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
		{/* Second User (Behind) */}
		<path
			d='M22 21v-2a4 4 0 0 0-3-3.87'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
		<path
			d='M16 3.13a4 4 0 0 1 0 7.75'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
);

export default function AboutPage() {
	return (
		<div className='bg-gradient-to-b max-w-7xl mx-auto min-h-[10rem] from-white via-slate-50 to-white text-slate-900 overflow-hidden'>
			<section className=' container mx-auto px-4 py-12 flex flex-col md:flex-row items-center gap-12 min-h-[10rem]'>
				{/* Left Text */}
				<div className='flex-1 text-center md:text-left'>
					<h1 className='text-3xl md:text-4xl font-extrabold mb-4'>About Us</h1>
					<p className='text-slate-600 mb-6 max-w-xl mx-auto md:mx-0'>
						exSTAD connects students, alumni, and institutions.
					</p>
					<div className='flex items-center gap-4 pt-5'>
						<Button
							className='text-white px-6 py-3 font-semibold 
            [clip-path:polygon(0%_0,100%_0,90%_100%,0_100%)] bg-[#309EC4]'>
							Learn More
						</Button>
					</div>
				</div>

				{/* Right Image Section */}
				<div className='flex-1 space-y-6'>
					<div className='flex flex-col lg:flex-row items-center justify-center gap-4'>
						<Image
							src='/aboutUs/image 5.png'
							alt='Speaker'
							width={200}
							height={200}
							className='rounded-xl w-full md:w-[250px] sm:w-[250px] h-auto object-cover'
						/>
						<div className='relative w-full md:flex-1'>
							<div className='bg-gray-200 text-white h-40 p-4 shadow-md' />
							<div className='absolute -bottom-6 left-6 right-0 bg-white shadow-xl h-40 p-4'>
								<p>
									“Giving yourself a chance is the first <b>priority</b>.”
								</p>
							</div>
							<Image
								src='/aboutUs/tick-Photoroom.png'
								alt='Checkmark'
								width={100}
								height={100}
								className='absolute -bottom-10 left-1/2 -translate-x-1/2'
							/>
						</div>
					</div>

					<div className='flex justify-center'>
						<Image
							src='/aboutUs/istad_pic.jpg'
							alt='Group'
							width={580}
							height={200}
							className='rounded-xl w-full max-w-3xl'
						/>
					</div>
				</div>
			</section>
			<section className='w-full px-4 py-12'>
				<div className='container mx-auto flex flex-col md:flex-row items-center gap-10 bg-white rounded-2xl shadow-md p-6'>
					<div className='flex-1 '>
						<div className='font-h3 mb-10 text-primary'>
							<p>What is exSTAD ?</p>
						</div>
						<div className='font-size-d1'>
							<p>
								exSTAD connects students, alumni, and institutions, offering a
								central hub for scholarships, programs, and updates.
							</p>
						</div>
					</div>
					<div className=''>
						<Image
							src='/aboutUs/cuate.svg'
							alt='Illustration'
							width={250}
							height={250}
							className='rounded-xl'
						/>
					</div>
				</div>
			</section>
			{/* Vision*/}
			<section id='services' className='bg-[#F8F9FF] px-4 py-12'>
				<div className='container mx-auto'>
					<h3 className='text-3xl font-semibold text-primary text-center mb-6'>
						Our Vision
					</h3>
					<Card className='p-10 rounded-2xl shadow-lg max-w-3xl mx-auto'>
						<div className='flex items-center justify-center gap-6 text-center'>
							{/* Left: Smaller Red square with quote */}
							<div className='relative w-20 h-20 flex items-center justify-center'>
								<div className='w-14 h-14 bg-[#F73030] rounded-lg' />
								<span className='absolute -bottom-2 left-6 text-3xl font-black text-[#253C95] select-none'>
									❝
								</span>
							</div>
							{/* Right: Text */}
							<div className='flex-1'>
								<p className='text-gray-700 text-lg leading-relaxed'>
									To enhance access to scholarships, programs, and opportunities
									for all students.
								</p>
							</div>
						</div>
					</Card>
				</div>
			</section>
			{/* Missions */}
			<section id='mission' className='container mx-auto px-4 py-12'>
				<div className='text-center'>
					<div className='flex items-center justify-center gap-3 mb-4'>
						{/* Logo placeholder */}
						<div className='w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-sm font-bold'>
							<Image
								src='/image/logo/exStad-01.png'
								alt='Logo'
								width={100}
								height={100}
								className='rounded-xl md:w-auto'
							/>
						</div>
						<div className='w-[1px] h-12 bg-gray-300'></div>
						<MyCard>
							<h2 className='text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF0000] via-[#7777FF] to-[#FF0000] inline-block'>
								Missions
							</h2>
						</MyCard>
					</div>
					<div className='w-auto h-[1px] bg-gray-300'></div>
					{/* Mission Cards */}
					<div className='grid grid-cols-1 md:grid-cols-3 gap-3 mt-6'>
						{/* Card 1 */}
						<Card className='p-6 rounded-xl shadow-sm text-center bg-[#F5F5F7]'>
							<div className='flex justify-center mb-3 text-yellow-500 '>
								<Image
									src='/aboutUs/vector.svg'
									alt='icon'
									width={30}
									height={30}
									className='item-center'
								/>
							</div>
							<p className='text-gray-700'>
								Connect alumini with current students
							</p>
						</Card>

						{/* Card 2 */}
						<Card className='p-6 rounded-xl shadow-sm text-center bg-[#F5F5F7]'>
							<div className='flex justify-center text-yellow-500 mb-3'>
								<Image
									src='/aboutUs/vector 4.svg'
									alt='icon'
									width={30}
									height={30}
									className=''
								/>
							</div>
							<p className='text-gray-700'>
								Keep students informed about events and activities
							</p>
						</Card>

						{/* Card 3 */}
						<Card className='p-6 rounded-xl shadow-sm text-center bg-[#F5F5F7]'>
							<div className='flex justify-center text-yellow-500 mb-3'>
								<Image
									src='/aboutUs/vector 3.svg'
									alt='icon'
									width={30}
									height={30}
									className=''
								/>
							</div>
							<p className='text-gray-700'>
								Share detailed information on scholarships and programs
							</p>
						</Card>
					</div>
				</div>
			</section>
			{/* Mentors */}
			<section
				id='mentors'
				className='bg-cover bg-center py-12 px-4'
				style={{ backgroundImage: "url('/aboutUs/pngwing.png')" }}>
				<h3 className='text-2xl md:text-3xl text-primary font-semibold text-center'>
					Our Mentors
				</h3>
				{/* Only 2 mentors */}
				<div className='mt-8 grid gap-6 md:grid-cols-2'>
					{["Chan Chhaya", "Eung Lyzhia"].map((name, index) => (
						<div key={name} className='rounded-2xl group'>
							<div className='flex flex-col items-center gap-5'>
								{/* Mentor Image with semi-circle background */}
								<div className='relative'>
									<Image
										src={`/aboutUs/mentor ${index + 1}.jpg`} // your images
										alt={`${name}'s photo`}
										width={180}
										height={180}
										className='rounded-full object-cover relative z-10 h-45'
									/>
									{/* Semi-circle background */}
									<div
										className={`absolute -bottom-6 left-1/2 -translate-x-1/2 w-50 h-25 
                         rounded-t-full z-0 rotate-180
                         transition-all duration-500 ease-in-out
                         ${
														index === 0
															? "bg-[#2049D5] group-hover:bg-red-500"
															: "bg-red-500 group-hover:bg-[#2049D5]"
													} 
                         group-hover:rotate-[200deg]`}
									/>
								</div>
								{/* Mentor Details */}
								<div className='text-center'>
									<h4 className='font-semibold'>{name}</h4>
									<p className='text-sm text-foreground/60'>exSTAD mentor</p>
									<div className='mt-3 flex gap-3 justify-center text-primary/80'>
										{[
											"/aboutUs/Telegram.svg",
											"/aboutUs/Facebook.svg",
											"/aboutUs/Git.svg",
										].map((icon, i) => (
											<div
												key={i}
												className='h-8 w-8 rounded-full grid place-items-center'>
												<Image src={icon} alt='social' width={25} height={25} />
											</div>
										))}
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* Team carousel simplified */}
			<section
				id='team'
				className='relative mt-16 px-4 py-12 bg-gradient-to-br from-fuchsia-50 to-indigo-100'>
				<div className='absolute inset-0 z-0 pointer-events-none bg-gradient-to-br from-fuchsia-50 to-indigo-100' />

				{/* 2) Glows (z-10) */}
				<div
					className='absolute top-[-80px] left-[-80px] h-64 w-64 rounded-full opacity-60 z-10 pointer-events-none'
					style={{
						background:
							"radial-gradient(closest-side, hsla(340,100%,80%,0.6), transparent)",
					}}
				/>
				<div
					className='absolute top-[10%] right-[-60px] h-80 w-80 rounded-full opacity-50 z-10 pointer-events-none'
					style={{
						background:
							"radial-gradient(closest-side, hsla(257,72%,74%,0.7), transparent)",
					}}
				/>
				<div className='container mx-auto px-4'>
					<h3 className='text-2xl md:text-3xl text-primary text-center font-bold'>
						Meet our team
					</h3>

					{/* First row (2 members centered) */}
					<div className='mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 justify-items-center max-w-3xl mx-auto'>
						{team.slice(0, 2).map((member) => (
							<article
								key={member.name}
								className='relative rounded-3xl border border-white/10 
            shadow-lg transition-all duration-300 overflow-visible 
            w-full max-w-sm mx-auto text-center'>
								{/* Profile Image */}
								<div className='relative -mt-30 flex justify-center'>
									<div className='h-40 w-40 overflow-hidden '>
										<Image
											src={member.image}
											alt={member.name}
											width={160}
											height={160}
											className='object-cover h-45'
										/>
									</div>
								</div>

								{/* Name, Role, Badge */}
								<div className='mt-0'>
									<h4 className='font-semibold text-lg text-gray-800'>
										{member.name}
									</h4>
									<p className='text-sm text-gray-500'>{member.role}</p>
									<span className='inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700'>
										{member.badge}
									</span>
								</div>

								{/* Social Links */}
								<div className='m-2 flex gap-3 justify-center text-primary/80'>
									{[
										"/aboutUs/Telegram.svg",
										"/aboutUs/Facebook.svg",
										"/aboutUs/Git.svg",
									].map((icon, i) => (
										<div
											key={i}
											className='h-8 w-8 rounded-full grid place-items-center'>
											<Image src={icon} alt='social' width={20} height={20} />
										</div>
									))}
								</div>
							</article>
						))}
					</div>

					{/* Second row (3 members) */}
					<div className='mt-12 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center'>
						{team.slice(2, 8).map((member) => (
							<article
								key={member.name}
								className='relative rounded-3xl border border-white/10 
            shadow-lg transition-all duration-300 overflow-visible 
            w-full max-w-sm mx-auto text-center'>
								{/* Profile Image */}
								<div className='relative -mt-16 flex justify-center'>
									<div className='h-40 w-40 overflow-hidden '>
										<Image
											src={member.image}
											alt={member.name}
											width={160}
											height={160}
											className='object-cover h-45'
										/>
									</div>
								</div>

								{/* Name, Role, Badge */}
								<div className='mt-0'>
									<h4 className='font-semibold text-lg text-gray-800'>
										{member.name}
									</h4>
									<p className='text-sm text-gray-500'>{member.role}</p>
									<span className='inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700'>
										{member.badge}
									</span>
								</div>

								{/* Social Links */}
								<div className='m-2 flex gap-3 justify-center text-primary/80'>
									{[
										"/aboutUs/Telegram.svg",
										"/aboutUs/Facebook.svg",
										"/aboutUs/Git.svg",
									].map((icon, i) => (
										<div
											key={i}
											className='h-8 w-8 rounded-full grid place-items-center'>
											<Image src={icon} alt='social' width={20} height={20} />
										</div>
									))}
								</div>
							</article>
						))}
					</div>
				</div>
			</section>
			{/* Values / How we work */}
			{/* <section className="container mx-auto mt-16 px-4 py-12 bg-[#FFFFFF]">
          <div className="text-center mb-10">
            <h2 className="text-xl font-bold mb-5">How we treat our work</h2>
            <p>At exSTAD, every project we take on is handled with care, precision, and a commitment to excellence.</p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 sm:w-[700px] h-[470px] mx-auto">
          {[
            { icon: <IconShield className="h-6 w-6" />, title: "Attention to Detail", desc: "– We ensure every part of the work meets the highest standards." },
            { icon: <IconLightbulb className="h-6 w-6" />, title: "Innovation", desc: "– We embrace new ideas and technologies to deliver better results." },
            { icon: <IconRocket className="h-6 w-6" />, title: "Integrity", desc: "– We embrace new ideas and technologies to deliver better results." },
            { icon: <IconUsers className="h-6 w-6" />, title: "Collaboration", desc: "– We work closely with clients and partners to achieve shared goals." },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border bg-white p-6 shadow-lg shadow-[#ddc2ff] hover:shadow-[0_0_25px_5px_rgba(48,158,196,0.7)] transition">
              <div className="h-10 w-10 rounded-md grid place-items-center bg-gradient-to-br from-fuchsia-500/10 to-indigo-500/10 text-primary">
                {item.icon}
              </div>
              <h4 className="mt-4 font-semibold">{item.title}</h4>
              <p className="mt-2 text-sm text-foreground/70">{item.desc}</p>
            </div>
          ))}
        </div>
        </section> */}
			<section className='container mx-auto mt-16 px-4 py-12'>
				<div className='text-center mb-10'>
					<h2 className='text-xl font-bold mb-5'>How we treat our work</h2>
					<p>
						At exSTAD, every project we take on is handled with care, precision,
						and a commitment to excellence.
					</p>
				</div>

				<div className='mt-10 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 md:w-[700px] mx-auto'>
					{/* Card 1 */}
					<div className='rounded-2xl border bg-white p-6 shadow-lg shadow-[#ddc2ff] hover:shadow-[0_0_25px_5px_rgba(48,158,196,0.7)] transition'>
						<div className='h-10 w-10 rounded-md grid place-items-center bg-gradient-to-br from-fuchsia-500/10 to-indigo-500/10 text-primary'>
							<IconShield className='h-6 w-6' />
						</div>
						<h4 className='mt-4 font-semibold'>Attention to Detail</h4>
						<p className='mt-2 text-sm text-foreground/70'>
							– We ensure every part of the work meets the highest standards.
						</p>
					</div>

					{/* Card 2 (shifted down one row) */}
					<div className='rounded-2xl border bg-white p-6 shadow-lg shadow-[#ddc2ff] hover:shadow-[0_0_25px_5px_rgba(48,158,196,0.7)] transition md:relative md:top-12'>
						<div className='h-10 w-10 rounded-md grid place-items-center bg-gradient-to-br from-fuchsia-500/10 to-indigo-500/10 text-primary'>
							<IconLightbulb className='h-6 w-6' />
						</div>
						<h4 className='mt-4 font-semibold'>Innovation</h4>
						<p className='mt-2 text-sm text-foreground/70'>
							– We embrace new ideas and technologies to deliver better results.
						</p>
					</div>

					{/* Card 3 */}
					<div className='rounded-2xl border bg-white p-6 shadow-lg shadow-[#ddc2ff] hover:shadow-[0_0_25px_5px_rgba(48,158,196,0.7)] transition'>
						<div className='h-10 w-10 rounded-md grid place-items-center bg-gradient-to-br from-fuchsia-500/10 to-indigo-500/10 text-primary'>
							<IconRocket className='h-6 w-6' />
						</div>
						<h4 className='mt-4 font-semibold'>Integrity</h4>
						<p className='mt-2 text-sm text-foreground/70'>
							– We hold ourselves accountable to strong moral and ethical
							principles.
						</p>
					</div>

					{/* Card 4 (shifted down one row) */}
					<div className='rounded-2xl border bg-white p-6 shadow-lg shadow-[#ddc2ff] hover:shadow-[0_0_25px_5px_rgba(48,158,196,0.7)] transition md:relative md:top-12'>
						<div className='h-10 w-10 rounded-md grid place-items-center bg-gradient-to-br from-fuchsia-500/10 to-indigo-500/10 text-primary'>
							<IconUsers className='h-6 w-6' />
						</div>
						<h4 className='mt-4 font-semibold'>Collaboration</h4>
						<p className='mt-2 text-sm text-foreground/70'>
							– We work closely with clients and partners to achieve shared
							goals.
						</p>
					</div>
				</div>
			</section>

			<section className='container mx-auto py-12'>
				<div className='bg-white rounded-xl shadow-md p-8 flex flex-col md:flex-row justify-between items-start md:items-center'>
					{/* Left Section */}
					<div className='mb-6 md:mb-0'>
						{/* Blue line */}
						<div className='h-2 w-12 bg-[#253C95] rounded-full mb-4'></div>
						<h2 className='text-2xl font-bold text-[#253C95] leading-snug'>
							LET&apos;S TALK ! <br />
							Looking For Support?
						</h2>
					</div>

					{/* Right Section */}
					<div className='md:ml-12'>
						{/* Gradient text */}
						<p className='text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] via-[#EC4899] to-[#EF4444] font-medium mb-4'>
							Our team is here to help 24/7 with guidance, troubleshooting, and
							expert advice.
						</p>

						<h4 className='text-sm font-semibold text-primary mb-2'>
							CONTACTS Us
						</h4>
						<ul className='space-y-2 text-sm text-[#253C95]'>
							<li className='flex items-center gap-2'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='h-5 w-5'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
									aria-hidden='true'>
									<title>Email</title>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M3 8.5v7A2.5 2.5 0 005.5 18h13A2.5 2.5 0 0021 15.5v-7A2.5 2.5 0 0018.5 6h-13A2.5 2.5 0 003 8.5z'
									/>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M21 8.5l-9 6-9-6'
									/>
								</svg>
								<a
									href='mailto:info.istad@gmail.com'
									className='hover:underline'>
									info.istad@gmail.com
								</a>
							</li>
							<li className='flex items-center gap-2'>
								<IconTel />
								<a href='tel:+85595990910' className='hover:underline'>
									(+855) 95-990-910
								</a>
							</li>
							<li className='flex items-center gap-2'>
								<IconTel />
								<a href='tel:+85593990910' className='hover:underline'>
									(+855) 93-990-910
								</a>
							</li>
						</ul>
					</div>
				</div>
			</section>
		</div>
	);
}
const team = [
	{
		name: "Srun OudomSambath",
		role: "exSTAD Leader",
		badge: ".Back-End",
		image: "/aboutUs/1Photo.png",
	},
	{
		name: "Kong Sisovandara",
		role: "exSTAD Team",
		badge: ".Back-End",
		image: "/aboutUs/2Photo.png",
	},
	{
		name: "Kung Sovanda",
		role: "exSTAD Team",
		badge: ".Back-End",
		image: "/aboutUs/3Photo.png",
	},
	{
		name: "Chhun Meyling",
		role: "exSTAD Team",
		badge: ".Front-End",
		image: "/aboutUs/4Photo.png",
	},
	{
		name: "Leng Narak",
		role: "exSTAD Team",
		badge: ".Front-End",
		image: "/aboutUs/5Photo.png",
	},
	{
		name: "Tong Bora",
		role: "exSTAD Team",
		badge: ".Back-End",
		image: "/aboutUs/6Photo.png",
	},
	{
		name: "Phum Sreynoch",
		role: "exSTAD Team",
		badge: ".Back-End",
		image: "/aboutUs/members/Photo.png",
	},
	{
		name: "Teng Menghouy",
		role: "exSTAD Team",
		badge: ".Back-End",
		image: "/aboutUs/8Photo.png",
	},
];
