"use server";

import { createSafeAction } from "@/lib/create-safe-action";
import { BoardScheme } from "./scheme";

import { InputType } from "./type";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

const handler = async (validatedData: InputType) => {
  const { userId } = auth();

  if (!userId) {
    return {
      error: "Un-authentication",
    };
  }

  const { title } = validatedData;

  let board;

  try {
    board = await db?.board.create({
      data: {
        title: title,
      },
    });
  } catch (err) {
    return {
      error: "Fail to create",
    };
  }

  if (!board) {
    return {
      error: "Fail to create",
    };
  }

  revalidatePath(`/board/${board.id}`);

  return {
    data: board,
  };
};

export const createBoard = createSafeAction(BoardScheme, handler);
