"use server";

import { revalidatePath } from "next/cache";

import { createSafeAction } from "@/lib/create-safe-action";

import { db } from "@/lib/db";

import { auth } from "@clerk/nextjs";

import { CreateListScheme } from "./scheme";

import { InputType } from "./type";

const handler = async (validatedData: InputType) => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Un-authentication",
    };
  }

  const { title, boardId } = validatedData;

  let list;

  try {
    const board = await db.board.findUnique({
      where: {
        id: boardId,
        orgId,
      },
    });

    if (!board) {
      return {
        error: "Board not found!",
      };
    }

    const lastList = await db.list.findFirst({
      where: {
        boardId: boardId,
      },
      orderBy: {
        order: "desc",
      },
      select: {
        order: true,
      },
    });

    const newOrder = lastList?.order ? lastList.order + 1 : 1;

    list = await db.list.create({
      data: {
        title,
        boardId,
        order: newOrder,
      },
    });
  } catch (err) {
    return {
      error: "Fail to create list",
    };
  }

  if (!list) {
    return {
      error: "Fail to create list",
    };
  }

  revalidatePath(`/board/${boardId}`);

  return {
    data: list,
  };
};

export const createList = createSafeAction(CreateListScheme, handler);
