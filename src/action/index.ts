/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";
import { findAdminById } from "@/lib/api";
import { jwtVerify } from "jose";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

const secretKey = process.env.SECRET_KEY;
const key = new TextEncoder().encode(secretKey);

export async function customRevaldation(path: string, type: "layout" | "page") {
  revalidatePath(path, type);
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
    const data = await findAdminById(cookie!);

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
});

export const logOut = async () => {
  (await cookies()).delete("token");
  redirect("/admin/login");
};
