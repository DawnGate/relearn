"use server";

import { z } from "zod";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type State = {
  errors?: {
    title?: string[];
  };
  message?: string | null;
};

const CreateBoard = z.object({
  title: z.string().min(3, {
    message: "At least 3 chars",
  }),
});

export async function createBoard(prevState: State, formData: FormData) {
  const validatedFields = CreateBoard.safeParse({
    title: formData.get("title"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields.",
    };
  }

  const { title } = validatedFields.data;

  try {
    await db?.board.create({
      data: {
        title,
      },
    });
  } catch (err) {
    return {
      message: "Database Error",
    };
  }

  revalidatePath("/organization/org_2d7qmcM6bWG1jV2mITLZ0vgmthy");
  redirect("/organization/org_2d7qmcM6bWG1jV2mITLZ0vgmthy");
}
