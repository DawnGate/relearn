import { z } from "zod";

export const UpdateListOrderScheme = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      boardId: z.string(),
      order: z.number(),
      createdAt: z.date(),
      updatedAt: z.date(),
    }),
  ),
  boardId: z.string(),
});
