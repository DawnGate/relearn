import { z } from "zod";

export const UpdateCardOrderScheme = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      order: z.number(),
      listId: z.string(),
      createAt: z.date(),
      updateAt: z.date(),
    }),
  ),
  boardId: z.string(),
});
