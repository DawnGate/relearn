"use server";

import { revalidatePath } from "next/cache";

import { createSafeAction } from "@/lib/create-safe-action";

import { db } from "@/lib/db";

import { auth } from "@clerk/nextjs";

import { UpdateCardScheme } from "./scheme";

import { InputType } from "./type";

const handler = async (validatedData: InputType) => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Un-authentication",
    };
  }

  const { boardId, id, ...restValues } = validatedData;

  let card;

  try {
    card = await db.card.update({
      where: {
        id,
        list: {
          board: {
            id: boardId,
            orgId,
          },
        },
      },
      data: restValues,
    });
  } catch (err) {
    return {
      error: "Fail to update card",
    };
  }

  revalidatePath(`/board/${boardId}`);

  return {
    data: card,
  };
};

export const updateCard = createSafeAction(UpdateCardScheme, handler);
