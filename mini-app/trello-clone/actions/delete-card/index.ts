"use server";

import { revalidatePath } from "next/cache";

import { createSafeAction } from "@/lib/create-safe-action";

import { db } from "@/lib/db";

import { auth } from "@clerk/nextjs";

import { DeleteCardScheme } from "./scheme";

import { InputType } from "./type";

const handler = async (validatedData: InputType) => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Un-authentication",
    };
  }

  const { boardId, id } = validatedData;

  let card;

  try {
    card = await db.card.delete({
      where: {
        id,
        list: {
          board: {
            id: boardId,
            orgId,
          },
        },
      },
    });
  } catch (err) {
    return {
      error: "Fail to delete card",
    };
  }

  revalidatePath(`/board/${boardId}`);

  return {
    data: card,
  };
};

export const deleteCard = createSafeAction(DeleteCardScheme, handler);
