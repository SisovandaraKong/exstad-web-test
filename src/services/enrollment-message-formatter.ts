import { EnrollmentDetail } from "@/features/enrollment/enrollmentApi";
import { Enrollment } from "@/types/enrollment";
import { date } from "zod";

export function enrollmentMessageFormatter(enrollment: Enrollment): string {
  const divider = "━━━━━━━━━━━━━━━━━━━━";

  const message =
    `
🎉 *New Enrollment Received!*

👤 *Name (EN):* ${enrollment.englishName}
📝 *Name (KH):* ${enrollment.khmerName}
📚 *Program:* ${enrollment.program}

🚻 *Gender:* ${enrollment.gender}
🎂 *Date of Birth:* ${enrollment.dob}
🏙️ *Place of Birth:* ${enrollment.province}

🏫 *University:* ${enrollment.university}
🎓 *Qualification:* ${enrollment.educationQualification}

📍 *Address:* ${enrollment.currentAddress}
📞 *Phone:* ${enrollment.phoneNumber}
✉️ *Email:* ${enrollment.email}

💰 *Payment:* ${enrollment.isPaid ? "✅ Paid 🟢" : "❌ Not Paid 🔴"}

${divider}` + "\n\n";

  return message;
}

export function formatRequestInfo(requestInfo: {
  ip: string;
  ua: string;
  acceptLanguage?: string;
  referer?: string;
}): string {
  return `
🖥️ *IP:* ${requestInfo.ip}
📱 *User-Agent:* ${requestInfo.ua}
🗣️ *Accept-Language:* ${requestInfo.acceptLanguage || "N/A"}
🔗 *Referer:* ${requestInfo.referer || "N/A"}`.trim();
}

export function enrollmentPaymentMessageFormatter(
  enrollment: EnrollmentDetail,
  amount: number
): string {
  const divider = "━━━━━━━━━━━━━━━━━━━━";

  const message =
    `
🎉 *New Payment Received!*

👤 *Name (EN):* ${enrollment.englishName}
📝 *Name (KH):* ${enrollment.khmerName}
📚 *Program:* ${enrollment.program}
🏫 *Class:* ${enrollment._class.classCode}
🎓 *Scholar:* ${enrollment.isScholar ? "✅ Yes" : "❌ No"}
☀️ *Enrollment Date:* ${new Date(
      enrollment.audit.createdAt
    ).toLocaleDateString()}


📞 *Phone:* ${enrollment.phoneNumber}
✉️ *Email:* ${enrollment.email}

💰 *Payment:* ✅ Paid 🟢
💰 *Amount:* $${amount}

${divider}` + "\n\n";

  return message;
}
