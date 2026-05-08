/** @format */

import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
	try {
		const { name, email, subject, message } = await request.json();

		// Validate required fields
		if (!name || !email || !subject || !message) {
			return NextResponse.json(
				{ error: "All fields are required" },
				{ status: 400 }
			);
		}

		// Check if environment variables are set
		if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
			console.error("Email credentials not configured");
			return NextResponse.json(
				{ error: "Email service not configured" },
				{ status: 500 }
			);
		}

		// Create transporter (you'll need to configure this with your email service)
		const transporter = nodemailer.createTransport({
			// For Gmail (you can change this to your preferred email service)
			service: "gmail",
			auth: {
				user: process.env.EMAIL_USER, // Your email address
				pass: process.env.EMAIL_PASS, // Your email password or app password
			},
		});

		// Clean and professional email template
		const emailTemplate = `
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Contact Form Submission</title>
		</head>
		<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f7;">
			<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f5f5f7; padding: 40px 20px;">
				<tr>
					<td align="center">
						<!-- Main Container -->
						<table role="presentation" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);">
							
							<!-- Header -->
							<tr>
								<td style="background-color: #253c95; padding: 32px 40px; text-align: left;">
									<h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600; letter-spacing: -0.3px;">
										New Contact Message
									</h1>
								</td>
							</tr>

							<!-- Content Section -->
							<tr>
								<td style="padding: 40px;">
									
									<!-- From Section -->
									<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 32px;">
										<tr>
											<td style="padding-bottom: 16px; border-bottom: 2px solid #f5f5f7;">
												<p style="margin: 0 0 8px; color: #666666; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
													From
												</p>
												<h2 style="margin: 0 0 6px; color: #333333; font-size: 18px; font-weight: 600;">
													${name}
												</h2>
												<a href="mailto:${email}" style="color: #253c95; text-decoration: none; font-size: 15px; font-weight: 500;">
													${email}
												</a>
											</td>
										</tr>
									</table>

									<!-- Subject Section -->
									<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 32px;">
										<tr>
											<td style="padding-bottom: 16px; border-bottom: 2px solid #f5f5f7;">
												<p style="margin: 0 0 8px; color: #666666; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
													Subject
												</p>
												<h3 style="margin: 0; color: #333333; font-size: 18px; font-weight: 600; line-height: 1.4;">
													${subject}
												</h3>
											</td>
										</tr>
									</table>

									<!-- Message Section -->
									<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 32px;">
										<tr>
											<td>
												<p style="margin: 0 0 12px; color: #666666; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
													Message
												</p>
												<div style="color: #333333; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">
${message}
												</div>
											</td>
										</tr>
									</table>

									<!-- Divider -->
									<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 24px;">
										<tr>
											<td style="border-top: 1px solid #e5e5e5;"></td>
										</tr>
									</table>

									<!-- Action Button -->
									<table role="presentation" cellpadding="0" cellspacing="0" width="100%">
										<tr>
											<td>
												<a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" 
													 style="display: inline-block; background-color: #253c95; color: #ffffff; text-decoration: none; font-size: 15px; font-weight: 600; padding: 12px 28px; border-radius: 8px; transition: background-color 0.2s;">
													Reply to Message
												</a>
											</td>
										</tr>
									</table>

								</td>
							</tr>

							<!-- Footer -->
							<tr>
								<td style="background-color: #f5f5f7; padding: 24px 40px; text-align: center;">
									<p style="margin: 0 0 4px; color: #666666; font-size: 13px; line-height: 1.5;">
										Sent from exSTAD contact form
									</p>
									<p style="margin: 0; color: #999999; font-size: 12px;">
										${new Date().toLocaleString('en-US', { 
											year: 'numeric', 
											month: 'short', 
											day: 'numeric',
											hour: '2-digit',
											minute: '2-digit'
										})}
									</p>
								</td>
							</tr>

						</table>
					</td>
				</tr>
			</table>
		</body>
		</html>
		`;

		// Email content
		const mailOptions = {
			from: process.env.EMAIL_USER,
			to: "info.istad@gmail.com",
			subject: `Contact Form: ${subject}`,
			html: emailTemplate,
			// Also send a plain text version
			text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

This email was sent from the exSTAD website contact form.
      `,
			// Set reply-to as the sender's email
			replyTo: email,
		};

		// Send email
		await transporter.sendMail(mailOptions);

		return NextResponse.json(
			{ message: "Email sent successfully" },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Email sending error:", error);
		return NextResponse.json(
			{ error: "Failed to send email" },
			{ status: 500 }
		);
	}
}