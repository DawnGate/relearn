"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";

import { auth } from "@clerk/nextjs";

import { createSafeAction } from "@/lib/create-safe-action";

import { InputType } from "./types";
import { UpdateBoardScheme } from "./scheme";

const handler = async (validatedData: InputType) => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Un-authentication",
    };
  }

  const { title, id } = validatedData;

  let board;

  try {
    board = await db?.board.update({
      where: {
        id,
        orgId,
      },
      data: {
        title,
      },
    });
  } catch (err) {
    return {
      error: "Failed to update",
    };
  }

  if (!board) {
    return {
      error: "Problem occur when update",
    };
  }

  revalidatePath(`/board/${board.id}`);

  return {
    data: board,
  };
};

export const updateBoard = createSafeAction(UpdateBoardScheme, handler);
