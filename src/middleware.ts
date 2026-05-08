import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  const adminRoles = ["ADMIN", "INSTRUCTOR1", "INSTRUCTOR2"];
  const roles = token?.user?.roles || [];
  const hasAdminRole = roles.some((role) => adminRoles.includes(role));

  // if (token && hasAdminRole && !pathname.startsWith("/api/auth")) {
  //   const adminUrl = new URL(process.env.NEXT_PUBLIC_ADMIN_URL!);
  //   const response = NextResponse.redirect(adminUrl);

  //   response.cookies.delete("next-auth.session-token");
  //   response.cookies.delete("__Secure-next-auth.session-token");
  //   response.cookies.delete("next-auth.csrf-token");
  //   response.cookies.delete("__Host-next-auth.csrf-token");

  //   return response;
  // }

  // Regular auth check
  if (pathname.startsWith("/me") && !token) {
    const signInUrl = new URL("/api/auth/signin", req.url);
    signInUrl.searchParams.set("callbackUrl", req.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};
