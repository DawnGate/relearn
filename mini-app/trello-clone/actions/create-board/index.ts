"use server";

import { revalidatePath } from "next/cache";

import { createSafeAction } from "@/lib/create-safe-action";

import { db } from "@/lib/db";

import { auth } from "@clerk/nextjs";

import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

import { BoardScheme } from "./scheme";
import { InputType } from "./type";

import { hasAvailableCount, incrementAvailableCount } from "@/lib/org-limit";

const handler = async (validatedData: InputType) => {
  const { userId, orgId } = auth();

  const canCreate = await hasAvailableCount();

  if (!canCreate) {
    return {
      error:
        "You have reached your limit of free boards. Please upgrade to create more.",
    };
  }

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

    incrementAvailableCount();

    createAuditLog({
      entityId: board.id,
      entityTitle: board.title,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.CREATE,
    });
  } catch (err) {
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
