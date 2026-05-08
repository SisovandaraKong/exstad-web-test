// app/api/telegram/route.ts
import { formatRequestInfo } from "@/services/enrollment-message-formatter";
import { NextRequest, NextResponse } from "next/server";

type RequestBody = {
  chat_id?: string;
  text?: string;
  parse_mode: "Markdown";
  message_thread_id?: number;
  photo?: string;
  caption?: string;
};

function extractIp(req: Request) {
  const headers = req.headers;
  const xff = headers.get("x-forwarded-for");
  if (xff) {
    return xff.split(",")[0].trim();
  }
  const cfIp = headers.get("cf-connecting-ip");
  if (cfIp) return cfIp;
  try {
    return req.headers.get("x-real-ip") || undefined;
  } catch {
    return undefined;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { message, threadId, photoUrl } = await req.json();

    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    const ip = extractIp(req) ?? "unknown";
    const ua = req.headers.get("user-agent") ?? "unknown";
    const acceptLanguage = req.headers.get("accept-language") ?? "";
    const referer =
      req.headers.get("referer") ?? req.headers.get("origin") ?? "";

    const info = formatRequestInfo({ ip, ua, acceptLanguage, referer });

    const textMessage = message + info;

    let endpoint = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;
    let body: RequestBody = {
      chat_id: chatId,
      text: textMessage,
      parse_mode: "Markdown",
    };

    if (threadId) body.message_thread_id = threadId;

    if (photoUrl) {
      endpoint = `https://api.telegram.org/bot${telegramBotToken}/sendPhoto`;
      body = {
        chat_id: chatId,
        photo: photoUrl,
        caption: textMessage,
        parse_mode: "Markdown",
      };
      if (threadId) body.message_thread_id = threadId;
    }

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
