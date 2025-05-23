/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";
import { findCurrentAdmin } from "@/lib/api";
import { jwtVerify } from "jose";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

const secretKey = process.env.SECRET_KEY;
const key = new TextEncoder().encode(secretKey);

export async function customRevaldation(
  paths: string[] | string,
  type: "layout" | "page"
) {
  const path = Array.isArray(paths) ? paths : [paths];

  for (const p of path) {
    revalidatePath(p, type);
  }
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    return null;
  }
}

export async function verifySession() {
  const cookie = (await cookies()).get("token")?.value;
  const session = await decrypt(cookie);

  if (!session?.id) {
    redirect("/admin/login");
  }

  return { isAuth: true, userId: session.id };
}

export const getAdmin = cache(async () => {
  const session = await verifySession();
  const cookie = (await cookies()).get("token")?.value;
  if (!session) return null;

  try {
    const data = await findCurrentAdmin(cookie!);

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
});
