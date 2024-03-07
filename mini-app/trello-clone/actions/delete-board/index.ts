"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";

import { auth } from "@clerk/nextjs";

import { createSafeAction } from "@/lib/create-safe-action";

import { InputType } from "./types";
import { DeleteBoardScheme } from "./scheme";
import { redirect } from "next/navigation";

const handler = async (validatedData: InputType) => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Un-authentication",
    };
  }

  const { id } = validatedData;

  let board;

  try {
    board = await db.board.delete({
      where: {
        id,
        orgId,
      },
    });
  } catch (err) {
    return {
      error: "Failed to delete",
    };
  }

  if (!board) {
    return {
      error: "Problem occur when delete",
    };
  }

  revalidatePath(`/organization/${orgId}`);
  redirect(`/organization/${orgId}`);
};

export const deleteBoard = createSafeAction(DeleteBoardScheme, handler);
