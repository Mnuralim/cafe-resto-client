"use server";

import { revalidatePath } from "next/cache";

export async function customRevaldation(path: string, type: "layout" | "page") {
  revalidatePath(path, type);
}
