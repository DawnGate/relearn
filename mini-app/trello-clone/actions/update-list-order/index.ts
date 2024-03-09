"use server";

import { revalidatePath } from "next/cache";

import { createSafeAction } from "@/lib/create-safe-action";

import { db } from "@/lib/db";

import { auth } from "@clerk/nextjs";

import { UpdateListOrderScheme } from "./scheme";

import { InputType } from "./type";

const handler = async (validatedData: InputType) => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Un-authentication",
    };
  }

  const { items, boardId } = validatedData;

  let lists;

  try {
    const transaction = items.map((list) => {
      return db.list.update({
        where: {
          id: list.id,
          boardId,
          board: {
            orgId,
          },
        },
        data: {
          order: list.order,
        },
      });
    });
    lists = await db.$transaction(transaction);
  } catch (err) {
    return {
      error: "Fail to reorder list",
    };
  }

  revalidatePath(`/board/${boardId}`);

  return {
    data: lists,
  };
};

export const updateListOrder = createSafeAction(UpdateListOrderScheme, handler);
