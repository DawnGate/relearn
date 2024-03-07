"use server";

import { createSafeAction } from "@/lib/create-safe-action";
import { BoardScheme } from "./scheme";

import { InputType } from "./type";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

const handler = async (validatedData: InputType) => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Un-authentication",
    };
  }

  const { title, image } = validatedData;

  const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName] =
    image.split("|");

  if (
    !imageId ||
    !imageThumbUrl ||
    !imageFullUrl ||
    !imageLinkHTML ||
    !imageUserName
  ) {
    return {
      error: "Missing fields. Failed to create board",
    };
  }

  let board;

  try {
    board = await db.board.create({
      data: {
        title,
        orgId,
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageLinkHTML,
        imageUserName,
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
