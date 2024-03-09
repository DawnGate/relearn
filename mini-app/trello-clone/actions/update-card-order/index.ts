"use server";

import { revalidatePath } from "next/cache";

import { createSafeAction } from "@/lib/create-safe-action";

import { db } from "@/lib/db";

import { auth } from "@clerk/nextjs";

import { UpdateCardOrderScheme } from "./scheme";

import { InputType } from "./type";

const handler = async (validatedData: InputType) => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Un-authentication",
    };
  }

  const { items, boardId } = validatedData;

  let cards;

  try {
    const transaction = items.map((card) =>
      db.card.update({
        where: {
          id: card.id,
          list: {
            board: {
              id: boardId,
              orgId,
            },
          },
        },
        data: {
          order: card.order,
          listId: card.listId,
        },
      }),
    );

    cards = await db.$transaction(transaction);
  } catch (err) {
    return {
      error: "Fail to reorder card",
    };
  }

  revalidatePath(`/board/${boardId}`);

  return {
    data: cards,
  };
};

export const updateCardOrder = createSafeAction(UpdateCardOrderScheme, handler);
