"use server";

import { revalidatePath } from "next/cache";

import { createSafeAction } from "@/lib/create-safe-action";

import { db } from "@/lib/db";

import { auth } from "@clerk/nextjs";

import { CopyListScheme } from "./scheme";

import { InputType } from "./type";

const handler = async (validatedData: InputType) => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Un-authentication",
    };
  }

  const { boardId, id } = validatedData;

  let list;

  try {
    const listToCopy = await db.list.findUnique({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
      include: {
        cards: true,
      },
    });

    if (!listToCopy) {
      throw new Error("Not found list");
    }

    const lastList = await db.list.findFirst({
      where: {
        boardId,
        board: {
          orgId,
        },
      },
      orderBy: {
        order: "desc",
      },
      select: {
        order: true,
      },
    });

    const newOrder = lastList?.order ? lastList.order + 1 : 1;

    console.log(listToCopy, newOrder);
    list = await db.list.create({
      include: {
        cards: true,
      },
      data: {
        boardId: listToCopy.boardId,
        title: `${listToCopy.title} - Copy`,
        order: newOrder,
        cards: {
          create: listToCopy.cards.map((card) => ({
            title: card.title,
            description: card.description,
            order: card.order,
          })),
        },
      },
    });
    console.log(list);
  } catch (err) {
    console.log(err);
    return {
      error: "Fail to copy list",
    };
  }

  revalidatePath(`/board/${boardId}`);

  return {
    data: list,
  };
};

export const copyList = createSafeAction(CopyListScheme, handler);
