 import { NextRequest, NextResponse } from "next/server";

const BAKONG_BASE_URL =
  process.env.BAKONG_BASE_URL ?? process.env.NEXT_PUBLIC_BAKONG_BASE_URL;
const BAKONG_BEARER_TOKEN =
  process.env.BAKONG_BEARER_TOKEN ?? process.env.NEXT_PUBLIC_BAKONG_BEARER_TOKEN;

function jsonError(message: string, status = 400) {
  return NextResponse.json({ message }, { status });
}

export async function POST(req: NextRequest) {
  if (!BAKONG_BASE_URL || !BAKONG_BEARER_TOKEN) {
    return jsonError("Bakong is not configured", 500);
  }

  let md5: string | undefined;
  try {
    const body = await req.json();
    md5 = body?.md5;
  } catch {
    return jsonError("Invalid JSON body");
  }

  if (!md5) return jsonError("md5 is required");
  if (!/^[a-fA-F0-9]{32}$/.test(md5)) {
    return jsonError("md5 must be a 32-character hex string");
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);

  try {
    const headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${BAKONG_BEARER_TOKEN}`,
      "User-Agent": "exstad-frontend/1.0",
    });

    const upstream = await fetch(
      `${BAKONG_BASE_URL.replace(/\/+$/, "")}/v1/check_transaction_by_md5`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({ md5 }),
        cache: "no-store",
        signal: controller.signal,
      }
    );

    clearTimeout(timeout);

    const contentType = upstream.headers.get("content-type") || "";
    const payload =
      contentType.includes("application/json")
        ? await upstream.json()
        : { message: await upstream.text() };

    // Log upstream error body server-side for debugging (do not expose secrets in logs)
    if (upstream.status === 403 || upstream.status >= 400) {
      // server-side log
      // eslint-disable-next-line no-console
      console.error("Bakong upstream error", {
        url: `${BAKONG_BASE_URL}/v1/check_transaction_by_md5`,
        status: upstream.status,
        md5,
        payload,
      });
    }

    // In production keep response safe; in non-prod include upstream payload for debugging
    if (upstream.status === 403) {
      const detail =
        process.env.NODE_ENV === "production"
          ? undefined
          : payload;
      return NextResponse.json(
        { message: "Bakong returned 403 Forbidden", detail },
        { status: 403 }
      );
    }

    return NextResponse.json(payload, { status: upstream.status });
  } catch (err) {
    clearTimeout(timeout);
    const message =
      err instanceof Error && err.name === "AbortError"
        ? "Upstream timeout"
        : err instanceof Error
        ? err.message
        : "Upstream error";
    // eslint-disable-next-line no-console
    console.error("Bakong proxy error", { message, md5, err });
    return jsonError(message, 502);
  }
}
