/** @format */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { IoMdMail } from "react-icons/io";
import { FaFacebook, FaTelegram } from "react-icons/fa";
import { FaLinkedin, FaInstagram } from "react-icons/fa6";
import { useTranslations } from "next-intl";

/**
 * Single-file contact form component built with React and Tailwind CSS.
 * This component includes form state management and a mock submission handler
 * that					<textarea
						name='message'
						placeholder='Message'
						rows={6}
						value={formData.message}
						onChange={handleChange}
						className='w-full rounded-lg px-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm pt-3 outline-none focus:ring-2 focus:ring-primary transition duration-200 placeholder:text-gray-500 dark:placeholder:text-gray-400'
						required></textarea>					<button
						type='submit'
						// Disable button while sending to prevent multiple submissions
						disabled={status.message === "Sending..."}
						className='text-white bg-primary hover:bg-primary-hover font-semibold rounded-lg text-base px-6 py-3 w-full transition duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed'>ual feedback to the user.
 */
const ContactForm = () => {
	const t = useTranslations("contact-form");

	// State to hold the values of the form inputs
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	});

	// State to manage the feedback message and status ('success', 'error', or empty)
	const [status, setStatus] = useState({
		message: "",
		type: "", // 'success' or 'error'
	});

	// Handles changes in form inputs and updates the state
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		// Clear any previous status message when the user starts typing
		if (status.message) setStatus({ message: "", type: "" });
	};

	// Handles form submission (Sends email to info@exstad.edu.kh)
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// Simple validation check
		if (
			!formData.name ||
			!formData.email ||
			!formData.subject ||
			!formData.message
		) {
			setStatus({
				message:
					t("form.validation-error") || "Please fill out all required fields.",
				type: "error",
			});
			return;
		}

		setStatus({ message: t("form.sending"), type: "" });

		try {
			// Send email via API endpoint
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.error || "Failed to send email");
			}

			console.log("Email sent successfully:", result);

			// Show success message
			setStatus({
				message: t("form.success-message"),
				type: "success",
			});
			setFormData({ name: "", email: "", subject: "", message: "" }); // Clear the form fields
		} catch (error) {
			// Handle submission error
			console.error("Email sending error:", error);
			setStatus({
				message: t("form.error-message"),
				type: "error",
			});
		}
	};

	// Determine Tailwind classes for the status message box
	const statusClasses =
		status.type === "success"
			? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 border-green-400 dark:border-green-600"
			: status.type === "error"
			? "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 border-red-400 dark:border-red-600"
			: "hidden";

	// The entire component uses functional structure and JSX
	return (
		<section className='py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-8 md:px-16 lg:px-32 bg-whitesmoke relative'>
			{/* Grid Background */}
			<div className='absolute inset-0 opacity-[0.15] dark:opacity-[0.20]'>
				<div
					className='w-full h-full'
					style={{
						backgroundImage: `
							linear-gradient(rgb(75, 85, 99, 0.6) 1px, transparent 1px),
							linear-gradient(90deg, rgb(75, 85, 99, 0.6) 1px, transparent 1px)
						`,
						backgroundSize: "40px 40px",
						maskImage: `
							radial-gradient(ellipse 80% 60% at 50% 50%, 
								rgba(0, 0, 0, 1) 20%, 
								rgba(0, 0, 0, 0.8) 40%, 
								rgba(0, 0, 0, 0.4) 70%, 
								rgba(0, 0, 0, 0) 100%)
						`,
						WebkitMaskImage: `
							radial-gradient(ellipse 80% 60% at 50% 50%, 
								rgba(0, 0, 0, 1) 20%, 
								rgba(0, 0, 0, 0.8) 40%, 
								rgba(0, 0, 0, 0.4) 70%, 
								rgba(0, 0, 0, 0) 100%)
						`,
					}}
				/>
			</div>
			<div className='max-w-7xl mx-auto relative z-10'>
				<div className='grid sm:grid-cols-2 items-center gap-16 p-8 mx-auto max-w-4xl bg-background shadow-lg hover:shadow-xl rounded-xl text-gray-800 dark:text-gray-200 transition duration-300'>
					{/* Left Column - Contact Info and Intro */}
					<div>
						<h1 className='text-4xl font-extrabold text-primary mb-3'>
							{t("title")}
						</h1>
						<p className='text-base text-gray-500 dark:text-gray-200 mt-3 mb-10'>
							{t("description")}
						</p>

						{/* Status Message Display */}
						<div
							className={`p-4 mb-6 text-sm border rounded-lg ${statusClasses}`}
							role='alert'
							style={{
								display:
									status.message && status.type !== "" ? "block" : "none",
							}}>
							{status.message}
						</div>

						{/* Email Section */}
						<div className='mt-12'>
							<h2 className='text-xl font-bold text-gray-800 dark:text-gray-200'>
								{t("email-section.title")}
							</h2>
							<ul className='mt-4'>
								<li className='flex items-center space-x-3'>
									<div className='bg-gray-200 dark:bg-gray-700 h-10 w-10 rounded-full flex items-center justify-center shrink-0'>
										{/* Email SVG */}
										<svg
											xmlns='http://www.w3.org/2000/svg'
											width='20px'
											height='20px'
											fill='#007bff'
											viewBox='0 0 479.058 479.058'>
											<path
												d='M434.146 59.882H44.912C20.146 59.882 0 80.028 0 104.794v269.47c0 24.766 20.146 44.912 44.912 44.912h389.234c24.766 0 44.912-20.146 44.912-44.912v-269.47c0-24.766-20.146-44.912-44.912-44.912zm0 29.941c2.034 0 3.969.422 5.738 1.159L239.529 264.631 39.173 90.982a14.902 14.902 0 0 1 5.738-1.159zm0 299.411H44.912c-8.26 0-14.971-6.71-14.971-14.971V122.615l199.778 173.141c2.822 2.441 6.316 3.655 9.81 3.655s6.988-1.213 9.81-3.655l199.778-173.141v251.649c-.001 8.26-6.711 14.97-14.971 14.97z'
												data-original='#000000'
											/>
										</svg>
									</div>
									<a
										target='_blank'
										href='mailto:info@exstad.edu.kh'
										className='text-[#007bff] hover:text-blue-600 transition text-sm'>
										<small className='block text-gray-400 dark:text-gray-500'>
											{t("email-section.label")}
										</small>
										<strong className='font-semibold'>
											{t("email-section.email")}
										</strong>
									</a>
								</li>
							</ul>
						</div>

						{/* Socials Section */}
						<div className='mt-12'>
							<h2 className='text-xl font-bold text-gray-800 dark:text-gray-200'>
								{t("social-section.title")}
							</h2>
							<ul className='flex mt-4 space-x-4'>
								{/* Facebook Icon */}
								<li className='bg-gray-200 cursor-pointer dark:bg-white h-10 w-10 rounded-full flex items-center justify-center shrink-0 hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-200'>
									<Link
										href='https://www.facebook.com/istad.co'
										target='_blank'
										rel='noopener noreferrer'
										aria-label='Facebook'>
										<FaFacebook className='w-5 h-5 text-primary' />
									</Link>
								</li>
								{/* LinkedIn Icon */}
								<li className='bg-gray-200 cursor-pointer dark:bg-white h-10 w-10 rounded-full flex items-center justify-center shrink-0 hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-200'>
									<Link
										href='https://www.linkedin.com/in/istad-institute-27848b2a6/'
										target='_blank'
										rel='noopener noreferrer'
										aria-label='LinkedIn'>
										<FaLinkedin className='w-5 h-5 text-primary' />
									</Link>
								</li>
							</ul>
						</div>
					</div>

					{/* Right Column - Form */}
					<form className='ml-auto space-y-5' onSubmit={handleSubmit}>
						<input
							type='text'
							name='name'
							placeholder={t("form.name-placeholder")}
							value={formData.name}
							onChange={handleChange}
							className='w-full rounded-lg py-3 px-4 border text-sm outline-none focus:ring-2 focus:ring-[#007bff] transition duration-200'
							required
						/>
						<input
							type='email'
							name='email'
							placeholder={t("form.email-placeholder")}
							value={formData.email}
							onChange={handleChange}
							className='w-full rounded-lg py-3 px-4 border text-sm outline-none focus:ring-2 focus:ring-[#007bff] transition duration-200'
							required
						/>
						<input
							type='text'
							name='subject'
							placeholder={t("form.subject-placeholder")}
							value={formData.subject}
							onChange={handleChange}
							className='w-full rounded-lg py-3 px-4 border text-sm outline-none focus:ring-2 focus:ring-[#007bff] transition duration-200'
							required
						/>
						<textarea
							name='message'
							placeholder={t("form.message-placeholder")}
							rows={6}
							value={formData.message}
							onChange={handleChange}
							className='w-full rounded-lg px-4 border text-sm pt-3 outline-none focus:ring-2 focus:ring-[#007bff] transition duration-200'
							required></textarea>
						<button
							type='submit'
							// Disable button while sending to prevent multiple submissions
							disabled={status.message === t("form.sending")}
							className='text-white cursor-pointer bg-primary hover:bg-primary-hover font-semibold rounded-lg text-base px-6 py-3 w-full transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed'>
							{status.message === t("form.sending")
								? t("form.sending")
								: t("form.send-button")}
						</button>
					</form>
				</div>
			</div>
		</section>
	);
};

export default ContactForm;
