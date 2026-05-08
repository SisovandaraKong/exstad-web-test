import { NextRequest, NextResponse } from "next/server";

// Force this route to be dynamic and not cached
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const BACKEND_API_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.exstad.tech/api/v1";

// CORS headers for all responses
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Requested-With",
};

// Handle preflight OPTIONS requests
export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: corsHeaders });
}

// Generic handler for all HTTP methods
async function handleRequest(req: NextRequest, method: string) {
  const { pathname } = new URL(req.url);

  // Extract the path after /api/proxy/
  const backendPath = pathname.replace("/api/proxy", "");

  // Construct the backend URL
  const backendUrl = `${BACKEND_API_URL}${backendPath}${req.nextUrl.search}`;

  console.log(`Proxying ${method} request to:`, backendUrl);

  try {
    // Prepare headers
    const headers = new Headers();

    // Copy relevant headers from the original request
    req.headers.forEach((value, key) => {
      if (
        key.toLowerCase() !== "host" &&
        key.toLowerCase() !== "connection" &&
        !key.toLowerCase().startsWith("cf-") &&
        !key.toLowerCase().startsWith("x-forwarded-")
      ) {
        headers.set(key, value);
      }
    });

    // Prepare fetch options
    const fetchOptions: RequestInit = {
      method,
      headers,
      cache: "no-store",
    };

    // Add body for methods that support it
    if (["POST", "PUT", "PATCH"].includes(method)) {
      const contentType = req.headers.get("content-type");
      if (contentType?.includes("application/json")) {
        const body = await req.json();
        fetchOptions.body = JSON.stringify(body);
      } else {
        fetchOptions.body = await req.text();
      }
    }

    // Make the request to the backend
    const response = await fetch(backendUrl, fetchOptions);

    // Get response body
    const contentType = response.headers.get("content-type") || "";
    let responseBody;

    if (contentType.includes("application/json")) {
      responseBody = await response.json();
    } else {
      responseBody = await response.text();
    }

    // Return the response with CORS headers
    return NextResponse.json(responseBody, {
      status: response.status,
      headers: {
        ...corsHeaders,
        "Content-Type": contentType || "application/json",
      },
    });
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      {
        message: "Proxy error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 502, headers: corsHeaders }
    );
  }
}

export async function GET(req: NextRequest) {
  return handleRequest(req, "GET");
}

export async function POST(req: NextRequest) {
  return handleRequest(req, "POST");
}

export async function PUT(req: NextRequest) {
  return handleRequest(req, "PUT");
}

export async function PATCH(req: NextRequest) {
  return handleRequest(req, "PATCH");
}

export async function DELETE(req: NextRequest) {
  return handleRequest(req, "DELETE");
}
