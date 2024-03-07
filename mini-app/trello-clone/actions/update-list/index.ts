"use server";

import { revalidatePath } from "next/cache";

import { createSafeAction } from "@/lib/create-safe-action";

import { db } from "@/lib/db";

import { auth } from "@clerk/nextjs";

import { UpdateListScheme } from "./scheme";

import { InputType } from "./type";

const handler = async (validatedData: InputType) => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Un-authentication",
    };
  }

  const { title, boardId, id } = validatedData;

  let list;

  try {
    list = await db.list.update({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
      data: {
        title,
      },
    });
  } catch (err) {
    return {
      error: "Fail to update list",
    };
  }

  if (!list) {
    return {
      error: "Fail to update list",
    };
  }

  revalidatePath(`/board/${boardId}`);

  return {
    data: list,
  };
};

export const updateList = createSafeAction(UpdateListScheme, handler);
