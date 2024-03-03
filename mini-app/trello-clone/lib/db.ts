import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = globalThis.prisma || new PrismaClient();
}

export const db = globalThis.prisma;
