import { z } from "zod";

export const DeleteCardScheme = z.object({
  id: z.string(),
  boardId: z.string(),
});
