import { PrismaClient } from "@prisma/client";

declare global {
  var db: PrismaClient | undefined;
}

const prismaDb = global.db || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.db = prismaDb;

export default prismaDb;
