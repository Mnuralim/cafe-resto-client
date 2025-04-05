import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function middleware(req: Request) {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  if (!token) {
    console.log("Middleware denied, user is not authenticated");
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  console.log("Middleware passed, allowing request");

  return NextResponse.next();
}

export const config = {
  matcher: [
    {
      source: "/((?!admin/login)admin/.*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
