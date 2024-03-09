import { auth, currentUser } from "@clerk/nextjs";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { db } from "./db";

interface Props {
  entityId: string;
  entityTitle: string;
  entityType: ENTITY_TYPE;
  action: ACTION;
}

export const createAuditLog = async ({
  entityId,
  entityTitle,
  entityType,
  action,
}: Props) => {
  const { userId, orgId } = auth();
  const user = await currentUser();

  if (!userId || !orgId) {
    throw new Error("User not found");
  }

  try {
    await db.auditLog.create({
      data: {
        orgId,
        entityId,
        entityTitle,
        entityType,
        action,
        userId,
        userImage: user?.imageUrl,
        userName: user?.firstName + " " + user?.lastName,
      },
    });
  } catch (err) {
    console.error("[AUDIT_LOG_ERROR]", err);
    throw new Error("Create audit log fail");
  }
};
