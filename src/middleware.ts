import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "./action";

const protectedRoutes = [
  "/admin",
  "/admin/table",
  "/admin/menu",
  "/admin/orders",
  "/admin/report",
];
const publicRoutes = ["/admin/login"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-pathname", path);
  requestHeaders.set("x-url", req.nextUrl.href);

  const cookie = (await cookies()).get("token")?.value;

  if (!cookie) {
    if (isProtectedRoute) {
      return NextResponse.redirect(new URL("/admin/login", req.nextUrl));
    }
  }
  const session = await decrypt(cookie);

  if (isProtectedRoute && !session?.id) {
    return NextResponse.redirect(new URL("/admin/login", req.nextUrl));
  }

  if (isPublicRoute && session?.id) {
    return NextResponse.redirect(new URL("/admin", req.nextUrl));
  }

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public).*)"],
};
