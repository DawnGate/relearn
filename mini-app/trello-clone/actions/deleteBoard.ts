"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteBoard(id: string, formData: FormData) {
  await db?.board.delete({
    where: {
      id,
    },
  });
  revalidatePath("/organization/org_2d7qmcM6bWG1jV2mITLZ0vgmthy");
}
